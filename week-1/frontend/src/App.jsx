import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Toaster} from "react-hot-toast"
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Quotes from './pages/Quotes';
import Favourites from './pages/Favourites';
import NotFound from './pages/NotFound';
import MainLayout from './components/MainLayout';
import AuthLayout from './components/AuthLayout';
import Verfication from './pages/Verfication';

function App() {
  return (
    <BrowserRouter>
          <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verification" element={<Verfication />} />
        </Route>
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="quotes" element={<Quotes />} />
          <Route path="favourites" element={<Favourites />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
