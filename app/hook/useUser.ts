"use client";

import { createSupabaseBrowser } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export default function useUser() {
	return useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const supabase = createSupabaseBrowser();
			const { data } = await supabase.auth.getUser();
			if (data.user) {
				return data.user;
			}
			return {} as User;
		},
	});
}
