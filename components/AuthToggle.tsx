import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export const AuthToggle = () => {
  const { isAuthenticated, login, logout, toggleAuth } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.status}>
        Status: {isAuthenticated ? '🟢 Logged In' : '🔴 Logged Out'}
      </Text>
      <Text style={styles.description}>
        Session Replay: {isAuthenticated ? 'Enabled' : 'Disabled'}
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          onPress={login}
          disabled={isAuthenticated}
        />
        <View style={styles.buttonSpacer} />
        <Button
          title="Logout"
          onPress={logout}
          disabled={!isAuthenticated}
        />
        <View style={styles.buttonSpacer} />
        <Button
          title="Toggle Auth"
          onPress={toggleAuth}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    margin: 16,
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  buttonSpacer: {
    width: 8,
  },
}); 