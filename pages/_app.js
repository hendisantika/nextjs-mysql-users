import Head from 'next/head';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

// import '@/styles/globals.css'
import 'styles/globals.css';

import {userService} from 'services';
import {Alert, Nav} from 'components';

export default App;

function App({Component, pageProps}) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    setUser(userService.userValue);
    const publicPaths = ['/account/login', '/account/register'];
    const path = url.split('?')[0];
    if (!userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/account/login',
        query: {returnUrl: router.asPath}
      });
    } else {
      setAuthorized(true);
    }
  }

  return (
      <>
        <Head>
          <title>Next.js 14 - User Registration and Login Example</title>
        </Head>

        <div className={`app-container ${user ? 'bg-light' : ''}`}>
          <Nav/>
          <Alert/>
          {authorized &&
              <Component {...pageProps} />
          }
        </div>
      </>
  );
}
