const fetch = require("node-fetch");
const rawi = {
    id: ["abu-daud", "ahmad", "bukhari", "darimi", "ibnu-majah", "malik", "muslim", "nasai", "tirmidzi"],
    available: [3000, 20, 2000, 1000, 2000, 500, 1500, 4000, 3625]
}

module.exports = {
    name: 'random-hadist',
    description: 'Send random hadist',
    usage:'&random-hadist <Rawi (optional)>',
    example: '&random-hadist bukhari',
    execute(Discord, message, args){
        function getHadist(rawiIndex) {
            fetch(`https://api.hadith.sutanlab.id/books/${rawi.id[rawiIndex]}/${Math.floor(Math.random() * rawi.available[rawiIndex])}`)
            .then(response => response.json())
            .then(async json => {
                let name = json['data']['name'];
                let no = json['data']['contents']['number'];
                let contentId = json['data']['contents']['id'];
        
                let replyEmbed = new Discord.MessageEmbed()
                .setTitle(`${name} - ${no}`)
                .setColor('RANDOM')
                .setAuthor('PencatatSolat', 'https://media-exp1.licdn.com/dms/image/C510BAQG1Nyx-6PqmhQ/company-logo_200_200/0/1558518784151?e=1635984000&v=beta&t=nwSVnkoBGnTTtYY3w_JTy88RZ8esHf_fTZW8zha8e-8')
                .setDescription(`${contentId}`)
                .setTimestamp()
                .setFooter(`Diminta oleh ${message.author.username}`);
        
                return message.channel.send(replyEmbed)
            })
            .catch((error) => {
                fetch(`https://api.hadith.sutanlab.id/books/${rawi.id[rawiIndex]}/${1 + Math.floor(Math.random() * (5 - 1 + 1))}`)
                .then(response => response.json())
                .then(async json => {
                    let name = json['data']['name'];
                    let no = json['data']['contents']['number'];
                    let contentId = json['data']['contents']['id'];
                    console.log(name, no, contentId);
            
                    let replyEmbed = new Discord.MessageEmbed()
                    .setTitle(`${name} - ${no}`)
                    .setColor('RANDOM')
                    .setAuthor('PencatatSolat', 'https://media-exp1.licdn.com/dms/image/C510BAQG1Nyx-6PqmhQ/company-logo_200_200/0/1558518784151?e=1635984000&v=beta&t=nwSVnkoBGnTTtYY3w_JTy88RZ8esHf_fTZW8zha8e-8')
                    .setDescription(`${contentId}`)
                    .setTimestamp()
                    .setFooter(`Diminta oleh ${message.author.username}`);
            
                    return message.channel.send(replyEmbed)
                });

                return
            });
        
            return;
        }

        if (args[0] != undefined) {
            args[0] = args[0].toLowerCase();
            if (!rawi.id.includes(args[0])) {
                let replyEmbed = new Discord.MessageEmbed()
                    .setTitle(`Rawi yang diberikan, tidak tersedia`)
                    .setColor('RANDOM')
                    .setAuthor('PencatatSolat', 'https://media-exp1.licdn.com/dms/image/C510BAQG1Nyx-6PqmhQ/company-logo_200_200/0/1558518784151?e=1635984000&v=beta&t=nwSVnkoBGnTTtYY3w_JTy88RZ8esHf_fTZW8zha8e-8')
                    .setDescription('Berikut merupakan daftar rawi yang tersedia: ')
                    .addField(`${rawi.id.join(", ")}`, '\u200b')
                    .setTimestamp()
                    .setFooter(`Diminta oleh ${message.author.username}`);
    
                    return message.channel.send(replyEmbed)
            }

            let rawiIndex = rawi.id.indexOf(args[0]);

            return getHadist(rawiIndex);
        }

        let rawiIndex = Math.floor(Math.random() * 8);
        return getHadist(rawiIndex);
    }

}