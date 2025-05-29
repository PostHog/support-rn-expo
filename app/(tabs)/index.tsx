import { PostHogEventTracker } from '@/components/PostHogEventTracker';
import { useSurvey } from '@/contexts/SurveyContext';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function EventScreen() {
  const { setShowSurvey } = useSurvey();

  return (
    <View style={styles.container}>
      <PostHogEventTracker />
      <Button 
        mode="contained" 
        onPress={() => setShowSurvey(true)}
        style={styles.button}
      >
        Open Survey
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  button: {
    marginTop: 20,
  },
});
