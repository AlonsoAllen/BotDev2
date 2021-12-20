const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client){
        super(client, {
            name: 'ping',
            descriptions: 'Mostra o ping do bot'
        })
    }

    run = (interaction) => {
        interaction.reply({
            content: `O Ping do bot é \`${this.client.ws.ping}\`ms.`,
            ephemeral: true
        })
    }
}
