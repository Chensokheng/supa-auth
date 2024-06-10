"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { RiArrowRightSFill } from "react-icons/ri";

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
import { useState } from "react";
import Link from "next/link";

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
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
			"confirm-pass": "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
											passwordReveal ? "text" : "password"
										}
										{...field}
									/>
									<div
										className="absolute right-2 top-[30%] cursor-pointer group"
										onClick={() =>
											setPasswordReveal(!passwordReveal)
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
											passwordReveal ? "text" : "password"
										}
										{...field}
									/>
									<div
										className="absolute right-2 top-[30%] cursor-pointer group"
										onClick={() =>
											setPasswordReveal(!passwordReveal)
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
					className="w-full bg-indigo-500 hover:bg-indigo-600 transition-all text-white flex items-center gap-2 h-8"
				>
					Continue <RiArrowRightSFill className=" size-4" />
				</Button>
			</form>
			<div>
				<h1 className="text-sm text-center">
					Already have account?{" "}
					<Link href={"/signin"} className="text-blue-400 underline">
						Signin
					</Link>
				</h1>
			</div>
		</Form>
	);
}
