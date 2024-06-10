"use server";

import { createSupabaseServer } from "@/lib/supabase/server";

export const signupWithEmailAndPassword = async (data: {
	email: string;
	password: string;
	"confirm-pass": string;
}) => {
	const supabase = createSupabaseServer();

	const res = await supabase.auth.signInWithPassword({
		email: data.email,
		password: data.password,
	});
	return JSON.stringify(res);
};

export const verifyOtp = async (data: {
	email: string;
	otp: string;
	type: string;
}) => {
	const supabase = createSupabaseServer();

	const res = await supabase.auth.verifyOtp({
		email: data.email,
		token: data.otp,
		type: "email",
	});
	return JSON.stringify(res);
};
