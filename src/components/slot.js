import { Fragment } from 'react';

import Session from './session';
import { FavInput } from './fav';

const Slot = ({ day, time, data }) => {
    const trackIds = Object.keys(data).sort();
    const multiple = trackIds.indexOf('sidetrack') !== -1;

    return (
        <section
            id={`slot-${day}-${time}`}
            dateTime={`${day} ${time} GMT+0200`}
            className="slot"
        >
            <h2 className="slot__title">{time}</h2>
            {multiple && (
                <input
                    type="button"
                    name="clear-fav"
                    className="fav-clear"
                    value="clear"
                    data-slot={`fav-${day}-${time}`}
                />
            )}
            {trackIds.map(trackId => (
                <Fragment>
                    <FavInput
                        id={data[trackId].id}
                        day={day}
                        time={time}
                        show={multiple}
                    />
                </Fragment>
            ))}
            {trackIds.map(trackId => (
                <Session
                    key={trackId}
                    data={data[trackId]}
                    multiple={multiple}
                />
            ))}
        </section>
    );
};

export default Slot;
