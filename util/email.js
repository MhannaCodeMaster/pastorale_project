const {google} = require('googleapis'); 
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const db = require('../util/database');
const crypto = require('crypto'); 
const CLIENT_ID = '89862584477-8rcrsk7glpakfump0r5nf8do6p3mmrkk.apps.googleusercontent.com';
const CLIENT_SECRET= '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN= '1//04U3Ita04LPjHCgYIARAAGAQSNwF-L9IruLAruuEDwDm29SEEBLul3BR26vQ5HLd4zKthwosQ_TtRt8rt4hokSxL-rBUxc-I7kv8';

function generateToken(length) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        const token = buffer.toString('hex');
        resolve(token);
      }
    });
  });
}

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN
});

const sendFrogotPassEmail = (email) => {
    oAuth2Client.getAccessToken()
      .then(accessToken => {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: 'anthonymhanna8@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken,
          },
          tls: {
            rejectUnauthorized: false
          }
        });
  
        generateToken(32)
        .then((generatedToken)=>{
          bcrypt.hash(generatedToken, 12)
          .then((hashedToken)=>{
            return db.execute('UPDATE users SET token = ? AND token_expiration = CUREDATE() WHERE user_email = ?',[hashedToken,email]);
          })
          .then(()=>{
            const resetPasswordLink = 'localhost:3000/forgotpass/reset?token='+generatedToken;
            const mailOptions = {
              from: 'anthonymhanna8@gmail.com',
              to: email,
              subject: 'Reset Password',
              text: 'Please click the following link to reset your password: ' + resetPasswordLink
            };
            return transporter.sendMail(mailOptions);
          })
          .catch(err=>{
            console.log('mail error:',err);
          });
        })
        .catch(error => {
        console.error('Error getting access token:', error);
      });
    })
}


module.exports = sendFrogotPassEmail;