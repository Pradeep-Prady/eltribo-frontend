import Link from "next/link";
import GreenButton, { GreenBorder } from "../common/greenButton";
import ImageC from "../utils/ImageC";
import { prodSet } from "@/redux/slice/ProductSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
export default function ProductItem({ data }) {
  const dispatch = useDispatch();
  console.log(data?.img);
  console.log(
    data?.img[0]?.src?.startsWith("data:", 0) && `${data?.img[0]?.src}`
  );
  return (
    <section className={`FCol justify-between  h-auto   mx-3 font-pRegular`}>
      <ImageC
        src={`${data?.img ? data?.img[0] : ""}`}
        styles="w-full h-[24rem] rounded-[20px] overflow-hidden "
      />
      <h1 className="text-[1.3rem] pt-5 text-[#1D1B20]">
        {data?.name}
        {data?.suffix && <span>&nbsp; {data?.suffix}</span>}
      </h1>
      <h2 className="text-[#938F96] text-[0.99rem] line-clamp-2">
        {data?.description}
      </h2>

      {data?.cost ? (
        <>
          <h3 className="text-[#322F35] py-3 text-[1.2rem]">Rs.{data?.cost}</h3>
          <div className="flex justify-between gap-1 md:gap-2">
            <Link
              href={`/products/${data?.name}`}
              onClick={() => dispatch(prodSet(data))}
            >
              <GreenButton text="Inquire Now" />
            </Link>
            <GreenBorder text="Request A Sample" />
          </div>
        </>
      ) : (
        ""
      )}
    </section>
    // 	<section className={`FCol justify-between w-[22rem mx-3 font-pRegular`}>
    // 		<div className="w-full h-[25rem] relative rounded-[20px] overflow-hidden ">
    // 	<Image src={`${data?.img[0]?.src?.startsWith('data:', 0) ? `${data?.img[0]}` : `/images/${data?.img[0]}`} ` } fill className="w-full h-auto bject-cover" alt="produr"/>
    // 			</div>
    // 	<h1 className='text-[1.3rem] pt-5 text-[#1D1B20]'>{data?.name}
    // 		{data?.suffix && <span>&nbsp; {data?.suffix}</span>}
    // 	</h1>
    // 	<h2 className='text-[#938F96] text-[0.99rem]'>{data?.description.slice(0, 90)}</h2>
    // 	{data?.cost ? <>
    // 		<h3 className='text-[#322F35] text-[1.2rem]'>
    // 			Rs.{data?.cost}
    // 		</h3>
    // 		<div className="flex justify-between">
    // 			<Link href={`/products/${data?.name}`} onClick={() => dispatch(prodSet(data))}>
    // 				<GreenButton text='Inquire Now' />
    // 			</Link>
    // 			<GreenBorder text='Request A Sample' />
    // 		</div>
    // 	</> : ''}
    // </section>
  );
}
