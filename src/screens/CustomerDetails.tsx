import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button, ButtonGroup, withTheme } from '@rneui/themed';
import { ScreenType } from '../App'
import { Input } from '@rneui/themed';
import { calculateMonth } from '../functions/CalculateMonth';
import { calculateInterest } from '../functions/CalculateInterest';
import { calcFine } from '../functions/CalculateFine';

type CustomerProps = NativeStackScreenProps<ScreenType, 'CustomerDetails'>

const CustomerDetails = ({ route, navigation }: CustomerProps) => {

    const { cname, gname, address, date, paidtill, pamount } = route.params.customer
    const month = calculateMonth(paidtill);
    const interest: number = calculateInterest(month, pamount, 5);
    const fine: number = calcFine(month, (pamount * 5) / 100);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Customer Details </Text>
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
                    label="Address"
                    placeholder="Address"
                    value={address}
                    editable={false}
                    inputContainerStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    inputStyle={styles.inputText}
                />
                <Input
                    label="Date Taken"
                    placeholder="Date Taken"
                    value={new Date(date).toISOString().split('T')[0]}
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
                    label="Principal Amount"
                    placeholder="Principal Amount"
                    value={pamount.toString()}
                    inputContainerStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    inputStyle={styles.inputText}
                    editable={false}
                />
                <Input
                    label="Interest"
                    placeholder="Interest"
                    value={interest.toString()}
                    editable={false}
                    inputContainerStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    inputStyle={styles.inputText}
                />
                <Input
                    label="Fine"
                    placeholder="Fine"
                    value={fine.toString()}
                    editable={false}
                    inputContainerStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    inputStyle={styles.inputText}
                />
                <View style={styles.btnView}>
                    <Button
                        title="Pay Interest/Fine"
                        buttonStyle={{
                            backgroundColor: 'blue',
                            borderRadius: 3,
                        }}
                        containerStyle={{
                            width: 200,
                            marginHorizontal: 50,
                            marginVertical: 10,
                        }}
                        onPress={() => navigation.navigate('PayIntFine', { customer: route.params.customer })}
                    />
                    <Button
                        title="Give Money"
                        buttonStyle={{
                            backgroundColor: 'blue',
                            borderRadius: 3,
                        }}
                        containerStyle={{
                            width: 200,
                            marginHorizontal: 50,
                            marginVertical: 10,
                        }}
                        onPress={() => navigation.navigate('GiveMoney', { customer: route.params.customer })}
                    />
                    <Button
                        title="Reduce Money"
                        buttonStyle={{
                            backgroundColor: 'blue',
                            borderRadius: 3,
                        }}
                        containerStyle={{
                            width: 200,
                            marginHorizontal: 50,
                            marginVertical: 10,
                        }}
                        onPress={() => navigation.navigate('ReduceMoney', { customer: route.params.customer })}
                    />
                    <Button
                        title="Show History"
                        buttonStyle={{
                            backgroundColor: 'blue',
                            borderRadius: 3,
                        }}
                        containerStyle={{
                            width: 200,
                            marginHorizontal: 50,
                            marginVertical: 10,
                        }}
                        onPress={() => navigation.navigate('ShowHistory', { customer: route.params.customer })}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default CustomerDetails

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
        alignItems: 'center'
    },
    inputText: {
        color: '#000000',
        fontWeight: "500",
    }
})