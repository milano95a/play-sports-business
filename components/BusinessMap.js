import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import MapView from 'react-native-maps';

class BusinessMap extends React.Component {
  static navigationOptions = {
    title: 'Stadium Location',
  };

  state = {
    location: null
  }

  clickClient = ({ coordinate }, callBack) => {
    callBack(coordinate);
    this.setState({ location: coordinate });
  };

  makeMapMarker = (previousLocation, currentLocation) => {
    if (currentLocation != null) {
      return (
        <MapView.Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude
            }}
            title={'Stadium location'}
        />
      );
    } else if (previousLocation != null) {
      return (
        <MapView.Marker
            coordinate={{
              latitude: previousLocation.latitude,
              longitude: previousLocation.longitude
            }}
            title={'Stadium location'}
        />
      );
    } else {
      return (<Text />);
    }
  }

  makeMapButton = (previousLocation, currentLocation) => {
    if (previousLocation != null || currentLocation != null) {
      return (
        <View style={styles.buttonContainerStyle}>
          <Button
              title="Set this location"
              onPress={() => {
                this.props.navigation.goBack();
              }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.buttonContainerStyle}>
          <Button
              style={{ flex: 1 }}
              title="Tap on the map to set location"
              onPress={() => {
                this.setState({ location: { latitude: 41.296299, longitude: 69.268930 } });
              }} />
        </View>

      );
    }
  }

  render() {
    const { callBack, location } = this.props.navigation.state.params;

    const marker = this.makeMapMarker(location, this.state.location);
    // = this.state.location != null || location != null ? (
    //     <MapView.Marker
    //         coordinate={{
    //           latitude: this.state.location != null ? this.state.location.latitude : location.latitude,
    //           longitude: this.state.location != null ? this.state.location.longitude : location.longitude
    //         }}
    //         title={'Stadium location'}
    //     />
    //   ) : (<Text />);

    const button = this.makeMapButton(location, this.state.location);

    // this.state.location != null || location != null ? (
    //   <View style={styles.buttonContainerStyle}>
    //     <Button
    //         style={{ flex: 1 }}
    //         title="Set this location"
    //         onPress={() => {
    //           this.props.navigation.goBack();
    //         }} />
    //   </View>
    //   ) : (
    //   <View style={styles.buttonContainerStyle}>
    //     <Button
    //         style={{ flex: 1 }}
    //         title="Tap on the map to set location"
    //         onPress={() => {
    //           this.setState({ location: { latitude: 41.296299, longitude: 69.268930 } });
    //         }} />
    //   </View>
    // );

    if (this.state.location != null) {
      return (
          <View style={styles.container}>
            <MapView
                style={styles.map}
                onPress={e => { this.clickClient(e.nativeEvent, callBack); }}>
                {marker}
            </MapView>
            {button}
          </View>
        );
    } else if (location != null) {
      return (
          <View style={styles.container}>
            <MapView
              style={styles.map}
              region={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1
              }}
              onPress={e => { this.clickClient(e.nativeEvent, callBack); }}>
            {marker}
            </MapView>
            {button}
          </View>
        );
    } else {
      return (
        <View style={styles.container}>
          <MapView
              style={styles.map}
              region={{
                latitude: 41.296299,
                longitude: 69.268930,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
              }}
              onPress={e => { this.clickClient(e.nativeEvent, callBack); }}
          />
          {button}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },

  buttonContainerStyle: {
    width: 320,
    marginBottom: 10,
  }
});

export default BusinessMap;
