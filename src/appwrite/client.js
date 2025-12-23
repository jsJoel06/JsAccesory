import { Client } from "appwrite";

// Limpiamos los valores por si vienen con espacios o comillas extra
const endpoint = (import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://nyc.cloud.appwrite.io/v1').trim();
const project = (import.meta.env.VITE_APPWRITE_PROJECT_ID || '69422d4b00238b380bc3').trim();

console.log("Appwrite configurado en:", endpoint);

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(project);

export default client;