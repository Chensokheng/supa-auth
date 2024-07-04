"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CircleUser } from "lucide-react";
import { cn } from "@/lib/utils";
import useUser from "@/app/hook/useUser";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Avatar from "./avatar";

export type IconKey = "email" | "github" | "discord" | "google";

export const authProvider = {
	email: {
		Icon: MdOutlineMarkEmailRead,
	},
	github: {
		Icon: FaGithub,
	},
	discord: {
		Icon: FaDiscord,
	},
	google: {
		Icon: FcGoogle,
	},
};

export default function ManageProfile() {
	const [activeTab, setActiveTab] = useState("profile");
	const { data } = useUser();

	const AuthProviderIcon = data?.app_metadata.provider
		? authProvider[data?.app_metadata.provider as IconKey].Icon
		: MdOutlineMarkEmailRead;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<button id="manage-profile"></button>
			</DialogTrigger>
			<DialogContent className=" w-full md:w-[55rem] flex flex-col sm:flex-row  ">
				<div className=" w-60 h-[100%] rounded-s-lg p-5 space-y-7 ">
					<div>
						<h1 className="text-2xl font-bold">Account</h1>
						<p className="text-sm dark:text-gray-300 ">
							Manage your account info.
						</p>
					</div>

					<div
						className={cn(
							"p-2 flex items-center gap-2  rounded-lg text-sm cursor-pointer transition-all  ",
							{
								" text-green-700 dark:text-green-500 ring-[0.5px] ring-zinc-400":
									activeTab == "profile",
							}
						)}
						onClick={() => setActiveTab("profile")}
					>
						<CircleUser />
						<span>Profile</span>
					</div>
				</div>

				<div className="flex-1 h-full  border-l rounded-lg px-5 sm:px-10 py-5 divide-y-[0.5px] space-y-5">
					<h1 className="font-bold text-xl w-36">Profile details</h1>
					<div className="flex items-center py-5  sm:gap-24">
						<h1 className="text-sm font-medium w-36 ">Profile</h1>
						<div className="flex-1 sm:px-3">
							<Avatar />
						</div>
					</div>
					<div className="flex items-center sm:gap-24 py-5 justify-between ">
						<h1 className="text-sm font-medium w-36">Email</h1>
						<div className="flex-1 flex justify-between items-center sm:pl-3  ">
							<p className="text-sm">{data?.email}</p>
						</div>
					</div>
					<div className="flex items-start py-5 gap-2 sm:gap-24 ">
						<h1 className="text-sm font-medium w-36  ">
							Connected accounts
						</h1>
						<div className="flex-1 space-y-5 ">
							<div className="flex items-center gap-2 px-3">
								<AuthProviderIcon />
								<p className="capitalize">
									{data?.app_metadata.provider}
								</p>
								<p className="text-sm text-gray-400">
									{data?.user_metadata.user_name}
								</p>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
