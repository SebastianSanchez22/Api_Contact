import { Asesor } from "../models/asesor.js";

const guardar_asesores = async (req, res) => {
    //Validar
    const { nombre, telefono } = req.body;
    try {
        const nuevoAsesor = await Asesor.create({
            nombre,
            telefono
        });
        res.json(nuevoAsesor);
    } catch (error) {
        console.log(error);
    }
};

const eliminar_asesor = async (req, res) => {
    //Validar
    try {
        const { id } = req.params;
        await Asesor.destroy({
            where:{
                id,
            },
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

const actualizar_asesor = async (req, res) => {
    try {
        //Validar
        const { id } = req.params;
        const {nombre, telefono} = req.body
        
        const asesor = await Asesor.findByPk(id)
        asesor.nombre = nombre
        asesor.telefono = telefono

        await asesor.save();

        res.json(asesor);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export { guardar_asesores, eliminar_asesor, actualizar_asesor };