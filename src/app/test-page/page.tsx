"use client";

import { useRef } from "react";
import ProductModal, {
	ProductModalRef,
} from "@/components/products/ProductModal";
import type { Product } from "@/db/schema";

export default function ClientProductPage({ product }: { product: Product }) {
	const modalRef = useRef<ProductModalRef>(null);

	return (
		<div>
			<ProductModal ref={modalRef} product={product} />

			<button
				onClick={() => modalRef.current?.openDialog()}
				className="mt-6 block mx-auto bg-blue-600 text-white px-4 py-2 rounded"
			>
				Open Modal
			</button>
		</div>
	);
}
