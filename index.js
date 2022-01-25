require("dotenv").config()

const Client = require('./src/structures/Client')
const User = require('./src/schemas/UserSchemas')

const client = new Client({
    intents:[
        'GUILDS',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGES',
        'GUILD_INVITES',
        'GUILD_VOICE_STATES',
        'GUILD_MEMBERS',
        'GUILD_PRESENCES'  
    ]
})


client.once('ready', function() {
    console.log(`${client.user.username} logado!`)
})

client.on('messageCreate', function (message) {
    if (message.content === "Oi!"){
        message.reply('Olá, tudo bem?')
    }
    console.log(message)
})

client.on('message', async (message) => {
    if (message.author.bot) return

client.login(process.env.BOT_TOKEN)
    if (message.content.toLowerCase().startsWith("!inserir")) {
        const index = message.content.indexOf(" ");
        const descri = message.content.slice(index + 1);

        console.log(index);
        console.log(descri);

        try {
            const newUser = await User.create({
                username: message.author.username,
                discordId: message.author.id,
                description: descri,
            });
            message.channel.send("Salva no banco dado!");
        } catch (err) {
            console.log(err);
            message.channel.send("Falha para salvar no banco dado!")
        }
    } else if (message.content.toLowerCase().startsWith("?procurar")) {

        const args = message.content.split(" ");
        console.log(args)
        console.log(args.length)
        if (args.length === 1) {
            const argumento = await User.find({ discordId: message.author.id});
            let description = "";
            for (const i in argumento) {
                description += `${parseInt(i) + 1}) ${argumento[i].description}\n`
            }
            message.channel.send(description);
        } else {
            const arg = args[1];
            console.log(arg);

            try {
                const palavra = await User.findById(arg);
                console.log(palavra)

                if (palavra) {
                    message.channel.send(palavra.description);
                } else {
                    message.channel.send("Não encontrado");
                }

            } catch (err) {
                console.log(err);
                message.channel.send("Não encontrado");
            }
        }
    }
});

client.on('guildMemberAdd', async (member) => {
    const newMember = await User.create({
        username: message.author.username,
        discordId: message.author.id
    });
});

client.login(process.env.BOT_TOKEN) 