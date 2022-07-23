import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './style';

export default function QuotationsItems() {
    return (
        <View style={styles.mainContent}>
            <View style={styles.contextLeft}>
                <View style={styles.boxLogo}>
                    <Image
                        style={styles.logoBitcoin}
                        source={require('../../../img/bitcoin-icon.png')}
                    />
                    <Text style={styles.dayCotation}>12/03/2022</Text>
                </View>
            </View>
            <View style={styles.contextRigth}>
                <Text style={styles.price}>$ 53331.42</Text>
            </View>
        </View>
    )
}