const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index',{layout: false});
});

app.post('/send', (req, res) => {
  
   let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_email',
        pass: 'your_password'
    }
  });

   let mailOptions = {
      from: req.body.from, 
      to: req.body.to, 
      subject: req.body.subject, 
      text: req.body.message, 
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      } else {
         console.log('Email sent: ' + info.response);
    }
    res.render('index', {layout: false});
  });
});

app.listen(3000, () => console.log('Server started...'));