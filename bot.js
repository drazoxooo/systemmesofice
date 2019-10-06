const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
    
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.on('ready',  () => {
  console.log('By : AYMAN-DRAZOX ');
  console.log(`Logged in as * [ " ${client.user.username} " ] servers! [ " ${client.guilds.size} " ]`);
  console.log(`Logged in as * [ " ${client.user.username} " ] Users! [ " ${client.users.size} " ]`);
  console.log(`Logged in as * [ " ${client.user.username} " ] channels! [ " ${client.channels.size} " ]`);
});
client.on('message',message => {
    if(message.content === prefix + "closeroom") {
    if(!message.channel.guild) return message.channel.send('**This command is only done on servers**');
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('**:x: - No Permissions ! **');
    message.channel.overwritePermissions(message.guild.id, {
     SEND_MESSAGES: false
     }).then(() => {
        message.channel.send("**:white_check_mark: | Channel Closed :lock:**")
 });
    }
    if(message.content === prefix + "openroom") {
    if(!message.channel.guild) return message.channel.send('**This command is only done on servers**');
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('**:x: - No Permissions ! **');
    message.channel.overwritePermissions(message.guild.id, {
     SEND_MESSAGES: true
     }).then(() => {
        message.channel.send("**:white_check_mark: | Channel Opened :unlock:**")
  });//by viper & ggaming & zaid
  }      
 });

client.on("message", message => {
             
     if(!message.channel.guild) return;

 if (message.content === "*help") {
   message.react("✔","❌")
  const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .addField("『help』", true)
      .addField("✅|Check Your Dm", true)
      
            
  message.channel.sendMessage({embed});

 }
});




client.on('message', message => {
   if (message.content === "*roll1") {
  message.channel.sendMessage(Math.floor(Math.random() * 6));
    }
});
 
client.on('message', message => {
   if (message.content === "*roll2") {
  message.channel.sendMessage(Math.floor(Math.random() * 12));
    }
});
 
client.on('message', message => {
   if (message.content === "*roll3") {
  message.channel.sendMessage(Math.floor(Math.random() * 18));
    }
});
 
client.on('message', message => {
   if (message.content === "*roll4") {
  message.channel.sendMessage(Math.floor(Math.random() * 100));
    }
});


console.log('...');
client.on('ready', () => {
  console.log(`im redey`);
});
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube('AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8');
const queue = new Map();
 
 const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = '*'; // ÈÑÝßÓ ÈæÊß åäÇ
var token = ''; //Êæßä ÇáÈæÊ åäÇ
var servers = {};
client.on("message", async message => {
    var args = message.content.substring(prefix.length).split(" ");
    if (!message.content.startsWith(prefix)) return;
  var searchString = args.slice(1).join(' ');
    var url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    var serverQueue = queue.get(message.guild.id);
    switch (args[0].toLowerCase()) {
      case "play":
    var voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
        var permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) {
            return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
        }
        if (!permissions.has('SPEAK')) {
            return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
        }
      if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            var playlist = await youtube.getPlaylist(url);
            var videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                var video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
            }
            return message.channel.send(`? Playlist: **${playlist.title}** has been added to the queue!`);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    var index = 0;
                    message.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Please provide a value to select one of the search results ranging from 1-10.
                    `);
                    // eslint-disable-next-line max-depth
                    try {
                        var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
                            maxMatches: 1,
                            time: 10000,
                            errors: ['time']
                        });
                    } catch (err) {
                        console.error(err);
                        return message.channel.send('No or invalid value entered, cancelling video selection.');
                    }
                    var videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    return message.channel.send('?? I could not obtain any search results.');
                }
            }
            return handleVideo(video, message, voiceChannel);
        }
        break;
      case "skip":
        if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
        if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.');
        serverQueue.connection.dispatcher.end('Skip command has been used!');
        return undefined;
        break;
      case "stop":
        if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
        if (!serverQueue) return message.channel.send('There is nothing playing that I could stop for you.');
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end('Stop command has been used!');
        return undefined;
break;
      case "volume":
        if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
        if (!serverQueue) return message.channel.send('There is nothing playing.');
        if (!args[1]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
        serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
        return message.channel.send(`I set the volume to: **${args[1]}**`);
break;
      case "np":
        if (!serverQueue) return message.channel.send('There is nothing playing.');
        return message.channel.send(`?? Now playing: **${serverQueue.songs[0].title}**`);
break;
      case "queue":
        if (!serverQueue) return message.channel.send('There is nothing playing.');
        return message.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
        `);
