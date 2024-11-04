import { useSelector } from 'react-redux';
import ProductItem from '../products/ProductItem';

export default function Alsolike() {

	const { product } = useSelector((store) => store.ProdsS);
	console.log("🚀 ~ Alsolike ~ product:", product)

	return (
		<main className="evenPadding ">
			<h1 className="text-center font-pMedium text-[1.7rem]  mb-[2rem]">You May Also Like</h1>
			<section className=" grid grid-cols-3 myPadX gap-[1rem] !pb-7 justify-center items-start flex-wrap gap-y-[2rem]">
				{product.slice(0, 3).map((i, j) => (
					<ProductItem key={j} data={i}  />
				))}
			</section>
		</main>
	)
}
