module.exports = {
    name: 'bug-report',
    description: 'mengirimkan laporan bug ke developer bot',
    usage:'&bug-report <bug-to-report>',
    example: '&bug-report bot lu jelek bang',
    execute(client, Discord, message, args){
        if(args.join(" ") == '') return message.channel.send("Lapor apaan?");

        let reportEmbed = new Discord.MessageEmbed()
        .setTitle('Bug Report')
        .setColor('RANDOM')
        .setAuthor('PencatatSolat', 'https://media-exp1.licdn.com/dms/image/C510BAQG1Nyx-6PqmhQ/company-logo_200_200/0/1558518784151?e=1635984000&v=beta&t=nwSVnkoBGnTTtYY3w_JTy88RZ8esHf_fTZW8zha8e-8')
        .setDescription('Sir! New bug report!')
        .addField('Problem', ` \`\`\` ${args.join(" ")} \`\`\` `, false)
        .setTimestamp()
        .setFooter(`Dikirim oleh ${message.author.username}`);


        let replyEmbed = new Discord.MessageEmbed()
        .setTitle('Bug Report')
        .setColor('RANDOM')
        .setAuthor('PencatatSolat', 'https://media-exp1.licdn.com/dms/image/C510BAQG1Nyx-6PqmhQ/company-logo_200_200/0/1558518784151?e=1635984000&v=beta&t=nwSVnkoBGnTTtYY3w_JTy88RZ8esHf_fTZW8zha8e-8')
        .setDescription('Laporan anda sudah terkirim!')
        .addField('Bug: ', ` \`\`\` ${args.join(" ")} \`\`\` `, false)
        .setTimestamp()
        .setFooter('Mohon maaf gan');

        client.users.cache.get(process.env.DEVELOPER_ID).send(reportEmbed);
        message.channel.send(replyEmbed);
    }
}