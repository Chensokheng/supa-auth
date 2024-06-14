"use client";
import Image from "next/image";
import React, { useTransition } from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { IoMdSettings } from "react-icons/io";
import { PiSignOutFill } from "react-icons/pi";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useUser from "@/app/hook/useUser";

export default function UserProfile() {
	const [isSignOut, startSignOut] = useTransition();
	const router = useRouter();
	const { data, isFetching } = useUser();

	const signout = () => {
		startSignOut(async () => {
			const supabase = createSupabaseBrowser();
			await supabase.auth.signOut();
			router.push("/signin");
		});
	};

	return (
		<div>
			<Popover>
				<PopoverTrigger>
					<div className=" border w-10 h-10    grid place-content-center rounded-full hover:scale-105 transition-all">
						<p className="text-4xl -translate-y-1">
							{data?.email?.[0]}
						</p>
					</div>
					{/* <Image
						src={"/supabase.png"}
						alt=""
						width={50}
						height={50}
						className={cn(
							" rounded-full border p-1 hover:scale-105 transition-all duration-500",
							isFetching
								? "opacity-0 translate-y-2"
								: "opacity-1 translate-y-0"
						)}
					/> */}
				</PopoverTrigger>
				<PopoverContent align="end" className="w-[30rem]">
					<div
						className={cn("flex gap-5 items-start", {
							"animate-pulse": isSignOut,
						})}
					>
						<div className=" border w-10 h-10    grid place-content-center rounded-full hover:scale-105 transition-all">
							<p className="text-4xl -translate-y-1">
								{data?.email?.[0]}
							</p>
						</div>
						<div className="space-y-5 w-full flex-1">
							<div>
								<h1>{data?.email}</h1>
							</div>

							<div className="flex gap-2 w-full">
								<Button
									className="w-1/2 h-9  rounded-xl flex items-center justify-center gap-2 text-gray-600 text-sm"
									variant="outline"
								>
									<IoMdSettings className="size-5" />
									Manage Account
								</Button>
								<Button
									className="w-1/2 h-9  rounded-xl flex items-center justify-center gap-2 text-gray-600 text-sm"
									variant="outline"
									onClick={signout}
								>
									{!isSignOut ? (
										<PiSignOutFill className="size-5" />
									) : (
										<AiOutlineLoading3Quarters className="size-4 animate-spin" />
									)}
									SignOut
								</Button>
							</div>
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
