// remove next.js custom scripts
// https://github.com/zeit/next.js/issues/3155#issuecomment-338708632
import React from 'react';
import { Head } from 'next/document';

export default class MyHead extends Head {
    // remove as='script' in return statement
    getChunkPreloadLink(filename) {
        const { __NEXT_DATA__, buildManifest } = this.context._documentProps;
        let { assetPrefix } = __NEXT_DATA__;

        const files = buildManifest[filename];

        return files.map(file => {
            return (
                <link
                    key={filename}
                    rel="preload"
                    href={`${assetPrefix}/_next/${file}`}
                />
            );
        });
    }

    // remove as='script' in return statement
    getPreloadDynamicChunks() {
        const { chunks, __NEXT_DATA__ } = this.context._documentProps;
        let { assetPrefix } = __NEXT_DATA__;
        return chunks.filenames.map(chunk => (
            <link
                key={chunk}
                rel="preload"
                href={`${assetPrefix}/_next/webpack/chunks/${chunk}`}
            />
        ));
    }

    // in return statement remove as='script' from <link rel='preload'... lines
    render() {
        const { head, styles, __NEXT_DATA__ } = this.context._documentProps;
        const { page, pathname, buildId, assetPrefix } = __NEXT_DATA__;
        const pagePathname = getPagePathname(pathname);

        return (
            <head {...this.props}>
                {(head || []).map((h, i) =>
                    React.cloneElement(h, { key: h.key || i })
                )}
                {page !== '/_error' && (
                    <link
                        rel="preload"
                        href={`${assetPrefix}/_next/${buildId}/page${pagePathname}`}
                    />
                )}
                <link
                    rel="preload"
                    href={`${assetPrefix}/_next/${buildId}/page/_app.js`}
                />
                <link
                    rel="preload"
                    href={`${assetPrefix}/_next/${buildId}/page/_error.js`}
                />
                {this.getPreloadDynamicChunks()}
                {this.getPreloadMainLinks()}
                {styles || null}
                {this.props.children}
            </head>
        );
    }
}

// you should redeclare this function because is not exported
function getPagePathname(pathname, nextExport) {
    if (!nextExport) {
        return pathname;
    }
    if (pathname === '/') {
        return '/index.js';
    }
    return `${pathname}/index.js`;
}
