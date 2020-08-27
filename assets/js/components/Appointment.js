import React from 'react';

function Appointment ({customer}) {
    return (
        <div>{customer.firstName}</div>
    );
}

export default Appointment;