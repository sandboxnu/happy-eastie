import type { NextApiRequest, NextApiResponse } from "next";
import {
  Resource,
  ResourceCategory,
  ResourceSortingMethod,
  SurveyAnswers,
} from "../../../models/types";
import { AES, enc } from "crypto-js";
import mongoDbInteractor, {
  MongoDbInteractor,
} from "../../../db/mongoDbInteractor";
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

async function getResources(
  answers: SurveyAnswers
): Promise<ResourcesResponse> {
  const filter: Filter<Resource> = convertToFilter(answers);
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
  resources.reduce((prev: WithId<Resource>, curr: WithId<Resource>) => {
    curr.category &&
    curr.category.some((c1: ResourceCategory) =>
      answers.category.some((c2: ResourceCategory) => c1 === c2)
    )
      ? requested.push(curr)
      : additional.push(curr);
    return curr;
  });
  return {
    data: {
      requested,
      additional,
    },
  };
}

function convertToFilter(answers: SurveyAnswers): Filter<Resource> {
  let filter: Filter<Resource>[] = [];
  if (answers.income) {
    filter.push({
      $or: [
        { minimumIncome: { $exists: false } },
        { minimumIncome: { $lte: answers.income } },
      ],
    });
    filter.push({
      $or: [
        { maximumIncome: { $exists: false } },
        { maximumIncome: { $gte: answers.income } },
      ],
    });
  }
  if (answers.language) {
    filter.push({
      $or: [
        { language: { $exists: false } },
        { language: { $in: answers.language } },
      ],
    });
  }
  if (answers.citizenship) {
    filter.push({
      $or: [
        { citizenship: { $exists: false } },
        { citizenship: answers.citizenship },
      ],
    });
  }
  if (answers.parentAge) {
    filter.push({
      $or: [
        { minimumParentAge: { $exists: false } },
        { minimumParentAge: { $lte: answers.parentAge } },
      ],
    });
    filter.push({
      $or: [
        { maximumParentAge: { $exists: false } },
        { maximumParentAge: { $gte: answers.parentAge } },
      ],
    });
  }
  if (answers.childAge) {
    filter.push({
      $or: [
        { minimumChildAge: { $exists: false } },
        { minimumChildAge: { $lte: answers.childAge } },
      ],
    });
    filter.push({
      $or: [
        { maximumChildAge: { $exists: false } },
        { maximumChildAge: { $gte: answers.childAge } },
      ],
    });
  }
  if (answers.family) {
    filter.push({
      $or: [{ family: { $exists: false } }, { family: answers.family }],
    });
  }
  if (answers.employmentStatus) {
    filter.push({
      $or: [
        { employmentStatus: { $exists: false } },
        { employmentStatus: answers.employmentStatus },
      ],
    });
  }
  if (answers.insurance) {
    filter.push({
      $or: [
        { insurance: { $exists: false } },
        { insurance: answers.insurance },
      ],
    });
  }
  if (answers.accessibility) {
    filter.push({
      $or: [
        { accessibility: { $exists: false } },
        { accessibility: { $in: answers.accessibility } },
      ],
    });
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
