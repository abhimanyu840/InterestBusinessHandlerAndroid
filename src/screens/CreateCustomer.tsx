import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Input, Icon, Button } from '@rneui/themed'
import CalendarComponent from '../components/CalendarComponent'
import { getLoginData } from '../login/getLoginData'
import Snackbar from 'react-native-snackbar'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScreenType } from '../App'

type CreateCustomerScreenProps = NativeStackScreenProps<ScreenType, 'CreateCustomer'>

const CreateCustomer = ({ navigation }: CreateCustomerScreenProps) => {
    const [btnLoading, setBtnLoading] = useState<boolean>(false)
    const [calendar, setCalendar] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [guarantor, setGuarantor] = useState<string>('');
    const [address, setAddress] = useState<string>('')
    const [amount, setAmount] = useState<string>('');
    const [date, setDate] = useState()
    var slugify = require('slugify')
    const slugword = name + address + Date.now();


    const handleCreateCustomer = async () => {
        setBtnLoading(true)
        const slug = slugify(slugword, {
            replacement: '-',  // replace spaces with replacement character, defaults to `-`
            remove: undefined, // remove characters that match regex, defaults to `undefined`
            lower: true,      // convert to lower case, defaults to `false`
            strict: false,     // strip special characters except replacement, defaults to `false`
            locale: 'vi',      // language code of the locale to use
            trim: true         // trim leading and trailing replacement chars, defaults to `true`
        })
        const loginData = await getLoginData()
        let uid = loginData?.id

        const data = {
            uid, cname: name, gname: guarantor, address, pamount: amount, paidamount: [{ amount: parseFloat(amount), date: new Date() }], slug, date, paidtill: date
        };
        // console.log(data)

        try {
            const res = await fetch('https://interestbusinesshandler.netlify.app/api/createcustomer', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            const resData = await res.json()
            // console.log(resData)
            if (resData.success === 'success') {
                Snackbar.show({
                    text: 'Customer Created Successfully',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'green'
                })
                setBtnLoading(false)
                setName(' ')
                setGuarantor(' ')
                setAddress(' ')
                setAmount(' ')
                // setDate()
                navigation.pop()
                navigation.push('Home')

            } else {
                Snackbar.show({
                    text: 'Some Error Occurred',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'red'
                })
                setBtnLoading(false)
            }

        } catch (error) {
            Snackbar.show({
                text: 'Some Error Occurred',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red'
            })
            setBtnLoading(false)
            console.error(error)
        }

    }
    const openCalendar = () => {
        setCalendar(true)
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.heading}>CreateCustomer</Text>

                {calendar && <CalendarComponent setCalendar={setCalendar} setSelectedDate={setDate} />}
                <View style={styles.form}>
                    <Input
                        inputContainerStyle={styles.input} //view style for input
                        label='Customer Name'
                        placeholder='Customer Name'
                        value={name}
                        onChangeText={setName}
                        labelStyle={styles.labelStyle}
                    // keyboardType=''
                    />
                    <Input
                        inputContainerStyle={styles.input} //view style for input
                        label='Guarantor Name'
                        placeholder='Guarantor Name'
                        value={guarantor}
                        onChangeText={setGuarantor}
                        labelStyle={styles.labelStyle}
                    // keyboardType=''
                    />
                    <Input
                        inputContainerStyle={styles.input} //view style for input
                        label='Address'
                        placeholder='Address'
                        value={address}
                        onChangeText={setAddress}
                        labelStyle={styles.labelStyle}
                    // keyboardType=''
                    />
                    <Input
                        inputContainerStyle={styles.input} //view style for input
                        label='Amount'
                        placeholder='Amount'
                        value={amount}
                        onChangeText={setAmount}
                        labelStyle={styles.labelStyle}
                        keyboardType='numeric'
                    />
                    <Input
                        label="Date"
                        placeholder="Date"
                        value={date}
                        editable={false}
                        inputContainerStyle={styles.inputStyle}
                        labelStyle={styles.labelStyle}
                        inputStyle={styles.inputText}
                        rightIcon={<Icon type='feather' name='calendar' onPress={() => openCalendar()} />}
                    />

                    <Button buttonStyle={styles.button} title='Create Customer' onPress={handleCreateCustomer} disabled={btnLoading} loading={btnLoading} />
                </View>
            </View>
        </ScrollView>
    )
}

export default CreateCustomer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
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
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 3,
        color: '#151515',
        fontWeight: '500',
    },
    inputText: {
        color: '#000000',
    },
})