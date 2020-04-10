import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Linking } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ScreenThree = ({ navigation }) => {
    useEffect(() => {
        // Linking.openURL('https://github.com/')
        // navigation.navigate('Screen Two') // Remove this to stop app from switching to screen two and instead going to a big github link
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {Linking.openURL('https://github.com/')}}>
                <Entypo style={styles.logo} name={'github'} size={80} />
                <Text style={{ fontSize: 20 }}>github.com/username</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        alignSelf: 'center',
        borderColor: 'black',
    }
});

export default ScreenThree;