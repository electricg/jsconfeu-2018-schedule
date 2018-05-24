import { Component } from 'react';
import axios from 'axios';

import { parseData } from '../src/utils';

import Day from '../src/components/day';

class PageIndex extends Component {
    static async getInitialProps() {
        const html = await axios.get('https://2018.jsconf.eu/schedule/');

        const schedule = parseData(html.data);

        return { schedule };
    }

    render() {
        const { schedule } = this.props;
        const days = Object.keys(schedule);

        return (
            <main>
                {days.map((day, index) => (
                    <Day
                        key={day}
                        index={index + 1}
                        day={day}
                        data={schedule[day]}
                        days={days}
                    />
                ))}
            </main>
        );
    }
}

export default PageIndex;
