import { ConstantsDebug } from '@/components/ConstantsDebug';
import { StyleSheet, View } from 'react-native';

export default function UserScreen() {
  return (
    <View style={styles.container}>
      <ConstantsDebug />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 