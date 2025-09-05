import {lazy, Suspense, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {fetchCampers} from "./redux/campersOps"
import {Route, Routes} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import ClipLoader from "react-spinners/ClipLoader"; 

import './App.css'

const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const Catalog = lazy(() => import('./pages/Catalog/Catalog'))
const CamperPage = lazy(() => import('./pages/CamperPage/CamperPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))

const Header = lazy(() => import('./components/Header/Header'))

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCampers(false))
    }, [dispatch])

    return (
        <Suspense fallback={<ClipLoader/>}>
            <Header/>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/catalog' element={<Catalog/>}/>
                <Route path='/catalog/:id' element={<CamperPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
            <Toaster position='top-center' toastOptions={{duration: 1750, style: {color: "red"}}}/>
        </Suspense>
    )
}

export default App
