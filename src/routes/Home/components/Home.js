import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Container,Content, List, ListItem, Spinner, Header, Text, Left, Body, Right, Thumbnail, Title } from 'native-base';
import { Actions } from "react-native-router-flux";
import {returnDateString, returnReal, returnOrderType } from "../../../utils/functions"
import firebase from 'react-native-firebase';

class Home extends Component {
    new_order = "";
    constructor(props) {
        super(props)
        this.state = {
            pairedDs:[],
            boundAddress: '',
            name: "",
        }
    }
    

    async createNotificationListeners(){
        
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            let not_title = "Novo pedido no valor de R$ " + returnReal(notification.data.order_total) + "!";
            let not_body = returnOrderType(notification.data.type_order);
            this.props.getOrders()
            this.new_order = notification.data.order_id;
        
            const localNotification = new firebase.notifications.Notification({
                sound: 'sampleaudio',
                show_in_foreground: true,
            })
            .setNotificationId(notification.notificationId)
            .setTitle(not_title)
            .setBody(not_body)
            .android.setChannelId('fcm_default_channel') // e.g. the id you chose above
            .android.setSmallIcon('@mipmap/ic_stat_icon_logo_fan_pizza') // create this icon in Android Studio
            .android.setLargeIcon('@mipmap/ic_launcher') // create this icon in Android Studio
            .android.setPriority(firebase.notifications.Android.Priority.High)
            .android.setVibrate(500)
            .android.setAutoCancel(true);

            firebase.notifications()
            .displayNotification(localNotification)
            .catch(err => console.error(err));
        });
        
        const channel = new firebase.notifications.Android.Channel('fcm_default_channel', 'Demo app name', firebase.notifications.Android.Importance.High)
            .setDescription('Demo app description')
            .setSound('sampleaudio.mp3');

        firebase.notifications().android.createChannel(channel);

        //background
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) =>{
            const {title, body, order_id} = notificationOpen.notification;
            console.log("Opened")

            this.props.orders.map((element) => {
                if(element.id == click){
                    Actions.order({order: element})
                }
            })

        })

        const notificationOpen = await firebase.notifications().getInitialNotification();
        if(notificationOpen){
            const { title } = notificationOpen.notification;

        }

        this.messageListener = firebase.messaging().onMessage((message) =>{
            console.log(JSON.stringify(message));
        })
    }
    async checkPermission(updateFm_token){
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken(updateFm_token);
        } else {
            this.requestPermission();
        } 
    }
    async getToken(updateFm_token) {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                await AsyncStorage.setItem('fcmToken', fcmToken);
                updateFm_token(fcmToken)
            }
        }
    }
    async requestPermission(){
        try{
            await firebase.messaging().requestPermission();
            this.getToken();
        }catch (error){
            console.log("rejeitado");
        }
    }
    componentDidMount(){
        this.checkPermission(this.props.updateFm_token);
        this.createNotificationListeners();
    }
    componentWillMount(){
        this.props.getOrders()
    }
    componentWillUnmount(){
        this.notificationListener;
        this.notificationOpenedListener;
    }
    componentDidUpdate(prevProps, prevState){
       
    }

    render() {
        const { logo_url, business_name } = this.props.businessInfo || ""
        return (
            
            <Container>              
                <Header iosBarStyle="light-content" style={{backgroundColor: "#fff"}} androidStatusBarColor="#000">
                <Left>
                    <Thumbnail round style={{resizeMode: "contain", width: 50, height: 50}} large source={{uri: logo_url}} />
                </Left>
                <Body>
                    <Title style={{paddingLeft: 25, color:"#000"}}>{business_name}</Title>
                </Body>
                {/* <Right>
                    <Button transparent onPress={() =>  Actions.settings()}>
                    <Icon name='settings' />
                    </Button>
                </Right> */}
              
                </Header>
                {
                    this.props.orders && 
                    <Content>
                        <List>
                        
                        </List>
                   
                    </Content> || <Spinner size="large" color="#0000ff" />
                }
            </Container>
        );
    }
}

export default Home;
