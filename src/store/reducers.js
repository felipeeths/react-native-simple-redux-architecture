import { combineReducers } from "redux";
import { HomeReducer as home} from "../routes/Home/modules/home";
import { LoginReducer as login} from '../routes/Login/modules/login';

export const makeRootReducer = () => {
    return combineReducers({
        home,
        login
    });

}

export default makeRootReducer;
