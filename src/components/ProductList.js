import React from "react";
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../redux/cartSlice';

export default function ProductList() {

    const [data, getData] = useState([]);
    const URL = "http://localhost:3001/items";

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = () => {
        fetch(URL)
            .then((res) => res.json())

            .then((response) => {
                console.log(response);                     
                getData(response);
            });
    };

    const dispatch = useDispatch();
    const count = useSelector((state) => state.cart.cartItemsCount)

    return (
        <div>
            <h1>Store</h1>
            <span>Items added to cart: {count}</span>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price ($)</th>
                        <th>Add</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr key={i}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>
                                <button onClick={() => dispatch(increment(item))} type="button" class="btn btn-primary">
                                    Add
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}