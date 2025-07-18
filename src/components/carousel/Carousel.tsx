"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useRef } from "react";
import CarouselSlide, { CarouselProps } from "./CarouselSlide";
import { ProductWithCategory } from "@/db/schema";

export default function CarouselComponent({ grouped }: CarouselProps) {
	const autoplayRef = useRef(Autoplay({ delay: 4000, playOnInit: true }));
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{ loop: true, direction: "ltr" },
		[autoplayRef.current]
	);

	const scrollPrev = useCallback(() => {
		autoplayRef.current.stop();
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		autoplayRef.current.stop();
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	const allProducts: ProductWithCategory[] = Object.values(grouped).flat();

	return (
		<div className="w-3/4 h-full relative">
			<div className="absolute top-5 right-5 z-20 bg-red-500 text-white px-2 py-1 rounded">
				SALE!
			</div>
			<div className="relative h-full">
				<div className="overflow-hidden h-full" ref={emblaRef}>
					<div className="flex h-full">
						{allProducts.map((product) => (
							<CarouselSlide
								key={`${product.id}-${product.name}`}
								product={product}
							/>
						))}
					</div>
				</div>
			</div>
			<button
				onClick={scrollPrev}
				className="rounded-3xl bg-black/45 hover:bg-black/70 text-white z-10 absolute top-1/2 left-5 transform -translate-y-1/2 h-9 w-9"
				aria-label="Previous Slide"
			>
				{"<"}
			</button>
			<button
				onClick={scrollNext}
				className="rounded-3xl bg-black/45 hover:bg-black/70 text-white z-10 absolute top-1/2 right-5 transform -translate-y-1/2 w-9 h-9"
			>
				{">"}
			</button>
		</div>
	);
}
