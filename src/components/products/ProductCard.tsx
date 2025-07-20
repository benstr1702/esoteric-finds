import Image from "next/image";
import AddToCartButton from "../ui/AddToCartButton";
import type { Product } from "@/db/schema";

type ProductCardProps = {
	product: Product;
	imageWidth?: number;
	imageHeight?: number;
};

export default function ProductCard({
	product,
	imageHeight,
	imageWidth,
}: ProductCardProps) {
	const formattedPrice = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(product.price);

	return (
		<div className="hover:cursor-pointer w-60 h-96 rounded-2xl overflow-hidden border border-gray-300 shadow flex flex-col transition-colors hover:border-gray-600 ease-in-out hover:bg-gray-300/10 duration-400">
			{/* Image section with fixed size */}
			<div className="flex justify-center items-center pt-3 h-48">
				<Image
					src={product.image || "/preview.webp"}
					alt={product.name}
					width={imageWidth ?? 129}
					height={imageHeight ?? 196}
					className=" object-cover"
				/>
			</div>

			{/* Content */}
			<div className="flex flex-col justify-between flex-1 p-3">
				<div className="space-y-1 overflow-hidden">
					<p className="text-base">{product.manufacturer}</p>
					<h2 className="text-md font-semibold text-gray-800 line-clamp-2">
						{product.name}
					</h2>
					<p className="text-md text-blue-900 font-bold">
						{formattedPrice}
					</p>

					{product.volumeOrQuantity && (
						<p className="text-xs text-gray-600">
							{product.volumeOrQuantity}
						</p>
					)}
				</div>

				{/**button */}
				<AddToCartButton product={product} />
			</div>
		</div>
	);
}
