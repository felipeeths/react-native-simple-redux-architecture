import { connect } from "react-redux";

import Login from  "../components/Login";
import Home from  "../../Home/components/Home";

import { 
    onLogin,
    getUserStorage,
    
} from "../modules/login";


const mapStateToProps = (state) => ({
    ownerInfo: state.login.ownerInfo,
    loginError: state.login.loginError,
    loginSuccess: state.login.loginSuccess,
});

const mapActionCreators = {
    onLogin,
    getUserStorage,
};
export default connect(mapStateToProps, mapActionCreators)(Login, Home);
