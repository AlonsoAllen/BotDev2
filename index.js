require("dotenv").config()

const Client = require('./src/structures/Client')
const User = require('./src/schemas/UserSchemas')
const Obra = require('./src/schemas/ObraSchemas')

//const Obra = mongoose.model('Obra', ObraSchema); 

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

/*client.on('messageCreate', function (message) {  //não é uma task, entao comentei e usei o messageCreate apenas na minha tarefa, mantive ai para exemplo.
    if (message.content === "Oi!"){
        message.reply('Olá, tudo bem?')
    }
    console.log(message)
})*/

//pesquisar autor
client.on('messageCreate', async (message) => {
    if (message.author.bot) return

client.login(process.env.BOT_TOKEN)
    if (message.content.toLowerCase().startsWith("!obranova")) {
        const index = message.content.indexOf(" ");
        const descri = message.content.slice(index + 1);

        console.log(index);
        console.log(descri);
        console.log(message);

        try {//cria o cara no schema de Obra -> é apenas temporário para testes.
            const newObra = await Obra.create({
                username: message.author.username,
                discordId: message.author.id,
                description: descri,
                nome_obra: descri,
                id_obra: 1,  // tirar isso dps
            });
            message.channel.send("Salvo com sucesso.");
        } catch (err) {
            console.log(err);
            message.channel.send("Falha ao tentar salvar.")
        }
    } else if (message.content.toLowerCase().startsWith("?obras")) { //pesquisa no schema Obra

        const args = message.content.split(" ");
        console.log(args)
        console.log(args.length)
        if (args.length === 1) {
            const argumento = await Obra.find({ discordId: message.author.id});
            let description = "";
            for (const i in argumento) {
                description += `${parseInt(i) + 1}) ${argumento[i].description}\n`
            }
            message.channel.send(description);
        } else {
            const arg = args[1];
            console.log(arg);

            try {
                const palavra = await Obra.findOne({'nome_obra': arg }); /*, function (err, obra) {
                    if (err) return handleError(err);
                    // Prints "Space Ghost is a talk show host".*/
                    //console.log(obra.nome_obra, obra.discordId); 
                //({ discordId: message.author.id});  //nao funciona mesmo igual ao de cima... ver se é pelo tipo da variavel 
                console.log(palavra)

                if (palavra) {
                    message.channel.send(palavra.nome_obra);
                    //message.channel.send(palavra.id_obra);
                    //message.channel.send(palavra.genero_textual);
                    //message.channel.send(palavra.genero_literario);
                    //message.channel.send(palavra.link_obra);
                    //message.channel.send(palavra.faixa_etaria);
                    //message.channel.send(palavra.status_obra);
                    //message.channel.send(palavra.sinopse);
                    
                } else {
                    message.channel.send("Não encontrado o valor informado.");
                }

            } catch (err) {
                console.log(err);
                message.channel.send("Não encontrado");
            }
        }
    }
})

client.on('message', async (message) => {
    if (message.author.bot) return

client.login(process.env.BOT_TOKEN)
    if (message.content.toLowerCase().startsWith("!inserir")) {
        const index = message.content.indexOf(" ");
        const descri = message.content.slice(index + 1);

        console.log(index);
        console.log(descri);

        try {//cria o carinha com username, discord id e descrição
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
                    message.channel.send(palavra.username);
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