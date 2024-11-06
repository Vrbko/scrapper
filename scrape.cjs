const puppeteer = require('puppeteer');
const fs = require('fs');
const lin = [];

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.avto.net/Ads/results.asp?znamka=Renault&model=Megane&modelID=&tip=&znamka2=&model2=&tip2=&znamka3=&model3=&tip3=&cenaMin=0&cenaMax=999999&letnikMin=0&letnikMax=2090&bencin=0&starost2=999&oblika=0&ccmMin=0&ccmMax=99999&mocMin=0&mocMax=999999&kmMin=0&kmMax=9999999&kwMin=0&kwMax=999&motortakt=0&motorvalji=0&lokacija=0&sirina=0&dolzina=&dolzinaMIN=0&dolzinaMAX=100&nosilnostMIN=0&nosilnostMAX=999999&sedezevMIN=0&sedezevMAX=9&lezisc=&presek=0&premer=0&col=0&vijakov=0&EToznaka=0&vozilo=&airbag=&barva=&barvaint=&doseg=0&EQ1=1000000000&EQ2=1000000000&EQ3=1000000000&EQ4=1000000000&EQ5=1000000000&EQ6=1000000000&EQ7=1110100120&EQ8=100000000&EQ9=1000000020&KAT=1010000000&PIA=&PIAzero=&PIAOut=&PSLO=&akcija=0&paketgarancije=&broker=0&prikazkategorije=0&kategorija=0&ONLvid=0&ONLnak=0&zaloga=10&arhiv=0&presort=3&tipsort=DESC&stran=3', { waitUntil: 'networkidle2' });
  
  const links = await page.evaluate(() => {
    // Select all anchor tags and return their href attributes in an array
    return Array.from(document.querySelectorAll('a')).map(link => link.href);
  });
 var counter = 0;
  // Loop through each link and print it
  for (const link of links) {
    if(link.includes("https://www.avto.net/Ads/details.asp") ){
      if(!link.includes("display")){
        //console.log(link);
        lin.push(link);
        counter++;
        
      }
    }
    // If you want to visit each link, uncomment the following:
    // await page.goto(link, { waitUntil: 'networkidle2' });
    // You could add further actions here for each page
  }
  console.log("counter: " + counter);
  fs.appendFile('linki.txt', JSON.stringify(lin), function (err) {
    if (err) throw err;
    
  });
  // Close the browser
  await browser.close();
})();