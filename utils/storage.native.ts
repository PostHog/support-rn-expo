// No-op storage implementation for native platforms (iOS/Android)
// AsyncStorage is only needed for web in this app
const noopStorage = {
  getItem: async (key: string): Promise<string | null> => {
    console.log(`Storage.getItem called with key: ${key} (no-op on native)`);
    return null;
  },
  setItem: async (key: string, value: string): Promise<void> => {
    console.log(`Storage.setItem called with key: ${key}, value: ${value} (no-op on native)`);
  },
  removeItem: async (key: string): Promise<void> => {
    console.log(`Storage.removeItem called with key: ${key} (no-op on native)`);
  },
  clear: async (): Promise<void> => {
    console.log('Storage.clear called (no-op on native)');
  },
  getAllKeys: async (): Promise<string[]> => {
    console.log('Storage.getAllKeys called (no-op on native)');
    return [];
  },
  multiGet: async (keys: string[]): Promise<[string, string | null][]> => {
    console.log(`Storage.multiGet called with keys: ${keys.join(', ')} (no-op on native)`);
    return keys.map(key => [key, null]);
  },
  multiSet: async (keyValuePairs: [string, string][]): Promise<void> => {
    console.log(`Storage.multiSet called with ${keyValuePairs.length} pairs (no-op on native)`);
  },
  multiRemove: async (keys: string[]): Promise<void> => {
    console.log(`Storage.multiRemove called with keys: ${keys.join(', ')} (no-op on native)`);
  },
};

export default noopStorage; 