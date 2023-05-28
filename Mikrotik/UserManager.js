import { MikrotikConnetion, Mikrotik } from "./Mikrotik.js";
export class UserManager {
  static User = {
    Create: async (user, password, group = "default", session = 1, comment = null) => {
      try {
        await MikrotikConnetion.write("/user-manager/user/add", [`=name=${user}`, `=password=${password}`, `=group=${group}`, `=shared-users=${session}`, `=comment=${comment}`]);
        return await MikrotikConnetion.write("/user-manager/user/print");
      } catch (error) {
        return error;
      }
    },
    Remove: async (user) => {
      try {
        let data = await MikrotikConnetion.write("/user-manager/user/print");
        data.forEach(async (element, index) => {
          if (element.name == user) {
            await MikrotikConnetion.write("/user-manager/user/remove", [`=.id=${element[".id"]}`]);
            return await MikrotikConnetion.write("/user-manager/user/print");
          } else if (data.length == index + 1) {
            return await MikrotikConnetion.write("/user-manager/user/print");
          }
        });
      } catch (error) {
        return error;
      }
    },
    Get: async (user) => {
      try {
        let data = await MikrotikConnetion.write("/user-manager/user/print");
        for await (const [index, element] of data.entries()) {
          if (element.name.toLowerCase() == user.toLowerCase()) {
            return element;
          } else if (data.length == index + 1) {
            return undefined;
          }
        }
      } catch (error) {
        return error;
      }
    },
    GetAll: async () => {
      try {
        let data = await MikrotikConnetion.write("/user-manager/user/print");
        return data;
      } catch (error) {
        return error;
      }
    },
    Set: async (user, Key, Value) => {
      try {
        let data = await MikrotikConnetion.write("/user-manager/user/print");
        for await (const [index, element] of data.entries()) {
          if (element.name == user) {
            await MikrotikConnetion.write("/user-manager/user/set", [`=${Key.toLowerCase()}=${Value}`, `=.id=${element[".id"]}`]);
            return await MikrotikConnetion.write("/user-manager/user/print");
          } else if (data.length == index + 1) {
            return await MikrotikConnetion.write("/user-manager/user/print");
          }
        }
      } catch (error) {
        return error;
      }
    },
  };
  static User_Profile = {
    Create: async (user, profile) => {
      try {
        await MikrotikConnetion.write("/user-manager/user-profile/add", [`=user=${user}`, `=profile=${profile}`]);
        return await MikrotikConnetion.write("/user-manager/user-profile/print");
      } catch (error) {
        return error;
      }
    },
    Remove: async (user) => {
      try {
        let data = await MikrotikConnetion.write("/user-manager/user-profile/print");
        data.forEach(async (element, index) => {
          if (element.user == user) {
            await MikrotikConnetion.write("/user-manager/user-profile/remove", [`=.id=${element[".id"]}`]);
            return await MikrotikConnetion.write("/user-manager/user-profile/print");
          } else if (data.length == index + 1) {
            return await MikrotikConnetion.write("/user-manager/user-profile/print");
          }
        });
      } catch (error) {
        return error;
      }
    },
    Get: async (user) => {
      try {
        let data = await MikrotikConnetion.write("/user-manager/user-profile/print");
        for await (const [index, element] of data.entries()) {
          if (element.user.toLowerCase() == user.toLowerCase()) {
            return element;
          } else if (data.length == index + 1) {
            return undefined;
          }
        }
      } catch (error) {
        return error;
      }
    },
  };
  static Profiles = {
    Create: async (name, validity = "unlimited", startWhen = "first-auth", sharedUsers = "off", comment = "") => {
      try {
        await MikrotikConnetion.write("/user-manager/profile/add", [`=name=${name}`, `=name-for-users=${name}`, `=override-shared-users=${sharedUsers}`, `=starts-when=${startWhen}`, `=validity=${validity}`, `=comment=${comment}`]);
        return await MikrotikConnetion.write("/user-manager/profile/print");
      } catch (error) {
        return error;
      }
    },
    Remove: async (name) => {
      try {
        let data = await MikrotikConnetion.write("/user-manager/profile/print");
        data.forEach(async (element, index) => {
          if (element.name == name) {
            await MikrotikConnetion.write("/user-manager/profile/remove", [`=.id=${element[".id"]}`]);
            return await MikrotikConnetion.write("/user-manager/profile/print");
          } else if (data.length == index + 1) {
            return await MikrotikConnetion.write("/user-manager/profile/print");
          }
        });
      } catch (error) {
        return error;
      }
    },
    Set: async (name, Key, Value) => {
      try {
        let data = await MikrotikConnetion.write("/user-manager/profile/print");
        for await (const [index, element] of data.entries()) {
          if (element.name == name) {
            await MikrotikConnetion.write("/user-manager/profile/set", [`=${Key.toLowerCase()}=${Value}`, `=.id=${element[".id"]}`]);
            return await MikrotikConnetion.write("/user-manager/profile/print");
          } else if (data.length == index + 1) {
            return await MikrotikConnetion.write("/user-manager/profile/print");
          }
        }
      } catch (error) {
        return error;
      }
    },
  };
  static Limitions = {
    Create: async (name, transferlimit = 0) => {
      try {
        await MikrotikConnetion.write("/user-manager/limitation/add", [`=name=${name}`, `=transfer-limit=${transferlimit * 1048576}`]);
        return await MikrotikConnetion.write("/user-manager/limitation/print");
      } catch (error) {
        return error;
      }
    },
    Remove: async (name) => {
      try {
        let data = await MikrotikConnetion.write("/user-manager/limitation/print");
        data.forEach(async (element, index) => {
          if (element.name == name) {
            await MikrotikConnetion.write("/user-manager/limitation/remove", [`=.id=${element[".id"]}`]);
            return await MikrotikConnetion.write("/user-manager/limitation/print");
          } else if (data.length == index + 1) {
            return await MikrotikConnetion.write("/user-manager/limitation/print");
          }
        });
      } catch (error) {
        return error;
      }
    },
    Print: async () => {
      try {
        return await MikrotikConnetion.write("/user-manager/limitation/print");
      } catch (error) {
        return error;
      }
    },
  };
  static Profile_Limitions = {
    Create: async (profile, limitation) => {
      try {
        await MikrotikConnetion.write("/user-manager/profile-limitation/add", [`=profile=${profile}`, `=limitation=${limitation}`]);
        return await MikrotikConnetion.write("/user-manager/profile-limitation/print");
      } catch (error) {
        return error;
      }
    },
    Remove: async (profile) => {
      try {
        let data = await MikrotikConnetion.write("/user-manager/profile-limitation/print");
        data.forEach(async (element, index) => {
          if (element.profile == profile) {
            await MikrotikConnetion.write("/user-manager/profile-limitation/remove", [`=.id=${element[".id"]}`]);
            return await MikrotikConnetion.write("/user-manager/profile-limitation/print");
          } else if (data.length == index + 1) {
            return await MikrotikConnetion.write("/user-manager/profile-limitation/print");
          }
        });
      } catch (error) {
        return error;
      }
    },
  };
  static Monitor = {
    activesessions: async () => {
      try {
        return await MikrotikConnetion.write("/user-manager/monitor", ["=once"]);
      } catch (error) {
        return error;
      }
    },
    UserUsage: async (user) => {
      try {
        let data = await MikrotikConnetion.write("/user-manager/user/print");
        for await (const [index, element] of data.entries()) {
          if (element.name == user) {
            return (await MikrotikConnetion.write("/user-manager/user/monitor", [`=duration=1`, `=numbers=${element[".id"]}`]))[0];
          }
        }
      } catch (error) {
        return error;
      }
    },
  };
}
