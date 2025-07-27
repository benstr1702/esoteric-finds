"use client";

import {
	forwardRef,
	useRef,
	useCallback,
	useState,
	useEffect,
	useImperativeHandle,
} from "react";
import { X } from "lucide-react";
import type { Product } from "@/db/schema";
import Image from "next/image";
import { Geist } from "next/font/google";
import AddToCartButton from "../ui/AddToCartButton";
import * as motion from "motion/react-client";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export type ProductModalRef = {
	openDialog: () => void;
};

type Props = {
	product: Product;
};

const ProductModal = forwardRef<ProductModalRef, Props>(({ product }, ref) => {
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const openDialog = useCallback(() => {
		dialogRef.current?.showModal();
		setIsOpen(true);
	}, []);

	const closeDialog = useCallback(() => {
		setIsOpen(false);
		dialogRef.current?.close();
	}, []);

	const handleBackdropClick = (
		event: React.MouseEvent<HTMLDialogElement>
	) => {
		if (event.target === dialogRef.current) closeDialog();
	};

	useImperativeHandle(ref, () => ({ openDialog }), [openDialog]);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && dialogRef.current?.open) {
				e.preventDefault();
				closeDialog();
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [closeDialog]);

	const formatPrice = (amount: number) =>
		new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount / 100);

	return (
		<div
			className={`${geistSans.variable} w-2xl h-96 border border-green-300`}
		>
			<dialog
				ref={dialogRef}
				onClick={handleBackdropClick}
				className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
					backdrop:bg-black/50 p-0 rounded-xl shadow-xl w-[45rem] h-[45rem]"
			>
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={
						isOpen
							? { opacity: 1, scale: 1 }
							: { opacity: 0, scale: 0.5 }
					}
					transition={{
						duration: 0.4,
						delay: isOpen ? 0.1 : 0,
						ease: [0, 0.71, 0.2, 1.01],
					}}
					className="relative w-full h-full p-6 flex flex-col bg-white rounded-xl"
				>
					<button
						onClick={closeDialog}
						className="absolute top-4 right-4 text-gray-600 hover:text-black z-10"
					>
						<X
							className="hover:cursor-pointer hover:bg-red-500 transition-all duration-300 ease-in-out p-1 rounded-full bg-red-400 text-white"
							size={30}
						/>
					</button>

					<h2 className="text-3xl font-semibold mb-4 font-serif">
						{product.name}
					</h2>

					<div className="flex w-[90%] h-[90%] mx-auto mt-2 rounded-lg overflow-hidden border">
						<div className="w-1/2 bg-gray-100 flex items-center justify-center p-4">
							<Image
								src={product.image || "/preview.webp"}
								alt={`${product.name} Image`}
								width={300}
								height={300}
								className="object-contain max-h-full max-w-full rounded"
							/>
						</div>

						<div className="w-1/2 bg-white flex flex-col justify-between p-6 text-sm">
							<div className="space-y-2">
								<p className="text-gray-700">
									{product.description}
								</p>
								<p className="text-gray-600">
									<span className="font-medium">
										Producer:
									</span>{" "}
									{product.manufacturer}
								</p>
								<p className="text-gray-600">
									<span className="font-medium">
										Product ID:
									</span>{" "}
									{product.id}
								</p>
								<p className="text-gray-600">
									<span className="font-medium">
										Weight/Quantity:
									</span>{" "}
									{product.volumeOrQuantity}
								</p>

								<div className="mt-4">
									{product.isOnSale &&
									product.discountedPrice !== null ? (
										<div className="flex flex-col text-base">
											<span className="line-through text-red-500">
												{formatPrice(product.price)}
											</span>
											<span className="text-green-600 font-bold text-lg">
												{formatPrice(
													product.discountedPrice
												)}
											</span>
										</div>
									) : (
										<p className="text-gray-900 text-lg font-semibold">
											{formatPrice(product.price)}
										</p>
									)}
								</div>
							</div>

							<AddToCartButton product={product} />
						</div>
					</div>
				</motion.div>
			</dialog>

			{/* Optional trigger */}
			<button
				ref={buttonRef}
				onClick={openDialog}
				className="mt-10 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
			>
				Show Dialog
			</button>
		</div>
	);
});

ProductModal.displayName = "ProductModal"; // Required for forwardRef

export default ProductModal;
