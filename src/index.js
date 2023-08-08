//nodemon package reinitializes bot on every new save while editing in Vscode.
//Installed it globally on system.
//enter "nodemon" in terminal to start and ^C to exit.

//dotenv package for securing the TOKEN in a separate .env file which is added to gitignore
require('dotenv').config(); //gives access to env variables

const {Client, IntentsBitField, EmbedBuilder} = require ('discord.js'); //destructuring; importing said things from a package

const client = new Client({ //we are creating object/instance of class Client; this is our bot instance

    //Intents are named groups of pre-defined events, which the discord.js (our bot) client will receive.
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

//ready event listener: (callback)
client.on('ready', (c) => {//on is a method that has access to certain events; ready event is for when our bot is ready/online.
    console.log(`${c.user.tag} is online.`);//takes the client instance as 'c' input parameter and logs the given message on console.
}
);

//this event listener is triggered whenever a new message is sent that the bot can see
client.on('messageCreate', (message) => {
    if(message.author.bot)
    {
        return; //only execute further function if message detected was from human
    }
    if(message.content === "Hi")
    {
        message.reply("Hello!"); //logs the message detected on console.
    }
}
);

client.on('interactionCreate', (interaction) => { //detects interaction (commands and stuff)
    if(!interaction.isChatInputCommand()) return; //if interaction was not chat input by human, then return

    if(interaction.commandName === "greeting_command") {
        interaction.reply('Hello There!');//replies with given message if command name is this.
    }

    if(interaction.commandName === "reality_check") {
        interaction.reply('I think I am a bot');
    }

    if(interaction.commandName === "add") {
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;

        interaction.reply(`The sum is ${num1 + num2}`);
    }

    if(interaction.commandName === "embed") {
    const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    interaction.reply({embeds: [exampleEmbed]});
    }

    if(interaction.commandName === "about") {
        interaction.reply(
            "This is a basic bot that does the following:\n" +
            "1. Replies if you write Hi on chat\n" +
            "2. /greeting_command greets user\n" +
            "3. /reality_check command makes the bot do a reality check\n" +
            "4. /add command has 2 required options and choices within them to add 2 nos\n" +
            "5. /embed command returns a boilerplate embed on chat\n"
        );//replies with given message if command name is this.
    }
});

client.login(process.env.TOKEN); //accesses TOKEN from secure .env file
