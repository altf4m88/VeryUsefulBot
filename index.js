require('dotenv').config();

const { CronJob } = require('cron');
const Discord = require("discord.js");
const fs = require("fs");
const http = require('http');
const fetch = require("node-fetch");

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);

const client = new Discord.Client();
const prefix = "&";

client.commands = new Discord.Collection();
const commandFiles  = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));

console.log(commandFiles);

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.once("ready", () => {
    console.log("Sup")
    client.user.setPresence({
        activity: {
            name: "&help for documentation",
            type: "LISTENING"
        }
    })

    const url = `https://api.pray.zone/v2/times/today.json?city=Jakarta`;
    let time;

    fetch(url)
    .then(response => response.json())
    .then(async json => {
        time = json.results.datetime[0].times;

        const sholatNotifList = [
            {
                id: 'Fajr',
                name: 'Shubuh',
            },
            {
                id: 'Dhuhr',
                name: 'Dzuhur',
            },
            {
                id: 'Asr',
                name: 'Ashar',
            },
            {
                id: 'Maghrib',
                name: 'Maghrib',
            },
            {
                id: 'Isha',
                name: 'Isya',
            },
        ]
    
        let crons = {};
    
        sholatNotifList.forEach((val, idx) => {
            crons[idx] = new CronJob(`00 ${time[val.id].slice(3, 5)} ${time[val.id].slice(0, 2)} * * *`, () => {
                client.channels.cache.get(process.env.CHANNEL_ID).send(`<@&${process.env.ROLE_ID}>` + ` Jangan lupa absensi sholat ${val.name} hari ini!`);
            }, null, true, 'Asia/Jakarta');
    
            crons[idx].start();
        });

        console.log(`Successfully started absen notifier`);
    })
    .catch((error) => {
        console.log(`An error occurred while trying to fetching API. Error: ` + error);
    });

})


client.on("message", (message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();

    switch(command){
        case("ping"):
            client.commands.get('ping').execute(message);
            break;
        case("introduce"):
            client.commands.get('introduce').execute(message, args);
            break;
        case("link-solat"):
            client.commands.get('link-solat').execute(Discord, message, args);
            break;
        case("link-solat-auto"):
            client.commands.get('link-solat-auto').execute(Discord, message, args);
            break;
        case("absenin-wajib"):
            client.commands.get('absenin-wajib').execute(client, Discord, message, args);
            break;
        case("absenin-dhuha"):
            client.commands.get('absenin-dhuha').execute(Discord, message, args);
            break;
        case("absenin-tahajud"):
            client.commands.get('absenin-tahajud').execute(Discord, message, args);
            break;
        case("absensi-notifier"):
            client.commands.get('absensi-notifier').execute(Discord, message, args);
            break;
        case("random-hadist"):
            client.commands.get('random-hadist').execute(Discord, message, args);
            break;
        case("help"):
            client.commands.get('help').execute(Discord, message, args);
            break;
        case("bug-report"):
            client.commands.get('bug-report').execute(client, Discord, message, args);
            break;
        case("say"):
            client.commands.get('say').execute(message, args);
            break;
    }    
    
})




client.login(process.env.BOT_TOKEN);