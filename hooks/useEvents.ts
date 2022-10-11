import useSWRImmutable from 'swr/immutable'
import { Event, EventInfo } from '../models/types'
import { EventsResponse } from '../pages/api/events'
import { DeleteEventResponse, EventResponse } from '../pages/api/events/[eventId]'

// hook for getting events from api to display in frontend

// useSWR will pass loading/error state if data not retrieved
// when events are ready (not in state isLoading or isError) the data will be propogated 
// to components using useEvents and can be accessed in events field 

// data is cached so request is not sent to api every time page is loaded  
export const useEvents = () => {
    const {data, error} = useSWRImmutable<Event[], Error>('/api/events', eventsFetcher)
    return { events: data, isLoading: !error && !data, error}
}

const eventsFetcher = async () : Promise<Event[]> => {
  const response : Response = await fetch('/api/events')
  const responseJson : EventsResponse = await response.json()
  if (responseJson.data) {
    return responseJson.data
  } else {
    throw new Error(responseJson.error)
  }
} 

// when the data in the cache needs to be updated, the mutate method can be called
// the mutate method takes a function of type Event[] => Event[], when determines how cached data should be updated
// however, the eventInfo that is being updated is only accessible in the frontend form, not in this hook
// so the frontend can call this function and pass in "newEvent", and gets back the appropriate Event[] => Event[] function
// see https://swr.vercel.app/docs/mutation for clarity
export const addEventHandlerGenerator = (newEvent : EventInfo) : (e: Event[]) => Promise<Event[]> => {
  return async (eventList: Event[]) : Promise<Event[]> => {
    const requestSettings =  { method: 'POST', body: JSON.stringify(newEvent), headers: {'Content-Type': 'application/json'}}
    const response : Response = await fetch('/api/events', requestSettings)
    const responseJson : EventResponse = await response.json()
    if (responseJson.data) {
      return [...eventList, responseJson.data]
    } else {
      throw new Error(responseJson.error)
    }
  }
}

export const modifyEventHandlerGenerator = (newEvent: EventInfo, id: string) : (e: Event[]) => Promise<Event[]> => {
  return async (eventList: Event[]) : Promise<Event[]> => {
    const requestSettings =  { method: 'PUT', body: JSON.stringify(newEvent), headers: {'Content-Type': 'application/json'}}
    const response : Response = await fetch(`/api/events/${id}`, requestSettings)
    const responseData : EventResponse = await response.json()
    if (responseData.data) {
      const updatedEvent = responseData.data
      return eventList.map(event => event.id === id ? updatedEvent : event)
    } else {
      throw new Error(responseData.error)
    }
  }
}

export const deleteEventHandlerGenerator = (id: string) : (e: Event[]) => Promise<Event[]> => {
  return async (eventList: Event[]) : Promise<Event[]> => {
    const response : Response = await fetch(`/api/events/${id}`, { method: 'DELETE'})
    const responseData : DeleteEventResponse = await response.json()
    if (responseData.message) {
      return eventList.filter(event => event.id != id)
    } else {
      throw new Error(responseData.error)
    }
  }
}

