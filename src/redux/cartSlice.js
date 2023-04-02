import { createSlice } from '@reduxjs/toolkit';
import { useEffect, useState } from "react";

function itemIsInCart(item, cartItems) {
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === item.id) {
            return true;
        }
    }
    return false;
}

function getIndexOfItem(item, cartItems) {
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === item.id) {
            return i;
        }
    }
    return -1;
}

function calculateCost(cartItems){
    let cost = 0;
    for (let i = 0; i < cartItems.length; i++) {
        cost = cost + cartItems[i].amount*cartItems[i].price;
    }
    return cost;
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        cartItems: [],
        cartItemsCount: 0,
        cost:0,
    },
    reducers: {
        increment: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.cartItemsCount += 1;
            console.log(action.payload);

            if (itemIsInCart(action.payload, state.cartItems)) {
                let index = getIndexOfItem(action.payload, state.cartItems);
                if (index >= 0) {
                    state.cartItems[index].amount += 1;
                }
            }
            else {
                let cartItem = {
                    id: action.payload.id,
                    name: action.payload.name,
                    price: action.payload.price,
                    amount: 1
                }
                state.cartItems.push(cartItem);
            }

            state.cost = calculateCost(state.cartItems);
        },
        decrement: (state, action) => {
            state.cartItemsCount -= 1;
            if (itemIsInCart(action.payload, state.cartItems)) {
                let index = getIndexOfItem(action.payload, state.cartItems);
                if (index >= 0) {
                    state.cartItems[index].amount -= 1;
                    if (state.cartItems[index].amount === 0) {
                        state.cartItems.splice(index, 1);
                    }
                }
            }
            state.cost = calculateCost(state.cartItems);
        },
        remove: (state, action) => {
            let index = getIndexOfItem(action.payload, state.cartItems);
            if (index >= 0) {
                state.cartItemsCount -= state.cartItems[index].amount;
                state.cartItems.splice(index, 1);
            }
            state.cost = calculateCost(state.cartItems);
        }        
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, remove } = counterSlice.actions

export default counterSlice.reducer