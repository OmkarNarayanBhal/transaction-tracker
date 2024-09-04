const express = require('express');
 

const { getTransactions, createTransaction, deleteTransaction, deleteAllTransactions } = require('../controllers/transactionController');
const router = express.Router();
 

router.get('/', getTransactions); // Changed from '/api/transactions' to '/'
router.post('/', createTransaction); // Changed from '/api/transactions' to '/'
router.delete('/:id', deleteTransaction);
router.delete('/', deleteAllTransactions);
module.exports = router;