chrome.runtime.onInstalled.addListener(() => {
	chrome.action.setBadgeText({ text: "OFF" });
});

const toggleFocusMode = async (tab, cssFile) => {
	const isExtensionPage =
		tab.url.startsWith(extensions) ||
		tab.url.startsWith(webstore) ||
		tab.url.startsWith(githubExtensionsRepo);

	if (isExtensionPage) {
		const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
		const nextState = prevState === "ON" ? "OFF" : "ON";

		await chrome.action.setBadgeText({ text: nextState, tabId: tab.id });

		const action = nextState === "ON" ? "insert" : "remove";
		await chrome.scripting[action + "CSS"]({
			files: [cssFile],
			target: { tabId: tab.id },
		});

		console.log(`Extension page - Next state: ${nextState}`);
	} else {
		console.log("Not an extension page");
	}
};

const extensions = "https://developer.chrome.com/docs/extensions";
const webstore = "https://developer.chrome.com/docs/webstore";
const githubExtensionsRepo =
	"https://github.com/JDCG00/learn-chrome-extensions";

chrome.action.onClicked.addListener(async (tab) => {
	const isExtension =
		tab.url.startsWith(extensions) ||
		tab.url.startsWith(webstore) ||
		tab.url.startsWith(githubExtensionsRepo);

	if (isExtension) {
		await toggleFocusMode(
			tab,
			isExtension && tab.url.startsWith(githubExtensionsRepo)
				? "focus-mode-github-repo.css"
				: "focus-mode.css"
		);
	} else {
		console.log("Not an extension page");
	}
});
