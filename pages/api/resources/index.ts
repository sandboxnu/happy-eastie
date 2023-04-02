import type { NextApiRequest, NextApiResponse } from "next";
import { Resource, SurveyAnswers } from "../../../models/types2"
import { AES, enc } from "crypto-js";
import mongoDbInteractor from "../../../db/mongoDbInteractor";
import { Filter, WithId } from "mongodb";
import { QUIZ_RESPONSE_ENCRYPTION_PASSPHRASE, RESOURCE_COLLECTION } from "../../../models/constants";

export type ResourceData = {
  requested: WithId<Resource>[];
  additional: WithId<Resource>[];
};

export type ResourcesResponse = {
  data: ResourceData;
};

// this endpoint supports two ways of getting resources:
// 1. it expects a post request with body of structure {data: encryptedQuizResponses}
// the quiz response is decrypted and then used to filter relevant resources
// 2. it returns all resources by default if no body is sent
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResourcesResponse | Array<Resource>>
) {
  if (req.body["data"]) {
    // TODO: error handling for invalid bodies sent
    const encryptedFormData = req.body["data"];
    const formData: SurveyAnswers = JSON.parse(
      AES.decrypt(encryptedFormData, QUIZ_RESPONSE_ENCRYPTION_PASSPHRASE).toString(enc.Utf8)
    );
    const resourceData = await getResources(formData);
    res.status(200).json(resourceData);
  } else if (req.body["searchParam"]) {
    const searchQuery = req.body["searchParam"];
    const resourceData = await getResourcesDirectory(searchQuery);
    res.status(200).json(resourceData);
  } else {
    const resourceData = await getAllResources();
    res.status(200).json(resourceData);
  }
}

async function getAllResources(): Promise<ResourcesResponse> {
  const requested = await mongoDbInteractor.getDocuments<Resource>(
    RESOURCE_COLLECTION,
    {}
  );
  return {
    data: {
      requested,
      additional: [],
    },
  };
}

function intersection(arr1: any[] | undefined, arr2: any[] | undefined): boolean {
  if (arr1 == undefined || arr2 === undefined) {
    return false;
  }
  const filteredArray: any[] = arr1.filter(value => arr2.includes(value));
  return filteredArray.length > 0;
}

function languageAndAccessibilitySorting(r1: Resource, r2: Resource, answers: SurveyAnswers): number {
  let r1LanguageMatch = false;
  let r1AccessibilityMatch = false;
  let r2LanguageMatch = false;
  let r2AccessibilityMatch = false;

  if (intersection(answers.languages, r1.availableLanguages)) {
    r1LanguageMatch = true;
  }

  if (intersection(answers.accessibility, r1.accessibilityOptions)) {
    r1AccessibilityMatch = true;
  }

  if (intersection(answers.languages, r2.availableLanguages)) {
    r2LanguageMatch = true;
  }

  if (intersection(answers.accessibility, r2.accessibilityOptions)) {
    r2AccessibilityMatch = true;
  }

  if (r1LanguageMatch && !r2LanguageMatch) {
    return -1;
  } else if (r2LanguageMatch && !r1LanguageMatch) {
    return 1;
  }

  if (r1AccessibilityMatch && !r2AccessibilityMatch) {
    return -1;
  } else if (r2AccessibilityMatch && !r1AccessibilityMatch) {
    return 1;
  } else {
    return 0;
  }
}

async function getResources(
  answers: SurveyAnswers
): Promise<ResourcesResponse> {
  const filter: Filter<Resource> = convertToFilter(answers);
  let resources = await mongoDbInteractor.getDocuments<Resource>(
    RESOURCE_COLLECTION,
    filter
  );
  const requested: WithId<Resource>[] = [];
  const additional: WithId<Resource>[] = [];
  if (resources.length == 0) {
    return {
      data: {
        requested: [],
        additional: [],
      },
    };
  }
  // small bug: it seems like CBHI, which doesn't have any categories, 
+   // doesn't get returned here?
  resources.forEach((r: WithId<Resource>) => {
    r.category?.some((c1: string) =>
      answers.categories.some((c2: string) => c1 === c2)
    )
      ? requested.push(r)
      : additional.push(r);
  });

  requested.sort((r1, r2) => languageAndAccessibilitySorting(r1, r2, answers));
  additional.sort((r1, r2) => languageAndAccessibilitySorting(r1, r2, answers));

  return {
    data: {
      requested,
      additional,
    },
  };
}

function convertToFilter(answers: SurveyAnswers): Filter<Resource> {
  let filter: Filter<Resource>[] = [];

  // Household Income/Household Members
  if (answers.householdIncome && answers.householdMembers) {
    filter.push({
        $or: [
          { incomeByHouseholdMembers: { $exists: false } },
          { incomeByHouseholdMembers: { $size: 0 } },
          { $and: [
              { [`incomeByHouseholdMembers.${answers.householdMembers - 1}`]: { $exists: true } },  // number of household members exists in resource's array
              { [`incomeByHouseholdMembers.${answers.householdMembers - 1}.minimum`]:
                { $lte: answers.householdIncome }
              },
              {
                [`incomeByHouseholdMembers.${answers.householdMembers - 1}.maximum`]:
                { $gte: answers.householdIncome }
              },
            ]
          },
          { $and: [
              { [`incomeByHouseholdMembers.${answers.householdMembers - 1}`]: { $exists: false } },  // check the last income range in the resource's array
              { $expr: 
                { $lte: [
                    { $getField: {
                        field: "minimum",
                        input: { $arrayElemAt: ["$incomeByHouseholdMembers", -1] }
                      } 
                    },
                    answers.householdIncome
                  ] 
                } 
              },
              { $expr: 
                { $gte: [
                    { $getField: {
                        field: "maximum",
                        input: { $arrayElemAt: ["$incomeByHouseholdMembers", -1] }
                      } 
                    },
                    answers.householdIncome
                  ] 
                } 
              }
            ]
          },
        ]
      }
    )
  }

  // Documentation
  if (answers.documentation !== undefined && !answers.documentation) {
    filter.push({
      $or: [{ documentationRequired: { $eq: false } }],
    })
  }

  if (filter.length == 0) {
    return {};
  }

  return { $and: filter };
}

async function getResourcesDirectory(
  searchQuery: string
): Promise<ResourcesResponse> {
  let filter: Filter<Resource> = {
    $or: [
      { name: { $regex: searchQuery, $options: "i" } },
      { description: { $regex: searchQuery, $options: "i" } },
    ],
  };

  let resources = await mongoDbInteractor.getDocuments<Resource>(
    RESOURCE_COLLECTION,
    filter
  );
  // TODO: eventually implement the filtering and sorting either by doing it using Mongo (if we
  // switch over, or implement the two functions below)
  // let requestedFiltered = requestedSearchResults.filter((r: Resource) => matchesFilters(filters, r))
  // let requestedSorted = sort(requestedFiltered, sortingMethod)
  return {
    data: {
      requested: resources,
      additional: [],
    },
  };
}
