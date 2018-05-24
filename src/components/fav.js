const Fav = ({ id, day, time }) => {
    return (
        <div className="fav">
            <input
                type="radio"
                id={`fav-${id}`}
                name={`fav-${day}-${time}`}
                className="fav__input"
            />
            <label htmlFor={`fav-${id}`} className="fav__label" />
        </div>
    );
};

export default Fav;
