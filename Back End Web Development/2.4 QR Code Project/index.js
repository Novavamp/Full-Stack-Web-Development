import inquirer from 'inquirer';
import fs from 'fs';
import qr from 'qr-image';

//1. Use the inquirer npm package to get user input.

inquirer
  .prompt([
    {
        type: 'input',
        name: 'URL',  // Name of the answer to access it later
        message: 'Enter the website address',  
    } 
  ])
  .then((answers) => {

    // 2. Use the qr-image npm package to turn the user entered URL into a QR code image
    const url = answers.URL;
    const qr_png = qr.image(url, { type: 'png' });
    qr_png.pipe(fs.createWriteStream('QRCode.png'));

    // 3. Create a txt file to save the user input using the native fs node module.
    fs.writeFile("URL.txt", url, (err) => {
        if (err) throw err;
        console.log("Saved user input.");
    });

  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment")
    } else {
      console.log("Something else went wrong");
    }
  });