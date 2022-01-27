const { Client, MessageReaction } = require('discord.js');
const firstMessage = require('./first-message');

emojis = {
    Valider:  "Attente-Validation",
}

/**
 * 
 * @param {MessageReaction} reaction 
 * @param {*} user 
 * @param {*} add 
 */
const handleReaction = (reaction, user, add) => {
    const emoji = reaction.emoji.name;
    const { guild } = reaction.message;

    const roleName = emojis[emoji];

    if (!roleName) {
        return;
    }

    const role = guild.roles.cache.find(role => role.name === roleName);

    if (!role) {
        return;
    }

    const member = guild.members.cache.find(member => member.id === user.id);

    if (add) {
        member.roles.add(role);
    } else {
        member.roles.remove(role);
    }
}

/**
 * 
 * @param {Client} client 
 */
module.exports = (client) => {
    const channel = client.channels.cache.find((channel) => channel.id == '935648736191848488');
    const getEmoji = emojiName => client.emojis.cache.find((emoji) => emoji.name === emojiName);

    const reactions = [];

    let message = "- Règles du clan :\n\n"+

    "▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂\n\n"+
    
    "⚠️ - L’ensemble des règles est à valider obligatoirement pour accéder aux GDC et a l'ensemble du discord ,par le biais d’une réaction:\n\n"+
    
    "▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂\n\n"+
    
    "⚠️ Si non respect des Règles, il peut y avoir rétrogradation ou exclusion.\n\n"+
    
    "▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂\n\n"+
    
    "• [1] Lire les messages de Clan entièrement et agir en fonction.\n\n"+
    
    "• [2] Respect des dons/demandes avec troupes Max.\n\n"+
    
    "• [3] Si indisponible (vacances, imprévu, etc) on préviens les adjoints via un message discord.\n\n"+
    
    "• [4] Profil à jour : ✅ / ⛔.\n\n"+
    "(Héros OBLIGATOIRES en Gdc)\n\n"+
    
    "• [5] On ne reste pas en rouge pendant des plombes. Nous sommes un clan actif. Donc si rouge pour cause de up, on s’arrange pour faire au quelques GDC avant la LIGUE.\n\n"+
    
    "• [6] Quand on demande des troupes, ont remplis les demandes précédentes.\n\n"+
    
    "▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂\n\n"+
    
    "- Afin de vérifier que tu n’est pas un robot, merci de bien vouloir cliquer sur la réaction '✅' qui te donnera accès à d’autres salons !\n\n"+
    
    "Une fois ceci fait, tu devras te présenter et montrer des screens de ton village/profil dans le salon Doggy Dog.\n\n"+
    
    "Merci.\n\n";

    for (const key in emojis) {
        const emoji = getEmoji(key);
        if (emoji) {
            reactions.push(emoji);
            const role = emojis[key];
            message += `${emoji} : ${role}\n\n`;
        }
    }

    firstMessage(channel, message, reactions);

    client.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.channel.id === channel.id) {
            handleReaction(reaction, user, true);
        }
    });
"\n\n"
    client.on('messageReactionRemove', (reaction, user) => {
        if (reaction.message.channel.id === channel.id) {
            handleReaction(reaction, user, false);
        }
    });
}
