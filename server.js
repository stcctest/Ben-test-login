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

// Serve login
