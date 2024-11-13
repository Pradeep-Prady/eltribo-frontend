"use client";

import { useSelector } from "react-redux";
import ImageC from "../utils/ImageC";
import ProductItem from "../products/ProductItem";
import { GreenTextButton } from '@/app/components/common/greenButton';
import Link from "next/link";
 
export default function ProdDisp({ heading, productData, img, text, Static }) {
  const { product } = useSelector((store) => store.ProdsS);
  const s = [
    {
      name: "Buscuit TCups",
      description:
        "Charming, artisan tea cups designed to enhance your tea-time experience",
      img: ["products/biscuits.png"],
    },
    {
      name: "Eco-Friendly Paper Bags",
      description: "Sustainable and durable, these paper bags are crafted",
      img: ["products/paperbag.png"],
    },
    {
      name: "Napkins",
      description:
        "Beautifully napkins that add a touch of cultural artistry to any table setting",
      img: ["products/napkin.png"],
    },
  ];

  const data = Static ? s : product;``

  if (data) {
    return (
      <main className="bg-[#F1FFF9] px-[1rem]">
        <h1 className="FColC gap-5 font-pMedium text-[2rem] mb-[1rem]">
          {heading}
        </h1>
        <section className="flex justify-center">
          {img ? (
            <ImageC src={img} styles={"w-full h-[6rem]   md:h-[15rem]"} />
          ) : (
            ""
          )}
        </section>

        {productData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full px-0 sm:px-10 md:px-20 lg:px-20 xl:px-32 2xl:px-10 justify-center gap-5 lg:gap-10">
            {productData &&
              productData?.map((i, j) => <ProductItem data={i} key={j} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-[3.5rem] w-full   px-0 sm:px-10 md:px-20 lg:px-20 xl:px-32 2xl:px-10 justify-center gap-5 lg:gap-10">
            {s?.map((i, j) => (
              <ProductItem data={i} key={j} />
            ))}
          </div>
        )}

        {!Static && (
          <div className="w-full flex justify-center my-[3.5rem]">
            <Link href={heading}>
            
            <GreenTextButton text={"View More"} />
            </Link>
          </div>
        )}
      </main>
    );
  }
}
