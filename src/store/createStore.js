import { createStore, applyMiddleware, compose }  from "redux"
import rootReducer from './reducers';
import trunk from "redux-thunk";
import { createLogger } from "redux-logger";

const log = createLogger({ diff: true, collapsed: true});

export default (inititalState = {}) => {
    const middleware = [trunk,log];

    const enhancers =[];

    const store = createStore(
        rootReducer(),
        inititalState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers
        )
    );
    return store;

}