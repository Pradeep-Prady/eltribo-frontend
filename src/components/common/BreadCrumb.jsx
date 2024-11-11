// 'use client';

// import { useEffect, useState } from 'react';
// import ImageC from '../utils/ImageC';
// import Link from 'next/link';

// export default function BreadCrumb() {

// 	const [crumbs, setCrumbs] = useState(
// 		window.location.pathname.split('/').map((i) => {
// 			if (i) {
// 				const temp = i.split('')
// 				temp[0] = temp[0].toUpperCase();
// 				return temp.join('');
// 			}
// 			return 'Home';
// 	}));

// 	console.log('crumbs', crumbs);
	
// 	const link = window.location.pathname.split('/').map((i, j, arr) => {
// 		if (j === 0) return '/';
// 		if (j === arr.length - 1) return i;
// 		return '/' + i + '/';
// 	}).map((i, j, array) => {
// 		if (j === 0) return '/';
// 		if (j === 1) return '/' + i.slice(1);
// 		return array[j - 1] + i;
// 	})
// 	console.log('💑', link);
	
// 	// return arr[j - 1] + i;
	
// 	useEffect(() => {
// 		console.log('👘', crumbs);
// 	}, [])

// 	if (crumbs && link) {
// 		return (
// 			<section className="relative w-full">
// 				<ImageC src='lines/BreadCrumbC.svg' styles={'w-[100%] h-[10rem]'} />
// 				<main className="absolute FullCover FColC gap-3">
// 					<h1 className='text-[2.1rem] font-pMedium'>Products</h1>
// 					<ul className="FRowC py-[0.3rem] px-[3rem] gap-2">
// 						{crumbs.map((i, j) => (
// 							<li key={j} className="flex gap-2 text-[#1D1B20]">
// 								<Link href={link[j]}>
// 									<p>{i}</p>
// 								</Link>
// 								{j !== crumbs.length - 1 ? <ImageC src={'lines/rightArrow.svg'} styles={'h-[1.5rem] w-[1.5rem]'} /> : ''}
// 							</li>
// 						))}
// 					</ul>
// 				</main>
// 			</section>
// 		)
// 	}
// }

 'use client';

import { SlArrowRight } from "react-icons/sl";
import { useEffect, useState } from 'react';
import ImageC from '../utils/ImageC';
import Link from 'next/link';

export default function BreadCrumb() {
	const [crumbs, setCrumbs] = useState([]);

	useEffect(() => {
		const pathArray = window.location.pathname.split('/').filter(Boolean);
		const formattedCrumbs = pathArray.map((item, index) => {
			// Decode URL component and capitalize
			const formattedItem = decodeURIComponent(item.charAt(0).toUpperCase() + item.slice(1));
			return {
				name: formattedItem,
				url: '/' + pathArray.slice(0, index + 1).join('/'),
			};
		});
		setCrumbs([{ name: 'Home', url: '/' }, ...formattedCrumbs]);
	}, []);

	// Check for specific items in crumbs to determine the image to display
	let imageSrc = "lines/BreadCrumbC.svg";
	if (crumbs.some(crumb => crumb.name === 'Biscuit Tea Cups')) {
		imageSrc = "lines/BreadCrumbBiscut.svg";
	} else if (crumbs.some(crumb => crumb.name === 'Napkins')) {
		imageSrc = "lines/BreadCrumbNapkin.svg";
	} else if (crumbs.some(crumb => crumb.name === 'Paper Bags')) {
		imageSrc = "lines/BreadCrumbPaperBags.svg";
	}

	return (
		<section className="relative w-full ">
			<ImageC src={imageSrc} styles="w-[100%] h-[12rem]" />
			<main className="absolute FullCover FColC gap-3">
				<h1 className="text-[2.1rem] font-pMedium">Products</h1>
				<ul className="FRowC py-[0.3rem] px-[3rem] gap-2">
					{crumbs.map((crumb, index) => (
						<li key={index} className="flex items-center">
							<Link href={crumb.url} className="">
								{crumb.name}
							</Link>
							{index < crumbs.length - 1 && <span className="mx-2"><SlArrowRight/></span>}
						</li>
					))}
				</ul>
			</main>
		</section>
	);
}
