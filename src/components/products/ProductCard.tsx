import Image from "next/image";
import { ShoppingCart } from "lucide-react";

type ProductCardProps = {
	productName: string;
	productPrice: number;
	productImage: string;
	productManufacturer: string;
	productVolumeOrQuantity: string | null;
	perKilo: number | null;
	imageWidth?: number;
	imageHeight?: number;
};

export default function ProductCard({
	productName,
	productPrice,
	productImage,
	productManufacturer,
	productVolumeOrQuantity,
	perKilo,
	imageHeight,
	imageWidth,
}: ProductCardProps) {
	const formattedPrice = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(productPrice);

	return (
		<div className="hover:cursor-pointer w-60 h-96 rounded-2xl overflow-hidden border border-gray-300 shadow flex flex-col transition-colors hover:border-gray-600 ease-in-out hover:bg-gray-300/10 duration-400">
			{/* Image section with fixed size */}
			<div className="flex justify-center items-center pt-3 h-48">
				<Image
					src={productImage}
					alt={productName}
					width={imageWidth ?? 129}
					height={imageHeight ?? 196}
					className=" object-cover"
				/>
			</div>

			{/* Content */}
			<div className="flex flex-col justify-between flex-1 p-3">
				<div className="space-y-1 overflow-hidden">
					<p className="text-base">{productManufacturer}</p>
					<h2 className="text-md font-semibold text-gray-800 line-clamp-2">
						{productName}
					</h2>
					<p className="text-md text-blue-900 font-bold">
						{formattedPrice}
					</p>

					{productVolumeOrQuantity && (
						<p className="text-xs text-gray-600">
							{productVolumeOrQuantity}
						</p>
					)}

					{perKilo && (
						<p className="text-xs text-gray-600">
							{new Intl.NumberFormat("en-US", {
								style: "currency",
								currency: "USD",
							}).format(perKilo)}{" "}
							per kilo
						</p>
					)}
				</div>

				<button className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:cursor-pointer hover:bg-green-700 text-white font-bold text-sm px-4 py-2 transition-shadow hover:shadow-md">
					<ShoppingCart color="white" size={20} />
					Add to Cart
				</button>
			</div>
		</div>
	);
}
