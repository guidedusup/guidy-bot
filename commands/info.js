import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Affiche les informations sur GuideduSup."),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("🎓 GuideduSup")
      .setDescription("GuideduSup est une association qui accompagne les lycéens et étudiants dans leur orientation, leurs études et leur bien-être.")
      .addFields(
        { name: "📱 Réseaux", value: "Instagram: https://instagram.com/guidedusup", inline: true },
        { name: "💼 Site", value: "https://paheko.loanns-place.ynh.fr", inline: true }
      )
      .setColor("#3b82f6");
    await interaction.reply({ embeds: [embed] });
  },
};
