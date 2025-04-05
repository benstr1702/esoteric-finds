import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";

export default function CarouselComponent() {
	const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
	const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false);

	return (
		<div className="w-full h-full">
			<div className="overflow-hidden h-full" ref={emblaRef}>
				<div className="flex h-full">
					<div className="flex-none w-full min-w-0 h-full flex items-center justify-center bg-rose-400">
						<h2 className="text-2xl font-bold text-white">
							Slide 1
						</h2>
					</div>
					<div className="flex-none w-full min-w-0 h-full flex items-center justify-center bg-rose-400">
						<h2 className="text-2xl font-bold text-white">
							Slide 2
						</h2>
					</div>
					<div className="flex-none w-full min-w-0 h-full flex items-center justify-center bg-rose-400">
						<h2 className="text-2xl font-bold text-white">
							Slide 3
						</h2>
					</div>
				</div>
			</div>
		</div>
	);
}
