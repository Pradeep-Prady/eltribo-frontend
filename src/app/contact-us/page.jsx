import ContactSection from "@/components/contactUs/contactSection";
import ContactForm from "@/components/forms/Contact";
import ReduxndQueryWrapper from "../components/home/ReduxndQueryWrapper";
import Footer from "../components/common/Footer";
import Header from "@/components/common/Header";

export default function page() {
  return (
    <>
      {/* <ReduxndQueryWrapper>
        <Header />
      </ReduxndQueryWrapper> */}
      <main className="bg-[#F1FFF9]">
        <ContactSection />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
