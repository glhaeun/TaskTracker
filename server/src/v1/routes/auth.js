const router = require('express').Router()
const userController = require('../controllers/user')
const { body } = require('express-validator')
const validation = require('../handlers/validation')
const tokenHandler = require('../handlers/tokenHandler')
const User = require('../models/user')
const userVerification = require('../models/userVerification')
const userPassword = require('../models/userPassword')

const path = require("path")
const bcrypt = require("bcrypt")

router.post(
  '/register',
  body('username').custom(value => {
    return User.findOne({ username: value }).then(user => {
      if (user) {
        return Promise.reject('username already used')
      }
    })
  }),
  validation.validate,
  userController.register
)

router.post(
  '/login',
  body('username').isLength({ min: 8 }).withMessage(
    'username must be at least 8 characters'
  ),
  body('password').isLength({ min: 8 }).withMessage(
    'password must be at least 8 characters'
  ),
  validation.validate,
  userController.login
)

router.post(
  '/verify-token',
  tokenHandler.verifyToken,
  (req, res) => {
    res.status(200).json({ user: req.user })
  }
)

router.get('/verify/:userId/:uniqueString', (req,res) =>{
  console.log('req.params:', req.params); // Log route parameters
  console.log('req.url:', req.url);
  let { userId, uniqueString} = req.params;
  userVerification.find({userId})
  .then((result) => {
    console.log(result)
    if (result.length>0) {
      const {expiresAt} = result[0]
      const hashedUniqueString = result[0].uniqueString

      if(expiresAt<Date.now()) {
        userVerification.deleteOne({userId})
        .then((result) => {
          User.deleteOne({_id: userId})
          .then(() => {
            let message = "Link has expired. Please sign up again."
            res.redirect(`/api/v1/auth/verified?error=true&message=${message}`)
          }) 
          .catch(error => {
            console.log(error)
            let message = "Clearing user with expired unique string failed"
          res.redirect(`/api/v1/auth/verified?error=true&message=${message}`)
    
          })
        })
        .catch((error) => {
          console.log(error)
          let message = "An error occured while deleting user verification record"
          res.redirect(`/api/v1/auth/verified?error=true&message=${message}`)
    
        })
      } else {
          bcrypt.compare(uniqueString, hashedUniqueString)
          .then(result => {
            if(result) {
              User.updateOne({_id: userId}, {isVerified: true})
              .then(() => {
                userVerification.deleteOne({userId})
                .then(() =>
                res.sendFile(path.join(__dirname, "../views/verification.html")))
                .catch(error=> {
                  console.log(error)
                  let message = "An error occured while finalizing successful verification"
                  res.redirect(`/api/v1/auth/verified?error=true&message=${message}`)
                })
              })
              .catch(error => {
                console.log(error)
                let message = "An error occured while updating user verification status"
                res.redirect(`/api/v1/auth/verified?error=true&message=${message}`)
              })
            } else {
              let message = "Invalid verifcation details passed. check your inbox"
            res.redirect(`/api/v1/auth/verified?error=true&message=${message}`)
    
            }
          })
          .catch(error => {
            console.log(error)
            let message = "An error occured while comparing unique strings"
            res.redirect(`/api/v1/auth/verified?error=true&message=${message}`)
    
          })
      }
    } else {
      let message = "Account record doesn't exist or has already been verified. Please register or login"
          res.redirect(`/api/v1/auth/verified?error=true&message=${message}`)
    
    }
    
    
  }).
  catch((error) => {
    console.log(error)
    let message = "An error occured while checking verification"
    res.redirect(`/api/v1/auth/verified?error=true&message=${message}`)
  })
})

router.post(
  '/forgot-password',
  validation.validate,
  userController.forgotPassword
)

router.get('/change-password/:userId/:uniqueString', async (req,res) =>{
  console.log('req.params:', req.params); 
  console.log('req.url:', req.url);

  let { userId, uniqueString} = req.params;
  userPassword.find({userId})
  .then((result) => {
    console.log(result)
    if (result.length>0){
      const {expiresAt} = result[0]
      const hashedUniqueString = result[0].uniqueString

      if(expiresAt<Date.now()) {
        userPassword.deleteOne({userId})
        .then(() => {
          userPassword.deleteOne({_id: userId})
          .then(() => {
            console.log("link has expired")
            return res.json({status: "link has expired"})
          }) 
          .catch(() => {
            console.log("Clearing user with expired unique string failed")
            return res.json({status: "Clearing user with expired unique string failed"})
          })
        }
      )} else {
        bcrypt.compare(uniqueString, hashedUniqueString)
        .then(result => {
          if(result){
            userPassword.deleteOne({userId})
            .then(()=> {
              const redirectUrl = `/change-password/${req.params.userId}/${req.params.uniqueString}`;
              res.json({ redirectUrl, status: 'success' });
            }).catch(error=> {
              let message = "An error occured while finalizing successful verification"
              console.log(message)
              return res.json({status: message})
            })  
          } else {
            let message = "Invalid details passed. Check your inbox"
            console.log(message)
            return res.json({status: message})

          }
        })
      }  
    }  else {
      console.log("testing")
      return res.json({ status: 'error', message: 'No matching entry found' });
    }
  }).catch((error) => {
    let message = "An error occured while checking verification"
    console.log(message)
    return res.json({status: message})
  })
  }
  
)

router.get("/verified", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/verification.html"))
})

router.post(
  '/change-password/:id'
  , (req, res) => {
    validation.validate    
    const { id } = req.params;
    console.log("router")
    console.log(id)
    userController.changePassword(id, req, res);
  });
  
module.exports = router