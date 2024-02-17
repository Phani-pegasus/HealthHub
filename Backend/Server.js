const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors=require('cors');
const app = express();
const PORT = 3001;
const Nodemailer=require('nodemailer');
const jwt=require('jsonwebtoken');
const crypto=require('crypto');
const session=require('express-session');
app.use(bodyParser.json());
app.use(cors())
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/HealthHub', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB schema and model
const userSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Password: String,
  Confirmpassword: String,
  Mobile: String,

});

const User = mongoose.model('User', userSchema,'users');

// API endpoint for user registration
app.post('/User', async (req, res) => {
  const { Name, Email, Password, Confirmpassword, Mobile,  } = req.body;
  console.log(req.body);
  // Validate data (you can add more validation as needed)

  // Create a new user document
  const newUser = new User({
    Name,
    Email,
    Password,
    Confirmpassword,
    Mobile,

  });

  try {
    // Save the user to the MongoDB collection
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/User', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const HospitalSchema = new mongoose.Schema({
  Docname:String,
  Email:String,
  Hosname:String,
  Hosadd:String,
  Hoscity:String,
  Password:String,
  Confirmpassword:String,
  Mobile:String,


});

const Hospital = mongoose.model('HealthHub',HospitalSchema,'Hospital');

app.post('/Hospital', async (req, res) => {
  const { Docname,Email,Hosname,Hosadd,Hoscity,Password,Confirmpassword,Mobile } = req.body;
  console.log(req.body);
  // Validate data (you can add more validation as needed)

  // Create a new user document
  const newhosUser = new Hospital({
    Docname,
    Email,
    Hosname,
    Hosadd,
    Hoscity,
    Password,
    Confirmpassword,
    Mobile,

  });

  try {
    // Save the user to the MongoDB collection
    await newhosUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/Hospital', async (req, res) => {
  try {
    const users = await Hospital.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

let keyForUser; // Declare a variable to store the key
let emailForUser;
app.post('/userforgot', async (req, res) => {
  const key = Math.random().toString().substr(2, 6);
  keyForUser = key; // Save the key for later use
  const { Email } = req.body;
  emailForUser=Email;

  try {
    const user = await User.findOne({ Email: Email });

    if (!user) {
      return res.json({ message: "User not existed" });
    }

    const token = jwt.sign({ id: user._id }, key, { expiresIn: '10m' }); // Set the expiration time to 10 minutes

    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'email',
        pass: 'pass',
      },
    });

    var mailOptions = {
      from: 'email',
      to: Email,
      subject: 'Reset your Password',
      text: `Your OTP for reset password is ${key}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.json({ message: "Successfully sent", email1: Email, key });
      }
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/userresetpassword', async (req, res) => {
  const { otp, Password, Confirmpassword } = req.body;
  console.log(emailForUser),keyForUser;

  try {
    // Retrieve the user based on the stored email and OTP
    const user = await User.findOne({ Email: emailForUser });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if password and confirmPassword match
    if (Password !== Confirmpassword) {
      return res.status(400).json({ message: 'Password and ConfirmPassword must match' });
    }
    if (otp !== keyForUser) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Update the password and confirmPassword
    user.Password = Password;
    user.Confirmpassword = Confirmpassword;

    // Save the updated user document
    await user.save();

    // Password updated successfully
    res.json({ message: 'Success' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





let keyHos;
let emailHos;
app.post('/hospitalforgot', async (req, res) => {
  const keys = Math.random().toString().substr(2, 6);
  keyHos = keys; // Save the key for later use
  const { Email } = req.body;
  emailHos = Email;

  try {
    const hos = await Hospital.findOne({ Email: Email });

    if (!hos) {
      return res.json({ message: "User not existed" });
    }

    const token = jwt.sign({ id: hos._id }, keys, { expiresIn: '10m' }); // Set the expiration time to 10 minutes

    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'gmail',
        pass: 'pass',
      },
    });

    var mailOptions = {
      from: 'gmail',
      to: Email,
      subject: 'Reset your Password',
      text: `Your OTP for reset password is ${keys}`,
    };

    await transporter.sendMail(mailOptions);
    return res.json({ message: "Successfully sent" });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/hospitalreset', async (req, res) => {
  const { otp, Password, Confirmpassword } = req.body;
  console.log(emailHos,keyHos);

  try {
    // Retrieve the user based on the stored email and OTP
    const hos = await Hospital.findOne({ Email: emailHos });

    if (!hos) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if password and confirmPassword match
    if (Password !== Confirmpassword) {
      return res.status(400).json({ message: 'Password and ConfirmPassword must match' });
    }
    if (otp !== keyHos) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Update the password and confirmPassword
    hos.Password = Password;
    hos.Confirmpassword = Confirmpassword;

    // Save the updated user document
    await hos.save();

    // Password updated successfully
    res.json({ message: 'Success' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/hoslocations', async (req, res) => {
  try {
    const locations = await Hospital.distinct('Hoscity');
    res.json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/hosnames', async (req, res) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({ message: 'Location parameter is missing' });
    }

    const hospitals = await Hospital.find({ Hoscity: location }).distinct('Hosname');
    res.json(hospitals);
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const UserDetailsSchema = new mongoose.Schema({
  Name:{type:String,required:true},
  Mobile:{type:String,required:true},
  Location:{type:String,required:true},
  Hospital:{type:String,required:true},

});

const UserDetails = mongoose.model('HealthHubs',UserDetailsSchema,'Userdetails');

app.post('/Usersubmit', async (req, res) => {
  const { Name,Mobile,Location,Hospital } = req.body;
  console.log(req.body);
  // Validate data (you can add more validation as needed)

  // Create a new user document
  const newUserdetails = new UserDetails({
    Name,
    Mobile,
    Location,
    Hospital,
  });
  console.log(newUserdetails);

  try {
    // Save the user to the MongoDB collection
    await newUserdetails.save();
    res.status(201).json({ message: 'Emergency Booking Successful' });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/hospitalrecords', async (req, res) => {
  try {
    const records = await UserDetails.find();
    res.json(records);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to delete a hospital record by ID
app.delete('/deleteRecord/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecord = await UserDetails.findByIdAndDelete(id);
    if (!deletedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting record:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
