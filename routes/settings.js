const express = require('express');
const app = express();
const settingsController = require('../controllers/settings-controller');

app.get('/settings',settingsController.getSettingsPage);
app.post('/settings/change-username', settingsController.changeUsername);
app.post('/settings/change-password', settingsController.changePassword);
app.post('/settings/create-user', settingsController.createNewUser);
app.post('/settings/create-member', settingsController.createNewUser);
app.post('/settings/delete-user', settingsController.deleteUser);

module.exports = app;