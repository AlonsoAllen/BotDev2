require("dotenv").config();

const Client = require("./src/structures/Client");
const User = require("./src/schemas/UserSchemas");
const Note = require("./src/schemas/NoteSchema");
const Obra = require("./src/schemas/ObraSchema");
const Autor = require("./src/schemas/AutorSchema");

const client = new Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGES",
    "GUILD_INVITES",
    "GUILD_VOICE_STATES",
    "GUILD_MEMBERS",
    "GUILD_PRESENCES",
  ],
});

client.on("guildMemberAdd", async (member) => {
  const newMember = await User.create({
    username: message.author.username,
    discordId: message.author.id,
  });
});

client.login(process.env.BOT_TOKEN);

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // ========================== ADICIONA NOVA OBRA =======================
  client.login(process.env.BOT_TOKEN);
  if (message.content.toLowerCase().startsWith("!obranova")) {
    const index = message.content.indexOf(" ");
    const descri = message.content.slice(index + 1);

    console.log(index);
    console.log(descri);
    console.log(message);

    try {
      //cria o cara no schema de Obra -> é apenas temporário para testes.
      const newObra = await Obra.create({
        nomeObra: descri,
        autorObra: descri,
        generoTextualObra: descri,
        linkAcessoObra: descri,
        faixaEtariaObra: descri,
        statusObra: descri,
        generoObra: descri,
        sinopseObra: descri,
      });
      message.channel.send("Salvo com sucesso.");
    } catch (err) {
      console.log(err);
      message.channel.send("Falha ao tentar salvar.");
    }
  }
  // ========================================= PESQUISA AS OBRAS DO AUTOR ============================================
  if (message.content.toLowerCase().startsWith("?obrasautor")) {
    //pesquisa no schema Obra
    const args = message.content.split(" ");
    console.log(args);
    console.log(args.length);
    if (args.length === 1) {
      const argumento = await Obra.find({ discordId: message.author.id });
      let description = "";
      for (const i in argumento) {
        description += `${parseInt(i) + 1}) ${argumento[i].autorObra}\n`;
      }
      message.channel.send(description);
    } else {
      const arg = args[1];
      console.log(arg);

      try {
        const palavra = await Obra.findOne({
          autorObra: arg,
        }); /*, function (err, obra) {
                  if (err) return handleError(err);
                  // Prints "Space Ghost is a talk show host".*/
        //console.log(obra.nome_obra, obra.discordId);
        //({ discordId: message.author.id});  //nao funciona mesmo igual ao de cima... ver se é pelo tipo da variavel
        console.log(palavra);

        if (palavra) {
          message.channel.send("**Nome da obra:** " + palavra.nomeObra);
          message.channel.send("**Autor:** " + palavra.autorObra);
          message.channel.send("**Tipo de obra:** " + palavra.generoTextualObra);
          message.channel.send("**Link para leitura:** " + palavra.linkAcessoObra);
          message.channel.send("**Faixa etária:** " + palavra.faixaEtariaObra);
          message.channel.send("**Status:** " + palavra.statusObra);
          message.channel.send("**Gêneros:** " + palavra.generoObra[0]);
          message.channel.send("**Sinopse:** " + palavra.sinopseObra);
        } else {
          message.channel.send("Não encontrado o valor informado.");
        }
      } catch (err) {
        console.log(err);
        message.channel.send("Não encontrado");
      }
    }
  }
  // =================================== PESQUISA E ATUALIZA OBRA DE AUTOR ========================================
  if (message.content.toLowerCase().startsWith("?pesquisaobrasautor")) {
    //pesquisa no schema Obra
    const args = message.content.split(" ");
    console.log(args);
    console.log(args.length);
    if (args.length === 1) {
      const argumento = await Obra.find({ discordId: message.author.id });
      let description = "";
      for (const i in argumento) {
        description += `${parseInt(i) + 1}) ${argumento[i].autorObra}\n`;
      }
      message.channel.send(description);
    } else {
      const arg = args[1];
      console.log(arg);

      try {
        const palavra = await Obra.findOne({
          autorObra: arg,
        }); /*, function (err, obra) {
                if (err) return handleError(err);
                // Prints "Space Ghost is a talk show host".*/
        //console.log(obra.nome_obra, obra.discordId);
        //({ discordId: message.author.id});  //nao funciona mesmo igual ao de cima... ver se é pelo tipo da variavel
        console.log(palavra);

        if (palavra) {  
            message.channel.send("**Nome da obra:** " + palavra.nomeObra);
            message.channel.send("**Link para leitura:** " + palavra.linkAcessoObra);
            message.channel.send("**Sinopse:** " + palavra.sinopseObra);
        } else {
          message.channel.send("Não encontrado o valor informado.");
        }
      } catch (err) {
        console.log(err);
        message.channel.send("Não encontrado");
      }
    }
  }
  // =================================== DELETAR OBRAS DE AUTOR ========================================
  if (message.content.toLowerCase().startsWith("?deleteobrasautor")) {
    //pesquisa no schema Autor
    const args = message.content.split(" ");
    console.log(args);
    console.log(args.length);
    if (args.length === 1) {
      const argumento = await Autor.nomeObra.find({ discordId: message.author.id });
      let description = "";
      for (const i in argumento) {
        description += `${parseInt(i) + 1}) ${argumento[i].autorObra}\n`;
      }
      message.channel.send(description);
    } else {
      const arg = args[1];
      console.log(arg);

      try {
        const palavra = await Obra.deleteOne({
          autorObra: arg,
        }); /*, function (err, obra) {
                if (err) return handleError(err);
                // Prints "Space Ghost is a talk show host".*/
        //console.log(obra.nome_obra, obra.discordId);
        //({ discordId: message.author.id});  //nao funciona mesmo igual ao de cima... ver se é pelo tipo da variavel
        console.log(palavra);

        if (palavra) {
          message.channel.send("Obras do autor foi excluída");
        } else {
          message.channel.send("Não encontrado o valor informado.");
        }
      } catch (err) {
        console.log(err);
        message.channel.send("Não encontrado");
      }
    }
  }
  // =================================== DELETAR AUTOR ========================================
  if (message.content.toLowerCase().startsWith("?deleteautor")) {
    //pesquisa no schema Autor
    const args = message.content.split(" ");
    console.log(args);
    console.log(args.length);
    if (args.length === 1) {
      const argumento = await Autor.find({ discordId: message.author.id });
      let description = "";
      for (const i in argumento) {
        description += `${parseInt(i) + 1}) ${argumento[i].autorObra}\n`;
      }
      message.channel.send(description);
    } else {
      const arg = args[1];
      console.log(arg);

      try {
        const palavra = await Autor.deleteOne({
          autorObra: arg,
        }); /*, function (err, obra) {
              if (err) return handleError(err);
              // Prints "Space Ghost is a talk show host".*/
        //console.log(obra.nome_obra, obra.discordId);
        //({ discordId: message.author.id});  //nao funciona mesmo igual ao de cima... ver se é pelo tipo da variavel
        console.log(palavra);

        if (palavra) {
          message.channel.send("Autor Excluído");
        } else {
          message.channel.send("Não encontrado o valor informado.");
        }
      } catch (err) {
        console.log(err);
        message.channel.send("Não encontrado");
      }
    }
  }
});

