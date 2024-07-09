import {Head, Html, Main, NextScript} from 'next/document'

export default Document;

function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* eslint-disable-next-line @next/next/no-css-tags */}
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
            </Head>

            <body>
            <Main/>
            <NextScript/>

            {/* credits */}
            <div className="text-center mt-4">
                <p>
                    <a href="https://jasonwatmore.com/next-js-13-mysql-user-registration-and-login-tutorial-with-example-app"
                       target="_blank">Next.js 13 + MySQL - User Registration and Login Tutorial with Example App</a>
                </p>
                <p>
                    <a href="https://jasonwatmore.com" target="_blank">JasonWatmore.com</a>
                </p>
            </div>
            </body>
        </Html>
    );
}