const StudentsModel = require('../models/students');
const ObjectId = require("mongoose").Types.ObjectId;
const cloudinary =  require("cloudinary").v2;

module.exports = {

    create: async (req, res) => {
        try{
            const {body} = req;
            body['documents'] = documentsStruture;
            body.address = {
                suburb:body.suburb,
                street:body.street,
                house_number:body.house_number,
            };
            for(const file of req.files){
                await cloudinary.uploader
                .upload(file.path,
                    {
                        folder: `sistemas_escolares/alumnos/${body.name}${body.apepat}${body.apemat}`, 
                        public_id: `${body.name} ${body.apepat} ${body.apemat}_${file.originalname}`
                    }
                )
                .then((result)=>{
                    if(!result.url){
                        return res.status(500).json({error: "Algo salio mal al intentar subir la imagen"});
                    }
                    body['documents'][file.originalname].url = result.url
                    body['documents'][file.originalname].public_id = result.public_id
                    body['documents'][file.originalname].resource_type = result.resource_type
                })
                .catch((err)=>{
                    console.log("Error al subir la imagen", err)
                    return res.status(500).json({error: "Algo salio mal al intentar subir la imagen"});
                });
            }
            const student = await StudentsModel.create(req.body);
            return res.status(200).json({
                response:"Alumno creada",
                data: student
            })
        }catch(err){
            return res.status(500).json({
                response:"Alumno no creado",
                error:err.message
            })
        }
    },

    get: async (req, res) => {
        try {
            const { id } = req.params
            await validateObjectId(id)
            const student = await StudentsModel.aggregate([
                {
                    $match:{
                        _id:ObjectId(id)
                    }
                },
                {
                    $lookup:{
                        from: 'careers',
                        localField: 'career',
                        foreignField: '_id',
                        as: 'career'
                    }
                },
                {$unwind:'$career'},
                {
                    $lookup:{
                        from: 'quarters',
                        localField: 'grade',
                        foreignField: '_id',
                        as: 'grade'
                    }
                },
                {$unwind:'$grade'},
                {
                    $lookup:{
                        from: 'quarters',
                        localField: 'career._id',
                        foreignField: 'career_id',
                        as: 'quarters'
                    }
                },
            ]);
            return res.status(200).json({student})
        } catch (err) {
            return res.status(500).json({
                response:"Alumno no obtenido",
                error:err.message
            })
        }
    },

    getAll: async (req, res) => {
        try {
            const students = await StudentsModel.find()
            .populate({path: 'career',select:'name'})
            .populate({path: 'grade',select:'number'})
            return res.status(200).json({students})
        } catch (err) {
            return res.status(500).json({
                response:"Alumnos no obtenidos",
                error:err.message
            })
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            await validateObjectId(id)
            const studentUpdated = await StudentsModel.findByIdAndUpdate(id,{
                $set: req.body
            })

            return res.status(200).json({
                response:"Alumno actualizado",
                data: studentUpdated
            })
        } catch (err) {
            return res.status(500).json({
                response:"Alumnos no actualizado",
                error:err.message
            })
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await validateObjectId(id)
            await StudentsModel.findByIdAndDelete(id);

            return res.status(200).json({
                response:"Alumno eliminado",
                data: {}
            })
        } catch (err) {
            return res.status(500).json({
                response:"Alumnos no eliminado",
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

const documentsStruture = {
    birth_certificate:{
        url:'',
        public_id:'',
        resource_type:''

    },
    studies_certificate:{
        url:'',
        public_id:'',
        resource_type:''

    },
    curp:{
        url:'',
        public_id:'',
        resource_type:''

    },
    no_security:{
        url:'',
        public_id:'',
        resource_type:''

    },
    photos:{
        url:'',
        public_id:'',
        resource_type:''

    },
    proof_of_address:{
        url:'',
        public_id:'',
        resource_type:''

    },
    exanii:{
        url:'',
        public_id:'',
        resource_type:''

    },
    letter_good_conduct:{
        url:'',
        public_id:'',
        resource_type:''

    },
};