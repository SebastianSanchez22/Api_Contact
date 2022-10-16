import Sequelize from "sequelize";
import db from "../configuracion/db.js";
import { Usuario } from "../models/usuario.js";

export const Asesoria = db.define('asesorias', {
    id_asesor: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        //allowNull: false
    },
    id_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        //allowNull: false
    },
    id_categoria: {
        type: Sequelize.INTEGER,
        //allowNull: false
    },
    fecha_solicitud: {
        type: Sequelize.DATE,
      //  allowNull: false
    },
    fecha_asesoria: {
        type: Sequelize.DATE,
        //allowNull: false
    },
    estado: {
        type: Sequelize.STRING,
        //allowNull: false,
    },
    plataforma: {
        type: Sequelize.STRING,
        //allowNull: false
    }
})

/*Usuario.hasMany(Asesoria, {
    foreignKey: 'id_usuario'
});
Asesoria.belongsTo(Usuario);*/