break;
      case "pause":
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return message.channel.send('? Paused the music for you!');
        }
        return message.channel.send('There is nothing playing.');
break;
      case "resume":
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return message.channel.send('? Resumed the music for you!');
        }
        return message.channel.send('There is nothing playing.');
   
 
    return undefined;
break;
}
async function handleVideo(video, message, voiceChannel, playlist = false) {
    var serverQueue = queue.get(message.guild.id);
    console.log(video);
    var song = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if (!serverQueue) {
        var queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };
        queue.set(message.guild.id, queueConstruct);
 
        queueConstruct.songs.push(song);
 
        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(message.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`I could not join the voice channel: ${error}`);
            queue.delete(message.guild.id);
            return message.channel.send(`I could not join the voice channel: ${error}`);
        }
    } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        if (playlist) return undefined;
        else return message.channel.send(`? **${song.title}** has been added to the queue!`);
    }
    return undefined;
}
  function play(guild, song) {
    var serverQueue = queue.get(guild.id);
 
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;





client.on("message", message => {
 if (message.content === "*help") {
  const embed = new Discord.RichEmbed() 
      .setColor("#ffff00")
      .setThumbnail(message.author.avatarURL)
      .setDescription(`
-🚀 Good connection speed 
-😎 easy to use
-✅ 『prefix』=『*』
● ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ● 

💎『all commands』💎
                        
💎*server 『server info』                      
  
💎*date 『To check the date』

💎*ping 『to know the connection speed of the bot』

💎*members 『To get info about members』

💎*Repeat 『To Repeat your mesaage』

💎*animal  『To see pictures about animals』

💎*avatar 『To see your own avatar or your friends avatar』

💎*serverimage 『To see server image』

● ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ● 

👑『adminstrator commands』👑

👑*bc 『brodcast』

👑*rooms 『To know number of rooms in the server』

👑*ban 『To ban a member』

👑*kick 『to kick a member』

👑*clear 『To clear the chat』

👑*closeroom 『closeroom』

👑*openroom 『openroom』

👑*ct  『to create a text channel』

👑*cv  『To create a voice channel』

👑*delete  『To delete a channel』

👑*mute 『For mute a member』

👑*unmute 『For unmute a member』


● ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ● 

🎲『Rolls 』🎲

🎲*roll1   『Roll a number from 1 to 6』

🎲*roll2   『Roll a number from 1 to 12』

🎲*roll3   『Roll a number from 1 to 18』

🎲*roll4   『Roll a number from 1 to 100』

link help
:grinning: **https://sites.google.com/view/t-r-x-system/accueil**:grinning: 

● ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ● 




`)


message.author.sendEmbed(embed)

}
}); 



client.on('message', message => {
    if (message.content.startsWith("*avatar")) {
        var mentionned = message.mentions.users.first();
    var x5bzm;
      if(mentionned){
          var x5bzm = mentionned;
      } else {
          var x5bzm = message.author;
          
      }
        const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setImage(`${x5bzm.avatarURL}`)
      message.channel.sendEmbed(embed);
    }
});

                    client.on('message', message => {
                                if(!message.channel.guild) return;
                        if (message.content.startsWith('*ping')) {
                            if(!message.channel.guild) return;
                            var msg = `${Date.now() - message.createdTimestamp}`
                            var api = `${Math.round(client.ping)}`
                            if (message.author.bot) return;
                        let embed = new Discord.RichEmbed()
                        .setAuthor(message.author.username,message.author.avatarURL)
                        .setThumbnail('https://cdn.discordapp.com/avatars/368141321547808768/c42716e13cb850f9ad0930af699472d0.png?size=2048nk')
                        .setColor('RANDOM')
                        .addField('**Time Taken:**',msg + " ms")
                        .addField('**WebSocket:**',api + " ms")
         message.channel.send({embed:embed});
                        }
                    });

client.on("message", (message) => {
if (message.content.startsWith("*ct")) {
            if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("❌ | Sorry but You don't have Permission To create a Text channel ");
        let args = message.content.split(" ").slice(1);
    message.guild.createChannel(args.join(' '), 'text');
message.channel.sendMessage('✅ | The Text channel have been succesfully created ')

}
});
client.on("message", (message) => {
if (message.content.startsWith("*cv")) {
            if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("❌ | Sorry but You don't have Permission To create a Voice channel ");
        let args = message.content.split(" ").slice(1);
    message.guild.createChannel(args.join(' '), 'voice');
    message.channel.sendMessage('✅ | The Voice channel have been succesfully created ')
    
}
});






var prefix = "1";

client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

// ^^say
  if (command === "*Repeat") {
          message.delete()
    message.channel.sendMessage(args.join(" ")).catch(console.error);
  }
  
 

if (command == "*embed") {
    let say = new Discord.RichEmbed()
    .setDescription(args.join("  "))
    .setColor(0x23b2d6)
    message.channel.sendEmbed(say);
    message.delete();
  }


});


   client.on("*message", message => {
    const prefix = "*"
              
          if(!message.channel.guild) return;
   if(message.author.bot) return;
      if(message.content === prefix + "serveimage"){ 
          const embed = new Discord.RichEmbed()
  
      .setTitle(`This is  ** ${message.guild.name} **  Photo !`)
  .setAuthor(message.author.username, message.guild.iconrURL)
    .setColor(0x164fe3)
    .setImage(message.guild.iconURL)
    .setURL(message.guild.iconrURL)
                    .setTimestamp()

   message.channel.send({embed});
      }
  });
  
  client.on('message', (message) => {
    if (message.content.startsWith('*kick')) {
        var member= message.mentions.members.first();
        member.kick().then((member) => {
            message.channel.send(member.displayName + '✅ | The member have been succesfully kicked');
        }).catch(() => {
            message.channel.send("❌ | Sorry but You don't have Permission To kick this member");
        });
    }
}); 


