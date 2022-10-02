import type { NextApiRequest, NextApiResponse } from 'next'
import type { Resource } from '../../../models/types'
import FirebaseInteractor from '../../../firebase/firebaseInteractor'
import { WhereQuery } from '../../../firebase/firebaseInteractor'
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase/firestore'
import {AES, enc} from 'crypto-js'

const resourceConverter : FirestoreDataConverter<Resource> = {
    toFirestore: (data: Resource) : DocumentData => data,
    fromFirestore: (snap: QueryDocumentSnapshot) : Resource => {
      let data = snap.data() as Resource
      data.id = snap.id
      return data
    }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const encryptedFormData : string = req.body['data'] as string
  const formData = JSON.parse(AES.decrypt(encryptedFormData, "Secret Passphrase").toString(enc.Utf8));
  const resourceListData : Resource[] = await getResources([{field: "incomeLevel", comparison: ">=", value: parseInt(formData["incomeLevel"])}])
  res.status(200).json(resourceListData)
}

async function getResources(queryParams: WhereQuery[]) : Promise<Resource[]> {
    const firebaseInteractor = new FirebaseInteractor() 
    const resourceList : Resource[] = await firebaseInteractor.getCollectionData('resources', resourceConverter, queryParams)
    return resourceList;
}
