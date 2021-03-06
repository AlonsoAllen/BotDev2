const Command = require('../../structures/Command')
const mongoose = require('mongoose')
const questions = require('../../util/FormCadastroLivro')

const { once } = require('events')
const { MessageEmbed, MessageActionRow, MessageSelectMenu, Message } = require('discord.js')

const Obra = require('../../schemas/ObraSchema')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'formulario_cadastro_livro',
            descriptions: 'Realiza um formulário de cadastro de livro no Discord'
        })
    }

    run = (interaction) => {
        interaction.reply({ content: 'Formulário iniciado. Responda às perguntas abaixo:', ephemeral: true })
        console.log("=======================>>> Formulário de Cadastro de Obra iniciado <<<======================")

        createForm()
            .then(answers => {
                const embed = new MessageEmbed()
                    .setTitle('Respostas do Formulário:')
                    .setDescription('Retorno do questionário de Livros')
                    .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setFooter(`ID do usuário: ${interaction.user.id}`)
                    .setColor('GREEN')
                    .addFields(answers)

                interaction.channel.send({ embeds: [embed] })
            })
            .catch((erro) => {
                const embed = new MessageEmbed()
                    .setColor('RED')
                    .setDescription(erro)

                interaction.channel.send({ content: interaction.user.toString(), embeds: [embed] })
            })

        async function createForm() {
            const answers = []
            const channel = interaction.channel

            for (const question of questions) {
                const embed = new MessageEmbed()
                    .setTitle(question.question)
                    .setFooter('Você tem 5 minutos para responder à esta pergunta.') // 5 minutos para cada pergunta

                if (question.options) {
                    const actionRow = new MessageActionRow()
                        .addComponents(new MessageSelectMenu(question))
                    const msg = await channel.send({ content: interaction.user.toString(), embeds: [embed], components: [actionRow] })

                    const filter = (i) => i.user.id = interaction.user.id

                    const collector = msg.createMessageComponentCollector({ filter, max: 1, time: (5 * 60000) })

                    const [collected, reason] = await once(collector, 'end')

                    if (reason === 'limit') {
                        msg.delete().catch(() => { })
                        answers.push({
                            name: collected.first().customId,
                            value: collected.first().values.join(', ')
                        })
                    }
                    else if (reason === 'time') throw ('O tempo para responder a pergunta se esgotou! Formulário cancelado.')
                    else throw ('Ocorreu um erro durante a realização do formulário e este foi finalizado.')
                } else {
                    const msg = await channel.send({ content: interaction.user.toString(), embeds: [embed] })

                    const filter = (m) => m.author.id === interaction.user.id && m.content?.length > 0 && m.content?.length < 1058
                    const collector = channel.createMessageCollector({ filter, max: 1, time: (5 * 60000) })

                    //collector.once('end', (collected, reason) => {}) - mesma coisa que a linha abaixo 47
                    const [collected, reason] = await once(collector, 'end')
                    console.log(collected)
                    console.log(reason)

                    if (reason === 'limit') {
                        channel.bulkDelete([msg.id, collected.first().id]).catch(() => { })
                        answers.push({
                            name: question.name,
                            value: collected.first().content
                        })
                    }
                    else if (reason === 'time') throw ('O tempo para responder a pergunta se esgotou! Formulário cancelado.')
                    else throw ('Ocorreu um erro durante a realização do formulário e este foi finalizado.')
                }
                console.log(answers)
            }            
            const newObra = await Obra.create({
                nomeObra: answers[0].value,
                autorObra: answers[1].value,
                generoTextualObra: answers[2].value,                
                linkAcessoObra: answers[3].value,
                faixaEtariaObra: answers[4].value,               
                statusObra: answers[5].value,
                generoObra: answers[6].value,
                sinopseObra: answers[7].value,
            });

            return answers                  
        }
    }
}
