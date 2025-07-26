import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

class Auth {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  createAccount = async (email, password, fullName) => {
    try {
      const response = await this.account.create(
        ID.unique(),
        email,
        password,
        fullName
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log("This is an error in createAccount", error);
      throw new Error(error.message);
    }
  };
  login = async (email, password) => {
    try {
      const response = await this.account.createEmailPasswordSession(email, password);
      console.log(response);
      return response;
    } catch (error) {
      console.log("This is an error in login", error);
      throw new Error(error.message);
    }
  };
}

export default new Auth();
