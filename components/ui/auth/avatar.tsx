import { cn } from "@/lib/utils";
import React from "react";

const Avatar = () => {
	return (
		<div className={cn("transition-all p-1")}>
			<div className=" border w-10 h-10  grid place-content-center rounded-full hover:scale-105 transition-all p-1">
				<p className="text-4xl -translate-y-1 p-1">E</p>
			</div>
		</div>
	);
};

export default Avatar;
