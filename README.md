# mute-ayoub.js
A simple module based on MirageZoe's module: better-discord-antispam.js! While containing the same efficiency(quick and simple setup), it comes with new things like setting up a report channel, timed mutes(added mute & unmute automatically) and many more features coming on the way!
**DISCLAMER:** You can only setup 1 set of configuration per client. (That means that you can't configure settings for each server for now. You can only modify in which guild checker is run and in which checker is not run.) 


## How to add this to your node_modules:
To install this module type in your console command below:
```
npm i mute-ayoub
```

## An example of how to set up:
Below you will find an example that would explain everything and what you must set up! (it's not too different!)

```js
const Discord = require('discord.js');
const antispam = require('mute-ayoub'); // Requiring this module.
const client = new Discord.Client();

client.on('ready', () => {
  // Module Configuration Constructor
   ayoub(client, {
       mutecmd: "", // The mute command. If there is no command set, by default.
        muteMessage: "was muted since we don't like too much advertisement type people!",
		mutedRole: "muted", // Here you put the name of the role that should not let people write or anything else in your server. If there is no role set, by default, the module will attempt to create the role for you & set it correctly for every channel in your server. It will be named "muted".
		timeMuted: "10m", // This is how much time member X will be muted. if not set, default would be 10 min.
        logChannel: "mute-logs" // This is the channel where every report about spamming goes to. If it's not set up, it will attempt to create the channel.
        mprefix: "#" //the prefix of the mute command. If there is no command set, by default.
      });
      
  // Rest of your code
});

client.on('message', msg => {
  client.emit('checkMessage', msg);
  // Rest of your code
}

client.login('token');
```
This is the main setup you have to add in order to mute annoying people.

## Little bit of documentation...

```js
ayoub(<Client>);
```
This will configure module to run on its default configuration.<br>
`<Client>` - Variable that defines `new Discord.Client()`<br>
`ayoub` - Variable that defines `require('mute-ayoub')` <br>
<br>
```js
client.emit('checkMessage', <Message>)
```
`<Message>` - Variable that defines the message itself. (`client.on('message', async (msg) =>{})` in this situation msg is the <Message> variable.)
This will basically send your message to module. In fact is REQUIERED for module to run.<br>
<br>
```js
ayoub(client, {
    mutecmd: "mute",
    muteMessage: "",
	mutedRole:"",
	timeMuted: "10m",
	logChannel: "",
    mprefix: "#"
});
```
`ayoub` - Variable that defines `require('mute-ayoub')` <br>
`<Client>` - Requiered, Discord.Client<br>
`muteMessage` - Optional, Type: String, Minimum 5 Characters<br>
`mutedRole`- Optional, Type: String<br>
`timeMuted`- Optional, Type: Integer<br>
`logChannel`- Optional, Type: String<br>
`mprefix`- Optional, Type: String<br>
`mutecmd`- Optional, Type: String<br>
<br>
**NOTE:** The module **will** throw errors for assigning incorect types to configuration values.<br>
<br>

P.S: If you have any issues, bugs or trouble setting the module up. feel free to open an issue on [Github](https://github.com/discordayoub289/mute-ayoub)