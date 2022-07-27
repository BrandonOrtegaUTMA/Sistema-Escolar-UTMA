const QuarterModel = require('../models/quarter');
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {

    create: async (req, res) => {
        try{
            const {career_id, number} =  req.body;
            const alreadyExist =  await QuarterModel.find({career_id:career_id,number:number});
            if(alreadyExist.length > 0){
                return res.status(400).json({
                    response:"El numero de cuatrimestre ya existe, intente con otro"
                })
            }
            const quarter = await QuarterModel.create(req.body);
            return res.status(200).json({
                response:"Cuatrimestre creado",
                data: quarter
            })
        }catch(err){
            return res.status(500).json({
                response:"Cuatrimestre no creado",
                error:err.message
            })
        }
    },

    get: async (req, res) => {
        try {
            const { id } = req.params
            const IdInvalid = validateObjectId(id);
            if(IdInvalid){
                return res.status(500).json({
                    response:"ID invalido",
                })
            }
            const quarter = await QuarterModel.findById(id);
            return res.status(200).json({
                response:"Cuatrimestre obtenido",
                quarter
            })
        } catch (err) {
            return res.status(500).json({
                response:"Cuatrimestre no obtenido",
                error:err.message
            })
        }
    },

    getAll: async (req, res) => {
        try {
            const { id } = req.params
            const IdInvalid = validateObjectId(id);
            if(IdInvalid){
                return res.status(500).json({
                    response:"ID invalido",
                })
            }
            const quarters = await QuarterModel.find({career_id:id}).populate({
                path: 'career_id',
                select:'name'
            });
            return res.status(200).json({
                response:"Cuatrimestres obtenidos",
                quarters
            })
        } catch (err) {
            console.log(err.message)
            return res.status(500).json({
                response:"Cuatrimestres no obtenidos",
                error:err.message
            })
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const IdInvalid = validateObjectId(id);
            if(IdInvalid){
                return res.status(500).json({
                    response:"ID invalido",
                })
            }
            const quarterUpdated = await QuarterModel.findByIdAndUpdate(id,{
                $set: req.body
            })

            return res.status(200).json({
                response:"Cuatrimestre actualizado",
                data: quarterUpdated
            })
        } catch (err) {
            return res.status(500).json({
                response:"Cuatrimestres no actualizado",
                error:err.message
            })
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const IdInvalid = validateObjectId(id);
            if(IdInvalid){
                return res.status(500).json({
                    response:"ID invalido",
                })
            }
            await QuarterModel.findByIdAndDelete(id);

            return res.status(200).json({
                response:"Cuatrimestre eliminado",
                data: {}
            })
        } catch (err) {
            return res.status(500).json({
                response:"Cuatrimestres no eliminado",
                error:err.message
            })
        }
    }

};

const validateObjectId = (id) =>{
    if(!id || !ObjectId.isValid(id)){
        return true;
    }
}