import express from "express";
import router from "./routes/index.routes.js";
import db from "./configuracion/db.js";
import cors from 'cors';

const app = express();

//DB
db.authenticate()
    .then(() => console.log('Conexión exitosa a la base de datos'))
    .catch(err => console.log(err));

// Puerto
const port = 3000;

app.use(express.static('public'));

// Leer form
app.use(express.urlencoded({ extended: true }));
 
app.use(express.json());

app.use(cors())

app.use((req, res, next) => {
    return next();
}); 

// Router
app.use('/', router);
app.use('/asesores', router);
app.use('/asesorias', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

