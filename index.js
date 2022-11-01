(async()=>{
    // default imports
    const events = require('events');
    const { exec } = require("child_process")
    const logs = require("discord-logs")
    const Discord = require("discord.js")
    const { 
        MessageEmbed, 
        MessageButton, 
        MessageActionRow, 
        Intents, 
        Permissions, 
        MessageSelectMenu 
    }= require("discord.js")
    const fs = require('fs');
    let process = require('process');
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // block imports
    const os = require("os-utils");
    const ms = require("ms")
    let https = require("https")
    
    // define s4d components (pretty sure 90% of these arnt even used/required)
    let s4d = {
        Discord,
        fire:null,
        joiningMember:null,
        reply:null,
        player:null,
        manager:null,
        Inviter:null,
        message:null,
        notifer:null,
        checkMessageExists() {
            if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
            if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
        }
    };

    // create a new discord client
    s4d.client = new s4d.Discord.Client({
        intents: [
            Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)
        ],
        partials: [
            "REACTION", 
            "CHANNEL"
        ]
    });

    // when the bot is connected say so
    s4d.client.on('ready', () => {
        console.log(s4d.client.user.tag + " is alive!")
    })

    // upon error print "Error!" and the error
    process.on('uncaughtException', function (err) {
        console.log('Error!');
        console.log(err);
    });

    // give the new client to discord-logs
    logs(s4d.client);

    // pre blockly code
    

    // blockly code
    var prefix, welcome_title, welcome_description, purge_msg, help_server, embed_title, embed_description, embed_image, embed_color;
    
    function colourRandom() {
      var num = Math.floor(Math.random() * Math.pow(2, 24));
      return '#' + ('00000' + num.toString(16)).substr(-6);
    }
    
    
    await s4d.client.login(process.env.TOKEN).catch((e) => {
            const tokenInvalid = true;
            const tokenError = e;
            if (e.toString().toLowerCase().includes("token")) {
                throw new Error("An invalid bot token was provided!")
            } else {
                throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
            }
        });
    
    s4d.client.on('ready', async () => {
      prefix = '+';
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == String(prefix) + 'welcomedm') {
        if ((s4dmessage.member).permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
          (s4dmessage.channel).send({embeds: [{
          color: String('#3366ff'),
          title: String('> Quelle sera le titre du message de bienvenue ?'),
          description: String('> Choisissez le titre du message de Bienvenue '),
          }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.member).id,  time: (5*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
           s4d.message = collected.first();
             welcome_title = (s4d.reply);
            (s4dmessage.channel).send({embeds: [{
            color: String('#3366ff'),
            title: String('> Quelle sera la description du message de bienvenue ?'),
            description: String('> Choisir la description du message de bienvenue en dm '),
            }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.member).id,  time: (5*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
             s4d.message = collected.first();
               welcome_description = (s4d.reply);
              s4dmessage.channel.send({embeds: [{
              color: String('#3366ff'),
              title: String('> chargement de l\'apperçu...'),
              description: String('> Merci de patienter 3 secondes'),
              }]}).then(async (s4dreply) =>{
                 await delay(Number(3)*1000);
                s4dreply.delete();
    
              });
              s4dmessage.channel.send({content:String('> **Chargement...**')}).then(async (s4dreply) =>{
                 await delay(Number(1)*1000);
                s4dreply.delete();
    
              });
              s4dmessage.channel.send({content: String('> ' + '{ping membre}'), embeds: [{
              color: String('#3366ff'),
              title: String(welcome_title),
              description: String(welcome_description),
              image: {
                          url: String('https://www.designyourway.net/blog/wp-content/uploads/2017/03/Anime-Wallpaper-Desktop-Background-29.jpg')
                      },
              }]});
    
             s4d.reply = null; }).catch(async (e) => { console.error(e);   s4dmessage.channel.send({embeds: [{
              color: String('#ff0000'),
              title: String('Temp écoulé'),
              description: String('> 5 minutes sont écoulés...'),
              }]});
             });
            })
    
           s4d.reply = null; }).catch(async (e) => { console.error(e);   s4dmessage.channel.send({embeds: [{
            color: String('#ff0000'),
            title: String('Temp écoulé'),
            description: String('> 5 minutes sont écoulés...'),
            }]});
           });
          })
        } else {
          s4dmessage.channel.send({embeds: [{
          color: String('#ff0000'),
          title: String('> Permission manquante'),
          description: String('> Il vous manque la permission : manager server'),
          }]}).then(async (s4dreply) =>{
             await delay(Number(3)*1000);
            s4dreply.delete();
    
          });
        }
      }
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == String(prefix) + 'seewelcomedm') {
        if ((s4dmessage.member).permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
          s4dmessage.channel.send({content: String('{ping membre}'), embeds: [{
          color: String('#3366ff'),
          title: String(welcome_title),
          description: String(welcome_description),
          image: {
                      url: String('https://www.designyourway.net/blog/wp-content/uploads/2017/03/Anime-Wallpaper-Desktop-Background-29.jpg')
                  },
          }]});
        } else {
          s4dmessage.channel.send({embeds: [{
          color: String('#ff0000'),
          title: String('> Permission manquante'),
          description: String('> **Il vous manque la permission : manager server**'),
          }]}).then(async (s4dreply) =>{
             await delay(Number(3)*1000);
            s4dreply.delete();
    
          });
        }
      }
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == String(prefix) + 'clear') {
        if ((s4dmessage.member).permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
          (s4dmessage.channel).send({embeds: [{
          color: String('#3366ff'),
          title: String('> Combien de message voulez -vous supprimez ?'),
          description: String('> Merci de donner un nombre entre 1 et 500 !'),
          }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.member).id,  time: (1*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
           s4d.message = collected.first();
             purge_msg = (s4d.reply);
            if (purge_msg <= 1) {
              s4dmessage.channel.send({embeds: [{
              color: String('#ff0000'),
              title: String('> le nombre doit être supérieur à 1 !'),
              description: String('> Le nombre dit être au-dessus de 1 ! '),
              }]});
            } else if (purge_msg > 500) {
              s4dmessage.channel.send({embeds: [{
              color: String('#ff0000'),
              title: String('> Ce nombre est trop grand !'),
              description: String('> Choisis un nombre au-dessus de 1 !'),
              }]});
            } else {
              (s4dmessage.channel).bulkDelete((purge_msg|1));
              await delay(Number(2)*1000);
              s4dmessage.channel.send({embeds: [{
              color: String('#ff0000'),
              title: String('Suppression des messages terminé ! '),
              description: String(['**',purge_msg,'messages** ont bien été supprimés !'].join('')),
              }]}).then(async (s4dreply) =>{
                 await delay(Number(2)*1000);
                s4dreply.delete();
    
              });
            }
    
           s4d.reply = null; }).catch(async (e) => { console.error(e);   s4dmessage.channel.send({embeds: [{
            color: String('#ff0000'),
            title: String('Temp écoulé'),
            description: String('> 1 minute est écoulé !'),
            }]});
           });
          })
        } else {
          s4dmessage.channel.send({embeds: [{
          color: String('#ff0000'),
          title: String('Permission manquante !'),
          description: String('> 1 minute est écoulé !'),
          }]});
        }
      }
    
    });
    
    s4d.client.on('ready', async () => {
      s4d.client.user.setPresence({status: "online",activities:[{name:'Le début d\'Everest Anime [FR] !',type:"WATCHING"}]});
    
    });
    
    s4d.client.on('guildMemberAdd', async (param1) => {
    s4d.joiningMember = param1;
      (s4d.joiningMember).send({content: String('> ' + String(s4d.joiningMember.user)), embeds: [{
      color: String('#3366ff'),
      title: String(welcome_title),
      description: String(welcome_description),
      image: {
                  url: String('https://www.designyourway.net/blog/wp-content/uploads/2017/03/Anime-Wallpaper-Desktop-Background-29.jpg')
              },
      }]});
    s4d.joiningMember = null
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == String(prefix) + 'sethelpserver') {
        if ((s4dmessage.member).permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
          (s4dmessage.channel).send({embeds: [{
          color: String('#3366ff'),
          title: String('> Que voulez-vous mettre en aide ?'),
          description: String('> **Lorsque la commande help sera effectué ,juste après les aides à propos du bot et des informations complémentaire sur le bot **'),
          }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.member).id,  time: (5*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
           s4d.message = collected.first();
             help_server = (s4d.reply);
            s4dmessage.channel.send({embeds: [{
            color: String('#33cc00'),
            title: String('> Chargement de l\'aperçu en cours... '),
            description: String('> Un aperçu de votre configuration sera bientôt affiché... '),
            }]}).then(async (s4dreply) =>{
               await delay(Number(2)*1000);
              s4dreply.delete();
    
            });
            s4dmessage.channel.send({content:String('> **Chargement..**')}).then(async (s4dreply) =>{
               await delay(Number(1)*1000);
              s4dreply.delete();
    
            });
            s4dmessage.channel.send({embeds: [{
            color: String('#3366ff'),
            title: String('> Aide serveur et Bot '),
            description: String(String(`
            > **Commandes :**
    
            > **help : voir les aides à propose du bot et du serveur**
    
            > **ping : voir le ping actuel du bot **
    
            > **setprefix : définir le préfixe du bot Everest **
    
            > **welcomedm : configurer le message de bienvenue en dm**
    
            > **seewelcomedm : regarder l'embed de bienvenue en message privé actuel**
    
            > **embed : faire un embed avec un titre ,une description et une image .**
    
            > **rules : réécrire le règlement**
    
            > **clear : supprimer des messages**
    
            > **sethelpserver : configurer le système d'aide de serveur ( c'est à dire que les aides apparaîtront sur cette embed juste en dessous des commandes et des informations complémentaires )**
    
            > **Information complémentaire **
    
            > **Ce bot discord est développé par <@816100601280331827> ,owner de Everest Anime [FR] et de Everest Anime Chill [FR]!**
    
            `) + String(help_server)),
            }]});
    
           s4d.reply = null; }).catch(async (e) => { console.error(e);   s4dmessage.channel.send({embeds: [{
            color: String('#ff0000'),
            title: String('Temp écoulé'),
            description: String('> 5 minutes sont écoulés...'),
            }]});
           });
          })
        } else {
          s4dmessage.channel.send({embeds: [{
          color: String('#ff0000'),
          title: String('> Permission manquante'),
          description: String('> **Il vous manque la permission : manager server**'),
          }]}).then(async (s4dreply) =>{
             await delay(Number(3)*1000);
            s4dreply.delete();
    
          });
        }
      }
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == 'Hey') {
        (s4dmessage).react('👋🏻')
            } else if ((s4dmessage.content) == 'Hi') {
        (s4dmessage).react('👋🏻')
            } else if ((s4dmessage.content) == 'Hello') {
        (s4dmessage).react('👋🏻')
            } else if ((s4dmessage.content) == 'slt') {
        (s4dmessage).react('👋🏻')
            } else if ((s4dmessage.content) == 'Bjr') {
        (s4dmessage).react('👋🏻')
            } else if ((s4dmessage.content) == 'bjr') {
        (s4dmessage).react('👋🏻')
            } else if ((s4dmessage.content) == 'Slt') {
        (s4dmessage).react('👋🏻')
            } else if ((s4dmessage.content) == 'Salut') {
        (s4dmessage).react('👋🏻')
            } else if ((s4dmessage.content) == 'salut') {
        (s4dmessage).react('👋🏻')
            } else if ((s4dmessage.content) == 'bonjour') {
        (s4dmessage).react('👋🏻')
            } else if ((s4dmessage.content) == 'Bonjour') {
        (s4dmessage).react('👋🏻')
            } else if ((s4dmessage.content) == 'Yo') {
        (s4dmessage).react('👋🏻')
            } else if ((s4dmessage.content) == 'Yoo') {
        (s4dmessage).react('👋🏻')
            } else if ((s4dmessage.content) == 'Yooo') {
        (s4dmessage).react('👋🏻')
            } else if ((s4dmessage.content) == 'yo') {
        (s4dmessage).react('👋🏻')
            } else if ((s4dmessage.content) == 'yoo') {
        (s4dmessage).react('👋🏻')
            } else if ((s4dmessage.content) == 'yooo') {
        (s4dmessage).react('👋🏻')
            } else if ((s4dmessage.content) == 'Hello') {
        (s4dmessage).react('👋🏻')
            }
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == String(prefix) + 'ping') {
        s4dmessage.channel.send({embeds: [{
        color: String('#ff0000'),
        title: String('> Ping Everest '),
        description: String(['> **Ping actuel du bot : ',s4d.client.ws.ping,'ms**'].join('')),
        }]});
      }
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == String(prefix) + 'setprefix') {
        if ((s4dmessage.member).permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
          (s4dmessage.channel).send({embeds: [{
          color: String('#3366ff'),
          title: String('Everest Anime [FR]'),
          description: String('> Faîtes `cancel` pour annuler '),
          }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.member).id,  time: (1*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
           s4d.message = collected.first();
             prefix = (s4d.reply);
            if (prefix == 'cancel') {
              s4dmessage.channel.send({embeds: [{
              color: String('#33ff33'),
              title: String('Le changement de préfixe a bien été annulé ! '),
              }]}).then(async (s4dreply) =>{
                 await delay(Number(3)*1000);
                s4dreply.delete();
                return
    
              });
            } else {
              s4dmessage.channel.send({embeds: [{
              color: String('#33ff33'),
              title: String('> Changement de préfix effectué !'),
              description: String(['> Le préfix actuel est désormais : ','`',prefix,'`'].join('')),
              }]}).then(async (s4dreply) =>{
                 await delay(Number(3)*1000);
                s4dreply.delete();
    
              });
            }
    
           s4d.reply = null; }).catch(async (e) => { console.error(e);   s4dmessage.channel.send({embeds: [{
            color: String('#ff0000'),
            title: String('Temp écoulé'),
            description: String('> **1 minute est écoulé...** '),
            }]});
           });
          })
        } else {
          s4dmessage.channel.send({embeds: [{
          color: String('#ff0000'),
          title: String('> Permission manquante'),
          description: String('> **Il vous manque la permission : manager server**'),
          }]}).then(async (s4dreply) =>{
             await delay(Number(3)*1000);
            s4dreply.delete();
    
          });
        }
      }
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == String(prefix) + 'help') {
        s4dmessage.channel.send({content:String('> **Les aides à propos du serveur et du bot apparaitront dans quelques instants...**  ')}).then(async (s4dreply) =>{
           await delay(Number(2)*1000);
          s4dreply.delete();
    
        });
        s4dmessage.channel.send({content:String('> **Chargement...**')}).then(async (s4dreply) =>{
           await delay(Number(2)*1000);
          s4dreply.delete();
    
        });
        s4dmessage.channel.send({embeds: [{
        color: String('#3366ff'),
        title: String('> Aide serveur et Bot '),
        description: String(String(`
        > **Commandes :**
    
        > **help : voir les aides à propose du bot et du serveur**
    
        > **ping : voir le ping actuel du bot **
    
        > **setprefix : définir le préfixe du bot Everest **
    
        > **welcomedm : configurer le message de bienvenue en dm**
    
        > **seewelcomedm : regarder l'embed de bienvenue en message privé actuel**
    
        > **embed : faire un embed avec un titre ,une description et une image .**
    
        > **rules : réécrire le règlement**
    
        > **clear : supprimer des messages**
    
        > **sethelpserver : configurer le système d'aide de serveur ( c'est à dire que les aides apparaîtront sur cette embed juste en dessous des commandes et des informations complémentaires )**
    
        > **Information complémentaire **
    
        > **Ce bot discord est développé par <@816100601280331827> ,owner de Everest Anime [FR] et de Everest Anime Chill [FR]!**
    
        `) + String(help_server)),
        }]});
      }
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == String(prefix) + 'embed') {
        if ((s4dmessage.member).permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
          (s4dmessage.channel).send({embeds: [{
          color: String('#3366ff'),
          title: String('> Quelle sera le titre de votre embed ?'),
          description: String(`> Choisissez le titre de votre embed
    
          > Faîtes \`cancel\` pour annuler`),
          }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.member).id,  time: (1*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
           s4d.message = collected.first();
             embed_title = (s4d.reply);
            if (embed_title == 'cancel') {
              s4dmessage.channel.send({embeds: [{
              color: String('#33ff33'),
              title: String('> L\'embed a bien été annulé !'),
              }]}).then(async (s4dreply) =>{
                 await delay(Number(2)*1000);
                s4dreply.delete();
    
              });
            } else {
              (s4dmessage.channel).send({embeds: [{
              color: String('#3366ff'),
              title: String('> Quelle sera la description de l\'embed ?'),
              description: String(`> Choisissez  une description pour votre embed
    
              > Faîtes \`cancel pour annuler\``),
              }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.member).id,  time: (1*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
               s4d.message = collected.first();
                 embed_description = (s4d.reply);
                if (embed_description == 'cancel') {
                  s4dmessage.channel.send({embeds: [{
                  color: String('#33ff33'),
                  title: String('> L\'embed a bien été annulé !'),
                  }]}).then(async (s4dreply) =>{
                     await delay(Number(2)*1000);
                    s4dreply.delete();
    
                  });
                } else {
                  (s4dmessage.channel).send({embeds: [{
                  color: String('#3366ff'),
                  title: String('> Quelle sera l\'image de votre embed ?'),
                  description: String(`> Ajoutez une image à votre embed
    
                  > Faîtes \`cancel\` pour annuler`),
                  }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.member).id,  time: (1*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
                   s4d.message = collected.first();
                     embed_image = (s4d.reply);
                    if (embed_image == 'cancel') {
                      s4dmessage.channel.send({embeds: [{
                      color: String('#33ff33'),
                      title: String('> L\'embed a bien été annulé !'),
                      }]}).then(async (s4dreply) =>{
                         await delay(Number(2)*1000);
                        s4dreply.delete();
    
                      });
                    } else {
                      (s4dmessage.channel).send({embeds: [{
                      color: String('#3366ff'),
                      title: String('> Quelle sera la couleur de l\'embed ?'),
                      description: String(`> **Couleur disponible :**
    
                      \`bleu foncé\`
                      \`bleu ciel\`
                      \`rouge\`
                      \`violet\`
                      \`vert\`
                      \`jaune\`
                      \`rose\`
                      \`marron\`
                      \`orange\`
                      \`random\` = choisir une couleur au hasard`),
                      }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.member).id,  time: (1*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
                       s4d.message = collected.first();
                         if ((s4d.reply) == 'bleu foncé') {
                          embed_color = '#3333ff';
                        } else if ((s4d.reply) == 'bleu ciel') {
                          embed_color = '#33ccff';
                        } else if ((s4d.reply) == 'rouge') {
                          embed_color = '#ff0000';
                        } else if ((s4d.reply) == 'violet') {
                          embed_color = '#6600cc';
                        } else if ((s4d.reply) == 'vert') {
                          embed_color = '#33ff33';
                        } else if ((s4d.reply) == 'rose') {
                          embed_color = '#ff99ff';
                        } else if ((s4d.reply) == 'jaune') {
                          embed_color = '#ffff00';
                        } else if ((s4d.reply) == 'marron') {
                          embed_color = '#993300';
                        } else if ((s4d.reply) == 'orange') {
                          embed_color = '#ff6600';
                        } else if ((s4d.reply) == 'random') {
                          embed_color = colourRandom();
                        } else {
                          s4dmessage.channel.send({embeds: [{
                          color: String('#ff0000'),
                          title: String('> Embed annulé'),
                          description: String('> **Raison : couleur invalide ou bien lien d\'image invalide**'),
                          }]});
                        }
                        s4dmessage.channel.send({embeds: [{
                        color: String('#33ff33'),
                        title: String('> Création de l\'embed en cours...'),
                        description: String('> **Votre embed est entrain d\'être généré...** '),
                        }]}).then(async (s4dreply) =>{
                           await delay(Number(2)*1000);
                          s4dreply.delete();
                          s4dmessage.channel.send({content:String('> **En cours d\'envoi de l\'embed...**')}).then(async (s4dreply) =>{
                             await delay(Number(1)*1000);
                            s4dreply.delete();
                            s4dmessage.channel.send({embeds: [{
                            color: String(embed_color),
                            title: String(embed_title),
                            description: String(embed_description),
                            image: {
                                        url: String(embed_image)
                                    },
                            }]});
    
                          });
    
                        });
    
                       s4d.reply = null; }).catch(async (e) => { console.error(e);   s4dmessage.channel.send({embeds: [{
                        color: String('#ff0000'),
                        title: String('Temp écoulé'),
                        description: String('> **1 minute est écoulé...** '),
                        }]});
                       });
                      })
                    }
    
                   s4d.reply = null; }).catch(async (e) => { console.error(e);   s4dmessage.channel.send({embeds: [{
                    color: String('#ff0000'),
                    title: String('Temp écoulé'),
                    description: String('> **1 minute est écoulé...** '),
                    }]});
                   });
                  })
                }
    
               s4d.reply = null; }).catch(async (e) => { console.error(e);   s4dmessage.channel.send({embeds: [{
                color: String('#ff0000'),
                title: String('Temp écoulé'),
                description: String('> **1 minute est écoulé...** '),
                }]});
               });
              })
            }
    
           s4d.reply = null; }).catch(async (e) => { console.error(e);   s4dmessage.channel.send({embeds: [{
            color: String('#ff0000'),
            title: String('Temp écoulé'),
            description: String('> **1 minute est écoulé...** '),
            }]});
           });
          })
        } else {
          s4dmessage.channel.send({embeds: [{
          color: String('#ff0000'),
          title: String('> Permission manquante'),
          description: String('> **Il vous manque la permission : manage server**'),
          }]}).then(async (s4dreply) =>{
             await delay(Number(3)*1000);
            s4dreply.delete();
    
          });
        }
      }
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == String(prefix) + 'rules') {
        if ((s4dmessage.member).permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
          s4dmessage.channel.send({embeds: [{
          color: String('#6600cc'),
          title: String('Règlement Everest Anime [FR]'),
          description: String(`**__GLOBALE__**
    
          \`\`\`
          Article 1・Insulter un membre sur le serveur est interdit
    
          Article 2・ Demander d'être à un grade sans faire partie des recrutements est interdit
    
          Article 3・En cas de disputes avec un autre membre ,vous serrez tout les deux sanctionné
    
          Article 4・Les photos de profil explicite sont interdit
          \`\`\`
    
          **__Textuel__**
    
          \`\`\`
          Article 1・Les liens emmenant vers des sites frauduleux sont interdit
          ﻿
          Article 2・Les tokens grabs seront automatiquement sanctionné par un ban
          ﻿
          Article 3・Les liens sont autorisé que dans le salon nommé #média et nul part ailleurs (sauf pour le salon #vos-arts ) tout en respectant l'article 1 et 2
          ﻿
          Article 4・Les doubles comptes sont interdit
          ﻿
          Article 5・le partage de script/exploit est interdit au sein de notre serveur
          ﻿
          Article 6・L'usurpation d'identité est interdite
          ﻿
          Article 7・Les propos raciste ou haineux envers une race sont interdit
          ﻿
          Article 8・L'homophobie est interdite
          ﻿
          Article 9 ・Les invitations vers d'autres serveur qu'Everest Anime Chill [FR] sont interdit
          ﻿
          Article 10・Le spam sera automatiquement sanctionné par un kick et en cas de répétition ,par un ban .
          ﻿
          Article 11・Le contenu sexuelle est interdit
          ﻿
          Article 12・Tout type de conversation/action illégal est interdit﻿
          \`\`\`
    
          **__Message privé__**
    
          \`\`\`
          Article 1・Des insultes entres des membres de notre serveur en message privé sera sanctionné si celui-ci est report dans
          ﻿
          Article 2・Les Pub en message privé sans l'autorisation du destinataire sont interdits
    
          Article 3・Les articles 1,2,4,5 et 8 textuel s'appliquent aussi sur les message privé
          ﻿
          Article 4・L'harcèlement est interdit
          ﻿
          Article 5・Ne partagez pas d'information fausse ou trompeuse﻿
          \`\`\`
    
          **__Santion__**
    
          \`\`\`
          Commande dans le mauvais salon = Mute 5 minutes
    
          Spam = kick automatique
    
          Spam à répétition ( re rejoindre après un kick et recommencer ) = ban temp. 14jours
    
          Vidéo/lien dans le mauvais salon = censure
    
          Publicité discord = ban temp. 14jours
    
          Abus de ses droit = dégrade (staff)
    
          Ban/kick pour des raison personnel = dégrade (staff)
    
          Non respect du règlement = sanction selon la gravité de la règle enfreinte
          \`\`\`
    
          **__T.O.S__**
    
          **Le [T.O.S](https://discord.com/terms) discord doit être obligatoiremment respecté**
    
          **__Autres__**
    
          **Notre serveur anime : [Everest Anime Chill [FR]](https://discord.gg/MFB7uXPRsc) **`),
          }]});
        } else {
          s4dmessage.channel.send({embeds: [{
          color: String('#ff0000'),
          title: String('> Permission manquante'),
          description: String('> Il vous manque la permission : manage server'),
          }]}).then(async (s4dreply) =>{
             await delay(Number(3)*1000);
            s4dreply.delete();
    
          });
        }
      }
    
    });
    
    return s4d
})();