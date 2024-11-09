import Head from '@/components/utils/Head';
import '../styles/fonts.css';
import '../styles/globals.css';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ReduxndQueryWrapper from '@/components/home/ReduxndQueryWrapper';
export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <Head />
      </head>
      <body>
      {/* <ReduxndQueryWrapper>
        <Header />
      </ReduxndQueryWrapper> */}
        {children}

        {/* <Footer /> */}

        


      </body>
    </html>
  );
}

