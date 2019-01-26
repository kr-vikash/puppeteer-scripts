
const puppeteer=require('puppeteer');

(async()=>{

    const browser = await puppeteer.launch({
    executablePath: '/snap/bin/chromium',
    args: ['--no-sandbox','--user-data-dir'],
    headless:false,
    ignoreHTTPSErrors: false
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1378, height: 780 })

    await page.goto('https://fb.com');
    await page.waitFor(2000);
    await page.screenshot({ path: 'working.png', fullPage: false });

    await page.waitFor(2000);
    console.log('done')
    await browser.close();
})();
