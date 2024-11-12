import ContactSection from "@/components/contactUs/contactSection";
import ContactForm from "@/components/forms/Contact";
import ReduxndQueryWrapper from "../components/home/ReduxndQueryWrapper";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { FaWhatsapp } from "react-icons/fa";

export default function page() {
  return (
    <>
      <ReduxndQueryWrapper>
        <Header />
      </ReduxndQueryWrapper>
      <main className="bg-[#F1FFF9]">
        <ContactSection />
        <ContactForm />
      </main>
      <Footer />
      <div className="fixed  w-full  flex items-end p-5 justify-end  z-[99999999] bottom-0 right-5">
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
        </div>
    </>
  );
}
