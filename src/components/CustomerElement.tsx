import { StyleSheet, Text, View } from 'react-native'
import { Card } from '@rneui/themed';
import React from 'react'
import { calculateMonth } from '../functions/CalculateMonth';
import { calculateInterest } from '../functions/CalculateInterest';
import { calcFine } from '../functions/CalculateFine';

interface Props {
    customer: Customer; // Assuming Customer interface is defined
}

const CustomerElement = ({ customer }: Props): React.ReactElement => {


    const month = calculateMonth(customer.paidtill);

    const interest: number = calculateInterest(month, customer.pamount, 5)
    const fine: number = calcFine(month, (customer.pamount * 5) / 100)

    return (
        <View style={styles.container}>
            <Card containerStyle={styles.card}>
                <Card.Title style={styles.title}>{customer.cname}</Card.Title>
                {/* <View style={styles.cardView}> */}
                <Text style={{ fontSize: 16, color: '#666666' }}>
                    Principal Amount: {customer.pamount}
                </Text>
                <Text style={{ fontSize: 16, color: '#666666' }}>
                    Interest: {interest}
                </Text>
                <Text style={{ fontSize: 16, color: '#666666' }}>
                    Fine: {fine}
                </Text>
                <Text style={{ fontSize: 16, color: '#666666' }}>
                    Address: {customer.address}
                </Text>
                {/* </View> */}
            </Card>
        </View>
    )
}

export default CustomerElement

const styles = StyleSheet.create({
    container: {
        elevation: 5,
    },
    // cardView: {
    //     padding: 22,
    //     flexDirection: 'row',
    //     marginRight: 5,
    // },
    card: {
        width: '90%',
        paddingVertical: 20,
        paddingHorizontal: 60,
        marginBottom: 10,
        backgroundColor: '#E6FFFC',
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#6FF8FA'
    },
    title: {
        fontSize: 20,
        color: 'black'
    },
})