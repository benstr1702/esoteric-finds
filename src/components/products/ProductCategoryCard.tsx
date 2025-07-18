"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export type ProductCategory = {
	productCategoryName: string;
	productCategoryImage: string;
	productSlug: string;
};

export default function ProductCategoryCard({
	productCategoryName,
	productCategoryImage,
	productSlug,
}: ProductCategory) {
	const router = useRouter();
	//console.log("slug:", productSlug);

	return (
		<div
			onClick={() => router.push(`/category/${productSlug}`)}
			className="flex flex-col justify-center items-center hover:cursor-pointer m-4"
		>
			<div className="w-36 h-36 rounded-full text-center flex flex-col justify-between bg-blue-200/30 hover:bg-blue-200/55 duration-200 transition-transform hover:scale-110">
				<div className="flex-grow flex items-center justify-center ">
					<Image
						src={productCategoryImage}
						alt={productCategoryName}
						className="max-w-full max-h-full object-contain"
						width={100}
						height={100}
					/>
				</div>
			</div>
			<div className="mt-1">{productCategoryName}</div>
		</div>
	);
}
