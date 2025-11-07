import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Liste toutes les commandes de Guidy."),
  async execute(interaction) {
    await interaction.reply({
      content:
        "📚 **Commandes disponibles :**\n\n" +
        "/info → Infos sur GuideduSup\n" +
        "/poll → Créer un sondage\n" +
        "/clear → Supprimer des messages (modération)\n" +
        "/kick → Expulser un membre (modération)\n" +
        "/ban → Bannir un membre (modération)\n\n" +
        "Et `!ping` reste disponible pour tester la réactivité.",
      ephemeral: true,
    });
  },
};
