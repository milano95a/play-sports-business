import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight, ScrollView } from 'react-native';
import { Icon, List, ListItem } from 'react-native-elements';
import firebase from 'firebase';
import Colors from '../constants/Colors';

export default class StadiumScreen extends React.Component {
  static navigationOptions = {
    title: 'My stadiums',
  };

  state = {
      stadiums: [],
      selectedStadium: null,
      selectStadiumButtonText: 'Select stadium',
      dataSource: [],
      map: false,
      ownerId: '',
      reviews: []
  };

  componentWillMount() {
    this.setState({ownerId: firebase.auth().currentUser.uid});

    firebase.database().ref('/stadiums/').on('value', (snapshot) => {
      snapshot.forEach((s2) => {
        let found = false;
        let newlist = this.state.stadiums;

        for (let i = 0; i < newlist.length; i++) {
            if (newlist[i].stadiumKey === s2.key) {
                newlist[i] = s2.val();
                found = true;
                break;
            }
        }

        if (found) {
          this.setState({ stadiums: [...newlist] });
        } else {
          this.setState({ stadiums: [...this.state.stadiums, s2.val()] });
        }
      });
    }, (e) => {
      console.log(e);
    });
  }

  renderList(){
    const list = this.state.stadiums === undefined
    ? (null)
    : this.state.stadiums.map((stadium, i) => {

      if (stadium.userId === this.state.ownerId) {
        const badgeColor = stadium.status === true ? Colors.green : Colors.red;
        const badgeText = stadium.status === true ? 'Open' : 'Closed';
        return (
          <ListItem
            badge={{ value: badgeText, textStyle: { color: Colors.white }, containerStyle: { marginTop: 0, backgroundColor: badgeColor } }}
            key={i}
            avatarStyle={{backgroundColor: 'white'}}
            title={stadium.stadiumName}
            subtitle={
              <View style={styles.subtitleView}>
                <Text style={styles.ratingText}>{`${stadium.region}, ${stadium.dist}`}</Text>
              </View>
            }
            avatar={require('./../assets/icon.png')}
            component={TouchableHighlight}
            underlayColor="#f7f7f7"
            onPress={() => {
              this.props.navigation.navigate(
                'StadiumDetailScreen',
                { stadium }
              );
            }}
          />
        );
      } else {
        return (null);
      }
    });

    return (
      <View style={styles.container}>
        <ScrollView >
          <List >
            {list}
          </List>
        </ScrollView>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container} >
        {this.renderList()}
        <View style={{alignItems: 'flex-end'}}>
          <Icon
            raised
            name='add'
            type='enctypo'
            color='white'
            underlayColor={Colors.red}
            containerStyle={{ backgroundColor: Colors.red}}
            onPress={() => {
              this.props.navigation.navigate('AddScreen');
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    width: 24,
    height: 24,
  },
  subtitleView: {
    flexDirection: 'row',
  },
  ratingImage: {
    color: 'white',
    fontWeight: 'bold'
  },
  ratingText: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 10,
    color: 'grey'
  },
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  buttonStyle: {
    backgroundColor: 'red',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }
});
