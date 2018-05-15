// import
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

// import { Button } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';

// make
const HeaderWithButton = (props) => (
  // this.renderHeader();
  <View style={styles.viewStyle}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.textStyle} >{props.children}</Text>
    </View>
    <TouchableOpacity onPress={() => firebase.auth().signOut()} style={styles.helpLink}>
      <Text style={styles.helpLinkText}>Log out</Text>
    </TouchableOpacity>
  </View>
);

const styles = {
  textStyle: {
    fontSize: 24,
    color: '#fff',
  },
  viewStyle: {
    flexDirection: 'row',
    backgroundColor: '#007aff',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  helpLinkText: {
    fontSize: 20,
    paddingRight: 8,
    fontWeight: '900',
    color: '#004794',
  }
};
// export
export { HeaderWithButton };
