import {Asesor} from '../models/asesor.js';
import { Asesoria } from '../models/asesoria.js';

const p_home = (req, res) => {
    res.json({msg: "Hola mundo"});
}

const p_asesores = async (req, res) => {
    try{
        const asesores = await Asesor.findAll();
        res.json(asesores)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const p_asesorias = async (req, res) => {
    try{
        const asesorias = await Asesoria.findAll();
        res.json(asesorias)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const asesoria = async (req, res, next) => {
    try{
        const {id} = req.params;
        const asesoria = await Asesoria.findByPk(id);
        res.json(asesoria);

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

const queryAsesorias = async (req, res) => {

    const asesorias = await Asesoria.findAll({where: {estado: 'Pendiente'}})

    try {

        res.json(asesorias);
        console.log(asesorias[0].dataValues.celular);
        
    }catch(error){
        console.log(error)
    }
}

export {p_home,
        p_asesores,
        p_asesorias, 
        asesor,
        asesoria,
        queryAsesorias};