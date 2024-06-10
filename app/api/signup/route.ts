import supabaseAdmin from "@/lib/supabase/admin";

export async function POST(request: Request) {
	const data = await request.json();
	const supabase = supabaseAdmin();

	const { data: res, error } = await supabase.auth.admin.generateLink({
		type: "signup",
		email: data.email,
		password: data.password,
	});
	console.log(res);

	return Response.json(res);
}
