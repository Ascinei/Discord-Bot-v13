// module.exports = {
//     name: "chessgame",
//     aliases: ["Chessgame", "ChessGame"],
//     cooldown: 0,
//     description: "Game of chess",
//     async execute(message, args, cmd, client,Discord){

//         // Assigns values to pieces for organization
//         const ES = 0;
//         const bp = 1;
//         const bb = 2;
//         const bk = 3;
//         const br = 4;
//         const bq = 5;
//         const be = 6;
//         const wp = 7;
//         const wb = 8;
//         const wk = 9;
//         const wr = 10;
//         const wq = 11;
//         const we = 12;
//         // Creates a chess board with pieces of certain value

//         let boardPieces = [ 
//             ["*8* ", br, bk, bb, bq, be, bb, bk, br],
//             ["*7* ", bp, bp, bp, bp, bp, bp, bp, bp],
//             ["*6* ", ES, ES, ES, ES, ES, ES, ES, ES],
//             ["*5* ", ES, ES, ES, bp, ES, ES, ES, ES],
//             ["*4* ", ES, ES, ES, ES, ES, ES, ES, ES],
//             ["*3* ", ES, ES, ES, ES, ES, ES, ES, ES],
//             ["*2*", wp, wp, wp, wp, wp, wp, wp, wp],
//             ["*1* ", wr, wk, wb, wq, we, wb, wk, wr],
//             [" _ ", "A -", "B -", "C -", "D -", "E -", "F -", "G -", "H"]
//         ]
//         let x = 2
//         let y = 1
//         console.log(movePossible(boardPieces[x][y]))

//         const emojis = ['₪-',
//         '<:BPawn:899813641992417300>', '<:BBishop:899792467384233984>', '<:BKnight:899792452595093554>',
//         '<:BRook:899792425436999702>', '<:BQueen:899792432785403935>', '<:BKing:899792460610428928>',
//         '<:WPawn:899813653673574430>', '<:WBishop:899792418856132608>', '<:WKnight:899792398643785789>',
//         '<:WRook:899792373662511104>', '<:WQueen:899792384198574110>', '<:WKing:899792409326673981>']
//         // Creates a visual board
//         let visualBoard = '';
//         let rowOfPieces = [];
//         boardPieces.forEach(rowOfPieces => {
//             rowOfPieces.forEach(val => {
//                 if(typeof(val) === 'string')    {
//                     visualBoard = visualBoard + val;
//                 } else visualBoard = visualBoard + emojis[val];
//             })
//             visualBoard = visualBoard + '\n'
//         })
        
//         const embedPage = new Discord.MessageEmbed()
//         .setColor('#00FF00')
//         .setTitle('Chess')
//         .addField('White\'s turn', visualBoard, true);
//         console.log(visualBoard)
//         message.channel.send({embeds: [embedPage]})

//         // Determines if a move is possible
//         function movePossible(piece){
//             // Splits pieces into what piece they are and the direction they are moving
//             let pieceType, direction;
//             const position = [x, y]
//             if(piece === bp || wp) { // Pawn
//                 pieceType = "pawn"
//                 if(piece < wp) direction = 1;
//                 else direction = -1;
//             }
//             if(piece === bb || wb) { // Bishop
//                 pieceType = "bishop"
//                 if(piece < wp) direction = 1;
//                 else direction = -1;
//             }
//             if(piece === bk || wk) { // Knight
//                 pieceType = "knight"
//                 if(piece < wp) direction = 1;
//                 else direction = -1;
//             }
//             if(piece === br || wr) { // Rook
//                 pieceType = "rook"
//                 if(piece < wp) direction = 1;
//                 else direction = -1;
//             }
//             if(piece === bq || wq) { // Queen
//                 pieceType = "queen"
//                 if(piece < wp) direction = 1;
//                 else direction = -1;
//             }
//             if(piece === be || we) { // King
//                 pieceType = "king"
//                 if(piece < wp) direction = 1;
//                 else direction = -1;
//             }
//         }
        
//         // Conditions to use correct emoji


//         function pawnMoves()    {
            
//         }
//     }
// }