"use client";
import Image from "next/image";
type ProductCategory = {
	productCategoryName: string;
	productCategoryImage: string;
};

export default function ProductCategoryCard({
	productCategoryName,
	productCategoryImage,
}: ProductCategory) {
	return (
		<div className="w-36 h-36 border text-center flex flex-col justify-between p-3">
			<div className="flex-grow flex items-center justify-center">
				<Image
					src={"/icon.png"}
					alt={productCategoryName}
					className="max-w-full max-h-full object-contain"
					width={100}
					height={100}
				/>
			</div>
			<div className="mt-2">{productCategoryName}</div>
		</div>
	);
}
