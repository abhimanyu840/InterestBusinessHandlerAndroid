import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { ListItem, Icon } from '@rneui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenType } from '../../App';

type ShowHistoryScreenProps = NativeStackScreenProps<ScreenType, 'ShowHistory'>;

const ShowHistory = ({ navigation, route }: ShowHistoryScreenProps) => {
    // const { customer } = route.params;
    const { paidamount, paidfine, paidinterest, total } = route.params.customer

    // console.log(paidamount.forEach(item => console.log(item.amount)))
    // console.log(paidamount.filter((item) => (item.amount > 0)))
    // console.log(paidamount.filter((item) => (item.amount < 0)))
    return (
        <View style={styles.container}>
            {/* <Icon
                name='close'
                type='material'
                size={30}
                onPress={() => closeModal(false)}
                containerStyle={styles.closeIcon}
            /> */}
            <Text style={styles.headingText}>History</Text>

            <ScrollView style={styles.scrollView}>
                <RenderTable title="Given Amount" data={paidamount.filter((item) => (item.amount > 0))} />
                <RenderTable title="Returned Amount" data={paidamount.filter((item) => (item.amount < 0))} />
                <RenderTable title="Paid Interest" data={paidinterest} />
                <RenderTable title="Paid Fine" data={paidfine} />
                <RenderTable title="Given Total" data={total} />
            </ScrollView>
        </View>
    );
};

const RenderTable = ({ title, data }: any) => {
    return (
        <View>
            <Text style={styles.subtitle}>{title}</Text>
            <ScrollView horizontal>
                <View style={{ flex: 1 }}>
                    <View style={styles.row}>
                        <Text style={styles.header}>Amount</Text>
                        <Text style={styles.header}>Date</Text>
                    </View>
                    {data.map((item: any, index: any) => (
                        <ListItem key={index} containerStyle={styles.listItem}>
                            <ListItem.Content style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                <ListItem.Title>{item.amount}</ListItem.Title>
                                <ListItem.Subtitle>{new Date(item.date).toISOString().split('T')[0]}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        marginTop: 20,
    },
    subtitle: {
        textAlign: 'center',
        color: '#3F51B5',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#F5F5F5',
    },
    header: {
        fontWeight: 'bold',
    },
    listItem: {
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        width: 350,
    },
});

export default ShowHistory;
