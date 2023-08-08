require('dotenv').config(); //gives access to environment variables
const {REST, Routes, ApplicationCommandOptionType} = require('discord.js');
//@discordjs/REST is a module that allows you to easily make REST requests to the Discord API.

const commands = [ //we are defining "commands" as an array of objects where each object is a command.
    {
        name: "greeting_command",
        description: "Greets user",
    },
    {
        name: "about",
        description: "Provides Functionalities of bot",
    },
    {
        name: "reality_check",
        description: "Does reality check",
    },
    {
        name: "embed",
        description: "Sends the embed boilerplate",
    },
    {
        name: "add",
        description: "Adds two numbers",
        options : [
            {
                name: 'first-number',
                description:'The first number',
                type: ApplicationCommandOptionType.Number,
                required: true,
                choices: [
                    {
                        name: 'One',
                        value: 1,
                    },
                    {
                        name: 'Two',
                        value: 2,
                    },
                    {
                        name: 'Three',
                        value: 3,
                    },
                    {
                        name: 'Four',
                        value: 4,
                    },
                    {
                        name: 'Five',
                        value: 5,
                    },
                ]
            },
            {
                name: 'second-number',
                description:'The second number',
                type: ApplicationCommandOptionType.Number,
                required: true,
                choices: [
                    {
                        name: 'One',
                        value: 1,
                    },
                    {
                        name: 'Two',
                        value: 2,
                    },
                    {
                        name: 'Three',
                        value: 3,
                    },
                    {
                        name: 'Four',
                        value: 4,
                    },
                    {
                        name: 'Five',
                        value: 5,
                    },
                ]
            }
        ]
    },
];

const rest = new REST( {version: '10'}).setToken(process.env.TOKEN);//necessary to intialize and link rest api

(async () => { //declaring an anonymous async function
    try{
        console.log("Registering Commands..");

        await rest.put(//put(fullRoute, options): runs a put request from the api
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body : commands}//(std to send an object containing commands)
        )

        console.log("Slash commands registered.");
    }catch(error) {
        console.log(`Error Encountered: ${error}`);
    }
})();//we execute this anonymous function immediately after its declaration using the () at the end.