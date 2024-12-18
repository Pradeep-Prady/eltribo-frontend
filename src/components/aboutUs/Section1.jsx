import ImageC from "../utils/ImageC";

export default function Section1({ heading, main, rev }) {
  return (
    <main className={`flex py-[3rem] bg-[#F1FFF9] px-3 md:px-[4rem]`}>
      <div className="bg-white  flex flex-col md:flex-row p-5 rounded-xl">
        <li
          className={`flex-1 gap-[2rem] rounded-xl md:px-[2rem]   md:h-[550px] FCol justify-center ${
            rev ? "order-2" : ""
          }`}
        >
          <h1 className={`text-[2.5rem] font-pMedium text-[#1D1B20]`}>
            {heading}
          </h1>
          <p className={`font-pRegular text-[#322F35]`}>{main}</p>
        </li>
        <li className={`flex-1 ${rev ? "order-1" : ""}`}>
          <ImageC
            src={"social/ElVentures.svg"}
            styles={"h-[400px] md:h-full w-full"}
          />
        </li>
      </div>
    </main>
  );
}
