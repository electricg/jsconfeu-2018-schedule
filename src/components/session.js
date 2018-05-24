import Fav from './fav';

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
        <section id={id} className={`session ${trackId}`} dateTime={datetime}>
            {!!multiple && <Fav id={id} day={day} time={time} />}
            <div className="track">{trackName}</div>
            <h3>{what}</h3>
            {who !== 'all' && <div className="speaker">{who}</div>}
            {!!description && (
                <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: `${description}` }}
                />
            )}
        </section>
    );
};

export default Session;
