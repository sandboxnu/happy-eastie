import { useContext } from 'react'
import useSWRImmutable from 'swr/immutable'
import { AppContext } from '../context/context'
import { Resource } from '../models/types'
import { ResourcesResponse } from '../pages/api/resources'
import { ResourceResponse } from '../pages/api/resources/[resourceId]'

// hook for getting a single resource from api to display in frontend

// useSWR will pass loading/error state if data not retrieved
// this hook is designed to first look in the cached resources to see if the resource has already been fetched  
// if it is not, then it will fetch directly from the api

// data is cached so request is not sent to api every time page is loaded  
export const useResource = (id: string | string[] | undefined) => {
    const quizState = useContext(AppContext)
    const requestBody = quizState.encryptedQuizResponse ? JSON.stringify({data: quizState.encryptedQuizResponse}) : null
    const requestSettings =  { method: 'POST', body: requestBody, headers: {'Content-Type': 'application/json'}}
    const resourcesFetcher = async () : Promise<Resource[]> => {
        const response : Response = await fetch('/api/resources', requestSettings)
        const resources : ResourcesResponse = await response.json()
        return resources.data.requested.concat(resources.data.additional)
    } 
    const {data: resourcesData}= useSWRImmutable<Resource[], Error>('/api/resources', resourcesFetcher)

    const resourceFetcher = async () : Promise<Resource> => {
        if (!id || Array.isArray(id)) {
            throw Error(`Invalid resource id type: received ${id} instead of string`)    
        } 
        const resource : Resource | undefined = resourcesData!.find((r: Resource) => r.id === id)
        if (resource) {
            return resource
        } else {
            const response : Response = await fetch(`/api/resources/${id}`)
            const responseJson : ResourceResponse = await response.json()
            if (responseJson.data) {
                return responseJson.data
            } else {
                throw new Error(responseJson.error)
            }
        }
    }
    const resourceKeyFunction = () : string => {
        if (resourcesData != undefined) {
            return `/api/resources/${id}`
        } else {
            throw new Error("Don't proceed")
        }
    }
    // if the resources are not ready, the useSWR key function will throw an error 
    // and the resource fetcher will not be called
    const {data, error} = useSWRImmutable<Resource, Error>(resourceKeyFunction, resourceFetcher, {shouldRetryOnError: false})
    return { resource: data, isLoading: !error && !data, error }
  }

