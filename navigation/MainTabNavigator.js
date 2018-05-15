import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import firebase from 'firebase';

import Colors from '../constants/Colors';

import BookingScreen from '../screens/BookingScreen';
import StadiumScreen from '../screens/StadiumScreen';
import AddScreen from '../screens/AddScreen';
import EditScreen from '../screens/EditScreen';

import BusinessMap from './../components/BusinessMap';
import StadiumDetailScreen from '../screens/StadiumDetailScreen';


const StadiumStack = StackNavigator({
  Stadiums: { screen: StadiumScreen },
  AddScreen: { screen: AddScreen },
  EditScreen: { screen: EditScreen },  
  BusinessMapScreen: { screen: BusinessMap},
  StadiumDetailScreen: {screen: StadiumDetailScreen}
}, {
  navigationOptions:() => ({
    headerStyle: {
      backgroundColor: Colors.red,
    },
    headerTintColor: '#fff',
  })
});

const BookingStack = StackNavigator({
  Bookings: {screen: BookingScreen},
}, {
  navigationOptions:() => ({
    headerStyle: {
      backgroundColor: Colors.red,
    },
    headerRight: <Icon
      name='logout'
      type='material-community'
      color='white'
      containerStyle={{marginRight: 10}}
      underlayColor={Colors.red}
      size={30}
      onPress={()=> {
        firebase.auth().signOut();
      }}/>,
    headerTintColor: '#fff',
  }),
});

export default TabNavigator(
  {
    Bookings: {
      screen: BookingStack,
    },
    Stadiums: {
      screen: StadiumStack,
    },
    // Add: {
    //   screen: AddScreen
    // }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Stadiums':
            iconName =
              Platform.OS === 'ios'
                ? `ios-football${focused ? '' : '-outline'}`
                : 'md-football';
            break;
          case 'Bookings':
            iconName =
              Platform.OS === 'ios'
                ? `ios-bookmark${focused ? '' : '-outline'}`
                : 'md-bookmark';
            break;
          default:
            iconName =
              Platform.OS === 'ios'
                ? `ios-add-circle${focused ? '' : '-outline'}`
                : 'md-add-circle';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: Colors.tabIconSelected,
    }
  }
);
