const Discord = require("discord.js");
const ConfigFile = require("./setting.json");
const client = new Discord.Client();
const prefix = ConfigFile.prefix;
const token = ConfigFile.token;

const color = ConfigFile.colors;
const fs = require("fs");
const hastebins = require("hastebin-gen");
const superagent = require("superagent");
const fetch = require("node-fetch");
const backups = require("./Data/backups.json");
const db = require("./Data/blacklist.json");
const al = require("./Data/adminlist.json");
const lien = ConfigFile.lien;
const talkedRecently = new Set();
require("colors");
const mc = require("./Data/membercount.json");
const setup = require("./Data/setup.json");


let statsa = new Discord.RichEmbed()
  .setTitle(":white_check_mark: **Super**")
  .setDescription("**Les statistiques on été activé pour ce serveur**.")
  .setTimestamp()
  .setColor("GREEN");

let antiro = new Discord.RichEmbed()
  .setTitle(":white_check_mark: **Super**")
  .setDescription(
    "**L'antiraid a été activé pour ce serveur**.\n\nil comporte: anti-invitation & anti-spam"
  )
  .setTimestamp()
  .setColor("GREEN");

let antird = new Discord.RichEmbed()
  .setTitle(":white_check_mark: **Super**")
  .setDescription("**L'antiraid a été desactivé pour ce serveur**.")
  .setTimestamp()
  .setColor("GREEN");

let statsd = new Discord.RichEmbed()
  .setTitle(":white_check_mark: **Super**")
  .setDescription("**Les statistiques on été desactivé pour ce serveur**.")
  .setTimestamp()
  .setColor("GREEN");

let logschannel = client.channels.find(
  channels => channels.name === "redbull-logs"
);
let fonda_id = "720920857366626335";


client.on("ready", function() {
  client.user.setStatus("idle");
  setInterval(() => {
    setTimeout(() => {
      client.user.setActivity(`${client.guilds.size} Servers | ${prefix}help`, {
        type: "WATCHING"
      });
    }, 1000);
    setTimeout(() => {
      client.user.setActivity(
        `${client.guilds
          .map(guild => guild.memberCount)
          .reduce((a, b) => a + b)} Members | ${prefix}help`,
        {
          type: "WATCHING"
        }
      );
    }, 14000);
    setTimeout(() => {
      client.user.setActivity(`RedBull donne des ailes`, {
        type: "WATCHING"
      });
    }, 28000);
  }, 21000);
  let myGuild = client.guilds.get("721099521299316826");
  let userscount = client.guilds
    .map(guild => guild.memberCount)
    .reduce((a, b) => a + b);
  let memberchannel = myGuild.channels.get("721347056479764531");
  let serveurscount = client.guilds.size;
  let memberCountChannel = myGuild.channels.get("721347054525480990");
  memberCountChannel.setName("Serveur•" + serveurscount);
  memberchannel.setName("User•" + userscount);
  console.log(
    `
╔═════════════════════════════════╗
║-->  User Name : ${client.user.username}
╟─────────────────────────────────╢
║-->  Prefix   : ${prefix} 
╟─────────────────────────────────╢
║-->  Users    : ${client.guilds
      .map(guild => guild.memberCount)
      .reduce((a, b) => a + b)}
╟─────────────────────────────────╢
║-->  Bots     : ${client.users.filter(user => user.bot).size}
╟─────────────────────────────────╢
║-->  Channels : ${client.channels.size}
╟─────────────────────────────────╢
║-->  Guilds   : ${client.guilds.size}
╚═════════════════════════════════╝
`.red
  );
});



let backup_e = new Discord.RichEmbed()
  .setColor(color)
  .setTitle("🐂 **Help partie backup** :gear: ")
  .setColor(color)
  .setFooter("RedBull bot")
  .setImage(
    "https://cdn.dribbble.com/users/763332/screenshots/5474142/redbullrampage_arch-01.gif"
  )
  .setTimestamp()
  .setURL(lien)
  .addField(
    prefix + "**backup create**",
    "```Pour créer une backup d'un serveur```",
    true
  )
  .addField(
    prefix + "**backup load (id)**",
    "```Pour charger une backup```",
    true
  )
  .addField(
    prefix + "**backup delete (id)**",
    "```Pour surppimer une backup```",
    true
  )
  .addField(
    prefix + "**backup purge**",
    "```Pour supprimer toutes tes backups```",
    true
  )
  .addField(
    prefix + "**backup info (id)**",
    "```Pour envoyer les informations d'une backup```",
    true
  );

let error = new Discord.RichEmbed()
  .setTitle(" :x: **Erreur**")
  .setColor("RED")
  .setDescription(
    "**Je ne peux pas envoyer cette image car elle contient des caractères sexuels veuillez faire cette commande dans un salon NSFW**"
  )
  .setImage(
    "https://media.discordapp.net/attachments/713101796259659796/713907580128198727/unknown.png"
  );

let memberchelp = new Discord.RichEmbed()
  .setColor(color)
  .setTitle("🐂 **__Help partie MemberCount__**")
  .setFooter("RedBull bot")
  .setImage(
    "https://cdn.dribbble.com/users/763332/screenshots/5474142/redbullrampage_arch-01.gif"
  )
  .setTimestamp()
  .setURL(lien)
  .addField(
    prefix + "**membercount-on**",
    "```Pour activer le member count ```"
  )
  .addField(
    prefix + "**membercount-off**",
    "```Pour désactiver le member count```",
    true
  );


let nsfw = new Discord.RichEmbed()
  .setTimestamp()
  .setTitle("🐂 **Help partie NSFW** :underage: ")
  .setColor(color)
  .setFooter("RedBull bot")
  .setImage(
    "https://cdn.dribbble.com/users/763332/screenshots/5474142/redbullrampage_arch-01.gif"
  )
  .setURL(lien)
  .addField(prefix + "**ass**", "```Pour envoyer une photo de fesse```", true)
  .addField(prefix + "**4k**", "```Pour envoyer une image sexe en 4k```", true)
  .addField(prefix + "**anal**", "```Pour envoyer un gif anal```", true)
  .addField(
    prefix + "**hentai**",
    "```Pour envoyer une image/gif hentai```",
    true
  )
  .addField(prefix + "**nsfw-gif**", "```Pour envoyer un gif de sexe```", true)
  .addField(
    prefix + "**pussy**",
    "```Pour envouer une image de chattes```",
    true
  )
  .addField(prefix + "**thigh**", "```Pour envoyer une image thigh```", true);

const help = new Discord.RichEmbed()
  .setTitle("🐂 **__Bienvenue sur le pannel de help__**")
  .setColor(color)
  .setFooter("RedBull bot")
  .setImage(
    "https://cdn.dribbble.com/users/763332/screenshots/5474142/redbullrampage_arch-01.gif"
  )
  .setTimestamp()
  .setURL(lien)
  .addField(
    prefix + "**help mod**",
    "```Affiche les commandes de moderation```",
    true
  )
  .addField(
    prefix + "**help utile**",
    "```Affiche les commandes utile```",
    true
  )
  .addField(
    prefix + "**help backup**",
    "```Affiche les commandes backup```",
    true
  )
  .addField(prefix + "**help fun**", "```Affiche les commandes fun```", true)
  .addField(
    prefix + "**help liste**",
    "```Affiche les commandes des listes```",
    true
  )
  .addField(
    prefix + "**help antiraid**",
    "```Affiche les commandes antiraid```",
    true
  )
  .addField(prefix + "**help nsfw**", "```Affiche les commandes NSFW```", true)
  .addField(
    prefix + "**help member count**",
    "```Affiche les commandes member count```",
    true
  );


const utile = new Discord.RichEmbed()
  .setTitle("🐂 **__Help partie Utile__**")
  .setColor(color)
  .setFooter("RedBull bot")
  .setImage(
    "https://cdn.dribbble.com/users/763332/screenshots/5474142/redbullrampage_arch-01.gif"
  )
  .setTimestamp()
  .setURL(lien)
  .addField(
    prefix + "**avatar (@user)**",
    "```Pour afficher l'avatar d'une personne```",
    true
  )
  .addField(
    prefix + "**serveur-info**",
    "```Pour afficher les informations d'un serveur discord```",
    true
  )
  .addField(
    prefix + "**user-info**",
    "```Pour afficher les informations d'un utilisateur discord```",
    true
  )
  .addField(
    prefix + "**say (text)**",
    "```Pour ecrire un text en embed```",
    true
  )
  .addField(
    prefix + "**bot-info**",
    "```Pour afficher les informations du bot```",
    true
  )
.addField(
    prefix + "**setup**",
    "```Pour avoir les logs du serveur```",
    true
  );

let antirhelp = new Discord.RichEmbed()
  .setColor(color)
  .setTitle("🐂 **__Help partie Antiraid__**")
  .setFooter("RedBull bot")
  .setImage(
    "https://cdn.dribbble.com/users/763332/screenshots/5474142/redbullrampage_arch-01.gif"
  )
  .setTimestamp()
  .setURL(lien)
  .addField(
    prefix + "**antiraid-on**",
    "```Pour activer l'anti-spam et l'anti-invitation```",
    true
  )
  .addField(
    prefix + "**antiraid-off**",
    "```Pour désactiver l'anti-spam et l'anti-invitation```",
    true
  );

