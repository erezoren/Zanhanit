import '../styles/globals.css'
import {UserProvider} from '@auth0/nextjs-auth0';

function ZanhanitApp({Component, pageProps}) {
  return <UserProvider>
    <Component {...pageProps} />
  </UserProvider>
}

export default ZanhanitApp