/* Códigos de Teste, utilizando o schema User e Notes para explorar funcionalidades */
// ============== INSERÇÃO DE DADOS NO BANCO ====================
client.on("message", async (message) => {
  if (message.author.bot) return;

  client.login(process.env.BOT_TOKEN);
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
      message.channel.send("Falha para salvar no banco dado!");
    }
  }
  /* =========================== PROCURAR DADOS NO BANCO ================================ */
  if (message.content.toLowerCase().startsWith("?procurar")) {
    const args = message.content.split(" ");
    console.log(args);
    console.log(args.length);
    if (args.length === 1) {
      const argumento = await User.find({ discordId: message.author.id });
      let description = "";
      for (const i in argumento) {
        description += `${parseInt(i) + 1}) ${argumento[i].description}\n`;
      }
      message.channel.send(description);
    } else {
      const arg = args[1];
      console.log(arg);

      try {
        const palavra = await User.findById(arg);
        console.log(palavra);

        if (palavra === description) {
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
  /* =============================== CRIAÇÃO DE NOTA NOVA NO BANCO DE DADOS =========================== */
  if (message.content.toLowerCase().startsWith("?createnote")) {
    const index = message.content.indexOf(" ");
    const description = message.content.slice(index + 1);
    try {
      await Note.create({
        description,
        userId: message.author.id,
      });
      message.channel.send("Nota salva com sucesso!");
    } catch (error) {
      console.log("Erro: " + error);
      message.channel.send("Erro ao salvar a nota.");
    }
  }
  /* ================================= BUSCA AS NOTAS NO BANCO DE DADOS ============================ */
  if (message.content.toLowerCase().startsWith("?getnotes")) {
    //?getnotes
    //?getnotes <<id>>
    const args = message.content.split(" ");
    console.log(args);
    if (args.length === 1) {
      const notes = await Note.find({ userId: message.author.id });
      //console.log(notes);
      //message.channel.send(notes[0].description);
      let description = "";
      for (const i in notes) {
        description += `${parseInt(i) + 1} ${notes[i].description}\n`;
      }
      message.channel.send(description);
    } else {
      const arg = args[1];
      const note = await Note.findById(arg);
      if (note) {
        message.channel.send(note.description);
      } else {
        message.channel.send("Nota não encontrada");
      }
    }
  }
  /* =============================== ATUALIZA AS NOTAS NO BANCO DE DADOS ============================= */
  if (message.content.toLowerCase().startsWith("?updatenotes")) {
    //?updatenotes
    //?updatenotes <<id>>
    const args = message.content.split(" ");
    console.log(args);
    if (args.length === 1) {
      const notes = await Note.find({ userId: message.author.id });
      //console.log(notes);
      //message.channel.send(notes[0].description);
      let description = "";
      for (const i in notes) {
        description += `${parseInt(i) + 1} ${notes[i].description}\n`;
      }
      message.channel.send(description);
    } else {
      const arg = args[1];
      const note = await Note.findById(arg);
      if (note) {
        message.channel.send(note.description);
      } else {
        message.channel.send("Nota não encontrada");
      }
    }
  }
});