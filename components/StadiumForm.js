import React, { Component } from 'react';
import { Text, View, Picker } from 'react-native';
import firebase from 'firebase';
import { Input, Button, Card, CardSection, Spinner } from './common';
import Colors from '../constants/Colors';

class StadiumForm extends Component {
  constructor() {
    super();
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
  }

  state = {
    addStadiumLoading: false,
    addStadiumError: '',
    stadiumName: '',
    region: '',
    dist: '',
    price: '',
    locationText: 'Location',
    location: null,
    openDaysFrom: '',
    openDaysTo: '',
    openHoursFrom: '',
    openHoursTo: '',
    isUpdate: false,
    reviews: '',
    addStadiumMessage: '',
    status: true,
  };

  componentWillMount() {
    if (this.props.navigation.state.params !== undefined){
      console.log(this.props.navigation.state.params);

      const { stadiumName, region, dist, location, price, openDaysFrom, openDaysTo, reviews } = this.props.navigation.state.params;

      this.setState({ stadiumName, region, dist, location, price, openDaysFrom, openDaysTo, reviews, isUpdate: true });
    }
  }

  locationCallBack = (dataFromChild) => {
    this.setState({ location: dataFromChild, locationText: 'Location set' });
  }

  resetFields() {
    this.setState({
      addStadiumLoading: false,
      addStadiumError: '',
      stadiumName: '',
      region: '',
      dist: '',
      price: '',
      location: null,
      openDaysFrom: '',
      openDaysTo: '',
      openHoursFrom: '',
      openHoursTo: ''
    });
  }

  addStadium() {
    this.setState({ addStadiumLoading: true });

    const {
      stadiumName,
      region,
      dist,
      price,
      location,
      openDaysFrom,
      openDaysTo,
      openHoursFrom,
      openHoursTo,
      reviews,
      status,
    } = this.state;

    const userId = firebase.auth().currentUser.uid;

    const stadiumKey = firebase.database().ref('/stadiums').push().key;

    const stadium = {
      userId,
      stadiumKey,
      stadiumName,
      region,
      dist,
      price,
      location,
      openDaysFrom,
      openDaysTo,
      openHoursFrom,
      openHoursTo,
      reviews,
      status
    };


    firebase.database().ref('/stadiums').child(stadiumKey).set(stadium)
    .then(() => {
      this.resetFields();
      this.setState({addStadiumLoading: false, addStadiumMessage: 'Successfully created!' });
    })
    .catch((e) => {
      this.setState({ addStadiumLoading: false, addStadiumError: e.message });
      console.log(e);
    });
  }

  updateStadium() {
    this.setState({ addStadiumLoading: true });

    const {
      stadiumName,
      region,
      dist,
      price,
      location,
      openDaysFrom,
      openDaysTo,
      openHoursFrom,
      openHoursTo,
      reviews
    } = this.state;

    const userId = firebase.auth().currentUser.uid;

    const stadiumKey = this.props.navigation.state.params.stadiumKey;

    const stadium = {
      userId,
      stadiumKey,
      stadiumName,
      region,
      dist,
      price,
      location,
      openDaysFrom,
      openDaysTo,
      openHoursFrom,
      openHoursTo,
      reviews,
    };

    firebase.database().ref('/stadiums').child(stadiumKey).set(stadium)
    .then(() => {
      this.setState({addStadiumLoading: false, addStadiumMessage: 'Successfully updated!' });

      // this.resetFields();
    })
    .catch((e) => {
      this.setState({ addStadiumLoading: false, addStadiumError: e.message });
      console.log(e);
    });
  }

  renderButtonOrSpinner() {
    if (this.state.addStadiumLoading) {
      return <Spinner />;
    }

    if (this.state.isUpdate){
      return (
        <Button onPress={this.updateStadium.bind(this)}>
        Update
        </Button>
      );
    } else {
      return (
        <Button onPress={this.addStadium.bind(this)}>
        Create
        </Button>
      );
    }
  }

  renderAddForm() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Stadium"
            placeholder="name"
            value={this.state.stadiumName}
            onChangeText={stadiumName => this.setState({ stadiumName })}
          />
        </CardSection>

        <CardSection>
          <View style={styles.containerStyle}>
            <Text style={styles.labelStyle}>Region</Text>

            <View style={styles.inputStyle}>
              <Picker
                selectedValue={this.state.region}
                onValueChange={(itemValue, itemIndex) => this.setState({ region: itemValue })}>

