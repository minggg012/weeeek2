import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView} from 'react-native';
import SignInScreen from './src/views/SignInScreen';
import SignUpScreen from './src/views/SignUpScreen';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
export default function App() {

  return (
    // <GestureHandlerRootView style={{ flex: 1 }}> {
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="LoginPage" component={SignInScreen} />
            <Stack.Screen name="SignUpPage" component={SignUpScreen} />
            
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    // }</GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFC'
  },
});

