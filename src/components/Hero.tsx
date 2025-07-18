//"use client";
import CarouselComponent from "./carousel/Carousel";
import Countdown from "./Countdown";
import { CarouselProps } from "./carousel/CarouselSlide";
export default function Hero({ grouped }: CarouselProps) {
	return (
		<div
			className="w-full  flex flex-row-reverse border-black/10 border-b-2 
		 h-96 bg-white"
		>
			<CarouselComponent grouped={grouped} />
			<Countdown />
		</div>
	);
}
