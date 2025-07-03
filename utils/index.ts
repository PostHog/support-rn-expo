// Platform-specific storage utility
// React Native will automatically resolve to:
// - storage.web.ts on web platforms (uses @react-native-async-storage/async-storage)  
// - storage.native.ts on iOS/Android (uses no-op implementation)

export { default as Storage } from './storage.web';

// Web-specific PostHog wrapper for app metadata
export { createWebPostHogWrapper } from './posthog-web';
