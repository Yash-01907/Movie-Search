import {  Databases, ID } from "appwrite";
import conf from "../conf/conf";
import  Client  from "./client"; // Ensure this import is correct

class DatabaseService {
  
  database;

  constructor() {
    this.database = new Databases(Client);
  }

  async createUserProfile(user) {
    try {
      const userId = user.userId;
      console.log(`Till here clear , userid is ${userId}`);
      const response = await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        userId,
        {
          userId: userId,
          favorites: [],
          watchList: [],
        },
        
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log("This is an error in createUserProfile", error);
      throw new Error(error.message);
    }
  }

  async getUserProfile(userId) {
    try {
      const response = await this.database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        userId
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log("This is an error in getUserProfile", error);
      throw new Error(error.message);
    }
  }
}

export default new DatabaseService();
