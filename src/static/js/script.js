(function() {
    const namespace = 'jsconfeu-2018-schedule';

    /**
     * Get list of IDs of checked radio input
     * @returns {string[]}
     */
    const getSelected = () => {
        const inputs = [...document.querySelectorAll('input[type=radio]')];

        const selected = inputs.filter(el => {
            return el.checked;
        });

        const ids = selected.map(el => {
            return el.id;
        });

        return ids;
    };

    /**
     * Check all the radio input with the given IDs from list
     * @param {string[]} selected
     */
    const setSelected = (selected = []) => {
        selected.forEach(id => {
            const el = document.querySelector(`#${id}`);
            el.click();
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

        const inputs = [...document.querySelectorAll('input[type=radio]')];
        inputs.forEach(el => {
            el.addEventListener('change', onRadioChange);
        });
    };

    /**
     * To run when an input radio is clicked
     */
    const onRadioChange = () => {
        const selected = getSelected();
        saveSelected(selected);
    };

    window.onload = onPageLoad;
})();
