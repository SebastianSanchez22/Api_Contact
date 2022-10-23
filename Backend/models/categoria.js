import Sequelize from "sequelize";
import db from "../configuracion/db.js";

export const Categoria = db.define('categoria', {
    id_categoria: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_categoria: {
        type: Sequelize.STRING,
        allowNull: false
    }
})