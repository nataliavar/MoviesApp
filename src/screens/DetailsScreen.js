import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import constants from '../utils/constants';
import { DateTime } from '../../node_modules/luxon/build/cjs-browser/luxon';

import Stars from '../components/Stars';
import CastAndCrew from '../components/CastAndCrew';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import axios from '../utils/axios';

const { width, height } = Dimensions.get('screen');

const imageWith =  130;
const imageMargin = imageWith + 16;

const Star = ({ realVotes }) => {
    let iconName = 'star-o';
        return (
        <View style= {styles.starsContainer}>
            {[ ...Array(5).keys()].map((position) => {
                if( position < realVotes ){
                    iconName = 'star';
                }else{
                    iconName = 'star-o';
                }
                return <FontAwesome key={position} name={iconName} size={16} color={constants.COLORS.WARNING} />;
            })}
        </View>)
};

export const DetailsScreen = ({navigation, route}) => {

    const { movie } = route.params;

    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);

    useEffect(() => {
        axios
        .get(`movie/${movie.id}/credits?api_key=${constants.API_KEY}`)
        .then((res) => {
           setCast(res.data.cast);
           setCrew(res.data.crew);
        })
        .catch((err) => {console.log(err)});
    }, [setCast, setCrew]);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: (props) => {
                return <View style={styles.containerbuttonback}>
                    <MaterialIcons 
                    {...props}
                    name="keyboard-backspace" 
                    size={24} 
                    color={constants.COLORS.LIGHT}
                    style={{opacity: 1}} />
                </View>
            },
            headerRight: () => {
                return <View style={styles.containerbuttonback}>
                   <Entypo name="dots-three-horizontal" 
                   size={24} 
                   color={constants.COLORS.LIGHT}
                   style={{opacity: 1}} />
                </View>
            }
        });
    });

    return (
        <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
            <View style={ styles.imageContainer}>
                <Image
                    style={[ StyleSheet.absoluteFill ,styles.cover ]}
                    blurRadius={5}
                    source={{
                            uri: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
                        }}/>
                    <View style= {styles.backdrop}/>
            </View>
            <View style={ styles.content}>
            <Image
                style = {styles.poster}
                source={{
                    uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
                }}/>
                    <View style={{ flex:1, marginLeft: imageMargin }}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{movie.title}</Text>
                        </View>
                        <Text style={styles.popularity}>{movie.popularity.toFixed(0)}</Text>
                        <Text style={styles.release_date}>{DateTime.fromISO(movie.release_date).setLocale('es').toFormat('MMM, y')}
                        </Text>
                        <View style={{flexDirection: 'row', alignItems: 'baseline',}}>
                            <Stars realVotes={Math.floor(movie.vote_average /2 )}></Stars>
                            <Text style={styles.vote}>{movie.vote_average}</Text>
                        </View>
                    </View>
                    <View style={styles.secondaryContent}>
                        <Text>Resume</Text>
                        <Text style={styles.paragraph}>{movie.overview}</Text>
                    </View>
                    <View style={styles.CastAndCrew}>
                        <CastAndCrew navigation={navigation} cast={cast}/>
                        <CastAndCrew navigation={navigation} crew={crew}/>
                    </View>
                    
            </View>
            <View style={{height:300}}>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: constants.COLORS.LIGHT,
        maxHeight: 800
    },
    cover: {
        width: null,
        height: null,
        zIndex: 8,
    },
    imageContainer: {
        position: 'relative',
        width,
        height: height / 3,
    },
    backdrop: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: constants.COLORS.WARNING,
        opacity: 0.2,
        zIndex: 9,
    },
    content: {
        width,
        backgroundColor: constants.COLORS.LIGHT,
        padding: 25,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        top: -25,
        zIndex: 10,
        position: 'relative',
    },
    card: {
        backgroundColor: constants.COLORS.LIGHT,
        height: 130,
        padding: 16,
        marginBottom: 8,
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
        marginTop: 8,
        marginLeft: 8,
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
            width: 130,
            height: 200,
            borderRadius: 16,
            position: "absolute",
            top: -32,
            marginBottom: 16,
        },
        secondaryContent: {
            marginTop: 55,
            marginLeft: 8,
        },
        paragraph: {
            marginTop: 8,
            fontSize: 14,
            color: constants.COLORS.GRAY,
            lineHeight: 20,
        },
        containerbuttonback: {
            backgroundColor: constants.COLORS.PRIMARY2,
            opacity: 0.9,
            borderRadius: 20,
            width: 36,
            height: 36,
            marginHorizontal: 20,
            justifyContent: 'center',
            alignItems: "center",
        },
        CastAndCrew: {
            
        }
});