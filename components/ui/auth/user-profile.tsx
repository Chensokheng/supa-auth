"use client";
import React from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { IoMdSettings } from "react-icons/io";
import ManageProfile from "./manage-profile";
import Avatar from "./avatar";
import { cn } from "@/lib/utils";

export default function UserProfile() {
	return (
		<div className="w-full">
			<Popover>
				<PopoverTrigger>
					<Avatar />
				</PopoverTrigger>
				<PopoverContent align="start" className="w-[95%] sm:w-[30rem]">
					<div
						className={cn(
							"flex gap-5 items-start w-[90%] sm:w-full"
						)}
					>
						<div className="">
							<Avatar />
						</div>
						<div className="space-y-5 w-full flex-1">
							<div>
								<h1>Example@gmail.com</h1>
							</div>

							<div className="flex gap-2 w-full pr-3 sm:pr-0">
								<Button
									className="w-1/2 h-9  rounded-xl flex items-center justify-center gap-2 text-gray-600 dark:text-gray-200 text-sm"
									variant="outline"
									onClick={() => {
										document
											.getElementById("manage-profile")
											?.click();
									}}
								>
									<IoMdSettings className="size-5" />
									Manage Account
								</Button>
								<Button
									className=" w-1/2 h-9  rounded-xl flex items-center justify-center gap-2 text-gray-600 dark:text-gray-200 text-sm"
									variant="outline"
								>
									SignOut
								</Button>
							</div>
						</div>
					</div>
				</PopoverContent>
			</Popover>
			<ManageProfile />
		</div>
	);
}
