First, we must use the following command to install the packages


`` Install npm ``

Then we go to https://discord.com/developers/applications and create a bot.

After creating the robot and creating the token, we complete the config.js file

It should be mentioned that you should create a Discord server and create two text channels, one for logs and one for commands.

```js
export let a = {
   token: "Your Token",
   guild: "ID Channel",
   ClinetID: "Bot ID",
   role: {
     owner: "Role ID",
     admin: "Role ID",
   },
   Channels: {
     log: "Log Text Channel ID",
     Admin: "Command Text Channel ID",
   },
};
```
Well, now it's time to enter the information of the router itself in the .env file

```env
MIKROTIK_HOST='Router IP'
MIKROTIK_USER='Router User'
MIKROTIK_PASSWORD="Router Password"
MIKROTIK_PORT='Router Api Port'
```

Then you can invite the bot to your channel https://discordjs.guide/preparations/adding-your-bot-to-servers.html

and then run
``npm start``