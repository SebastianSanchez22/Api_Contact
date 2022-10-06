import Sequelize from "sequelize";
import db from "../configuracion/db.js";

export const Usuario = db.define('usuarios', {
    id_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_completo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefono_usuario: {
        type: Sequelize.BIGINT,
        allowNull: false
    }
})