// "use client";

// import Link from "next/link";
// import ImageC from "../utils/ImageC";
// import DropDownC from "./DropDownC";
// import { CallNow } from "./greenButton";
// import { IoIosArrowDown } from "react-icons/io";
// import { useEffect, useRef, useState } from "react";
// import { useMutation } from "react-query";
// import { bkend } from "../../axios/axiosInstance";
// import { useDispatch, useSelector } from "react-redux";
// import { ProductsSet } from "@/redux/slice/ProdsSlice";
// import { useRouter } from "next/navigation";

// export default function Header() {
//   const data = [
//     ["Home", "/"],
//     ["About Us", "/about-us"],
//     ["Products", "/"],
//     ["Contact Us", "/contact-us"],
//   ];

//   const [disp, setDisp] = useState(false);
//   const items = useRef(null);
//   const [category, setCategory] = useState();
//   const [temp, setTemp] = useState(false);
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const [objVal, setobjVal] = useState({
//     main: {
//       tw: "relative",
//     },
//     heading: {
//       text: "Products",
//       tw: "InpEnq2 flex justify-between items-center",
//       click: null,
//     },
//     body: {
//       items: {},
//       tw: "bg-white absolute w-full shadow-lg",
//       itemstw: "Filters",
//     },
//   });

//   function Route(i) {
//     getProduct(i);
//   }

//   useEffect(() => {
//     if (category) {
//       let temp = { ...objVal };
//       category.forEach((i, j) => {
//         temp.body.items["itm" + (j + 1)] = {
//           text: i.name,
//           click: Route,
//           data: i,
//         };
//       });
//       setobjVal({ ...temp });
//       setTemp(true);
//       console.log("🤲", objVal);
//     }
//   }, [category]);

//   const {
//     mutate,
//     isLoading,
//     isSuccess,
//     error,
//     data: cData,
//   } = useMutation(async () => {
//     const f = await bkend.get(`/category/get`);
//     console.log(
//       "🚀 ~ const{mutate,isLoading,isSuccess,error,data}=useMutation ~ f:",
//       f
//     );
//     setCategory(f.data.data);
//   });

//   const {
//     mutate: getProduct,
//     isLoading: getProductLoading,
//     isSuccess: getProductSuccess,
//     error: getProductError,
//     data: getProductData,
//   } = useMutation(async (i) => {
//     const f = await bkend.get(`/category/getproducts/${i._id}`);
//     console.log(
//       "🚀 ~ const{mutate,isLoading,isSuccess,error,data}=useMutation ~ f:",
//       f
//     );
//     dispatch(ProductsSet(f.data.data));
//     router.push(`${i.name}`);
//   });

//   useEffect(() => {
//     mutate();
//   }, []);

//   const Dopt = {
//     main: {
//       tw: "relative",
//     },
//     heading: {
//       text: "Category",
//       tw: "InpEnq2 flex justify-between items-center",
//       click: null,
//     },
//     body: {
//       items: {
//         itm1: {
//           text: "Large",
//           click: null,
//         },
//         itm2: {
//           text: "Medium",
//           click: null,
//         },
//         itm3: {
//           text: "Small",
//           click: null,
//         },
//       },
//       tw: "bg-white absolute w-full shadow-lg",
//       itemstw: "Filters",
//     },
//   };

//   if (temp) {
//     return (
//       <main className="">
//         <header className="flex justify-between gra1 py-2 px-3">
//           <li className="flex gap-3 items-center">
//             <div>
//               <ImageC src="social/call.svg" styles={"h-[1.7rem] w-[1.7rem]"} />
//             </div>
//             <div>
//               <a href="tel:+91 96989 50229">+91 8148861438</a>
//             </div>
//           </li>
//           <li className="flex gap-3 items-center">
//             <ImageC
//               src="social/whatsApp.svg"
//               styles={"h-[1.7rem] w-[1.7rem]"}
//             />
//             <ImageC src="social/insta.svg" styles={"h-[1.7rem] w-[1.7rem]"} />
//             <ImageC src="social/fb.svg" styles={"h-[1.7rem] w-[1.7rem]"} />
//           </li>
//         </header>
//         <footer className="py-2 px-3 flex justify-between">
//           <Link href="/" className="font-pacifico text-greenB text-[2.5rem]">
//             ElTribo
//           </Link>
//           <li className="flex gap-[3.5rem] items-center text-[#1D1B20]">
//             {data?.map((i, j) =>
//               j === 2 ? (
//                 <div key={j}>
//                   <DropDownC
//                     options={objVal}
//                     disp={disp}
//                     setDisp={setDisp}
//                     validate={"dontCheck"}
//                     items={items}
//                   />
//                 </div>
//               ) : (
//                 <Link href={i[1]} key={j}>
//                   <div className="">{i[0]}</div>
//                 </Link>
//               )
//             )}
//             {/* <CallNow /> */}
//           </li>
//           {/* <li className="flex items-center gap-3">
//             <ImageC src="social/search.svg" styles={"h-[2rem] w-[2rem]"} />
//             <Link href={"/admin"}>
//               <ImageC src="social/profile.svg" styles={"h-[2rem] w-[2rem]"} />
//             </Link>
//           </li> */}
//           <li className="flex items-center gap-2">
//             <CallNow />
//             </li>
//         </footer>
//       </main>
//     );
//   }
// }

"use client";

import Link from "next/link";
import ImageC from "../utils/ImageC";
import DropDownC from "./DropDownC";
import { CallNow } from "./greenButton";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { bkend } from "../../axios/axiosInstance";
import { useDispatch } from "react-redux";
import { ProductsSet } from "@/redux/slice/ProdsSlice";
import { useRouter } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
export default function Header() {
  const data = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "About Us", path: "/about-us" },
    { id: 3, name: "Products", path: "/" },
    { id: 4, name: "Contact Us", path: "/contact-us" },
  ];

  const [activeId, setActiveId] = useState(null);
  const [disp, setDisp] = useState(false);
  const items = useRef(null);
  const [category, setCategory] = useState();
  const [temp, setTemp] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [objVal, setobjVal] = useState({
    main: {
      tw: "relative",
    },
    heading: {
      text: "Products",
      tw: "InpEnq2 flex justify-between items-center",
      click: null,
    },
    body: {
      items: {},
      tw: "bg-white absolute w-full shadow-lg",
      itemstw: "Filters",
    },
  });

  function Route(i) {
    getProduct(i);
  }

  useEffect(() => {
    if (category) {
      let temp = { ...objVal };
      category.forEach((i, j) => {
        temp.body.items["itm" + (j + 1)] = {
          text: i.name,
          click: Route,
          data: i,
        };
      });
      setobjVal({ ...temp });
      setTemp(true);
    }
  }, [category]);

  const { mutate } = useMutation(async () => {
    const f = await bkend.get(`/category/get`);
    setCategory(f.data.data);
  });

  const { mutate: getProduct } = useMutation(async (i) => {
    const f = await bkend.get(`/category/getproducts/${i._id}`);
    dispatch(ProductsSet(f.data.data));
    router.push(`${i.name}`);
  });

  useEffect(() => {
    mutate();
  }, []);

  const Dopt = {
    main: {
      tw: "relative",
    },
    heading: {
      text: "Category",
      tw: "InpEnq2 flex justify-between items-center",
      click: null,
    },
    body: {
      items: {
        itm1: {
          text: "Large",
          click: null,
        },
        itm2: {
          text: "Medium",
          click: null,
        },
        itm3: {
          text: "Small",
          click: null,
        },
      },
      tw: "bg-white absolute w-full shadow-lg",
      itemstw: "Filters",
    },
  };

  const handleLinkClick = (id) => {
    setActiveId(id);
    if (isMenuOpen) toggleMenu(); // Close menu only if it is open
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (temp) {
    return (
      <main className="">
        <header className="flex justify-between gra1 py-2 px-3">
          <li className="flex gap-3 items-center">
            <div>
              <ImageC src="social/call.svg" styles={"h-[1.7rem] w-[1.7rem]"} />
            </div>
            <div>
              <a href="tel:+91 96989 50229">+91 8148861438</a>
            </div>
          </li>
          <li className="flex gap-3 items-center">
            <ImageC
              src="social/whatsApp.svg"
              styles={"h-[1.7rem] w-[1.7rem]"}
            />
            <ImageC src="social/insta.svg" styles={"h-[1.7rem] w-[1.7rem]"} />
            <ImageC src="social/fb.svg" styles={"h-[1.7rem] w-[1.7rem]"} />
          </li>
        </header>

        <footer className="py-2 px-3 flex justify-between">
          <Link
            href="/"
            className="font-pacifico text-greenB text-[1.7rem] md:text-[2.5rem]"
          >
            ElTribo
          </Link>

          <div className="flex md:hidden items-center justify-center">
            {isMenuOpen ? (
              <IoCloseOutline
                className="text-[24px] text-greenB"
                onClick={toggleMenu}
              />
            ) : (
              <FiMenu
                className="text-[24px] text-greenB"
                onClick={toggleMenu}
              />
            )}
          </div>

          <li className="hidden md:flex gap-[3.5rem] items-center text-[#1D1B20]">
            {data?.map((item) =>
              item.id === 3 ? (
                <div key={item.id}>
                  <DropDownC
                    options={objVal}
                    disp={disp}
                    setDisp={setDisp}
                    validate={"dontCheck"}
                    items={items}
                  />
                </div>
              ) : (
                <Link href={item.path} key={item.id}>
                  <div
                    onClick={() => handleLinkClick(item.id)}
                    className={`${
                      activeId === item.id ? "font-bold text-greenB" : ""
                    }`}
                  >
                    {item.name}
                  </div>
                </Link>
              )
            )}
          </li>
          <li className="hidden md:flex items-center gap-2">
            <a href="tel:+919698950229">
              <CallNow />
            </a>
          </li>
        </footer>

        {isMenuOpen && (
          <div className=" absolute bg-white p-5 z-[9999999999]  opacity-1 w-full flex  items-start justify-center ">
            <div className="">
              <li className=" flex flex-col gap-5 items-start text-[#1D1B20]">
                {data?.map((item) =>
                  item.id === 3 ? (
                    <div key={item.id}>
                      <DropDownC
                        options={objVal}
                        disp={disp}
                        setDisp={setDisp}
                        validate={"dontCheck"}
                        items={items}
                      />
                    </div>
                  ) : (
                    <Link href={item.path} key={item.id}>
                      <div
                        onClick={() => handleLinkClick(item.id)}
                        className={`${
                          activeId === item.id ? "font-bold text-greenB" : ""
                        }`}
                      >
                        {item.name}
                      </div>
                    </Link>
                  )
                )}
              </li>
              <li className=" flex flex-col items-center my-5 gap-3">
                <a href="tel:+919698950229">
                  <CallNow />
                </a>
              </li>
            </div>
          </div>
        )}
      </main>
    );
  }
}
