import { resultProps } from "../components/EventsList";

class EventDataService {
    async getAll(): Promise<resultProps[]> {
        const res = await fetch("http://localhost:8080/api/events");
        const data = await res.json();
        return data;
    }
}

export default EventDataService;
