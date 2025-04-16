"use client";
import { useEffect, useState } from "react";

function getNextMidnight(): number {
	const now = new Date();
	const tomorrow = new Date(now);
	tomorrow.setDate(tomorrow.getDate() + 1);
	tomorrow.setHours(0, 0, 0, 0);
	return tomorrow.getTime();
}

export default function Countdown() {
	const [time, setTime] = useState<Date | null>(null);
	const [dateNow, setDateNow] = useState<Date | null>(null);

	useEffect(() => {
		setTime(new Date(getNextMidnight()));
		setDateNow(new Date());

		// Update dateNow every second for a live countdown
		const interval = setInterval(() => {
			const now = new Date();
			setDateNow(now);
			if (time && now.getTime() >= time.getTime()) {
				clearInterval(interval);
			}
		}, 1000);

		// Cleanup interval on unmount
		return () => clearInterval(interval);
	}, []);

	const timeRemaining =
		time && dateNow ? time.getTime() - dateNow.getTime() : null;

	return (
		<div className="bg-[#FFD63A] w-1/4 flex flex-col items-center justify-center">
			<h2 className="text-3xl ">Deals Refresh In</h2>
			<p>
				{timeRemaining !== null && timeRemaining > 0
					? `${Math.floor(
							timeRemaining / (1000 * 60 * 60)
					  )}h ${Math.floor(
							(timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
					  )}m ${Math.floor((timeRemaining % (1000 * 60)) / 1000)}s`
					: "00:00:00"}
			</p>
		</div>
	);
}
