const express = require('express');
const ldap = require('ldapjs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Settings
const LDAP_URL = 'ldap://your-school-ldap-server';  // <-- Replace with your real LDAP server
const DOMAIN = '@eq.edu.au';                        // Standard for BNE schools

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve login page (GET /)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));  // Serve login.html
});

// Handle login (POST /login)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const userPrincipalName = `${username}${DOMAIN}`;

    const client = ldap.createClient({ url: LDAP_URL });

    client.bind(userPrincipalName, password, (err) => {
        if (err) {
            console.log('Login failed:', err);
            res.redirect('/?error=1');
        } else {
            console.log('Login successful!');
            res.send(`<h1>Welcome, ${username}!</h1><p>Login successful!</p>`);
            client.unbind();
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
