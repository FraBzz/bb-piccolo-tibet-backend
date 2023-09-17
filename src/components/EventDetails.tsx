import { useEffect, useState, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import EventDataService from '../services/event.service';
import { EventModel } from '../models/event.model';

type FieldName = keyof EventModel;

export const EventDetails = () => {
  const [event, setEvent] = useState<EventModel | undefined>(undefined);
  const { eventId } = useParams<{ eventId: string }>();
  const eventService = new EventDataService();

  useEffect(() => {
    const fetchData = async () => {
      const eventData = await eventService.getById(eventId);
      setEvent(eventData);
    };

    fetchData();
  }, [eventId]);

  const handleChange = (fieldName: FieldName) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Assicurati che l'evento esista prima di aggiornare lo stato
    if (event) {
      setEvent((prevEvent) => {
        if (prevEvent) {
          return {
            ...prevEvent,
            [fieldName]: event.target.value,
          };
        }
        return prevEvent;
      });
    }
  };

  return (
    <>
      <form className="w-full max-w-lg ml-8 justify-center items-center">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Titolo
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              value={event?.title || ''}
              onChange={handleChange('title')}
            />
            <p className="text-red-500 text-xs italic">Please fill out this field.</p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Descrizione
            </label>
            <textarea
              value={event?.description || ''}
              onChange={handleChange('description')}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              placeholder="Doe"
            />
          </div>
        </div>
      </form>
    </>
  );
};
