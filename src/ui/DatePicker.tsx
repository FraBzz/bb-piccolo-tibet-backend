import { Input } from '@material-tailwind/react';

type DatePickerProps = {
    value: string | undefined;
    onDateChange: (newDate: string) => void;
}

export function DatePickerInput(data: DatePickerProps) {
    // const [selectedDate, setSelectedDate] = useState('');

    // const handleDateChange = (e: any) => {
    //     setSelectedDate(e.target.value);
    // };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("datepicker date", e.target.value)
        const newDate = e.target.value;
        data.onDateChange(newDate || ''); // Chiamiamo la funzione di callback del padre con la nuova data
      };

    return (
        <div>
            <label htmlFor="datepicker">Seleziona la data di fine:</label>
            <Input
                type="date"
                id="datepicker"
                name="datepicker"
                value={data.value || ''}
                onChange={handleDateChange}
                crossOrigin={undefined}
                label="Data fine evento"
            />
            <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                Data selezionata: {data.value}
            </p>
        </div>
    );
}
