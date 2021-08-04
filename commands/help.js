module.exports = {
    name: 'help',
    description: 'display command list / command info',
    usage:'&help <command-name>',
    example: '&help absenin-wajib',
    execute(Discord, message, args){
        const embed = new Discord.MessageEmbed()

        if(args[0] == undefined){
            embed.setColor('RANDOM')
	        .setTitle(':book: PencatatSolat')
	        .setAuthor('PencatatSolat', 'https://media-exp1.licdn.com/dms/image/C510BAQG1Nyx-6PqmhQ/company-logo_200_200/0/1558518784151?e=1635984000&v=beta&t=nwSVnkoBGnTTtYY3w_JTy88RZ8esHf_fTZW8zha8e-8')
	        .setDescription('prefixnya `&`, ketik &help <command-name> untuk informasi lebih lanjut setiap command')
	        .setThumbnail('https://media-exp1.licdn.com/dms/image/C510BAQG1Nyx-6PqmhQ/company-logo_200_200/0/1558518784151?e=1635984000&v=beta&t=nwSVnkoBGnTTtYY3w_JTy88RZ8esHf_fTZW8zha8e-8')
            .addField('AUTO ABSEN', '`absenin-wajib`, `absenin-dhuha`, `absenin-tahajud`', false)
            .addField('LINK ABSEN', '`link-solat`, `link-solat-auto`', false)
            .addField('MISC', '`help`, `introduce`', false)
            .addField('UTILITY', '`absensi-notifier`, `random-hadist`, `ping`, `bug-report`', false)
            .addField('GitHub', 'Plz star my dev repo https://github.com/altf4m88/VeryUsefulBot', false)
            .setTimestamp()
            .setFooter('Semoga Berkah');

            return message.channel.send(embed);
        }else if(args.length > 0){
            let commandName = args[0];
            try {
                const command = require(`./${commandName}.js`);
                embed.setColor('RANDOM')
                .setTitle(':book: PencatatSolat &help')
                .setAuthor('PencatatSolat', 'https://media-exp1.licdn.com/dms/image/C510BAQG1Nyx-6PqmhQ/company-logo_200_200/0/1558518784151?e=1635984000&v=beta&t=nwSVnkoBGnTTtYY3w_JTy88RZ8esHf_fTZW8zha8e-8')
                .setDescription(`${command.description}`)
                .addField('Usage', `\`${command.usage}\``, true)
                .addField('Example', `\`${command.example}\``, true)
                .setFooter('Semoga Berkah');

                return message.channel.send(embed);
            } catch(err){
                return message.channel.send("Gaada bang")
            }
        } else{
            return message.channel.send("Gaada bang")
        }
    }
}