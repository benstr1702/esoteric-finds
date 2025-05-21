import Image from "next/image";
export type ProductCategory = {
	productCategoryName: string;
	productCategoryImage: string;
};

export default function ProductCategoryCard({
	productCategoryName,
	productCategoryImage,
}: ProductCategory) {
	return (
		<div className="flex flex-col justify-center items-center hover:cursor-pointer m-4">
			<div className="w-36 h-36 rounded-full text-center flex flex-col justify-between  bg-blue-200/30 hover:bg-blue-200/55">
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
