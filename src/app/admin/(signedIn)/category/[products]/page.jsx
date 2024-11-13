// 'use client';

 
// import { bkend } from '@/axios/axiosInstance';

// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import { useMutation } from 'react-query';
// import { Roboto } from 'next/font/google';
// import Link from 'next/link';
// import { useDispatch, useSelector } from 'react-redux';
// import { prodSet } from '@/redux/slice/admin/ProductSlice';

// const roboto = Roboto({ subsets: ['latin'], weight: ['400'] });

//   function page() {

// 	const [products, setProducts] = useState([]);
// 	const dispatch = useDispatch();
// 	const { category } = useSelector((store) => store.prodR);
	
// 	useEffect(() => {
// 		console.log('🙎‍♀️', category);
// 	}, [category]);
	
// 	const { mutate, isLoading, isSuccess, error, data } = useMutation(async () => {
// 		const f = await bkend?.get(`category/getproducts/${category._id}`);
// 		setProducts(f.data.data);
// 	});

// 	useEffect(() => {
// 		console.log(products);
// 	}, [products]);

// 	useEffect(() => {
// 		mutate();
// 	}, []);

// 	function setProdR(val) {
// 		console.log(val);
// 		dispatch(prodSet(val));
// 	}

// return (
// <>
// 	<main className={`pl-3 ${roboto.className} flex flex-wrap gap-x-4 bg-[#f0f2f5]`}>
// 		{
// 		products?.map((i, j) => (
// 		<Link href={`/admin/category/${category.name}/${i.name}`} key={j} onClick={()=> setProdR(i._id)}>
// 			<div className='h-[250px] w-[480px] mt-10 bg-white p-3 rounded-lg flex gap-x-3 flex-wrap' key={j}>
// 				<section className='w-[250px] h-full relative'>
// 						<Image src={i.img[0]} fill className='rounded-lg' alt='img' />
// 				</section>
// 					<aside className='flex flex-col justify-evenly w-[180px]'>
// 						<h1 className='text-2xl pl-2'>{i.name}</h1>	
// 						<p className='max-h-[60px] flex items-center pl-2'>{i.description.slice(0,41)}...</p>
// 						<h3 className=' pl-2'>{i.size}</h3>	
// 						{i.discount?.cost ? <div className=' pl-2'>
// 								<aside className='flex items-center text-xl'>
// 									<h1 className='text-red-500'> - {i.discount.percentage}%</h1>
// 									<p className='ml-2'> &#8377; {i.discount.cost}</p>
// 								</aside>
// 								<p className=''>&#8377;<strike>{i.cost} </strike></p>
// 						</div> : <p className='pl-2'>&#8377; {i.cost}</p>}
						
// 						<div className='flex justify-center'>
// 							<button className='py-3 rounded-lg border-2 px-16 border-[#405a00]'>Edit</button>
// 						</div>	
// 					</aside>	
// 				</div>	
// 			</Link>
// 			))		
// 		}	
			
// 	</main>
// </>
// )
// }

// export default page;
'use client';

import { bkend } from '@/axios/axiosInstance';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Roboto } from 'next/font/google';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { prodSet } from '@/redux/slice/admin/ProductSlice';

const roboto = Roboto({ subsets: ['latin'], weight: ['400'] });

function Page() {
	const [products, setProducts] = useState([]);
	const dispatch = useDispatch();
	const { category } = useSelector((store) => store.prodR);
	
	useEffect(() => {
		console.log('🙎‍♀️', category);
	}, [category]);
	
	const { mutate, isLoading, isSuccess, error, data } = useMutation(async () => {
		const response = await bkend?.get(`category/getproducts/${category._id}`);
		setProducts(response.data.data);
	});

	useEffect(() => {
		console.log(products);
	}, [products]);

	useEffect(() => {
		mutate();
	}, []);

	function setProdR(val) {
		console.log(val);
		dispatch(prodSet(val));
	}

	return (
		<main className={`pl-3 ${roboto.className} flex flex-wrap gap-x-4 bg-[#f0f2f5]`}>
			{products?.map((product, index) => (
				<Link href={`/admin/category/${category.name}/${product.name}`} key={index} onClick={() => setProdR(product._id)}>
					<div className="h-[250px] w-[480px] mt-10 bg-white p-3 rounded-lg flex gap-x-3 flex-wrap">
						<section className="w-[250px] h-full relative">
							{product.img?.[0] ? (
								<Image src={product.img[0]} fill className="rounded-lg" alt="img" />
							) : (
								<div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
									<p>No Image</p>
								</div>
							)}
						</section>
						<aside className="flex flex-col justify-evenly w-[180px]">
							<h1 className="text-2xl pl-2">{product.name}</h1>	
							<p className="max-h-[60px] flex items-center pl-2">
								{product.description.slice(0, 41)}...
							</p>
							<h3 className="pl-2">{product.size}</h3>	
							{product.discount?.cost ? (
								<div className="pl-2">
									<aside className="flex items-center text-xl">
										<h1 className="text-red-500">- {product.discount.percentage}%</h1>
										<p className="ml-2"> &#8377; {product.discount.cost}</p>
									</aside>
									<p>&#8377;<strike>{product.cost}</strike></p>
								</div>
							) : (
								<p className="pl-2">&#8377; {product.cost}</p>
							)}
							<div className="flex justify-center">
								<button className="py-3 rounded-lg border-2 px-16 border-[#405a00]">Edit</button>
							</div>	
						</aside>	
					</div>	
				</Link>
			))}	
		</main>
	);
}

export default Page;
