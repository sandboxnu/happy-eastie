import {Fetcher} from 'swr'
import useSWRImmutable from 'swr/immutable'
import { Resource } from '../models/types'

// hook for getting a single resource from api to display in frontend

// useSWR will pass loading/error state if data not retrieved
// this hook is designed to first look in the cached resources to see if the resource has already been fetched  
// if it is not, then it will fetch directly from the api

// data is cached so request is not sent to api every time page is loaded  
export const useResource = (encryptedQuizResponse: string, id: string | string[] | undefined) => {
    const requestSettings = {method: 'POST', body: JSON.stringify({data: encryptedQuizResponse}), headers: { 'Content-Type': 'application/json' }}
    const resourcesFetcher : Fetcher<Resource[], Error>= () => fetch('/api/resources', requestSettings).then(res => res.json())
    const {data: resourcesData, error: resourcesError}= useSWRImmutable<Resource[], Error>(`/api/resources/${encryptedQuizResponse}`, resourcesFetcher)

    const resourceFetcher : Fetcher<Resource, Error> = () => {
        if (!id || Array.isArray(id)) {
            throw Error(`Invalid resource id type: received ${id} instead of string`)    
        } 
        const resource : Resource | undefined = resourcesData!.find((r: Resource) => r.id === id)
        if (resource) {
            return resource
        } else {
            return fetch(`/api/resources/${id}`).then(res => res.json())
        }
    }
    // if the resources are not ready, the useSWR key function will throw an error 
    // and the resource fetcher will not be called
    const {data, error} = useSWRImmutable<Resource, Error>(() => resourcesData ? `/api/resources/${id}` : Error("Don't proceed"), resourceFetcher)
    
    return { resource: data, isLoading: !resourcesError && !error && !data, isError: resourcesError || error }
  }