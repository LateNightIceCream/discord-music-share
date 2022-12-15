const { Client, GatewayIntentBits, DiscordjsErrorCodes } = require('discord.js');
const botconfig           = require("./botconfig.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ] });

const enabledChannels = [
  '1053007072574328873',
  '1052613065897693184',
  '937039392164429915',
];

// make sure these are actually emojis
// to get a custom emoji id type '\' followed by the emoji name
// e.g. '\:thumbsup:'
const musicReactionEmojis = [
  //'<:timmiKappa:898332327300698122>',
  '😻',
  '🙀',
  '😿',
  '😾',
  '🤮',
];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {

  if (message.author.bot) {
    return;
  }

  if (enabledChannels.indexOf(message.channelId) == -1) {
    return;
  }

  if (isMusicLink(message.content)) {
    musicReactionEmojis.forEach(emoji => {
      message.react(emoji).catch((error) => {
        //if (error == DiscordjsErrorCodes.EmojiType ) {
        //  console.log('unknown emoji encountered in musicReactionEmojis');
        //} // cant find the error code
        console.log(error);
        console.log('something went wrong with a reaction');
        console.log('are your emojis valid?');
      });
    });
  }
});


/* lazyyy */
function isMusicLink(string) {
  if (string.includes('spotify.com') || string.includes('youtube.com') || string.includes('youtu.be')) {
    return true;
  }
  return false;
}

console.log(botconfig.token)
client.login(botconfig.token);
