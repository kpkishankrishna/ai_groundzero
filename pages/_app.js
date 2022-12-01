import '../styles/globals.css'
import { ThemeProvider } from 'next-themes';

import { NavBar } from '../components';

function MyApp({ Component, pageProps }) {
    return (
      <ThemeProvider attribute="class">
        <div className="dark:bg-nft-dark bg-white min-h-screen">
          <NavBar />
          <Component {...pageProps} />
        </div>

        <script src="https://kit.fontawesome.com/3ef90ec0a4.js" crossorigin="anonymous"></script>
      </ThemeProvider>
    )
}

export default MyApp
