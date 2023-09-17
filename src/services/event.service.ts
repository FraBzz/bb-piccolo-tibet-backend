import { EventModel } from "../models/event.model";

class EventDataService {
    async getAll(): Promise<EventModel[]> {
        const res = await fetch("http://localhost:8080/api/events");
        const data = await res.json();
        return data;
    }

    async getById(eventId: string | undefined): Promise<EventModel> {
        const res = await fetch(`http://localhost:8080/api/events/${eventId}`);
        const data = await res.json();
        return data;
    }
}

export default EventDataService;
