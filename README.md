# Transaction Tracker

A full-stack daily allowance/transaction tracker app built using the PERN stack (PostgreSQL, Express, React, Node.js) with an MVC structure.

## Features

- Track daily transactions with description, amount, and date
- View a list of all recorded transactions
- Export transaction data to an Excel file

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - PostgreSQL
  - pg (PostgreSQL client library)
- **Frontend**:
  - React
  - Axios (for making HTTP requests)
  - ExcelJS (for exporting data to Excel)
- **Other**:
  - dotenv (for managing environment variables)
  - cors (for enabling CORS with various options)
  - body-parser (for parsing incoming request bodies in JSON format)
 
 ## Demo viedos - https://drive.google.com/drive/folders/1XZe1JNuSuHigPEqxpWSgJ0Cg0FhVrXxT?usp=share_link

## Getting Started

### Prerequisites

- Node.js installed on your machine
- PostgreSQL database set up and running

### Installation

**Clone the repository**:

   ```bash
   git clone https://github.com/your-username/transaction-tracker.git

Install dependencies:
bash
cd transaction-tracker
npm install
cd client
npm install

Set up environment variables:

Create a .env file in the server directory.

Add the following variables:

text
DATABASE_URL=postgres://username:password@localhost:5432/transaction_tracker
PORT=4000

Replace username, password, and transaction_tracker with your actual PostgreSQL credentials and database name.

Create the transactions table in your PostgreSQL database:
sql
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    amount NUMERIC NOT NULL,
    date DATE NOT NULL
);

Start the backend server:
bash
cd server
node index.js

Start the frontend development server:
bash
cd client
npm start

The application will be available at http://localhost:4000.

Usage

Use the following credentials to sign in:
Username: omkar
Password: omkar1234
Add a new transaction: Enter the description, amount, and date in the input fields and click "Add Transaction".
View transactions: The list of recorded transactions will be displayed below the input fields.
Export to Excel: Click the "Export to Excel" button to download the transaction data as an Excel file.

Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

License

This project is licensed under the MIT License.

Acknowledgments

PostgreSQL documentation
Express.js documentation
React documentation
ExcelJS documentation
