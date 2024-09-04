import React from 'react';
import TransactionTracker from './components/TransactionTracker';

function App() {
    return (
        <div className="App">
            <h2>Note- As it is made for an indivisual/single person so the user registaion page is not added for this,<br></br> i just set a defult user which UserName= omkar, password= omkar1234</h2>
            <TransactionTracker />
        </div>
    );
}

export default App;