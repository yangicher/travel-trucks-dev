import {lazy, Suspense} from 'react'
import {Route, Routes} from 'react-router-dom'

import "./App.css";
import Loader from "./components/Loader/Loader";

const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const Catalog = lazy(() => import('./pages/Catalog/CatalogPage'))
const DetailsPage = lazy(() => import("./pages/DetailsPage/DetailsPage"));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))
const Navigation = lazy(() => import("./components/Navigation/Navigation"));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<DetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Suspense>
  );
};

export default App;
