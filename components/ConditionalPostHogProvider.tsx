import { useAuth } from '@/hooks/useAuth';
import PostHog, { PostHogProvider, PostHogSurveyProvider } from 'posthog-react-native';
import React, { useMemo } from 'react';

interface ConditionalPostHogProviderProps {
  children: React.ReactNode;
}

export const ConditionalPostHogProvider = ({ children }: ConditionalPostHogProviderProps) => {
  const { isAuthenticated } = useAuth();

  const posthogClient = useMemo(() => {
    return new PostHog('phc_YjhOo6KO2hwmIAc9PLoCPzlGwUZ4dP3u7gURRB9wTNZ', {
      host: 'https://us.i.posthog.com',
      enableSessionReplay: isAuthenticated,
      captureNativeAppLifecycleEvents: true,
    });
  }, [isAuthenticated]);

  return (
    <PostHogProvider client={posthogClient} autocapture debug={true}>
      <PostHogSurveyProvider>
        {children}
      </PostHogSurveyProvider>
    </PostHogProvider>
  );
}; 