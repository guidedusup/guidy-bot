import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Supprime un nombre de messages.")
    .addIntegerOption(opt =>
      opt.setName("nombre").setDescription("Nombre de messages à supprimer").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const count = interaction.options.getInteger("nombre");
    await interaction.channel.bulkDelete(count, true);
    await interaction.reply({ content: `🧹 ${count} messages supprimés.`, ephemeral: true });
  },
};
