const User = require('../models/user')

const CryptoJS = require('crypto-js')
const jsonwebtoken = require('jsonwebtoken')
const UserPassword = require('../models/userPassword')
const UserVerification = require('../models/userVerification')
const nodemailer = require('nodemailer')
const {v4: uuid4} = require('uuid')
const bcrypt = require('bcrypt')

require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS
  }
})

transporter.verify((error, success) => {
  if(error){
    console.log(error)
  } else {
    console.log("Ready for message")
    console.log(success)
  }
})

const sendEmail = ({_id, username}, res) => {
  const currentUrl = "http://127.0.0.1:5000/"

  const uniqueString = uuid4() + _id
  const userId = _id

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: username,
    subject: "Verify your email",
    html: `<p>Verify your email address to complete registration and login into your account.</p>
    <p>This link <b>expires in 6 hours</b>.</p><p>Press <a href=${currentUrl +"api/v1/auth/verify/"+ userId+ "/" +uniqueString}>here</a>
    to proceed.</p>`
  }

  const saltRounds = 10
  bcrypt.hash(uniqueString,saltRounds).then((hashedUniqueString) =>{
    
    const newVerification = new UserVerification({
      userId: _id,
      uniqueString: hashedUniqueString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 21600000
    })

    newVerification.save().then(()=>{
      transporter.sendMail(mailOptions).then(()=>{
        res.json({
          status: "Pending",
          message: "Verification email has been sent!"
        })
      }).catch((error) => {
        console.log(error)
        res.json({
          status: "failed",
          message: "Failed to send email verification!"
        })
      })
    }).catch((error) => {
      console.log(error)
      res.json({
        status: "failed",
        message: "Couldn't save!"
      })
    })
  }).catch(()=>{
    res.json({
      status: "failed",
      message: "Error occured!"
    })
  })  
}

const sendEmailChangePassword = ({_id, username}, res) => {
  const currentUrl = "http://127.0.0.1:3000/"

  const uniqueString = uuid4() + _id
  const userId = _id

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: username,
    subject: "Change Your Password",
    html: `<p>Change Password.</p>
    <p>This link <b>expires in 6 hours</b>.</p><p>Press <a href=${currentUrl +"change-password/"+ userId+ "/" +uniqueString}>here</a>
    to proceed.</p>`
  }

  const saltRounds = 10
  bcrypt.hash(uniqueString,saltRounds).then((hashedUniqueString) =>{
    
    const newVerification = new UserPassword({
      userId: _id,
      uniqueString: hashedUniqueString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 21600000
    })

    newVerification.save().then(()=>{
      transporter.sendMail(mailOptions).then(()=>{
        res.json({
          status: "Pending",
          message: "Change email has been sent!"
        })
      }).catch((error) => {
        console.log(error)
        res.json({
          status: "failed",
          message: "Failed to send email!"
        })
      })
    }).catch((error) => {
      console.log(error)
      res.json({
        status: "failed",
        message: "Couldn't save!"
      })
    })
  }).catch(()=>{
    res.json({
      status: "failed",
      message: "Error occured!"
    })
  })  
}


exports.register = async (req,res)=> {
  const{ password } = req.body
  console.log(password)
  try {
    req.body.password = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET_KEY
    )

    console.log("hereA")
    const user = await User.create(req.body)
    const getUser = await User.findOne({username: req.body.username})
    console.log("hereB")

    user.save().then((result) => {
      console.log("User registration result:", result);
      sendEmail(result, res);
    });

    console.log("hereC")

  } catch (err) {
    res.status(500).json(err)
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username)
  console.log(password)
  try {
    console.log("here")
    const user = await User.findOne({ username }).select('password username isVerified');
    console.log("here0")

    if (!user) {
      console.log("here1")
      return res.status(401).json({
        errors: [
          {
            param: 'username',
            msg: 'Invalid username or password'
          }
        ]
      });

    }

    if (!user.isVerified) {
      console.log("here2")
      return res.status(401).json({
        errors: [
          {
            param: 'username',
            msg: 'Account not verified. Please verify your email before logging in.'
          }
        ]
      });
    }

    const decryptedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (decryptedPass !== password) {
      console.log("here4")
      return res.status(401).json({
        errors: [
          {
            param: 'username',
            msg: 'Invalid username or password'
          }
        ]
      });
    }

    user.password = undefined;

    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: '24h' }
    );

    res.status(200).json({ user, token });

  } catch (err) {
    res.status(500).json(err);
  }
};

exports.forgotPassword = async (req, res) => {
  const { username } = req.body;
  console.log(username)
  try {
    console.log("here2")
    const user = await User.findOne({ username }).select('username isVerified');

    if (!user) {
      console.log("here3")
      return res.status(401).json({
        errors: [
          {
            param: 'username',
            msg: 'Email/Username is not registered!'
          }
        ]
      });

    }

    if (!user.isVerified) {
      console.log("here2")
      return res.status(401).json({
        errors: [
          {
            param: 'username',
            msg: 'Account not verified. Please verify your email before resetting password.'
          }
        ]
      });
    }

    sendEmailChangePassword(user, res, (emailSent) => {
      if (emailSent) {
        // Email sent successfully, send a 200 response
        res.status(200).json(user);
      } else {
        // Handle the case where email sending failed
        res.status(500).json({ message: 'Failed to send email' });
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
  // console.log("hi")
};

exports.changePassword = async (id, req, res)  => {
  const{ password } = req.body
  console.log(password)
  console.log(id)
  try {
    
    const encryptedPassword = req.body.password = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET_KEY
    ).toString();

    console.log(encryptedPassword)

    const updatePassword = await User.findByIdAndUpdate(
      id,
      { password: encryptedPassword } 
    )
    
    res.status(200).json(updatePassword)
    console.log("hereA")
    } catch(err) {
      res.status(500).json(err)
    }
}
