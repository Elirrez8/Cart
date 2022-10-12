import React, { useState, useEffect, useContext } from 'react'
import { auth, db } from '../Config/Config'
import { CartContext } from '../Global/CartContext'
import { Navbar } from './Navbar';
import { useNavigate } from 'react-router-dom'

export const Cashout = (props) => {

    const navigate = useNavigate();

    const { shoppingCart, totalPrice, totalQty, dispatch } = useContext(CartContext);

    // defining state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('SignedUpUserData').doc(user.uid).onSnapshot(snapshot => {
                    setName(snapshot.data().name);
                    setEmail(snapshot.data().email);
                })
            }
            else {
                navigate('/login')
            }
        })
    })

    const cashoutSubmit = (e) => {
        e.preventDefault();
        auth.onAuthStateChanged(user => {
            if (user) {
                const date = new Date();
                const time = date.getTime();
                db.collection('Buyer-info ' + user.uid).doc('_' + time).set({
                    BuyerName: name,
                    BuyerEmail: email,
                    BuyerCell: cell,
                    BuyerAddress: address,
                    BuyerPayment: totalPrice,
                    BuyerQuantity: totalQty
                }).then(() => {
                    setCell('');
                    setAddress('');
                    dispatch({ type: 'VACIO' })
                    setSuccessMsg('Su orden se complete con exito. Gracias!');
                    setTimeout(() => {
                        navigate('/')
                    }, 3000)
                }).catch(err => setError(err.message))
            }
        })
    }

    return (
        <>
            <Navbar user={props.user} />
            <div className='container'>
                <br />
                <h2>Cashout Details</h2>
                <br />
                {successMsg && <div className='success-msg'>{successMsg}</div>}
                <form autoComplete="off" className='form-group' onSubmit={cashoutSubmit}>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" className='form-control' required
                        value={name} disabled />
                    <br />
                    <label htmlFor="email">Correo</label>
                    <input type="email" className='form-control' required
                        value={email} disabled />
                    <br />
                    <label htmlFor="Cell No">Numero de telefono</label>
                    <input type="number" className='form-control' required
                        onChange={(e) => setCell(e.target.value)} value={cell} placeholder='eg 03123456789' />
                    <br />
                    <label htmlFor="Delivery Address">Costo de envío</label>
                    <input type="text" className='form-control' required
                        onChange={(e) => setAddress(e.target.value)} value={address} />
                    <br />
                    <label htmlFor="Price To Pay">Precio a pagar</label>
                    <input type="number" className='form-control' required
                        value={totalPrice} disabled />
                    <br />
                    <label htmlFor="Total No of Products">Numero de productos</label>
                    <input type="number" className='form-control' required
                        value={totalQty} disabled />
                    <br />
                    <button type="submit" className='btn btn-success btn-md mybtn'>ENVIAR</button>
                </form>
                {error && <span className='error-msg'>{error}</span>}
            </div>
        </>
    )
}