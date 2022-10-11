import type { NextApiRequest, NextApiResponse } from 'next'
import type { Resource, SurveyAnswers } from '../../../models/types'
import FirebaseInteractor from '../../../firebase/firebaseInteractor'
import { WhereQuery } from '../../../firebase/firebaseInteractor'
import {AES, enc} from 'crypto-js'
import { resourceConverter } from '../../../firebase/converters'

export type ResourcesResponse = {
  data: Resource[]
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
    const resourceListData = await getResources([{field: "incomeLevel", comparison: ">=", value: formData.income}])
    res.status(200).json({data: resourceListData})
  } else {
    const resourceListData = await getResources([])
    res.status(200).json({data: resourceListData})
  }
}

async function getResources(queryParams: WhereQuery[]) : Promise<Resource[]> {
    return await FirebaseInteractor.getCollectionData('resources', resourceConverter, queryParams)
}
