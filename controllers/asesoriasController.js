import { Asesoria } from "../models/asesoria.js";

const guardar_asesorias = async (req, res) => {
    //Validar
    const id_asesor = 10;
    const id_usuario = 20;
    const id_categoria = 30;
    const fecha_solicitud = "Hola";
    const fecha_asesoria = "Ahora";
    const estado = "No tomada";
    const {plataforma} = req.body;

    try {
        const nuevaAsesoria = await Asesoria.create({
            id_asesor,
            id_usuario,
            id_categoria,
            fecha_solicitud,
            fecha_asesoria,
            estado,
            plataforma,
        });
        //res.redirect('/');
        res.json(nuevaAsesoria);
    } catch (error) {
        console.log(error);
    }
};

export { guardar_asesorias };