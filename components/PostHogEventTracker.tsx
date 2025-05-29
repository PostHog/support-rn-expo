import { useSurvey } from '@/contexts/SurveyContext';
import { usePostHog } from 'posthog-react-native';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';

interface EventProperty {
  key: string;
  value: string;
}

export const PostHogEventTracker = () => {
  const posthog = usePostHog();
  const { setShowSurvey } = useSurvey();
  const [eventName, setEventName] = useState('');
  const [properties, setProperties] = useState<EventProperty[]>([]);
  const [newPropertyKey, setNewPropertyKey] = useState('');
  const [newPropertyValue, setNewPropertyValue] = useState('');

  const addProperty = () => {
    if (newPropertyKey.trim()) {
      setProperties([...properties, { key: newPropertyKey, value: newPropertyValue }]);
      setNewPropertyKey('');
      setNewPropertyValue('');
    }
  };

  const removeProperty = (index: number) => {
    setProperties(properties.filter((_, i) => i !== index));
  };

  const sendEvent = async () => {
    try {
      const eventProps = properties.reduce((acc, prop) => ({
        ...acc,
        [prop.key]: prop.value
      }), {});

      const finalEventName = eventName.trim() || 'button_clicked';
      
      posthog.capture(finalEventName, eventProps);
      await posthog.flush();
      
      console.log(`Event sent: ${finalEventName}`, eventProps);
    } catch (error) {
      console.error('Error sending event:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.section}>
          <Text style={styles.label}>Event Name (optional):</Text>
          <TextInput
            style={styles.input}
            value={eventName}
            onChangeText={setEventName}
            placeholder="Enter event name or leave empty for default"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Event Properties:</Text>
          {properties.map((prop, index) => (
            <View key={index} style={styles.propertyRow}>
              <Text style={styles.propertyText}>{prop.key}: {prop.value}</Text>
              <Button mode="text" onPress={() => removeProperty(index)}>Remove</Button>
            </View>
          ))}
          <View style={styles.addPropertyContainer}>
            <TextInput
              style={[styles.input, styles.propertyInput]}
              value={newPropertyKey}
              onChangeText={setNewPropertyKey}
              placeholder="Property key"
            />
            <TextInput
              style={[styles.input, styles.propertyInput]}
              value={newPropertyValue}
              onChangeText={setNewPropertyValue}
              placeholder="Property value"
            />
            <Button mode="outlined" onPress={addProperty}>Add Property</Button>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={sendEvent}
            style={styles.button}
          >
            Send Event
          </Button>
          <Button
            mode="contained"
            onPress={() => setShowSurvey(true)}
            style={styles.button}
          >
            Open Survey
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 28,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#fafbfc',
  },
  propertyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  propertyText: {
    flex: 1,
    marginRight: 8,
    fontSize: 15,
  },
  addPropertyContainer: {
    marginTop: 8,
  },
  propertyInput: {
    marginBottom: 8,
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    marginBottom: 8,
  },
}); 