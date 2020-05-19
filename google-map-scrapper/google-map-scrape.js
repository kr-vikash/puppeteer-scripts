const puppeteer=require('puppeteer');
const fs = require('fs');

(async()=>{
    // type of data to extract
    let scrape = 'restaurants';
    const browser = await puppeteer.launch({
    executablePath: '/snap/bin/chromium',
    args: ['--no-sandbox'],
    headless:true,
    ignoreHTTPSErrors: false
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1378, height: 780 });
        await page.goto('https://www.google.com/maps');

        await typeElementAndClick(page,'.tactile-searchbox-input', scrape, '.searchbox-searchbutton-container');

        await page.waitForSelector('.section-result');

        console.log("Obtain search result!!!");
    	let tds = await page.$$('.section-result');

        let pageCount = 1;
        let data = [];

   	for(var i =0 ;i<tds.length;i++){

    	    await tds[i].click();
    	    let resObj = {};
            let image = await getSelectorText(page, '.section-hero-header-image' );
            console.log(image);
    	    // extract data
            let titleValue = await getSelectorText(page, '.section-hero-header-title-title.GLOBAL__gm2-headline-5' );
            resObj.title = titleValue;
            console.log(titleValue);
            let ratingValue = await getSelectorText(page, '.section-star-display');
            resObj.rating = ratingValue;
            console.log(ratingValue);
    	    // extract data end
            await page.waitFor(200);

    	    await page.click('.section-back-to-list-button.blue-link.noprint');
   	        if(i === (tds.length-1)){
   	            console.log("Next page click, current page: " + pageCount );
   	            await clickElement(page, '.n7lv7yjyC35__button-next-icon');
   	            i=0;
   	            pageCount++;
   	        }
   	        await page.waitForSelector('.section-result');
       	    tds = await page.$$('.section-result');

   	}

    console.log(tds.length);

    await page.screenshot({ path: 'working.png', fullPage: false });
    console.log('done')
    await browser.close();
})();

async function getSelectorText(page, element){

  try{
      await page.waitForSelector(element, {timeout: 10000 });
   }catch(err){
      console.log("not found");
   }
   let el = await page.$(element);
   let value = undefined;
   if(el){
     value = await page.evaluate(el => el.textContent , el);
   }
   return value;
}

async function clickElement(page, element){
   try{
         await page.waitForSelector(element, {timeout: 10000 });
      }catch(err){
         console.log("not found");
      }
   await page.click(element);
}

async function typeElementAndClick(page, typeEl, typeValue, clickEl){
   await page.waitForSelector(typeEl);
   await page.type(typeEl, typeValue);
   await page.waitForSelector(clickEl);
   await page.click(clickEl);
}
