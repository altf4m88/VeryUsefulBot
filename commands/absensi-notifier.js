const cron = require('cron').CronJob;
const fetch = require("node-fetch");
const rawi = {
    id: ["abu-daud", "ahmad", "bukhari", "darimi", "ibnu-majah", "malik", "muslim", "nasai", "tirmidzi"],
    // name: [
    //     "HR. Abu Daud", "HR. Ahmad", "HR. Bukhari", "HR. Darimi", "HR. Ibnu Majah", "HR. Malik", "HR. Muslim", "HR. Nasai", "HR. Tirmidzi",
    // ],
    available: [4419, 4305, 6638, 2949, 4285, 1587, 4930, 5364, 3625]
}

module.exports = {
    name: 'absensi-notifier',
    description: "Notifikasi absen sholat. Sementara belum ada fitur disable",
    usage:'&absensi-notifier <enable> <time (optional)>',
    example: '&absensi-notifier enable 20.30',
    execute(Discord, message, args){
        // if(message.guild.id != process.env.GUILD_ID) return message.channel.send("Fitur ini hanya bisa dilakukan di server RPLMepo Fan Club");

        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Fitur ini hanya bisa dilakukan oleh Administrator");
        if(args[0] == undefined || args[0] != 'enable') return message.channel.send("Masukan kondisi nak");
        
        if(args[1] !== undefined){
            if (isNaN(args[1]) || args[1].length > 5 || args[1].length < 5) {
                let replyEmbed = new Discord.MessageEmbed()
                .setTitle(`Gagal menyalakan Notifikasi Absen`)
                .setColor('RANDOM')
                .setAuthor('PencatatSolat', 'https://media-exp1.licdn.com/dms/image/C510BAQG1Nyx-6PqmhQ/company-logo_200_200/0/1558518784151?e=1635984000&v=beta&t=nwSVnkoBGnTTtYY3w_JTy88RZ8esHf_fTZW8zha8e-8')
                .setDescription('Format waktu yang diberikan salah')
                .addField(`Contoh format waktu yang benar: \`&absensi-notifier enable 23.59\``, '\u200b')
                .setTimestamp()
                .setFooter(`Diminta oleh ${message.author.username}`);

                return message.channel.send(replyEmbed);
            }

            let hour = args[1].slice(0, 2);
            let minute = args[1].slice(3, 5);

            if (
                hour >= 24 || minute >= 60 
            ) {
                let replyEmbed = new Discord.MessageEmbed()
                .setTitle(`Gagal menyalakan Notifikasi Absen`)
                .setColor('RANDOM')
                .setAuthor('PencatatSolat', 'https://media-exp1.licdn.com/dms/image/C510BAQG1Nyx-6PqmhQ/company-logo_200_200/0/1558518784151?e=1635984000&v=beta&t=nwSVnkoBGnTTtYY3w_JTy88RZ8esHf_fTZW8zha8e-8')
                .setDescription('Format waktu yang diberikan salah')
                .addField(`Contoh format waktu yang benar: \`&absensi-notifier enable 23.59\``, '\u200b')
                .setTimestamp()
                .setFooter(`Diminta oleh ${message.author.username}`);

                return message.channel.send(replyEmbed)
            }

            let notifierMessage = new cron(`00 ${minute} ${hour} * * *`, () => {
                message.channel.send(`<@&${process.env.ROLE_ID}>` + 'Jangan lupa absensi sholat hari ini!');
                
            }, null, true, 'Asia/Jakarta');

            notifierMessage.start();

            let replyEmbed = new Discord.MessageEmbed()
            .setTitle(`Sukses menyalakan notifikasi absen pada pukul ${hour}.${minute}`)
            .setColor('RANDOM')
            .setAuthor('PencatatSolat', 'https://media-exp1.licdn.com/dms/image/C510BAQG1Nyx-6PqmhQ/company-logo_200_200/0/1558518784151?e=1635984000&v=beta&t=nwSVnkoBGnTTtYY3w_JTy88RZ8esHf_fTZW8zha8e-8')
            .setTimestamp()
            .setFooter(`Diminta oleh ${message.author.username}`);

            return message.channel.send(replyEmbed);
        }

        let notifierMessage = new cron(`00 30 20 * * *`, () => {
            let replyEmbed = new Discord.MessageEmbed()
            .setTitle(`Jangan lupa untuk absensi sholat hari ini!`)
            .setColor('RANDOM')
            .setAuthor('PencatatSolat', 'https://media-exp1.licdn.com/dms/image/C510BAQG1Nyx-6PqmhQ/company-logo_200_200/0/1558518784151?e=1635984000&v=beta&t=nwSVnkoBGnTTtYY3w_JTy88RZ8esHf_fTZW8zha8e-8')
            .setDescription(`<@&${process.env.ROLE_ID}>`)
            .setTimestamp()

            message.channel.send(replyEmbed);
        }, null, true, 'Asia/Jakarta');

        notifierMessage.start();

        let replyEmbed = new Discord.MessageEmbed()
        .setTitle('Sukses menyalakan notifikasi absen pada pukul 20.30')
        .setColor('RANDOM')
        .setAuthor('PencatatSolat', 'https://media-exp1.licdn.com/dms/image/C510BAQG1Nyx-6PqmhQ/company-logo_200_200/0/1558518784151?e=1635984000&v=beta&t=nwSVnkoBGnTTtYY3w_JTy88RZ8esHf_fTZW8zha8e-8')
        .setTimestamp()
        .setFooter(`Diminta oleh ${message.author.username}`);

        message.channel.send(replyEmbed);
    }
}
