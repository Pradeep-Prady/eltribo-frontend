'use client';

import Link from 'next/link';
import React, { useState ,useEffect} from 'react'; 
import { AiFillProduct } from 'react-icons/ai';
import { IoMdAddCircle } from 'react-icons/io';
import { IoCallOutline } from 'react-icons/io5';
import { MdProductionQuantityLimits } from "react-icons/md";
import { TbLayoutDashboard } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import {  useSelector} from "react-redux"; // Import useDispatch to dispatch actions
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
export default function layout({ children }) {

	const values = ([{
		name: 'Dashboard', icon: <TbLayoutDashboard className='pr-2 text-3xl' />, link: '/admin/dashboard'
	},{
		name: 'Add Category', icon: <MdOutlineCategory className='pr-2 text-3xl' />, link: '/admin/add-category'
	},{
		name: 'Add Products', icon: <IoMdAddCircle className='pr-2 text-3xl' />, link: '/admin/add'
	},{
		name: 'Products', icon: <AiFillProduct className='pr-2 text-3xl' />, link: '/admin/category'
	},{
		name: 'Product Enquiry', icon: <MdProductionQuantityLimits className='pr-2 text-3xl' />, link: '/admin/product-enquiry'
	}, {
		name: 'Contact Enquiry', icon: <IoCallOutline className='pr-2 text-3xl' />, link: '/admin/contact-us'
	}]);
	const [selection, setSelection] = useState('');


	const { isAdmin } = useSelector((state) => state.prodR);
 
	const router = useRouter();
	useEffect(() => {
			if(!isAdmin){
				router.push("/admin/sign-in");

			}
	},[])


	const handleLogout =() => {
		router.push("/admin/sign-in");
	}

return (<>


	<main className={`flex h-screen py-2 pl-2 bg-[#f0f2f5] list-none`}>
		<nav className='w-[300px] h-full bg-[#2b71fe] rounded-3xl'>
			<h1 className='text-xl text-center py-5 text-white'>Ebible Cups</h1>
			<ul className='flex h-[300px] gap-y-5 mt-10 flex-col justify-evenly text-white items-center'>
				{values.map((i, j) => (
					<Link href={i.link} onClick={() => setSelection(i.name)} key={j}>
						<li className={`${selection === i.name ? 'bg-[#175eed]':''} flex items-center pl-4 w-[200px] py-3 rounded-xl hover:bg-[#175eed]`}>
							<span>{i.icon}</span>					
							<p className='text-center'>
								{i.name}
							</p>
						</li>
					</Link>
				))}

				<div>
				<li onClick={handleLogout} className={` cursor-pointer flex items-center pl-4 gap-3 w-[200px] py-3 rounded-xl hover:bg-[#175eed]`}>
							<span><FiLogOut/></span>					
							<p className='text-center'>
								Logout
							</p>
						</li>

					</div>
			</ul>
		</nav>
		<section className='h-screen overflow-scroll w-full'>
			{children}
		</section>
	</main>
</>)
}
