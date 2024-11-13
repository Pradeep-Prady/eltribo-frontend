"use client";

import { useEffect, useState } from "react";
// import Filters from '../../../components/products/Filters';
// import ProductItem from '../../../components/products/ProductItem';
import { useDispatch, useSelector } from "react-redux";
import { ProductsSet } from "@/redux/slice/ProdsSlice";
import { useParams } from "next/navigation";
 
import ProductItem from "@/components/products/ProductItem";
import Filters from "@/components/products/Filters";

export default function ProductMap(props) {
  const { product } = useSelector((store) => store.ProdsS);
  const [url, setUrl] = useState();

  const params = useParams();

  useEffect(() => {
    setUrl(params.products.replace(/%20/g, " "));
  }, [params]);
 

 

  const dispatch = useDispatch();

  const [prod, setProd] = useState();

  // useEffect(() => {
  // 	dispatch(ProductsSet(props.prod.data));
  // }, [1]);

  useEffect(() => {
    setProd(product);
    console.log("🚀 ~ ProductMap ~ product:", product);
  }, [product]);

  if (prod && url) {
    return (
      <>
        <Filters text={url} />
        {/* <section className = 'flex flex-wrap gap-y-[2rem] justify-evenly'>
				{prod?.map((i, j) => (
					<ProductItem key = {j} data = {i} />
				))}
			</section> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-[3.5rem] w-full   px-0 sm:px-10 md:px-20 lg:px-20 xl:px-32 2xl:px-10 justify-center gap-5 lg:gap-10">
          {prod?.map((i, j) => (
            <ProductItem key={j} data={i} />
          ))}
        </div>
      </>
    );
  }
}