const list = new Discord.RichEmbed()
  .setTitle("🐂 **__Help partie Liste__**")
  .setColor(color)
  .setFooter("RedBull bot")
  .setImage(
    "https://cdn.dribbble.com/users/763332/screenshots/5474142/redbullrampage_arch-01.gif"
  )
  .setTimestamp()
  .setURL(lien)
  .addField(
    prefix + "**add-bl (@user)**",
    "```Pour ajouter quelqu'un a la blacklist du bot (Administrateur du bot uniquement)```",
    true
  )
  .addField(
    prefix + "**check-bl (@user)**",
    "```Pour regarder si le membre est dans la blacklist du bot```",
    true
  )
  .addField(
    prefix + "**delete-blacklist (@user)**",
    "```Pour retirer quelqu'un de la blacklist du bot (Administrateur du bot uniquement)```",
    true
  )
  .addField(
    prefix + "**add-admin (@user)**",
    "```Pour ajouter quelqu'un a la liste des admins du bot (Fondatateur du bot uniquement)```",
    true
  )
  .addField(
    prefix + "**check-admin (@user)**",
    "```Pour regarder si le membre est dans la liste des admins du bot```",
    true
  )
  .addField(
    prefix + "**delete-blacklist (@user)**",
    "```Pour retirer quelqu'un de la liste des admins du bot (Fondateur du bot uniquement)```",
    true
  );

const fun = new Discord.RichEmbed()
  .setTitle("🐂 **__Help partie Fun__**")
  .setColor(color)
  .setFooter("RedBull bot")
  .setImage(
    "https://cdn.dribbble.com/users/763332/screenshots/5474142/redbullrampage_arch-01.gif"
  )
  .setTimestamp()
  .setURL(lien)
  .addField(
    prefix + "**8ball (text)**",
    "```Pour soliciter l'aide du redbull suprem afin de voir si votre question est vraie ou fausse```",
    true
  )
  .addField(
    prefix + "**lovecalc (@user)**",
    "```Pour soliciter l'aide du redbull suprem afin de voir si vous etes compatible```",
    true
  )
  .addField(prefix + "**sondage (text)**", "```Pour creer un sondage```", true);

const mod = new Discord.RichEmbed()
  .setTitle("🐂 **__Help partie Moderation__**")
  .setColor(color)
  .setFooter("RedBull bot")
  .setImage(
    "https://cdn.dribbble.com/users/763332/screenshots/5474142/redbullrampage_arch-01.gif"
  )
  .setTimestamp()
  .setURL(lien)
  .addField(
    prefix + "**ban (@user)**",
    "```Pour bannir une personne du serveur```",
    true
  )
  .addField(
    prefix + "**kick (@user)**",
    "```Pour kick une personne du serveur```",
    true
  )
  .addField(
    prefix + "**voice-kick (@user)**",
    "```Pour kick une personne du salon vocal```",
    true
  )
  .addField(
    prefix + "**clear (2-100)**",
    "```Pour supprimer les messages```",
    true
  )
  .addField(
    prefix + "**invite**",
    "```Pour envoyer l'invitation du bot```",
    true
  )
  .addField(
    prefix + "**unban-all**",
    "```Pour unban tout les utiisateurs du serveur```",
    true
  );

let erreur = new Discord.RichEmbed()
  .setTitle(" :x: **Erreur**")
  .setColor("RED")
  .setTimestamp()
  .setDescription(
    "**Oh... Il semblerait que vous vous etes trompé mon prefix est **```" +
      prefix +
      "```"
  );

let mentionme = new Discord.RichEmbed()
  .setTitle("🐂 **Salut!**")
  .setColor(color)
  .setTimestamp()
  .setDescription("```mon préfixe est: " + prefix + "```");


client.on("message", message => {
  if (!setup[message.guild.id]) return;
  if (message.author.id === client.user.id) return;
  if (message.content.includes("discord.gg")) {
    if (message.author.bot) return;
    message.delete();
    message.channel
      .send(
        ":warning: **Oula attention vous n'avez pas les permissions de poster un lien sur ce serveur**"
      )
      .then(m =>
        setTimeout(() => {
          m.delete();
        }, 5000)
      );
    message.delete();
    return;
  }
  if (message.content.startsWith(prefix)) return;
  if (message.author.bot) return;
  if (talkedRecently.has(message.author.id)) {
    message.channel
      .send(
        ":warning: **Oula attention!!! Vous envoyez des messages trop rapidement.**"
      )
      .then(m =>
        setTimeout(() => {
          m.delete();
        }, 5000)
      );
    message.delete();
    return;
  }

  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 1000);
});




client.on("message", message => {
  let msg = message;
  if (message.content.includes("<@" + client.user.id + ">")) {
    message.channel.send(mentionme);
  }
  if (
    message.content.includes("/help") ||
    message.content.includes("!help") ||
    message.content.includes("^^help") ||
    message.content.includes(">help") ||
    message.content.includes(">>help")
  ) {
    message.channel.send(erreur).then(m =>
      setTimeout(() => {
        m.delete();
      }, 20000)
    );
  }
});


