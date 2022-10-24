import Sequelize from "sequelize";

// Override timezone formatting by requiring the Sequelize and doing it here instead
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    date = this._applyTimezone(date, options);
  
    // Z here means current timezone, _not_ UTC
    // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
    return date.format('YYYY-MM-DD HH:mm Z');
  };

const db = new Sequelize( 'api_contact', 'root', 'root', {
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max: 5, 
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
} );

export default db;