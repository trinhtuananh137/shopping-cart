import React from "react";
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, remove } from '../redux/cartSlice';


export default function Cart() {    
    const dispatch = useDispatch();
    const count = useSelector((state) => state.cart.cartItemsCount);
    const cost = useSelector((state) => state.cart.cost);

    const cartItems = useSelector((state) => state.cart.cartItems);

    return (
        <div>
            <h1>Cart</h1>
            <span>Items added: {count}</span>
            <br></br>
            <span>Cost: ${cost}</span>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price ($)</th>
                        <th>Amount</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item, i) => (
                        <tr key={i}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.amount}</td>
                            <td>
                                <button onClick={() => dispatch(decrement(item))} type="button" class="btn btn-warning">
                                    Decrease
                                </button>
                                <button onClick={() => dispatch(remove(item))} type="button" class="btn btn-danger">
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}