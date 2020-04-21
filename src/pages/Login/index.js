import React, {Component} from 'react';
import {
  Image,
  Text,
  View,
  TextInput,
  Alert,
  TouchableHighlight,
  Button,
  ActivityIndicator,
} from 'react-native';

import {styles} from './styles';

import auth from '@react-native-firebase/auth';
import {images} from '../../utils/images';

export default class Login extends Component {
  static navigationOptions = {
    title: 'Login',
    headerShown: false,
  };
  state = {email: '', password: '', showSpinner: false};

  clickLogin = async () => {
    this.setState({showSpinner: true});
    try {
      const isLogin = await auth().signInWithEmailAndPassword(
        this.state.email,
        this.state.password,
      );

      this.setState({showSpinner: false});
      if (isLogin.user) {
        this.props.navigation.navigate('Translate');
      }
    } catch (e) {
      this.setState({showSpinner: false});
      Alert.alert('Your E-mail or password incorrect.');
    }
  };

  render() {
    return (
      <View style={styles.containerStyle}>
        <Image style={styles.logo} source={images.loginImage} />
        <View style={styles.subContainerStyle}>
          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#333"
            style={styles.inputStyle}
            value={this.state.email}
            onChangeText={(givenText) => this.setState({email: givenText})}
          />
        </View>

        <View style={styles.subContainerStyle}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#333"
            secureTextEntry={true}
            style={styles.inputStyle}
            value={this.state.password}
            onChangeText={(givenText) => this.setState({password: givenText})}
          />
        </View>

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={this.clickLogin}>
          {this.state.showSpinner ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.loginText}>LOGIN</Text>
          )}
        </TouchableHighlight>
        <Button
          title="Sign Up"
          color="#ffffff"
          onPress={() => this.props.navigation.navigate('Register')}
        />
      </View>
    );
  }
}
