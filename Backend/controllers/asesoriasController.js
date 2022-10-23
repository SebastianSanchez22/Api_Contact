import { Asesoria } from "../models/asesoria.js";

const guardar_Asesoria = async (req, res) => {
    const {nombreAsesorado, celular,categoria, plataforma, fechaAsesoria} = req.body.datos;
    if(!nombreAsesorado || nombreAsesorado.length <3 || nombreAsesorado.length > 30){
        res.status(400).json({mensaje: 'El nombre es requerido y debe ser al menos 3 letras y a lo sumo de 30'})
    }else{
        if(!celular){
            res.status(400).json({mensaje: 'El numero de telefono es requerido'})
        }else if (celular.toString().length != 10 ){
            res.status(400).json({mensaje: 'Debe ingresar un número de 10 dígitos'})
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

    const existeAsesoria = await Asesoria.findOne(({ where: { nombreAsesorado : nombreAsesorado } }));

    if (existeAsesoria){
        const error = new Error("La asesoria ingresada ya existe");
        return res.status(400).json({msg: error.message});
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
        res.json({mensaje: 'La Asesoria ' + id_asesoria+ ' se elimino con exito'})
        res.sendStatus(204);
    //Cuando se jode??
    } catch (error) {
        return res.status(500).json({mensaje: 'Para eliminar una asesoria, la asesoria debe existir. Revise el id, por favor'});
    }
};

export { guardar_Asesoria , eliminar_Asesoria};