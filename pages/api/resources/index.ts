import type { NextApiRequest, NextApiResponse } from 'next'
import type { Resource } from '../../../models/types'
import FirebaseInteractor from '../../../firebase/firebaseInteractor'
import { WhereQuery } from '../../../firebase/firebaseInteractor'
import {AES, enc} from 'crypto-js'
import { resourceConverter } from '../../../firebase/converters'

// this endpoint supports two ways of getting resources:
// 1. it expects a post request with body of structure {data: encryptedQuizResponses}
// the quiz response is decrypted and then used to filter relevant resources
// 2. it returns all resources by default if no body is sent
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.body['data']) {
    const encryptedFormData : string = req.body['data'] as string
    const formData = JSON.parse(AES.decrypt(encryptedFormData, "Secret Passphrase").toString(enc.Utf8));
    const resourceListData : Resource[] = await getResources([{field: "incomeLevel", comparison: ">=", value: parseInt(formData["incomeLevel"])}])
    res.status(200).json(resourceListData)
  } else {
    const resourceListData : Resource[] = await getResources([])
    res.status(200).json(resourceListData)
  }
}

async function getResources(queryParams: WhereQuery[]) : Promise<Resource[]> {
    const firebaseInteractor = new FirebaseInteractor() 
    const resourceList : Resource[] = await firebaseInteractor.getCollectionData('resources', resourceConverter, queryParams)
    return resourceList;
}
