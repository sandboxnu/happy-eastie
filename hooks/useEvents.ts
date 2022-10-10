import useSWRImmutable from 'swr/immutable'
import { Event, EventInfo } from '../models/types'

// hook for getting events from api to display in frontend

// useSWR will pass loading/error state if data not retrieved
// when events are ready (not in state isLoading or isError) the data will be propogated 
// to components using useEvents and can be accessed in events field 

// data is cached so request is not sent to api every time page is loaded  
export const useEvents = () => {
    // TODO: robust error handling 
    const eventsFetcher = () => fetch('/api/events').then(res => res.json())
    const {data, error} = useSWRImmutable<Event[], Error>('/api/events', eventsFetcher)
    return { events: data, isLoading: !error && !data, isError: error}
}

// when the data in the cache needs to be updated, the mutate method can be called
// the mutate method takes a function of type Event[] => Event[], when determines how cached data should be updated
// however, the eventInfo that is being updated is only accessible in the frontend form, not in this hook
// so the frontend can call this function and pass in "newEvent", and gets back the appropriate Event[] => Event[] function
// see https://swr.vercel.app/docs/mutation for clarity
export const addEventHandlerGenerator = (newEvent : EventInfo) : (e: Event[]) => Promise<Event[]> => {
  return async (eventList: Event[]) : Promise<Event[]> => {
    const requestSettings =  { method: 'POST', body: JSON.stringify(newEvent), headers: {'Content-Type': 'application/json'}}
    const updatedEvent : Event = await fetch('/api/events', requestSettings).then(res => res.json())
    return [...eventList, updatedEvent]
  }
}

export const modifyEventHandlerGenerator = (newEvent: EventInfo, id: string) : (e: Event[]) => Promise<Event[]> => {
  return async (eventList: Event[]) : Promise<Event[]> => {
    const requestSettings =  { method: 'PUT', body: JSON.stringify(newEvent), headers: {'Content-Type': 'application/json'}}
    const updatedEvent : Event = await fetch(`/api/events/${id}`, requestSettings).then(res => res.json())
    return eventList.map(event => event.id == id ? updatedEvent : event)
  }
}

export const deleteEventHandlerGenerator = (id: string) : (e: Event[]) => Promise<Event[]> => {
  return async (eventList: Event[]) : Promise<Event[]> => {
    await fetch(`/api/events/${id}`,  { method: 'DELETE'})
    return eventList.filter(event => event.id != id)
  }
}

