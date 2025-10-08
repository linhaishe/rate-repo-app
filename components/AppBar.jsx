import { View, Text, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: '#24292e',
  },
  container: {
    paddingTop: Constants.statusBarHeight,
  },
});

const AppBar = () => {
  return (
    <Pressable onPress={() => console.log(' we are press')}>
      <View style={styles.bgColor}>
        <Text style={styles.container}>Repository</Text>
      </View>
    </Pressable>
  );
};

export default AppBar;