client.on('message', (message) => {
    if (message.content.startsWith('*ban ')) {
      if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply("❌ | Sorry but You don't have Permission To ban this member");
        var member= message.mentions.members.first();
        member.ban().then((member) => {
         message.channel.send(member.displayName + '✅ | The member have been succesfully banned');
        }).catch(() => {
            message.channel.send('Error');
        });
    }
});


client.on('message', (message) => {

    if (message.content.startsWith('*mute ')) {
      if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("❌ | Sorry but You don't have Permission To mute this member");
      var member= message.mentions.members.first();
      member.removeRoles(member.roles);
      member.addRole('611593383923941387');
      member.addRole('611593383923941387');
      member.addRole('611593383923941387');
     message.channel.send(member.displayName + '✅ | The member have been succesfully muted');



    }

});


client.on('message', (message) => {

    if (message.content.startsWith('*unmute ')) {
if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("❌ | Sorry but You don't have Permission To unmute this member");
var member= message.mentions.members.first();
member.removeRole('611593383923941387');
message.channel.send(member.displayName + '✅ | The member have been succesfully unmuted');
}


});





  
  client.on("message", (message) => {
    if (message.content.startsWith('*delet')) {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");

        let args = message.content.split(' ').slice(1);
        let channel = message.client.channels.find('name', args.join(' '));
        if (!channel) return message.reply('**There is no room like this name -_-**').catch(console.error);
        channel.delete()
    }
});
  
  
client.on('message', message => {
     if (message.content === "*servers") {
     let embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .addField("**| السيرفرات |**" , client.guilds.size)
  message.channel.sendEmbed(embed);
    }
});

  var prefix = "*";
var cats = ["https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg","http://www.dogbazar.org/wp-content/uploads/2014/09/british-bull-dog-puppies.jpg","http://cdn2-www.dogtime.com/assets/uploads/gallery/german-shepherd-dog-breed-pictures/standing-7.jpg","http://cdn.akc.org/Marketplace/Breeds/German_Shepherd_Dog_SERP.jpg","https://animalso.com/wp-content/uploads/2016/12/black-german-shepherd_2.jpg","https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpg","https://www.petfinder.com/wp-content/uploads/2012/11/101438745-cat-conjunctivitis-causes.jpg","http://www.i-love-cats.com/images/2015/04/12/cat-wallpaper-38.jpg","https://www.aspca.org/sites/default/files/cat-care_urine-marking_main-image.jpg","https://s-media-cache-ak0.pinimg.com/originals/f0/3b/76/f03b7614dfadbbe4c2e8f88b69d12e04.jpg","http://www.rd.com/wp-content/uploads/sites/2/2016/04/15-cat-wants-to-tell-you-attention.jpg","https://www.thelocal.de/userdata/images/article/fa6fd5014ccbd8f4392f716473ab6ff354f871505d9128820bbb0461cce1d645.jpg","https://www.adelaidezoo.com.au/wp-content/uploads/sites/2/animals/GiantPanda3Slider.jpg","http://imagem.band.com.br/f_230168.jpg"]
    client.on('message', message => {
        var args = message.content.split(" ").slice(1);
    if(message.content.startsWith(prefix + 'animal')) {
         var cat = new Discord.RichEmbed()
.setImage(cats[Math.floor(Math.random() * cats.length)])
message.channel.sendEmbed(cat);
    }
});

