import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PostHogProvider, PostHogSurveyProvider } from 'posthog-react-native';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

import { SurveyModal } from '@/components/SurveyModal';
import { SurveyProvider, useSurvey } from '@/contexts/SurveyContext';
import { useColorScheme } from '@/hooks/useColorScheme';

function RootLayoutContent() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const { showSurvey, setShowSurvey } = useSurvey();

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PaperProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            statusBarTranslucent: true,
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{ headerTitle: "" }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        <SurveyModal 
          open={showSurvey} 
          onDismiss={() => setShowSurvey(false)} 
        />
      </PaperProvider>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <PostHogProvider
      apiKey="phc_YjhOo6KO2hwmIAc9PLoCPzlGwUZ4dP3u7gURRB9wTNZ"
      options={{
        host: 'https://us.i.posthog.com',
        enableSessionReplay: true,
      }}
      debug={true}
    >
      <PostHogSurveyProvider>
        <SurveyProvider>
          <RootLayoutContent />
        </SurveyProvider>
      </PostHogSurveyProvider>
    </PostHogProvider>
  );
}
