import React from "react";
import { Actions, Scene } from "react-native-router-flux";
import HomeContainer from "./Home/containers/HomeContainer";
import LoginContainer from './Login/containers/LoginContainer';

const scenes = Actions.create(
    <Scene key = "root" hideNavBar>
        <Scene key = "home" component={HomeContainer} title ="Home" />
        <Scene key = "login" component={LoginContainer} title = "Login" initial/>
    </Scene>
);

export default scenes;
