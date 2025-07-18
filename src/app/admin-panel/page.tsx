"use client";

import { useState, useEffect } from "react";
import { addProduct } from "@/lib/server/add-product";

export default function AdminPanel() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);

	const [formData, setFormData] = useState({
		name: "",
		description: "",
		price: "",
		volumeOrQuantity: "",
		stockCount: "",
		isOnSale: false,
		discountedPrice: "",
		categoryId: "",
		manufacturer: "",
		image: "",
	});
	type Category = {
		id: number;
		name: string;
	};
	// Fetch categories on component mount
	useEffect(() => {
		fetchCategories();
	}, []);

	const fetchCategories = async () => {
		try {
			const response = await fetch("/api/categories");
			if (response.ok) {
				const data: Category[] = await response.json();
				setCategories(data);
			}
		} catch (error) {
			console.error("Failed to fetch categories:", error);
		}
	};

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value, type } = e.target;

		if (type === "checkbox") {
			const checked = (e.target as HTMLInputElement).checked;
			setFormData((prev) => ({
				...prev,
				[name]: checked,
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const generateSlug = (name: string) => {
		return name
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)/g, "");
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setMessage(null);

		try {
			const slug = generateSlug(formData.name);

			const productData = {
				name: formData.name,
				description: formData.description,
				price: parseInt(formData.price) * 100, // Convert to cents
				volumeOrQuantity: formData.volumeOrQuantity,
				stockCount: parseInt(formData.stockCount),
				isOnSale: formData.isOnSale,
				discountedPrice: formData.discountedPrice
					? parseInt(formData.discountedPrice) * 100
					: null,
				categoryId: parseInt(formData.categoryId),
				manufacturer: formData.manufacturer,
				image: formData.image || "/file.svg",
				slug: slug,
			};

			const result = await addProduct(productData);

			if (result.success) {
				setMessage({
					type: "success",
					text: "Product added successfully!",
				});
				// Reset form
				setFormData({
					name: "",
					description: "",
					price: "",
					volumeOrQuantity: "",
					stockCount: "",
					isOnSale: false,
					discountedPrice: "",
					categoryId: "",
					manufacturer: "",
					image: "",
				});
			} else {
				setMessage({
					type: "error",
					text: result.error || "Failed to add product",
				});
			}
		} catch (error) {
			setMessage({ type: "error", text: "An unexpected error occurred" });
			console.error("Error adding product:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-4xl mx-auto px-4">
				<div className="bg-white rounded-lg shadow-md p-6">
					<h1 className="text-3xl font-bold text-gray-900 mb-8">
						Admin Panel
					</h1>

					<div className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-800 mb-6">
							Add New Product
						</h2>

						{message && (
							<div
								className={`mb-4 p-4 rounded-md ${
									message.type === "success"
										? "bg-green-50 text-green-800 border border-green-200"
										: "bg-red-50 text-red-800 border border-red-200"
								}`}
							>
								{message.text}
							</div>
						)}

						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Product Name */}
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Product Name *
									</label>
									<input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleInputChange}
										required
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="Enter product name"
									/>
								</div>

								{/* Manufacturer */}
								<div>
									<label
										htmlFor="manufacturer"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Manufacturer *
									</label>
									<input
										type="text"
										id="manufacturer"
										name="manufacturer"
										value={formData.manufacturer}
										onChange={handleInputChange}
										required
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="Enter manufacturer name"
									/>
								</div>

								{/* Price */}
								<div>
									<label
										htmlFor="price"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Price ($) *
									</label>
									<input
										type="number"
										id="price"
										name="price"
										value={formData.price}
										onChange={handleInputChange}
										required
										min="0"
										step="0.01"
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="0.00"
									/>
								</div>

								{/* Volume/Quantity */}
								<div>
									<label
										htmlFor="volumeOrQuantity"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Volume/Quantity *
									</label>
									<input
										type="text"
										id="volumeOrQuantity"
										name="volumeOrQuantity"
										value={formData.volumeOrQuantity}
										onChange={handleInputChange}
										required
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="e.g., 500ml, 1kg, 12 pieces"
									/>
								</div>

								{/* Stock Count */}
								<div>
									<label
										htmlFor="stockCount"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Stock Count *
									</label>
									<input
										type="number"
										id="stockCount"
										name="stockCount"
										value={formData.stockCount}
										onChange={handleInputChange}
										required
										min="0"
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="0"
									/>
								</div>

								{/* Category */}
								<div>
									<label
										htmlFor="categoryId"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Category *
									</label>
									<select
										id="categoryId"
										name="categoryId"
										value={formData.categoryId}
										onChange={handleInputChange}
										required
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									>
										<option value="">
											Select a category
										</option>
										{categories.map((category) => (
											<option
												key={category.id}
												value={category.id}
											>
												{category.name}
											</option>
										))}
									</select>
								</div>
							</div>

							{/* Description */}
							<div>
								<label
									htmlFor="description"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Description *
								</label>
								<textarea
									id="description"
									name="description"
									value={formData.description}
									onChange={handleInputChange}
									required
									rows={4}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Enter product description"
								/>
							</div>

							{/* Image URL */}
							<div>
								<label
									htmlFor="image"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Image URL
								</label>
								<input
									type="url"
									id="image"
									name="image"
									value={formData.image}
									onChange={handleInputChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="https://example.com/image.jpg (optional)"
								/>
							</div>

							{/* Sale Section */}
							<div className="border-t pt-6">
								<div className="flex items-center mb-4">
									<input
										type="checkbox"
										id="isOnSale"
										name="isOnSale"
										checked={formData.isOnSale}
										onChange={handleInputChange}
										className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
									/>
									<label
										htmlFor="isOnSale"
										className="ml-2 block text-sm font-medium text-gray-700"
									>
										Product is on sale
									</label>
								</div>

								{formData.isOnSale && (
									<div className="max-w-xs">
										<label
											htmlFor="discountedPrice"
											className="block text-sm font-medium text-gray-700 mb-2"
										>
											Discounted Price ($) *
										</label>
										<input
											type="number"
											id="discountedPrice"
											name="discountedPrice"
											value={formData.discountedPrice}
											onChange={handleInputChange}
											required={formData.isOnSale}
											min="0"
											step="0.01"
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
											placeholder="0.00"
										/>
									</div>
								)}
							</div>

							{/* Submit Button */}
							<div className="flex justify-end">
								<button
									type="submit"
									disabled={isLoading}
									className={`px-6 py-3 rounded-md text-white font-medium transition-colors ${
										isLoading
											? "bg-gray-400 cursor-not-allowed"
											: "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
									}`}
								>
									{isLoading
										? "Adding Product..."
										: "Add Product"}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
}
