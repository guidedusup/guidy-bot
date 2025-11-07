import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Crée un sondage rapide.")
    .addStringOption(option =>
      option.setName("question").setDescription("Question du sondage").setRequired(true)
    ),
  async execute(interaction) {
    const question = interaction.options.getString("question");
    const msg = await interaction.reply({ content: `📊 **${question}**`, fetchReply: true });
    await msg.react("👍");
    await msg.react("👎");
  },
};
