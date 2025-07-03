import Constants from 'expo-constants';
import { Platform } from 'react-native';

// App metadata for web mode using actual Constants values
const getAppMetadata = () => {
  // Use Constants.expoConfig which has real values in development web
  const config = Constants.expoConfig || Constants.manifest;
  
  if (!config) {
    // Fallback to hardcoded values if Constants is not available
    return {
      $app_name: 'support-rn-expo',
      $app_version: '1.0.0',
      $app_namespace: 'com.anonymous.support-rn-expo',
      $app_build: '1.0.0',
      platform: 'web',
    };
  }

  return {
    $app_name: config.name || 'support-rn-expo',
    $app_version: config.version || '1.0.0',
    $app_namespace: 'com.anonymous.support-rn-expo', // From app.json iOS bundleIdentifier
    $app_build: config.version || '1.0.0', // Use version as build
    platform: 'web',
    expo_sdk_version: config.sdkVersion || 'unknown',
    app_slug: config.slug || 'support-rn-expo',
    app_scheme: config.scheme || 'supportrnexpo',
    supported_platforms: config.platforms || ['web'],
  };
};

// Web-specific PostHog wrapper that automatically includes app metadata
export const createWebPostHogWrapper = (posthog: any) => {
  if (Platform.OS !== 'web') {
    return posthog;
  }

  const appMetadata = getAppMetadata();
  
  // Create a wrapper that preserves all PostHog methods but enhances event methods
  const webPostHog = new Proxy(posthog, {
    get(target, prop) {
      // Enhance specific event methods with app metadata
      if (prop === 'capture') {
        return (eventName: string, properties?: any) => {
          const enhancedProperties = {
            ...appMetadata,
            ...properties,
          };
          return target.capture(eventName, enhancedProperties);
        };
      }
      
      if (prop === 'screen') {
        return (screenName: string, properties?: any) => {
          const enhancedProperties = {
            ...appMetadata,
            ...properties,
          };
          return target.screen(screenName, enhancedProperties);
        };
      }
      
      if (prop === 'identify') {
        return (distinctId: string, properties?: any) => {
          const enhancedProperties = {
            ...appMetadata,
            ...properties,
          };
          return target.identify(distinctId, enhancedProperties);
        };
      }
      
      // Pass through all other methods unchanged
      return target[prop];
    }
  });

  console.log('Web PostHog wrapper created with real app metadata from Constants:', appMetadata);
  
  return webPostHog;
}; 