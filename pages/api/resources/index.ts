import type { NextApiRequest, NextApiResponse } from 'next'
import type { Accessibility, Citizenship, EmploymentStatus, Family, Insurance, Resource, ResourceCategory, SurveyAnswers } from '../../../models/types'
import FirebaseInteractor from '../../../firebase/firebaseInteractor'
import {AES, enc} from 'crypto-js'
import { resourceConverter } from '../../../firebase/converters'


export type ResourceData = {
  requested: Resource[],
  additional: Resource[]
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
  res: NextApiResponse<ResourcesResponse>
) {
  if (req.body['data']) {
    // TODO: error handling for invalid bodies sent
    const encryptedFormData = req.body['data']
    const formData : SurveyAnswers = JSON.parse(AES.decrypt(encryptedFormData, "Secret Passphrase").toString(enc.Utf8));
    const resourceData = await getResources(formData)
    res.status(200).json(resourceData)
  } else {
    const resourceData = await getAllResources()
    res.status(200).json(resourceData)
  }
}

async function getAllResources() : Promise<ResourcesResponse> {
  const requested = await FirebaseInteractor.getCollectionData('resources', resourceConverter, [])
  return {
    data: {
      requested,
      additional: []
    }
  }
}

async function getResources(answers: SurveyAnswers) : Promise<ResourcesResponse> {
    let resources =  await FirebaseInteractor.getCollectionData('resources', resourceConverter, [])
    resources = resources.filter((r : Resource) => matchesSurvey(answers, r))
    const requested : Resource[] = []
    const additional : Resource[] = []
    resources.reduce((prev: Resource, curr: Resource) => {
      (curr.category && curr.category.some((c1: ResourceCategory) => answers.category.some((c2: ResourceCategory) => c1 === c2))) ? requested.push(curr) : additional.push(curr)
      return curr
    })
    return {data: {
      requested,
      additional
    }}
}

function matchesSurvey(answers: SurveyAnswers, r: Resource) {
  return (!answers.income || !r.maximumIncome || answers.income < r.maximumIncome) 
    && (!answers.income || !r.minimumIncome || answers.income > r.minimumIncome)
    && (!answers.language || !r.language || r.language.some((l : String) => l === answers.language))
    && (!answers.citizenship || !r.citizenship || r.citizenship.some((c : Citizenship) => c === answers.citizenship))
    && (!answers.parentAge || !r.maximumParentAge || answers.parentAge < r.maximumParentAge) 
    && (!answers.parentAge || !r.minimumParentAge || answers.parentAge > r.minimumParentAge) 
    && (!answers.childAge || !r.maximumChildAge || answers.childAge < r.maximumChildAge) 
    && (!answers.childAge || !r.minimumChildAge || answers.childAge > r.minimumChildAge)
    && (!answers.family || !r.family || r.family.some((f: Family) => f === answers.family))
    && (!answers.employmentStatus || !r.employmentStatus || r.employmentStatus.some((e : EmploymentStatus) => e === answers.employmentStatus))
    && (!answers.insurance || !r.insurance || r.insurance.some((i : Insurance) => i === answers.insurance))
    && (!answers.accessibility || !r.accessibility || r.accessibility.some((a : Accessibility) => a === answers.accessibility))  
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