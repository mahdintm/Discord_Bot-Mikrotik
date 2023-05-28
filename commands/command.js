import { EmbedBuilder } from "discord.js";
import { GenerateCode } from "../Utils/CodeGenerator.js";
import { a as cfg } from "../config.js";
import { Mikrotik } from "../Mikrotik/Mikrotik.js";
import { client } from "../app.js";
export class commands {
  static async adduser(interaction) {
    if (interaction.channelId != cfg.Channels.Admin) return interaction.editReply("شما مجاز به استفاده از این دستور در این چنل نیستید");
    if (!interaction.member.roles.cache.has(cfg.role.admin)) {
      return interaction.editReply(`شما دسترسی به این دستور رو ندارید`);
    }
    try {
      let prifix = interaction.options.get("prifix").value;
      let group = interaction.options.get("group").value;
      let profile = interaction.options.get("profile").value;
      let Comment = interaction.options.get("comment").value;
      if ((group == "unlimited" || group == "Famil" || group == "Free Friends") && !interaction.member.roles.cache.has(cfg.role.owner)) {
        return interaction.editReply(`شما دسترسی به گروه ${group}  را ندارید`);
      }
      if ((profile == "unlimit" || profile == "Unlimit_Time_50GB") && !interaction.member.roles.cache.has(cfg.role.owner)) {
        return interaction.editReply(`شما دسترسی به پروفایل ${profile}  را ندارید`);
      }
      let name = `${prifix}_${await GenerateCode(5)}`;
      let a = name;
      let password = `${await GenerateCode(6)}`;
      let user = await Mikrotik.UserManager.User.Get(name);
      if (user) name = `${prifix}_${await GenerateCode(6)}`;
      try {
        if ((await Mikrotik.login()) != true) return interaction.editReply("یک مشکلی از طرف روتر هست");
      } catch (error) {
        interaction.editReply("یک مشکلی از طرف روتر هست");
        return console.log(error);
      }
      await Mikrotik.UserManager.User.Create(name, password, group, 2, Comment);
      await Mikrotik.UserManager.User_Profile.Create(name, profile);
      const embed = new EmbedBuilder().setTitle("ساخت کاربر جدید").setDescription("کاربر شما با موفقیت ساخته شد").setColor("Random").addFields(
        {
          name: "یوزر",
          value: a,
          inline: false,
        },
        {
          name: "کلمه عبور",
          value: password,
          inline: false,
        },
        {
          name: "گروه",
          value: group,
          inline: false,
        },
        {
          name: "پروفایل",
          value: profile,
          inline: false,
        },
      );
      await interaction.editReply({ embeds: [embed] });

      const Log_embed = new EmbedBuilder()
        .setTitle("Create User")
        .setColor("#0060ff")
        .addFields([
          {
            name: "admin",
            value: interaction.member.displayName,
            inline: false,
          },
          {
            name: "User",
            value: name,
            inline: false,
          },
          {
            name: "Profile",
            value: profile,
            inline: true,
          },
          {
            name: "Group",
            value: group,
            inline: true,
          },
          {
            name: "Comment",
            value: Comment,
            inline: true,
          },
        ])
        .setFooter({ text: `Date: ${new Date().toLocaleString("fa-IR")}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) });
      const channel = client.channels.cache.get(cfg.Channels.log);
      channel.send({ embeds: [Log_embed] });
    } catch (error) {
      interaction.editReply("error");
      console.log(error);
    }
  }
  static async getuser(interaction) {
    if (interaction.channelId != cfg.Channels.Admin) return interaction.editReply("شما مجاز به استفاده از این دستور در این چنل نیستید");
    if (!interaction.member.roles.cache.has(cfg.role.admin)) {
      return interaction.editReply(`شما دسترسی به این دستور رو ندارید`);
    }
    try {
      let username = interaction.options.get("username").value;
      try {
        if ((await Mikrotik.login()) != true) return interaction.editReply("یک مشکلی از طرف روتر هست");
      } catch (error) {
        interaction.editReply("یک مشکلی از طرف روتر هست");
        return console.log(error);
      }
      let user = await Mikrotik.UserManager.User.Get(username);
      if (!user) return interaction.editReply("کاربر یافت نشد");
      let user_profile = await Mikrotik.UserManager.User_Profile.Get(username);
      if ((user.group == "unlimited" || user.group == "Famil" || user.group == "Free Friends") && !interaction.member.roles.cache.has(cfg.role.owner)) {
        return interaction.editReply(`شما دسترسی به این کاربر ${user.name} رو ندارید`);
      }
      if ((user.profile == "unlimit" || user.profile == "Unlimit_Time_50GB") && !interaction.member.roles.cache.has(cfg.role.owner)) {
        return interaction.editReply(`شما دسترسی به پروفایل ${user.profile}  را ندارید`);
      }
      const embed = new EmbedBuilder().setTitle(`کاربر ${user.name}`).setDescription("کاربر شما با موفقیت پیدا شد").setColor("Random").addFields(
        {
          name: "یوزر",
          value: user.name,
          inline: false,
        },
        {
          name: "گروه",
          value: user.group,
          inline: false,
        },
        {
          name: "پروفایل",
          value: user_profile.profile,
          inline: false,
        },
        {
          name: "همزمانی",
          value: user["shared-users"],
          inline: false,
        },
        {
          name: "وضعیت",
          value: user_profile.state,
          inline: false,
        },
        {
          name: "انقضا",
          value: user_profile["end-time"],
          inline: false,
        },
        {
          name: "Commnet",
          value: user.comment,
          inline: false,
        },
      );

      interaction.editReply({ embeds: [embed] });
      const Log_embed = new EmbedBuilder()
        .setTitle("Get User")
        .setColor("#0060ff")
        .addFields([
          {
            name: "admin",
            value: interaction.member.displayName,
            inline: false,
          },
          {
            name: "User",
            value: username,
            inline: true,
          },
          {
            name: "گروه",
            value: user.group,
            inline: false,
          },
          {
            name: "پروفایل",
            value: user_profile.profile,
            inline: false,
          },
          {
            name: "همزمانی",
            value: user["shared-users"],
            inline: false,
          },
          {
            name: "وضعیت",
            value: user_profile.state,
            inline: false,
          },
          {
            name: "انقضا",
            value: user_profile["end-time"],
            inline: false,
          },
          {
            name: "Commnet",
            value: user.comment,
            inline: false,
          },
        ])
        .setFooter({ text: `Date: ${new Date().toLocaleString("fa-IR")}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) });
      const channel = client.channels.cache.get(cfg.Channels.log);
      channel.send({ embeds: [Log_embed] });
    } catch (error) {
      interaction.editReply("error");
      console.log(error);
    }
  }
  static async extensionuser(interaction) {
    if (interaction.channelId != cfg.Channels.Admin) return interaction.editReply("شما مجاز به استفاده از این دستور در این چنل نیستید");
    if (!interaction.member.roles.cache.has(cfg.role.admin)) {
      return interaction.editReply(`شما دسترسی به این دستور رو ندارید`);
    }
    try {
      let username = interaction.options.get("username").value;
      let group = interaction.options.get("group").value;
      let profile = interaction.options.get("profile").value;
      try {
        if ((await Mikrotik.login()) != true) return interaction.editReply("یک مشکلی از طرف روتر هست");
      } catch (error) {
        interaction.editReply("یک مشکلی از طرف روتر هست");
        return console.log(error);
      }
      if ((group == "unlimited" || group == "Famil" || group == "Free Friends") && !interaction.member.roles.cache.has(cfg.role.owner)) {
        return interaction.editReply(`شما دسترسی به این کاربر ${user.name} رو ندارید`);
      }
      if ((profile == "unlimit" || profile == "Unlimit_Time_50GB") && !interaction.member.roles.cache.has(cfg.role.owner)) {
        return interaction.editReply(`شما دسترسی به پروفایل ${profile}  را ندارید`);
      }
      let user = await Mikrotik.UserManager.User.Get(username);
      if (!user) return interaction.editReply("کاربر یافت نشد");
      let user_profile = await Mikrotik.UserManager.User_Profile.Get(username);
      if (user_profile) await Mikrotik.UserManager.User_Profile.Remove(user.name);
      await Mikrotik.UserManager.User.Remove(user.name);
      await Mikrotik.UserManager.User.Create(user.name, user.password, group, user["shared-users"], user.comment);
      await Mikrotik.UserManager.User_Profile.Create(user.name, profile);
      const embed = new EmbedBuilder().setTitle(`کاربر ${user.name}`).setDescription("کاربر شما با موفقیت پیدا شد").setColor("Random").addFields(
        {
          name: "یوزر",
          value: user.name,
          inline: false,
        },
        {
          name: "گروه",
          value: group,
          inline: false,
        },
        {
          name: "پروفایل",
          value: profile,
          inline: false,
        },
        {
          name: "همزمانی",
          value: user["shared-users"],
          inline: false,
        },
        {
          name: "وضعیت",
          value: user_profile.state,
          inline: false,
        },
        {
          name: "انقضا",
          value: user_profile["end-time"],
          inline: false,
        },
        {
          name: "Commnet",
          value: user.comment,
          inline: false,
        },
      );

      interaction.editReply({ embeds: [embed] });
      const Log_embed = new EmbedBuilder()
        .setTitle("Extension User")
        .setColor("#0060ff")
        .addFields([
          {
            name: "admin",
            value: interaction.member.displayName,
            inline: false,
          },
          {
            name: "یوزر",
            value: user.name,
            inline: false,
          },
          {
            name: "گروه",
            value: user.group,
            inline: true,
          },
          {
            name: "پروفایل",
            value: user_profile.profile,
            inline: true,
          },
          {
            name: "همزمانی",
            value: user["shared-users"],
            inline: false,
          },
          {
            name: "وضعیت",
            value: user_profile.state,
            inline: true,
          },
          {
            name: "انقضا",
            value: user_profile["end-time"],
            inline: true,
          },
          {
            name: "Commnet",
            value: user.comment,
            inline: false,
          },
        ])
        .setFooter({ text: `Date: ${new Date().toLocaleString("fa-IR")}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) });
      const channel = client.channels.cache.get(cfg.Channels.log);
      channel.send({ embeds: [Log_embed] });
    } catch (error) {
      interaction.editReply("error");
      console.log(error);
    }
  }
  static async deleteUser(interaction) {
    if (interaction.channelId != cfg.Channels.Admin) return interaction.editReply("شما مجاز به استفاده از این دستور در این چنل نیستید");
    if (!interaction.member.roles.cache.has(cfg.role.admin)) {
      return interaction.editReply(`شما دسترسی به این دستور رو ندارید`);
    }
    try {
      let username = interaction.options.get("username").value;
      try {
        if ((await Mikrotik.login()) != true) return interaction.editReply("یک مشکلی از طرف روتر هست");
      } catch (error) {
        interaction.editReply("یک مشکلی از طرف روتر هست");
        return console.log(error);
      }

      let user = await Mikrotik.UserManager.User.Get(username);
      if (!user) return interaction.editReply("> **کاربر یافت نشد**");
      if ((user.group == "unlimited" || user.group == "Famil" || user.group == "Free Friends") && !interaction.member.roles.cache.has(cfg.role.owner)) {
        return interaction.editReply(`شما دسترسی به این کاربر ${user.name} رو ندارید`);
      }
      if ((user.profile == "unlimit" || user.profile == "Unlimit_Time_50GB") && !interaction.member.roles.cache.has(cfg.role.owner)) {
        return interaction.editReply(`شما دسترسی به پروفایل ${user.profile}  را ندارید`);
      }
      let user_profile = await Mikrotik.UserManager.User_Profile.Get(username);
      if (user_profile) await Mikrotik.UserManager.User_Profile.Remove(user.name);
      await Mikrotik.UserManager.User.Remove(user.name);
      const embed = new EmbedBuilder().setTitle(`کاربر ${user.name}`).setDescription(`کاربر ${user.name} با موفقیت حذف شد`).setColor("Random").addFields();
      interaction.editReply({ embeds: [embed] });
      const Log_embed = new EmbedBuilder()
        .setTitle("Delete User")
        .setColor("#0060ff")
        .addFields([
          {
            name: "admin",
            value: interaction.member.displayName,
            inline: false,
          },
          {
            name: "User",
            value: username,
            inline: false,
          },
          {
            name: "Profile",
            value: `${await user_profile.profile}`,
            inline: true,
          },
          {
            name: "Group",
            value: `${await user.group}`,
            inline: true,
          },
          {
            name: "Comment",
            value: `${await user.comment}`,
            inline: true,
          },
        ])
        .setFooter({ text: `Date: ${new Date().toLocaleString("fa-IR")}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) });
      const channel = client.channels.cache.get(cfg.Channels.log);
      channel.send({ embeds: [Log_embed] });
    } catch (error) {
      interaction.editReply("error");
      console.log(error);
    }
  }
  static async resetPassword(interaction) {
    if (interaction.channelId != cfg.Channels.Admin) return interaction.editReply("شما مجاز به استفاده از این دستور در این چنل نیستید");
    if (!interaction.member.roles.cache.has(cfg.role.admin)) {
      return interaction.editReply(`شما دسترسی به این دستور رو ندارید`);
    }
    try {
      let username = interaction.options.get("username").value;
      try {
        if ((await Mikrotik.login()) != true) return interaction.editReply("یک مشکلی از طرف روتر هست");
      } catch (error) {
        interaction.editReply("یک مشکلی از طرف روتر هست");
        return console.log(error);
      }
      let user = await Mikrotik.UserManager.User.Get(username);
      if (!user) return interaction.editReply("> **کاربر یافت نشد**");
      if ((user.group == "unlimited" || user.group == "Famil" || user.group == "Free Friends") && !interaction.member.roles.cache.has(cfg.role.owner)) {
        return interaction.editReply(`شما دسترسی به این کاربر ${user.name} رو ندارید`);
      }
      if ((user.profile == "unlimit" || user.profile == "Unlimit_Time_50GB") && !interaction.member.roles.cache.has(cfg.role.owner)) {
        return interaction.editReply(`شما دسترسی به پروفایل ${user.profile}  را ندارید`);
      }
      let password = `${await GenerateCode(6)}`;
      Mikrotik.UserManager.User.Set(username, "password", password);
      const embed = new EmbedBuilder()
        .setTitle(`کاربر ${user.name}`)
        .setDescription(`رمز کاربر${user.name} با موفقیت ریست شد`)
        .setColor("Random")
        .addFields([
          {
            name: "Password",
            value: password,
            inline: false,
          },
        ]);
      interaction.editReply({ embeds: [embed] });
      const Log_embed = new EmbedBuilder()
        .setTitle("Reset Password")
        .setColor("#0060ff")
        .addFields([
          {
            name: "admin",
            value: interaction.member.displayName,
            inline: false,
          },
          {
            name: "User",
            value: username,
            inline: false,
          },
        ])
        .setFooter({ text: `Date: ${new Date().toLocaleString("fa-IR")}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) });
      const channel = client.channels.cache.get(cfg.Channels.log);
      channel.send({ embeds: [Log_embed] });
    } catch (error) {
      interaction.editReply("error");
      console.log(error);
    }
  }
  static async UserUsage(interaction) {
    if (interaction.channelId != cfg.Channels.Admin) return interaction.editReply("شما مجاز به استفاده از این دستور در این چنل نیستید");
    if (!interaction.member.roles.cache.has(cfg.role.admin)) {
      return interaction.editReply(`شما دسترسی به این دستور رو ندارید`);
    }
    try {
      let username = interaction.options.get("username").value;
      try {
        if ((await Mikrotik.login()) != true) return interaction.editReply("یک مشکلی از طرف روتر هست");
      } catch (error) {
        interaction.editReply("یک مشکلی از طرف روتر هست");
        return console.log(error);
      }
      let user = await Mikrotik.UserManager.User.Get(username);
      if (!user) return interaction.editReply("> **کاربر یافت نشد**");
      if ((user.group == "unlimited" || user.group == "Famil" || user.group == "Free Friends") && !interaction.member.roles.cache.has(cfg.role.owner)) {
        return interaction.editReply(`شما دسترسی به این کاربر ${user.name} رو ندارید`);
      }
      if ((user.profile == "unlimit" || user.profile == "Unlimit_Time_50GB") && !interaction.member.roles.cache.has(cfg.role.owner)) {
        return interaction.editReply(`شما دسترسی به پروفایل ${user.profile}  را ندارید`);
      }
      let data = await Mikrotik.UserManager.Monitor.UserUsage(username);
      const embed = new EmbedBuilder()
        .setTitle(`کاربر ${user.name}`)
        .setDescription(`کاربر${user.name} با موفقیت پیدا شد`)
        .setColor("Random")
        .addFields([
          {
            name: "Total Uptime",
            value: `${await data["total-uptime"]} `,
            inline: false,
          },
          {
            name: "Total Download",
            value: `${(parseInt(await data["total-download"]) / 1073741824).toFixed(2)} GB`,
            inline: true,
          },
          {
            name: "Total Upload",
            value: `${(parseInt(await data["total-upload"]) / 1073741824).toFixed(2)} GB`,
            inline: true,
          },
        ]);
      interaction.editReply({ embeds: [embed] });
      const Log_embed = new EmbedBuilder()
        .setTitle("Get User Usage")
        .setColor("#0060ff")
        .addFields([
          {
            name: "admin",
            value: interaction.member.displayName,
            inline: false,
          },
          {
            name: "User",
            value: username,
            inline: false,
          },
          {
            name: "Total Uptime",
            value: `${await data["total-uptime"]} `,
            inline: false,
          },
          {
            name: "Total Download",
            value: `${(parseInt(await data["total-download"]) / 1073741824).toFixed(2)} GB`,
            inline: true,
          },
          {
            name: "Total Upload",
            value: `${(parseInt(await data["total-upload"]) / 1073741824).toFixed(2)} GB`,
            inline: true,
          },
        ])
        .setFooter({ text: `Date: ${new Date().toLocaleString("fa-IR")}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) });
      const channel = client.channels.cache.get(cfg.Channels.log);
      channel.send({ embeds: [Log_embed] });
    } catch (error) {
      interaction.editReply("error");
      console.log(error);
    }
  }
}
