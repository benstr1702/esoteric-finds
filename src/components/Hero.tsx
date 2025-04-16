"use client";
import CarouselComponent from "./carousel/Carousel";
import Countdown from "./Countdown";
export default function Hero() {
	return (
		<div
			className="w-full  flex flex-row-reverse 
		 h-96 bg-[#BF3131] "
		>
			<CarouselComponent />
			<Countdown />
		</div>
	);
}
