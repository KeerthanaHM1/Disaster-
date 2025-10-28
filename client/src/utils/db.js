import { openDB } from 'idb';

const DB_NAME = 'EmergencyContactsDB';
const STORE_NAME = 'contacts';

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
}

export async function getAllContacts() {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

export async function addContact(contact) {
  const db = await getDB();
  await db.put(STORE_NAME, contact);
}

export async function deleteContact(id) {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
}
