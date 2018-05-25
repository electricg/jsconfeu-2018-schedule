import Session from './session';

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
