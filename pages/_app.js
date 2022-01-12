import { MetamaskStateProvider } from "use-metamask";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <MetamaskStateProvider>{
    typeof window !== 'undefined' && <Component {...pageProps} />}
  </MetamaskStateProvider>
}

export default MyApp
