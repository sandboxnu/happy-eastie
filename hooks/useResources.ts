import {Fetcher} from 'swr'
import useSWRImmutable from 'swr/immutable'
import { Resource } from '../models/types'

type GetResourcesResponse = {
    data: Resource[]
}

// hook for getting resources from api to display in frontend

// useSWR will pass loading/error state if data not retrieved
// when resources are ready (not in state isLoading or isError) the data will be propogated 
// to components using useEvents and can be accessed in events field 

// data is cached so request is not sent to api every time page is loaded  
export const useResources = (encryptedQuizResponse: string) => {
    const requestBody = encryptedQuizResponse ? JSON.stringify({data: encryptedQuizResponse}) : null
    const requestSettings =  { method: 'POST', body: requestBody, headers: {'Content-Type': 'application/json'}}
    const resourcesFetcher : Fetcher<Resource[], Error>= () => fetch('/api/resources', requestSettings)
      .then((res : Response) => res.json())
      .then((r: GetResourcesResponse) => r.data)
    const {data, error}= useSWRImmutable<Resource[], Error>(`/api/resources`, resourcesFetcher)
    return { resources: data, isLoading: !error && !data, error }
}
