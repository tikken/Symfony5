import React, {useState} from 'react';
import Appointment from './Appointment';

function AppointmentsDayView({appointments}) {
    const [selectedAppointment, setSelectedAppointment] = useState(0);

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
                    <div>
                        <br/>
                        <Appointment {...appointments[selectedAppointment]} />
                    </div>
                )}

            </ol>
        </div>
    );
};

export default AppointmentsDayView;