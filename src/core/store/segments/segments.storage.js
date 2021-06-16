import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORE_KEY = '@segments';

export const Load = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORE_KEY)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {}
    return null
}

export const Store = (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        AsyncStorage.setItem(STORE_KEY, jsonValue).then(() => {})
    } catch (e) {}
}