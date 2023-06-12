import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import NewProduct from './components/NewProduct';
import AllProducts from './components/AllProducts';
import CartItem from './components/CartItem';
import Cart from './components/Cart';
import Success from './components/Success';
import { useContext } from 'react';
import { Store } from './Store';
import Cancle from './components/Cancle';
function App() {
 const {state,dispatch:cxtDispatch}=useContext(Store)
 const {isLogin,isAdmin}=state
  return (
    <BrowserRouter>
    <div className="App">
    <header>
    <Header/>
    </header>
    <main>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
   { isAdmin&&    <Route path="/newProduct" element={<NewProduct/>}/>  }
   {
     (isLogin)&&
     <Route path="/all-products" element={<AllProducts/>}/>
   } 
   {
    (isLogin)&&
    <Route path='/product/:id' element={<CartItem/>}/>

  }  {
    (isLogin)&&
    <Route path='/cart' element={<Cart/>}/>

   
  } 
    <Route path="/success" element={<Success/>}/>
    <Route path="/cancle" element={<Cancle/>}/>
    <Route/>
    </Routes>
    </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
