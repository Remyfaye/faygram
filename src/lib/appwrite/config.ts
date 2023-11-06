
import {Client, Account, Databases, Storage, Avatars } from 'appwrite'

export const appwriteConfig = {
    url: import.meta.env.VITE_URL,
    projectId: import.meta.env.VITE_PROJECT_ID,
    databaseId:import.meta.env.VITE_DATABASE_ID,
    storageId:import.meta.env.VITE_STORAGE_ID,
    userCollectionId:import.meta.env.VITE_USER_ID,
    postCollectionId:import.meta.env.VITE_POST_ID,
    savesCollectionId:import.meta.env.VITE_SAVES_ID
}

export const client = new Client()

client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.url)

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)
