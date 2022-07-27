const EmailValidator = require('email-validator');
const UserModel = require('../models/user');

module.exports = {

    create: async (req, res) => {
        try{            
            const { email: preEmail, name } = req.body;
            const email = preEmail.trim() || undefined;
            if (!EmailValidator.validate(email)) {
                res.status(401).json({ msg: 'email invalido', email });
                return;
            }
            if (typeof name === 'undefined' || name.length === 0) {
                res.status(401).json({ msg: 'nombre invalido' });
                return;
            }     
            const duplicatedUser = await UserModel.findOne({ email });
            if (duplicatedUser) {
              res.status(402).json({ msg: 'El email ya existe' });
              return;
            }                 
            const user = await UserModel.create(req.body);
            return res.status(200).json({
                response:"Usuario creado",
                data: user
            })
        }catch(err){
            return res.status(500).json({
                response:"Usuario no creado",
                error:err.message
            })
        }
    },
    list: async (req,res) =>{
        try{            
            const users = await UserModel.find({});
            return res.status(200).json({ 
                response:"Usuarios encontrados",
                data: users
            })            
        }catch(err){
            return res.status(500).json({
                response:"Usuarios no encontrados",
                error:err.message
            })
        }
    },
    show: async (req,res) =>{
        try{
           const id = req.params.id;
           const user = await UserModel.findById({_id: id});
            return res.status(200).json({ 
                response:"Usuario encontrado",
                data: user
            })                       
        }catch(err){
            return res.status(500).json({
                response:"Usuario no encontrado",
                error:err.message
            })
        }
    },
    remove: async (req,res) =>{
        try{
            const id = req.params.id;
            const user = await UserModel.deleteOne({_id: id});                           
             return res.status(200).json({ 
                 response:"Usuario eliminado",
                 data: user
             })            
        }catch(err){
            return res.status(500).json({
                response:"Usuario no eliminado",
                error:err.message
            })           
        }
    },
    update: async (req,res) =>{
        try{
            const id = req.params.id;
            const user = await UserModel.findOneAndUpdate({
                _id: id
            },{
                $set: req.body
            });
             return res.status(200).json({ 
                 response:"Usuario actualizado",
                 data: user
             })                       
        }catch(err){
            return res.status(500).json({
                response:"Usuario no actualizado",
                error:err.message
            })   
        }
    }

};