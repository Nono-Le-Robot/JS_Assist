const fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let videos;
  //standard radio :
  const radioUrl =
    "https://www.youtube.com/results?search_query=radio+metal+live+24%2F7";
  const radioLinks = [];
  await page.goto(radioUrl);
  videos = await page.$$eval("#thumbnail", (as) => as.map((a) => a.href));
  for (let i = 0; i < videos.length; i++) {
    if (videos[i].includes("watch")) {
      radioLinks.push(videos[i]);
      fs.writeFile(
        "./metalRadioLinks.js",
        `let metalRadioLinks = ` + JSON.stringify(radioLinks),
        (err) => {
          if (err) {
            console.error(err);
          }
          //validé
          browser.close();
        }
      );
    }
  }
})();
