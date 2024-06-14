import UserProfile from "@/components/auth/user-profile";
import React from "react";

export default function page() {
	return (
		<div className=" max-w-7xl mx-auto flex justify-between">
			<nav className="py-5  flex justify-between w-full items-center">
				<div>SupaAuth</div>
				<UserProfile />
			</nav>
		</div>
	);
}
