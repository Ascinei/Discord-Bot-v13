const fs = require('fs');
const cmdFolder = 'D:/Computer Science/Visual Studio/Discord Bot v13/commands/';

// var files = fs.readdirSync(cmdFolder)
// //files.splice(0, 1)
// //console.log(files)
// //var Names = 
// files.forEach(file => {
// //    console.log(fs.readFileSync(cmdFolder + file).description)
    
// })



module.exports = {
    name: 'help',
    aliases: [],
    cooldown: 0,
    description: 'Displays this embed help menu.',
    async execute(message, args, cmd, client,Discord){
       
        const embedPage = {
            title: "AlexBot Commands",
            color: 7563748,
            fields: [
              {
                name: "`a.help`",
                value: "This command brings up this interface."
              },
              {
                name: "`a.anime`",
                value: "Uses Anilist api to find and gather information about an anime."
              },
            ],
        };

        message.channel.send({ embeds: [embedPage] })

    }
}