import React from 'react';
import TimeSlotTable from './TimeSlotTable';

AppointmentForm.defaultProps = {
    salonOpensAt: 9,
    salonClosesAt: 19,
    selectableServices: [],
    today: new Date()
};

function AppointmentForm({ selectableServices, service, onSubmit, salonOpensAt, salonClosesAt, today }) {

    const handleServiceChange = () => {};

    return (
        <form id="appointment" onSubmit={() => onSubmit(appointment)}>
            <label htmlFor="service">Salon service</label>

            <select
                name="service"
                id="service"
                value={service}
                onChange={handleServiceChange}>
                <option/>
                {selectableServices.map(s => (
                    <option key={s}>{s}</option>
                ))}
            </select>

            <TimeSlotTable
                today={today}
                salonOpensAt={salonOpensAt}
                salonClosesAt={salonClosesAt}
            />

        </form>
    );
}

export default AppointmentForm;