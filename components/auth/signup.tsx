"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { RiArrowRightSFill, RiArrowDropLeftFill } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { SiMinutemailer } from "react-icons/si";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { verifyOtp } from "@/actions/auth";

const FormSchema = z
	.object({
		email: z.string().email({ message: "Invalid Email Address" }),
		password: z.string().min(6, { message: "Password is too short" }),
		"confirm-pass": z.string().min(6, { message: "Password is too short" }),
	})
	.refine(
		(data) => {
			if (data["confirm-pass"] !== data.password) {
				console.log("running");
				return false;
			} else {
				return true;
			}
		},
		{ message: "Password does't match", path: ["confirm-pass"] }
	);

export default function SignUp() {
	const [passwordReveal, setPasswordReveal] = useState(false);
	const [isConfirmed, setIsConfirmed] = useState(false);
	const [verifyStatus, setVerifyStatus] = useState<string>("");
	const [otp, setOpt] = useState("");
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
			"confirm-pass": "",
		},
	});

	const sendVerifyEmail = async (data: z.infer<typeof FormSchema>) => {
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		};
		// Send the POST request
		const res = await fetch("/api/signup", requestOptions);
		const json = await res.json();
		console.log(json.properties.email_otp);
		setOpt(json.properties.email_otp);
		setIsConfirmed(true);
	};

	function onSubmit(data: z.infer<typeof FormSchema>) {
		startTransition(async () => {
			await sendVerifyEmail(data);
		});
	}

	return (
		<div className=" whitespace-nowrap p-5 space-x-5 overflow-hidden  items-center align-top  ">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className={cn(
						`space-y-3 inline-block w-full transform transition-all`,
						{
							"-translate-x-[110%]": isConfirmed,
						}
					)}
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className=" font-semibold  test-sm">
									Email Address
								</FormLabel>
								<FormControl>
									<Input
										className="h-8"
										placeholder="example@gmail.com"
										type="email"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-red-500" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm font-semibold">
									Password
								</FormLabel>
								<FormControl>
									<div className=" relative">
										<Input
											className="h-8"
											type={
												passwordReveal
													? "text"
													: "password"
											}
											{...field}
										/>
										<div
											className="absolute right-2 top-[30%] cursor-pointer group"
											onClick={() =>
												setPasswordReveal(
													!passwordReveal
												)
											}
										>
											{passwordReveal ? (
												<FaRegEye className=" group-hover:scale-105 transition-all" />
											) : (
												<FaRegEyeSlash className=" group-hover:scale-105 transition-all" />
											)}
										</div>
									</div>
								</FormControl>
								<FormMessage className="text-red-500" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirm-pass"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm font-semibold">
									Confirm Password
								</FormLabel>
								<FormControl>
									<div className=" relative">
										<Input
											className="h-8"
											type={
												passwordReveal
													? "text"
													: "password"
											}
											{...field}
										/>
										<div
											className="absolute right-2 top-[30%] cursor-pointer group"
											onClick={() =>
												setPasswordReveal(
													!passwordReveal
												)
											}
										>
											{passwordReveal ? (
												<FaRegEye className=" group-hover:scale-105 transition-all" />
											) : (
												<FaRegEyeSlash className=" group-hover:scale-105 transition-all" />
											)}
										</div>
									</div>
								</FormControl>
								<FormMessage className="text-red-500" />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="w-full h-8 bg-indigo-500 hover:bg-indigo-600 transition-all text-white flex items-center gap-2"
					>
						<AiOutlineLoading3Quarters
							className={cn(
								!isPending ? "hidden" : "block animate-spin"
							)}
						/>
						Continue
						<RiArrowRightSFill className=" size-4" />
					</Button>
					<div className="text-center text-sm">
						<h1>
							Already have account?{" "}
							<Link href="/signin" className="text-blue-400">
								Signin
							</Link>
						</h1>
					</div>
				</form>
			</Form>
			<div
				className={cn(
					`w-full inline-block h-80 text-wrap align-top  transform transition-all space-y-3`,
					isConfirmed ? "-translate-x-[105%]" : "translate-x-0"
				)}
			>
				<div className="flex h-full items-center justify-center flex-col space-y-5">
					<SiMinutemailer className=" size-8" />

					<h1 className="text-2xl font-semibold text-center">
						Verify email
					</h1>
					<p className="text-center text-sm">
						{" A verification code has been sent to "}
						<span className="font-bold">
							{form.getValues("email")}
						</span>
					</p>

					<InputOTP
						id="input-otp"
						maxLength={6}
						onChange={async (value) => {
							if (value.length === 6) {
								const res = await verifyOtp({
									email: form.getValues("email"),
									otp: value,
									type: "email",
								});
								const { data, error } = JSON.parse(res);
								if (error) {
									setVerifyStatus("failed");
								} else {
									setVerifyStatus("success");
								}
								document.getElementById("input-otp")?.blur();
							}
						}}
					>
						<InputOTPGroup>
							<InputOTPSlot
								index={0}
								className={cn({
									" border-green-500":
										verifyStatus === "success",
									" border-red-500":
										verifyStatus === "failed",
								})}
							/>
							<InputOTPSlot
								index={1}
								className={cn({
									" border-green-500":
										verifyStatus === "success",
									" border-red-500":
										verifyStatus === "failed",
								})}
							/>
							<InputOTPSlot
								index={2}
								className={cn({
									" border-green-500":
										verifyStatus === "success",
									" border-red-500":
										verifyStatus === "failed",
								})}
							/>
						</InputOTPGroup>
						<InputOTPSeparator />
						<InputOTPGroup>
							<InputOTPSlot
								index={3}
								className={cn({
									" border-green-500 ring-green-500":
										verifyStatus === "success",
									" border-red-500":
										verifyStatus === "failed",
								})}
							/>
							<InputOTPSlot
								index={4}
								className={cn({
									" border-green-500":
										verifyStatus === "success",
									" border-red-500":
										verifyStatus === "failed",
								})}
							/>
							<InputOTPSlot
								index={5}
								className={cn({
									" border-green-500":
										verifyStatus === "success",
									" border-red-500":
										verifyStatus === "failed",
								})}
							/>
						</InputOTPGroup>
					</InputOTP>
					<div className="text-sm">
						<p>
							{"Didn't work?"}{" "}
							<span className="text-blue-400">
								Send me another code.
							</span>
						</p>
					</div>
					<Button
						type="submit"
						className="w-full h-8 bg-indigo-500 hover:bg-indigo-600 transition-all text-white flex items-center gap-2"
						onClick={async () => {
							setIsConfirmed(false);
						}}
					>
						<RiArrowDropLeftFill className=" size-5" />
						Change Email
					</Button>
				</div>
			</div>
		</div>
	);
}
