import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Icon, Input } from '@rneui/themed'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScreenType } from '../../App'
import { calculateInterest } from '../../functions/CalculateInterest'
import { calculateMonth } from '../../functions/CalculateMonth'
import { calcFine } from '../../functions/CalculateFine'
import CalendarComponent from '../../components/CalendarComponent'
import Snackbar from 'react-native-snackbar'

type PayIntFineScreenProps = NativeStackScreenProps<ScreenType, 'PayIntFine'>

const PayIntFine = ({ navigation, route }: PayIntFineScreenProps) => {
    const { _id, cname, gname, pamount, paidtill }: Customer = route.params.customer;

    const month: number = calculateMonth(paidtill)
    // const interest: number = calculateInterest(month, pamount, 5)
    // const fine: number = calcFine(month, (pamount * 5) / 100)

    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [payTill, setPayTill] = useState<string>('')
    const [calendar, setCalendar] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [interest, setInterest] = useState<string>(calculateInterest(month, pamount, 5).toString());
    const [fine, setFine] = useState<string>(calcFine(month, (pamount * 5) / 100).toString());
    const [total, setTotal] = useState(Number(interest) + Number(fine));

    // const payIntFine = async 



    useEffect(() => {
        setTotal((Number(interest) + Number(fine)))
    }, [interest, fine])

    useEffect(() => {
        setPayTill(selectedDate)
    }, [selectedDate])

    const openCalendar = () => {
        setCalendar(true)
    }

    const handlePayIntFine = async () => {
        setBtnLoading(true);
        const payTillParts = payTill.split('/');
        const payTillDate = new Date(
            parseInt(payTillParts[0]),
            parseInt(payTillParts[1]) - 1, // Months are zero-based
            parseInt(payTillParts[2])
        );
        const data = {
            _id,
            paidinterest: [Number(interest)],
            paidfine: [Number(fine)],
            paidtill: payTillDate,
            total: [Number(total)],
        }
        console.log(data)
        try {
            const res = await fetch('https://interestbusinesshandler.netlify.app/api/updatecustomer', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const resData = await res.json()
            console.log(resData, 'resssss')
            if (resData.success === 'success') {
                Snackbar.show({
                    text: 'Interest/Fine Paid Successfully',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'green'
                })
                setBtnLoading(false)
                navigation.push('Home')
            } else {
                Snackbar.show({
                    text: 'Something went wrong',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'red'
                })
                setBtnLoading(false)

            }
        } catch (error) {
            Snackbar.show({
                text: 'Something went wrong',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red'
            });
            console.log("Some Error occurred", error);
            setBtnLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>Pay Interest/Fine</Text>
            {/* {calendar && (<View style={styles.calendarView}> <CalendarComponent /></View>)} */}
            {calendar && <CalendarComponent setCalendar={setCalendar} setSelectedDate={setSelectedDate} />}
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <Input
                    label="Customer Name"
                    placeholder="Customer Name"
                    value={cname}
                    editable={false}
                    inputContainerStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    inputStyle={styles.inputText}
                />
                <Input
                    label="Guarantor Name"
                    placeholder="Guarantor Name"
                    value={gname}
                    editable={false}
                    inputContainerStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    inputStyle={styles.inputText}
                />
                <Input
                    label="Principle Amount"
                    placeholder="Principle Amount"
                    value={pamount.toLocaleString()}
                    editable={false}
                    inputContainerStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    inputStyle={styles.inputText}
                />
                <Input
                    label="Paid Till"
                    placeholder="Paid Till"
                    value={new Date(paidtill).toISOString().split('T')[0]}
                    editable={false}
                    inputContainerStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    inputStyle={styles.inputText}
                />
                <Input
                    label="Interest"
                    placeholder="Interest"
                    value={interest.toLocaleString()}
                    inputContainerStyle={styles.inputStyle}
                    onChangeText={(text) => setInterest(text)}
                    keyboardType='numeric'
                    labelStyle={styles.labelStyle}
                    inputStyle={styles.inputText}
                />
                <Input
                    label="Fine"
                    placeholder="Fine"
                    value={fine.toLocaleString()}
                    inputContainerStyle={styles.inputStyle}
                    onChangeText={(text) => setFine(text)}
                    keyboardType='numeric'
                    labelStyle={styles.labelStyle}
                    inputStyle={styles.inputText}
                />
                <Input
                    label="Total"
                    placeholder="Total"
                    value={total?.toLocaleString()}
                    editable={false}
                    inputContainerStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    inputStyle={styles.inputText}
                />
                <Input
                    label="Pay Till"
                    placeholder="Pay Till"
                    value={payTill}
                    editable={false}
                    inputContainerStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    inputStyle={styles.inputText}
                    rightIcon={<Icon type='feather' name='calendar' onPress={() => openCalendar()} />}
                />

                <View style={styles.btnView}>
                    <Button
                        title="Pay"
                        buttonStyle={{
                            backgroundColor: 'blue',
                            borderRadius: 3,
                            marginHorizontal: 'auto'
                        }}
                        containerStyle={{
                            width: 200,
                            marginHorizontal: 50,
                            marginVertical: 10,
                        }}
                        loading={btnLoading}
                        disabled={btnLoading}
                        onPress={() => handlePayIntFine()}
                    />

                </View>
            </ScrollView>
        </View>
    )
}

export default PayIntFine

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    headingText: {
        textAlign: 'center',
        color: '#581c87',
        fontSize: 24,
        textDecorationLine: 'underline',
        marginVertical: 8,
        fontWeight: '600',
    },
    scrollView: {
        width: '90%',
        marginTop: 20,
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 3,
        color: '#151515',
        fontWeight: '500',
    },
    labelStyle: {
        fontSize: 20,
        color: 'black',
        marginBottom: 5,
    },
    btnView: {
        marginBottom: 10,
        alignItems: 'center'
    },
    inputText: {
        color: '#000000',
        fontWeight: "500",
    },
    calendarView: {
        width: '100%',
        height: 400,
        elevation: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },

})