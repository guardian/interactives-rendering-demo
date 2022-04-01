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

const validURL = (url: string): boolean =>
	new URL(url).host === "interactive.guim.co.uk";

export const handler = async (url: string) => {
	if (!validURL(url)) {
		throw new Error(`Not a valid URL`);
	}
	const browser = await puppeteer.launch({
		headless: true,
		defaultViewport: {
			width: 670,
			height: 1000,
		},
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
