const express = require('express');
const { createObjectCsvWriter } = require('csv-writer');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// CSV writer setup
const csvWriter = createObjectCsvWriter({
    path: 'registrations.csv',
    header: [
        { id: 'name', title: 'Name' },
        { id: 'email', title: 'Email' },
        { id: 'password', title: 'Password' }
    ],
    append: true // Append to file instead of overwriting
});

// Handle form submission
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Store data in CSV file
    csvWriter.writeRecords([{ name, email, password }])
        .then(() => {
            console.log('Data saved to CSV');
            res.send('Registration successful');
        })
        .catch((err) => {
            console.error('Error writing to CSV:', err);
            res.status(500).send('Error saving registration');
        });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
