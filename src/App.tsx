import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Icon, ThemeProvider, createTheme } from '@rneui/themed';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home'
import Login from './screens/Login'
import Signup from './screens/Signup'
import CreateCustomer from './screens/CreateCustomer';
import CustomerDetails from './screens/CustomerDetails';
import GiveMoney from './screens/modals/GiveMoney';
import PayIntFine from './screens/modals/PayIntFine';
import ReduceMoney from './screens/modals/ReduceMoney';
import ShowHistory from './screens/modals/ShowHistory';
import { getLoginData } from './login/getLoginData';
import { logout } from './login/logout';
import SplashScreen from 'react-native-splash-screen'

const theme = createTheme({
  lightColors: {
    primary: '#e7e7e8',
  },
  darkColors: {
    primary: '#000',
  },
  mode: 'light',
});

export type ScreenType = {
  Home: undefined;
  Login: { user: User };
  Signup: { user: SignupUser };
  CreateCustomer: undefined;
  CustomerDetails: { customer: Customer };
  GiveMoney: { customer: Customer }
  PayIntFine: { customer: Customer }
  ReduceMoney: { customer: Customer }
  ShowHistory: { customer: Customer }
}

export type CustomerScreenType = {

}


const Stack = createNativeStackNavigator<ScreenType>();


const App = () => {

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, [])


  const [login, setLogin] = useState<boolean>(false)
  const [token, setToken] = useState<string>('')
  const [uid, setUid] = useState<string>('')

  useEffect(() => {
    (async () => {
      const loginData = await getLoginData();
      if (loginData) {
        setLogin(true);
        setToken(loginData.token);
        setUid(loginData.id)
      }
      // console.log(loginData, 'lll')
    })()
  }, [login])

  // logout();

  const handleLogout = () => {
    logout();
    setLogin(false);

  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          {login ? (<>
            <Stack.Screen name='Home' component={Home} options={{
              headerRight: () => (
                <Icon
                  name='logout'
                  type='material'
                  onPress={handleLogout}
                  color="#0306DA"
                />
              ),
              headerTitle: 'Interest Business Handler',
            }} />
            <Stack.Screen name='CustomerDetails' component={CustomerDetails} />
            <Stack.Screen name='GiveMoney' component={GiveMoney} />
            <Stack.Screen name='PayIntFine' component={PayIntFine} />
            <Stack.Screen name='ReduceMoney' component={ReduceMoney} />
            <Stack.Screen name='ShowHistory' component={ShowHistory} />
            <Stack.Screen name='CreateCustomer' component={CreateCustomer} />
          </>) : (<>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Signup' component={Signup} />
          </>)}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )

}



export default App

const styles = StyleSheet.create({})