import { PostHogUserIdentifier } from '@/components/PostHogUserIdentifier';
import { StyleSheet } from 'react-native';

export default function UserScreen() {
  return <PostHogUserIdentifier />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 