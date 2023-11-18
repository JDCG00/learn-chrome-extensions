const tabs = await chrome.tabs.query({
	url: [
		"https://developer.chrome.com/docs/webstore/*",
		"https://developer.chrome.com/docs/extensions/*",
		"https://github.com/*",
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
	console.log(tab.windowId);
	const title = tab.title.split(" - ")[0].trim();
	console.log(title);
	const pathname = new URL(tab.url).pathname.slice("/docs".length);
	console.log(pathname);

	console.log(element.querySelector(".title").textContent);
	element.querySelector(".title").textContent = title;
	console.log(element.querySelector(".title").textContent);
	element.querySelector(".pathname").textContent = pathname;
	element.querySelector("a").addEventListener("click", async () => {
		await chrome.tabs.update(tab.id, { active: true });
		await chrome.windows.update(tab.windowId, { focused: true });
	});
	elements.add(element);
}
document.querySelector("ul").append(...elements);

const button = document.querySelector("button");
button.addEventListener("click", async () => {
	const tabIds = tabs.map((tab) => tab.id);
	console.log(tabIds);
	const group = await chrome.tabs.group({ tabIds });
	console.log(group);
	await chrome.tabGroups.update(group, { title: "DOCS" });
});
