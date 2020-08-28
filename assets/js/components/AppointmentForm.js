import React from 'react';

function AppointmentForm ({ selectableServices, service }) {
    return (
        <form id="appointment">
            <select
                value={service}
                name="service"
                readOnly>

                <option/>

                {selectableServices.map(s => (
                    <option key={s}>{s}</option>
                ))}
            </select>
        </form>
    );
}

export default AppointmentForm;