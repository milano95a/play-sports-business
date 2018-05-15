import React from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Button } from './common';

const StadiumDetail = ({ stadium }) => {
  const { stadiumName, dist, price } = stadium;
  const {
    // thumbnailStyle,
    headerContentStyle,
    // thumbnailContainerStyle,
    headerTextStyle
  } = styles;

  return (
    <Card>
      <CardSection>
        {/* <View style={thumbnailContainerStyle}>
          <Image style={thumbnailStyle} source={require('./../assets/images/photo.png')} />
        </View> */}
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{stadiumName}</Text>
          
        </View>
      </CardSection>
      <CardSection>
        <Button style={{ backgroundColor: '#31C453' }}>Open</Button>
        <Button style={{ backgroundColor: '#D93C48' }}>Close</Button>
      </CardSection>
    </Card>
  );
};

const styles = {
  headerContentStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 20,

  },
  thumbnailStyle: {
    height: 64,
    width: 64
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};

export default StadiumDetail;
