import express from 'express';
import {  
    p_home,
    p_asesores,
    p_asesorias,
    asesoria,
    asesor
} from '../controllers/pagControllers.js';

import { 
    guardar_asesores,
    eliminar_asesor,
    actualizar_asesor
} from '../controllers/asesoresController.js';

import {
    guardar_Asesoria,
    eliminar_Asesoria
} from '../controllers/asesoriasController.js';

const router = express.Router();

router.get('/', p_home);

router.get('/asesores', p_asesores);
router.post('/asesores', guardar_asesores);
router.delete('/asesores/:id', eliminar_asesor);
router.put('/asesores/:id',actualizar_asesor);
router.get('/asesores/:id',asesor);

router.get('/asesorias',p_asesorias);
router.get('/asesorias/:id',asesoria);
router.post('/asesorias',guardar_Asesoria);
router.delete('/asesorias/:id',eliminar_Asesoria);

export default router;