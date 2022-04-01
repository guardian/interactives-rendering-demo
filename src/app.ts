import puppeteer from "puppeteer";

type Viewport = {
	width: number;
	height: number;
};

const getElementViewport = async (
	element: puppeteer.ElementHandle
): Promise<Viewport | null> => {
	const maybeBoundingBox = await element.boundingBox();
	if (maybeBoundingBox) {
		return {
			width: Math.ceil(maybeBoundingBox.width),
			height: Math.ceil(maybeBoundingBox.height),
		};
	}
	return null;
};

export const handler = async (url: string) => {
	const browser = await puppeteer.launch({
		headless: true,
	});

	const page = await browser.newPage();
	await page.goto(url);

	const body = await page.$("body");
	if (!body) {
		throw new Error(`Could not find <body> element`);
	}

	const bodyViewport = await getElementViewport(body);
	if (!bodyViewport) {
		throw new Error(`Could not calculate viewport`);
	}

	await page.setViewport({
		...bodyViewport,
		deviceScaleFactor: 2,
	});

	await page.screenshot({
		path: "screenshot.png",
	});
};

handler(
	"https://interactive.guim.co.uk/uploader/embed/2022/01/worldpop-zip/giv-825mk6yQah7DFxK/"
);
