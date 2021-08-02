const today = new Date;
const fetch = require("node-fetch");
const cooldown = new Set();
const rawi = {
    id: ["abu-daud", "ahmad", "bukhari", "darimi", "ibnu-majah", "malik", "muslim", "nasai", "tirmidzi"],
    available: [3000, 20, 2000, 1000, 2000, 500, 1500, 4000, 3625]
}

let year = today.getFullYear();
let month = ("0" + (today.getMonth() + 1)).slice(-2);
let date = ("0" + today.getDate()).slice(-2);

module.exports = {
    name: 'absenin-wajib',
    description: "Auto absen semua solat wajib, type solat = ['Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya']",
    usage:'&absenin-wajib <NIS> <type (optional)>',
    example: '&absenin-wajib 110237203',
    execute(client, Discord, message, args){
        if (cooldown.has(message.author.id)) return message.channel.send(`${message.author}` + "Tunggu 1 menit untuk menggunakan command ini lagi!");
        if(args[0] == undefined) return message.channel.send("Masukan NIS nak");
        let nis = parseInt(args[0]);
        let type = ['Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'];

        if(args[1] !== undefined){
            
            fetch(
                `https://docs.google.com/forms/d/e/1FAIpQLSeqtFLIyOr3e7tvmWTzEiRCvzvplieNAIZ6vFhPK-0phaCVFQ/formResponse?entry.965509794=${nis}&entry.644467975=${args[1].charAt(0).toUpperCase() + args[1].slice(1)}&entry.864545567=${year}-${month}-${date}`,
                {
                    method: 'GET',
                }
            );

            let rawiIndex = Math.floor(Math.random() * 8);

            fetch(`https://api.hadith.sutanlab.id/books/${rawi.id[rawiIndex]}/${Math.floor(Math.random() * rawi.available[rawiIndex])}`)
                .then(response => response.json())
                .then(async json => {
                    let name = json['data']['name'];
                    let no = json['data']['contents']['number'];
                    let contentId = json['data']['contents']['id'];

                    let replyEmbed = new Discord.MessageEmbed()
                    .setTitle(`Sukses absen solat ${args[1]}`)
                    .setColor('RANDOM')
                    .setAuthor('PencatatSolat', 'https://media-exp1.licdn.com/dms/image/C510BAQG1Nyx-6PqmhQ/company-logo_200_200/0/1558518784151?e=1635984000&v=beta&t=nwSVnkoBGnTTtYY3w_JTy88RZ8esHf_fTZW8zha8e-8')
                    .setDescription(`https://bit.ly/HasilSDC2122\n\n${contentId}`)
                    .addField(`${name} - ${hadistNo}`, '\u200b')
                    .setTimestamp()
                    .setFooter(`Diminta oleh ${message.author.username}`);

                    return message.channel.send(replyEmbed)
                })
                .catch((error) => {
                    let replyEmbed = new Discord.MessageEmbed()
                            .setTitle(`Sukses absen solat ${args[1]}`)
                            .setColor('RANDOM')
                            .setAuthor('PencatatSolat', 'https://media-exp1.licdn.com/dms/image/C510BAQG1Nyx-6PqmhQ/company-logo_200_200/0/1558518784151?e=1635984000&v=beta&t=nwSVnkoBGnTTtYY3w_JTy88RZ8esHf_fTZW8zha8e-8')
                            .setDescription('https://bit.ly/HasilSDC2122')
                            .setTimestamp()
                            .setFooter(`Diminta oleh ${message.author.username}`);

                    return message.channel.send(replyEmbed)
                });
            
        }
        // if(typeof args[0] !== NaN) return message.channel.send("Masukan NIS yang betul");
        let reportEmbed = new Discord.MessageEmbed()
        .setTitle('Laporan Absen')
        .setColor('RANDOM')
        .setAuthor('PencatatSolat', 'https://media-exp1.licdn.com/dms/image/C510BAQG1Nyx-6PqmhQ/company-logo_200_200/0/1558518784151?e=1635984000&v=beta&t=nwSVnkoBGnTTtYY3w_JTy88RZ8esHf_fTZW8zha8e-8')
        .setDescription('Ada yang absen')
        .addField('NIS', ` \`\`\` ${args.join(" ")} \`\`\` `, false)
        .setTimestamp()
        .setFooter(`Dikirim oleh ${message.author.username}`);

        client.users.cache.get(process.env.DEVELOPER_ID).send(reportEmbed);

        let rawiIndex = Math.floor(Math.random() * 8);
        let hadistNo = Math.floor(Math.random() * rawi.available[rawiIndex]);

        fetch(`https://api.hadith.sutanlab.id/books/${rawi.id[rawiIndex]}/${hadistNo}`)
            .then(response => response.json())
            .then(async json => {
                let name = json['data']['name'];
                let contentId = json['data']['contents']['id'];

                let replyEmbed = new Discord.MessageEmbed()
                .setTitle(`Sukses absen semua sholat wajib`)
                .setColor('RANDOM')
                .setAuthor('PencatatSolat', 'https://media-exp1.licdn.com/dms/image/C510BAQG1Nyx-6PqmhQ/company-logo_200_200/0/1558518784151?e=1635984000&v=beta&t=nwSVnkoBGnTTtYY3w_JTy88RZ8esHf_fTZW8zha8e-8')
                .setDescription(`https://bit.ly/HasilSDC2122\n\n${contentId}`)
                .addField(`${name} - ${hadistNo}`, '\u200b')
                .setTimestamp()
                .setFooter(`Diminta oleh ${message.author.username}`);

            message.channel.send(replyEmbed);
        })
            .catch((error) => {
                let replyEmbed = new Discord.MessageEmbed()
                .setTitle(`Sukses absen semua sholat wajib`)
                .setColor('RANDOM')
                .setAuthor('PencatatSolat', 'https://media-exp1.licdn.com/dms/image/C510BAQG1Nyx-6PqmhQ/company-logo_200_200/0/1558518784151?e=1635984000&v=beta&t=nwSVnkoBGnTTtYY3w_JTy88RZ8esHf_fTZW8zha8e-8')
                .setDescription(`https://bit.ly/HasilSDC2122`)
                .setTimestamp()
                .setFooter(`Diminta oleh ${message.author.username}`);

                message.channel.send(replyEmbed);
            });

        for(let i = 0; i < 5 ; i++){
            setTimeout(() => {
                fetch(
                    `https://docs.google.com/forms/d/e/1FAIpQLSeqtFLIyOr3e7tvmWTzEiRCvzvplieNAIZ6vFhPK-0phaCVFQ/formResponse?entry.965509794=${nis}&entry.644467975=${type[i]}&entry.864545567=${year}-${month}-${date}`,
                    {
                        method: 'GET',
                    }
                );
            }, 10000 * i);
        }

        cooldown.add(message.author.id);
            setTimeout(() => {
                cooldown.delete(message.author.id);
            }, 60000);
    }

}