import {Fetcher} from 'swr'
import useSWRImmutable from 'swr/immutable'
import { Resource } from '../models/types'

export const useResource = (encryptedQuizResponse: string, id: string) => {
    const resourcesFetcher : Fetcher<Resource[], string>= () => fetch('/api/resources', {method: 'POST', body: JSON.stringify({data: encryptedQuizResponse}), headers: { 'Content-Type': 'application/json' }}).then(res => res.json())
    const {data: resourcesData, error: resourcesError}= useSWRImmutable<Resource[]>(`/api/resources/${encryptedQuizResponse}`, resourcesFetcher)
    const resourceFetcher : Fetcher<Resource, string> = () => {
        const resource : Resource | undefined = resourcesData!.find((r: Resource) => r.id === id)
        if (resource) {
            return resource
        } else {
            return fetch(`/api/resources/${id}`).then(res => res.json())
        }
    }
    const {data, error: resourceError} = useSWRImmutable(() => {
        // @ts-ignore
        const dummyErrorTrigger = resourcesData.length
        return `/api/resources/${id}`
    }, resourceFetcher)
    return {
        resource: data,
        isLoading: !resourcesError && !resourceError && !data,
        isError: resourcesError || resourceError
      }
    

  }