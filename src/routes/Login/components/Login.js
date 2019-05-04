import React, { Component } from 'react';
import { Container, Content, Form, Header, Item, Input, Button, Text, Thumbnail, Spinner } from 'native-base';
import { Actions } from "react-native-router-flux";
import logo from '../../../assets/logo_fanpizza.png';
import styles from "./LoginStyles";
import Toast, {DURATION} from 'react-native-easy-toast';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            button: false
        }
    }
    nextInput(){
        this.secondTextInput._root.focus();
    }
    submitLogin(onLogin){
        const { email, password} = this.state;
        onLogin(email, password);
    }
  
    componentWillReceiveProps(newProps){
        if(this.props.loginError != newProps.loginError ){
            if(newProps.loginError.message)
                this.refs.toast_error.show(newProps.loginError.message,DURATION.LENGTH_LONG);
            this.setState({button: false})
        }
        if(this.props.businessInfo != newProps.businessInfo){
            Actions.execute('replace', "home", {businessInfo: this.props.businessInfo});
        }
        if(this.props.loginSuccess != newProps.loginSuccess){
            this.props.getUserStorage();
        }
    }
    componentDidMount(){
        this.props.getUserStorage();
    }
    render() {
        return (
            <Container>
                <Toast ref="toast_error"
                    style={{backgroundColor:'#696969'}}
                    fadeInDuration={2000}
                    fadeOutDuration={3000}
                    opacity={1}
                    textStyle={{color:'white'}}/>        
                <Content style={styles.container}>
                {
                    this.props.loginError && <Form style={styles.form}>
                        <Thumbnail style = {styles.thumbnail} square large source={logo} />
                        <Text style={styles.label}>Faça seu login</Text>
                        <Item style={styles.input}>
                            <Input
                                keyboardType = 'email-address'
                                placeholder="E-mail"
                                returnKeyType = { "next" }
                                onSubmitEditing={() => { this.nextInput(); }}
                                onChangeText = {text => this.setState({email: text})} 
                                value={this.state.email}
                                blurOnSubmit={false}/>
                        </Item>
                        <Item style={styles.input}  last>
                        <Input 
                            onChangeText = {text => this.setState({password: text})} 
                            placeholder="Senha"
                            secureTextEntry
                            value={this.state.password}
                            ref={(ref) => { this.secondTextInput = ref; }} />
                        </Item>
                        <Button disabled={this.state.button} style={styles.buttonLogin} onPress={ () => {this.submitLogin(this.props.onLogin), this.setState({button: true})} } success full>
                            {
                                !this.state.button && <Text> Entrar </Text> || <Spinner size="large" color="#FFF" />
                            }
                            
                        </Button>
                    </Form> || <Spinner size="large" color="#000" />
                }
                </Content>
            </Container>
        );
    }
}

export default Login;
