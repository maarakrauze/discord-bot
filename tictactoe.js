require("dotenv").config();
const { Client, Intents, MessageCollector } = require("discord.js");
const client = new Client({

    intents: ['GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILDS', "MESSAGE_CONTENT"]
});
const fs = require('fs');
const { prefix } = require("./config.json");

// initialize the client
client.once("ready", () => {
    console.log(`bot ${client.user.username} is logged in`);
    fs.readFile("activePlayers.json", 'utf8', async function (err, data) {

        if (err) throw err;
        let activePlayers = JSON.parse(data)
        activePlayers.players = [""]

        fs.writeFile("activePlayers.json", JSON.stringify(activePlayers, null, 2), (err) => {
            if (err) throw err;
        })
    })
});

//to run a new game MK$newgame
client.on('messageCreate', (message) => {

    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'newgame') {
        let numArrays = ["1", "2", "3"
        , "4", "5", "6"
        , "7", "8", "9"];
        message.channel.send("Hello and welcome to TicTacToe. To start the game - MK$play [number] ");
        message.channel.send(`Choose the number! \n${numArrays[0]} | ${numArrays[1]} | ${numArrays[2]}\n${numArrays[3]} | ${numArrays[4]} | ${numArrays[5]}\n${numArrays[6]} | ${numArrays[7]} | ${numArrays[8]}`);
    }
});



