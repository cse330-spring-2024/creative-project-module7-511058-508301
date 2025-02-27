import 'tailwindcss/tailwind.css';
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil';

function MyApp({Component, pageProps: {session, ...pageProps}}) {

    return (
        <SessionProvider>
                <Component {...pageProps} />
        </SessionProvider>

)
}
export default MyApp;