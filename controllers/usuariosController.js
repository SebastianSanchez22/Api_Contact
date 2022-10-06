import { Usuario } from "../models/usuario.js";

const guardar_usuarios = async (req, res) => {
    //Validar
    const {nombre_completo, telefono_usuario} = req.body;

    try {
        const nuevoUsuario = await Usuario.create({
            nombre_completo,
            telefono_usuario
        });
        //res.redirect('/');
        res.json(nuevoUsuario);
    } catch (error) {
        console.log(error);
    }
};

export { guardar_usuarios };

