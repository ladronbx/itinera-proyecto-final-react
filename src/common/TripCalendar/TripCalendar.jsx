import React from 'react'; import FullCalendar from '@fullcalendar/react'; import timeGridPlugin from '@fullcalendar/timegrid';

export default class TripCalendar extends React.Component {
    render() {
        console.log('Rendering TripCalendar');
        // Mapear las actividades a eventos
        const { trip } = this.props;

        console.log('Trip:', trip); // Verificar los datos del viaje
        const startDate = new Date(trip.start_date);
        const endDate = new Date(trip.end_date);
        const oneDay = 24 * 60 * 60 * 1000; // horas*minutos*segundos*milliseconds
        const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));

        let currentDay = 0;
        let currentHour = 9;

        const events = trip.activities.map((activity) => {
            const start = new Date(trip.start_date);
            start.setDate(start.getDate() + currentDay);
            start.setHours(currentHour, 0, 0);

            const end = new Date(start.getTime() + activity.duration * 60 * 60 * 1000);

            // Incrementa la "hora actual" por la duración de la actividad más una hora adicional
            currentHour += activity.duration + 1;

            // Si la "hora actual" es después de las 7 PM, pasa al siguiente día y reinicia la "hora actual" a las 9 AM
            if (currentHour >= 19) {
                currentDay += 1;
                currentHour = 9;
            }

            return {
                title: activity.name,
                start: start.toISOString(),
                end: end.toISOString()
            };
        });

        console.log('Events:', events); // Verificar los eventos generados

        return (
            <FullCalendar
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                initialDate={new Date(trip.start_date)}
                visibleRange={{
                    start: new Date(trip.start_date),
                    end: new Date(trip.end_date)
                }}
                events={events}
                slotMinTime="09:00:00"
                slotMaxTime="19:00:00"
            />
        )
    }
}