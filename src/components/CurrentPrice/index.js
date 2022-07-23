import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

export default function CurrentPrice() {
    return (
        <View style={styles.headerPrice}>
            <Text style={styles.currentPrice}>$ 545445.343</Text>
            <Text style={styles.textPrice}>ultima cotação</Text>
        </View>
    )
}