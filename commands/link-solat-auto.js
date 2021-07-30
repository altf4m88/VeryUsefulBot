const today = new Date;
let year = today.getFullYear();
let month = ("0" + (today.getMonth() + 1)).slice(-2);
let date = ("0" + today.getDate()).slice(-2);

module.exports = {
    name: 'link-solat-auto',
    description: 'Generate link solat auto dan mengirimkannya ke inbox anda',
    usage:'|link-solat-auto <NIS>',
    example: '|link-solat-auto 110237203',
    execute(Discord, message, args){
        if(args[0] == undefined) return message.channel.send("Masukan NIS");
        // if(typeof args[0] !== NaN) return message.channel.send("Masukan NIS yang betul");

        let nis = parseInt(args[0]);
        let type = ['Subuh', 'Dhuha', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya', 'Tahajud'];

        const embed = new Discord.MessageEmbed()
        .setTitle(`Link absen solat auto`)
        .setAuthor('PencatatSolat', 'https://i.kym-cdn.com/photos/images/original/001/464/390/36d.jpg')
        .setDescription(`Link anda:`)
        .setColor('RANDOM')

        type.forEach((item) => {
            embed.addField(`${item}`, `https://docs.google.com/forms/d/e/1FAIpQLSeqtFLIyOr3e7tvmWTzEiRCvzvplieNAIZ6vFhPK-0phaCVFQ/formResponse?entry.965509794=${nis}&entry.644467975=${item}&entry.864545567=${year}-${month}-${date}`, false);
        })
        embed.setFooter('aquila non captat muscas');

        let replyEmbed = new Discord.MessageEmbed()
        .setTitle('Success!')
        .setColor('RANDOM')
        .setAuthor('PencatatSolat', 'https://i.kym-cdn.com/photos/images/original/001/464/390/36d.jpg')
        .setDescription('Cek DM mu')
        .setTimestamp()
        .setFooter(`Diminta oleh ${message.author.username}`);

        message.author.send(embed);
        return message.channel.send(replyEmbed);
    }

}