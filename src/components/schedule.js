import { Fragment } from 'react';

import Day from './day';

const Schedule = ({ data }) => {
    const days = Object.keys(data);

    return (
        <Fragment>
            {days.map((day, index) => (
                <Day
                    key={day}
                    index={index + 1}
                    day={day}
                    data={data[day]}
                    days={days}
                />
            ))}
        </Fragment>
    );
};

export default Schedule;
