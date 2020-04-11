const puppeteer = require('puppeteer');


(async() => {
    const browser = await puppeteer.launch({
    headless:false,
    dumpio: true,
    slowMo: 500,
    args: ['--disable-gpu', '--no-sandbox', '--disable-setuid-sandbox','--use-fake-ui-for-media-stream','--disable-notifications']});

        const page = await browser.newPage();
       // browser.userAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36');
        page.setJavaScriptEnabled(true);

        console.log('user agent set');
      

         page.goto('${meeting_url}', {timeout: 0,waitUntil: 'networkidle0'});
         
         page.on('dialog', async dialog => {
   		 console.log(dialog.message());
   		 await dialog.dismiss();
   // await browser.close();
  	});
        console.log("step1");

        await page.waitForSelector('#btnLogin');
        page.click('#btnLogin');
console.log("\n\n step 2 \n \n");
        await page.waitForSelector('#i0116', {timeout: 60000});
        var emailId = "${email_id/username}";
        await page.type('#i0116', emailId);
        const inputElement = await page.$('input[type=submit]');
        inputElement.click();
        console.log('\n\n username set\n\n');
        await page.waitForSelector('#i0118', {timeout: 60000});
        var pass = "${password}";
        await page.type('#i0118', pass);
        await page.waitFor(2000);
        const inputElement2 = await page.$('input[type=submit]');
        inputElement2.click();
        page.waitFor(5000);
        console.log('\n page loaded, please initiate a call!!!\n');

        await page.waitFor(50000);
        //await page.waitForSelector('.btn primary circle', {timeout: 60000});
        //page.click('.btn primary circle');
        //await page.waitFor(60000);
          //let bodyHTML = await page.evaluate(() => document.body.innerHTML);
        //console.log("\n\n start a call timeout is 5s\n");
           
         await page.waitFor(10000);
            
         const inputElement3 = await page.$('.btn.primary.circle.joinCall');
                 inputElement3.click();  
        
        await page.waitFor(5000);
        await page.screenshot({path: 'screenshot.png'});
        
        console.log("step4");
        console.log("success");
        await page.waitFor(120000);
        await browser.close();


})();