client.on("messageCreate", async (message) => {
    let numArrays = ["1", "2", "3"
        , "4", "5", "6"
        , "7", "8", "9"];
    let ticTacToe;
    let collector;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    async function checkWin() {

        //top horizontal
        if (numArrays[0] == "X" && numArrays[1] == "X" && numArrays[2] == "X") {
            ticTacToe.edit(`**GAME ENDED | X WON**\n${numArrays[0]} | ${numArrays[1]} | ${numArrays[2]}\n${numArrays[3]} | ${numArrays[4]} | ${numArrays[5]}\n${numArrays[6]} | ${numArrays[7]} | ${numArrays[8]}`)
            collector.stop()
            fs.readFile("activePlayers.json", 'utf8', async function (err, data) {
                if (err) throw err;
                let activePlayers = JSON.parse(data)
                let index = activePlayers.players.indexOf(message.author.id)
                activePlayers.players.splice(index, 1)
                fs.writeFile("activePlayers.json", JSON.stringify(activePlayers, null, 2), (err) => {
                    if (err) throw err;
                })
            })
        } else if (numArrays[0] == "O" && numArrays[1] == "O" && numArrays[2] == "O") {
            ticTacToe.edit(`**GAME ENDED | O WON**\n${numArrays[0]} | ${numArrays[1]} | ${numArrays[2]}\n${numArrays[3]} | ${numArrays[4]} | ${numArrays[5]}\n${numArrays[6]} | ${numArrays[7]} | ${numArrays[8]}`)
            collector.stop()
            fs.readFile("activePlayers.json", 'utf8', async function (err, data) {
                if (err) throw err;
                let activePlayers = JSON.parse(data)
                let index = activePlayers.players.indexOf(message.author.id)
                activePlayers.players.splice(index, 1)
                fs.writeFile("activePlayers.json", JSON.stringify(activePlayers, null, 2), (err) => {
                    if (err) throw err;
                })
            })

        //middle horizontal
        } else if (numArrays[3] == "X" && numArrays[4] == "X" && numArrays[5] == "X") {
            ticTacToe.edit(`**GAME ENDED | X WON**\n${numArrays[0]} | ${numArrays[1]} | ${numArrays[2]}\n${numArrays[3]} | ${numArrays[4]} | ${numArrays[5]}\n${numArrays[6]} | ${numArrays[7]} | ${numArrays[8]}`)
            collector.stop()
            fs.readFile("activePlayers.json", 'utf8', async function (err, data) {
                if (err) throw err;
                let activePlayers = JSON.parse(data)
                let index = activePlayers.players.indexOf(message.author.id)
                activePlayers.players.splice(index, 1)
                fs.writeFile("activePlayers.json", JSON.stringify(activePlayers, null, 2), (err) => {
                    if (err) throw err;
                })
            })
        } else if (numArrays[3] == "O" && numArrays[4] == "O" && numArrays[5] == "O") {
            ticTacToe.edit(`**GAME ENDED | O WON**\n${numArrays[0]} | ${numArrays[1]} | ${numArrays[2]}\n${numArrays[3]} | ${numArrays[4]} | ${numArrays[5]}\n${numArrays[6]} | ${numArrays[7]} | ${numArrays[8]}`)
            collector.stop()
            fs.readFile("activePlayers.json", 'utf8', async function (err, data) {
                if (err) throw err;
                let activePlayers = JSON.parse(data)
                let index = activePlayers.players.indexOf(message.author.id)
                activePlayers.players.splice(index, 1)
                fs.writeFile("activePlayers.json", JSON.stringify(activePlayers, null, 2), (err) => {
                    if (err) throw err;
                })
            })
        //bottom horizontal
        } else if (numArrays[6] == "X" && numArrays[7] == "X" && numArrays[8] == "X") {
            ticTacToe.edit(`**GAME ENDED | X WON**\n${numArrays[0]} | ${numArrays[1]} | ${numArrays[2]}\n${numArrays[3]} | ${numArrays[4]} | ${numArrays[5]}\n${numArrays[6]} | ${numArrays[7]} | ${numArrays[8]}`)
            collector.stop()
            fs.readFile("activePlayers.json", 'utf8', async function (err, data) {
                if (err) throw err;
                let activePlayers = JSON.parse(data)
                let index = activePlayers.players.indexOf(message.author.id)
                activePlayers.players.splice(index, 1)
                fs.writeFile("activePlayers.json", JSON.stringify(activePlayers, null, 2), (err) => {
                    if (err) throw err;
                })
            })
        //Right diagonal
        } else if (numArrays[6] == "O" && numArrays[7] == "O" && numArrays[8] == "O") {
            ticTacToe.edit(`**GAME ENDED | O WON**\n${numArrays[0]} | ${numArrays[1]} | ${numArrays[2]}\n${numArrays[3]} | ${numArrays[4]} | ${numArrays[5]}\n${numArrays[6]} | ${numArrays[7]} | ${numArrays[8]}`)
            collector.stop()
            fs.readFile("activePlayers.json", 'utf8', async function (err, data) {
                if (err) throw err;
                let activePlayers = JSON.parse(data)
                let index = activePlayers.players.indexOf(message.author.id)
                activePlayers.players.splice(index, 1)
                fs.writeFile("activePlayers.json", JSON.stringify(activePlayers, null, 2), (err) => {
                    if (err) throw err;
                })
            })
        }
        else if (numArrays[0] == "X" && numArrays[4] == "X" & numArrays[8] == "X") {
            ticTacToe.edit(`**GAME ENDED | X WON**\n${numArrays[0]} | ${numArrays[1]} | ${numArrays[2]}\n${numArrays[3]} | ${numArrays[4]} | ${numArrays[5]}\n${numArrays[6]} | ${numArrays[7]} | ${numArrays[8]}`)
            collector.stop()
            fs.readFile("activePlayers.json", 'utf8', async function (err, data) {
                if (err) throw err;
                let activePlayers = JSON.parse(data)
                let index = activePlayers.players.indexOf(message.author.id)
                activePlayers.players.splice(index, 1)
                fs.writeFile("activePlayers.json", JSON.stringify(activePlayers, null, 2), (err) => {
                    if (err) throw err;
                })
            })
        } else if (numArrays[0] == "O" && numArrays[4] == "O" & numArrays[8] == "O") {
            ticTacToe.edit(`**GAME ENDED | O WON**\n${numArrays[0]} | ${numArrays[1]} | ${numArrays[2]}\n${numArrays[3]} | ${numArrays[4]} | ${numArrays[5]}\n${numArrays[6]} | ${numArrays[7]} | ${numArrays[8]}`)
            collector.stop()
            fs.readFile("activePlayers.json", 'utf8', async function (err, data) {
                if (err) throw err;
                let activePlayers = JSON.parse(data)
                let index = activePlayers.players.indexOf(message.author.id)
                activePlayers.players.splice(index, 1)
                fs.writeFile("activePlayers.json", JSON.stringify(activePlayers, null, 2), (err) => {
                    if (err) throw err;
                })
            })
        //left diagonal
        } else if (numArrays[2] == "X" && numArrays[4] == "X" & numArrays[6] == "X") {
            ticTacToe.edit(`**GAME ENDED | X WON**\n${numArrays[0]} | ${numArrays[1]} | ${numArrays[2]}\n${numArrays[3]} | ${numArrays[4]} | ${numArrays[5]}\n${numArrays[6]} | ${numArrays[7]} | ${numArrays[8]}`)
            collector.stop()
            fs.readFile("activePlayers.json", 'utf8', async function (err, data) {
                if (err) throw err;
                let activePlayers = JSON.parse(data)
                let index = activePlayers.players.indexOf(message.author.id)
                activePlayers.players.splice(index, 1)
                fs.writeFile("activePlayers.json", JSON.stringify(activePlayers, null, 2), (err) => {
                    if (err) throw err;
                })
            })
        } else if (numArrays[2] == "O" && numArrays[4] == "O" & numArrays[6] == "O") {
            ticTacToe.edit(`**GAME ENDED | O WON**\n${numArrays[0]} | ${numArrays[1]} | ${numArrays[2]}\n${numArrays[3]} | ${numArrays[4]} | ${numArrays[5]}\n${numArrays[6]} | ${numArrays[7]} | ${numArrays[8]}`)
            collector.stop()
            fs.readFile("activePlayers.json", 'utf8', async function (err, data) {
                if (err) throw err;
                let activePlayers = JSON.parse(data)
                let index = activePlayers.players.indexOf(message.author.id)
                activePlayers.players.splice(index, 1)
                fs.writeFile("activePlayers.json", JSON.stringify(activePlayers, null, 2), (err) => {
                    if (err) throw err;
                })
            })
        //left vertical
        } else if (numArrays[0] == "X" && numArrays[3] == "X" & numArrays[6] == "X") {
            ticTacToe.edit(`**GAME ENDED | X WON**\n${numArrays[0]} | ${numArrays[1]} | ${numArrays[2]}\n${numArrays[3]} | ${numArrays[4]} | ${numArrays[5]}\n${numArrays[6]} | ${numArrays[7]} | ${numArrays[8]}`)
            collector.stop()
            fs.readFile("activePlayers.json", 'utf8', async function (err, data) {
                if (err) throw err;
                let activePlayers = JSON.parse(data)
                let index = activePlayers.players.indexOf(message.author.id)
                activePlayers.players.splice(index, 1)
                fs.writeFile("activePlayers.json", JSON.stringify(activePlayers, null, 2), (err) => {
                    if (err) throw err;
                })
            })
        } else if (numArrays[0] == "O" && numArrays[3] == "O" & numArrays[6] == "O") {
            ticTacToe.edit(`**GAME ENDED | O WON**\n${numArrays[0]} | ${numArrays[1]} | ${numArrays[2]}\n${numArrays[3]} | ${numArrays[4]} | ${numArrays[5]}\n${numArrays[6]} | ${numArrays[7]} | ${numArrays[8]}`)
            collector.stop()
            fs.readFile("activePlayers.json", 'utf8', async function (err, data) {
                if (err) throw err;
                let activePlayers = JSON.parse(data)
                let index = activePlayers.players.indexOf(message.author.id)
                activePlayers.players.splice(index, 1)
                fs.writeFile("activePlayers.json", JSON.stringify(activePlayers, null, 2), (err) => {
                    if (err) throw err;
                })
            })
        //middle vertical
        } else if (numArrays[1] == "X" && numArrays[4] == "X" & numArrays[7] == "X") {
            ticTacToe.edit(`**GAME ENDED | X WON**\n${numArrays[0]} | ${numArrays[1]} | ${numArrays[2]}\n${numArrays[3]} | ${numArrays[4]} | ${numArrays[5]}\n${numArrays[6]} | ${numArrays[7]} | ${numArrays[8]}`)
            collector.stop()
            fs.readFile("activePlayers.json", 'utf8', async function (err, data) {
                if (err) throw err;
                let activePlayers = JSON.parse(data)
                let index = activePlayers.players.indexOf(message.author.id)
                activePlayers.players.splice(index, 1)
                fs.writeFile("activePlayers.json", JSON.stringify(activePlayers, null, 2), (err) => {
                    if (err) throw err;
                })
            })
        } else if (numArrays[1] == "O" && numArrays[4] == "O" & numArrays[7] == "O") {
            ticTacToe.edit(`**GAME ENDED | O WON**\n${numArrays[0]} | ${numArrays[1]} | ${numArrays[2]}\n${numArrays[3]} | ${numArrays[4]} | ${numArrays[5]}\n${numArrays[6]} | ${numArrays[7]} | ${numArrays[8]}`)
            collector.stop()
            fs.readFile("activePlayers.json", 'utf8', async function (err, data) {
                if (err) throw err;
                let activePlayers = JSON.parse(data)
                let index = activePlayers.players.indexOf(message.author.id)
                activePlayers.players.splice(index, 1)
                fs.writeFile("activePlayers.json", JSON.stringify(activePlayers, null, 2), (err) => {
                    if (err) throw err;
                })
            })
        //right vertical
        } else if (numArrays[2] == "X" && numArrays[5] == "X" & numArrays[8] == "X") {
            ticTacToe.edit(`**GAME ENDED | X WON**\n${numArrays[0]} | ${numArrays[1]} | ${numArrays[2]}\n${numArrays[3]} | ${numArrays[4]} | ${numArrays[5]}\n${numArrays[6]} | ${numArrays[7]} | ${numArrays[8]}`)
            collector.stop()
            fs.readFile("activePlayers.json", 'utf8', async function (err, data) {
                if (err) throw err;
                let activePlayers = JSON.parse(data)
                let index = activePlayers.players.indexOf(message.author.id)
                activePlayers.players.splice(index, 1)
                fs.writeFile("activePlayers.json", JSON.stringify(activePlayers, null, 2), (err) => {
                    if (err) throw err;
                })
            })
        } else if (numArrays[2] == "O" && numArrays[5] == "O" & numArrays[8] == "O") {
            ticTacToe.edit(`**GAME ENDED | O WON**\n${numArrays[0]} | ${numArrays[1]} | ${numArrays[2]}\n${numArrays[3]} | ${numArrays[4]} | ${numArrays[5]}\n${numArrays[6]} | ${numArrays[7]} | ${numArrays[8]}`)
            collector.stop()
            fs.readFile("activePlayers.json", 'utf8', async function (err, data) {
                if (err) throw err;
                let activePlayers = JSON.parse(data)
                let index = activePlayers.players.indexOf(message.author.id)
                activePlayers.players.splice(index, 1)
                fs.writeFile("activePlayers.json", JSON.stringify(activePlayers, null, 2), (err) => {
                    if (err) throw err;
                })
            })
        }
    };

    function findPosition(num) {
        numArrays[parseInt(num - 1)] = "X"
        ticTacToe.edit(`${numArrays[0]} | ${numArrays[1]} | ${numArrays[2]}\n${numArrays[3]} | ${numArrays[4]} | ${numArrays[5]}\n${numArrays[6]} | ${numArrays[7]} | ${numArrays[8]}`)
    }

    function cellOccupied(cell) {
        return cell === "X" || cell === "O";
    }

    function AIrespond() {
        let ai_pos = 0;
        do {
            ai_pos = Math.floor((Math.random() * 8));
        } while(cellOccupied(numArrays[ai_pos]));
         numArrays[ai_pos] = "O";
         console.log(ai_pos)
        ticTacToe.edit(`${numArrays[0]} | ${numArrays[1]} | ${numArrays[2]}\n${numArrays[3]} | ${numArrays[4]} | ${numArrays[5]}\n${numArrays[6]} | ${numArrays[7]} | ${numArrays[8]}`)
    }

    // waiting for a 'play' message from any channel
    if (message.content.includes(`${prefix}play`)) {
        if (message.author.bot) return
        // console.log("ok");
        fs.readFile("activePlayers.json", 'utf8', async function (err, data) {
            if (err) throw err;
            let activePlayers = JSON.parse(data)
            console.log(activePlayers.players);
            console.log(!activePlayers.players.includes(message.author.id));
            if (!activePlayers.players.includes(message.author.id)) {
                activePlayers.players.push(message.author.id)
                fs.writeFile("activePlayers.json", JSON.stringify(activePlayers, null, 2), (err) => {
                    if (err) throw err;
                })
                let num = message.content.replace(`${prefix}play`, "")
                if (!num)
                    return message.channel.send("Please include a number to play!  MK$play [number]");
                if (isNaN(num))
                    return message.channel.send("The position has to be a number!");
                ticTacToe = await message.channel.send(`${numArrays[0]} | ${numArrays[1]} | ${numArrays[2]}\n${numArrays[3]} | ${numArrays[4]} | ${numArrays[5]}\n${numArrays[6]} | ${numArrays[7]} | ${numArrays[8]}`)
                findPosition(num)
                let status = await message.channel.send("AI is playing..")
                AIrespond()
                status.edit("Your turn to play! Respond with MK$respond [number]")

                //round 2 and on
                const filter = (m) => m.author.id === message.author.id && !m.author.bot;
                collector = new MessageCollector(message.channel, filter, {
                    time: 1000 * 60, // 60s
                });
                collector.on('collect', async message => {
                    if (message.content.includes(`${prefix}respond`)) {
                        message.delete()
                        let num = message.content.replace(`${prefix}respond`, "")
                        if (!num)
                            return message.channel.send(
                                "Please include a number to play! MK$play [number]"
                            );
                        if (isNaN(num))
                            return message.channel.send("The position has to be a number!");
                        findPosition(num)
                        status.edit("AI is playing..")
                        AIrespond()
                        status.edit("Your turn to play! Respond with MK$respond [number]")
                        checkWin()
                    }
                })
            }
        })
    }
})
client.login(process.env.TOKEN);