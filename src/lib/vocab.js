const DB_NAME = 'koine-reader';
const DB_VERSION = 1;
const STORE_NAME = 'vocab';

const ensureBrowser = () => {
  if (typeof indexedDB === 'undefined') {
    throw new Error('IndexedDB is not available.');
  }
};

const openDb = () => {
  ensureBrowser();

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'lemmaId' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const withStore = async (mode, callback) => {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, mode);
    const store = transaction.objectStore(STORE_NAME);

    let request;
    try {
      request = callback(store);
    } catch (err) {
      reject(err);
      return;
    }

    transaction.oncomplete = () => {
      db.close();
      resolve(request?.result);
    };

    transaction.onerror = () => {
      db.close();
      reject(transaction.error ?? new Error('IndexedDB transaction failed.'));
    };
  });
};

export const loadVocab = async () => {
  const result = await withStore('readonly', (store) => store.getAll());
  return Array.isArray(result) ? result : [];
};

export const addVocab = async (entry) => {
  if (!entry?.lemmaId) {
    throw new Error('Missing lemmaId for vocab entry.');
  }

  const payload = {
    ...entry,
    addedAt: entry.addedAt ?? new Date().toISOString()
  };

  await withStore('readwrite', (store) => store.put(payload));
  return payload;
};

export const removeVocab = async (lemmaId) => {
  if (!lemmaId) {
    throw new Error('Missing lemmaId to remove.');
  }

  await withStore('readwrite', (store) => store.delete(lemmaId));
};
