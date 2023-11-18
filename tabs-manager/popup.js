const tabs = await chrome.tabs.query({
	url: [
		"https://developer.chrome.com/docs/webstore/*",
		"https://developer.chrome.com/docs/extensions/*",
	],
});
const collator = new Intl.Collator();

tabs.sort((a, b) => collator.compare(a.title, b.title));

const template = document.getElementById("li_template");
const elements = new Set();
for (const tab of tabs) {
	const element = template.content.firstElementChild.cloneNode(true);
	console.log(element);
	console.log(tab);
}
