import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Expulse un membre du serveur.")
    .addUserOption(opt => opt.setName("membre").setDescription("Membre à expulser").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction) {
    const user = interaction.options.getUser("membre");
    const member = await interaction.guild.members.fetch(user.id);
    await member.kick();
    await interaction.reply(`🚪 ${user.tag} a été expulsé.`);
  },
};
