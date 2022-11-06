import type { NextApiRequest, NextApiResponse } from 'next'
import type { Resource, ResourceCategory, ResourceSortingMethod, SurveyAnswers } from '../../../models/types'
import {AES, enc} from 'crypto-js'
import mongoDbInteractor, { MongoDbInteractor } from '../../../firebase/mongoDbInteractor'
import { Filter, WithId } from 'mongodb'

export type ResourceData = {
  requested: WithId<Resource>[],
  additional: WithId<Resource>[]
}

export type ResourcesResponse = {
  data: ResourceData
}

// this endpoint supports two ways of getting resources:
// 1. it expects a post request with body of structure {data: encryptedQuizResponses}
// the quiz response is decrypted and then used to filter relevant resources
// 2. it returns all resources by default if no body is sent
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResourcesResponse | Array<Resource>>
) {
  if (req.body['data']) {
    // TODO: error handling for invalid bodies sent
    const encryptedFormData = req.body['data']
    const formData : SurveyAnswers = JSON.parse(AES.decrypt(encryptedFormData, "Secret Passphrase").toString(enc.Utf8));
    const resourceData = await getResources(formData)
    res.status(200).json(resourceData)
  } else if (req.body['searchParam']) {
    //const searchQuery = req.body['searchParam']
    //const resourceData = await getResourcesDirectory(req.body['searchParam'])
    res.status(200).json([])
  } else {
    //const resourceData = await mongoInteractor.getDocuments<Resource>('resources', {category: {"$exists": true, "$elemMatch": {"$in": ["Housing", "Financial Help"]}}})
    //const resourceData = await getAllResources()
    const resourceData = await mongoDbInteractor.getDocuments<Resource>('resources', {maximumIncome: {"$gte": 10000}, minimumIncome: {"$lte": 10000}})
    res.status(200).json(resourceData)
  }
}

async function getAllResources() : Promise<ResourcesResponse> {
  const requested = await mongoDbInteractor.getDocuments<Resource>('resources', {})
  return {
    data: {
      requested,
      additional: []
    }
  }
}

async function getResources(answers: SurveyAnswers) : Promise<ResourcesResponse> {
    const filter : Filter<Resource> = convertToFilter(answers)
    console.log(filter)
    let resources = await mongoDbInteractor.getDocuments<Resource>('resources', filter)
    console.log(resources)
    const requested : WithId<Resource>[] = []
    const additional : WithId<Resource>[] = []
    resources.reduce((prev: WithId<Resource>, curr: WithId<Resource>) => {
      (curr.category && curr.category.some((c1: ResourceCategory) => answers.category.some((c2: ResourceCategory) => c1 === c2))) ? requested.push(curr) : additional.push(curr)
      return curr
    })
    return {data: {
      requested,
      additional
    }}
}

function convertToFilter(answers: SurveyAnswers) : Filter<Resource> {
  let filter = {}
  if (answers.income) {
    filter = {mininumIncome: {"$lte": answers.income},maximumIncome: {"$gte": answers.income}}
  }
  //return filter
  return {maximumIncome: {"$gte": 10000}, minimumIncome: {"$lte": 10000}}
}

/*
async function getResourcesDirectory(searchQuery: string) : Promise<ResourcesResponse> {
  let resources = await FirebaseInteractor.getCollectionData('resources', resourceConverter, [])
  let requested = resources.filter((r : Resource) => matchesSearchQuery(searchQuery, r))
  // TODO: eventually implement the filtering and sorting either by doing it using Mongo (if we
  // switch over, or implemenet the two functions below)
  // let requestedFiltered = requestedSearchResults.filter((r: Resource) => matchesFilters(filters, r))
  // let requestedSorted = sort(requestedFiltered, sortingMethod)
  return {data: {
    requested,
    additional: []
  }}
}
*/

function matchesSearchQuery(searchQuery: string, r: Resource) {
  return r.name.toLowerCase().includes(searchQuery.toLowerCase())
  || r.description?.toLowerCase().includes(searchQuery.toLowerCase());
}

function matchesFilters(filters: ResourceCategory[], r: Resource) {

}

function sort(resources: Resource[], sortingMethod: ResourceSortingMethod) {

}

function matchesSurvey(answers: SurveyAnswers, r: Resource) {
  return (!answers.income || !r.maximumIncome || answers.income < r.maximumIncome) 
    && (!answers.income || !r.minimumIncome || answers.income > r.minimumIncome)
    && (!answers.language || !r.language || r.language.some(l1 => answers.language.some(l2 => l1 === l2))
    && (!answers.citizenship || !r.citizenship || r.citizenship.some(c => c === answers.citizenship))
    && (!answers.parentAge || !r.maximumParentAge || answers.parentAge < r.maximumParentAge) 
    && (!answers.parentAge || !r.minimumParentAge || answers.parentAge > r.minimumParentAge) 
    && (!answers.childAge || !r.maximumChildAge || answers.childAge < r.maximumChildAge) 
    && (!answers.childAge || !r.minimumChildAge || answers.childAge > r.minimumChildAge)
    && (!answers.family || !r.family || r.family.some(f => f === answers.family))
    && (!answers.employmentStatus || !r.employmentStatus || r.employmentStatus.some(e => e === answers.employmentStatus))
    && (!answers.insurance || !r.insurance || r.insurance.some(i => i === answers.insurance))
    && (!answers.accessibility || !r.accessibility || r.accessibility.some(a1 => answers.accessibility.some(a2 => a1 === a2))))  
}

/*
Legacy function that makes a bunch of where queries on firebase b
but apparently you can't have compound queries on different fields so r.i.p.
function getWhereQueries(answers : SurveyAnswers) : WhereQuery[] {
  const q : WhereQuery[] = []
  if (answers.category) {
    q.push({field: "category", comparison: 'array-contains-any', value: answers.category})
  } 
  if (answers.income) {
    q.push({field: "maximumIncome", comparison: '<=', value: answers.income})
    q.push({field: "minimumIncome", comparison: '>=', value: answers.income})
  }
  if (answers.language) {
    q.push({field: "language", comparison: 'array-contains', value: answers.language})
  }
  if (answers.citizenship) {
    q.push({field: "citizenship", comparison: 'array-contains', value: answers.citizenship})
  } 
  if (answers.parentAge) {
    q.push({field: "minimumParentAge", comparison: '>=', value: answers.parentAge})
    q.push({field: "maximumParentAge", comparison: '<=', value: answers.parentAge})
  }
  if (answers.family) {
    q.push({field: "family", comparison: 'array-contains', value: answers.family})
  }
  if (answers.employmentStatus) {
    q.push({field: "employmentStatus", comparison: 'array-contains', value: answers.employmentStatus})
  }
  if (answers.insurance) {
    q.push({field: "insurance", comparison: 'array-contains', value: answers.insurance})
  }
  if (answers.accessibility) {
    q.push({field: "accessibility", comparison: 'array-contains', value: answers.accessibility})
  }
  return q
}
*/
