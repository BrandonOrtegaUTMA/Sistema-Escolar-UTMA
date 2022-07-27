const CareerModel = require('../models/career');
const QuarterModel = require('../models/quarter');
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {

    create: async (req, res) => {
        try{
            const career = await CareerModel.create(req.body);
            return res.status(200).json({
                response:"Carrera creada",
                data: career
            })
        }catch(err){
            return res.status(500).json({
                response:"Carrera no creada",
                error:err.message
            })
        }
    },

    get: async (req, res) => {
        try {
            const { id } = req.params
            await validateObjectId(id)
            const career = await CareerModel.findById(id)
            return res.status(200).json({career})
        } catch (err) {
            return res.status(500).json({
                response:"Carrera no obtenido",
                error:err.message
            })
        }
    },

    getAll: async (req, res) => {
        try {
            const {type_career} = req.query;
            let query = {}
            if(type_career && type_career != ''){
                query.type_career = type_career;
            }
            const careers = await CareerModel.aggregate([
                {
                    $match:query
                },
                {
                    $lookup:{
                        from: 'quarters',
                        localField: '_id',
                        foreignField: 'career_id',
                        as: 'quarters'
                    }
                },
                {
                    $lookup:{
                        from: 'administratives',
                        localField: 'head_career',
                        foreignField: '_id',
                        as: 'head_career'
                    }
                },
                { $unwind: '$head_career'}
            ])
            return res.status(200).json({careers})
        } catch (err) {
            return res.status(500).json({
                response:"Carreras no obtenidos",
                error:err.message
            })
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            await validateObjectId(id)
            const careerUpdated = await CareerModel.findByIdAndUpdate(id,{
                $set: req.body
            })

            return res.status(200).json({
                response:"Carrera actualizado",
                data: careerUpdated
            })
        } catch (err) {
            return res.status(500).json({
                response:"Carreras no actualizado",
                error:err.message
            })
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await validateObjectId(id)
            await QuarterModel.deleteMany({career_id:id})
            await CareerModel.findByIdAndDelete(id);

            return res.status(200).json({
                response:"Carrera eliminado",
                data: {}
            })
        } catch (err) {
            return res.status(500).json({
                response:"Carreras no eliminado",
                error:err.message
            })
        }
    }

};

const validateObjectId = (id) =>{
    if(!id || !ObjectId.isValid(id)){
        return res.status(400).json({
            response:"No se pudo llevar acabo la accion",
            error:"ID invalido o inexistente"
        })
    }
}