                <Picker.Item label="Select..." value="" />
                <Picker.Item label="Andijan" value="Andijan" />
                <Picker.Item label="Bukhara" value="Bukhara" />
                <Picker.Item label="Fergana" value="Fergana" />
                <Picker.Item label="Jizzakh" value="Jizzakh" />
                <Picker.Item label="Karakalpakstan" value="Karakalpakstan" />
                <Picker.Item label="Kashkadarya" value="Kashkadarya" />
                <Picker.Item label="Khorezm" value="Khorezm" />
                <Picker.Item label="Namangan" value="Namangan" />
                <Picker.Item label="Navoiy" value="Navoiy" />
                <Picker.Item label="Samarkand" value="Samarkand" />
                <Picker.Item label="Surkhandarya" value="Surkhandarya" />
                <Picker.Item label="Syrdarya" value="Syrdarya" />
                <Picker.Item label="Tashkent City" value="Tashkent City" />
                <Picker.Item label="Tashkent" value="Tashkent" />
              </Picker>
            </View>
          </View>
        </CardSection>

        <CardSection>
          <Input
            label="District"
            placeholder="Mirobod"
            value={this.state.dist}
            onChangeText={dist => this.setState({ dist })}
          />
        </CardSection>

        <CardSection>
          <Button
            onPress={() => {
              this.props.navigation.navigate(
                'BusinessMapScreen',
                { callBack: this.locationCallBack, location: this.state.location }
              );
            }}
          >
            {this.state.locationText}
          </Button>
        </CardSection>

        <CardSection>
          <Input
            label="Price p/h"
            placeholder="50,000"
            keyboardType="numeric"
            value={this.state.price}
            onChangeText={price => this.setState({ price })}
          />
        </CardSection>

        <CardSection>
          <View style={styles.containerStyle}>
            <Text style={styles.labelStyle}>Open from</Text>

            <View style={styles.inputStyle}>
              <Picker
                selectedValue={this.state.openDaysFrom}
                onValueChange={(itemValue, itemIndex) => this.setState({ openDaysFrom: itemValue })}>
                  <Picker.Item label="Select..." value="" />
                  <Picker.Item label="Monday" value="1" />
                  <Picker.Item label="Tuesday" value="2" />
                  <Picker.Item label="Wednsday" value="3" />
                  <Picker.Item label="Thursday" value="4" />
                  <Picker.Item label="Friday" value="5" />
                  <Picker.Item label="Saturday" value="6" />
                  <Picker.Item label="Sunday" value="8" />
                </Picker>
            </View>
          </View>
        </CardSection>

        <CardSection>
          <View style={styles.containerStyle}>
            <Text style={styles.labelStyle}>Open To</Text>

            <View style={styles.inputStyle}>
              <Picker
                selectedValue={this.state.openDaysTo}
                onValueChange={(itemValue, itemIndex) => this.setState({ openDaysTo: itemValue })}
              >
                <Picker.Item label="Select..." value="" />
                <Picker.Item label="Monday" value="1" />
                <Picker.Item label="Tuesday" value="2" />
                <Picker.Item label="Wednsday" value="3" />
                <Picker.Item label="Thursday" value="4" />
                <Picker.Item label="Friday" value="5" />
                <Picker.Item label="Saturday" value="6" />
                <Picker.Item label="Sunday" value="7" />
                </Picker>
            </View>
          </View>
        </CardSection>


        <Text style={styles.errorStyle}>
          {this.state.addStadiumError}
        </Text>

        <Text style={styles.messageStyle}>
          {this.state.addStadiumMessage}
        </Text>

        <CardSection>
          {this.renderButtonOrSpinner()}
        </CardSection>
      </Card>
    );
  }

  render() {
    return (
      <View>
        {this.renderAddForm()}
      </View>
    );
  }
}

const styles = {
  messageStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: Colors.green,
    marginLeft: 8,
    marginRight: 8
  },
  inputStyle: {
    paddingRight: 5,
    paddingLeft: 0,
    flex: 3
  },
  labelStyle: {
    paddingLeft: 20,
    fontSize: 20,
    flex: 2
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  pickerStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    // borderWidth: 2,
    // borderColor: '#007aff',
    marginLeft: 12,
    marginRight: 5
  },
  textInfoStyle: {
    fontSize: 20,
    alignSelf: 'center',
    marginLeft: 8,
    marginRight: 8
  },
    errorStyle: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'red',
      marginLeft: 8,
      marginRight: 8
    },
    textStyle: {
      alignSelf: 'center',
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
      paddingTop: 10,
      paddingBottom: 10
    },
    buttonStyleOn: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: '#007aff',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 8,
      borderColor: '#fff',
    },
    buttonStyleOff: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: '#007aff',
      alignItems: 'center',
      justifyContent: 'center',
    }
};

export default StadiumForm;
