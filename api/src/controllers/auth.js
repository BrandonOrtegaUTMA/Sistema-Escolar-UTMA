const jwt = require('jsonwebtoken');

module.exports = {
    login: async (req, res) => {
        try{            
            const user = req.user;
            const token = jwt.sign(user.toJSON(),process.env.JWT_SECRET);
            return res.status(200).json({
                response:"Token creado",
                data: token
            });
        }catch(err){
            return res.status(500).json({
                response:"Token no creado",
                error:err.message
            });
        }
    },
    recoverPassword: async (req, res) => {
        try{            
            const {email} = req.body;
            return res.status(200).json({
                response:"Correo enviado",
                data: {}
            });
        }catch(err){
            return res.status(500).json({
                response:"Token no creado",
                error:err.message
            });
        }
    },

};