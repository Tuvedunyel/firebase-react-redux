import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./reducers";

const store = createStore(
    rootReducer,
    composeWithDevTools( applyMiddleware( thunk ) )
)

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
    <React.StrictMode>
        <Provider store={ store }>
            <App/>
        </Provider>
    </React.StrictMode>
)
