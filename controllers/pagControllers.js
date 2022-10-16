import {Asesor} from '../models/asesor.js';
import { Usuario } from '../models/usuario.js';

const p_home = (req, res) => {
    res.render('vUsuarios.pug');
}

const p_asesores = async (req, res) => {
    try{
        const asesores = await Asesor.findAll();
        res.json(asesores)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const p_usuarios = async (req, res) => {
    try{
        const usuarios = await Usuario.findAll();
        res.json(usuarios)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const usuario = async (req, res, next) => {
    try{
        const {id} = req.params;

        const usuario = await Usuario.findByPk(id);
        res.json(usuario);

    } catch(error) {
        next(error)
    }
};

const asesor = async (req, res, next) => {
    try{
        const {id} = req.params;

        const asesor = await Asesor.findByPk(id);
        res.json(asesor);

    } catch(error) {
        next(error)
    }
};

export {p_home,
        p_asesores,
        p_usuarios, 
        asesor,
        usuario};