client.on("message", message => {
  let blacklisted = message.author;
  let msg = message;
  if (message.channel.type === "dm") return;
  if (db[blacklisted.id]) return;
  if (!message.content.startsWith(prefix)) return;
  if (message.content === prefix + "help utile") {
    if (talkedRecently.has(message.author.id)) {
      message.channel
        .send(
          ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
        )
        .th4en(m =>
          setTimeout(() => {
            m.delete();
          }, 5000)
        );
      message.delete();
      return;
    }

    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 5000);
    message.channel.send(utile).then(m =>
      setTimeout(() => {
        m.delete();
      }, 30000)
  )
  }
  if (message.content === prefix + "help liste") {
    if (talkedRecently.has(message.author.id)) {
      message.channel
        .send(
          ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
        )
        .th4en(m =>
          setTimeout(() => {
            m.delete();
          }, 5000)
        );
      message.delete();
      return;
    }

    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 5000);
    message.channel.send(list).then(m =>
      setTimeout(() => {
        m.delete();
      }, 30000)
    );
  }
  if (message.content === prefix + "help antiraid") {
    if (talkedRecently.has(message.author.id)) {
      message.channel
        .send(
          ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
        )
        .th4en(m =>
          setTimeout(() => {
            m.delete();
          }, 5000)
        );
      message.delete();
      return;
    }

    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 5000);
    message.channel.send(antirhelp).then(m =>
      setTimeout(() => {
        m.delete();
      }, 30000)
    );
  }
  if (message.content === prefix + "help") {
    if (talkedRecently.has(message.author.id)) {
      message.channel
        .send(
          ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
        )
        .then(m =>
          setTimeout(() => {
            m.delete();
          }, 5000)
        );
      message.delete();
      return;
    }

    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 5000);
    message.channel.send(help).then(m =>
      setTimeout(() => {
        m.delete();
      }, 30000)
    );
  }

  if (message.content === prefix + "help member count") {
    if (talkedRecently.has(message.author.id)) {
      message.channel
        .send(
          ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
        )
        .then(m =>
          setTimeout(() => {
            m.delete();
          }, 5000)
        );
      message.delete();
      return;
    }

    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 5000);
    message.channel.send(memberchelp).then(m =>
      setTimeout(() => {
        m.delete();
      }, 30000)
    );
  }

  if (message.content === prefix + "help backup") {
    if (talkedRecently.has(message.author.id)) {
      message.channel
        .send(
          ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
        )
        .then(m =>
          setTimeout(() => {
            m.delete();
          }, 5000)
        );
      message.delete();
      return;
    }

    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 5000);
    message.channel.send(backup_e).then(m =>
      setTimeout(() => {
        m.delete();
      }, 30000)
    );
  }
  if (message.content === prefix + "help mod") {
    if (talkedRecently.has(message.author.id)) {
      message.channel
        .send(
          ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
        )
        .then(m =>
          setTimeout(() => {
            m.delete();
          }, 5000)
        );
      message.delete();
      return;
    }

    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 5000);
    message.channel.send(mod).then(m =>
      setTimeout(() => {
        m.delete();
      }, 30000)
    );
  }
  if (message.content === prefix + "help fun") {
    if (talkedRecently.has(message.author.id)) {
      message.channel
        .send(
          ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
        )
        .then(m =>
          setTimeout(() => {
            m.delete();
          }, 5000)
        );
      message.delete();
      return;
    }

    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 5000);
    message.channel.send(fun).then(m =>
      setTimeout(() => {
        m.delete();
      }, 30000)
    );
  }

  if (message.content === prefix + "help nsfw") {
    if (talkedRecently.has(message.author.id)) {
      message.channel
        .send(
          ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
        )
        .then(m =>
          setTimeout(() => {
            m.delete();
          }, 5000)
        );
      message.delete();
      return;
    }

    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 5000);
    message.channel.send(nsfw).then(m =>
      setTimeout(() => {
        m.delete();
      }, 30000)
    );
  }
  const command = message.content
    .split(/ +/g)
    .shift()
    .slice(prefix.length)
    .toLowerCase();
  const args = message.content.split(/ +/g).splice(1);
  let member = message.mentions.members.first();
  let fonda_id = "692801280212730027";
  let reason = args.slice(1).join(" ");
  switch (command) {
    case "membercount-on":
      {
        if (!message.member.hasPermission("MANAGE_GUILD"))
          return message.channel.send(`:x: **Permission insufisante.**`);
        if (mc[message.guild.id])
          return message.channel.send(":x: **Statistiques deja activées**");
        const totalsize = message.guild.memberCount;
        const botsize = message.guild.members.filter(m => m.user.bot).size;
        const humansize = totalsize - botsize;
        message.guild
          .createChannel("📈RedBull Statistics📈", "category", [
            {
              id: message.guild.id,
              deny: ["CONNECT"]
            }
          ])
          .then(channel => {
            channel.setPosition(0);
            let w = channel.id;
            message.guild
              .createChannel("Total : " + totalsize, "voice", [
                {
                  id: message.guild.id,
                  deny: ["CONNECT"]
                }
              ])
              .then(channel1 => {
                channel1.setParent(channel.id);
                let x = channel1.id;
                message.guild
                  .createChannel("Humain  : " + humansize, "voice", [
                    {
                      id: message.guild.id,
                      deny: ["CONNECT"]
                    }
                  ])
                  .then(channel2 => {
                    channel2.setParent(channel.id);
                    let y = channel2.id;
                    message.guild
                      .createChannel("Robot : " + botsize, "voice", [
                        {
                          id: message.guild.id,
                          deny: ["CONNECT"]
                        }
                      ])
                      .then(async channel3 => {
                        channel3.setParent(channel.id);
                        let z = channel3.id;
                        message.channel.send(statsa);
                        mc[message.guild.id] = {
                          total: x,
                          humain: y,
                          robot: z,
                          categorie: w
                        };
                        counter();
                      });
                  });
              });
          });
      }
      break;
    case "membercount-off":
      {
        if (!message.member.hasPermission("MANAGE_GUILD"))
          return message.channel.send(`:x: **Permission insufisante.**`);
        if (!mc[message.guild.id])
          return message.channel.send(
            ":x: **Les statistiques ne sont pas activées sur ce serveur**."
          );
        let tout = mc[message.guild.id].total;
        let humain = mc[message.guild.id].humain;
        let robot = mc[message.guild.id].robot;
        let categorie = mc[message.guild.id].categorie;
        client.channels.get(tout).delete();
        client.channels.get(categorie).delete();
        client.channels.get(humain).delete();
        client.channels.get(robot).delete();
        delete mc[message.guild.id];
        message.channel.send(statsd);
      }
      break;
    case "antiraid-on":
      {
        if (!message.member.hasPermission("MANAGE_GUILD"))
          return message.channel.send(`:x: **Permission insufisante.**`);
        if (setup[message.guild.id])
          return message.channel.send(":x: **Antiraid deja activées**");
        message.channel.send(antiro).then(m=> 
          m.react("👌")
);
        setup[message.guild.id] = {
          antispam: "on"
        };
        add();
      }
      break;

    case "antiraid-off":
      {
        if (!message.member.hasPermission("MANAGE_GUILD"))
          return message.channel.send(`:x: **Permission insufisante.**`);
        if (!setup[message.guild.id])
          return message.channel.send(":x: **Antiraid pas activées**");
        delete setup[message.guild.id];
        message.channel.send(antird).then(m=>
            m.react('👌')
        );
      }
      break;
    case "add-bl":
    case "add-blacklist":
      {
        if (!al[blacklisted.id]) return;
        if (!member) {
          return message.channel.send(":x: **Aucun utilisateur mentionné**");
        }
        db[member.id] = {
          id: member.id,
          raison: reason,
          time: msg.createdAt,
          modo: message.author.username
        };
        saver();
        var ajoutbl = new Discord.RichEmbed()
          .setTitle(`:warning: **Personne ajouté** :warning:`)
          .setTimestamp()
          .setColor("RED")
          .setDescription(
            `**L'utilisateur** ${member} **a été ajouté dans la liste noir.**\n\nPar: ${db[member.id].modo}\n\nPour la raison: ${db[member.id].raison}`
          );
        message.channel.send(ajoutbl);
      }
      break;
    case "check-blacklist":
    case "check-bl":
      {
        if (!member) {
          return message.channel.send(":x: **Aucun utilisateur mentionné**");
        }
        if (!db[member.id]) {
          var blno = new Discord.RichEmbed()
            .setTitle(
              `:white_check_mark: **Rien a signaler** :white_check_mark:`
            )
            .setTimestamp()
            .setColor("GREEN")
            .setDescription(
              `**L'utilisateur** ${member} **n'est pas dans la liste noir.**`
            );
          message.channel.send(blno);
        } else if (db[member.id]) {
          var blyes = new Discord.RichEmbed()
            .setTitle(`:warning: **Attention** :warning:`)
            .setTimestamp()
            .setColor("RED")
            .setDescription(`**L'utilisateur** ${member} **est dans la liste noir.**\n\n
      Il a été ajouté le **${db[member.id].time}** par **${db[member.id].modo}** \n\n
      Pour la raison: **${db[member.id].raison}**`);
          msg.channel.send(blyes);
        }
      }
      break;
    case "delete-blacklist":
    case "delete-bl":
      {
        if (!al[blacklisted.id]) return;
        if (!member) {
          return message.channel.send(":x: **Aucun utilisateur mentionné**");
        }
        delete db[member.id];
        saver();
        var bldelete = new Discord.RichEmbed()
          .setTitle(`:green_book: **Super** :green_book:`)
          .setTimestamp()
          .setColor("GREEN")
          .setDescription(
            `**L'utilisateur** ${member} **a été retiré de la liste noir.**`
          );
        message.channel.send(bldelete);
      }
      break;
    case "add-admin":
    case "add-a":
      {
        if (!message.author.id === fonda_id) return;
        if (!member) {
          return message.channel.send(":x: **Aucun utilisateur mentionné**");
        }
        al[member.id] = {
          id: member.id
        };
        var ajoutal = new Discord.RichEmbed()
          .setTitle(`:white_check_mark: **Personne ajouté** :white_check_mark:`)
          .setTimestamp()
          .setColor("GREEN")
          .setDescription(
            `**L'utilisateur** ${member} **a été ajouté dans la liste des admins.**`
          );
        message.channel.send(ajoutal);
        sauver();
      }
      break;
    case "check-admin":
    case "check-a":
      {
        if (!member) {
          return message.channel.send(":x: **Aucun utilisateur mentionné**");
        }
        if (al[member.id]) {
          var ayes = new Discord.RichEmbed()
            .setTitle(`:white_check_mark: **Super** :white_check_mark:`)
            .setTimestamp()
            .setColor("GREEN")
            .setDescription(
              `**L'utilisateur** ${member} **est dans la liste des admins.**`
            );
          message.channel.send(ayes);
        } else if (!al[member.id]) {
          var ano = new Discord.RichEmbed()
            .setTitle(`:x: **Dommage** :x:`)
            .setTimestamp()
            .setColor("RED")
            .setDescription(
              `**L'utilisateur** ${member} **n'est pas dans la liste des admins.**`
            );
          msg.channel.send(ano);
        }
      }
      break;
    case "delete-admin":
    case "delete-a":
      {
        if (!message.author.id == fonda_id) return;
        if (!member) {
          return message.channel.send(":x: **Aucun utilisateur mentionné**");
        }
        delete al[member.id];
        sauver();
        var adelete = new Discord.RichEmbed()
          .setTitle(`:warning: **Mince** :warning:`)
          .setTimestamp()
          .setColor("RED")
          .setDescription(
            `**L'utilisateur** ${member} **a été retiré de la liste des admins :'(.**`
          );
        message.channel.send(adelete);
      }
      break;
    case "bi":
    case "bot-i":
    case "b-i":
    case "bot-info": {
      if (talkedRecently.has(message.author.id)) {
        message.channel
          .send(
            ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
          )
          .then(m =>
            setTimeout(() => {
              m.delete();
            }, 5000)
          );
        message.delete();
        return;
      }

      talkedRecently.add(message.author.id);
      setTimeout(() => {
        talkedRecently.delete(message.author.id);
      }, 5000);
      function mark(x) {
        return "``" + x + "``";
      }
      let botinfo = new Discord.RichEmbed()
        .setTitle("Bot Info")
        .setColor(color)
        .addField("➔ Name", mark(client.user.tag), true)
        .addField("➔ Id", mark(client.user.id), true)
        .addField("➔ Version", mark("1.7.0"), true)
        .addField("➔ Developers", mark("ogagal"), true)
        .addField("➔ Guilds", mark(client.guilds.size), true)
        .addField(
          "➔ Users",
          mark(
            client.guilds
              .map(guild => guild.memberCount)
              .reduce((a, b) => a + b)
          ),
          true
        )
        .setThumbnail(client.user.displayAvatarURL);
      msg.channel.send(botinfo).then(m =>
        setTimeout(() => {
          m.delete();
        }, 20000)
      );
      break;
    }
    case "say": {
      if (message.content.includes("discord.gg")) return;
      if (talkedRecently.has(message.author.id)) {
        message.channel
          .send(
            ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
          )
          .then(m =>
            setTimeout(() => {
              m.delete();
            }, 5000)
          );
        message.delete();
        return;
      }

      talkedRecently.add(message.author.id);
      setTimeout(() => {
        talkedRecently.delete(message.author.id);
      }, 5000);
      let say = new Discord.RichEmbed()
        .setDescription(args.join(" "))
        .setColor(color)
        .setTimestamp()
        .setFooter(`${client.user.username}`, `${client.user.avatarURL}`);
      msg.channel.send(say).then(m =>
        setTimeout(() => {
          m.delete();
        }, 20000)
      );
      break;
    }
    case "sinfo":
    case "s-info":
    case "si":
    case "serveur-i":
    case "serveur-info":
      {
        if (talkedRecently.has(message.author.id)) {
          message.channel
            .send(
              ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
            )
            .then(m =>
              setTimeout(() => {
                m.delete();
              }, 5000)
            );
          message.delete();
          return;
        }

        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 5000);

        function checkDays(date) {
          let now = new Date();
          let diff = now.getTime() - date.getTime();
          let days = Math.floor(diff / 86400000);
          return days + (days == 1 ? " day" : " days") + " ago";
        }
        let region = {
          brazil: ":flag_br: Brésil",
          "eu-central": ":flag_eu: Europe Central",
          singapore: ":flag_sg: Singapour",
          "us-central": ":flag_us: U.S. Central",
          sydney: ":flag_au: Sydney",
          "us-east": ":flag_us: U.S. Est",
          "us-south": ":flag_us: U.S. Sud",
          "us-west": ":flag_us: U.S. Ouest",
          "eu-west": ":flag_eu: Europe Occidentale",
          "vip-us-east": ":flag_us: VIP U.S. Est",
          london: ":flag_gb: Londre",
          amsterdam: ":flag_nl: Amsterdam",
          hongkong: ":flag_hk: Hong Kong",
          russia: ":flag_ru: Russie",
          southafrica: ":flag_za:  Africa du Sud"
        };
        const embed = new Discord.RichEmbed()
          .setColor(`${color}`)
          .setFooter(message.guild.name, message.guild.iconURL)
          .addField("__Nom:__", message.guild.name, true)
          .addField("__ID:__", message.guild.id, true)
          .addField("__Region:__", `${message.guild.region}`, true)
          .addField(
            "__**All** | **Users** | **Bots**__",
            `${message.guild.members.size} membres au total | ${
              message.guild.members.filter(member => !member.user.bot).size
            } humains | ${
              message.guild.members.filter(member => member.user.bot).size
            } bots`,
            true
          )
          .addField("__Channels:__", message.guild.channels.size, true)
          .addField("__Roles:__", message.guild.roles.size, true)
          .addField(
            "__Date de creation:__",
            `${message.channel.guild.createdAt
              .toUTCString()
              .substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`,
            true
          )
          .setThumbnail(message.guild.iconURL);
        if (!message.guild.owner) {
          message.channel.send(embed);
        } else
          embed.addField(
            "__Fonda:__",
            `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`,
            true
          );
        message.channel.send(embed);
      }
      break;
    case "ui":
    case "user-info":
    case "u-info":
    case "user-i":
    case "user-info":
      {
        args[0] = message.mentions.members.first();
        var usermentions = args[0];
        if (talkedRecently.has(message.author.id)) {
          message.channel
            .send(
              ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
            )
            .then(m =>
              setTimeout(() => {
                m.delete();
              }, 5000)
            );
          message.delete();
          return;
        }

        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 5000);
        if (!usermentions) {
          message.channel.send(":x: **Veuillez mentionner un utilisateur**!");
        } else {
          let ui = new Discord.RichEmbed()
            .setDescription(`__User informations : ${args[0]}__`)
            .setThumbnail(usermentions.user.displayAvatarURL)
            .addField(`__ID :__`, usermentions.id)
            .addField(`__Username :__`, usermentions.user.username)
            .addField(`__Tag :__`, usermentions.user.discriminator)
            .addField(
              `__Lien du dernier message : __`,
              "https://discordapp.com/channels/" +
                message.guild.id +
                "/" +
                message.channel.id +
                "/" +
                usermentions.user.lastMessageID
            )
            .addField(`__Créé le :__`, usermentions.user.createdAt)
            .addField(`__Bot :__`, usermentions.user.bot)
            .addField(`__Presence :__`, usermentions.user.presence.status)
            .setColor(color);
          message.channel.send(ui);
        }
      }
      break;

    case "pp":
    case "avatar": {
      if (talkedRecently.has(message.author.id)) {
        message.channel
          .send(
            ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
          )
          .then(m =>
            setTimeout(() => {
              m.delete();
            }, 20000)
          );
        message.delete();
        return;
      }

      talkedRecently.add(message.author.id);
      setTimeout(() => {
        talkedRecently.delete(message.author.id);
      }, 5000);
      let UserInfo = message.mentions.members.first() || message.member;
      if (!UserInfo)
        return message.channel.sendMessage(":x: **Utilisateur introuvable!**");
      let pp_embed = new Discord.RichEmbed()
        .setTitle("Photo De Profil")
        .setTimestamp(new Date())
        .setColor(color)
        .setImage(UserInfo.user.avatarURL);
      message.channel.send(pp_embed);
      break;
    }
    case "ban":
    case "kick":
      {
        let mentionned_user_y = msg.mentions.users.first();
        let id_xy =
          mentionned_user_y !== undefined ? mentionned_user_y.id : args[0];
        let victim = msg.guild.members.find(x => x.id === id_xy);
        let reason = args.slice(1).join(" ");

        // conditions
        if (!msg.member.hasPermission("KICK_MEMBERS"))
          return msg.reply(":x: **Permission insufisante**.").then(m =>
            setTimeout(() => {
              m.delete();
            }, 5000)
          );
        if (!args[0] || !victim)
          return msg.reply(":x: **Membre invalide**.").then(m =>
            setTimeout(() => {
              m.delete();
            }, 5000)
          );
        if (victim.hasPermission("KICK_MEMBERS"))
          return msg.reply(":x: **je ne peux pas bannir un admin**.").then(m =>
            setTimeout(() => {
              m.delete();
            }, 5000)
          );
        if (!msg.guild.member(victim).bannable)
          return msg.reply("**Le bot n'a pas les perms**").then(m =>
            setTimeout(() => {
              m.delete();
            }, 5000)
          );

        if (!reason)
          return msg.reply(":x: **Choisissez une raison**.").then(m =>
            setTimeout(() => {
              m.delete();
            }, 5000)
          );

        let date_user = msg.createdAt;
        let kick = new Discord.RichEmbed()
          .setTitle("kick Log")
          .addField("kick User", `${victim}`)
          .addField("kicked By", `<@${msg.author.id}>`)
          .addField(
            "Time",
            `${date_user.getDay()}/${date_user.getMonth()}/${date_user.getFullYear()}`
          )
          .addField("Reason et kick ID", reason);

        let ban = new Discord.RichEmbed()
          .setTitle("Ban Log")
          .addField("Banned User", `${victim}`)
          .addField("Banned By", `<@${msg.author.id}>`)
          .addField(
            "Time",
            `${date_user.getDay()}/${date_user.getMonth()}/${date_user.getFullYear()}`
          )
          .addField("Reason et Ban ID", reason);

        // action
        if (command === "ban") {
          if (talkedRecently.has(message.author.id)) {
            message.channel
              .send(
                ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
              )
              .then(m =>
                setTimeout(() => {
                  m.delete();
                }, 5000)
              );
            message.delete();
            return;
          }

          talkedRecently.add(message.author.id);
          setTimeout(() => {
            talkedRecently.delete(message.author.id);
          }, 5000);
          victim
            .ban(reason)
            .then(() => {
              let logs = message.guild.channels.find(
                channels => channels.name === "redbull-logs"
              );
              if (!logs) {
                message.guild.owner
                  .send(
                    ":x: **Il semblerait que vous n'avez pas les salons logs sur **" +
                      `${message.guild.name} faites ${prefix}setup`
                  )
                  .catch(err => console.log(err));
                return;
              } else message.reply(victim.user.username + "** a été banni**");
              logs.send(ban);
            })
            .catch(() => {
              return msg.reply(":x: **Impossible**").then(m =>
                setTimeout(() => {
                  m.delete();
                }, 20000)
              );
            });
        }
        if (command === "kick") {
          if (talkedRecently.has(message.author.id)) {
            message.channel
              .send(
                ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
              )
              .then(m =>
                setTimeout(() => {
                  m.delete();
                }, 5000)
              );
            message.delete();
            return;
          }

          talkedRecently.add(message.author.id);
          setTimeout(() => {
            talkedRecently.delete(message.author.id);
          }, 5000);
          victim
            .kick(reason)
            .then(() => {
              let logs = message.guild.channels.find(
                channels => channels.name === "redbull-logs"
              );
              if (!logs) {
                message.guild.owner
                  .send(
                    ":x: **Il semblerait que vous n'avez pas les salons logs sur **" +
                      `${message.guild.name} faites ${prefix}setup`
                  )
                  .catch(err => console.log(err));
                return;
              }
              message.reply(victim.user.username + "** a été kick**");
              logs.channel.send(kick);
            })
            .catch(() => {
              return msg.reply(":x: **Impossible**").then(m =>
                setTimeout(() => {
                  m.delete();
                }, 5000)
              );
            });
        }
      }
      break;
    case "purge":
    case "clear": {
      if (talkedRecently.has(message.author.id)) {
        message.channel
          .send(
            ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
          )
          .then(m =>
            setTimeout(() => {
              m.delete();
            }, 5000)
          );
        message.delete();
        return;
      }

      talkedRecently.add(message.author.id);
      setTimeout(() => {
        talkedRecently.delete(message.author.id);
      }, 5000);
      const deleteCount = parseInt(args[0], 10);
      async function clear() {
        // get the delete count, as an actual number.
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
          message.channel
            .send(
              ":x: **Tu n'as pas la permission d'utiliser cette commande!**"
            )
            .then(m =>
              setTimeout(() => {
                m.delete();
              }, 5000)
            );
        } else {
          // Ooooh nice, combined conditions. <3
          if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
            message.channel.send(":x: **Choisis un nombre entre 2 et 100**");
          }
          message.delete();
          const fetched = await message.channel.fetchMessages({
            limit: deleteCount
          });
          message.channel.bulkDelete(fetched);
          message.channel
            .sendMessage(`suppression reussite`)
            .catch(error =>
              message.reply(
                `:x: **impossible de suprimer les messages car:** ${error}`
              )
            );
        }
      }
      clear();
      break;
    }
    case "lien":
    case "invitation":
    case "bot":
    case "invite":
      {
        if (talkedRecently.has(message.author.id)) {
          message.channel
            .send(
              ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
            )
            .then(m =>
              setTimeout(() => {
                m.delete();
              }, 5000)
            );
          message.delete();
          return;
        }

        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 5000);
        msg.reply(lien).then(m =>
          setTimeout(() => {
            m.delete();
          }, 20000)
        );
      }
      break;
    case "voice-kick": {
      if (!message.member.hasPermission("MANAGE_CHANNELS")) {
        message.channel
          .send(":x: **Tu n'as pas la permission d'utiliser cette commande!**")
          .then(m =>
            setTimeout(() => {
              m.delete();
            }, 5000)
          );
      } else if (talkedRecently.has(message.author.id)) {
        message.channel
          .send(
            ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
          )
          .then(m =>
            setTimeout(() => {
              m.delete();
            }, 5000)
          );
        message.delete();
        return;
      }

      talkedRecently.add(message.author.id);
      setTimeout(() => {
        talkedRecently.delete(message.author.id);
      }, 5000);
      // déclarations
      let user = msg.mentions.users.first();
      if (!user) {
        msg.channel.send(":x: **Mentionner un utilisateur**.").then(m =>
          setTimeout(() => {
            m.delete();
          }, 5000)
        );
        return;
      }
      let kickMention = msg.guild.members.get(user.id);
      if (kickMention) {
        if (!kickMention.voiceChannel) {
          msg.channel
            .sendMessage(
              `:x: **${user.username} n'est pas dans un salon voc**..`
            )
            .then(m =>
              setTimeout(() => {
                m.delete();
              }, 5000)
            );
        } else {
          msg.guild
            .createChannel(`kick`, `voice`)
            .then(channel => {
              setTimeout(() => {
                kickMention.setVoiceChannel(channel);
              }, 1000);
              setTimeout(() => {
                msg
                  .edit(`J'ai kick **${user.username}** du salon vocal.`)
                  .then(m =>
                    setTimeout(() => {
                      m.delete();
                    }, 5000)
                  );
                channel.delete();
              }, 1500);
            })
            .catch(error => {
              msg.channel
                .sendMessage(`:x: **Je ne peux pas kick ${user.username}**.`)
                .then(m =>
                  setTimeout(() => {
                    m.delete();
                  }, 5000)
                );
            });
        }
      }
      break;
    }
    case "8ball":
      {
        if (talkedRecently.has(message.author.id)) {
          message.channel
            .send(
              ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
            )
            .then(m =>
              setTimeout(() => {
                m.delete();
              }, 5000)
            );
          message.delete();
          return;
        }

        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 5000);
        let argj = message.content.split(" ").splice(1);
        var eightball = [
          // sets the answers to an eightball
          "oui!",
          "non...",
          "peut etre?",
          "probablement",
          "je ne pense pas.",
          "jamais!",
          "tu peux essayer..."
        ];
        if (argj[1] != null)
          message.channel.sendMessage(
            "la reponse est: " +
              eightball[
                Math.floor(Math.random() * eightball.length).toString(16)
              ]
          );
        else
          message.channel
            .send(
              "Quelle est ta question? :rolling_eyes: (essayeplutot:" +
                prefix +
                " 8ball [question])"
            )
            .then(m =>
              setTimeout(() => {
                m.delete();
              }, 20000)
            );
      }
      break;
    case "setup":
      {
        if (talkedRecently.has(message.author.id)) {
          message.channel
            .send(
              ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
            )
            .then(m =>
              setTimeout(() => {
                m.delete();
              }, 5000)
            );
          message.delete();
          return;
        }

        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 5000);
        let logs = message.guild.channels.find(
          channels => channels.name === "redbull-logs"
        );
        if (!logs) {
          message.guild.createChannel("redbull-logs", "text");
          message.channel.send("**Channel créé avec succès**").then(m =>
            setTimeout(() => {
              m.delete();
            }, 20000)
          );
        } else
          message.channel.send(":x: **Le channel existe deja**").then(m =>
            setTimeout(() => {
              m.delete();
            }, 20000)
          );
      }
      break;
    case "unban-all": {
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.channel
          .send(":x: **Tu n'as pas la permission d'utiliser cette commande!**")
          .then(m =>
            setTimeout(() => {
              m.delete();
            }, 5000)
          );
      } else if (talkedRecently.has(message.author.id)) {
        message.channel
          .send(
            ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
          )
          .then(m =>
            setTimeout(() => {
              m.delete();
            }, 5000)
          );
        message.delete();
        return;
      }

      talkedRecently.add(message.author.id);
      setTimeout(() => {
        talkedRecently.delete(message.author.id);
      }, 5000);
      message.guild.fetchBans().then(bans => {
        bans.forEach(user => {
          message.guild.unban(user);
        });
        let unban = new Discord.RichEmbed()
          .setColor(color)
          .setTitle("**__Unban__**")
          .setDescription("```Tout les utilisateurs sont unban```");

        message.channel.send(unban).then(m =>
          setTimeout(() => {
            m.delete();
          }, 20000)
        );
      });
      break;
    }
    case "sondage":
      {
        if (talkedRecently.has(message.author.id)) {
          message.channel
            .send(
              ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
            )
            .then(m =>
              setTimeout(() => {
                m.delete();
              }, 5000)
            );
          message.delete();
          return;
        }

        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 5000);
        if (!message.member.hasPermission("MANAGE_MESSAGES"))
          return message.reply("Vous n'avez pas les permissions");
        var quest = message.content.split(" ").slice(1);
        let question = quest.join(" ");

        var sondage = new Discord.RichEmbed()
          .setTitle("Sondage simple ")
          .addField(question, " ✅ pour oui | ❌ pour non")
          .setColor(color);

        message.channel.send(sondage).then(function(message) {
          setTimeout(() => {
            message.react("✅");
          }, 500);
          setTimeout(() => {
            message.react("❌");
          }, 1000);
          clearInterval(setTimeout);
        });
      }
      break;
    case "lc":
    case "lovecalc": {
      if (talkedRecently.has(message.author.id)) {
        message.channel
          .send(
            ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
          )
          .then(m =>
            setTimeout(() => {
              m.delete();
            }, 5000)
          );
        message.delete();
        return;
      }

      talkedRecently.add(message.author.id);
      setTimeout(() => {
        talkedRecently.delete(message.author.id);
      }, 5000);
      let rep = [
        "5%",
        "10%",
        "15%",
        "20%",
        "25%",
        "30%",
        "35%",
        "40%",
        "45%",
        "50%",
        "55",
        "60%",
        "65%",
        "70%",
        "75%",
        "80%",
        "85%",
        "90%",
        "95%",
        "100%"
      ];
      let reptaille = Math.floor(Math.random() * rep.length);
      let question = message.mentions.users.first() || client.user;
      let embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag)
        .setColor(color)
        .setThumbnail(`${message.author.avatarURL}`)
        .addField("calcul d'une relation plausible ❤", question)
        .addField("relation estimée à ❤", rep[reptaille]);
      message.channel.send(embed).then(m =>
        setTimeout(() => {
          m.delete();
        }, 20000)
      );
      break;
    }
    case "ass":
      {
        if (!message.channel.nsfw)
          return message.channel.send(error).then(m =>
            setTimeout(() => {
              m.delete();
            }, 20000)
          );
        if (talkedRecently.has(message.author.id)) {
          message.channel
            .send(
              ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
            )
            .then(m =>
              setTimeout(() => {
                m.delete();
              }, 5000)
            );
          message.delete();
          return;
        }

        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 5000);
        superagent
          .get("https://nekobot.xyz/api/image")
          .query({ type: "ass" })
          .end((err, response) => {
            var ass = new Discord.RichEmbed()
              .setColor(color)
              .setTimestamp()
              .setImage(response.body.message)
              .setColor(color);
            msg.channel.send(ass);
          });
      }
      break;
    case "4k":
      {
        if (!message.channel.nsfw)
          return message.channel.send(error).then(m =>
            setTimeout(() => {
              m.delete();
            }, 20000)
          );
        if (talkedRecently.has(message.author.id)) {
          message.channel
            .send(
              ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
            )
            .then(m =>
              setTimeout(() => {
                m.delete();
              }, 5000)
            );
          message.delete();
          return;
        }

        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 5000);
        superagent
          .get("https://nekobot.xyz/api/image")
          .query({ type: "4k" })
          .end((err, response) => {
            var nk = new Discord.RichEmbed()
              .setTimestamp()
              .setImage(response.body.message)
              .setColor(color);
            msg.channel.send(nk);
          });
      }
      break;
    case "nsfw-gif": {
      if (!message.channel.nsfw)
        return message.channel.send(error).then(m =>
          setTimeout(() => {
            m.delete();
          }, 20000)
        );
      if (talkedRecently.has(message.author.id)) {
        message.channel
          .send(
            ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
          )
          .then(m =>
            setTimeout(() => {
              m.delete();
            }, 5000)
          );
        message.delete();
        return;
      }

      talkedRecently.add(message.author.id);
      setTimeout(() => {
        talkedRecently.delete(message.author.id);
      }, 5000);
      var gif1 = new Discord.RichEmbed();
      superagent
        .get("https://nekobot.xyz/api/image")
        .query({ type: "pgif" })
        .end((err, response) => {
          var gif1 = new Discord.RichEmbed()
            .setTimestamp()
            .setImage(response.body.message)
            .setColor(color);
          msg.channel.send(gif1);
        });
    }
    case "hentai":
      {
        if (!message.channel.nsfw)
          return message.channel.send(error).then(m =>
            setTimeout(() => {
              m.delete();
            }, 20000)
          );
        if (talkedRecently.has(message.author.id)) {
          message.channel
            .send(
              ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
            )
            .then(m =>
              setTimeout(() => {
                m.delete();
              }, 5000)
            );
          message.delete();
          return;
        }

        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 5000);
        var hentai = new Discord.RichEmbed();
        superagent
          .get("https://nekobot.xyz/api/image")
          .query({ type: "hentai_anal" })
          .end((err, response) => {
            var hentai = new Discord.RichEmbed()
              .setTimestamp()
              .setImage(response.body.message)
              .setColor(color);
            msg.channel.send(hentai);
          });
      }
      break;
    case "pussy": {
      if (!message.channel.nsfw)
        return message.channel.send(error).then(m =>
          setTimeout(() => {
            m.delete();
          }, 20000)
        );
      if (talkedRecently.has(message.author.id)) {
        message.channel
          .send(
            ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
          )
          .then(m =>
            setTimeout(() => {
              m.delete();
            }, 5000)
          );
        message.delete();
        return;
      }

      talkedRecently.add(message.author.id);
      setTimeout(() => {
        talkedRecently.delete(message.author.id);
      }, 5000);
      superagent
        .get("https://nekobot.xyz/api/image")
        .query({ type: "pussy" })
        .end((err, response) => {
          var pussy = new Discord.RichEmbed()
            .setTimestamp()
            .setImage(response.body.message)
            .setColor(color);
          msg.channel.send(pussy);
        });
    }
    case "thigh":
      {
        if (!message.channel.nsfw)
          return message.channel.send(error).then(m =>
            setTimeout(() => {
              m.delete();
            }, 20000)
          );
        if (talkedRecently.has(message.author.id)) {
          message.channel
            .send(
              ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
            )
            .then(m =>
              setTimeout(() => {
                m.delete();
              }, 5000)
            );
          message.delete();
          return;
        }

        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 5000);
        superagent
          .get("https://nekobot.xyz/api/image")
          .query({ type: "thigh" })
          .end((err, response) => {
            var thigh = new Discord.RichEmbed()
              .setTimestamp()
              .setImage(response.body.message)
              .setColor(color);
            msg.channel.send(thigh);
          });
      }
      break;
    case "anal":
      {
        if (!message.channel.nsfw)
          return message.channel.send(error).then(m =>
            setTimeout(() => {
              m.delete();
            }, 20000)
          );
        if (talkedRecently.has(message.author.id)) {
          message.channel
            .send(
              ":x: **Attendez 5 secondes avant la reutilisation de cette commande**"
            )
            .then(m =>
              setTimeout(() => {
                m.delete();
              }, 5000)
            );
          message.delete();
          return;
        }

        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 5000);
        superagent
          .get("https://nekobot.xyz/api/image")
          .query({ type: "anal" })
          .end((err, response) => {
            var anal = new Discord.RichEmbed()
              .setTimestamp()
              .setImage(response.body.message)
              .setColor(color);
            msg.channel.send(anal);
          });
      }
      break;
  }
});

