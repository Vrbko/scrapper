const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

// Use Stealth Plugin to avoid detection by Cloudflare
puppeteer.use(StealthPlugin());
let stuff = [];
let counter  =0  ;
(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Launch the browser
  const page = await browser.newPage(); // Create a new page

  // Read the 'linki.txt' file and parse it into the lin array
  fs.readFile('linki.txt', 'utf8', async (err, data) => { 
    if (err) throw err;

    const lin = JSON.parse(data);  // Parse the content of the file
    console.log(`Loaded ${lin.length} links from the file`);

    // Loop through the links after they have been loaded
    for (const link of lin) {
      counter ++;
      console.log(`Visiting: ${link}`);

      // Visit the link
      await page.goto(link, { waitUntil: 'networkidle2' });
      const tableData = await page.evaluate(() => {
        const table = document.querySelector('table'); // Get the first table on the page
        if (!table) return null; // Return null if no table is found
    
        // Extract the rows and their data
        const rows = Array.from(table.rows);
        
        // Iterate through each row and extract its cells
        const tableArray = rows.map(row => {

          const cells = Array.from(row.cells).map(cell => cell.textContent.trim());
          
          return cells;
        });
    
        return tableArray; // Return the table data as an array of rows, each containing an array of cell data
      });
      const elementText = await page.evaluate(() => {
        // Use a CSS selector with all class names separated by a space
        const element = document.querySelector('p.font-weight-bold.align-middle.py-4.mb-0');
    
        if (element) {
          return element.textContent.trim(); // Return the text content of the element
        }
        return null; // Return null if the element is not found
      });
      // Log the extracted table data
      //console.log(tableData);
   
      console.log(`Successfully loaded: ${link}`);
      if(tableData != null){
      // Optionally, you could add other actions here (e.g., extracting data from the page)
      // For example, extracting page title:
      const pageTitle = await page.title();
      if(pageTitle != null)
        tableData.push("name: " + pageTitle)
      else
        tableData.push("name: " + "null")
      if(elementText != null)
        tableData.push("cena: " + elementText)
      else
        tableData.push("cena: " + "null")

     
      console.log(`Page title: ${pageTitle}`);
      console.log(`counter ` + counter +  " /143");
      console.log(`cena `+ elementText);
      //console.log(tableData);
     // stuff.push(tableData);
      fs.appendFile('data.txt', JSON.stringify(tableData) + "\n", function (err) {
        if (err) throw err;
        
       });
      }

      // Optionally, add a delay between requests to mimic human browsing behavior
      await page.waitForSelector('body', { timeout: 10000 }); // Wait for 3 seconds

    
    }

    // Close the browser after processing all links
    await browser.close();
  });
})();
