import { Databases, ID, Storage } from "appwrite";
import client from "./client";

const db = new Databases(client);
const storage = new Storage(client);

const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

// --- STORAGE (FOTOS) ---
export const uploadFile = async (file) => {
  try {
    const res = await storage.createFile(BUCKET_ID, ID.unique(), file);
    return res.$id;
  } catch (error) {
    console.error("Error subiendo archivo:", error);
    return null;
  }
};

// MEJORA DEFINITIVA: Forzamos la URL como string
export const getFilePreview = (fileId) => {
  if (!fileId) return "";
  try {
    // Usamos .href para obtener la cadena de texto de la URL completa
    const result = storage.getFilePreview(BUCKET_ID, fileId);
    return result.href; 
  } catch (error) {
    console.error("Error obteniendo preview:", error);
    return "";
  }
};

// --- DATABASE (ACCESORIOS) ---
export const listAccesories = async () => {
  try {
    // Es buena práctica pedir los documentos en orden de creación (opcional)
    return await db.listDocuments(DB_ID, COLLECTION_ID);
  } catch (error) {
    console.error("Error listando:", error);
    return { documents: [] };
  }
};

export const createAccesory = async (data) => {
  // Asegúrate que 'data' contenga el ID de la imagen en el campo correcto
  return await db.createDocument(DB_ID, COLLECTION_ID, ID.unique(), data);
};

export const deleteAccesory = async (id) => {
  return await db.deleteDocument(DB_ID, COLLECTION_ID, id);
};

export default db;