const today = new Date;
const fetch = require("node-fetch");
let year = today.getFullYear();
let month = ("0" + (today.getMonth() + 1)).slice(-2);
let date = ("0" + today.getDate()).slice(-2);

module.exports = {
    name: 'absenin-tahajud',
    description: 'Auto absen solat tahajud',
    usage:'&absenin-tahajud <NIS>',
    example: '&absenin-tahajud 110237203',
    execute(Discord, message, args){
        if(args[0] == undefined) return message.channel.send("Masukan NIS");
        // if(typeof args[0] !== NaN) return message.channel.send("Masukan NIS yang betul");

        let nis = parseInt(args[0]);
        let type = 'tahajud';

        fetch(
            `https://docs.google.com/forms/d/e/1FAIpQLSeqtFLIyOr3e7tvmWTzEiRCvzvplieNAIZ6vFhPK-0phaCVFQ/formResponse?entry.965509794=${nis}&entry.644467975=${type}&entry.864545567=${year}-${month}-${date}`,
            {
                method: 'GET',
            }
        );

        let replyEmbed = new Discord.MessageEmbed()
        .setTitle('Sukses absen tahajud')
        .setColor('RANDOM')
        .setAuthor('PencatatSolat', 'https://media-exp1.licdn.com/dms/image/C510BAQG1Nyx-6PqmhQ/company-logo_200_200/0/1558518784151?e=1635984000&v=beta&t=nwSVnkoBGnTTtYY3w_JTy88RZ8esHf_fTZW8zha8e-8')
        .setDescription('https://bit.ly/HasilSDC2122')
        .setTimestamp()
        .setFooter(`Diminta oleh ${message.author.username}`);
        
        return message.channel.send(replyEmbed);
    }

}