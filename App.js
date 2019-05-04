/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import createStore from "./src/store/createStore";
import AppContainer from "./src/AppContainer";
import {YellowBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

export default class App extends Component {
  componentDidMount(){
    SplashScreen.hide()
  }
  render() {
    const initialState = window.__INTITIAL_STATE__;
    YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);
    console.disableYellowBox = true;
    const store = createStore(initialState);

    return (
        <AppContainer store = {store} />
    );
  }
}