client.on("guildCreate", guild => {
  guild.createChannel("redbull-logs", "text");
  let sicon = guild.iconURL;
  var date = guild.createdAt;
  var embed = new Discord.RichEmbed()
    .setTitle("Un nouveau serveur vient d'ajouter Le Bot !")
    .setColor("GREEN")
    .setThumbnail(sicon)
    .addField("`Nom du serveur ¬`", guild.name, false)
    .addField("`ID du Serveur ¬`", guild.id, false)
    .addField("`Createur du Serveur ¬`", guild.owner.user.tag, false)
    .addField(
      "`Serveur créé le ¬`",
      date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        " à " +
        date.getHours() +
        ":" +
        date.getMinutes(),
      true
    )
    .addField("`Utilisateurs ¬`", guild.memberCount, false)
    .addField("`Région ¬`", "Europe de l'Ouest", false);
  let channels = guild.channels.filter(
    channel =>
      channel.type === "text" &&
      channel
        .permissionsFor(guild.members.get(client.user.id))
        .has("SEND_MESSAGES")
  );
  if (channels.size > 0)
    channels
      .first()
      .send(
        "```" +
          `Merci de votre confiance en m'ajoutant sur ${guild.name} faites ${prefix}setup si le salon des logs ne s'est pas créé et faites ${prefix}help pour voir de quoi je suis capable.` +
          "```"
      );
  client.channels.get("721347069637558273").send({ embed });
  let myGuild = client.guilds.get("721099521299316826");
  let userscount = client.guilds
    .map(guild => guild.memberCount)
    .reduce((a, b) => a + b);
  let memberchannel = myGuild.channels.get("721347056479764531");
  let serveurscount = client.guilds.size;
  let memberCountChannel = myGuild.channels.get("721347054525480990");
  memberCountChannel.setName("Serveur•" + serveurscount);
  memberchannel.setName("User•" + userscount);
  client.user.setActivity(`${client.guilds.size} Servers | ${prefix}help`, {
    type: "WATCHING"
  });
});
client.on("guildDelete", guild => {
  var embed = new Discord.RichEmbed()
    .setDescription(
      `Le bot ne fait plus partit de  **${guild.name}** /  il y a avait  **${guild.memberCount} membres** !`
    )
    .setColor("RED");
  let myGuild = client.guilds.get("721099521299316826");
  let userscount = client.guilds
    .map(guild => guild.memberCount)
    .reduce((a, b) => a + b);
  let memberchannel = myGuild.channels.get("721347056479764531");
  let serveurscount = client.guilds.size;
  let memberCountChannel = myGuild.channels.get("721347054525480990");
  memberCountChannel.setName("Serveur•" + serveurscount);
  memberchannel.setName("User•" + userscount);
  client.user.setActivity("idle");
  client.channels.get("721347069637558273").send({ embed });
  client.user.setActivity(`${client.guilds.size} Servers | ${prefix}help`, {
    type: "WATCHING"
  });
});

