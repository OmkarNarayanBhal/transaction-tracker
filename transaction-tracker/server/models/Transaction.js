const { Pool } = require('pg');
require('dotenv').config();
console.log('Database URL:', process.env.DATABASE_URL);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const Transaction = {
    getAll: async () => {
        const res = await pool.query('SELECT * FROM transactions');
        return res.rows;
    },
    create: async (transaction) => {
        const { description, amount, date } = transaction;
        const res = await pool.query(
            'INSERT INTO transactions (description, amount, date) VALUES ($1, $2, $3) RETURNING *',
            [description, amount, date]
        );
        return res.rows[0];
    },
    delete: async (id) => {
        const result = await pool.query('DELETE FROM transactions WHERE id = $1 RETURNING *', [id]);
        return result.rowCount > 0;
    },
    deleteAll: async () => {
        await pool.query('DELETE FROM transactions');
    },
};

module.exports = Transaction;