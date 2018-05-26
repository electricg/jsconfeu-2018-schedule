import Document from 'next/document';
import Head from './_head';
import Main from './_main';

import { version } from '../package.json';

import css from 'raw-loader!../src/static/css/style.css';
// Enforce that only the loader in the import statement is used by prefixing it with a !
import js from '!raw-loader!../src/static/js/script.js';

class MyDocument extends Document {
    render() {
        return (
            <html>
                <Head>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <meta
                        name="author"
                        content="Giulia Alfonsi - @electric_g"
                    />
                    <meta name="robots" content="noindex,nofollow" />

                    <link rel="manifest" href="/static/manifest.json" />

                    <title>JSConf EU 2018 Schedule</title>

                    <style dangerouslySetInnerHTML={{ __html: css }} />
                </Head>
                <body>
                    <span className="version">v{version}</span>
                    <Main />
                    <script dangerouslySetInnerHTML={{ __html: js }} />
                </body>
            </html>
        );
    }
}

export default MyDocument;
