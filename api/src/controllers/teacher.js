const EmailValidator = require('email-validator');
const TeacherModel = require('../models/teacher');

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
            const duplicatedteacher = await TeacherModel.findOne({ email });
            if (duplicatedteacher) {
              res.status(402).json({ msg: 'El email ya existe' });
              return;
            }                 
            const teacher = await TeacherModel.create(req.body);
            return res.status(200).json({
                response:"Maestro creado",
                data: teacher
            })
        }catch(err){
            return res.status(500).json({
                response:"Maestro no creado",
                error:err.message
            })
        }
    },
    list: async (req,res) =>{
        try{
            const id = req.params.id;
            const teachers = await TeacherModel.find({});
            return res.status(200).json({ 
                response:"Maestros encontrados",
                data: teachers
            })            
        }catch(err){
            return res.status(500).json({
                response:"Maestros no encontrados",
                error:err.message
            })
        }
    },
    show: async (req,res) =>{
        try{
           const id = req.params.id;
           const teacher = await TeacherModel.findById({_id: id});
            return res.status(200).json({ 
                response:"Maestro encontrado",
                data: teacher
            })                       
        }catch(err){
            return res.status(500).json({
                response:"Maestro no encontrado",
                error:err.message
            })
        }
    },
    remove: async (req,res) =>{
        try{
            const id = req.params.id;
            const teacher = await TeacherModel.deleteOne({_id: id});              

             return res.status(200).json({ 
                 response:"Maestro eliminado",
                 data: teacher
             })
            
        }catch(err){
            return res.status(500).json({
                response:"Maestro no eliminado",
                error:err.message
            })           
        }
    },
    update: async (req,res) =>{
        try{
            const id = req.params.id;
            const teacher = await TeacherModel.findOneAndUpdate({
                _id: id
            },{
                $set: req.body
            })
            
             return res.status(200).json({ 
                 response:"Maestro actualizado",
                 data: teacher
             })
           
            
        }catch(err){
            return res.status(500).json({
                response:"Maestro no actualizado",
                error:err.message
            })   
        }
    }

};