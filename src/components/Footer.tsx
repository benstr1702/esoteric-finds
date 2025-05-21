"use client";

export default function Footer() {
	return (
		<footer className="w-full bg-blue-900 text-white py-6 px-4">
			<div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
				<p className="text-sm text-gray-400">
					&copy; {new Date().getFullYear()} Esoteric Finds. All rights
					reserved.
				</p>

				<div className="flex gap-4 text-sm">
					<a
						href="/privacy"
						className="hover:underline text-gray-400"
					>
						Privacy Policy
					</a>
					<a href="/terms" className="hover:underline text-gray-400">
						Terms of Service
					</a>
					<a
						href="/contact"
						className="hover:underline text-gray-400"
					>
						Contact
					</a>
				</div>

				{/* Optional: Social icons (can plug in real icons later) */}
				<div className="flex gap-3 text-gray-400">
					<a
						href="https://github.com/benstr1702"
						target="_blank"
						className="hover:text-white"
					>
						GitHub
					</a>
				</div>
			</div>
		</footer>
	);
}
