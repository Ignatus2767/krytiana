const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  '906719392286-3aan741g5drsatvjjup644jvfi7jhrue.apps.googleusercontent.com',
  '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',
  'http://localhost'
);

// Generate the url that will be used for authorization
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: 'https://www.googleapis.com/auth/gmail.send',
});

console.log('Authorize this app by visiting this url:', authUrl);

// After user authorizes the app, Google will redirect to your redirect_uri with a code parameter
// You need to manually visit the URL and get the code parameter from the redirect URL

// Replace 'YOUR_AUTHORIZATION_CODE' with the code you get after authorization
const code = 'YOUR_AUTHORIZATION_CODE';

oauth2Client.getToken(code, (err, tokens) => {
  if (err) {
    console.error('Error getting oAuth tokens:', err);
    return;
  }
  console.log('Refresh Token:', tokens.refresh_token);
});
