import Sequelize from "sequelize";
import db from "../configuracion/db.js";

export const Asesor = db.define('asesor', {
    id_asesor: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreAsesor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    celular: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    correo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    telegramId: {
        type: Sequelize.BIGINT,
        allowNull: false
    }
})