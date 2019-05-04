import React, {Component} from 'react';
import scenes from '../routes/scenes';
import { Provider } from "react-redux";
import{ Router } from "react-native-router-flux";

class AppContainer extends Component {
  render() {
    return (
        <Provider store={this.props.store}> 
            <Router scenes = {scenes} />
        </Provider>
    );
  }
}

export default AppContainer;
