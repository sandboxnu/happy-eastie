import useSWRImmutable from 'swr/immutable'
import { Event, EventInfo } from '../models/types'

type GetEventsResponse = {
  data?: Event[]
  error?: string
}

type CreateEventResponse = {
  data?: Event
  error?: string
}


type ModifyEventResponse = {
  data?: Event
  error?: string
}


type DeleteEventResponse = {
  message?: string
  error?: string
}

// hook for getting events from api to display in frontend

// useSWR will pass loading/error state if data not retrieved
// when events are ready (not in state isLoading or isError) the data will be propogated 
// to components using useEvents and can be accessed in events field 

// data is cached so request is not sent to api every time page is loaded  
export const useEvents = () => {
    const eventsFetcher = () => fetch('/api/events')
      .then((res : Response) => res.json())
      .then((r: GetEventsResponse) => {
        if (r.data) {
          return r.data
        } else {
          throw new Error(r.error)
        }
      })
    const {data, error} = useSWRImmutable<Event[], Error>('/api/events', eventsFetcher)
    return { events: data, isLoading: !error && !data, error}
}

// when the data in the cache needs to be updated, the mutate method can be called
// the mutate method takes a function of type Event[] => Event[], when determines how cached data should be updated
// however, the eventInfo that is being updated is only accessible in the frontend form, not in this hook
// so the frontend can call this function and pass in "newEvent", and gets back the appropriate Event[] => Event[] function
// see https://swr.vercel.app/docs/mutation for clarity
export const addEventHandlerGenerator = (newEvent : EventInfo) : (e: Event[]) => Promise<Event[]> => {
  return (eventList: Event[]) : Promise<Event[]> => {
    const requestSettings =  { method: 'POST', body: JSON.stringify(newEvent), headers: {'Content-Type': 'application/json'}}
    return fetch('/api/events', requestSettings).then(res => res.json()).then((r: CreateEventResponse) => {
      if (r.data) {
        return [...eventList, r.data] 
      } else {
        throw new Error(r.error)
      }
    })
  }
}

export const modifyEventHandlerGenerator = (newEvent: EventInfo, id: string) : (e: Event[]) => Promise<Event[]> => {
  return async (eventList: Event[]) : Promise<Event[]> => {
    const requestSettings =  { method: 'PUT', body: JSON.stringify(newEvent), headers: {'Content-Type': 'application/json'}}
    return fetch(`/api/events/${id}`, requestSettings).then(res => res.json()).then((r: ModifyEventResponse) => {
      if (r.data) {
        const updatedEvent = r.data
        return eventList.map(event => event.id === id ? updatedEvent : event)
      } else {
        throw new Error(r.error)
      }
    }) 
  }
}

export const deleteEventHandlerGenerator = (id: string) : (e: Event[]) => Promise<Event[]> => {
  return (eventList: Event[]) : Promise<Event[]> => {
    return fetch(`/api/events/${id}`,  { method: 'DELETE'}).then(res => res.json()).then((r: DeleteEventResponse) => {
      if (r.message) {
        return eventList.filter(event => event.id != id)
      } else {
        throw new Error(r.error)
      }
    })
  }
}

