import { StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>test!</Text>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
