// eslint-disable-next-line
export default {
	logo: <span>My Nextra Documentation</span>,
	project: {
		link: "https://github.com/shuding/nextra",
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