client.on("message", message => {
  let msg = message;
  if (message.channel.type === "dm") return;
  if (!message.content.startsWith(prefix)) return;
  var args = message.content.substring(prefix.length).split(" ");
  try {
    let info = client.emojis.get("655091815401127966") || "ℹ️"; //https://cdn.discordapp.com/emojis/655091815401127966.png?v=1
    let waiting = client.emojis.get("655695570769412096") || "⌛"; //https://images-ext-1.discordapp.net/external/lWj3uW4qvfFB9t0QgGsDJ8vLvh5bSObQ-wwUxYFH4wo/https/images-ext-1.discordapp.net/external/AzWR8HxPJ4t4rPA1DagxJkZsOCOMp4OTgwxL3QAjF4U/https/cdn.discordapp.com/emojis/424900448663633920.gif
    let green = client.emojis.get("655696285286006784") || "✅"; //https://images-ext-2.discordapp.net/external/NU9I3Vhi79KV6srTXLJuHxOgiyzmEwgS5nFAbA13_YQ/https/cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-512.png
    let error = client.emojis.get("655704809483141141") || "❌"; //https://cdn.discordapp.com/emojis/655704809483141141.png?v=1
    let warning = client.emojis.get("656030540310380574") || "⚠️"; //https://cdn.discordapp.com/emojis/656030540310380574.png?v=1
    if (
      (msg.content === prefix + "backup create") |
      (msg.content == prefix + "backup c")
    ) {
      if (!msg.member.hasPermission("ADMINISTRATOR"))
        return msg.channel.send(":x: **Permission insufisante**.").then(m =>
          setTimeout(() => {
            m.delete();
          }, 5000)
        );
      let serveur = message.guild;
      if (!serveur) {
        message.channel.send(
          ":x: **Veuillez executer cette commande dans un serveur!**"
        );
        return;
      }
      message
        .reply(
          `${waiting}  **Please wait** ...\n\nCréation de la backup. Attendre la finalisation...\n\nRedBull Bot`
        )
        .catch(error =>
          console.log(
            "[",
            "ERROR".red,
            "]",
            "une erreur est survenue que je ne peux régler".green
          )
        )
        .then(m => {
          let id = makeid(16);

          const channels = message.guild.channels
            .sort(function(a, b) {
              return a.position - b.position;
            })
            .array()
            .map(c => {
              const channel = {
                type: c.type,
                name: c.name,
                postion: c.calculatedPosition
              };
              if (c.parent) channel.parent = c.parent.name;
              return channel;
            });

          const roles = message.guild.roles
            .filter(r => r.name !== "@everyone")
            .sort(function(a, b) {
              return a.position - b.position;
            })
            .array()
            .map(r => {
              const role = {
                name: r.name,
                color: r.color,
                hoist: r.hoist,
                permissions: r.permissions,
                mentionable: r.mentionable,
                position: r.position
              };
              return role;
            });

          if (!backups[message.author.id]) backups[message.author.id] = {};
          backups[message.author.id][id] = {
            icon: message.guild.iconURL,
            name: message.guild.name,
            owner: message.guild.ownerID,
            members: message.guild.memberCount,
            createdAt: message.guild.createdAt,
            roles,
            channels
          };

          save();
          console.log(
            `Nouvelle backup du serveur ${message.guild.name} vien d'être crée, voici son id : ${id}`
              .green
          );
          message.channel.send("**Regarde tes mp**");
          message.author
            .send(
              `${info}  **Info**\n\nNouvelle backup du serveur **${message.guild.name}** vien d'etre créée \n\n \`\`\`id: ${id}\`\`\`\n\n**${prefix}backup load (id)** Pour load la backup`
            )
            .catch(error =>
              console.log(
                "[",
                "ERROR".red,
                "]",
                "une erreur est survenue que je ne peux régler".green
              )
            );
        });
    }

    if (msg.content.startsWith(prefix + "backup delete")) {
      if (!msg.member.hasPermission("ADMINISTRATOR"))
        return msg.channel.send(":x: **Permission insufisante**.").then(m =>
          setTimeout(() => {
            m.delete();
          }, 5000)
        );
      let serveur = message.guild;
      if (!serveur) {
        message.channel.send(
          ":x: **Veuillez executer cette commande dans un serveur!**"
        );
        return;
      }
      let code = args.splice(2).join(" ");
      let errorEmbed = new Discord.RichEmbed()
        .setTitle(`${error} Erreur`)
        .setDescription(
          `Tu dois définir ton id de backup... Fais ${prefix}help pour avoir plus d'informations.`
        )
        .setColor(color);
      if (!code)
        return message.channel
          .send(errorEmbed)
          .catch(error =>
            console.log(
              "[",
              "ERROR".red,
              "]",
              "une erreur est survenue que je ne peux régler".green
            )
          );

      let cantfindbackup = new Discord.RichEmbed()
        .setTitle(`${error}  Error`)
        .addField(
          `**Tu n'a pas de backup avec cette id : ${code}.**`,
          prefix + "help pour plus d'informations"
        )
        .setColor(color);
      if (!backups[message.author.id][code])
        return message.channel
          .send(cantfindbackup)
          .catch(error =>
            console.log(
              "[",
              "ERROR".red,
              "]",
              "une erreur est survenue que je ne peux régler".green
            )
          );

      delete backups[message.author.id][code];
      save();

      let deletedsuc = new Discord.RichEmbed()
        .setTitle(`${green}  Succès !`)
        .setDescription(`La **backup** a bien été supprimée.`)
        .setColor(color);
      message.channel
        .send(deletedsuc)
        .catch(error =>
          console.log(
            "[",
            "ERROR".red,
            "]",
            "une erreur est survenue que je ne peux régler".green
          )
        );
    }

    if (
      msg.content.startsWith(prefix + "backup load") ||
      msg.content.startsWith(prefix + "backup l")
    ) {
      if (!msg.member.hasPermission("ADMINISTRATOR"))
        return msg.channel.send(":x: **Permission insufisante**.").then(m =>
          setTimeout(() => {
            m.delete();
          }, 5000)
        );
      let serveur = message.guild;
      if (!serveur) {
        message.channel.send(
          ":x: **Veuillez executer cette commande dans un serveur!**"
        );
        return;
      }
      let error = client.emojis.get("655704809483141141") || "❌";
      let code = args.splice(2).join(" ");
      let errorEmbed = new Discord.RichEmbed()
        .setTitle(`${error}  Error`)
        .setDescription(
          `Tu as oublié de définir une **id de backup**. Utilise la commande \`${prefix}help\` pour avoir plus d'informations`
        );
      if (!code) return message.channel.send(errorEmbed);
      let cantfindbackup = new Discord.RichEmbed()
        .setTitle(`${error}  Error`)
        .addField(
          `**Aucune backup avec l'id ${code}.**`,
          prefix + "help pour plus d'information"
        )
        .setColor(color);
      if (!backups[message.author.id][code])
        return message.channel
          .send(cantfindbackup)
          .catch(error =>
            console.log(
              "[",
              "ERROR".red,
              "]",
              "une erreur est survenue que je ne peux régler".green
            )
          );
      message.guild.channels.forEach(channel => {
        channel.delete("For Loading A Backup");
      });

      message.guild.roles
        .filter(role => role.members.every(member => !member.user.bot))
        .forEach(role => {
          role.delete("For Loading A Backup");
        });
      backups[message.author.id][code].roles.forEach(async function(role) {
        message.guild
          .createRole({
            name: role.name,
            color: role.color,
            permissions: role.permissions,
            hoist: role.hoist,
            mentionable: role.mentionable,
            position: role.position
          })
          .then(role => {
            role.setPosition(role.position);
          });
      });

      backups[message.author.id][code].channels
        .filter(c => c.type === "category")
        .forEach(async function(ch) {
          message.guild.createChannel(ch.name, {
            type: ch.type,
            permissionOverwrites: ch.permissionOverwrites
          });
        });

      backups[message.author.id][code].channels
        .filter(c => c.type !== "category")
        .forEach(async function(ch) {
          message.guild
            .createChannel(ch.name, {
              type: ch.type,
              permissionOverwrites: ch.permissionOverwrites
            })
            .then(c => {
              const parent = message.guild.channels
                .filter(c => c.type === "category")
                .find(c => c.name === ch.parent);
              ch.parent ? c.setParent(parent) : "";
            });
        });
      message.guild.setName(backups[message.author.id][code].name);
      message.guild.setIcon(backups[message.author.id][code].icon);
    }
    if (
      msg.content.startsWith(prefix + "backup info") ||
      msg.content.startsWith(prefix + "backup i")
    ) {
      let id = args.splice(2).join(" ");
      let MissingbackupinfoEmbed = new Discord.RichEmbed()
        .setTitle(`${error}  Error`)
        .setDescription(
          `Tu as oublié de définir une **id de backup**. Utilise la commande \`${prefix}help\` pour avoir plus d'informations`
        )
        .setColor(color);
      if (!id)
        return message.channel
          .send(MissingbackupinfoEmbed)
          .catch(error =>
            console.log(
              "[",
              "ERROR".red,
              "]",
              "une erreur est survenue que je ne peux régler".green
            )
          );

      let cantfindEmbed = new Discord.RichEmbed()
        .setTitle(`${error}  Error`)
        .setDescription(`Tu n'as pas de **backup** avec cet id \`${id}\`.`)
        .setColor(color);
      if (!backups[message.author.id][id])
        return message.channel.send(cantfindEmbed);

      try {
        let infoEmbed = new Discord.RichEmbed()
          .setTitle(backups[message.author.id][id].name)
          .setThumbnail(backups[message.author.id][id].icon)
          .addField(
            "Creator",
            `<@${backups[message.author.id][id].owner}>`,
            true
          )
          .addField("Members", backups[message.author.id][id].members, true)
          .addField("Created At", backups[message.author.id][id].createdAt)
          .addField(
            "Channels",
            `\`\`\`${backups[message.author.id][id].channels
              .map(channel => channel.name)
              .join("\n")}\`\`\``,
            true
          )
          .addField(
            "Roles",
            `\`\`\`${backups[message.author.id][id].roles
              .map(role => role.name)
              .join("\n")}\`\`\``,
            true
          );
        message.channel.send(infoEmbed);
      } catch (e) {
        hastebins(
          backups[message.author.id][id].channels
            .map(channel => channel.name)
            .join("\n"),
          "txt"
        ).then(ch => {
          hastebins(
            backups[message.author.id][id].roles
              .map(role => role.name)
              .join("\n"),
            "txt"
          ).then(ro => {
            let infoEmbed = new Discord.RichEmbed()
              .setTitle(backups[message.author.id][id].name)
              .setThumbnail(backups[message.author.id][id].icon)
              .addField(
                "Creator",
                `<@${backups[message.author.id][id].owner}>`,
                true
              )
              .addField("Members", backups[message.author.id][id].members, true)
              .addField("Created At", backups[message.author.id][id].createdAt)
              .addField("Channels", ch, true)
              .addField("Roles", ro, true);
            message.channel
              .send(infoEmbed)
              .catch(error =>
                console.log(
                  "[",
                  "ERROR".red,
                  "]",
                  "une erreur est survenue que je ne peux régler".green
                )
              );
          });
        });
      }
    }

    if (msg.content.startsWith(prefix + "backup purge")) {
      let errorEmbed = new Discord.RichEmbed()
        .setTitle(`${error}  Error`)
        .setDescription(`Vous n'avez pas encore sauvegardé de serveur`)
        .setColor(color);
      if (!backups[message.author.id])
        return message.channel
          .send(errorEmbed)
          .catch(error =>
            console.log(
              "[",
              "ERROR".red,
              "]",
              "une erreur est survenue que je ne peux régler".green
            )
          );

      let warningEmbed = new Discord.RichEmbed().setTitle(`${warning}  Warning`)
        .setDescription(`Es-tu sûr de vouloir supprimer toutes tes backups ?
__Cette action est irréversible !__`);
      let sur = new Discord.RichEmbed()
        .setColor(color)
        .setTitle("Oui/Non")
        .addField(
          "Etes vous sur de vouloir supprimer toutes vos backups???",
          "Oui/Non"
        );
      message.channel.send(sur).then(() => {
        message.channel
          .awaitMessages(response => response.content === "Oui", {
            max: 1,
            time: 30000,
            errors: ["time"]
          })
          .then(collected => {
            delete backups[message.author.id];

            let deletedsuc = new Discord.RichEmbed()
              .setTitle(`${green}  Voila!`)
              .setDescription(`Deleted all your backups.`)
              .setColor(color);
            message.channel
              .send(deletedsuc)
              .catch(error =>
                console.log(
                  "[",
                  "ERROR".red,
                  "]",
                  "une erreur est survenue que je ne peux régler".green
                )
              );
            msg.delete();
          });
      });
    }

    function makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    function save() {
      fs.writeFile("./Data/backups.json", JSON.stringify(backups), err => {
        if (err) console.error(err);
      });
    }
  } catch (e) {
    throw e;
  }
});

