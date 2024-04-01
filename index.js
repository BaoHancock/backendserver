
const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const axios = require('axios');
const express = require("express");
const appp = express();

const port = process.env.PORT ||3000;
const rout = require('./router');
const http = require("http");
appp.use(express.json());

// Read the JSON file
appp.listen(port,()=>{
  console.log("connected to port 3000");
})
appp.use(rout);


function createWindow() {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      fullscreen: true , 

      webPreferences: {
        nodeIntegration: true
      }
    });
  
    win.loadFile('./circular/index.html')
   
  }
  var dsd,dsd1,dsd2;
  function createWindow1() {
    const win1 = new BrowserWindow({
      width: 800,
      height: 600,
      fullscreen: true , 
      webPreferences: {
        nodeIntegration: true
      }
    });
  dsd = win1;
    win1.loadFile('./attendance/attendace.html')
   
  }
  function createWindow2() {
    const win2 = new BrowserWindow({
      width: 800,
      height: 600,
      fullscreen: true ,
      webPreferences: {
        nodeIntegration: true
      }
    });
  dsd1 = win2;
    win2.loadFile('./outfit/outfit.html')
   
  }
  function createWindow3() {
    const win3 = new BrowserWindow({
      width: 800,
      fullscreen: true ,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    });
  dsd2 = win3;
    win3.loadFile('news.html')
    
   
  }
  function createWindow4() {
    const win4 = new BrowserWindow({
      width: 800,
      fullscreen: true ,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    });
  dsd2 = win4;
    win4.loadFile('slider.html');
    
   
  }
  function createWindow5() {
    const win2 = new BrowserWindow({
      width: 800,
      height: 600,
      fullscreen: true ,
      webPreferences: {
        nodeIntegration: true
      }
    });
  dsd1 = win2;
    win2.loadFile('./proper%20spotify%20run/index.html')
  }
//opens the first page nby default 
  app.whenReady().then(createWindow);

datarada="Recognxing";
lst =0;
// Path to the JSON file
const filePath = '../python/recognized_text.json';
const attedfilepath = '../python/attendacevocie.json';
fs.readFile(attedfilepath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    // Parse JSON data
    const jsonData = JSON.parse(data);

    // Now you can work with the jsonData object
    console.log(jsonData);
  } catch (error) {
    console.error('Error parsing JSON data:', error);
  }
});
// Function to read and print the value of a specific key
function readAndPrintValue(key) {
  // Read the JSON file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    try {
      // Parse JSON data
      const jsonData = JSON.parse(data);
      // Check if the key exists in the JSON object
      if (jsonData.hasOwnProperty(key)) {
        // Print the value of the key
        console.log(`${key}: ${jsonData[key]}`);
        console.log(jsonData[key]);
if(jsonData[key].trim()=='new page open')
{
    app.whenReady().then(createWindow3);
}     
if(jsonData[key].trim()=='recognizing')
{
  appp.get("/recgoiing",(req,res)=>{
    console.log
    res.send(datarada);
  })
}   
        //if condition for open the pages
        if(jsonData[key].trim()=='new page open')
{
    app.whenReady().then(createWindow3);
}     
if(jsonData[key].trim()=='open spotify'||jsonData[key].trim()=='open spotify open spotify')
{
    app.whenReady().then(createWindow5);
}      
        if(jsonData[key].trim()=='attendance page'||jsonData[key].trim()=='open attendance page' ||jsonData[key].trim()=='my attendance')
{
    app.whenReady().then(createWindow1);
    return;
}      
if(jsonData[key].trim()=='outfit'||jsonData[key].trim()==' open outfit page '||jsonData[key].trim()=='wanna go to marriage' ||jsonData[key].trim()=='get me an outfit')
{
    app.whenReady().then(createWindow2);
}       
else if(jsonData[key].trim()=='close attendance page'){
    if (dsd) {
        dsd.close();
      }
}
else{
  jsonData[key].trim()
  console.log(jsonData[key].trim())

  
  //code  for extra topic chagning 
    
    let data = "";
    let cmd = jsonData[key].trim();
    var url='';
    console.log(cmd);
   
    var link = "http://api.brainshop.ai/get?bid=180708&key=L9PGFHimEoyRGwJT&uid=[uid]&msg="+cmd;
    console.log(link);
    http.get(link, resp => {
     
  
      // A chunk of data has been recieved.
      resp.on("data", chunk => {
        data += chunk;
      });
  
      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        var url='';
        url += JSON.parse(data).cnt;
           console.log(url);
           const jsonData = {
            recognized_text1: url
        };
        
           const jsonString = Object.keys(jsonData).map(key => {
            return `"recognized_text1": "${jsonData[key]}"`;
        }).join(',\n');
        
        const formattedJsonString = `{\n${jsonString}\n}`;
          
         
           const filePath = '../python/data.json'; 
           fs.writeFile(filePath, formattedJsonString, (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
            } else {
                console.log('Data has been written to', filePath);
            }
        });
          //  setInterval(()=>{
          //   appp.get('/brainshop', (req, res) => {
          //     res.json({"answer":url}); // Send data as JSON response
          // });
          //  },1000);
          
      });
    })
    .on("error", err => {
      console.log("Error: " + err.message);
    });
    
  
  
}
      } else {
        console.error(`Key '${key}' not found in the JSON data.`);
      }
    } catch (error) {
      console.error('Error parsing JSON data:', error);
    }
  });
}

// Read and print the initial value of the key
readAndPrintValue('recognized_text1');

// Continuously watch the file for changes
fs.watchFile(filePath, (curr, prev) => {
  console.log('File changed...');
  // Read and print the value of the key when it changes
  readAndPrintValue('recognized_text1');
});
let cmd = "what is your name ";
const FILE_PATH = '../python/marriage.json'; // Change this to your file path


// Function to send a post request
async function sendPostRequest(data) {
  console.log(data.body);

  const POST_URL = "http://api.brainshop.ai/get?bid=180708&key=L9PGFHimEoyRGwJT&uid=[uid]&msg="+cmd; // Change this to your POST endpoint
    try {
        const response = await  http.get(POST_URL, resp => {
     
  
          // A chunk of data has been recieved.
          resp.on("data", chunk => {
            data += chunk;
          });
      
          // The whole response has been received. Print out the result.
          resp.on("end", () => {
            let url = JSON.parse(data).cnt;console.log(url);
               
          });
        })
        .on("error", err => {
          console.log("Error: " + err.message);
        });
        console.log('Post request successful:', response);
    } catch (error) {
        console.error('Error sending post request:', error);
    }
}

// Watch for changes in the file
fs.watchFile(FILE_PATH, async (curr, prev) => {
    if (curr.mtime !== prev.mtime) { // Check if file modification time has changed
        try {
            const data = fs.readFileSync(FILE_PATH, 'utf8');
            
            // You may need to parse the data depending on the file format
            await sendPostRequest(JSON.parse(data));
        } catch (error) {
            console.error('Error reading file:', error);
        }
    }
});

console.log('Watching for changes in:', FILE_PATH);

