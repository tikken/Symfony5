import React, {useState} from 'react';

export const Appointment = ({customer}) => <div>{customer.firstName}</div>;

export const AppointmentsDayView = ({appointments}) => {
    const [selectedAppointment, setSelectedAppointment] = useState(
        0
    );
    return (
        <div id="appointmentsDayView">
            <ol>
                {appointments.map((appointment,i) => (
                    <li key={appointment.startsAt}>
                        <button type="button" onClick={() => setSelectedAppointment(i)}>
                            {appointment.startsAt}
                        </button>
                    </li>))}

                {appointments.length === 0 ? (
                    <p>There are no appointments scheduled for today.</p>
                ) : (
                    <Appointment {...appointments[selectedAppointment]} />
                )}

            </ol>
        </div>
    );
};