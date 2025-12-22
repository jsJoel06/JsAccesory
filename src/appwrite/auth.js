import { Account } from "appwrite";
import client from "./client";

const account = new Account(client);

// LOGIN
export const login = async (email, password) => {
  return await account.createEmailPasswordSession(email, password);
};

// LOGOUT
export const signOut = async () => {
  return await account.deleteSession("current");
};

// USUARIO ACTUAL
export const getUser = async () => {
  return await account.get();
};

export default account;
