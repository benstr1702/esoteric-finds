//// src/components/Countdown.tsx
//"use client";
//import { useEffect, useState } from "react";

//function getNextMidnight(): number {
//  const now = new Date();
//  const tomorrow = new Date(now);
//  tomorrow.setDate(tomorrow.getDate() + 1);
//  tomorrow.setHours(0, 0, 0, 0);
//  return tomorrow.getTime();
//}

//export default function Countdown() {
//  const [time, setTime] = useState<Date | null>(null);
//  const [dateNow, setDateNow] = useState<Date | null>(null);

//  useEffect(() => {
//    setTime(new Date(getNextMidnight()));
//    setDateNow(new Date());

//    const interval = setInterval(() => {
//      setDateNow((prev) => {
//        const now = new Date();
//        // Access time via getState to avoid dependency
//        setTime((currentTime) => {
//          if (currentTime && now.getTime() >= currentTime.getTime()) {
//            clearInterval(interval);
//          }
//          return currentTime; // Return currentTime to avoid state change
//        });
//        return now;
//      });
//    }, 1000);

//    return () => clearInterval(interval);
//  }, []); // Empty array: runs once on mount

//  const timeRemaining =
//    time && dateNow ? time.getTime() - dateNow.getTime() : null;

//  return (
//    <div className="bg-[#FFD63A] w-1/4 flex flex-col items-center justify-center">
//      <h2 className="text-3xl">Deals Refresh In</h2>
//      <p>
//        {timeRemaining !== null && timeRemaining > 0
//          ? `${Math.floor(timeRemaining / (1000 * 60 * 60))}h ${Math.floor(
//              (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
//            )}m ${Math.floor((timeRemaining % (1000 * 60)) / 1000)}s`
//          : "00:00:00"}
//      </p>
//    </div>
//  );
//}
"use client";
import { useEffect, useRef, useState } from "react";

function getNextMidnight(): number {
	const now = new Date();
	const tomorrow = new Date(now);
	tomorrow.setDate(tomorrow.getDate() + 1);
	tomorrow.setHours(0, 0, 0, 0);
	return tomorrow.getTime();
}

export default function Countdown() {
	const [dateNow, setDateNow] = useState<Date>(new Date());
	const targetTimeRef = useRef<number>(getNextMidnight());

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			setDateNow(now);

			// Check if we've reached the target time
			if (now.getTime() >= targetTimeRef.current) {
				// Reset to next midnight
				targetTimeRef.current = getNextMidnight();
			}
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const timeRemaining = targetTimeRef.current - dateNow.getTime();

	return (
		<div className="bg-[#FFD63A] w-1/4 flex flex-col items-center justify-center">
			<h2 className="text-3xl">Deals Refresh In</h2>
			<p>
				{timeRemaining > 0
					? `${Math.floor(
							timeRemaining / (1000 * 60 * 60)
					  )}h ${Math.floor(
							(timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
					  )}m ${Math.floor((timeRemaining % (1000 * 60)) / 1000)}s`
					: "00h 00m 00s"}
			</p>
		</div>
	);
}
