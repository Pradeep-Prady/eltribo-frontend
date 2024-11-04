import Header from "@/components/common/Header"
import ReduxndQueryWrapper from "@/components/home/ReduxndQueryWrapper"
import Footer from "../components/common/Footer"

 
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({ children }) {
  return (
    <>
      {/* <BreadCrumb /> */}

      {/* <ReduxndQueryWrapper>
        <Header />
      </ReduxndQueryWrapper> */}
      {children}
      <Footer/>

    </>
  )
}
