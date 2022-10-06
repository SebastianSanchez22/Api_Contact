const {Telegraf} = require('telegraf');

const bot = new Telegraf('5749708663:AAG8V96OweaChUs0X8ZpByKM5_Vh15GEUv0');

function initializeBot(){
    bot.launch();
    /*
    bot.start((ctx) => {
        //ctx.reply('Mi nombre es Bot');
        chatid = ctx.chat.id;
        console.log(chatid);
    })
    */

    bot.hears('Prueba', (ctx) => {
        asesoria1('Juan','3042812771','Whatsapp','Bicicletas','Juan Asesor',5187647590);
    })

    bot.action('SI', ctx => {
        console.log("La asesoria ha sido tomada");
    })
    
    bot.action('NO', ctx => {
        console.log("La asesoria No ha sido tomada");
    })

    
    
}

function asesoria1(name, number, med, category,asesorName,chatid){
    let animalMessage = 'Hola '+asesorName+', la persona '+name+' con número de teléfono '+number+' esta solicitando una asesoria en el tema de '+category+ ' por la plataforma '+med;
    bot.telegram.sendMessage(chatid, animalMessage, {
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

initializeBot();

