import {  Databases, ID } from "appwrite";
import conf from "../conf/conf";
import  client  from "./client"; // Ensure this import is correct

class DatabaseService {
  
  database;

  constructor() {
    this.database = new Databases(client);
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
  // In src/appwrite/databaseService.js

// ... other methods like createUserProfile, getUserProfile

  /**
   * Toggles a movie ID in the user's favorites list.
   * @param {string} userId - The user's unique ID.
   * @param {string} movieId - The ID of the movie to add or remove.
   * @returns {Promise<object>} The updated document.
   */
  async updateFavorites(userId, movieId) {
    try {
      // Step 1: Get the user's current profile document
      const userProfile = await this.getUserProfile(userId);

      if (!userProfile) throw new Error("User profile not found.");

      const currentFavorites = userProfile.favorites || [];

      // Step 2: Check if the movie is already in the list
      const isFavorite = currentFavorites.includes(movieId);

      let updatedFavorites;

      if (isFavorite) {
        // If it is a favorite, remove it
        updatedFavorites = currentFavorites.filter(id => id !== movieId);
      } else {
        // If it's not a favorite, add it
        updatedFavorites = [...currentFavorites, movieId];
      }

      // Step 3: Save the updated array back to Appwrite
      return await this.database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        userId,
        {
          favorites: updatedFavorites, // Update the 'favorites' attribute
        }
      );
    } catch (error) {
      console.error("DatabaseService :: updateFavorites :: error", error);
      throw error;
    }
  }
}

export default new DatabaseService();
