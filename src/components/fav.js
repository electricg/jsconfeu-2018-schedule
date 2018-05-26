const FavInput = ({ id, day, time, show }) => {
    if (!show) {
        return null;
    }

    return (
        <input
            type="radio"
            id={`fav-${id}`}
            name={`fav-${day}-${time}`}
            className="fav__input"
        />
    );
};

const FavLabel = ({ id, show }) => {
    if (!show) {
        return null;
    }

    return <label htmlFor={`fav-${id}`} className="fav__label" />;
};

const FavReset = ({ day, time, show }) => {
    if (!show) {
        return null;
    }

    return (
        <input
            type="button"
            name="clear-fav"
            className="fav__clear"
            value="reset"
            data-slot={`fav-${day}-${time}`}
        />
    );
};

export { FavInput, FavLabel, FavReset };