client.on('message', message => {
var prefix = "*";

    if (message.author.id === client.user.id) return;
    if (message.guild) {
   let embed = new Discord.RichEmbed()
    let args = message.content.split(' ').slice(1).join(' ');
if(message.content.split(' ')[0] == prefix + 'bc') {
    if (!args[1]) {
message.channel.send("**bc <message>**");
return;
}
        message.guild.members.forEach(m => {
   if(!message.member.hasPermission('ADMINISTRATOR')) return;
            var bc = new Discord.RichEmbed()
            .addField('» Server :', `${message.guild.name}`)
            .addField('» Sender : ', `${message.author.username}#${message.author.discriminator}`)
            .addField(' » The Message : ', args)
            .setColor('#ff0000')
            // m.send(`[${m}]`);
            m.send(`${m}`,{embed: bc});
        });
    }
    } else {
        return;
    }
});

client.on('message', message => {
    if (message.content === "*server") {
        if (!message.channel.guild) return
        var verificationLevel = message.guild.verificationLevel;
        const verificationLevels = ['None','Low','Meduim','High','Extreme'];
        var Y1 = message.guild.createdAt.getFullYear() - 2000
        var M2 = message.guild.createdAt.getMonth()
        var D3 = message.guild.createdAt.getDate()
        const xNiTRoZ = new Discord.RichEmbed()
         .setAuthor(message.author.username , message.author.avatarURL)
         .setColor('RANDOM')
         .setTimestamp()
         .setTitle(message.guild.name,message.guild.iconURL)
         .addField(':id: Server id',`${message.guild.id}`,true)
         .addField(':date: Created on ',D3 + '.' + M2 + '.' + Y1,true)             
         .addField(':crown: Server Owner',`${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`)             
         .addField(':busts_in_silhouette: Members ' + ` ${message.guild.memberCount} `,'Online '+`[ ${message.guild.members.filter(m=>m.presence.status == 'online','idle','dnd').size} ]`+ ','+'Offline '+`[ ${message.guild.members.filter(m=>m.presence.status == 'offline').size} ]`,true)
         .addField(':speech_balloon: Channels' +' '+message.guild.channels.size+' ',`Text [ ${message.guild.channels.filter(m => m.type === 'text').size} ]`+', '+`Voice [ ${message.guild.channels.filter(m => m.type === 'voice').size} ]`,true)
         .addField(':closed_lock_with_key: Rolls  '+message.guild.roles.size+' ','Type `.roles` To See The Server Roles!')
         message.channel.send({embed:xNiTRoZ});
     }
    });


  client.on('message', message => {
    if (message.content === "*rooms") {
                      if (!message.guild) return;

        var channels = message.guild.channels.map(channels => `${channels.name}, `).join(' ')
        const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField(`${message.guild.name}`,`**Rooms:white_check_mark:**`)
        .addField(':arrow_down: Rooms Number. :heavy_check_mark:',`** ${message.guild.channels.size}**`)
        
.addField(':arrow_down:Rooms  Name. :heavy_check_mark::',`**[${channels}]**`)
        message.channel.sendEmbed(embed);
    }
});

  var prefix = "*";
  const HeRo = new Discord.Client();
  client.on('message', message => {
      if (message.content === prefix + "date") {
          if (!message.channel.guild) return message.reply('** This command only for servers **');  
          var currentTime = new Date(),
              Year = currentTime.getFullYear(),
              Month = currentTime.getMonth() + 1,
              Day = currentTime.getDate();

              var Date15= new Discord.RichEmbed()
              .setTitle("**『  Date  』 **")
              .setColor('RANDOM')
              .setTimestamp()
              .setDescription( "『"+ Day + "-" + Month + "-" + Year + "』")
              .setFooter(`*help to see all bot commands `, 'https://images-ext-1.discordapp.net/external/x-p4BwGofa_z_p9hpV-4hJPcqWh-aWGQzsmI189cDiY/%3Fwidth%3D344%26height%3D344/https/media.discordapp.net/attachments/372444859329544203/372701184055836682/ass.jpg?width=231&height=231')
               message.channel.sendEmbed(Date15);
      }
  });




    client.on('message', message => {
              if (!message.channel.guild) return;
      if(message.content =='*members')
      var IzRo = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .setFooter(message.author.username, message.author.avatarURL) 
      .setTitle(':tulip:| Members info')
      .addBlankField(true)
      .addField(':green_book:| Online ',
      `${message.guild.members.filter(m=>m.presence.status == 'online').size}`)
      .addField(':closed_book:| DnD',`${message.guild.members.filter(m=>m.presence.status == 'dnd').size}`)
      .addField(':orange_book:| Afk',`${message.guild.members.filter(m=>m.presence.status == 'idle').size}`)
      .addField(':notebook:| Offline ',`${message.guild.members.filter(m=>m.presence.status == 'offline').size}`)
      .addField('Members of server',`${message.guild.memberCount}`)
      message.channel.send(IzRo);
    });



