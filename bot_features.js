require("dotenv").config();
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
], 
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const warns = require("./warns.json");
const fs = require('fs');
const ms = require('ms');

client.on("ready", () => {
    console.log(`bot ${client.user.username} is logged in`);
});

// client.on('ready', client => {
//     client.channels.cache.get('1038909142724780054').send('Hello here!')

// })

//BAN, KICK, MUTE, UNMUTE, WARN BOT
// @user is mandatory, [reason] is optional
client.on('messageCreate', async message => {
    let prefix = 'MK$';
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toUpperCase();
    let args = messageArray.slice(1);

    //in order to MUTE/UNMUTE users, you need to make a MUTED role, so ID can be used
    //admin role should be with full permissions as well as BOT, so he can kick, mute, ban, unmute, warn.
    const mutedroleid = '1038910877581201582'; //role ID from my test server
    const mutedrole = message.guild.roles.cache.get(mutedroleid);

    //BAN COMMAND
    if (cmd === `${prefix}BAN`) {
        if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply("You do not have permission to do that.");
        const user = message.mentions.users.first();
        if (!user) return message.reply("Please specify someone you want to ban. MK$BAN @user [reason]");
        if(user.id === message.author.id) return message.reply("You cannot ban yourself.");
        const reason = args.slice(1).join(" ");
        message.guild.members.cache.get(user.id).ban({reason: reason});
 
        const banmessage = new MessageEmbed()
        .setColor("#00aaaa")
        .setDescription(`${user} has been banned. Reason: ${reason != "" ? reason : "-"}`);
        message.channel.send({ embeds: [banmessage] });
    }

    //KICK COMMAND
    if (cmd === `${prefix}KICK`) {
        if(!message.member.permissions.has("KICK_MEMBERS")) return message.reply("You do not have permission to do that.");
        const user = message.mentions.users.first();
        if (!user) return message.reply("Please specify someone you want to kick. MK$KICK @user [reason]");
        if(user.id === message.author.id) return message.reply("You cannot kick yourself.");
        const reason = args.slice(1).join(" ");
        message.guild.members.cache.get(user.id).kick(reason);
 
        const kickmessage = new MessageEmbed()
        .setColor("#00aaaa")
        .setDescription(`${user} has been kicked. Reason: ${reason != "" ? reason : "-"}`);
        message.channel.send({ embeds: [kickmessage] });
    }

    //MUTE COMMAND
    if (cmd === `${prefix}MUTE`) {
        if(!message.member.permissions.has("MUTE_MEMBERS")) return message.reply("You do not have permission to do that.");
        const user = message.mentions.users.first();
        if (!user) return message.reply("Please specify someone you want to mute. MK$MUTE @user [time] [reason]");
        const target = message.guild.members.cache.get(user.id);
        if(user.id === message.author.id) return message.reply("You cannot mute yourself.");
        if(target.roles.cache.has(mutedroleid)) return message.reply("This user has been muted.");
        if(!mutedrole) return message.reply("Couldn't find the Muted role.");

        const reason = args.slice(2).join(" ");
        let time = args[1];
        if (!time) time = "1h";

        target.roles.add(mutedrole.id);
        const embed = new MessageEmbed()
        .setColor("#00aaaa")
        .setDescription(`${user} has been muted by ${message.author} for ${ms(ms(time))}.\nReason: ${reason != "" ? reason : "-"}`)

        message.channel.send({ embeds: [embed] });
        
        setTimeout(() => {
            target.roles.remove(mutedrole.id);
            const unmute = new MessageEmbed()
            .setColor("#00aaaa")
            .setDescription(`${user} has been unmuted.`);
            message.channel.send({ embeds: [unmute] });
        }, ms(time));
    }

    //UNMUTE COMMAND
    if (cmd === `${prefix}UNMUTE`) {
        if(!message.member.permissions.has("MUTE_MEMBERS")) return message.reply("You do not have permission to do that.");
        const user = message.mentions.users.first();
        if (!user) return message.reply("Please specify someone you want to unmute. MK$UNMUTE @user [reason]");
        const target = message.guild.members.cache.get(user.id);
        if(!target.roles.cache.has(mutedroleid)) return message.reply("This user is unmuted.");
        if(user.id === message.author.id) return message.reply("You cannot unmute yourself. ):");
        if(!mutedrole) return message.reply("Couldn't find the Muted role.");

        const reason = args.slice(1).join(" ");
        target.roles.remove(mutedrole.id);
        const unmute = new MessageEmbed()
        .setColor("#00aaaa")
        .setDescription(`${user} has been unmuted by ${message.author}.\nReason: ${reason != "" ? reason : "-"}`);
        message.channel.send({ embeds: [unmute] });
    }

    //WARN COMMAND
    if (cmd === `${prefix}WARN`) {
        if(!message.member.permissions.has("MUTE_MEMBERS")) return message.reply("You do not have permission to do that.");
        const user = message.mentions.users.first();
        if (!user) return message.reply("Please specify someone you want to warn. MK$WARN @user [reason]");
        const target = message.guild.members.cache.get(user.id);
        if(target.roles.cache.has(mutedroleid)) return message.reply("You cannot warn muted members.");
        if(!mutedrole) return message.reply("Couldn't find the Muted role.");

        const reason = args.slice(1).join(" ");

        if (!warns[user.id]) {
            warns[user.id] = {
                warnCount: 1
            }
        } else {
            warns[user.id].warnCount += 1;
        }

        if(warns[user.id].warnCount >= 5) {
            const mute = new MessageEmbed()
            .setColor("#00aaaa")
            .setDescription(`${user} has been muted. \nReason: ${reason != "" ? reason : "-"}`);
            message.channel.send({ embeds: [mute] });
            
            target.roles.add(mutedrole.id);
            warns[user.id].warnCount = 0;
    
            setTimeout(() => {
                target.roles.remove(mutedrole.id);
                const unmute = new MessageEmbed()
                .setColor("#00aaaa")
                .setDescription(`${user} has been unmuted.`);
                message.channel.send({ embeds: [unmute] });
            }, 1000 * 900);

        } else {
            const warn = new MessageEmbed()
            .setColor("#00aaaa")
            .setDescription(`${user} has been warned by ${message.author}. (${warns[user.id].warnCount}**/**5) \nReason: ${reason != "" ? reason : "-"}`);
            message.channel.send({ embeds: [warn] });
        }

        fs.writeFile("./warns.json", JSON.stringify(warns), err => {
            if (err) console.log(err);
        });
    }

    //ROCK PAPER SCISSORS bot
    const argsRps = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = argsRps.shift().toUpperCase();

    if (command === 'RPS') {
        const acceptedReplies = ['rock', 'paper', 'scissors'];
        const random = Math.floor((Math.random() * acceptedReplies.length));
        const result = acceptedReplies[random];

        const choice = argsRps[0];
        if (!choice) return message.channel.send(`How to play: \`${prefix}rps <rock|paper|scissors>\``);
        if (!acceptedReplies.includes(choice)) return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);
        
        console.log('Bot Result:', result);
        if (result === choice) return message.reply("We had the same choice!");
        
        switch (choice) {
            case 'rock': {
                if (result === 'paper') return message.reply('Bot won! Chose paper!');
                else return message.reply('You won! Bot chose scissors, rock beats scissors!');
            }
            case 'paper': {
                if (result === 'scissors') return message.reply('Bot won! Chose scissors!');
                else return message.reply('You won! Bot chose rock, paper beats rock!');        
            }
            case 'scissors': {
                if (result === 'rock') return message.reply('Bot won! Chose rock!');
                else return message.reply('You won! Bot chose paper, scissors beats paper!');
            }
            default: {
                return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);
            }
        }
    }
});

