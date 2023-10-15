const user = require ('../models/userModel');
const msg = require ('../models/messageModel');
const jwToken = require ('jsonwebtoken');


const expDate = 24*60*60
const tokenCreator = (id) =>{
return jwToken.sign({id},'casablanca de catamatophia',{expiresIn:expDate })
}


const signup = async (req,res) => {
    const {first_name,last_name,username, email, password} = req.body;
    try {
const saveInfo = await user.create({first_name,last_name,username, email, password}) 

    //     // user signup token
    // const token =tokenCreator(saveInfo._id)
    // res.cookie('envelope',token,{httpOnly:true,maxAge: expDate*1000,https:false})

   res.status(200).redirect('/user/login');
    } catch (err) {
       res.status(400).json({error:'Signup unsuccessful'}) 
    }

}
 


const login = async (req,res) => {
    const {username, password} = req.body
  
    try {
     const loginUser = await  user.userLoginAuth(username, password)

          //user login token  
       const token = tokenCreator(loginUser._id)
       res.cookie('envelope', token, {maxAge: expDate*1000, httpOnly:true})

       res.status(200).redirect('/user/dashboard');
    }catch (err) {
         res.status(400).json({error:"Incorrect username or password"})   
    }    
       }
  

  //logout
  const logout = async(req, res) =>{
  res.cookie('envelope','', {maxAge:1})
  res.redirect('/')
  }
  


  const msgSaver = async (req,res) => {
    const {email, message} = req.body
  
    try {
     const saveMsg = await msg.create({email, message})
       res.status(200).redirect('/user/dashboard');
      
    }catch (err) {
         res.status(400).json({error:"Feedback not sent"})   
    }    
       }
  module.exports = {
      signup,
      login,
    //   update,
    //   //deleteUser,
    //   getAllUsers,
    //   getOneUser,
      logout,
      msgSaver
  }