function sauver() {
  fs.writeFile("./Data/adminlist.json", JSON.stringify(al), err => {
    if (err) console.error(err);
  });
}

function saver() {
  fs.writeFile("./Data/blacklist.json", JSON.stringify(db), err => {
    if (err) console.error(err);
  });
}

function add() {
  fs.writeFile("./Data/setup.json", JSON.stringify(setup), err => {
    if (err) console.error(err);
  });
}

function counter() {
  fs.writeFile("./Data/membercount.json", JSON.stringify(mc), err => {
    if (err) console.error(err);
  });
}

client.on("guildMemberRemove", member => {
  let logs = member.guild.channels.find(
    channels => channels.name === "redbull-logs"
  );
  if (!logs) return;
  const cio_embed = new Discord.RichEmbed()
    .setTitle("**Discord leave log:**")
    .setDescription(
      "\n\n**" +
        member.user.username +
        " vient de partir de notre serveur. !!** :point_right::door:" +
        `\n(**Nous sommes ${member.guild.memberCount}**)`
    )
    .setColor("#fd4f00");
  logs.send(cio_embed);
});

client.on("guildMemberAdd", member => {
  let logs = member.guild.channels.find(
    channels => channels.name === "redbull-logs"
  );
  if (!logs) return;
  const cc_embed = new Discord.RichEmbed()
    .setTitle("**Discord join log:**")
    .setDescription(
      member.user.username +
        " **vient de rejoindre notre serveur.** !! :partying_face: :clap:" +
        `\n(**Nous sommes ${member.guild.memberCount}**)`
    )
    .setColor("#43ff00");
  logs.send(cc_embed);
});



