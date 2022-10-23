import { Asesor } from "../models/asesor.js";

const guardar_asesores = async (req, res) => {
    //Revisar
    const { nombre, telefono, telegram_id } = req.body;
    if(!nombre || nombre.length <3 || nombre.length > 30){
        res.status(400).json({mensaje: 'El nombre es requerido y debe ser al menos 3 letras y a lo sumo de 30'})
    }
    if(!telefono || telefono.length != 10){
        res.status(400).json({mensaje: 'El numero de telefono es requerido y debe tener 10 digitos'})
    }
    //Telegram ID
    try {
        const nuevoAsesor = await Asesor.create({
            nombre,
            telefono,
            telegram_id
        });
        res.json(nuevoAsesor);
    } catch (error) {
        console.log(error);
    }
};

const eliminar_asesor = async (req, res) => {
    //Formato del ID
    try {
        const { id } = req.params;
        await Asesor.destroy({
            where:{
                id,
            },
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({mensaje: 'Para eliminar un asesor, el asesor debe existir. Revise el id, por favor'});
    }
};

const actualizar_asesor = async (req, res) => {
    try {
        
        const { id } = req.params;
        const {nombre, telefono, telegram_id} = req.body
        if(!nombre || nombre.length <3 || nombre.length > 30){
            res.status(400).send('El nombre es requerido y debe ser al menos 3 letras y a lo sumo de 30');
        }
        if(!telefono || telefono.length != 10){
            res.status(400).send('El telefono es requerido y debe ser de 10 digitos');
        }
        //Telegram ID

        const asesor = await Asesor.findByPk(id)
        asesor.nombre = nombre
        asesor.telefono = telefono
        asesor.telegram_id = telegram_id

        await asesor.save();

        res.json(asesor);
    } catch (error) {
        //return res.status(500).json({message: error.message});
        return res.status(500).json({mensaje: 'Para actualizar un asesor, el asesor debe existir. Revise el id, por favor'});
    }
};

export { guardar_asesores, eliminar_asesor, actualizar_asesor };