import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DatePicker from 'react-native-modern-datepicker';

const CalendarComponent = ({ setCalendar, setSelectedDate }: any) => {
    let today = new Date().toISOString().slice(0, 10)
    return (
        <>
            <DatePicker
                onSelectedChange={date => setSelectedDate(date)}
                mode='calendar'
                style={{
                    width: '95%',
                    height: '50%',
                    alignSelf: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                }}
                current={today}
            />
            <Pressable style={styles.close} onPress={() => setCalendar(false)}>
                <Text style={styles.closeText}>
                    Close
                </Text>
            </Pressable>
            {/* //TODO: Give a today btn */}
        </>
    )
}

export default CalendarComponent

const styles = StyleSheet.create({
    close: {
        bottom: 4,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000000',
        elevation: 10,
    },
    closeText: {
        fontSize: 22,
        color: 'blue',
        fontWeight: '500',
    }
})