import { useAuth } from '@/hooks/useAuth';
import { createWebPostHogWrapper } from '@/utils';
import PostHog, { PostHogProvider, PostHogSurveyProvider, usePostHog } from 'posthog-react-native';
import React, { useEffect, useMemo } from 'react';
import { Platform } from 'react-native';

interface ConditionalPostHogProviderProps {
  children: React.ReactNode;
}

// Component to create web-specific PostHog wrapper
const WebPostHogWrapper = ({ children }: { children: React.ReactNode }) => {
  const posthog = usePostHog();

  useEffect(() => {
    if (Platform.OS === 'web' && posthog) {
      // Create web wrapper that automatically includes app metadata
      const webPostHog = createWebPostHogWrapper(posthog);
      
      // Replace the posthog instance in the context
      // Note: This is a workaround since we can't directly modify the context
      // The wrapper will be used in components that import it
      console.log('Web PostHog wrapper ready for use');
    }
  }, [posthog]);

  return <>{children}</>;
};

export const ConditionalPostHogProvider = ({ children }: ConditionalPostHogProviderProps) => {
  const { isAuthenticated } = useAuth();

  const posthogClient = useMemo(() => {
    // Only create PostHog client on client-side to avoid SSR issues
    if (typeof window === 'undefined') {
      return null;
    }

    return new PostHog('phc_YjhOo6KO2hwmIAc9PLoCPzlGwUZ4dP3u7gURRB9wTNZ', {
      host: 'https://us.i.posthog.com',
      enableSessionReplay: isAuthenticated,
      captureNativeAppLifecycleEvents: true,
    });
  }, [isAuthenticated]);

  // If no client (SSR), just render children without PostHog providers
  if (!posthogClient) {
    return <>{children}</>;
  }

  return (
    <PostHogProvider client={posthogClient} autocapture debug={true}>
      <PostHogSurveyProvider>
        <WebPostHogWrapper>
          {children}
        </WebPostHogWrapper>
      </PostHogSurveyProvider>
    </PostHogProvider>
  );
}; 