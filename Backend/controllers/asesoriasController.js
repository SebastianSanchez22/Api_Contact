import { Asesoria } from "../models/asesoria.js";
import { initializeBot, buscarAsesor } from "../bot/bot.js";

const guardar_Asesoria = async (req, res) => {
    const {nombreAsesorado, celular,categoria, plataforma, fechaAsesoria} = req.body.datos;

    const existeAsesoria = await Asesoria.findOne(({ where: { nombreAsesorado : nombreAsesorado,
        categoria: categoria, fechaAsesoria: fechaAsesoria } }));

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
        initializeBot();
        buscarAsesor();
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