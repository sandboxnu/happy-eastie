import {Fetcher} from 'swr'
import useSWRImmutable from 'swr/immutable'
import { Event } from '../models/types'

export const useEvents = () => {
    const eventsFetcher : Fetcher<Event[], string>= () => fetch('/api/events').then(res => res.json())
    const {data, error}= useSWRImmutable<Event[]>(`/api/events`, eventsFetcher)

    return {
      events: data,
      isLoading: !error && !data,
      isError: error
    }
  }