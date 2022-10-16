import { Usuario } from "../models/usuario.js";

const guardar_usuarios = async (req, res) => {
    const {nombre_completo, telefono_usuario, plataforma} = req.body;
    if(!nombre_completo || nombre_completo.length <3 || nombre_completo.length > 30){
        res.status(400).json({mensaje: 'El nombre es requerido y debe ser al menos 3 letras y a lo sumo de 30'})
    }
    if(!telefono_usuario || telefono_usuario.length != 10){
        res.status(400).json({mensaje: 'El numero de telefono es requerido y debe tener 10 digitos'})
    }
    //Plataforma, formato??
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
        res.json({mensaje: 'El usuario ' + id_usuario+ ' se elmino con exito'})
        res.sendStatus(204);
    //Cuando se jode??
    } catch (error) {
        return res.status(500).json({mensaje: 'Para eliminar un asesor, el asesor debe existir. Revise el id, por favor'});
    }
};

export { guardar_usuarios , eliminar_usuario};

