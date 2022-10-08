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

export const addEventFunctionGenerator = (newEvent : Event) : (e: Event[]) => Promise<Event[]> => {
  return async (eventList: Event[]) : Promise<Event[]> => {
    const updatedEvent = await fetch('/api/events', {method: 'POST', body: JSON.stringify(newEvent), headers: {'Content-Type': 'application/json'}}).then(res => res.json())
    return [...eventList, updatedEvent]
  }
}

