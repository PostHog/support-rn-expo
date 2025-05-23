import { usePostHog } from 'posthog-react-native';
import React, { useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

interface UserProperty {
  key: string;
  value: string;
}

export const PostHogUserIdentifier = () => {
  const posthog = usePostHog();
  const [userId, setUserId] = useState('');
  const [properties, setProperties] = useState<UserProperty[]>([]);
  const [newPropertyKey, setNewPropertyKey] = useState('');
  const [newPropertyValue, setNewPropertyValue] = useState('');
  const [error, setError] = useState('');

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

  const identifyUser = async () => {
    try {
      if (!userId.trim()) {
        setError('Distinct ID is required');
        return;
      }

      setError('');
      const userProps = properties.reduce((acc, prop) => ({
        ...acc,
        [prop.key]: prop.value
      }), {});

      posthog.identify(userId, userProps);
      await posthog.flush();
      
      console.log('User identified:', userId, userProps);
    } catch (error) {
      console.error('Error identifying user:', error);
      setError('Failed to identify user');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.section}>
          <Text style={styles.label}>Distinct ID (required):</Text>
          <TextInput
            style={styles.input}
            value={userId}
            onChangeText={setUserId}
            placeholder="Enter Distinct ID"
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Person Properties (optional):</Text>
          {properties.map((prop, index) => (
            <View key={index} style={styles.propertyRow}>
              <Text style={styles.propertyText}>{prop.key}: {prop.value}</Text>
              <Button title="Remove" onPress={() => removeProperty(index)} />
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
            <Button title="Add Property" onPress={addProperty} />
          </View>
        </View>

        <Button
          title="Identify User"
          onPress={identifyUser}
        />
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
  error: {
    color: 'red',
    marginBottom: 12,
  },
}); 