import express from 'express';
import {  
    p_home,
    p_asesores,
    p_usuarios,
    usuario,
    asesor
} from '../controllers/pagControllers.js';

import { 
    guardar_asesores,
    eliminar_asesor,
    actualizar_asesor
} from '../controllers/asesoresController.js';

import { 
    guardar_usuarios
} from '../controllers/usuariosController.js';

const router = express.Router();

router.get('/', p_home);
router.post('/', guardar_usuarios);

router.get('/asesores', p_asesores);
router.post('/asesores', guardar_asesores);
router.delete('/asesores/:id', eliminar_asesor);
router.put('/asesores/:id',actualizar_asesor);
router.get('/asesores/:id',asesor);

router.get('/usuarios',p_usuarios);
router.get('/usuarios/:id',usuario);
router.post('/usuarios',guardar_usuarios);

export default router;