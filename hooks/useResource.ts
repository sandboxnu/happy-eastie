import {Fetcher} from 'swr'
import useSWRImmutable from 'swr/immutable'
import { Resource } from '../models/types'

type GetResourceResponse = {
    data?: Resource
    error?: string
}

// hook for getting a single resource from api to display in frontend

// useSWR will pass loading/error state if data not retrieved
// this hook is designed to first look in the cached resources to see if the resource has already been fetched  
// if it is not, then it will fetch directly from the api

// data is cached so request is not sent to api every time page is loaded  
export const useResource = (encryptedQuizResponse: string, id: string | string[] | undefined) => {
    const requestBody = encryptedQuizResponse ? JSON.stringify({data: encryptedQuizResponse}) : null
    const requestSettings =  { method: 'POST', body: requestBody, headers: {'Content-Type': 'application/json'}}
    const resourcesFetcher : Fetcher<Resource[], Error>= () => fetch('/api/resources', requestSettings).then(res => res.json())
    const {data: resourcesData}= useSWRImmutable<Resource[], Error>('/api/resources', resourcesFetcher)

    const resourceFetcher : Fetcher<Resource, Error> = () => {
        if (!id || Array.isArray(id)) {
            throw Error(`Invalid resource id type: received ${id} instead of string`)    
        } 
        const resource : Resource | undefined = resourcesData!.find((r: Resource) => r.id === id)
        if (resource) {
            return resource
        } else {
            return fetch(`/api/resources/${id}`).then(res => res.json()).then((r : GetResourceResponse) => {
                // so apparently fetch doesn't throw an "error" when its receives a 404, only on network failure
                // so we have to manually throw the error here if we get an error obj back from the API
                if (r.data) {
                    return r.data
                } else {
                    throw new Error(r.error)
                }
            })
        }
    }
    // if the resources are not ready, the useSWR key function will throw an error 
    // and the resource fetcher will not be called
    const {data, error} = useSWRImmutable<Resource, Error>(() => {
        if (resourcesData != undefined) {
            return `/api/resources/${id}`
        } else {
            throw new Error("Don't proceed")
        }
    }, resourceFetcher, {shouldRetryOnError: false})
    return { resource: data, isLoading: !error && !data, error }
  }