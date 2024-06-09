// eslint-disable-next-line
export default {
	logo: <span>SupaAuth🔓</span>,
	docsRepositoryBase: "https://github.com/Chensokheng/supa-auth/tree/master",

	project: {
		link: "https://github.com/Chensokheng/supa-auth",
	},
	sidebar: {
		titleComponent({ title, type }) {
			if (type === "separator") {
				return <div style={{ fontWeight: "bold" }}>{title}</div>;
			}
			// if (title === "About") {
			// 	return <>❓ {title}</>;
			// }
			return <>{title}</>;
		},
	},
	banner: {
		key: "beta-release",
		text: "🎉 Supa Auth is beta verion",
	},
};
