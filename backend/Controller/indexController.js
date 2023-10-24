const dbConnect = require('../dbConfig/dbconfig')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const rootApi = async (req, res) => {
  res.send('Hello World')
  console.log('server created')
}
const loginApi = async (req, res) => {
  const { email, password } = req.body
  if (email && password) {
    var users = await dbConnect('users')
    var findUser = await users.findOne({ email })
    if (findUser) {
      if (findUser.email == email) {
        bcrypt.compare(password, findUser.password, async (err, result) => {
          if (result) {
            const token = jwt.sign({ email: findUser.email }, 'private_key', {
              expiresIn: '1 day',
              algorithm: 'HS256',
            })
            const userUpdate = await users.updateOne(
              { email },
              { $set: { token: token } },
            )
            res.send({
              message: 'Login Succesfully',
              status: 1,
              token: token,
              email: email,
            })
          } else {
            res.send({ message: 'Login Failed', status: 0 })
          }
        })
      } else {
        res.send({ message: 'Email Incorrect', status: 0 })
      }
    } else {
      res.send({ message: 'User not found', status: 0 })
    }
  } else {
    res.send({ message: 'Email or Password Incorrect', status: 0 })
  }
}
// const imageUpload = async (req,res)=>{
//     const {email} = req.params;
//     if(email){
//         var users = await dbConnect();
//         var findUser = await users.findOne({email})
//         if(findUser){
//             if(findUser.email == email){
//               const imageUpdate = await users.updateOne({email},{$set:{image:req.file.originalname}})
//               if(imageUpdate){
//                 res.send({message:"Image added Succesfully", status:1})
//               }
//               else{
//                 res.send({message:"Image uploading Failed", status:0})
//               }
//             }else {
//                     res.send({ message: "Email Incorrect", status: 0 })
//                 }
//         }else {
//             res.send({ message: "User not found", status: 0 })
//         }
//     }else {
//         res.send({ message: "Email or Password Incorrect", status: 0 })
//     }
// }
const registerApi = async (req, res) => {
  const { name, address, email, password, confirmPassword, role } = req.body
  if (name && address && email && password && confirmPassword && role) {
    if (password == confirmPassword) {
      var users = await dbConnect('users')
      const hashPassword = await bcrypt.hash(password, 10)
      var findUser = await users.findOne({ email })
      if (findUser) {
        res.send({ message: 'user already exists', status: 0 })
      } else {
        var insertData = await users.insertOne({
          name: name,
          email: email,
          address: address,
          password: hashPassword,
          confirmPassword: confirmPassword,
          status: 1,
          role: role,
        })
        if (insertData) {
          res.send({ message: 'Registration Successful', status: 1 })
        } else {
          res.send({ message: 'Registration Failed', status: 0 })
        }
      }
    } else {
      res.send({
        message: "password and confirm password doesn't match",
        status: 0,
      })
    }
  } else {
    res.send({ message: 'Please enter all the details', status: 0 })
  }
}


const specificUser = async (req, res) => {
  const email = req.params.email
  var users = await dbConnect('users')
  var findSpecificUser = await users.findOne({ email })
  if (findSpecificUser) {
    res.send({
      message: 'User Detials Found',
      status: 1,
      user: findSpecificUser,
    })
  } else {
    res.send({ message: 'User Details not Found', status: 0 })
  }
}
const updateApi = async (req, res) => {
  const email = req.params.email
  const { name, address } = req.body
  if (email) {
    if (name !== '' && (name !== undefined) & (name !== null)) {
      const users = await dbConnect()
      const findUser = await users.findOne({ email })
      if (findUser) {
        const updateUser = await users.updateOne(
          { email },
          { $set: { name: name, address: address } },
        )
        if (updateUser) {
          res.send({ message: 'Updated Succesfully', status: 1 })
        } else {
          res.send({ message: 'Updation Failed', status: 0 })
        }
      } else {
        res.send({ message: 'User not found', status: 0 })
      }
    } else {
      res.send({ message: 'Name cannot be empty', status: 0 })
    }
  } else {
    res.send({ message: 'Email not  Found', status: 0 })
  }
}

module.exports = {
  rootApi,
  loginApi,
  registerApi,
  specificUser,
  updateApi,
}
