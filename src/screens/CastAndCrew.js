import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions,Platform } from 'react-native'

import constants from '../utils/constants';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export const CastAndCrew = ({navigation, route}) => {
    const {cast, crew } = route.params;
    
    let items = cast ? cast : crew; 

    React.useEffect(() => {
        navigation.setOptions({
            title: cast ? 'Actores' : 'Equipo de produccion',
            headerBackTitleVisible: false,
        });
    });

    return (
        <ScrollView style={styles.container}>
        <View style={styles.castContainers}>
            {items.map((item, index) => (
                <View key={index} style={styles.card}>
                        {item.profile_path ? (
                            <Image 
                            key={index} 
                            resizeMode="cover" 
                            style={ styles.image }
                            source={{ uri: `https://image.tmdb.org/t/p/original/${item.profile_path}` }}/>
                        ) : (
                            <View style={styles.iconContainer}>
                                <MaterialIcons name="person" size={32} color="black" />
                            </View>
                        )}
                        <Text style={{ textAlign: 'center'}}>
                            {cast ? item.character : item.department}</Text>
                        <Text style={{ textAlign: 'center'}}>{item.name}</Text>
                </View>
            ))}
          
            
        </View>
    </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: Platform.Os === 'android' ? 0 : 20,
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
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
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
    card: {
        width: (width - 40) / 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,

    }
});
