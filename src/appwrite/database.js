import { Databases, ID, Storage, Permission, Role } from "appwrite";
import client from "./client";

const db = new Databases(client);
const storage = new Storage(client);

const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

// --- 1. OBTENER URL DE IMAGEN ---
// Esta función ahora es compatible con cualquier ID que le pases
export const getFileView = (fileId) => {
  if (!fileId) return "";
  try {
    const result = storage.getFileView(BUCKET_ID, fileId);
    return result.href; 
  } catch (error) {
    console.error("Error obteniendo la URL:", error);
    return "";
  }
};

// --- 2. CREAR PRODUCTO Y SUBIR IMAGEN (MISMO ID) ---
export const createProductWithImage = async (data, file) => {
  try {
    // Generamos un ID único que usaremos para AMBOS
    const sharedId = ID.unique();

    // Subimos la imagen con permisos públicos
    await storage.createFile(
      BUCKET_ID, 
      sharedId, // ID compartido
      file,
      [Permission.read(Role.any())]
    );

    // Creamos el documento con el MISMO ID compartido
    // Así, en ProductCard usaremos p.$id para ver la foto
    return await db.createDocument(
      DB_ID, 
      COLLECTION_ID, 
      sharedId, 
      data
    );
  } catch (error) {
    console.error("Error en operación combinada:", error);
    throw error;
  }
};

// --- 3. LISTAR ACCESORIOS ---
export const listAccesories = async () => {
  try {
    return await db.listDocuments(DB_ID, COLLECTION_ID);
  } catch (error) {
    console.error("Error listando documentos:", error);
    return { documents: [] };
  }
};

// --- 4. ELIMINAR (Debe borrar documento e imagen) ---
export const deleteAccesory = async (id) => {
  try {
    // Intentamos borrar la foto, pero si no existe, no dejamos que rompa el proceso
    try {
      await storage.deleteFile(BUCKET_ID, id);
      console.log("Foto eliminada correctamente");
    } catch (storageError) {
      console.warn("La foto no existía en el storage, procediendo a borrar el documento.");
    }

    // Borramos el documento de la base de datos
    const result = await db.deleteDocument(DB_ID, COLLECTION_ID, id);
    console.log("Documento eliminado correctamente");
    return result;
  } catch (error) {
    console.error("Error final al eliminar:", error);
  }
};

export default db;