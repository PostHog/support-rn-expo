import { Storage } from '@/utils';
import React, { useState } from 'react';
import { Alert, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

export const StorageExample = () => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [retrievedValue, setRetrievedValue] = useState<string | null>(null);

  const handleSetItem = async () => {
    if (!key.trim()) {
      Alert.alert('Error', 'Please enter a key');
      return;
    }
    
    try {
      await Storage.setItem(key, value);
      Alert.alert('Success', `Value stored for key: ${key}`);
    } catch (error) {
      Alert.alert('Error', `Failed to store value: ${error}`);
    }
  };

  const handleGetItem = async () => {
    if (!key.trim()) {
      Alert.alert('Error', 'Please enter a key');
      return;
    }
    
    try {
      const result = await Storage.getItem(key);
      setRetrievedValue(result);
    } catch (error) {
      Alert.alert('Error', `Failed to retrieve value: ${error}`);
    }
  };

  const handleRemoveItem = async () => {
    if (!key.trim()) {
      Alert.alert('Error', 'Please enter a key');
      return;
    }
    
    try {
      await Storage.removeItem(key);
      Alert.alert('Success', `Removed item with key: ${key}`);
      setRetrievedValue(null);
    } catch (error) {
      Alert.alert('Error', `Failed to remove value: ${error}`);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        Storage Demo ({Platform.OS})
      </Text>
      
      <Text style={{ marginBottom: 5 }}>Key:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
        value={key}
        onChangeText={setKey}
        placeholder="Enter storage key"
      />
      
      <Text style={{ marginBottom: 5 }}>Value:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 15,
          borderRadius: 5,
        }}
        value={value}
        onChangeText={setValue}
        placeholder="Enter value to store"
      />
      
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 15 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#007AFF',
            padding: 10,
            borderRadius: 5,
            flex: 1,
          }}
          onPress={handleSetItem}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Set Item</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={{
            backgroundColor: '#28A745',
            padding: 10,
            borderRadius: 5,
            flex: 1,
          }}
          onPress={handleGetItem}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Get Item</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={{
            backgroundColor: '#DC3545',
            padding: 10,
            borderRadius: 5,
            flex: 1,
          }}
          onPress={handleRemoveItem}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Remove</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={{ marginTop: 10 }}>
        Retrieved Value: {retrievedValue ?? 'null'}
      </Text>
      
      <Text style={{ marginTop: 10, fontSize: 12, color: '#666' }}>
        {Platform.OS === 'web' 
          ? 'Using AsyncStorage on web - data will persist'
          : 'Using no-op storage on native - operations are logged only'
        }
      </Text>
    </View>
  );
}; 