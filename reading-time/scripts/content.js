function calculateReadingTime(textContent) {
	return Math.round(textContent.split(/\s+/).length / 200);
}

function createBadge(readingTime) {
	const badge = document.createElement("p");
	badge.textContent = `⏱️ ${readingTime} min read`;
	return badge;
}

function insertBadge(element, badge) {
	const targetElement =
		element.querySelector("time")?.parentNode || element.querySelector("h1");
	targetElement?.insertAdjacentElement("afterend", badge);
}

function processElement(selector, messageIfNotFound) {
	const element = document.querySelector(selector);
	if (element) {
		const text = element.textContent;
		const readingTime = calculateReadingTime(text);
		console.log(`Word count: ${text.split(/\s+/).length}`);
		console.log(`Reading time: ${readingTime} minutes`);
		insertBadge(element, createBadge(readingTime));
	} else {
		console.log(messageIfNotFound);
	}
}

processElement("article", "No article found");
processElement(
	"#app > div.container-fluid > div > div.col > div > div > div > div",
	"No divContent found"
);