var prefix = "*"

client.on('message', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    if (message.content.startsWith(prefix + 'edit')) {
        message.channel.sendMessage('Edit me').then(msg=>{msg.edit('Done edit')});
    }
});

client.on('message', message => {
     if (message.content === "*bot") {
            if(!message.channel.guild) return message.reply('** This command only for servers **');
     let embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .addField("**عدد السيرفرات الي فيها البوت:**" , client.guilds.size)
  .addField("**المستخدمين:**", client.users.size)
  .addField("**قنوات:**", client.channels.size)
  .setTimestamp()
message.channel.sendEmbed(embed);
    }
});



client.on('message', message => {
    if (message.content === "*roles") {
        var roles = message.guild.roles.map(roles => `${roles.name}, `).join(' ')
        const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField('Rolls:',`**[${roles}]**`)
        message.channel.sendEmbed(embed);
    }
});












client.on("guildCreate", guild => {
  console.log(` Server owner ${guild.owner.user.username}!`)
});




  
  
client.on('ready', () => {
    client.user.setGame(`by drazox|*help`,'https://www.twitch.tv/DRAZOX');
}); 

client.on("message", message => {
    var prefix = "*";
            var args = message.content.substring(prefix.length).split(" ");
            if (message.content.startsWith(prefix + "clear")) {
 if (!args[1]) {
                                let x5bz1 = new Discord.RichEmbed()
                                .setDescription("^^clear <number>")
                                .setColor("#0000FF")
                                message.channel.sendEmbed(x5bz1);
                            } else {
                            let messagecount = parseInt(args[1]);
                            message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
                                                          message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
                            message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
                            let x5bz2 = new Discord.RichEmbed()
                                                            .setColor("#008000")
                                .setDescription("✅| Delete " + args[1] + " Message!")
                                                                                        message.delete("..");
                                message.channel.sendEmbed(x5bz2);
                            }
                          }
});






client.on('message', message=>{
    if (message.content ==='*add-colors'){
        if (message.channel.guild){
            if (message.member.hasPermission('MANAGE_ROLES')){
                setInterval(function(){})
                  let count = 0;
                  let ecount = 0;
        for(let x = 0; x < 250; x++){
            message.guild.createRole({name:x,
            color: 'RANDOM'})
      }
            }else{
                message.channel.sendMessage(':warning: You do not have permission to write this command')
            }
        }else{
            message.channel.sendMessage(':warning:  This command only in servers')
        }
    }
    if (message.content === '*de-colors'){
                if (message.channel.guild){
            if (message.member.hasPermission('MANAGE_ROLES')){
                setInterval(function(){})
                  let count = 0;
                  let ecount = 0;
        for(let x = 0; x < 250; x++){
            message.guild.roles.find('name', x)
      }
            }else{
                message.channel.sendMessage(':warning: You do not have permission to write this command')
            }
        }else{
            message.channel.sendMessage(':warning:  This command only in servers')
        }
    }

})

client.login(process.env.BOT_TOKEN);
