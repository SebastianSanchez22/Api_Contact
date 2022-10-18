import Sequelize from "sequelize";
import db from "../configuracion/db.js";

export const Asesoria = db.define('asesoria', {
    id_asesoria: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreAsesorado: {
        type: Sequelize.STRING,
        allowNull: false
    },
    celular: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    categoria: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    plataforma: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    fechaAsesoria: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW 
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: false
    }})



