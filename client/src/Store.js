import { createContext, useReducer } from "react";


export const Store=createContext();

const initialState={
    isLogin:localStorage.getItem("isLogin")?true:false,
    isAdmin:localStorage.getItem("isAdmin")?true:false,
    products:[],
        cart: {
          cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
          },        
}


const reducer=(state,action)=>{
    switch(action.type){
        case 'SET_PRODUCTS':
            return{
                ...state,
                products:action.payload
            }
        case 'ADD_ITEM':
            const newItem=action.payload;
            const existitem=state.cart.cartItems.find((x)=>x._id===newItem._id)
            const cartItems=existitem?state.cart.cartItems.map((item)=>item._id===existitem._id?newItem:item):[...state.cart.cartItems,newItem]
             return {
                ...state,
                cart:{
                    ...state.cart,
                    cartItems
                },
            }
        case 'REMOVE_ITEM':
            {
                const cartItems=state.cart.cartItems.filter((item)=>item._id!=action.payload._id)
                return {
                    ...state,
                    cart:{
                        ...state.cart,
                        cartItems
                    },
                }
            }
        case 'CART_CLEAR':
                return { ...state, cart: { ...state.cart, cartItems: [] } };
        case 'USER_LOGIN':
          return  {...state,isLogin:action.payload}
        case 'ADMIN_LOGIN':
            return  {...state,isAdmin:action.payload}
        case 'USER_LOGOUT':
            return {
                ...state,
                isLogin: false,
                cart: {
                  cartItems: [],
                },
              };  
       
        default:
            return state
    }
}

export function StoreProvider(props){
    const [state,dispatch]=useReducer(reducer,initialState);
    const value={state,dispatch}
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}