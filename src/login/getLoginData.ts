import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLoginData = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const id = await AsyncStorage.getItem('id');
        if (token !== null && id !== null) {
            // value previously stored
            let loginData = { token, id }
            // console.log(token)
            // console.log(id)
            return loginData
        }
    } catch (e) {
        // error reading value
    }
};