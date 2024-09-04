import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import SignIn from './SignIn'; // Import the SignIn component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./TransactionTracker.css";

const TransactionTracker = () => {
    const [transactions, setTransactions] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        if (isAuthenticated) {
            fetchTransactions();
        }
    }, [isAuthenticated]);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/transactions', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setTransactions(response.data);
            toast.success('Transactions fetched successfully');
            console.log('Fetched transactions:', response.data);
        } catch (error) {
            toast.error('Error fetching transactions');
            console.error('Error fetching transactions:', error);
        }
    };

    const addTransaction = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/transactions', {
                description,
                amount,
                date,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            if (response.status === 201) {
                toast.success('Transaction successfully added');
                setDescription('');
                setAmount('');
                setDate('');
                fetchTransactions();
            } else {
                toast.error('Failed to add transaction');
                console.error('Failed to add transaction:', response.statusText);
            }
        } catch (error) {
            toast.error('Error while adding transaction');
            console.error('Error while adding transaction:', error);
        }
    };

    const deleteTransaction = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/transactions/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            if (response.status === 200) {
                toast.success('Transaction successfully deleted');
                fetchTransactions();
            } else {
                toast.error('Failed to delete transaction');
                console.error('Failed to delete transaction:', response.statusText);
            }
        } catch (error) {
            toast.error('Error while deleting transaction');
            console.error('Error while deleting transaction:', error);
        }
    };

    const deleteAllTransactions = async () => {
        try {
            const response = await axios.delete('http://localhost:4000/api/transactions', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            if (response.status === 200) {
                toast.success('All transactions successfully deleted');
                fetchTransactions();
            } else {
                toast.error('Failed to delete all transactions');
                console.error('Failed to delete all transactions:', response.statusText);
            }
        } catch (error) {
            toast.error('Error while deleting all transactions');
            console.error('Error while deleting all transactions:', error);
        }
    };

    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Transactions');

        worksheet.columns = [
            { header: 'Description', key: 'description', width: 30 },
            { header: 'Amount', key: 'amount', width: 15 },
            { header: 'Date', key: 'date', width: 25 }, // Updated width for better readability
        ];

        transactions.forEach((transaction) => {
            worksheet.addRow({
                description: transaction.description,
                amount: formatCurrency(transaction.amount),
                date: formatDate(transaction.date),
            });
        });

        try {
            const buffer = await workbook.xlsx.writeBuffer();
            saveAs(new Blob([buffer]), 'transactions.xlsx');
            toast.success('Exported to Excel successfully');
        } catch (error) {
            toast.error('Error exporting to Excel');
            console.error('Error exporting to Excel:', error);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' });
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from localStorage
        setIsAuthenticated(false); // Update the authentication state
        toast.success('Logged out successfully');
    };

    return (
        <div className='container'>
            {!isAuthenticated ? (
                <SignIn onSignIn={() => setIsAuthenticated(true)} />
            ) : (
                <>
                    <h1>Transaction Tracker✨</h1>
                    <button onClick={handleLogout}>Logout</button> {/* Logout button */}
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                    <button onClick={addTransaction}>Add Transaction</button>
                    <button onClick={exportToExcel}>Export to Excel</button>
                    <button onClick={deleteAllTransactions}>Delete All</button>
                    <ul>
                        {transactions.map((transaction) => (
                            <li key={transaction.id}>
                                {transaction.description}: {formatCurrency(transaction.amount)} on {formatDate(transaction.date)}
                                <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            <ToastContainer />
        </div>
    );
};

export default TransactionTracker;