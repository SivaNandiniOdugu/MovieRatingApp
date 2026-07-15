const User=require("../models/User");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const registerUser=async(req,res)=>{
    try{
        const hashedPassword=await bcrypt.hash(req.body.password,10);
        const user=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword
        });
        res.status(201).json(user);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    // // Compare entered password with hashed password
    // const isMatch = await bcrypt.compare(password, user.password);

    // if (!isMatch) {
    //   return res.status(400).json({
    //     message: "Invalid password"
    //   });
    // }

    // res.json({
    //   message: "Login Successful"
    // });
    const token = jwt.sign(
  {
    id: user._id,
    email: user.email
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1h"
  }
);

res.json({
  message: "Login Successful",
  token
});

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getUsers=async(req,res)=>{
  try{
    const users=await User.find().select("-password");
    res.json(users);
  } catch(error){
    res.status(500).json({message});
  }
};

module.exports={registerUser,loginUser,getUsers};