import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Input, Button } from '@rneui/themed'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScreenType } from '../App'
import Snackbar from 'react-native-snackbar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNRestart from 'react-native-restart';
import { SignUpUser } from '../schema/signupSchema'
import { z } from 'zod';


type SignUpScreenProps = NativeStackScreenProps<ScreenType, 'Signup'>

const Signup = ({ navigation }: SignUpScreenProps) => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [btnLoading, setBtnLoading] = useState<boolean>(false);

    const storeData = async (token: string, id: string) => {
        try {
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('id', id);
        } catch (e) {
            console.log("Some error occurred", e)
        }
    };

    const handleSignup = async () => {
        setBtnLoading(true);
        let data = { name, email, password, }
        if (password !== confirmPassword) {
            Snackbar.show({
                text: 'Password and Confirm Password does not match',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
            });
            setBtnLoading(false);
            return;
        }
        // let verify = SignUpUser.parse(data)
        // if (!verify) {
        //     Snackbar.show({
        //         text: 'Please Ensure all data are correct',
        //         duration: Snackbar.LENGTH_SHORT,
        //         backgroundColor: 'red',
        //     });
        //     setBtnLoading(false);
        //     return;
        // }
        try {

            const user = SignUpUser.parse(data);

            const res = await fetch('https://interestbusinesshandler.netlify.app/api/createuser', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            })

            let resJson = await res.json();
            console.log(resJson)

            if (resJson.success === 'success') {
                Snackbar.show({
                    text: 'Successfully Registered',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'green'
                })

                storeData(resJson.token, resJson._id)
                //TODO: Set return value of token and _id in api
                setBtnLoading(false)
                // navigation.navigate('Home')

                RNRestart.restart();
            } else {
                Snackbar.show({
                    text: 'Oops! Some Error Occurred',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'red'
                })
                setBtnLoading(false)
            }

        } catch (err: any) {
            // If validation error, display error message in Snackbar
            if (err instanceof z.ZodError) {
                const errorMessage = err.errors[0].message;
                Snackbar.show({
                    text: errorMessage,
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: 'red'
                });
            } else {
                Snackbar.show({
                    text: 'Some Error Occurred',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'red'
                });
            }
            setBtnLoading(false);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.heading}>SignUp</Text>
                <View style={styles.form}>
                    <Input
                        inputContainerStyle={styles.input} //view style for input
                        label='Name'
                        placeholder='Name'
                        value={name}
                        onChangeText={setName}
                        labelStyle={styles.labelStyle}
                    // keyboardType=''
                    />
                    <Input
                        inputContainerStyle={styles.input} //view style for input
                        label='Email'
                        placeholder='Email'
                        value={email}
                        onChangeText={setEmail}
                        keyboardType='email-address'
                        labelStyle={styles.labelStyle}
                    />
                    <Input
                        inputContainerStyle={styles.input} //view style for input
                        label='Password'
                        placeholder='Password'
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                        labelStyle={styles.labelStyle}
                    // rightIcon={{ type: 'feather', name: 'eye' }}
                    // rightIcon={{ type: 'feather', name: 'eye-off' }}
                    />
                    <Input
                        inputContainerStyle={styles.input} //view style for input
                        label='Confirm Password'
                        placeholder='Confirm Password'
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        labelStyle={styles.labelStyle}
                    // rightIcon={{ type: 'feather', name: 'eye' }}
                    // rightIcon={{ type: 'feather', name: 'eye-off' }}
                    />

                    <Button buttonStyle={styles.button} title='Signup' onPress={handleSignup} disabled={btnLoading} loading={btnLoading} />
                </View>
            </View>
        </ScrollView>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading: {
        marginVertical: 8,
        fontSize: 28,
        fontWeight: '600',
        textDecorationLine: 'underline',
        color: '#780305',
        top: 10
    },
    form: {
        width: '80%',
        marginTop: 22,
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
    labelStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000121',
        marginBottom: 10
    }
})