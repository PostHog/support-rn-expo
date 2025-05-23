import { PostHogSurveyTest } from '@/components/PostHogSurveyTest';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PostHogProvider } from 'posthog-react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <PostHogProvider
      apiKey="phc_YjhOo6KO2hwmIAc9PLoCPzlGwUZ4dP3u7gURRB9wTNZ"
      options={{
        host: 'https://us.i.posthog.com'
      }}
    >
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        <PostHogSurveyTest />
      </ThemeProvider>
    </PostHogProvider>
  );
}
