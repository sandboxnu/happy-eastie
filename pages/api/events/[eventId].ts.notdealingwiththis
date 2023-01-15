import type { NextApiRequest, NextApiResponse } from "next";
import type { Event, EventInfo } from "../../../models/types";
import FirebaseInteractor from "../../../db/firebaseInteractor";
import { eventConverter } from "../../../db/converters";

export type EventResponse = {
  data?: Event;
  error?: string;
};

export type DeleteEventResponse = {
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventResponse | DeleteEventResponse>
) {
  const id = req.query["eventId"];
  if (!id || Array.isArray(id)) {
    return res
      .status(401)
      .json({
        error: `Invalid value for required query param eventId: received ${id}`,
      });
  }
  if (req.method === "GET") {
    const event = await getEvent(id);
    return event
      ? res.status(200).json({ data: event })
      : res.status(404).json({ error: `Resource ${id} not found` });
  } else if (req.method === "PUT") {
    // TODO: error handling for invalid event passed here?
    const event: EventInfo = req.body;
    const updatedEvent = await modifyEvent(event, id);
    res.status(200).json({ data: updatedEvent });
  } else if (req.method === "DELETE") {
    await deleteEvent(id);
    res.status(200).json({ message: `Resource id ${id} deleted successfully` });
  } else {
    res.status(405).json({ error: "unsupported" });
  }
}

async function getEvent(id: string): Promise<Event | undefined> {
  return await FirebaseInteractor.getDocumentById("events", id, eventConverter);
}

async function modifyEvent(newEvent: EventInfo, id: string): Promise<Event> {
  return {
    id,
    ...(await FirebaseInteractor.updateDocument(
      "events",
      newEvent,
      id,
      eventConverter
    )),
  };
}

async function deleteEvent(id: string): Promise<void> {
  FirebaseInteractor.deleteDocument("events", id);
}
