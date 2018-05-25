import { Fragment } from 'react';

import { FavInput, FavLabel } from './fav';

const Session = ({ data, multiple }) => {
    const {
        id,
        datetime,
        day,
        time,
        who,
        what,
        trackId,
        trackName,
        description
    } = data;
    return (
        <Fragment>
            <FavInput id={id} day={day} time={time} show={multiple} />
            <section
                id={id}
                className={`session ${trackId}`}
                dateTime={datetime}
            >
                <div className="track">
                    {trackName} <FavLabel id={id} show={multiple} />
                </div>
                <h3>{what}</h3>
                {who !== 'all' && <div className="speaker">{who}</div>}
                {!!description && (
                    <div
                        className="description"
                        dangerouslySetInnerHTML={{ __html: `${description}` }}
                    />
                )}
            </section>
        </Fragment>
    );
};

export default Session;
