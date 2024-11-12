'use client';

 
import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { Roboto } from 'next/font/google';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { MdDeleteOutline } from 'react-icons/md';

const roboto = Roboto({ subsets: ['latin'], weight: ['400'] });
import { bkend } from '@/axios/axiosInstance';

export default function Page() {

	const [product, setProduct] = useState();
	const [deleted, setDeleted] = useState(false);
	const router = useRouter();
	const [currentImg, setcurrentImg] = useState(0);

	const [discount, setDiscount] = useState(false);
	const [disC, setdisC] = useState(0);

	const [images, setImages] = useState([]);
	const [topImg, setTopImg] = useState([images?.[0]]);
	const [fileArr1, setfileArr1] = useState();
	const [fileArr2, setfileArr2] = useState();
	const [categorySelect, setCategorySelect] = useState('');
	const [specifications, setSpecifications] = useState([]);

	const [imgE1, setImgE1] = useState();
	const [imgE2, setImgE2] = useState();
	
	function calcDiscount(i, j) {
		const c = Number(getValues('cost'));
		const per = Number(i);
		const d = c-((c / 100) * per);
		setdisC(d);
	}

	const { register, handleSubmit, getValues, setError, formState: { errors }, reset } = useForm();
	const handleAddSpecification = () => {
		setSpecifications([...specifications, { key: "", value: "" }]);
	  };
	
	  const handleSpecificationChange = (index, field, value) => {
		const updatedSpecs = [...specifications];
		updatedSpecs[index][field] = value;
		setSpecifications(updatedSpecs);
	  };
	
	  const handleRemoveSpecification = (index) => {
		const updatedSpecs = specifications.filter((_, i) => i !== index);
		setSpecifications(updatedSpecs);
	  };
	function Submit(form) {
		const formData = new FormData();
		if (form.name == '' || form.description == '' || form.cost == '' || form.size == '') {
			console.log('Input is Empty');
			setError('form', { type: 'manual', message: 'Enter All Fields' });
		}
		else {
			setError('form', { type: 'manual', message: '' });
			if (discount) {
				formData.append('product', JSON.stringify({
					name: form.name,
					description: form.description,
					size: form.size,
					cost: form.cost,
					category: categorySelect,
					discount: {
						percentage: form.percentage,
						cost: disC
					},
					specifications: specifications.filter(
						(spec) => spec.key && spec.value
					  ),
					  metaTitle: form.title,
					  metaDescription: form.metaDescription,
					  metaKeywords: form.keywords ,
				}))
			}
			else {
				formData.append('product', JSON.stringify({
					name: form.name,
					description: form.description,
					size: form.size,
					cost: form.cost,
					category: categorySelect,
					specifications: specifications.filter(
						(spec) => spec.key && spec.value
					  ),
					  metaTitle: form.title,
					  metaDescription: form.metaDescription,
					  metaKeywords: form.keywords ,
				}));
			}
			if (form.images?.length) {
				for (let i = 0; i < form.images.length; i++) {
					formData.append('images', form.images[i]);
				}
			}
			upM(formData);
		}
	}

	const store = useSelector((state) => state.prodR);

	useEffect(() => {
		setCategorySelect(store?.category?._id);
	}, [store])

	useEffect(() => {
		mutate();
	}, [1]);

	// const { mutate, isLoading, isSuccess, error, data } = useMutation(async () => {
	// 	const f = await bkend.get(`/getoneproduct/${store.id}`);
	// 	setProduct(f.data.data);
	// 	if (f.data.data.discount !== '') calcDiscount(f.data.data.discount.percentage, f.data.data.cost);
	// 	setImages(f.data.data.img.slice(1)); setTopImg([f.data.data.img[0]]);
	// 	setSpecifications(f.data.data.specifications)
	// });
	const { mutate, isLoading, isSuccess, error, data } = useMutation(async () => {
		const f = await bkend.get(`/getoneproduct/${store.id}`);
		const productData = f.data.data;
	
		// Remove _id from each specification before setting it
		const cleanedSpecifications = productData.specifications.map(spec => {
			const { _id, ...cleanedSpec } = spec; // Destructure and remove _id
			return cleanedSpec;
		});
	
		setProduct(productData);
		if (productData.discount !== '') calcDiscount(productData.discount.percentage, productData.cost);
		setImages(productData.img.slice(1));
		setTopImg([productData.img[0]]);
		setSpecifications(cleanedSpecifications); // Set cleaned specifications
	});
	

	const { mutate: upM, isLoading: upL, isSuccess: upS, error: upE, data: upD } = useMutation(async (form) => {
		console.log('clicked');
		const f = await bkend.patch(`/updateproduct/${store.id}`, form, {
			headers: { 'Content-Type': 'multipart/form-data' }
		});
		reset();
		mutate();
	});

	const { mutate: delM, isLoading: delL, isSuccess: delS, error: delE, data: delD } = useMutation(async () => {
		console.log('clicked');
		const f = await bkend.delete(`/deleteproduct/${store.id}`, {
			headers: { 'Content-Type': 'multipart/form-data' }
		});
		console.log(f.status, f);
		if (f.status === 200) router.push('/admin/products');
	});

	const { mutate: IdelM, isLoading: IdelL, isSuccess: IdelS, error: IdelE, data: IdelD } = useMutation(async (j) => {
		const f = await bkend.patch(`/deleteimage/${store.id}`, { img: product.imgNames[j] });
		mutate();
	});

	const { mutate: IupdM, isLoading: IupdL, isSuccess: IupdS, error: IupdE, data: IupdD } = useMutation(async (form) => {
		const f = await bkend.patch(`/update-topimg/${store.id}`, form, {
			headers: { 'Content-Type': 'multipart/form-data' }
		});
		mutate();
	});

	const { mutate: imgU, isLoading: imgUL, isSuccess: imgUS, error: imgUE, data: imgUD } = useMutation(async (form) => {
		const f = await bkend.patch(`/updateimage/${store.id}`, form, {
			headers: { 'Content-Type': 'multipart/form-data' }
		});
		console.log(f.data.data);
	});

	useEffect(() => {
		if (fileArr1) {
			const formData = new FormData();
			fileArr1.forEach((file, j) => {
				formData.append('images', file);
			});
			console.log(formData);
			imgU(formData);
		}
	}, [fileArr1]);

	useEffect(() => {
		if (fileArr2) {
			const formData = new FormData();
			fileArr2.forEach((file, j) => {
				formData.append('images', file);
			});
			IupdM(formData);
		}
	}, [fileArr2]);
	
	const handleImageUpload = (e) => {
		setImgE1(''); setImgE2('');
		const files = Array.from(e.target.files);
		setfileArr1(files);
		console.log('inside Function');
		const newImages = files.map(file => URL.createObjectURL(file));
		setImages([...images, ...newImages]);
	};

	const handleSingle = (e) => {
		setImgE2('');
		const files = Array.from(e.target.files);
		setfileArr2(files);
		const newImages = files.map(file => URL.createObjectURL(file));
		setTopImg(newImages);
	};

	function deleteImg(j) {
		IdelM(j);
		const updatedImages = images.filter((_, i) => i !== j);
    setImages(updatedImages);
	}

if (product && images) {
return (
<>
<section className={`w-full p-3 list-none ${deleted ? 'opacity-100' : 'opacity-100'} relative`}>
<form onSubmit={handleSubmit(Submit)}>
	<main className='flex bg-white flex-col w-full px-4 py-3 rounded-lg'>
			<div>
				<h1 className={`${roboto.className} text-xl`}>General Information</h1>	
				<li className='mt-3'>
					<label className='text-[rgb(136,135,135)]'>Product Name</label> <br />
					<input type='text' className='w-full rounded-lg bg-[#f8fafc] border-[1px] border-[rgb(175,173,173)] mt-1 py-2 pl-3' {...register('name', {required: 'Name cannot be empty'})} defaultValue={product.name}/>
					<p>{errors?.name?.message}</p>
				</li>
				<li className='mt-3'>
					<label className='text-[rgb(136,135,135)]'>Description</label> <br />
					<textarea type='text' className='w-full rounded-lg bg-[#f8fafc] border-[1px] border-[rgb(175,173,173)] mt-1 py-2 pl-3 resize-none h-[150px]'  {...register('description' ,{required: 'Description cannot be empty'})} defaultValue={product.description}/>
					<p>{errors?.description?.message}</p>
				</li>		
			</div>
	</main>
	<main className='flex flex-col w-full px-4 py-3 bg-white rounded-lg mt-4'>
	<div>
		<aside className='flex justify-between'>
			<h1 className={`${roboto.className} text-xl`}>Pricing</h1>	
			<li>
	<label className="inline-flex items-center cursor-pointer">
	<h1 className={`${roboto.className} text-xl mr-4`}>Discount</h1>	
  <input type="checkbox" className="sr-only peer" onChange={()=> setDiscount(!discount)} />
  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
  
</label>

			</li>
		</aside>				
		<li className='mt-3'>
			<label className='text-[rgb(136,135,135)]'>Base Price in Rps</label> <br />
			<input type='text' className='w-full rounded-lg bg-[#f8fafc] border-[1px] border-[rgb(175,173,173)] mt-1 py-2 pl-3' {...register('cost', {required: 'Cost cannot be Empty'})} defaultValue={product.cost} />
			<p>{errors?.cost?.message}</p>
		</li>
		<li className={`mt-3 ${discount ? 'block' : 'hidden'}`}>
			<aside className='flex justify-between'>
				<div className='w-[45%]'>
					<label className='text-[rgb(136,135,135)]'>Discounted Percentage [ % ]</label> <br />
					<input type='text' className='w-full rounded-lg bg-[#f8fafc] border-[1px] border-[rgb(175,173,173)] mt-1 py-2 pl-3' {...register('percentage')} onChange={(event)=> calcDiscount(event.target.value)} defaultValue={product.discount.percentage} />
				</div>
				<div className='w-[45%]'>
					<label className='text-[rgb(136,135,135)]'>Discounted Price</label> <br />
					<input type='text'className='w-full rounded-lg bg-[#f8fafc] border-[1px] border-[rgb(175,173,173)] mt-1 py-2 pl-3' value={disC} readOnly />
				</div>
			</aside>
		</li>		
	</div>
	</main>
	<main className='flex flex-col w-full px-4 py-3 bg-white rounded-lg mt-3'>
		<div>
			<h1 className={`${roboto.className} text-xl`}>Size</h1>	
			<li className='mt-3'>
				<label className='text-[rgb(136,135,135)]'>In Millilitre</label> <br />
				<input type='text' className='w-full rounded-lg bg-[#f8fafc] border-[1px] border-[rgb(175,173,173)] mt-1 py-2 pl-3' {...register('size', {required: 'Size cannot be Empty'})} defaultValue={product.size} />
				<p>{errors?.size?.message}</p>
			</li>
		</div>
	</main>			
	<main className={`flex w-full px-4 py-3 bg-white rounded-lg mt-3 justify-between z-10 ${deleted ? 'opacity-100' : 'opacity-100'}`}>
		<div className='w-[70%]'>
			<h1 className={`${roboto.className} text-xl`}>Product Media</h1>	
			<li className='mt-3 w-[100%]'>
				<label className='text-[rgb(136,135,135)]'>Product Images</label> <br />
				<div className={`h-[400px] w-[70%] bg-[#f8fafc] mt-2 border-dashed border-[1px] border-[rgb(175,173,173)] p-2 w-full ${deleted ? 'opacity-90' : 'opacity-90'}`}>
					<header className='h-[80%] flex justify-evenly flex-wrap content-start overflow-auto pt-1'>
						{images.map((i, j) => (
							<div className='h-[100px] w-[100px] relative mb-5' key={j}>
								<Image key={j} src={i} alt={`Uploaded ${j}`} fill className='rounded-lg relative z-0' />
								<div className={`absolute h-[20px] w-[20px] z-10 -right-1 -top-1 ${deleted ? 'block' : 'hidden'}`} onClick={()=> deleteImg(j)}>
									<Image src={'/images/close.png'} fill alt='close' />
								</div>			
							</div>
						))}
					</header>
					<aside className={`flex justify-center mt-5`}>
					<label className={`cursor-pointer bg-[#e3e8fb] border-2 border-[#c5c9fa] text-[#777ef9] px-3 py-2 rounded-lg ${deleted ? 'hidden' : 'block'}`}>
                Add more Images
						<input type="file" multiple className='hidden'  {...register('images')} onChange={handleImageUpload} />
					</label>
					<div className='cursor-pointer bg-[#e3e8fb] border-2 border-[#c5c9fa] text-[#777ef9] px-3 py-2 rounded-lg ml-2' onClick={()=> setDeleted(!deleted)}>
						{deleted ? 'Done' : 'Delete Image'}
					</div>				
					</aside>
				</div>
				<p>{imgE1}</p>
			</li>
		</div>
		<div className='w-[20%]'>
			<li className='mt-3 w-[100%]'>
				<div className='h-[30px]'></div>
				<label className='text-[rgb(136,135,135)]'>Top Image</label> <br />
				<div className='h-[400px] w-[70%] bg-[#f8fafc] mt-2 border-dashed border-[1px] border-[rgb(175,173,173)] p-2 w-full'>
					<header className='h-[80%] flex justify-center items-center pt-2'>
						{topImg?.[0] &&
							<div className='h-full w-full relative mb-5'>
								<Image src={topImg[0]} alt={`top img`} fill className='rounded-lg' />
							</div> 
							}
					</header>
					<aside className='flex justify-center'>
					<label className='cursor-pointer bg-[#e3e8fb] border-2 border-[#c5c9fa] text-[#777ef9] px-3 py-2 rounded-lg mt-5'>
                Add Top Image
							<input type="file" className='hidden' onChange={handleSingle} />
            </label>
					</aside>
				</div>
			</li>
		<p>{imgE2}</p>			
		</div>
	</main>		

	 {/* Specifications Section */}
            <main className="flex flex-col w-full px-4 py-3 bg-white rounded-lg mb-5">
              <h1 className={`${roboto.className} text-xl`}>Specifications</h1>
              {specifications.map((spec, index) => (
                <div key={index} className="flex gap-2 mt-3">
                  <input
                    type="text"
                    placeholder="Specification Key"
                    className="w-1/2 rounded-lg bg-[#f8fafc] border-[1px] border-[rgb(175,173,173)] mt-1 py-2 pl-3"
                    value={spec.key}
                    onChange={(e) =>
                      handleSpecificationChange(index, "key", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Specification Value"
                    className="w-1/2 rounded-lg bg-[#f8fafc] border-[1px] border-[rgb(175,173,173)] mt-1 py-2 pl-3"
                    value={spec.value}
                    onChange={(e) =>
                      handleSpecificationChange(index, "value", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => handleRemoveSpecification(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleAddSpecification}
              >
                Add Specification
              </button>
            </main>	

			  {/* Additional SEO fields */}
			  <main className="flex flex-col w-full px-4 py-3 bg-white rounded-lg mt-4">
              <h1 className={`${roboto.className} text-xl`}>SEO Information</h1>
              
              <li className="mt-3">
                <label className="text-[rgb(136,135,135)]">Meta Title</label>
                <br />
                <input
                  type="text"
                  className="w-full rounded-lg bg-[#f8fafc] border-[1px] border-[rgb(175,173,173)] mt-1 py-2 pl-3"
                 

				  {...register('title', {required: 'title cannot be empty'})} defaultValue={product.metaTitle}
                />
                <p>{errors?.title?.message}</p>
              </li>
              <li className="mt-3">
                <label className="text-[rgb(136,135,135)]">
                  Meta Description
                </label>
                <br />
                <textarea
                  type="text"
                  className="w-full rounded-lg bg-[#f8fafc] border-[1px] border-[rgb(175,173,173)] mt-1 py-2 pl-3 resize-none h-[100px]"
                  {...register("metaDescription", {
                    required: "metaDescription cannot be empty",
					
                  })}

				  defaultValue={product.metaDescription}
                />
                <p>{errors?.metaDescription?.message}</p>
              </li>
              <li className="mt-3">
                <label className="text-[rgb(136,135,135)]">Meta Keywords</label>
                <br />
                <input
                  type="text"
                  className="w-full rounded-lg bg-[#f8fafc] border-[1px] border-[rgb(175,173,173)] mt-1 py-2 pl-3"
                  {...register("keywords", {
                    required: "Keywords cannot be empty",
					
                  })}

				  defaultValue={product.metaKeywords}
                />
                <p>{errors?.metaKeywords?.message}</p>
              </li>
            </main>


	<div className='flex justify-center my-5'>
		<input type='submit' value='Update Product' className={`px-20 py-4 rounded-lg bg-[#ffd600] ${roboto.className} m-auto`} />
	</div>			
</form>
</section>		
</>
)
}
}

 