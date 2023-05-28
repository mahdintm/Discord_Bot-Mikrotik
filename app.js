import { Mikrotik } from "./Mikrotik/Mikrotik.js";
import { commands } from "./commands/command.js";
import { a as cfg } from "./config.js";
import { Client, IntentsBitField, EmbedBuilder, ActivityType } from "discord.js";
export const client = new Client({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent] });

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  try {
    if ((await Mikrotik.login()) != true) return interaction.editReply("یک مشکلی از طرف روتر هست");
  } catch (error) {
    return interaction.editReply(error);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    await interaction.deferReply({ ephemeral: true });
    switch (interaction.commandName) {
      case "adduser":
        await commands.adduser(interaction);

        break;
      case "getuser":
        await commands.getuser(interaction);
        break;
      case "extensionuser":
        await commands.extensionuser(interaction);
        break;
      case "deleteuser":
        await commands.deleteUser(interaction);
        break;
      case "resetpassword":
        await commands.resetPassword(interaction);
        break;
      case "userusage":
        await commands.UserUsage(interaction);
        break;
    }
  } else {
    return;
  }
});

client.login(cfg.token);
