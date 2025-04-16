import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
export default function CarouselComponent() {
	const [emblaRef] = useEmblaCarousel({ loop: true }, [
		Autoplay({
			delay: 4000,
			playOnInit: true,
		}),
	]);

	return (
		<div className="w-3/4 h-full">
			<div className="overflow-hidden h-full" ref={emblaRef}>
				<div className="flex h-full">
					<div className="flex-none w-full min-w-0 h-full flex items-center justify-center bg-white/10 backdrop-blur-md">
						<h2 className="text-2xl font-bold text-white">
							Slide 1
						</h2>
					</div>
					<div className="flex-none w-full min-w-0 h-full flex items-center justify-center bg-white/10 backdrop-blur-md">
						<h2 className="text-2xl font-bold text-white">
							Slide 2
						</h2>
					</div>
					<div className="flex-none w-full min-w-0 h-full flex items-center justify-center bg-white/10 backdrop-blur-md">
						<h2 className="text-2xl font-bold text-white">
							Slide 3
						</h2>
					</div>
				</div>
			</div>
		</div>
	);
}
