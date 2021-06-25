const fs = require('fs');
const util = require('util');
const { nanoid } = require('nanoid')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const filePath = './db/user.json'
const readFile = util.promisify(fs.readFile);
const {checkDb, singleData} = require('../helper')
const ErrorResponse = require('../utils/errorResponse')
let refreshTokens = [];

exports.Register = async (req, res, next) => {
      try {
            const data = req.body
            data.uid = nanoid(16);
            data.password = await generateHashedPassword(data.password);
            let Data = await readFile(filePath, 'utf-8');
            let Users = []
            if(Data){
                  Users = JSON.parse(Data);
            }
            if(Users == "undefined" || Users == "String" || Users == "null"){
                  Users.push(data);
            }else{
                  let chk = checkDb(Users,'email',data.email)
                  if(chk){
                        return next(new ErrorResponse("user email already exists", 400));
                  }else{
                        Users.push(data); 
                  }
            }
            
            fs.writeFile(filePath, JSON.stringify(Users, null, 2), (error) => {
                  if(error) {
                        return console.log("error found in writing file");
                  }
                  else {
                        res.status(201).json({
                              error: 'false',
                              code: 201,
                              message: 'User Registered Successfully'
                        });
                  }
            })
      } catch (error) {
            next(error)
      } 
}

exports.Login = async (req, res, next) => {
      try {
            const data = req.body;
            let Data = await readFile(filePath, 'utf-8');
            let Users = []
            if(Data){
                  Users = JSON.parse(Data);
            }   
            let chk = checkDb(Users,'email', data.email);
            
            if(chk){
                  let user = singleData(Users, 'email' ,data.email);
                  // console.log(user); return;
                  bcrypt.compare(data.password, user.password, function(error, response){
                        if(error){
                              return next(new ErrorResponse("Password Not Matched", 203));
                        }else{
                              if(response){
                                    const accessToken = generateAccessToken(user);
                                    const refreshToken = generateRefreshToken(user);
                                    refreshTokens.push(refreshToken);
                                    res.status(200).json({ 
                                          accessToken, 
                                          refreshToken,
                                          uid: user.uid,
                                          email: user.email,
                                          name: user.name,
                                    });
                              }else{
                                    return next(new ErrorResponse("Password Not Matched", 203));
                              }
                              
                        }
                  });
            }else{
                  return next(new ErrorResponse("You have entered a wrong Email address", 203));     
            }            
            
      } catch (error) {
            next(error)
      }
}
exports.RefreshToken = async (req,res, next) => {
      const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
      const refreshToken = req.body.token;
      // res.status(201).json({refreshToken}); return; 
      if(refreshToken === null) return next(new ErrorResponse("Invalid refresh Token", 401));
      if(!refreshTokens.includes(refreshToken)) return next(new ErrorResponse("Invalid refresh Token", 401));
      jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
            if(err) return next(new ErrorResponse("Error Found", 500));
            const accessToken = generateAccessToken({
                  id: user.uid,  
                  email: user.email 
            });
            res.status(200).json({ 
                  accessToken
            });
      })
  }

async function generateHashedPassword(password){
      let hash = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, hash);
}

function generateAccessToken(user){
      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
      return jwt.sign({ 
          id: user.uid,  
          email: user.email
      }, accessTokenSecret, {expiresIn: process.env.JWT_EXPIRE})
  }
function generateRefreshToken(user){
      const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
      return jwt.sign({
            id: user.uid,  
            email: user.email
      },refreshTokenSecret);
  }
