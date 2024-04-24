import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Snackbar from 'react-native-snackbar'
import CustomerElement from '../components/CustomerElement'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScreenType } from '../App'
import { getLoginData } from '../login/getLoginData'
import { Button } from '@rneui/themed'

type HomeProps = NativeStackScreenProps<ScreenType, 'Home'>

const Home = ({ navigation }: HomeProps) => {

    // const navigation = useNavigation()
    // console.log(navigation)
    const [customerData, setCustomerData] = useState<Customer[]>([])
    const [loading, setLoading] = useState(true);
    const [uid, setUid] = useState<string>('');

    const getUid = async () => {
        const data = await getLoginData()
        const { id }: any = data
        setUid(id);
    }



    useEffect(() => {
        getUid();
        const fetchCustomer = async () => {
            try {
                let res = await fetch('https://interestbusinesshandler.netlify.app/api/fetchcustomeruid', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        uid: uid
                    })
                });
                const { customer } = await res.json();
                customer.length > 0 && setCustomerData(customer)
                // console.log(customer, 'data');
                // customer.length > 0 && setLoading(false)
                setLoading(false)
            } catch (error) {
                console.log('Error fetching data:', error);
                setLoading(false)
                Snackbar.show({
                    text: 'Error Fetching Data',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: '#FF0707'
                })
            }
        }
        fetchCustomer()
    }, [uid])


    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2407FF" />
                <Text>Loading...</Text>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>
                Interest Business Handler
            </Text>
            {/* {(!loading && customerData) ? ( */}
            <View style={{marginBottom:120}}>
                <FlatList
                    data={customerData}
                    keyExtractor={item => item._id}
                    renderItem={({ item, index }) => <Pressable onPress={() => {
                        navigation.navigate('CustomerDetails', { customer: item })
                    }}>
                        <CustomerElement customer={item} />
                    </Pressable>}
                    showsVerticalScrollIndicator={false}
                />
                {/* <Button onPress={() => navigation.navigate('CreateCustomer')} /> */}
            </View>

            <View style={{position:'absolute',bottom:0,elevation:15}}>
                <Button
                    title="Create Customer"
                    buttonStyle={{
                        backgroundColor: 'blue',
                        borderRadius: 3,
                    }}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    onPress={() => navigation.navigate('CreateCustomer')}
                />
            </View>

            {/* ) : ( */}
            <View>
                <Text style={{ fontSize: 16, color: 'black' }}> No data available </Text>
            </View>
            {/* )} */}


        </View>
    )
}

export default Home

// const styles = StyleSheet.create({})
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    headingText: {
        marginVertical: 8,
        fontSize: 28,
        fontWeight: '600',
        textDecorationLine: 'underline',
        color: '#780305',
        top: 10
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});