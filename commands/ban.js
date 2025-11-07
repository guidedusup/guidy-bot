import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bannit un membre du serveur.")
    .addUserOption(opt => opt.setName("membre").setDescription("Membre à bannir").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction) {
    const user = interaction.options.getUser("membre");
    await interaction.guild.members.ban(user.id);
    await interaction.reply(`⛔ ${user.tag} a été banni.`);
  },
};
