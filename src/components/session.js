import { Fragment } from 'react';

import { FavLabel } from './fav';

const Session = ({ data, multiple }) => {
    const { id, who, what, trackId, trackName, description } = data;
    return (
        <Fragment>
            <section id={id} className={`session ${trackId}`}>
                <div className="track">
                    {trackName} <FavLabel id={id} show={multiple} />
                </div>
                <h3>{what}</h3>
                {who !== 'all' && <div className="speaker">{who}</div>}
                {!!description && (
                    <details
                        className="description"
                        dangerouslySetInnerHTML={{
                            __html: `<summary>description</summary>${description}`
                        }}
                    />
                )}
            </section>
        </Fragment>
    );
};

export default Session;
