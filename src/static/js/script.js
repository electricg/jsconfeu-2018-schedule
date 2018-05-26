//=== Save fav sessions
(function() {
    const namespace = 'jsconfeu-2018-schedule';
    const inputs = [...document.querySelectorAll('input[type=radio]')];

    /**
     * Get list of IDs of checked radio input
     * @returns {string[]}
     */
    const getSelected = () => {
        const selected = inputs.filter(el => {
            return el.checked;
        });

        const ids = selected.map(el => {
            return el.id;
        });

        return ids;
    };

    /**
     * Clear all radio input
     */
    const resetInput = () => {
        inputs.forEach(el => {
            el.checked = false;
        });
    };

    /**
     * Check all the radio input with the given IDs from list
     * @param {string[]} selected
     */
    const setSelected = (selected = []) => {
        resetInput();
        selected.forEach(id => {
            const el = document.querySelector(`#${id}`);

            if (el) {
                el.click();
            }
        });
    };

    /**
     * Save list of IDs into localStorage
     * @param {string[]} selected
     */
    const saveSelected = selected => {
        localStorage.setItem(namespace, JSON.stringify(selected));
    };

    /**
     * Load list of IDs from localStorage
     * @returns {string[]}
     */
    const loadSelected = () => {
        return JSON.parse(localStorage.getItem(namespace)) || [];
    };

    /**
     * To run when the page is loaded first time
     */
    const onPageLoad = () => {
        const selected = loadSelected();
        setSelected(selected);

        inputs.forEach(el => {
            el.addEventListener('change', onRadioChange);
        });

        [...document.querySelectorAll('input[name=clear-fav]')].forEach(el => {
            el.addEventListener('click', onClearClick);
        });
    };

    /**
     * To run when an input radio is clicked
     */
    const onRadioChange = () => {
        const selected = getSelected();
        saveSelected(selected);
    };

    /**
     * To run when clear button is clicked
     */
    const onClearClick = e => {
        const el = e.target;
        const name = el.getAttribute('data-slot');
        const radios = [...document.querySelectorAll(`input[name='${name}']`)];

        radios.forEach(radio => {
            radio.checked = false;
        });

        onRadioChange();
    };

    window.addEventListener('load', onPageLoad);
})();

//=== Scroll to session
(function() {
    /**
     * Find current slot in relation to a given date
     * @param {string|Date} date
     * @returns {HTMLElement}
     */
    const getCurrentSlot = date => {
        const confYear = 2018;
        const confMonth = 5;
        const confDay1 = 2;
        const confDay2 = 3;

        const today = typeof date === 'string' ? new Date(date) : date;
        const todayYear = today.getFullYear();
        const todayMonth = today.getMonth();
        const todayDay = today.getDate();

        let isConfDay = false;

        if (
            confYear === todayYear &&
            confMonth === todayMonth &&
            (confDay1 === todayDay || confDay2 === todayDay)
        ) {
            isConfDay = true;
        }

        if (!isConfDay) {
            return false;
        }

        const fiveMinutes = 5 * 1000 * 60;
        const slots = [...document.querySelectorAll('.slot')];

        // Loop through the slots, the first with a starting time earlier
        // than now is the current one.
        // Set the starting time 5 minutes earlier to consider the break
        // between each slot
        const next = slots.reduce((acc, slot) => {
            if (
                Date.parse(slot.getAttribute('datetime')) - fiveMinutes <
                today
            ) {
                acc = slot;
            }

            return acc;
        }, false);

        return next;
    };

    /**
     * Scroll to given element
     * @param {HTMLElement} el Element to scroll to
     */
    const scrollToElement = el => {
        if (el) {
            el.scrollIntoView(true);
        }
    };

    /**
     * Scroll to slot
     */
    const scrollToSlot = () => {
        // const date = '2018-06-03 13:56 GMT+0200';
        const date = new Date();
        // header height including border and padding
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;

        const slot = getCurrentSlot(date);

        if (slot) {
            scrollToElement(slot);

            // now account for fixed header
            const scrolledY = window.scrollY;

            // add 1px for rounding
            if (scrolledY) {
                window.scroll(0, scrolledY - headerHeight - 1);
            }
        }
    };

    /**
     * To run when the page is loaded first time
     */
    const onPageLoad = () => {
        setTimeout(() => {
            scrollToSlot();
        }, 0);

        document.querySelector('#now').addEventListener('click', scrollToSlot);
    };

    window.addEventListener('load', onPageLoad);
})();

//=== Service Workers
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/sw.js', { scope: '/' });
// }