client.on("guildMemberRemove", member => {
  const totalsize = member.guild.memberCount;
  const botsize = member.guild.members.filter(m => m.user.bot).size;
  const humansize = totalsize - botsize;
  if (!mc[member.guild.id]) return;
  let tout = mc[member.guild.id].total;
  let human = mc[member.guild.id].humain;
  let bot = mc[member.guild.id].robot;
  client.channels.get(tout).setName("Total : " + totalsize);
  client.channels.get(human).setName("Humain : " + humansize);
  client.channels.get(bot).setName("Robot : " + botsize);
});

client.on("guildMemberAdd", member => {
  const totalsize = member.guild.memberCount;
  const botsize = member.guild.members.filter(m => m.user.bot).size;
  const humansize = totalsize - botsize;
  if (!mc[member.guild.id]) return;
  let tout = mc[member.guild.id].total;
  let human = mc[member.guild.id].humain;
  let bot = mc[member.guild.id].robot;
  client.channels.get(tout).setName("Total : " + totalsize);
  client.channels.get(human).setName("Humain : " + humansize);
  client.channels.get(bot).setName("Robot : " + botsize);
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  let logs = oldMember.guild.channels.find(
    channels => channels.name === "redbull-logs"
  );
  if (!logs) return;

  let username = oldMember.displayName;
  let oldVCID = oldMember.voiceChannelID;
  let newVCID = newMember.voiceChannelID;

  let oldChannelName =
    oldVCID != null && typeof oldVCID != undefined
      ? client.channels.get(oldVCID).name
      : null;
  let newChannelName =
    newVCID != null && typeof newVCID != undefined
      ? client.channels.get(newVCID).name
      : null;

  let Embed = new Discord.RichEmbed()
    .setTitle("**Discord voice log:**")
    .setColor(color)
    .setDescription(`**${username} a rejoint le channel:** ${newChannelName}`);

  let vembed = new Discord.RichEmbed()
    .setTitle("**Discord voice log:**")
    .setColor(color)
    .setDescription(`**${username} s'est deconnecté**`);

  let logembed = new Discord.RichEmbed()
    .setTitle("**Discord voice log:**")
    .setColor(color)
    .setDescription(`**${username} a été move dans** ${newChannelName}`);

  if (oldChannelName === null) logs.sendMessage(Embed);
  else if (newChannelName === null) logs.sendMessage(vembed);
  else logs.sendMessage(logembed);
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  if (newMessage.author.bot) return;
  let logs = oldMessage.guild.channels.find(
    channels => channels.name === "redbull-logs"
  );
  if (!logs) return;
  let embed = new Discord.RichEmbed()
    .setTitle("**Discord message modifié log:**")
    .setColor(color)
    .setDescription(
      "**L'utilisateur ${oldMessage.author.username} a edité son message**\n\n\n"+ "**Ancien contenu:**     " + `${oldMessage}` + "\n\n**Nouveau contenu:**     " +  `${newMessage}`
    );

  logs.send(embed);
});

