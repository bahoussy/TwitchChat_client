const tmi = require("tmi.js");
require('dotenv').config();
const keep_alive = require('./keep-alive.js');
const player = require('play-sound')({player: "C:/Users/renek/OneDrive/Bureau/MPlayer/mplayer.exe"});

var block = false;

// Define configuration options
const opts = {
  identity: {
    username:process.env.USER,
    password: process.env.OAUTH
  },
  channels: ['Kokobong','matt_em','sodapoppin','moonmoon','NymN']
};

// Create a client with our options
const client = new tmi.client(opts);
//console.log(client);
// Register our event handlers (defined below)
client.on("chat", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect();
async function onMessageHandler (target, user, msg, self) {
// Called every time a message comes in
if (self) { return; } // Ignore messages from the bot
  //const data = JSON.parse(user);
  console.log(user["display-name"],'Typed in ',target,':',msg);
  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, execute it
  
 
/*
 if(commandName==="!rq"){
   
     const fs = require("fs");
     var quotes = fs.readFileSync('quotes.txt').toString().split("\n");
    var index =Math.floor(Math.random() * quotes.length);
      client.say(
        target,
        ` ${quotes[index]}`
      );
       
        
    
 }
*/
  if(msg.indexOf("Kokobong") !== -1){
    player.play('percussion-sound-614.ogg', (err) => {
        if (err) console.log(`Could not play sound: ${err}`);

    });

 }
 if(msg.indexOf("Kokobong") !== -1){
     client.say(
         target,
         'lmao'
     );
 }

    }
   

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port, Menu) {
  console.log(`* Connected to ${addr}:${port}`);
}
const electron = require('electron');
const {app, BrowserWindow} = electron;
const url = require('url')
const path = require('path');
const { Menu } = require("electron");
let mainWindow;
let addWindow;


app.on('ready', function(){
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname,'mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
});


function createNewChat(){
  addWindow = new BrowserWindow({
    width: 400,
    height: 300,
    title: 'Add new channel'
  });
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname,'addChat.html'),
    protocol: 'file:',
    slashes: true
  }));

}

const mainMenuTemplate = [
  {
    label:'File',
    submenu: [
      {
        label: 'New chat',
        click(){
          createNewChat();
        }
      }
    ]
  }
];