import ManageProfile from "@/components/auth/manage-profile";
import UserProfile from "@/components/auth/user-profile";
import React from "react";

export default function page() {
	return (
		<div className=" max-w-7xl mx-auto flex justify-between">
			<nav className="py-5  flex justify-between w-full items-center h-24">
				<div>SupaAuth</div>
				<div className="flex">
					<UserProfile />
				</div>
			</nav>
		</div>
	);
}
