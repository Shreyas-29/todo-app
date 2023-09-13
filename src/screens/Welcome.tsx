import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Welcome = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <StatusBar style="auto" animated={true} backgroundColor={"#fff"} translucent={true} />
            <View style={styles.logo}>
                <Text style={{ fontWeight: "500", textAlign: "left", fontSize: 16, fontFamily: "DMMedium" }}>Taskpro</Text>
            </View>

            <Text style={styles.heading}>
                Manage your tasks & everything with
                <Text style={{ color: "#f87171", fontFamily: "DMBold" }}> Taskpro</Text>
            </Text>

            <Image
                source={require("../../assets/images/come.png")}
                style={{ width: "100%", height: 300, resizeMode: "contain" }}
            />

            <Text style={styles.description}>
                When you're overwhelmed by the amount of work you have on your plate, stop and rethink your approach.
            </Text>

            <TouchableOpacity
                style={styles.button}
                // @ts-ignore
                onPress={() => navigation.navigate("Home")}
            >
                <Text style={{ color: "#fff", fontSize: 16, fontFamily: "DMBold" }}>
                    Let's Start
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Welcome


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        gap: 10,
        paddingTop: 60,
        paddingHorizontal: 20,
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        fontFamily: "DMRegular"
    },
    logo: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        fontFamily: "DMRegular"
    },
    heading: {
        marginTop: 40,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        fontSize: 32,
        textAlign: "center",
        fontFamily: "DMBold"
    },
    description: {
        marginTop: 20,
        color: '#374151',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 10,
        fontSize: 13,
        textAlign: "center",
        fontFamily: "DMRegular"
    },
    button: {
        marginTop: 20,
        backgroundColor: '#f87171',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 50,
        maxWidth: 'auto',
        marginLeft: "auto",
        marginRight: "auto",
        shadowColor: "#f87171",
        shadowOffset: {
            width: 2,
            height: 12,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 10,
        fontFamily: "DMRegular"
    }
});
