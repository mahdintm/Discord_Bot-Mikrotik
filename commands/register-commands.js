import { REST, Routes, ApplicationCommandOptionType } from "discord.js";
import { a as cfg } from "../config.js";

const commands = [
  {
    name: "adduser",
    description: "ساخت اکانت جدید",
    options: [
      {
        name: "prifix",
        description: "نشان",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "group",
        description: "گروه",
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: "Canada",
            value: "Canada",
          },
          {
            name: "unlimited",
            value: "unlimited",
          },
          {
            name: "Family",
            value: "Famil",
          },
          {
            name: "Free Friends",
            value: "Free Friends",
          },
        ],
        required: true,
      },
      {
        name: "profile",
        description: "پروفایل",
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: "30Day_50GB",
            value: "30Day_50GB",
          },
          {
            name: "30Day_100GB",
            value: "30Day_100GB",
          },
          {
            name: "60Day_100GB",
            value: "60Day_100GB",
          },
          {
            name: "Trial",
            value: "Trial",
          },
          {
            name: "Unlimit_Time_50GB",
            value: "Unlimit_Time_50GB",
          },
          {
            name: "Unlimited",
            value: "unlimit",
          },
        ],
        required: true,
      },
      {
        name: "comment",
        description: "comment",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "getuser",
    description: "گرفتن اطلاعات اکانت",
    options: [
      {
        name: "username",
        description: "نام کاربری",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "extensionuser",
    description: "تمدید اکانت",
    options: [
      {
        name: "username",
        description: "نام کاربری",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "group",
        description: "گروه",
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: "Canada",
            value: "Canada",
          },
          {
            name: "unlimited",
            value: "unlimited",
          },
          {
            name: "Family",
            value: "Famil",
          },
          {
            name: "Free Friends",
            value: "Free Friends",
          },
        ],
        required: true,
      },
      {
        name: "profile",
        description: "پروفایل",
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: "30Day_50GB",
            value: "30Day_50GB",
          },
          {
            name: "30Day_100GB",
            value: "30Day_100GB",
          },
          {
            name: "60Day_100GB",
            value: "60Day_100GB",
          },
          {
            name: "Unlimit_Time_50GB",
            value: "Unlimit_Time_50GB",
          },
          {
            name: "Unlimited",
            value: "unlimit",
          },
        ],
        required: true,
      },
    ],
  },
  {
    name: "deleteuser",
    description: "حذف اکانت",
    options: [
      {
        name: "username",
        description: "نام کاربری",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "resetpassword",
    description: "رسیت پسورد",
    options: [
      {
        name: "username",
        description: "نام کاربری",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "userusage",
    description: "رسیت پسورد",
    options: [
      {
        name: "username",
        description: "نام کاربری",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(cfg.token);

(async () => {
  try {
    console.log("Registering slash commands...");

    await rest.put(Routes.applicationGuildCommands(cfg.ClinetID, cfg.guild), { body: commands });

    console.log("Slash commands were registered successfully!");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
