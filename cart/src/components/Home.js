import React from 'react'
import '../css/Home.css'
import { Navbar } from './Navbar';
import { Products } from './Products';
import { auth } from '../Config/Config'

import { useNavigate } from 'react-router-dom'

export const Home = ({ user }) => {

    const navigate = useNavigate();

    useEffect(() => {
        // forcing user to signup
        auth.onAuthStateChanged(user => {
            if (!user) {
                navigate.push('/login');
            }
        })
    })

    return (
        <div className='wrapper'>
            <Navbar user={user} />
            <Products />
        </div>
    )
}
