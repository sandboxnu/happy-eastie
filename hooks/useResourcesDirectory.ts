import useSWRImmutable from 'swr/immutable'
import { ResourceData, ResourcesResponse } from '../pages/api/resources'

// hook for getting resources from api to display in frontend

// useSWR will pass loading/error state if data not retrieved
// when resources are ready (not in state isLoading or isError) the data will be propogated 
// to components using useEvents and can be accessed in events field 

// data is cached so request is not sent to api every time page is loaded  
export const useResourcesDirectory = (searchQuery: string = "") => {
  const requestBody = searchQuery ? JSON.stringify({searchParam: searchQuery}) : null
  const requestSettings =  { method: 'POST', body: requestBody, headers: {'Content-Type': 'application/json'}}
  const resourcesFetcher = async () : Promise<ResourceData> => {
      const response : Response = await fetch('/api/resources', requestSettings)
      const resources : ResourcesResponse = await response.json()
      return resources.data
  } 
  const {data, error}= useSWRImmutable<ResourceData, Error>(`/api/resources`, resourcesFetcher)
  return data?.requested
}
