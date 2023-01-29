import type { NextApiRequest, NextApiResponse } from "next";
import { Resource, SurveyAnswers, IncomeRange } from "../../../models/types2"
import { AES, enc } from "crypto-js";
import mongoDbInteractor from "../../../db/mongoDbInteractor";
import { Filter, WithId } from "mongodb";

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
      AES.decrypt(encryptedFormData, "Secret Passphrase").toString(enc.Utf8)
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
    "resources",
    {}
  );
  return {
    data: {
      requested,
      additional: [],
    },
  };
}

function intersection(arr1: any[], arr2: any[] | undefined): boolean {
  if (arr2 === undefined) {
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

  if (intersection(answers.accessibilty, r1.accessibilityOptions)) {
    r1AccessibilityMatch = true;
  }

  if (intersection(answers.languages, r2.availableLanguages)) {
    r2LanguageMatch = true;
  }

  if (intersection(answers.accessibilty, r2.accessibilityOptions)) {
    r2AccessibilityMatch = true;
  }

  if (r1LanguageMatch && !r2LanguageMatch) {
    return 1;
  } else if (r2LanguageMatch && !r1LanguageMatch) {
    return -1;
  }

  if (r1AccessibilityMatch && !r2AccessibilityMatch) {
    return 1;
  } else if (r2AccessibilityMatch && !r1AccessibilityMatch) {
    return -1;
  } else {
    return 0;
  }
}

async function getResources(
  answers: SurveyAnswers
): Promise<ResourcesResponse> {
  const filter: Filter<Resource> = convertToFilter(answers);  // TODO: update filter generation
  let resources = await mongoDbInteractor.getDocuments<Resource>(
    "resources",
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
  if (answers.householdIncome) {  // TODO: shouldn't have to check for required fields
    let incomeFilter: string = `incomeByHouseholdMembers.${answers.householdMembers}`

    // Household Members/Household Income
    filter.push({
      input: "$resources",
      as: "resource",
      cond: {
        $or: [
          { incomeByHouseholdMembers: { $exists: false } },
          { incomeByHouseholdMembers: { $size: 0 } },
          { $and: [
              { incomeByHouseholdMembers: { $size: { $gte: answers.householdMembers } } }, // number of household members exists in resource's array
              { incomeFilter: { 
                $and: [
                  minimum: { $lte: answers.householdIncome }
                ]
                }
              }
            ]
          },
        ]
      }
    })
  }

  // Documentation
  if (answers.documentation !== undefined && !answers.documentation) {
    filter.push({
      $or: [{ documentationRequired: { $equal: false } }],
    })
  }

  // if (answers.income) {
  //   filter.push({
  //     $or: [
  //       { minimumIncome: { $exists: false } },
  //       { minimumIncome: { $lte: answers.income } },
  //     ],
  //   });
  //   filter.push({
  //     $or: [
  //       { maximumIncome: { $exists: false } },
  //       { maximumIncome: { $gte: answers.income } },
  //     ],
  //   });
  // }
  // if (answers.language) {
  //   filter.push({
  //     $or: [
  //       { language: { $exists: false } },
  //       { language: { $in: answers.language } },
  //     ],
  //   });
  // }
  // if (answers.citizenship) {
  //   filter.push({
  //     $or: [
  //       { citizenship: { $exists: false } },
  //       { citizenship: answers.citizenship },
  //     ],
  //   });
  // }
  // if (answers.parentAge) {
  //   filter.push({
  //     $or: [
  //       { minimumParentAge: { $exists: false } },
  //       { minimumParentAge: { $lte: answers.parentAge } },
  //     ],
  //   });
  //   filter.push({
  //     $or: [
  //       { maximumParentAge: { $exists: false } },
  //       { maximumParentAge: { $gte: answers.parentAge } },
  //     ],
  //   });
  // }
  // if (answers.childAge) {
  //   filter.push({
  //     $or: [
  //       { minimumChildAge: { $exists: false } },
  //       { minimumChildAge: { $lte: answers.childAge } },
  //     ],
  //   });
  //   filter.push({
  //     $or: [
  //       { maximumChildAge: { $exists: false } },
  //       { maximumChildAge: { $gte: answers.childAge } },
  //     ],
  //   });
  // }
  // if (answers.family) {
  //   filter.push({
  //     $or: [{ family: { $exists: false } }, { family: answers.family }],
  //   });
  // }
  // if (answers.employmentStatus) {
  //   filter.push({
  //     $or: [
  //       { employmentStatus: { $exists: false } },
  //       { employmentStatus: answers.employmentStatus },
  //     ],
  //   });
  // }
  // if (answers.insurance) {
  //   filter.push({
  //     $or: [
  //       { insurance: { $exists: false } },
  //       { insurance: answers.insurance },
  //     ],
  //   });
  // }
  // if (answers.accessibility) {
  //   filter.push({
  //     $or: [
  //       { accessibility: { $exists: false } },
  //       { accessibility: { $in: answers.accessibility } },
  //     ],
  //   });
  // }
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
    "resources",
    filter
  );
  // TODO: eventually implement the filtering and sorting either by doing it using Mongo (if we
  // switch over, or implemenet the two functions below)
  // let requestedFiltered = requestedSearchResults.filter((r: Resource) => matchesFilters(filters, r))
  // let requestedSorted = sort(requestedFiltered, sortingMethod)
  return {
    data: {
      requested: resources,
      additional: [],
    },
  };
}

function matchesFilters(filters: ResourceCategory[], r: Resource) {}

function sort(resources: Resource[], sortingMethod: ResourceSortingMethod) {}
