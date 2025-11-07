import { Client, Collection, GatewayIntentBits, Partials, REST, Routes, ActivityType } from "discord.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.commands = new Collection();

// Import auto des commandes (top-level await utilisé)
const commandFiles = fs.readdirSync("./commands").filter(f => f.endsWith(".js"));
for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  client.commands.set(command.default.data.name, command.default);
}

// Enregistrement des commandes slash
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
(async () => {
  try {
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: client.commands.map(cmd => cmd.data.toJSON()),
    });
    console.log("✅ Commandes slash enregistrées !");
  } catch (err) {
    console.error(err);
  }
})();

// Statuts humoristiques tournants
const statuses = [
  { name: "réviser 10min avant le DS 📚", type: ActivityType.Playing },
  { name: "aider un étudiant en détresse 😭", type: ActivityType.Competing },
  { name: "attendre la bourse du CROUS 💸", type: ActivityType.Watching },
  { name: "faire semblant de comprendre Parcoursup 🤡", type: ActivityType.Playing },
  { name: "corriger des CV à 2h du mat 💤", type: ActivityType.Watching },
  { name: "boire un café pour la 5e fois ☕", type: ActivityType.Playing },
  { name: "motiver les terminales (c’est dur) 😩", type: ActivityType.Competing },
  { name: "rêver d’un semestre sans rattrapages 💀", type: ActivityType.Listening },
  { name: "survivre à Excel depuis 2010 📊", type: ActivityType.Playing },
  { name: "faire genre que tout va bien 🎭", type: ActivityType.Watching },
  { name: "recharger sa carte RU... ou pas 💳", type: ActivityType.Playing },
  { name: "disserter sur la procrastination 😅", type: ActivityType.Playing },
  { name: "donner des conseils non sollicités 🤓", type: ActivityType.Competing },
  { name: "attendre la note de philo depuis 3 mois 📜", type: ActivityType.Watching },
  { name: "corriger un PowerPoint à 1h du mat 🔧", type: ActivityType.Listening },
];

client.once("ready", () => {
  console.log(`🤖 Connecté en tant que ${client.user.tag}`);
  let i = 0;
  client.user.setActivity(statuses[i]);
  setInterval(() => {
    i = (i + 1) % statuses.length;
    client.user.setActivity(statuses[i]);
    console.log(`🕒 Statut mis à jour : ${statuses[i].name}`);
  }, 60 * 60 * 1000); // toutes les heures
});

// Message de bienvenue
client.on("guildMemberAdd", member => {
  const channel = member.guild.systemChannel;
  if (!channel) return;
  channel.send(`👋 Bienvenue ${member} chez **GuideduSup** ! On t'aidera... ou du moins on essaiera 😅`);
});

// Gestion des interactions (slash commands)
client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: "❌ Erreur lors de l’exécution de la commande.", ephemeral: true });
    } else {
      await interaction.reply({ content: "❌ Erreur lors de l’exécution de la commande.", ephemeral: true });
    }
  }
});

// Commandes préfixées simples
client.on("messageCreate", async message => {
  if (!message.content.startsWith("!") || message.author.bot) return;
  const [cmd, ...args] = message.content.slice(1).split(/\s+/);

  switch (cmd.toLowerCase()) {
    case "ping":
      await message.reply("🏓 Pong !");
      break;
    case "help":
      await message.reply("Utilise `/help` pour voir la liste complète des commandes.");
      break;
  }
});

client.login(process.env.TOKEN);
