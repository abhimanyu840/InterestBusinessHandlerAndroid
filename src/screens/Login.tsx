import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Icon, Input } from '@rneui/themed'
import Snackbar from 'react-native-snackbar'
import { User } from '../schema/loginSchema'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLoginData } from '../login/getLoginData'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScreenType } from '../App'
import RNRestart from 'react-native-restart';
import { logout } from '../login/logout'

type Inputs = {
    email: string
    password: string
}

type LoginProps = NativeStackScreenProps<ScreenType, 'Login'>

const Login = ({ navigation }: LoginProps) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [btnLoading, setBtnLoading] = useState<boolean>(false)


    const storeData = async (token: string, id: string) => {
        try {
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('id', id);
        } catch (e) {
            console.log("Some error occurred", e)
        }
    };

    // useEffect(() => {
    //     getLoginData()
    // }, [])

    // logout()



    const fetchLogin = async (email: string, password: string) => {
        try {
            let res = await fetch('https://interestbusinesshandler.netlify.app/api/fetchuser', {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                // credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ email, password })
            })
            let data = await res.json();
            storeData(data.token, data._id)
            // getLoginData()
            console.log(data)
            Snackbar.show({
                text: 'Logged In',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: '#06CE02'
            })
            setBtnLoading(false)
            // navigation.navigate('Home');
            RNRestart.restart();
        } catch (error) {
            console.log('Error Logging', error);
            Snackbar.show({
                text: 'Error Logging',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: '#FF0707'
            })
            setBtnLoading(false)
        }
    }

    // fetchLogin('abhimanyukumarsingh0000@gmail.com', 'password')

    const handleLogin = () => {
        setBtnLoading(true);
        try {
            let verify = User.parse({ email, password });
            if (verify) {
                fetchLogin(email, password)
            }
        } catch (error) {
            console.log('Some error occurred', error)
            setBtnLoading(false)
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>Login</Text>
            <View style={styles.form}>
                <Input
                    inputContainerStyle={styles.input} //view style for input
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                />
                <Input
                    inputContainerStyle={styles.input} //view style for input
                    placeholder='Password'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                // rightIcon={{ type: 'feather', name: 'eye' }}
                // rightIcon={{ type: 'feather', name: 'eye-off' }}
                />

                {/* <Pressable style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable> */}
                <Button buttonStyle={styles.button} title='Login' onPress={handleLogin} loading={btnLoading} />
                <Pressable onPress={() => navigation.navigate('Signup')} >
                    <Text style={styles.registerLink}>Do not have an account? Register</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#930606',
        textDecorationLine: 'underline',
    },
    form: {
        width: '80%',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 12,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerLink: {
        marginTop: 10,
        textAlign: 'center',
        color: 'blue',
    },
});

export default Login