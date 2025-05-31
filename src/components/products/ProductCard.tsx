import Image from "next/image";
import { ShoppingCart } from "lucide-react";
type ProductCardProps = {
	productName: string;
	productPrice: number;
	productImage: string;
	productQuantity: number | null;
	perKilo: number | null;
};

export default function ProductCard({
	productName,
	productPrice,
	productImage,
	productQuantity,
	perKilo,
}: ProductCardProps) {
	const formattedPrice = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(productPrice);

	return (
		<div className="gap-8 w-60 h-96 rounded-2xl overflow-hidden border border-gray-300 shadow flex flex-col transition-colors hover:border-gray-600 ease-in-out hover:bg-gray-300/10 duration-400 ">
			<div className="h-36 w-full p-2">
				<Image
					src={productImage}
					alt={productName}
					width={192}
					height={176}
					className="h-44 w-full object-cover rounded-lg"
				/>
			</div>
			<div className="flex flex-col justify-between flex-1 p-3">
				<div>
					<h2 className="text-sm font-semibold text-gray-800">
						{productName}
					</h2>
					<p className="text-md text-blue-900 font-bold">
						{formattedPrice}
					</p>
					{productQuantity && (
						<p className="text-xs text-gray-600">
							Pack of {productQuantity}
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
				<button className="flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:cursor-pointer hover:bg-green-700 text-white font-bold text-sm px-4 py-2 transition-shadow hover:shadow-md">
					<ShoppingCart color="white" size={20} />
					Add to Cart
				</button>
			</div>
		</div>
	);
}
