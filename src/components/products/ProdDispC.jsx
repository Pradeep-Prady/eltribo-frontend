"use client";

import { useDispatch, useSelector } from "react-redux";
 
import { useEffect, useState } from "react";
import { prodSet } from "@/redux/slice/ProductSlice";
import { ProductsSet } from "@/redux/slice/ProdsSlice";
import { useMutation } from "react-query";
import { bkend } from "@/axios/axiosInstance";
import ProdDisp from "../home/ProdDisp";
 

export default function ProdDispC({ data }) {
  const { product } = useSelector((store) => store.ProdsS);
  console.log("🚀 ~ ProdDispC ~ product: 🚗 🚗 🚗 🚗", product, data);
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);

  const {
    mutate,
    isLoading,
    isSuccess,
    error,
    data: cData,
  } = useMutation(async () => {
    const f = await bkend.get(`/category/get`);
    console.log(
      "🚀 ~ const{mutate,isLoading,isSuccess,error,data}=useMutation ~ f:",
      f.data.data
    );
    setCategory(f.data.data);
  });

  const s = [
    {
      name: "Buscuit TCups",
      cost: 50,
      suffix: "(60 ml)",
    },
    {
      name: "Buscuit TCups",
      cost: 60,
    },
    {
      name: "Buscuit TCups",
      cost: 20,
      suffix: "(60 ml)",
    },
  ];

  useEffect(() => {
    dispatch(ProductsSet(data));
  }, [1]);

  const paperbag = product?.filter(
    (p) => p.category === "671c6273125d2d215c495065"
  );
  const teacub = product?.filter(
    (p) => p.category === "671b6b68aaf504ceb9981b3b"
  );
  const Napkins = product?.filter(
    (p) => p.category === "671c6a55a77c8836ae496382"
  );

  const two = [teacub[0], paperbag[0], Napkins[0]];

  if (product) {
    return (
      <>
        <ProdDisp
     
          heading={"Our Products"}
          text={"Explore Our Products"}
          Static={true}
        />
        <ProdDisp
          productData={teacub}
          heading={"Biscuit Tea Cups"}
          img={"social/ProdI1.svg"}
        />
        <ProdDisp
          productData={paperbag}
          heading={"Paper Bags"}
          img={"social/ProdI2.svg"}
        />
        <ProdDisp
          productData={Napkins}
          heading={"Napkins"}
          img={"social/ProdI3.svg"}
        />
      </>
    );
  }
}
