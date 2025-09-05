import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import 'modern-normalize'

import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import App from './App.jsx'
import {persistor, store} from './redux/store.js'


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App/>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </StrictMode>
)
