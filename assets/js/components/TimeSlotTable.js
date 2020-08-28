import React from 'react';

function TimeSlotTable({ salonOpensAt, salonClosesAt, today }) {

    const toTimeValue = timestamp => new Date(timestamp).toTimeString().substring(0, 5);

    const toShortDate = timestamp => {
        const [day, , dayOfMonth] = new Date(timestamp)
            .toDateString()
            .split(' ');
        return `${day} ${dayOfMonth}`;
    };

    const timeIncrements = (numTimes, startTime, increment) =>
        Array(numTimes)
            .fill([startTime])
            .reduce((acc, _, i) =>
                acc.concat([startTime + (i * increment)]));


    const dailyTimeSlots = (salonOpensAt, salonClosesAt) => {
        const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);
        const increment = 30 * 60 * 1000;
        const totalSlots = (salonClosesAt - salonOpensAt) * 2;

        return timeIncrements(totalSlots, startTime, increment);
    };

    const weeklyDateValues = (startDate) => {
        const midnight = new Date(startDate).setHours(0, 0, 0, 0);
        const increment = 24 * 60 * 60 * 1000;

        return timeIncrements(7, midnight, increment);
    };

    const timeSlots = dailyTimeSlots( salonOpensAt, salonClosesAt);
    const dates = weeklyDateValues(today);

    return (
        <table id="time-slots">
            <thead>
                <tr>
                    <th />
                    {dates.map(d => (
                        <th key={d}>{toShortDate(d)}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
            {timeSlots.map(timeSlot => (
                <tr key={timeSlot}>
                    <th>{toTimeValue(timeSlot)}</th>
                </tr>
            ))}
            </tbody>
        </table>
    );
};


export default TimeSlotTable;