import Document, { Main } from 'next/document';
import Head from './_head';

import css from 'raw-loader!../src/css/style.css';

class MyDocument extends Document {
    render() {
        return (
            <html>
                <Head>
                    <meta charSet="utf-8" />
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

                    <title>JSConf EU 2018 Schedule</title>

                    <style dangerouslySetInnerHTML={{ __html: css }} />
                </Head>
                <body>
                    <Main />
                </body>
            </html>
        );
    }
}

export default MyDocument;
