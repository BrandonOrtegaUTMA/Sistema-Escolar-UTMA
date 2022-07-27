const EmailValidator = require('email-validator');
const AdministratorModel = require('../models/administrative');

module.exports = {

    create: async (req, res) => {
        try{            
            const { email: preEmail, name } = req.body;
            const email = preEmail.trim() || undefined;
            if (!EmailValidator.validate(email)) {
                res.status(400).json({ msg: 'email invalido', email });
                return;
            }
            if (typeof name === 'undefined' || name.length === 0) {
                res.status(400).json({ msg: 'nombre invalido' });
                return;
            }     
            const duplicatedAdministrative = await AdministratorModel.findOne({ email });
            if (duplicatedAdministrative) {
              res.status(400).json({ msg: 'El email ya existe' });
              return;
            }                 
            const administrative = await AdministratorModel.create(req.body);
            return res.status(200).json({
                response:"Administrativo creado",
                data: administrative
            })
        }catch(err){
            return res.status(500).json({
                response:"Administrativo no creado",
                error:err.message
            })
        }
    },
    list: async (req,res) =>{
        try{
            const administratives = await AdministratorModel.find(req.query);
            return res.status(200).json({   
                response:"Administrativos encontrados",
                data: administratives
            })            
        }catch(err){
            return res.status(500).json({
                response:"Administrativos no encontrados",
                error:err.message
            })
        }
    },
    show: async (req,res) =>{
        try{
           const id = req.params.id;
           const administrative = await AdministratorModel.findById({_id: id});
            return res.status(200).json({ 
                response:"Administrativo encontrado",
                data: administrative
            })                       
        }catch(err){
            return res.status(500).json({
                response:"Administrativo no encontrado",
                error:err.message
            })
        }
    },
    remove: async (req,res) =>{
        try{
            const id = req.params.id;
            const administrative = await AdministratorModel.deleteOne({_id: id});                           
             return res.status(200).json({ 
                 response:"Administrativo eliminado",
                 data: administrative
             })            
        }catch(err){
            return res.status(500).json({
                response:"Administrativo no eliminado",
                error:err.message
            })           
        }
    },
    update: async (req,res) =>{
        try{
            const id = req.params.id;
            const administrative = await AdministratorModel.findOneAndUpdate({
                _id: id
            },{
                $set: req.body
            });
             return res.status(200).json({ 
                 response:"Administrativo actualizado",
                 data: administrative
             })                       
        }catch(err){
            return res.status(500).json({
                response:"Administrativo no actualizado",
                error:err.message
            })   
        }
    }

};