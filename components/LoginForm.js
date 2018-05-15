import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { Input, Button, Card, CardSection, Spinner } from './common';
import Colors from '../constants/Colors';

class LoginForm extends Component {

  state = { email: '',
    pass: '',
    errorRegister: '',
    errorLogin: '',
    loading: false,
    signUpForm: false,
    fullname: '',
    repass: ''
  };

  onLoginButtonPress() {
    const { email, pass, } = this.state;

    this.setState({ errorRegister: '', errorLogin: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, pass)
      .then(this.onLoginSuccess.bind(this))
      .catch(e => {
        this.onLoginFail(e);
      });
  }

  onRegisterButtonPress() {
    const { email, pass, } = this.state;

    this.setState({ errorRegister: '', errorLogin: '', loading: true });

    firebase.auth().createUserWithEmailAndPassword(email, pass)
      .then(this.onLoginSuccess.bind(this))
      .catch(e => {
        this.onRegisterFail(e);
      });
  }

  onLoginFail(error) {
    this.setState({ errorLogin: error.message, loading: false });
  }

  onRegisterFail(error) {
    this.setState({ errorRegister: error.message, loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      pass: '',
      loading: false,
      errorRegister: '',
      errorLogin: ''
    });
  }

  renderButtonOrSpinner() {
    if (this.state.loading) {
      return <Spinner />;
    }

    if (this.state.signUpForm) {
      return (
        <Button style={{backgroundColor: Colors.red}} onPress={this.onRegisterButtonPress.bind(this)}>
          Register
        </Button>
      );
    }

    return (
      <Button style={{backgroundColor: Colors.red}} onPress={this.onLoginButtonPress.bind(this)}>
        Log in
      </Button>
    );
  }

  renderContent() {
    if (this.state.signUpForm) {
      return (
        <View>
          <View style={{ flexDirection: 'row', height: 60, backgroundColor: Colors.red }}>
            <TouchableOpacity
              onPress={() => this.setState({ signUpForm: false })}
              style={styles.buttonStyleOff}
            >
              <Text style={styles.textStyle}>
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ signUpForm: true })}
              style={styles.buttonStyleOn}
            >
              <Text style={styles.textStyle}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {this.renderSignUpForm()}
        </View>
      );
    }

    return (
      <View>
          <View style={{ flexDirection: 'row', height: 60, backgroundColor: Colors.red }}>
            <TouchableOpacity
              onPress={() => this.setState({ signUpForm: false })}
              style={styles.buttonStyleOn}
            >
              <Text style={styles.textStyle}>
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ signUpForm: true })}
              style={styles.buttonStyleOff}
            >
              <Text style={styles.textStyle}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {this.renderSignInForm()}
      </View>
    );
  }

  renderSignInForm() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="example@email.com"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="Password"
            value={this.state.pass}
            onChangeText={pass => this.setState({ pass })}
          />
        </CardSection>

        <Text style={styles.errorStyle}>
          {this.state.errorLogin}
        </Text>

        <CardSection>
          {this.renderButtonOrSpinner()}
        </CardSection>
      </Card>
    );
  }

  renderSignUpForm() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Company name"
            placeholder="OZone Fitness"
            value={this.state.fullname}
            onChangeText={fullname => this.setState({ fullname })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Email"
            placeholder="example@email.com"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="Password"
            value={this.state.pass}
            onChangeText={pass => this.setState({ pass })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Re-Password"
            placeholder="Re-Password"
            value={this.state.repass}
            onChangeText={repass => this.setState({ repass })}
          />
        </CardSection>

        <Text style={styles.errorStyle}>
          {this.state.errorRegister}
        </Text>
        <CardSection>
          {this.renderButtonOrSpinner()}
        </CardSection>
      </Card>
    );
  }

  render() {
    return this.renderContent();
  }
}

const styles = {
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
      backgroundColor: Colors.red,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 8,
      borderColor: '#fff',
    },
    buttonStyleOff: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: Colors.red,
      alignItems: 'center',
      justifyContent: 'center',
    }
};

export default LoginForm;
