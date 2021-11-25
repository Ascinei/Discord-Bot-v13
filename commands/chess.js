// const { MessageActionRow, MessageButton, ButtonInteraction
// } = require("discord.js")

// module.exports = {
//     name: 'chess',
//     aliases: [],
//     cooldown: 10,
//     description: 'Challenge a player to a game of chess',
//     async execute(message, args, cmd, client,Discord){
//         const row = new MessageActionRow().addComponents(
//             new MessageButton()
//                 .setCustomId("black")
//                 .setLabel("Black")
//                 .setStyle("SECONDARY"),
//             new MessageButton()
//                 .setCustomId("white")
//                 .setLabel("White")
//                 .setStyle("SECONDARY"),
//             new MessageButton()
//                 .setCustomId("random")
//                 .setLabel("Random")
//                 .setStyle("SECONDARY")
//             )
//         message.channel.send({ content: 'Testing picking sides', components: [row] })
//         const filter = (interaction) => {
//             if(interaction.user.id === message.author.id) return true;
//             return;
//         }

//         const collector = message.channel.createMessageComponentCollector({
//             filter,
//             max: 1,
//         })

//         collector.on('end', (ButtonInteraction) => {
//             const id = ButtonInteraction.first().customId;
//             let randomSide;
//             if(Math.random() < 0.5) randomSide = "white";
//             else randomSide = "black"

//             if(id === "white") return ButtonInteraction.first().reply("you are white")
//             if(id === "black") return ButtonInteraction.first().reply("you are black")
//             if(id === "random") return ButtonInteraction.first().reply("randomized you to be " + randomSide)
//         })
//     }
// }
