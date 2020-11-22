import React from 'react'
import { View, StyleSheet, Pressable, Image } from 'react-native'
import constants from '../utils/constants';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Text from '../components/TextCustom';
const CastAndCrew = ({navigation, cast, crew}) => {
    let newItems;
    if(cast) {
        newItems = [...cast].slice(0,4);
    } else{
        newItems = [...crew].slice(0,4);
    }

    const gotoCastCreDetails = () => {
        navigation.navigate(constants.SCREEN.CASTANDCREW,{
            crew,
            cast,
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
            <Text style={styles.title}>{cast ? 'Actores' : 'Productores'}</Text>
                <Pressable onPress={gotoCastCreDetails}>
                    <Text style={styles.seemore} >Ver Todos 
                        <AntDesign name="right" size={12} color={constants.COLORS.GRAY} />
                    </Text>
                </Pressable>
            </View>
            <View style={styles.castContainers}>
                {newItems.map((item, index) => (
                    item.profile_path ? (
                        <Image key={index} resizeMode="cover" style={ styles.image }source={{ uri: `https://image.tmdb.org/t/p/original/${item.profile_path}` }}/>
                    ) : (
                        <View style={styles.iconContainer}>
                            <MaterialIcons name="person" size={32} color="black" />
                        </View>
                    )
                ))}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: constants.COLORS.TEXT_COLOR,
        fontWeight: 'bold',
        flexGrow: 1,
        flexWrap: 'wrap',
        marginRight: 8,
        fontSize: 16,
    },
    castContainers: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 70,
    },
    seemore: {
        color: constants.COLORS.GRAY,
        fontSize: 12,
    },
    iconContainer: {
        backgroundColor: constants.COLORS.GRAY,
        width: 70,
        height: 70,
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: "center",
    },
});

export default CastAndCrew;

