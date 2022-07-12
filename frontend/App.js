import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView} from 'react-native';
import SignInScreen from './src/views/SignInScreen';
import SignUpScreen from './src/views/SignUpScreen';
import MainScreen from './src/views/MainScreen';
import InGameScreen from './src/views/InGameScreen';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
export default function App() {

  return (
    // <GestureHandlerRootView style={{ flex: 1 }}> {
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator
          initialRouteName='LoginPage'
          screenOptions={{
            // cardStyle: {backgroundColor: '#ffffff'},
            // headerStyle : {
            //   height: 100,
            //   backgroundColor: '#ffd8cc',
            //   borderBottomWidth: 1,
            //   borderBottomColor:'#99154e'
            // },
            // headerTitleStyle: {color: '#000000', fontsize: 24},
            // headerTitleAlign: 'center',
            headerBackTitleVisible: true,
            headerTintColor: '#e74c3c',
            
          }}>
            <Stack.Screen name="LoginPage" component={SignInScreen} />
            <Stack.Screen name="SignUpPage" component={SignUpScreen} />
            <Stack.Screen name="MainPage" component={MainScreen} />
            <Stack.Screen name="GamePage" component={InGameScreen}/>
            
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

