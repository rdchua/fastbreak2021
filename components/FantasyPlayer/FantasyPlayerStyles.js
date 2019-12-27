import { StyleSheet } from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor
    },

    playerContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    playerInfo: {
        marginLeft: 15
    },
    playerName: {
        fontSize: 17,
        color: 'white'
    },
    playerTeam: {
        color: '#888'
    }, 
    playerImage: {
        height: 40,
        width: 40,
        borderRadius: 25
    },
    playerDetails: {
        fontSize: 12,
        color: '#888'
    },
    statContainer: {
        marginTop: 4
    },
    statName: {
        color: '#888',
        fontSize: 12,
    },
    statValue: {
        color: 'white',
        fontSize: 17
    },
    details: {
        flexDirection: 'row'
    },
    teamContainer: {
        paddingTop: 2.5,
        paddingRight: 5
    },
    teamImage: {
        width: 25,
        height: 25
    },
    jersey: {
        color: '#fff', 
        fontSize: 12,
        textAlign: 'center',
    },
    teamcode: {
        fontSize: 12,
        color: 'gray'
    },
    na: {
        fontSize: 12,
        color: 'gray'
    },
    statName: {
        color: '#888',
        fontSize: 12,
    },
    statValue: {
        color: 'white',
        fontSize: 17
    },
    status: {
        color: 'red'
    }
})