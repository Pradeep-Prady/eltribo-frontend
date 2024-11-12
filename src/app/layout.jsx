// "use client"
import Head from "@/components/utils/Head";
import "../styles/fonts.css";
import "../styles/globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ReduxndQueryWrapper from "@/components/home/ReduxndQueryWrapper";
// import { FaWhatsapp } from "react-icons/fa";
import { Provider } from "react-redux";
import store from "@/redux/store";
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

        {/* <Provider store={store}>{children}</Provider> */}
     {children} 

        {/* <Footer /> */}

        {/* <div className="fixed  w-full  flex items-end p-5 justify-end  z-[99999999] bottom-0 right-5">
          <div className="fixed z-[9999999999] text-white bottom-0 right-0 p-5">
            <a
              href="https://wa.me/8148861438"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 flex items-center gap-2 px-3 py-2"
            >
              <FaWhatsapp />
              <p className="text-[14px]">Chat With Us</p>
            </a>
          </div>
        </div> */}
      </body>
    </html>
  );
}
