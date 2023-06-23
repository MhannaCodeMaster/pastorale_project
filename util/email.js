const {google} = require('googleapis'); 
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const db = require('../util/database');
const crypto = require('crypto'); 
const { resolve } = require('path');
const CLIENT_ID = '89862584477-8rcrsk7glpakfump0r5nf8do6p3mmrkk.apps.googleusercontent.com';
const CLIENT_SECRET= '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN= '1//04zOUG8dZY8f1CgYIARAAGAQSNwF-L9Ir6y-ifsDODQ2or897S2bxSSpY0heHf3xcjdxvPivRZGostHOSXon4bdrX5R899rRhZQA';

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

const sendForgotPassEmail = (user_id, email, res) => {
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
        .then((generatedToken) => {
          bcrypt.hash(generatedToken, 12)
            .then((hashedToken) => {
              // Set token expiration to 24 hours from now
              const tokenExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000);
              return db.execute('UPDATE users SET token = ?, token_expiration = ? WHERE user_email = ?', [hashedToken, tokenExpiration, email]);
            })
            .catch(err=>{
              console.log('generate token error:', err);
              res.redirect('/login?err=forgotPass&msg=Something went wrong!Try again');
            })
            .then(() => {
              const resetPasswordLink = 'http://localhost:3000/forgot-password/reset?userid='+user_id+'&token=' + generatedToken;
              const mailOptions = {
                from: 'anthonymhanna8@gmail.com',
                to: email,
                subject: 'Reset Password',
                html: `<p>Please click <a href="${resetPasswordLink}">here</a> to reset your password.</p>
                <p>If the link above doesn't work, you can copy and paste the following URL into your browser:</p>
                <p>${resetPasswordLink}</p>`
              };
              return transporter.sendMail(mailOptions);
            })
            .catch(err=>{
              console.log('Update token error:', err);
              res.redirect('/login?err=forgotPass&msg=Something went wrong!');
            })
            .then((result) => {
              //console.log('Email sent:', result);
              res.redirect('/login?success=true&msg=link has been sent');
            })
            .catch(err => {
              console.log('Mail error:', err);
              res.redirect('/login?err=forgotPass&msg=Something went wrong!');
            });
        })
        .catch(error => {
          console.error('Error generating token:', error);
          res.redirect('/login?err=forgotPass&msg=Something went wrong!Pls Try again.');
        });
    })
    .catch(error => {
      console.error('Error getting access token:', error);
      res.redirect('/login?err=forgotPass&msg=Something went wrong! Pls Try again.');
    });
}


module.exports = sendForgotPassEmail;