import conf from "../conf/conf";
import {  Account, ID } from "appwrite";
import  Client  from "./client"; // Ensure this import is correct

class Auth {
  
  account;
  constructor() {
    this.account = new Account(Client);
  }
  createAccount = async ({email, password, fullName}) => {
    try {
      const response = await this.account.create(
        ID.unique(),
        email,
        password,
        fullName
      );
      if(response) {
        console.log("User created successfully:", response);
        return this.login({email, password}); // Automatically log in after account creation
      }
    } catch (error) {
      console.log("This is an error in createAccount", error);
      throw new Error(error.message);
    }
  };
  login = async ({email, password}) => {
    try {
      const response = await this.account.createEmailPasswordSession(email, password);
      console.log(response);
      return response;
    } catch (error) {
      console.log("This is an error in login", error);
      throw new Error(error.message);
    }
  };
  
  async logout() {
    try {
       await this.account.deleteSessions();
    } catch (error) {
      console.log("Error logging out:", error);
    }
  }
}

export default new Auth();
