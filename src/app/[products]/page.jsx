// "use client";

// import ClientProvider from "@/components/utils/ClientProvider";
// import ProductMap from "./_ProductMap";
// import { bkend } from "@/axios/axiosInstance";

// export default async function ProductPage({ params }) {
//   let response;
//   try {
//     response = await bkend.get("/getproduct");
//     console.log(params?.products, "params");
//     console.log("🚀 ~ ProductPage ~ response:", response?.data);
//   } catch (error) {
//     console.error("Error fetching product data:", error);
//     return <p>Failed to load products. Please try again later.</p>;
//   }

//   const prod = [
//     {
//       name: "Buscuit TCups",
//       cost: 50,
//       suffix: "(60 ml)",
//     },
//     {
//       name: "Buscuit TCups",
//       cost: 60,
//     },
//     {
//       name: "Buscuit TCups",
//       cost: 20,
//       suffix: "(60 ml)",
//     },
//   ];

//   let products = [];

//   if (response?.data) {
//     if (params?.products === "Paper%20Bags") {
//       products = response?.data.filter((p) => p.category === "671c6273125d2d215c495065");
//     } else if (params?.products === "Biscuit%20Tea%20Cups") {
//       products = response?.data.filter((p) => p.category === "671b6b68aaf504ceb9981b3b");
//     } else if (params?.products === "Napkins") {
//       products = response?.data.filter((p) => p.category === "671c6a55a77c8836ae496382");
//     }
//   }

//   // Use fallback data if no products are found
//   const productData = products.length > 0 ? products : prod;

//   return (
//     <main className="bg-baseBg evenPadding">
//       <ClientProvider>
//         <ProductMap prod={productData} /> 
//       </ClientProvider>
//     </main>
//   );
// }


"use client";

// import ClientProvider from "@/components/utils/ClientProvider";
import ProductMap from "./_ProductMap";
import { bkend } from "@/axios/axiosInstance";
import {useEffect,useState} from 'react'
import ProductItem from "@/components/products/ProductItem";
import ReduxndQueryWrapper from "@/components/home/ReduxndQueryWrapper";

import Filters from "@/components/products/Filters";

export default   function ProductPage({ params }) {


  console.log(params?.products,"params")
  const [datas, setDatas] = useState([])
  const fetchData = async() => {

  try {
   let response = await bkend.get(`/category/getProductsByName/${params?.products}`);
    setDatas(response.data?.data)
  } catch (error) {
    console.error("Error fetching product data:", error);
    return <p>Failed to load products. Please try again later.</p>;
  }
  }

  const prod = [
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
      fetchData()
  },[])



console.log(datas)
  return (
    <main className="bg-baseBg evenPadding">
      {/* <ClientProvider> */}

        {/*  
        <ProductMap prod={datas} /> Fallback to prod if response data is empty */}


<ReduxndQueryWrapper>


<Filters text={params?.products?.replace(/%20/g, " ")} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-[3.5rem] w-full   px-0 sm:px-10 md:px-20 lg:px-20 xl:px-32 2xl:px-10 justify-center gap-5 lg:gap-10">
          {datas?.map((i, j) => (
            <ProductItem key={j} data={i} />
          ))}
        </div>
      </ReduxndQueryWrapper>
        
      {/* </ClientProvider> */}
    </main>
  );
}
