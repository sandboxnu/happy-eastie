import useSWR, {Fetcher} from 'swr'
import useSWRImmutable from 'swr/immutable'
import { Resource } from '../models/types'

export const useResources = (encryptedQuizResponse: string) => {
    const resourcesFetcher : Fetcher<Resource[], string>= () => fetch('/api/resources', {method: 'POST', body: JSON.stringify({data: encryptedQuizResponse}), headers: { 'Content-Type': 'application/json' }}).then(res => res.json())
    const {data, error}= useSWRImmutable<Resource[]>(`/api/resources/${encryptedQuizResponse}`, resourcesFetcher)

    return {
      resources: data,
      isLoading: !error && !data,
      isError: error
    }
  }