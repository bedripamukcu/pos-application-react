import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart")).cartItems
        : [],
      total: localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart")).total
        : 0, //bütün itemları alcaz
        tax:20 //vergilendirme
    },
    reducers: {
        addProduct: (state,action) => { //burada state dediğimiz şey initialstateiçindeki her şey
            const findCartItem = state.cartItems.find(
                (item) => item._id === action.payload._id
                ) //bu kodun acıklaması: state'in içinde çok değer var.bize state.cartItems metodu içine find ile bak.tüm itemlerı gez. gezdigim itemıd ile tıkladıgım yani action.payload._id true ise sen bunu findCartItema at
            if (findCartItem) { //eğer varsa true ise quantitye 1 ekle
                findCartItem.quantity =findCartItem.quantity+1
            } else {
                state.cartItems.push(action.payload)
            }
            state.total += action.payload.price;
        },
        deleteCart: (state,action) => {
          state.cartItems = state.cartItems.filter((item) => item._id !== action.payload._id)
          state.total -= action.payload.price- action.payload.quantity //silme işlei
        },
        increase: (state,action) => {
            const cartItem = state.cartItems.find(
                (item) => item._id === action.payload._id
            );
            cartItem.quantity +=1 //bunun acıklaması cartItem.quantity=cartItem.quantity+1 demektir
            state.total += cartItem.price
        },
        decrease: (state,action) => {
            const cartItem = state.cartItems.find(
                (item) => item._id === action.payload._id
            );
            cartItem.quantity -=1 //bunun acıklaması cartItem.quantity=cartItem.quantity-1 demektir
            if (cartItem.quantity === 0) {
                state.cartItems = state.cartItems.filter (
                    (item) => item._id !== action.payload._id
                )
            }
            state.total -= cartItem.price
        },
        reset: (state) => {
            state.cartItems = [];
            state.total = 0;
          },
    },
})

export const {addProduct, deleteCart , increase, decrease,reset} = cartSlice.actions //burada addProduct export ederken carSlice içini alırız ve actions yazdığımız kısım reducerslardır.burada carslicedaki actionsı ifade eder
export default cartSlice.reducer