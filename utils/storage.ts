// This file will be resolved to platform-specific implementations:
// - storage.web.ts on web platforms  
// - storage.native.ts on iOS/Android platforms

// Default export - React Native will handle platform resolution
declare const Storage: {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  clear: () => Promise<void>;
  getAllKeys: () => Promise<string[]>;
  multiGet: (keys: string[]) => Promise<[string, string | null][]>;
  multiSet: (keyValuePairs: [string, string][]) => Promise<void>;
  multiRemove: (keys: string[]) => Promise<void>;
};

export default Storage; 