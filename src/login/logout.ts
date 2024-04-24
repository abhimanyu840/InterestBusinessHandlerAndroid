import AsyncStorage from "@react-native-async-storage/async-storage"

export const logout = async () => {
    try {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('id')
    } catch (e: any) {
        return e.message('Error Logging Out')
    }

    console.log('Done.')
}