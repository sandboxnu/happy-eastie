import type { NextApiRequest, NextApiResponse } from 'next'
import type { Resource } from '../../../models/types'
import FirebaseInteractor from '../../../firebase/firebaseInteractor'
import { WhereQuery } from '../../../firebase/firebaseInteractor'
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase/firestore'

const resourceConverter : FirestoreDataConverter<Resource> = {
    toFirestore: (data: Resource) : DocumentData => data,
    fromFirestore: (snap: QueryDocumentSnapshot) : Resource => {
      let data = snap.data() as Resource
      data.id = snap.id
      return data
    }
}

// const encodeResourceList = (resourcesString: string) : string => {
//   const encryptedResources = CryptoJS.AES.encrypt(resourcesString, "Secret Passphrase").toString();
//   console.log(encryptedResources)
//   return encryptedResources
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    const idList : string[] = req.query['ids'] as string[]
    const allResources : Resource[] = await getResources([])
    const resources : Resource[] = allResources.filter((resource: Resource) => idList.includes(resource.id))
    res.status(200).json(resources)
  } else if (req.method === 'POST') {
    const incomeLevel : number = parseInt(req.body['incomeLevel'] ? req.body['incomeLevel'] as string : "1000000")
    const resourceListData : Resource[] = await getResources([{field: "incomeLevel", comparison: "<=", value: incomeLevel}])
    res.status(200).json(resourceListData.map((resource : Resource) => resource.id));
  } else {
    res.status(405).json({error: "Unsupported operation"})
  }
}

async function getResources(queryParams: WhereQuery[]) : Promise<Resource[]> {
    const firebaseInteractor = new FirebaseInteractor() 
    const resourceList : Resource[] = await firebaseInteractor.getCollectionData('resources', resourceConverter, queryParams)
    return resourceList;
}
