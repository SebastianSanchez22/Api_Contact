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
        asesoria(5187647590,'Juan el asesor','Bicicletas','Whatsapp');
    })
    console.log("Ejecutando bot")
}    

initializeBot();

function asesoria(chatid,asesorName,asesoradoName,phoneNumber,category,medio){

    let unmensaje = 'Hola '+asesorName+', '+asesoradoName+' está solicitando una asesoria en el tema de '+category+' por medio de: '+medio+ ' , su número es: '+phoneNumber;
    bot.telegram.sendMessage(chatid, unmensaje, {
        reply_markup: {
            inline_keyboard: [
                [{
                        text: "La tomo",
                        callback_data: 'SI'
                    },
                    {
                        text: "No Ahora",
                        callback_data: 'NO'
                    }
                ],

            ]
        }
    })
}


async function QueryAsesores(categoriaBuscada){
    const [asesoresParaCategoria, metadata1] = await db.query(`SELECT x.telegram_id,x.nombreAsesor FROM asesor x INNER JOIN asesor_categoria y ON x.id_asesor=y.id_asesor WHERE y.id_categoria = (SELECT id_categoria FROM categoria WHERE categoria.nombreCategoria="${categoriaBuscada}")`)
    return asesoresParaCategoria;
    }

async function buscarAsesor(){
    const [asesoriasPendientes, metadata] = await db.query("SELECT * FROM asesoria WHERE estado = 'Pendiente'")
    for (let i=0;i<asesoriasPendientes.length;i++){
        let asesores = await QueryAsesores(asesoriasPendientes[i].categoria)
        for (let j=0;j<asesores.length;j++){
            asesoria(asesores[j].telegram_id,asesores[j].nombreAsesor,asesoriasPendientes[i].nombreAsesorado,asesoriasPendientes[i].celular, asesoriasPendientes[i].categoria,asesoriasPendientes[i].plataforma)
        }
    }
}

const buscarAsesorias = await buscarAsesor();

buscarAsesorias;

//const [asesoriasPendientes, metadata] = await db.query("SELECT * FROM asesoria WHERE estado = 'Pendiente'")
//console.log(asesoriasPendientes)

//const categoriaBuscada = "Televisores";
//const [asesoresParaCategoria, metadata1] = await db.query(`SELECT x.telegram_id,x.nombreAsesor FROM asesor x INNER JOIN asesor_categoria y ON x.id_asesor=y.id_asesor WHERE y.id_categoria = (SELECT id_categoria FROM categoria WHERE categoria.nombreCategoria="${categoriaBuscada}")`);
//console.log(asesoresParaCategoria);

/*
async function QueryAsesores(categoriaBuscada){
const [asesoresParaCategoria, metadata1] = await db.query(`SELECT x.telegram_id,x.nombreAsesor FROM asesor x INNER JOIN asesor_categoria y ON x.id_asesor=y.id_asesor WHERE y.id_categoria = (SELECT id_categoria FROM categoria WHERE categoria.nombreCategoria="${categoriaBuscada}")`)
return asesoresParaCategoria;
}

const asesoresDisponibles = await QueryAsesores("Televisores");
console.log(asesoresDisponibles);
*/

//const categoriaBuscada = 'Vehiculos'; 
//const [asesoresParaCategoria, metadata1] = await db.query(`SELECT x.telegram_id,x.nombreAsesor FROM asesor x INNER JOIN asesor_categoria y ON x.id_asesor=y.id_asesor WHERE y.id_categoria = (SELECT id_categoria FROM categoria WHERE categoria.nombreCategoria="${categoriaBuscada}")`);
//console.log(asesoresParaCategoria);

//const idABuscar = 5;
//const [estadoAsesoria, metadata2] = await db.query(`SELECT estado FROM asesoria WHERE id_asesoria = ${idABuscar}`)
//console.log(estadoAsesoria)


//const actualizarEstado = await Asesoria.update({ estado : 'Tomada'}, {where : { estado : 'Pendiente'}})
// const [actualizarEstado, metadata3] = await db.query("")