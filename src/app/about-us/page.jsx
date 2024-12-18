import Reviews from "@/components/aboutUs/Reviews";
import Section1 from "@/components/aboutUs/Section1";
import Support from "@/components/common/Support";
import Footer from "@/components/common/Footer";

import ReduxndQueryWrapper from "../components/home/ReduxndQueryWrapper";
import Header from "@/components/common/Header";
import BreadCrumb from "@/components/common/BreadCrumb";
import { FaWhatsapp } from "react-icons/fa";

export default function Page({ params }) {
  console.log(params, "params");
  return (
    <>
      <ReduxndQueryWrapper>
        <Header />
      </ReduxndQueryWrapper>
      <BreadCrumb />
      <main className="">
        <Section1
          heading={"Story of Eltribo"}
          main={`Anaikatty Rural Community College is an initiative to impart skill education to Tribal and Rural people from the beauty hills of Anaikatty in the outskirts of the Coimbatore City. The villagers of Anaikatty have been given skill training and are producing products that are sold locally and all over India. n the heart of the Anaikatty hills, nestled near Coimbatore, lies a rural community rich with culture, tradition, and untapped potential. Though the beauty of the rolling hills and the serenity of their landscape often draw visitors, the people of this community face daily struggles. For generations, the villagers have depended on subsistence agriculture, small-scale livestock farming, and forest resources. However, with changing times and economic pressures, they began yearning for something more—an opportunity to thrive, not just survive.`}
        />
        <Support />
        <Section1
          heading={"Who we are?"}
          main={`It was in this setting that a local NGO, Dreamz, in collaboration with a group of social entrepreneurs from around the world, launched a groundbreaking entrepreneurial training initiative aimed at empowering the rural youth and women of Anaikatty. The goal was to build local capacities, ignite self-sufficiency, and foster sustainable growth.`}
          rev={true}
        />
        <Reviews />
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