// Adding reaction-role function
client.on('messageReactionAdd', async (reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;

    if(reaction.message.channel.id === '964078460744130570') {
        if(reaction.emoji.name === '🐉') {
            reaction.message.guild.members.cache
            .get(user.id)
            .roles.add('967109162406412289')
        }
        console.log("Message")
        if(reaction.emoji.name === '🦊') {
            //console.log("Reaction")
            reaction.message.guild.members.cache
            .get(user.id)
            .roles.add('967109312315002910')
        }
        if(reaction.emoji.name === '🐰') {
            reaction.message.guild.members.cache
            .get(user.id).roles
            .add('967109349703024651')
        }
        if(reaction.emoji.name === '🐺') {
            reaction.message.guild.members.cache
            .get(user.id).roles
            .add('967109224578572308')
        }
    }else return;
});

//remove role function
client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.message.channel.id == '964078460744130570') {
      if (reaction.emoji.name === '🦊') {
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.remove('967109312315002910');
      }
      if (reaction.emoji.name === '🐉') {
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.remove('967109162406412289');
      }
      if (reaction.emoji.name === '🐰') {
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.remove('967109349703024651');
      }
      if (reaction.emoji.name === '🐺') {
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.remove('967109224578572308');
      }
    } else return;
});

client.login(process.env.TOKEN);