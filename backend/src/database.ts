import {Sequelize} from 'sequelize';


const sequelize = new Sequelize('mysql://lmb:12345678@localhost:3306/lmb_server');

export default sequelize;