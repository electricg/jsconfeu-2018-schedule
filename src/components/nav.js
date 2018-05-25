const Nav = ({ days, active }) => {
    return (
        <header>
            <nav>
                {days.map((day, index) => (
                    <a
                        key={day}
                        href={`#day-${day}`}
                        className={index + 1 === active ? 'active' : ''}
                    >
                        Day {index + 1}
                    </a>
                ))}
            </nav>
            <input
                type="button"
                name="clear-fav"
                className="fav-clear"
                value="clear"
            />
        </header>
    );
};

export default Nav;
