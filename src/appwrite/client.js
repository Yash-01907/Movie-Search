import { Client } from "appwrite";
import conf from "../conf/conf";
const client = new Client();
client
  .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
  .setProject(conf.appwriteProjectId); // Your Appwrite Project ID

export default client;
