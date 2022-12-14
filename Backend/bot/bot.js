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

    console.log("Ejecutando bot")
}

async function asesoria(chatid,asesorName,asesoriaID,asesoradoName,category,medio, fechaAsesoria){

    let unmensaje = 'Hola '+asesorName+', '+asesoradoName+' está solicitando una asesoría en el tema de '+category+' por medio de la plataforma '+medio+ ' y el día de la asesoría sería: '+fechaAsesoria;
    
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

async function chequearRespuestaAsesor(asesoriaID, nombreAsesorado, categoria, celular, fechaAsesoria){ 
    let estadoActual = await buscarEstadoAsesoria(asesoriaID);
        bot.action('SI', function(ctx) {   
            if(estadoActual[0].estado== "Pendiente"){
                actualizarEstadoAsesoria(asesoriaID);
                estadoActual[0].estado = "Tomada";
                try {
                    ctx.deleteMessage();
                } catch (error) {
                }
                bot.telegram.sendMessage(ctx.chat.id, `Tomaste la asesoría con ${nombreAsesorado} sobre ${categoria}, su celular es ${celular}, ten en cuenta que la fecha de la asesoría es: ${fechaAsesoria}`);
            } else {
                try {
                    ctx.deleteMessage();
                } catch (error) {
                }
                bot.telegram.sendMessage(ctx.chat.id, "La asesoría ya no se encuentra disponible porque ya fue tomada");
            }
            })
        
        bot.action('NO', ctx => {
            try {
                ctx.deleteMessage();
            } catch (error) {
            }
            bot.telegram.sendMessage(ctx.chat.id, "No se te asignará la asesoría");
        })
}

async function QueryAsesores(categoriaBuscada){
    const [asesoresParaCategoria, metadata1] = await db.query(`SELECT x.telegram_id,x.nombreAsesor FROM asesor x INNER JOIN asesor_categoria y ON x.id_asesor=y.id_asesor WHERE y.id_categoria = (SELECT id_categoria FROM categoria WHERE categoria.nombreCategoria="${categoriaBuscada}")`)
    return asesoresParaCategoria;
}

async function buscarAsesor(){
    const [asesoriaNueva, metadata] = await db.query("SELECT * FROM asesoria ORDER BY id_asesoria DESC LIMIT 1");
    let asesores = await QueryAsesores(asesoriaNueva[0].categoria)
   
    for (let i = 0; i < asesores.length; i++) {
        await asesoria(asesores[i].telegram_id,asesores[i].nombreAsesor,asesoriaNueva[0].id_asesoria,asesoriaNueva[0].nombreAsesorado,asesoriaNueva[0].categoria,asesoriaNueva[0].plataforma,asesoriaNueva[0].fechaAsesoria)
        await chequearRespuestaAsesor(asesoriaNueva[0].id_asesoria, asesoriaNueva[0].nombreAsesorado, asesoriaNueva[0].categoria, asesoriaNueva[0].celular, asesoriaNueva[0].fechaAsesoria);
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


export {initializeBot, asesoria, QueryAsesores, buscarAsesor, buscarEstadoAsesoria, actualizarEstadoAsesoria};