const express = require('express');
const app = express();
const settingsController = require('../controllers/settings-controller');

app.get('/settings',settingsController.getSettingsPage);

module.exports = app;