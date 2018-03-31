import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
  GenericStoreEnhancer,
  Store,
  StoreEnhancerStoreCreator,
  ReducersMapObject
} from "redux";
import sagaMiddlewareFactory from "redux-saga";
import { routerReducer, routerMiddleware } from "react-router-redux";
import * as StoreModule from "./store";
import { IApplicationState, reducers } from "./store";
import rootSaga from "#sagas"
import { History } from "history";

export default function configureStore(history: History, initialState?: IApplicationState) {
    const windowIfDefined = typeof window === "undefined" ? null : window as any;
    const devToolsExtension = windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__ as () => GenericStoreEnhancer;
    const sagaMiddleware = sagaMiddlewareFactory();

    const createStoreWithMiddleware: any = compose(
        applyMiddleware(sagaMiddleware, routerMiddleware(history)),
        devToolsExtension ? devToolsExtension() : <S>(next: StoreEnhancerStoreCreator<S>) => next
    )(createStore);

    const allReducers = buildRootReducer(reducers);
    const store = createStoreWithMiddleware(allReducers, initialState) as Store<IApplicationState>;

    sagaMiddleware.run(rootSaga);

    if (module.hot) {
        module.hot.accept("./store", () => {
            const nextRootReducer = require<typeof StoreModule>("./store");
            store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
        });
    }

    return store;
}

function buildRootReducer(allReducers: ReducersMapObject) {
    return combineReducers<IApplicationState>(Object.assign({}, allReducers, { routing: routerReducer }));
}
