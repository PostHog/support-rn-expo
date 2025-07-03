import * as Application from 'expo-application';
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

export const ConstantsDebug = () => {
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    const info = {
      // Constants info
      expoConfig: Constants.expoConfig,
      manifest: Constants.manifest,
      manifest2: Constants.manifest2,
      expoVersion: Constants.expoVersion,
      appOwnership: Constants.appOwnership,
      platform: Constants.platform,
      
      // Application info
      applicationName: Application.applicationName,
      applicationId: Application.applicationId,
      nativeBuildVersion: Application.nativeBuildVersion,
      nativeApplicationVersion: Application.nativeApplicationVersion,
      
      // Environment info
      isDevelopment: __DEV__,
      platformOS: Platform.OS,
      timestamp: new Date().toISOString(),
    };

    setDebugInfo(info);
    console.log('Constants Debug Info:', info);
  }, []);

  const renderValue = (value: any) => {
    if (value === null) return <Text style={styles.nullValue}>null</Text>;
    if (value === undefined) return <Text style={styles.undefinedValue}>undefined</Text>;
    if (typeof value === 'object') {
      return <Text style={styles.objectValue}>{JSON.stringify(value, null, 2)}</Text>;
    }
    return <Text style={styles.value}>{String(value)}</Text>;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Constants Debug Info</Text>
      <Text style={styles.subtitle}>Environment: {__DEV__ ? 'Development' : 'Production'}</Text>
      <Text style={styles.subtitle}>Platform: {Platform.OS}</Text>
      
      {Object.entries(debugInfo).map(([key, value]) => (
        <View key={key} style={styles.section}>
          <Text style={styles.key}>{key}:</Text>
          {renderValue(value)}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  key: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  value: {
    fontSize: 12,
    color: '#333',
  },
  nullValue: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  undefinedValue: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  objectValue: {
    fontSize: 10,
    color: '#333',
    fontFamily: 'monospace',
  },
}); 