client.on("messageDelete", message => {
  if (message.author.bot) return;
  let logs = message.guild.channels.find(
    channels => channels.name === "redbull-logs"
  );
  if (!logs) return;
  let embed = new Discord.RichEmbed()
    .setTitle("**Discord message delete log:**")
    .setColor(color)
    .setDescription(
      `**L'utilisateur ${message.author.username} a supprimé le message:** \`\`\`${message.content}\`\`\``
    );

  logs.send(embed);
});

client.on("guildMemberUpdate", function(oldMember, newMember) {
  var Changes = {
    unknown: 0,
    addedRole: 1,
    removedRole: 2,
    username: 3,
    nickname: 4,
    avatar: 5
  };
  var change = Changes.unknown;

  var removedRole = "";
  oldMember.roles.every(function(value) {
    if (newMember.roles.find("id", value.id) == null) {
      change = Changes.removedRole;
      removedRole = value.name;
    }
  });

  var addedRole = "";
  newMember.roles.every(function(value) {
    if (oldMember.roles.find("id", value.id) == null) {
      change = Changes.addedRole;
      addedRole = value.name;
    }
  });

  if (newMember.user.username != oldMember.user.username) {
    change = Changes.username;
  }

  if (newMember.nickname != oldMember.nickname) {
    change = Changes.nickname;
  }

  if (newMember.user.avatarURL != oldMember.user.avatarURL) {
    change = Changes.avatar;
  }

  var log = newMember.guild.channels.find("name", "redbull-logs");
  if (log != null) {
    switch (change) {
      case Changes.addedRole:
        let logembed = new Discord.RichEmbed()
          .setTitle("**Discord role update log:**")
          .setColor(color)
          .setDescription(
            `**Un role a été ajouté a ${newMember.user.username}** \n**Role ajouté:** ${addedRole}`
          );

        log.sendMessage(logembed);
        break;
      case Changes.removedRole:
        let lembed = new Discord.RichEmbed()
          .setTitle("**Discord role update log:**")
          .setColor(color)
          .setDescription(
            `**Un role a été suprimé a ${newMember.user.username} **\n**Role retiré:** ${removedRole}`
          );

        log.sendMessage(lembed);
        break;
      case Changes.username:
        let zembed = new Discord.RichEmbed()
          .setTitle("**Discord pseudo log:**")
          .setColor(color)
          .setDescription(
            `**Un utilisateur a changé son nom pseudo**\n\n**Utilisateur:** ${newMember.user.username}\n**Ancien pseudo:** \`\`\`${oldMember.user.tag}\`\`\`\n**Nouveau pseudo:** \`\`\`${newMember.user.tag}\`\`\``
          );

        log.sendMessage(zembed);
        break;
      case Changes.nickname:
        let loged = new Discord.RichEmbed()
          .setTitle("**Discord nickname log:**")
          .setColor(color)
          .setDescription(
            `**Un utilisateur a changé son nickname** ${newMember.user.username}\n` +
              (oldMember.nickname != null
                ? "\n**Ancien nickname:** ```" +
                  oldMember.nickname +
                  "```" +
                  "**Nouveau nickname:** \n```" +
                  newMember.nickname +
                  "```"
                : "\n**Nouveau nickname:**") +
              (newMember.nickname != null
                ? "```" + newMember.nickname + "```"
                : " ")
          );
        log.sendMessage(loged);
        break;
      case Changes.avatar:
        let pplog = new Discord.RichEmbed()
          .setTitle("**Discord membre avatar log:**")
          .setColor(color)
          .setImage(newMember.user.avatar);
        log.sendMessage(pplog);
        break;
      case Changes.unknown:
        let embed = new Discord.RichEmbed()
          .setTitle("**Discord membre update log:**")
          .setColor(color)
          .setDescription(
            `**L'utilisateur ${newMember.user.username} a été mis a jour**`
          );

        log.sendMessage(embed);
        break;
    }
  }
});

client.login(token);

