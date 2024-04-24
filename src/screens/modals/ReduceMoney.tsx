import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Input } from '@rneui/themed'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScreenType } from '../../App'
import Snackbar from 'react-native-snackbar'

type ReduceMoneyProps = NativeStackScreenProps<ScreenType, 'ReduceMoney'>

const ReduceMoney = ({ navigation, route }: ReduceMoneyProps) => {

    const { _id, pamount, cname, gname } = route.params.customer
    const [reduceMoney, setReduceMoney] = useState<string>();
    const [total, setTotal] = useState<number>();
    const [btnLoading, setBtnLoading] = useState<boolean>(false)

    //Use it for updating total value
    useEffect(() => {
        setTotal(pamount - Number(reduceMoney) || pamount)
    }, [reduceMoney])

    const handleGiveMoney = async () => {
        setBtnLoading(true)
        const data = {
            _id,
            pamount: Number(total),
            paidamount: Number(-reduceMoney!)
        }
        try {
            if (Number(reduceMoney) > 0) {
                //Update the total amount
                let res = await fetch('https://interestbusinesshandler.netlify.app/api/updatecustomer', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                //Get the response
                let response = await res.json();
                // console.log(response, 'ressss')
                if (response.success === 'success') {
                    Snackbar.show({
                        text: 'Reduced Money',
                        duration: Snackbar.LENGTH_SHORT,
                        backgroundColor: 'green',
                        textColor: 'white'
                    })
                }
                // navigation.navigate('Home');
                navigation.push('Home');
                setBtnLoading(false)
            } else {
                Snackbar.show({
                    text: 'Please enter valid amount',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'red',
                    textColor: 'white'
                });
                setBtnLoading(false)
            }
        } catch (error) {
            Snackbar.show({
                text: 'Some Error Occurred',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
                textColor: 'white'
            })
            setBtnLoading(false)
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>Reduce Money</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.formView}>
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
                        label="Previous Money"
                        placeholder="Previous Money"
                        value={pamount.toLocaleString()}
                        editable={false}
                        inputContainerStyle={styles.inputStyle}
                        labelStyle={styles.labelStyle}
                        inputStyle={styles.inputText}
                    />
                    <Input
                        label="Reduce Money"
                        placeholder="Reduce Money"
                        value={reduceMoney?.toLocaleString()}
                        keyboardType='numeric'
                        onChangeText={setReduceMoney}
                        inputContainerStyle={styles.inputStyle}
                        labelStyle={styles.labelStyle}
                        inputStyle={styles.inputText}
                    />
                    <Input
                        label="Total"
                        placeholder="Total"
                        value={total?.toLocaleString()}
                        inputContainerStyle={styles.inputStyle}
                        labelStyle={styles.labelStyle}
                        inputStyle={styles.inputText}
                    />
                    <View style={{ alignItems: 'center' }}>

                        <Button
                            title="Reduce Money"
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
                            onPress={() => handleGiveMoney()}
                            loading={btnLoading}
                            disabled={btnLoading}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ReduceMoney

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headingText: {
        fontWeight: '600',
        textDecorationLine: 'underline',
        fontSize: 24,
        color: '#581c87',
        textAlign: 'center',
        marginVertical: 6,
    },
    formView: {
        paddingHorizontal: 12,
        paddingTop: 8,

    },
    inputText: {
        color: '#000000',
        fontWeight: "500",
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
})