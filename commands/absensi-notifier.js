const cron = require('cron').CronJob;

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