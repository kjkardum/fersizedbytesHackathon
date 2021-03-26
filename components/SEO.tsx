import React from "react";

import Head from "next/head";

const SEO = (props) => {
    let title = props.title;
    let siteTitle = "Takeoff";
    let description = "Task within the FrontEd hackathon of the EESTEC LC association";
    return (
        <Head>
            <title>{`${title} | ${siteTitle}`}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <link rel="icon" href="/favicon.ico" />
            <meta name="msapplication-TileColor" content="#039be5" />
            <meta name="theme-color" content="#039be5" />
            <meta name="description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={siteTitle} />

            {/*<meta property="twitter:card" content="summary" />*/}
            {/*<meta property="twitter:creator" content={config.social.twitter} />*/}
            {/*<meta property="twitter:title" content={title} />*/}
            {/*<meta property="twitter:description" content={description} />*/}
        </Head>
    );
};
export default SEO;
