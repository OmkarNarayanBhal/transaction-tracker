// src/components/SignIn.js
import React, { useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode'; // default import
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = ({ onSignIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/auth', { username, password });

            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('token', token);
                const decodedToken = jwtDecode(token);
                onSignIn(decodedToken);
                toast.success('Sign in successful');
            } else {
                toast.error('Invalid credentials');
            }
        } catch (error) {
            toast.error('Error during sign in');
            console.error('Error during sign in:', error);
        }
    };

    return (
        <div>
            <h2>Sign In👇</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input className='ps'
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignIn}>Sign In</button>
            <ToastContainer />
        </div>
    );
};

export default SignIn;