'use client';

import { useState } from 'react';
import ImageC from '../utils/ImageC';
import { FiMinus,FiPlus } from "react-icons/fi";
export default function FAQ() {
	const [values, setValues] = useState([
		{
			show: false,
			name: 'What materials are the Biscuit Tea Cups made from?',
			content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo culpa saepe sit atque vel commodi aut, dolore, similique mollitia eos, fugit earum non. Delectus animi eaque, reprehenderit eum veritatis dolorum dolores quasi obcaecati placeat ad cupiditate impedit saepe a exercitationem, qui asperiores quas dolore quis veniam unde? Fugiat, iure soluta.'
		},
		{
			show: false,
			name: 'Can I buy a matching set of cups?',
			content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo culpa saepe sit atque vel commodi aut, dolore, similique mollitia eos, fugit earum non. Delectus animi eaque, reprehenderit eum veritatis dolorum dolores quasi obcaecati placeat ad cupiditate impedit saepe a exercitationem, qui asperiores quas dolore quis veniam unde? Fugiat, iure soluta.'
		},
		{
			show: false,
			name: 'What fabric is used for the napkins?',
			content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo culpa saepe sit atque vel commodi aut, dolore, similique mollitia eos, fugit earum non. Delectus animi eaque, reprehenderit eum veritatis dolorum dolores quasi obcaecati placeat ad cupiditate impedit saepe a exercitationem, qui asperiores quas dolore quis veniam unde? Fugiat, iure soluta.'
		},
		{
			show: false,
			name: 'What materials are the Biscuit Tea Cups made from?',
			content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo culpa saepe sit atque vel commodi aut, dolore, similique mollitia eos, fugit earum non. Delectus animi eaque, reprehenderit eum veritatis dolorum dolores quasi obcaecati placeat ad cupiditate impedit saepe a exercitationem, qui asperiores quas dolore quis veniam unde? Fugiat, iure soluta.'
		},
		{
			show: false,
			name: 'Are the paper bags available in different sizes?',
			content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo culpa saepe sit atque vel commodi aut, dolore, similique mollitia eos, fugit earum non. Delectus animi eaque, reprehenderit eum veritatis dolorum dolores quasi obcaecati placeat ad cupiditate impedit saepe a exercitationem, qui asperiores quas dolore quis veniam unde? Fugiat, iure soluta.'
		}
	]);

	function toggle(index) {
		setValues((prevValues) =>
			prevValues.map((item, i) => ({
				...item,
				show: i === index ? !item.show : false
			}))
		);
	}

	return (
		<main className="FColC my-7">
			<h1 className="font-pMedium text-[2rem]">Eltribo FAQ</h1>
			{values.map((item, index) => (
				<div className="w-[90%] md:w-[80%] py-7 md:py-10 border-b-2" key={index}>
					<header className={`flex items-center justify-between  ${values.length - 1 > index && !item.show ? 'border-b-' : ''}`}>
						<h1 className="text-[18px] md:text-[1.5rem] w-[85%] md:w-full ">{item.name}</h1>
						<span onClick={() => toggle(index)} className="cursor-pointer">
							{item.show ? (
								<FiMinus className="  border border-black p-2 md:p-3 text-[28px] md:text-[42px]    rounded-full" />
							) : (
								<FiPlus className="md:text-[42px] p-2 md:p-3 text-[28px] bg-black text-white rounded-full" />
							)}
						</span>
					</header>
					<main className={`  ${item.show ? 'flex pt-2 w-10/12 text-gray-400' : 'hidden'} w-[100%] md:w-[80%] `}>
						<p className="md:text-[18px]">{item.content}</p>
					</main>
				</div>
			))}
		</main>
	);
}
