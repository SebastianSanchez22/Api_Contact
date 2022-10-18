import { DATE } from "sequelize";
import { Asesoria } from "../models/asesoria.js";

const guardar_Asesoria = async (req, res) => {
    const {nombreAsesorado, celular,categoria, plataforma, fechaAsesoria} = req.body;
    if(!nombreAsesorado || nombreAsesorado.length <3 || nombreAsesorado.length > 30){
        res.status(400).json({mensaje: 'El nombre es requerido y debe ser al menos 3 letras y a lo sumo de 30'})
    }else{
        if(!celular || celular.length != 10){
            res.status(400).json({mensaje: 'El numero de telefono es requerido y debe tener 10 digitos'})
        }else{
            if(!categoria){
                res.status(400).json({mensaje: 'La categoría es requerida'})
            }else{
                if(!plataforma){
                    res.status(400).json({mensaje: 'La plataforma es requerida'})
                }else{
                    if(!fechaAsesoria){
                        res.status(400).json({mensaje:'La fecha de la asesoria es requerida'})
                    }
                }
            }
        }
    }
    
    try {
        const nuevaAsesoria = await Asesoria.create({
            nombreAsesorado,
            celular,
            categoria,
            plataforma,
            fechaAsesoria
        });
        //res.redirect('/');
        res.json(nuevaAsesoria);
    } catch (error) {
        console.log(error);
    }
};

const eliminar_Asesoria = async (req, res) => {
    //Validar
    try {
        const { id_asesoria } = req.params;
        await Asesoria.destroy({
            where:{
                id_asesoria,
            },
        });
        res.json({mensaje: 'La Asesoria ' + id_asesoria+ ' se elmino con exito'})
        res.sendStatus(204);
    //Cuando se jode??
    } catch (error) {
        return res.status(500).json({mensaje: 'Para eliminar una asesoria, la asesoria debe existir. Revise el id, por favor'});
    }
};

export { guardar_Asesoria , eliminar_Asesoria};