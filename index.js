require("dotenv").config();

const Client = require("./src/structures/Client");
const User = require("./src/schemas/UserSchemas");
const Note = require("./src/schemas/NoteSchema");
const Obra = require("./src/schemas/ObraSchema");
const Autor = require("./src/schemas/AutorSchema");

const { MessageEmbed } = require("discord.js");

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

client.login(process.env.BOT_TOKEN);

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // =========================================  ADICIONA NOVA OBRA TEMPLATE ============================================

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

      const exampleEmbed = {
        color: "RANDOM",
        title: "Anotações",
        fields: [
          {
            name: "Nome da Obra",
            value: descri,
          },
        ],
      };
      message.channel.send("Salvo com sucesso.");
      message.channel.send({ embeds: [exampleEmbed] });
    } catch (err) {
      console.log(err);
      message.channel.send("Falha ao tentar salvar.");
    }
  }
  // =========================================     PESQUISA POR ATRIBUTO    ============================================
  if (message.content.toLowerCase().startsWith("?atributo")) {
    var contador = 0;
    const args = message.content.split(" ");

    if (args.length === 1) {
      const object = await Obra.find({ discordId: message.author.id });
      let description = "";
      for (const i in object) {
        contador += 1;
        if (object.length === contador) {
          break;
        } else {
          const retornoEmbed = {
            color: "RANDOM",
            title: `Obra: ${object[i].nomeObra}`,
            fields: [
              {
                name: "Autor Obra",
                value: `${object[i].autorObra}`,
                inline: true,
              },
              {
                name: "Faixa Etária",
                value: `${object[i].faixaEtariaObra}`,
                inline: true,
              },
              {
                name: "Gênero Textual",
                value: `${object[i].generoTextualObra}`,
                inline: true,
              },
              {
                name: "Status Obra",
                value: `${object[i].statusObra}`,
                inline: true,
              },
              {
                name: "Link Acesso",
                value: `${object[i].linkAcessoObra}`,
                inline: true,
              },
              {
                name: "Sinopse",
                value: `${object[i].sinopseObra}`,
              },
            ],
          };
          message.channel.send({ embeds: [retornoEmbed] });
          console.log("Erro!");
        }
      }
    } else {
      const arg = message.content.indexOf(" ");
      const valores = message.content.slice(
        arg + message.content.indexOf(args[1])
      );

      const atributo = args[1];
      const valor = args[2];

      try {
        const array = [
          "nomeObra",
          "generoTextualObra",
          "linkObra",
          "faixaObra",
          "statusObra",
          "generoObra",
        ];
        for (const i in array) {
          let result = array[i].toLowerCase().includes(atributo.toLowerCase());
          if (result) {
            let atri = atributo.toLowerCase();
            switch (atri) {
              case "nomeobra":
                object = await Obra.find({ nomeObra: valores });
                for (const i in object) {
                  const retornoEmbed = {
                    color: "RANDOM",
                    title: `Obra: ${object[i].nomeObra}`,
                    fields: [
                      {
                        name: "Autor Obra",
                        value: `${object[i].autorObra}`,
                        inline: true,
                      },
                      {
                        name: "Faixa Etária",
                        value: `${object[i].faixaEtariaObra}`,
                        inline: true,
                      },
                      {
                        name: "Gênero Textual",
                        value: `${object[i].generoTextualObra}`,
                        inline: true,
                      },
                      {
                        name: "Status Obra",
                        value: `${object[i].statusObra}`,
                        inline: true,
                      },
                      {
                        name: "Link Acesso",
                        value: `${object[i].linkAcessoObra}`,
                        inline: true,
                      },
                      {
                        name: "Sinopse",
                        value: `${object[i].sinopseObra}`,
                      },
                    ],
                  };
                  message.channel.send({ embeds: [retornoEmbed] });
                  contador += 1;
                  if (object.length === contador) {
                    break;
                  } else if (object.length > 1) {
                    message.channel.send("===============================");
                  }
                }
                break;
              case "generotextual":
                object = await Obra.find({ generoTextualObra: valor });
                for (const i in object) {
                  const retornoEmbed = {
                    color: "RANDOM",
                    title: `Obra: ${object[i].nomeObra}`,
                    fields: [
                      {
                        name: "Autor Obra",
                        value: `${object[i].autorObra}`,
                        inline: true,
                      },
                      {
                        name: "Faixa Etária",
                        value: `${object[i].faixaEtariaObra}`,
                        inline: true,
                      },
                      {
                        name: "Gênero Textual",
                        value: `${object[i].generoTextualObra}`,
                        inline: true,
                      },
                      {
                        name: "Status Obra",
                        value: `${object[i].statusObra}`,
                        inline: true,
                      },
                      {
                        name: "Link Acesso",
                        value: `${object[i].linkAcessoObra}`,
                        inline: true,
                      },
                      {
                        name: "Sinopse",
                        value: `${object[i].sinopseObra}`,
                      },
                    ],
                  };
                  message.channel.send({ embeds: [retornoEmbed] });
                  contador += 1;
                  if (object.length === contador) {
                    break;
                  } else if (object.length > 1) {
                    message.channel.send("===============================");
                  }
                }
                break;
              case "linkobra":
                object = await Obra.find({ linkAcessoObra: valor });
                for (const i in object) {
                  const retornoEmbed = {
                    color: "RANDOM",
                    title: `Obra: ${object[i].nomeObra}`,
                    fields: [
                      {
                        name: "Autor Obra",
                        value: `${object[i].autorObra}`,
                        inline: true,
                      },
                      {
                        name: "Faixa Etária",
                        value: `${object[i].faixaEtariaObra}`,
                        inline: true,
                      },
                      {
                        name: "Gênero Textual",
                        value: `${object[i].generoTextualObra}`,
                        inline: true,
                      },
                      {
                        name: "Status Obra",
                        value: `${object[i].statusObra}`,
                        inline: true,
                      },
                      {
                        name: "Link Acesso",
                        value: `${object[i].linkAcessoObra}`,
                        inline: true,
                      },
                      {
                        name: "Sinopse",
                        value: `${object[i].sinopseObra}`,
                      },
                    ],
                  };
                  message.channel.send({ embeds: [retornoEmbed] });
                  contador += 1;
                  if (object.length === contador) {
                    break;
                  } else if (object.length > 1) {
                    message.channel.send("===============================");
                  }
                }
                break;
              case "faixaobra":
                object = await Obra.find({ faixaEtariaObra: valor });
                for (const i in object) {
                  const retornoEmbed = {
                    color: "RANDOM",
                    title: `Obra: ${object[i].nomeObra}`,
                    fields: [
                      {
                        name: "Autor Obra",
                        value: `${object[i].autorObra}`,
                        inline: true,
                      },
                      {
                        name: "Faixa Etária",
                        value: `${object[i].faixaEtariaObra}`,
                        inline: true,
                      },
                      {
                        name: "Gênero Textual",
                        value: `${object[i].generoTextualObra}`,
                        inline: true,
                      },
                      {
                        name: "Status Obra",
                        value: `${object[i].statusObra}`,
                        inline: true,
                      },
                      {
                        name: "Link Acesso",
                        value: `${object[i].linkAcessoObra}`,
                        inline: true,
                      },
                      {
                        name: "Sinopse",
                        value: `${object[i].sinopseObra}`,
                      },
                    ],
                  };
                  message.channel.send({ embeds: [retornoEmbed] });
                  contador += 1;
                  if (object.length === contador) {
                    break;
                  } else if (object.length > 1) {
                    message.channel.send("===============================");
                  }
                }
                break;
              case "statusobra":
                object = await Obra.find({ statusObra: valor });
                for (const i in object) {
                  const retornoEmbed = {
                    color: "RANDOM",
                    title: `Obra: ${object[i].nomeObra}`,
                    fields: [
                      {
                        name: "Autor Obra",
                        value: `${object[i].autorObra}`,
                        inline: true,
                      },
                      {
                        name: "Faixa Etária",
                        value: `${object[i].faixaEtariaObra}`,
                        inline: true,
                      },
                      {
                        name: "Gênero Textual",
                        value: `${object[i].generoTextualObra}`,
                        inline: true,
                      },
                      {
                        name: "Status Obra",
                        value: `${object[i].statusObra}`,
                        inline: true,
                      },
                      {
                        name: "Link Acesso",
                        value: `${object[i].linkAcessoObra}`,
                        inline: true,
                      },
                      {
                        name: "Sinopse",
                        value: `${object[i].sinopseObra}`,
                      },
                    ],
                  };
                  message.channel.send({ embeds: [retornoEmbed] });
                  contador += 1;
                  if (object.length === contador) {
                    break;
                  } else if (object.length > 1) {
                    message.channel.send("===============================");
                  }
                }
                break;
              case "generoobra":
                object = await Obra.find({ generoObra: valor });
                for (const i in object) {
                  const retornoEmbed = {
                    color: "RANDOM",
                    title: `Obra: ${object[i].nomeObra}`,
                    fields: [
                      {
                        name: "Autor Obra",
                        value: `${object[i].autorObra}`,
                        inline: true,
                      },
                      {
                        name: "Faixa Etária",
                        value: `${object[i].faixaEtariaObra}`,
                        inline: true,
                      },
                      {
                        name: "Gênero Textual",
                        value: `${object[i].generoTextualObra}`,
                        inline: true,
                      },
                      {
                        name: "Status Obra",
                        value: `${object[i].statusObra}`,
                        inline: true,
                      },
                      {
                        name: "Link Acesso",
                        value: `${object[i].linkAcessoObra}`,
                        inline: true,
                      },
                      {
                        name: "Sinopse",
                        value: `${object[i].sinopseObra}`,
                      },
                    ],
                  };
                  message.channel.send({ embeds: [retornoEmbed] });
                  contador += 1;
                  if (object.length === contador) {
                    break;
                  } else if (object.length > 1) {
                    message.channel.send("===============================");
                  }
                }
                console.log("Erro!");
                break;
              default:
                message.channel.send(
                  "Não encontrado, verificado nome do atributo correto!"
                );
            }
          }
        }
      } catch (err) {
        console.log(err);
        message.channel.send("Não encontrado");
      }
    }
  }
  // =========================================  PESQUISA AS OBRAS DO AUTOR  ============================================
  if (message.content.toLowerCase().startsWith("?obras_autor")) {
    //pesquisa no schema Obra
    const args = message.content.split(" ");
    console.log(args);
    console.log(args.length);
    if (args.length === 1) {
      const argumento = await Obra.find({ discordId: message.author.id });
      let description = "";
      for (const i in argumento) {
        description += `${parseInt(i) + 1}) ${argumento[i].autorObra} \n ${
          argumento[i].nomeObra
        } \n`;
      }
      const exampleEmbed = {
        color: "RANDOM",
        title: "Obras Autores",
        fields: [
          {
            name: "Descrição da anotação",
            value: description,
          },
        ],
      };
      //message.channel.send(description);
      message.channel.send({ embeds: [exampleEmbed] });
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
          const retornoEmbed = {
            color: "RANDOM",
            title: "Obra: " + palavra.nomeObra,
            fields: [
              {
                name: "Autor Obra",
                value: palavra.autorObra,
                inline: true,
              },
              {
                name: "Faixa Etária",
                value: palavra.faixaEtariaObra,
                inline: true,
              },
              {
                name: "Gênero Textual",
                value: palavra.generoTextualObra,
                inline: true,
              },
              {
                name: "Status Obra",
                value: palavra.statusObra,
                inline: true,
              },
              {
                name: "Link Acesso",
                value: palavra.linkAcessoObra,
                inline: true,
              },
              {
                name: "Sinopse",
                value: palavra.sinopseObra,
              },
            ],
          };
          message.channel.send({ embeds: [retornoEmbed] });
        } else {
          message.channel.send("Não encontrado o valor informado.");
        }
      } catch (err) {
        console.log(err);
        message.channel.send("Não encontrado");
      }
    }
  }
  // =========================================    PESQUISA TODAS AS OBRAS   ============================================
  if (message.content.toLowerCase().startsWith("?pesquisar_obras")) {
    //pesquisa no schema Obra
    const args = message.content.split(" ");
    console.log(args);
    console.log(args.length);
    if (args.length === 1) {
      const argumento = await Obra.find({ discordId: message.author.id });
      let description = "";
      for (const i in argumento) {
        description += `${parseInt(i) + 1}) ${argumento[i].nomeObra} - ${
          argumento[i].autorObra
        } - ID Obra: ${argumento[i]._id} - Status: ${argumento[i].statusObra}\n`;
      }
      message.channel.send(description);
    } else {
      const arg = args[1];
      console.log(arg);
    }
  }
  // =========================================     DELETAR OBRAS DE AUTOR   ============================================
  if (message.content.toLowerCase().startsWith("?delete_obras_autor")) {
    //pesquisa no schema Autor
    const args = message.content.split(" ");
    console.log(args);
    console.log(args.length);
    if (args.length === 1) {
      const argumento = await Autor.nomeObra.find({
        discordId: message.author.id,
      });
      let description = "";
      for (const i in argumento) {
        description += `${parseInt(i) + 1}) ${argumento[i].autorObra}\n`;
      }
      message.channel.send(description);
    } else {
      const arg = args[1];
      console.log(arg);

      try {
        const palavra = await Obra.deleteMany({
          autorObra: arg,
        }); 
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
  // =========================================        DELETAR AUTOR         ============================================
  if (message.content.toLowerCase().startsWith("?delete_autor")) {
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
  // ========================================= UPDATE DE ATRIBUTO NOME OBRA ============================================
  if (message.content.toLowerCase().startsWith("?update_atributo_nomeobra")) {
    const args = message.content.trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let obraAtual = args[0];
    let obraAtualizada = args[1];
    /*
    const obraAtualizada = message.content.slice(
      args + message.content.indexOf(args[1])
    );
    */
    message.channel.send(
      `Obra ${obraAtual} atualizada para obra ${obraAtualizada}`
    );

    object = await Obra.updateOne(
      { _id: obraAtual },
      { nomeObra: obraAtualizada }
    );
  }
  // =========================     UPDATE DE ATRIBUTO AUTOR OBRA - TODOS LIVROS AUTOR     ============================
  if (message.content.toLowerCase().startsWith("?update_atributo_autorobra")) {
    const args = message.content.trim().split(/ +/);
    const command = args.shift().toLowerCase();

    //let nomedaObra = args[0];
    let autorAtual = args[0];
    let autorAtualizado = args[1];

    message.channel.send(
      `Obra atualizada. Autor alterado para para autor ${autorAtualizado}`
    );
    /*
    object = await Obra.findOneAndUpdate(
      { nomeObra: nomedaObra },
      { autorObra: autorAtualizado }
    );
    */
    object = await Obra.updateMany(
      { autorObra: autorAtual },
      { autorObra: autorAtualizado }
    );
  }
  // ==================================      UPDATE DE ATRIBUTO AUTOR OBRA POR ID      =================================
  if (message.content.toLowerCase().startsWith("?update_autorobra_idobra")) {
    const args = message.content.trim().split(/ +/);
    const command = args.shift().toLowerCase();

    let idObra = args[0];
    //let autorAtual = args[1];
    let autorAtualizado = args[1];

    message.channel.send(
      `Obra atualizada. Autor alterado para para autor ${autorAtualizado}`
    );
    /*
    object = await Obra.findOneAndUpdate(
      { nomeObra: nomedaObra },
      { autorObra: autorAtualizado }
    );
    */
    object = await Obra.updateOne(
      { _id: idObra },
      { autorObra: autorAtualizado }
    );
  }
  // ========================================       UPDATE STATUS DA OBRA   =============================================
  if (message.content.toLowerCase().startsWith("?update_status_obra")) {
    const args = message.content.trim().split(/ +/);
    const command = args.shift().toLowerCase();

    let nomedaObra = args[0];
    let statusObra = args[1];

    message.channel.send(
      `Obra ${nomedaObra} atualizada. O status foi alterado para ${statusObra}`
    );

    object = await Obra.findOneAndUpdate(
      { nomeObra: nomedaObra },
      { statusObra: statusObra }
    );
    //object = await Obra.updateMany({ autorObra: autorAtual }, { autorObra: autorAtualizado });
  }
  // =========================================     RECOMENDAÇÃO DE LIVRO     ===========================================
  if (message.content.toLowerCase().startsWith("?recomendacao")) {
    const args = message.content.split(" ");

    var random = Math.floor(Math.random() * 5);

    if (args.length === 1) {
      Obra.findOne()
        .skip(random)
        .exec(function (erro, result) {
          const Embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(result.nomeObra)
            .setDescription(result.sinopseObra)
            .setThumbnail(
              "https://ifrs.edu.br/restinga/wp-content/uploads/sites/5/2018/05/marca-ifrs-vertical.jpg"
            )
            .addFields(
              {
                name: "Gênero da Obra",
                value: result.generoTextualObra,
              },
              {
                name: "Status",
                value: result.statusObra,
              },
              {
                name: "Link para acessar a obra",
                value: result.linkAcessoObra,
              }
            );
          message.channel.send({ embeds: [Embed] });
          message.author.send({ embeds: [Embed] });
        });
    }
  }
  // =========================================         HELP DISCORD          ===========================================
  if (message.content.toLowerCase().startsWith("?help")) {
    const Embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Lista de Comandos")
      .setDescription("Abaixo segue os comandos utilizados pelo BOT.")
      .setThumbnail(
        "https://ifrs.edu.br/restinga/wp-content/uploads/sites/5/2018/05/marca-ifrs-vertical.jpg"
      )
      .addFields(
        {
          name: "Comandos de Criação",
          value:
            "`!obranova`\n" +
            "`/formulario_cadastro_autor`\n" +
            "`/formulario_cadastro_livro`\n",
        },
        {
          name: "Comandos de Busca",
          value: "`?obras_autor`\n" + "`?pesquisar_obras`\n" + "`?atributo`\n",
          inline: true,
        },
        {
          name: "Comandos de Delete",
          value: "`?delete_autor`\n" + "`?delete_obras_autor`\n",
          inline: true,
        },
        {
          name: "Comandos gerais",
          value: "`?recomendacao` " + "` /ping` " + "` /say`",
          //inline: true,
        }
      );
    message.channel.send({ embeds: [Embed] });
    message.author.send({ embeds: [Embed] });
  }
  // ========================================       UPDATE STATUS DA OBRA   =============================================
  if (message.content.toLowerCase().startsWith("!help_comando")) {
    const args = message.content.trim().split(/ +/);
    const command = args.shift().toLowerCase();

    let comando = args[0];
    switch (comando) {
      case "pesquisar_obras":
        const EmbedPesquisa = {
          color: "RANDOM",
          title: `Utilizando o comando ${comando}`,
          fields: [
            {
              name: "Descrição",
              value:
                "Retorna tal informação de tal coisa, \n afim de fazer isso e aquilo.",
            },
          ],
        };
        message.channel.send({ embeds: [EmbedPesquisa] });
        break;
      case "recomendacao":
        const EmbedRecomendacao = {
          color: "RANDOM",
          title: `Utilizando o comando ${comando}`,
          fields: [
            {
              name: "Descrição",
              value:
                "Retorna tal informação de tal coisa, \n afim de fazer isso e aquilo.",
            },
          ],
        };
        message.channel.send({ embeds: [EmbedRecomendacao] });
      break;
      default:
        const EmbedErro = {
          color: "RED",
          title: `ERRO`,
          fields: [
            {
              name: "Motivo",
              value:
                "Comando não existe ou não foi cadastrado ainda!",
            },
          ],
        };
        message.channel.send({ embeds: [EmbedErro] });
        //message.channel.send("Comando não existe ou não foi cadastrado ainda!");
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
    const args = message.content.split(" ");
    console.log(args);
    if (args.length === 1) {
      const notes = await Note.find({ userId: message.author.id });
      let description = "";
      for (const i in notes) {
        description += `${parseInt(i) + 1}) ${notes[i].description}\n`;
      }
      const exampleEmbed = {
        color: "RANDOM",
        title: "Anotações",
        fields: [
          {
            name: "Descrição da anotação",
            value: description,
          },
        ],
      };
      //message.channel.send(description);
      message.channel.send({ embeds: [exampleEmbed] });
    } else {
      const arg = args[1];
      const note = await Note.findById(arg);
      if (note) {
        //message.channel.send(note.description);
        message.channel.send({ embeds: [exampleEmbed] });
      } else {
        message.channel.send("Nota não encontrada");
      }
    }
  }
  /* =============================== ATUALIZA AS NOTAS NO BANCO DE DADOS ============================= */
  if (message.content.toLowerCase().startsWith("?updatenotes")) {
    //?updatenotes
    //?updatenotes <<id>>
    const args = message.content.trim().split(/ +/);
    const command = args.shift().toLowerCase();

    let nota = args[0];
    let nota2 = args[1];

    message.channel.send(`Nota ${nota} atualizado para ${nota2}`);

    object = await Note.updateOne(
      { description: nota },
      { description: nota2 }
    );
  }
  // ================================ CRIAÇÃO CLUBE DO LIVRO ========================
  if (message.content.toLowerCase().startsWith("?criar_clube")) {
    const index = message.content.indexOf(" ");
    const nomeClube = message.content.slice(index + 1);
    message.guild.channels
      .create(nomeClube, {
        type: "GUILD_TEXT",
      })
      .then((channel) => {
        console.log(channel);
        const categoryID = "939793847448399907";
        channel.setParent(categoryID);
      });
  }
  // =============================== ADICIONAR USUÁRIOS AO CLUBE DO LIVRO ==============================
  if (message.content.toLowerCase().startsWith("?adicionar_usuario_clube")) {
    let clube = args[0];
    let usuario = args[1];

    let member = usuario;

    member.roles.add(role).catch(console.error);

    message.author.send(
      `Obra ${nomedaObra} atualizada. Autor alterado para para autor ${autorAtualizado}`
    );
  }
});
