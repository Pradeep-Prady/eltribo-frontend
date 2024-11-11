import Support from "@/components/common/Support";
import HomeForm from "@/components/forms/HomeForm";
import About from "@/components/home/About";
import Section1 from "@/components/home/Section1";
import ProdDispC from "@/components/products/ProdDispC";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import FAQ from "@/components/home/FAQ";
import ReduxndQueryWrapper from "@/components/home/ReduxndQueryWrapper";
import { bkend } from "@/axios/axiosInstance";
import Reviews from "@/components/aboutUs/Reviews";
import { FaWhatsapp } from "react-icons/fa";

export default async function Home() {
  // const response = await bkend.get('/getproduct');
  let response = null;
  try {
    response = await bkend.get("/getproduct");
    console.log("🚀 ~ Home ~ response:", response.data.data);
  } catch (err) {
    console.log("🚗", err);
  }

  // try {
  //   const res = await bkend.get('/category/data');
  //   console.log("🚀 ~ Home ~ ♻️♻️♻️♻️♻️♻️ response:", res.data);
  // } catch (err) {
  //   console.log('🚗', err);
  // }

  if (response) {
    return (
      <>
        <div className="bg-[#F1FFF9]">
          <ReduxndQueryWrapper>
            <Header />
          </ReduxndQueryWrapper>
          <Section1 />
          <Support />
          <About />
          <ReduxndQueryWrapper>
            <ProdDispC data={response?.data?.data} />
          </ReduxndQueryWrapper>

          <Reviews />
          <FAQ />
          <HomeForm />
        </div>
        <Footer />
        <div classNam="fixed  w-full  flex items-end p-5 justify-end  z-[99999999] bottom-0 right-5">
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
}
