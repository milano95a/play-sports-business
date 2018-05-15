import React from 'react';
import { ScrollView, StyleSheet, Text, View, DatePickerAndroid, TextInput, TouchableHighlight } from 'react-native';
import firebase from 'firebase';
import { List, ListItem } from 'react-native-elements';
import { Card, CardSection, Button, Spinner } from './../components/common';
import Colors from '../constants/Colors';

export default class StadiumDetailScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.stadium.stadiumName}`,
  });

  state = {
    stadium: false,
    price: this.props.navigation.state.params.stadium.price,
    stadiumKey: this.props.navigation.state.params.stadium.stadiumKey,
    date: 'Pick date',
    addBookError: '',
    addBookLoading: false,
    hourFrom: '',
    time: '',
    reviews: [],
    lorem: '',
    dataSource: [],
    map: false,
    review: '',
  };

  componentWillMount() {
    this.setState({ownerId: firebase.auth().currentUser.uid});
    // console.log(this.state);
    //
    // firebase.database().ref('/stadiums/' + this.state.stadiumKey + '/reviews').once('value', (snapshot) => {
    //   snapshot.forEach((s2) => {
    //     // let found = false;
    //     // let newlist = this.state.stadiums;
    //
    //     this.setState({ reviews: [...this.state.reviews, s2.val()] });
    //     // for (let i = 0; i < newlist.length; i++) {
    //     //     if (newlist[i].stadiumKey === s2.key) {
    //     //         newlist[i] = s2.val();
    //     //         found = true;
    //     //         break;
    //     //     }
    //     // }
    //     //
    //     // if (found) {
    //     //   this.setState({ stadiums: [...newlist] });
    //     // } else {
    //     // }
    //   });
    // }, (e) => {
    //   console.log(e);
    // });
  }

  // componentWillMount() {
  //   console.log(this.state);
  //
  //   this.setState({ status: this.props.navigation.state.params.stadium.status });
  //
  //   firebase.database().ref(`/stadiums/${this.state.stadiumKey}/reviews`).on('value', (snapshot) => {
  //     snapshot.forEach((s2) => {
  //       console.log('in');
  //       console.log(this.state);
  //       this.setState({ reviews: [...this.state.reviews, s2.val()] });
  //
  //       // this.setState({ reviews: [...this.state.reviews, s2.val()] });
  //     });
  //   }, (e) => {
  //     console.log(e);
  //   });
  // }

  resetFields() {
    this.setState({
      review: ''
    });
  }

  addReview() {
    // this.setState({ addBookLoading: true });
    const reviewRef = firebase.database().ref(`/stadiums/${this.state.stadiumKey}/reviews/`);
    const reviewId = reviewRef.push().key;
    const reviewer = firebase.auth().currentUser.displayName == null ? 'Owner' : firebase.auth().currentUser.displayName;

    const review = {
      review: this.state.review,
      reviewer,
      reviewId
    };

    reviewRef.child(reviewId).set(review)
    .then(() => {
      this.resetFields();
      // this.setState({ addBookLoading: false, addBookMessage: 'Thank you for booking with us!' });
    })
    .catch((e) => {
      this.setState({ addBookLoading: false, addBookError: e.message });
      console.log(e);
    });
  }

  renderButtonOrSpinner() {
    if (this.state.addBookLoading) {
      return <Spinner />;
    }

    return (
      <Button onPress={this.addBook.bind(this)}>
        Book
      </Button>
    );
  }

  renderReviewList(){
    // console.log(this.state.reviews);
    // const reviews = this.props.navigation.state.params.stadium.reviews;
    console.log();

    const obj = this.props.navigation.state.params.stadium.reviews;
    const reviews = Object.values(obj);

    let reviewsList = this.state.reviews === undefined
    ? (null)
    : reviews.map((r, i) => (
        <ListItem
          chevronColor={Colors.white}
          key={i}
          avatarStyle={{backgroundColor: 'white'}}
          title={`Response from ${r.reviewer}`}
          subtitle={
            <View style={styles.subtitleView}>
              <Text style={styles.ratingText}>{`${r.review}`}</Text>
            </View>
          }
          avatar={require('./../assets/icon.png')}
          component={TouchableHighlight}
        />
      ));

      return (
        <Card>
          <CardSection>
            <Text style={styles.reviewStyle}>Reviews</Text>
          </CardSection>

          <View style={{flex: 1, flexDirection: 'row', paddingLeft: 10, paddingRight: 5, paddingTop: 10}}>
            <TextInput
              multiline
              placeholder="Your response..."
              style={styles.inputStyle}
              value={this.state.review}
              onChangeText={review => this.setState({review})}
              underlineColorAndroid={'transparent'}
              autoCorrect={false}
            />
            <Button style={{height: 54}} onPress={this.addReview.bind(this)}>
              Post
            </Button>
          </View>

          <List >
            {reviewsList}
          </List>
        </Card>
      );
  }

  updateStadium(status) {
    // this.setState({ addStadiumLoading: true });

    const stadiumKey = this.props.navigation.state.params.stadium.stadiumKey;
    console.log('stadiumKey');
    console.log(stadiumKey);

    firebase.database().ref('/stadiums/' + stadiumKey + '/status').set(status)
    .then(() => {
      this.setState({addStadiumLoading: false, status });

      // this.resetFields();
    })
    .catch((e) => {
      this.setState({ addStadiumLoading: false, addStadiumError: e.message });
      console.log(e);
    });
  }

  renderStatusButton(){
    if (this.state.status){
      return (
        <Button
          style={{height: 54, backgroundColor: Colors.red}}
          onPress={() => {
            this.updateStadium(false);
          }}>
          Close
        </Button>
      );
    } else {
      return (
        <Button
          style={{height: 54, backgroundColor: Colors.green}}
          onPress={() => {
            this.updateStadium(true);
          }}>
          Open
        </Button>
      );
    }
  }

  render(){
    const { stadiumName, dist, price } = this.props.navigation.state.params.stadium;
    const list = this.renderReviewList();
    const statusButton = this.renderStatusButton();
    console.log('status');
    console.log(this.state.status);

    const statusText = this.state.status === true ? 'Open' : 'Closed';

    return (
      <View style={styles.container}>
        <ScrollView >
          <Card>
            <CardSection>
              <View style={styles.headerContentStyle}>
                <Text style={styles.TextStyle}>Name: </Text>
                <Text style={styles.headerTextStyle}>{stadiumName}</Text>
              </View>
            </CardSection>

            <CardSection>
              <View style={styles.headerContentStyle}>
                <Text style={styles.TextStyle}>Price: </Text>
                <Text style={styles.headerTextStyle}>{price}</Text>
              </View>
            </CardSection>

            <CardSection>
              <View style={styles.headerContentStyle}>
                <Text style={styles.TextStyle}>Location: </Text>
                <Text style={styles.headerTextStyle}>{dist}</Text>
              </View>
            </CardSection>

            <CardSection>
              <Button
                style={{height: 54}}
                onPress={() => {
                  this.props.navigation.navigate(
                    'EditScreen',
                    this.props.navigation.state.params.stadium
                  );
                }}>
                Edit
              </Button>
            </CardSection>

            <CardSection>
              <View style={styles.headerContentStyle}>
                <Text style={styles.TextStyle}>Status: </Text>
                <Text style={styles.headerTextStyle}>{statusText}</Text>
              </View>
            </CardSection>

            <CardSection>
              {statusButton}
            </CardSection>

          </Card>

          {list}

        </ScrollView>
      </View>
    );

    // return this.renderReviewList();
  }

}

const styles = StyleSheet.create({
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 3
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContentStyle: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },
  headerTextStyle: {
    flex: 2,
    marginRight: 10,
    fontSize: 18
  },
  reviewStyle: {
    flex: 1,
    color: '#999',
    margin: 10,
    fontWeight: 'bold',
    fontSize: 18
  },
  TextStyle: {
    flex: 1,
    color: '#999',
    marginRight: 10,
    fontSize: 18
  },
  errorStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
    marginLeft: 8,
    marginRight: 8
  },
  messageStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: Colors.green,
    marginLeft: 8,
    marginRight: 8
  },
  pickerStyle: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: '#fff',
      // borderWidth: 2,
      // borderColor: '#007aff',
      marginLeft: 5,
      marginRight: 5
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
