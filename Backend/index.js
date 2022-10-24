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

//--------------BOT---------------//
import { Telegraf }  from 'telegraf';

const bot = new Telegraf('5749708663:AAG8V96OweaChUs0X8ZpByKM5_Vh15GEUv0');

function initializeBot(){
    bot.launch();

    bot.start((ctx) => {
        ctx.reply('Mi nombre es Bot');
        let chatid = ctx.chat.id;
        console.log(chatid);
    })

    bot.action('SI', ctx => {
        console.log("La asesoria ha sido tomada");
    })
    
    bot.action('NO', ctx => {
        console.log("La asesoria No ha sido tomada");
    })

    bot.hears('Prueba', (ctx) => {
        asesoria('Juan','3042812771','Whatsapp','Bicicletas','Juan Asesor',5187647590);
    })
    console.log("Ejecutando bot")
}    

initializeBot();

