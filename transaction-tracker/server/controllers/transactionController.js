const Transaction = require('../models/Transaction');

const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.getAll();
        res.json(transactions);
    } catch (err) {
        console.error('Error fetching transactions:', err);
        res.status(500).send('Internal Server Error');
    }
};

const createTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.create(req.body);
        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Transaction.delete(id);

        if (result) {
            res.status(200).json({ message: 'Transaction deleted successfully' });
        } else {
            res.status(404).json({ message: 'Transaction not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete transaction' });
    }
};
 

const deleteAllTransactions = async (req, res) => {
    try {
        await Transaction.deleteAll();
        res.status(200).json({ message: 'All transactions deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete transactions' });
    }
};

module.exports = { getTransactions, createTransaction, deleteTransaction, deleteAllTransactions };