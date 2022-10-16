import { Usuario } from "../models/usuario.js";

const guardar_usuarios = async (req, res) => {
    //Validar
    const {nombre_completo, telefono_usuario, plataforma} = req.body;

    try {
        const nuevoUsuario = await Usuario.create({
            nombre_completo,
            telefono_usuario,
            plataforma
        });
        //res.redirect('/');
        res.json(nuevoUsuario);
    } catch (error) {
        console.log(error);
    }
};

const eliminar_usuario = async (req, res) => {
    //Validar
    try {
        const { id_usuario } = req.params;
        await Usuario.destroy({
            where:{
                id_usuario,
            },
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export { guardar_usuarios , eliminar_usuario};

