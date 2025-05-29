import { usePostHog } from 'posthog-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, Modal, Portal } from 'react-native-paper';

interface SurveyModalProps {
  open: boolean;
  onDismiss: () => void;
}

export const SurveyModal = ({ open, onDismiss }: SurveyModalProps) => {
  const posthog = usePostHog();

  const handleSurvey = async () => {
    try {
      posthog.capture('feedback_button_clicked');
      await posthog.flush();
      posthog.reloadFeatureFlags();
    } catch (e) {
      console.error('Error handling survey:', e);
    }
  };

  return (
    <Portal>
      <Modal visible={open} onDismiss={onDismiss}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <IconButton icon="close" onPress={onDismiss} />
          </View>
          <View style={styles.content}>
            <Button mode="contained" onPress={handleSurvey}>
              Give Feedback
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: 'auto',
    height: 'auto',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#6B4EFF',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    flexDirection: 'row-reverse',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
}); 