import { Telegraf }  from 'telegraf';
import db from "../configuracion/db.js"; 

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

function asesoria(chatid,asesorName,asesoradoName,phoneNumber,category,medio, fechaAsesoria){

    let unmensaje = 'Hola '+asesorName+', '+asesoradoName+' está solicitando una asesoría en el tema de '+category+' por medio de la plataforma '+medio+ ' , su número es '+phoneNumber+ ' y el día de la asesoría sería: '+fechaAsesoria;
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

async function contactarAsesor(){
    const [asesoriasPendientes, metadata] = await db.query("SELECT * FROM asesoria WHERE estado = 'Pendiente'")
    for (let i=0;i<asesoriasPendientes.length;i++){
        let asesores = await QueryAsesores(asesoriasPendientes[i].categoria)
        for (let j=0;j<asesores.length;j++){
            asesoria(asesores[j].telegram_id,asesores[j].nombreAsesor,asesoriasPendientes[i].nombreAsesorado,asesoriasPendientes[i].celular, asesoriasPendientes[i].categoria,asesoriasPendientes[i].plataforma)
        }
    }
}

async function buscarAsesor(){
    const [asesoriaNueva, metadata] = await db.query("SELECT * FROM asesoria ORDER BY id_asesoria DESC LIMIT 1")
    let asesores = await QueryAsesores(asesoriaNueva[0].categoria)
    for (let i = 0; i < asesores.length; i++) {
        asesoria(asesores[i].telegram_id,asesores[i].nombreAsesor,asesoriaNueva[0].nombreAsesorado,asesoriaNueva[0].celular, asesoriaNueva[0].categoria,asesoriaNueva[0].plataforma,asesoriaNueva[0].fechaAsesoria) 
    }
}

async function buscarEstadoAsesoria(idABuscar){
    const [buscarEstado, metadata2] = await db.query(`SELECT estado FROM asesoria WHERE id_asesoria = ${idABuscar}`)
    return buscarEstado;
}

async function actualizarEstadoAsesoria(idACambiar){
    const [actualizarEstado, metadata3] = await db.query(`UPDATE asesoria SET estado = 'Tomada' WHERE id_asesoria = ${idACambiar}`)
    return actualizarEstado;
}

export {initializeBot, asesoria, QueryAsesores, contactarAsesor, buscarAsesor, buscarEstadoAsesoria, actualizarEstadoAsesoria};