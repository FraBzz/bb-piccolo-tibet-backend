import { EventModel } from "../models/event.model";
import { responseModel } from "../models/response.model";

class EventDataService {
    async getAll(): Promise<EventModel[]> {
        const res = await fetch("http://localhost:8080/api/events");
        const data = await res.json();
        return data;
    }

    async getById(eventId: string | undefined): Promise<EventModel> {
        const res = await fetch(`http://localhost:8080/api/events/${eventId}`);
        const data = await res.json();
        console.log({data})
        return data;
    }

    async delete(eventId: string | undefined): Promise<responseModel> {
        const res = await fetch(`http://localhost:8080/api/events/${eventId}`, {
            method: 'DELETE'
        });
        const data = await res.json();
        return data;
    }

    async create(event: EventModel): Promise<responseModel> {
        console.log("create", JSON.stringify(event))

        const formData = new FormData();
    
        formData.append('title', event.title);
        formData.append('description', event.description);
        formData.append('published', String(event.published));
        if (event.image) {
            formData.append('image', event.image);
            formData.append('imageName', event.image.name);
        } else {
            formData.append('imageName', event.imageName);
        }

        console.log({formData})

        const res = await fetch(`http://localhost:8080/api/events/`, {
            method: 'POST',
            // headers: {
            //     "Content-Type": "application/json",
            //     // 'Content-Type': 'application/x-www-form-urlencoded',
            //   },
            body: formData
        });
        return res.json();
    }

    async update(eventId: string | undefined, event: EventModel): Promise<responseModel> {
        console.log("update", JSON.stringify(event))

        const formData = new FormData();
    
        formData.append('title', event.title);
        formData.append('description', event.description);
        formData.append('published', String(event.published));
        if (event.image) {
            formData.append('image', event.image);
            formData.append('imageName', event.image.name);
        } else {
            formData.append('imageName', event.imageName);
        }

        console.log({formData})

        const res = await fetch(`http://localhost:8080/api/events/${eventId}`, {
            method: 'PUT',
            body: formData
        });
        return res.json();
    }
}

export default EventDataService;
