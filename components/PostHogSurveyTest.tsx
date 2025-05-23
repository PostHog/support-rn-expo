import { usePostHog } from 'posthog-react-native';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

export const PostHogSurveyTest = () => {
  const posthog = usePostHog();

  const handleFeedbackClick = async () => {
    try {
      // Capture the feedback button click event
      posthog.capture('feedback_button_clicked');
      // Force flush to ensure event is sent immediately
      await posthog.flush();
      // Reload feature flags in case they were updated
      await posthog.reloadFeatureFlags();
      
      console.log('Feedback button clicked and events flushed');
    } catch (error) {
      console.error('Error handling feedback:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Give Feedback"
        onPress={handleFeedbackClick}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
}); 