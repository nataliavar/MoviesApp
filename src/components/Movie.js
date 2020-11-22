import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { DateTime } from '../../node_modules/luxon/build/cjs-browser/luxon';

import constants from '../utils/constants';

import Text from '../components/TextCustom';

const Movie = ({movie, navigation}) => {

    const imageWith =  90;
    const imageMargin = imageWith + 16;

    const {title, vote_average, poster_path, popularity, release_date} = movie;

    const loadMovie = () => {
        navigation.navigate(constants.SCREEN.DETAILS, { movie });
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.card} onPress={ loadMovie }>
                <View style={{flex:1, marginLeft: imageMargin}}>
                    <View style={styles.titleContainer}>
                        <Text fontFamily='bold' numberOfLines={1} style={styles.title}>{title}</Text>
                        <Text fontFamily='bold' style={styles.vote}>{vote_average}</Text>
                    </View>
                    <Text style={styles.popularity}>{popularity.toFixed(0)}</Text>
                    <Text style={styles.release_date}>{DateTime.fromISO(release_date).setLocale('es').toFormat('MMM, y')}
                    </Text>
                </View>
            </Pressable>
            <Image
                style = {styles.poster}
                source={{
                    uri: `https://image.tmdb.org/t/p/original/${poster_path}`,
                }}
                />
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
    },
    card: {
        backgroundColor: constants.COLORS.LIGHT,
        height: 130,
        padding: 16,
        marginBottom: 16,
        borderRadius: 20,
        flexDirection: 'row',
        position: "relative",
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        color: constants.COLORS.TEXT_COLOR,
        fontWeight: 'bold',
        flexGrow: 1,
        flexWrap: 'wrap',
        marginRight: 8,
        fontSize: 16,
    },
    vote: {
        color: constants.COLORS.WARNING,
        fontWeight: 'bold',
    },
    popularity: {
        borderColor: constants.COLORS.PRIMARY,
        color: constants.COLORS.PRIMARY,
        borderWidth: 1,
        width: 40,
        padding: 1,
        borderRadius: 4,
        textAlign: 'center',
        marginTop: 8,
        fontWeight: '300',
        fontSize: 10,
        },
        release_date: {
            paddingTop: 8,
            fontSize: 12,
            textTransform: 'capitalize'
        },
        poster: {
            width: 100,
            height: 140,
            borderRadius: 16,
            position: "absolute",
            top: -25,
            marginBottom: 16,
            marginLeft:16
        },
});

export default Movie;
