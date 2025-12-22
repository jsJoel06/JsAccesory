import { Client } from "appwrite";

console.log("ENDPOINT:", import.meta.env.VITE_APPWRITE_ENDPOINT);

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export default client;
