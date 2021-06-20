
const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require("node-fetch");

const config = require("../config");

const index = require('../index');

const youtubeKey = config.youtubeKey
const youtubeUser = config.youtubeUser

module.exports ={
    commands: function(cmd,args,message,client){   
        if(cmd === 'ping') {
            ping(message,client)
        }
        if (cmd === "rm3"){
            message.channel.send("https://cdn.discordapp.com/attachments/629695220065239064/844968694550626334/5aatpw.gif");
            message.delete();
        }
        if (cmd === "what") {
            const rest = message.content.slice(5);
            if (rest.includes("is the meaning of life")){
                message.reply("To listen to minecraftcowboy, he is the wise one")
            }
        }
        //mod only commands
        if(message.member.roles=== null){
            message.reply("Roles issue detected")
            console.log(message.author+" roles issue "+message.content)
            return;
        }
        if (message.member.roles.cache.find(r=>r.id === '696134129497931857')||message.member.roles.cache.find(r=>r.id === '795456110421213214')){
            if(cmd === "say"){
                const say = message.content.slice(4);
                if(say) {
                    message.channel.send(say);
                    message.delete();
                }
                else(
                message.reply("nothing to say")
                )
            }  
            if(cmd==="subupdate") {
                getSubscribers(message,client);
            }
            if(cmd==='rm') {
                message.channel.send("RM is busy and does not check/rate clips");
                message.delete();
            }
            if (cmd ==="rm2") {
                message.channel.send("https://media.giphy.com/media/eiNLAAmHNZuy5nsKKq/giphy.gif");
                message.delete();
            }
            if (cmd ==="dm"){
                var str = message.content
                const mess = str.split(/>(.+)/)[1]
                const mention = message.mentions.users.first();
                if (!mention){
                    message.reply("no mention")
                    return;
                }
                else{
                    console.log(mention)
                    const user = client.users.cache.get(mention.id);
                    //console.log(mess);
                    user.send(mess);    
                }
            }
        }
        //admin only commands
    }
}

const ping = async (message,client) => {
    var resMsg = await message.channel.send('Ping is being appreciated...');
    const ping = (resMsg.createdTimestamp - message.createdTimestamp);
    //console.log(client.ws.ping);  
    resMsg.edit("Ping: " + ping +" ms");
    //message.reply('pong, ' + `${Date.now() - message.createdTimestamp}` + ' ms');
    return;
}

const getSubscribers = async (message,client) => {
    //return req.data;
    fetch("https://www.googleapis.com/youtube/v3/channels?part=statistics&id="+youtubeUser+"&key="+youtubeKey)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data["items"][0].statistics.subscriberCount);
        const sub = data["items"][0].statistics.subscriberCount;
        subr=sub.slice(0, -4); 
        subr = (subr / 100).toFixed(2);
        message.reply("sub count: "+ subr)
        const channel = client.channels.cache.find(channel => channel.id === "849642482702614528");
        channel.setName("Subscribers: "+subr+" Mil");
        //return(sub)
    })
  }