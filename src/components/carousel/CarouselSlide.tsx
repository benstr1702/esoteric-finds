import type { ProductWithCategory } from "@/db/schema";
import Image from "next/image";

export interface SlideProps {
	product: ProductWithCategory;
}

export interface CarouselProps {
	grouped: Record<string, ProductWithCategory[]>;
}

export default function CarouselSlide({ product }: SlideProps) {
	const handleClick = () => {
		console.log("product clicked", product.name);
	};

	return (
		<div
			className="min-w-full h-full flex-shrink-0 flex items-center justify-center transition-colors duration-200 cursor-pointer p-6 gap-8"
			onClick={handleClick}
		>
			{/* Product Image */}
			{product.image && (
				<Image
					src={product.image}
					alt={product.name}
					width={160}
					height={300}
				/>
			)}

			{/* Product Details */}
			<div className="flex flex-col max-w-md">
				<h2 className="text-2xl font-semibold mb-2">{product.name}</h2>

				{/* Description (clamped to 3 lines) */}
				<p className="line-clamp-3 text-gray-700 text-sm mb-4">
					{product.description}
				</p>

				{/* Price Section */}
				<div className="flex flex-col text-base">
					<span className="line-through text-red-500">
						${(product.price / 100).toFixed(2)}
					</span>
					<span className="text-green-600 font-bold text-lg">
						${(product.discountedPrice! / 100).toFixed(2)}
					</span>
				</div>
			</div>
		</div>
	);
}
