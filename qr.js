/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

async function phone(number, name) {
  if (!number || !name) {
    throw new Error ('Missin Phone Number or Name!')
  }
  var data = ''
  if (number.startsWith('90')) {
    data = '*Bu Kodu Kimseyle Paylaşmayın!*' + ' ' + name
  } else {
    data = '*Do Not Share This Code With Anyone!*' + ' ' + name
  }
  return data;
}

const chalk = require('chalk');
const {WAConnection, MessageOptions, MessageType, Mimetype} = require('@adiwajshing/baileys');
const {StringSession} = require('./whatsasena/');
const fs = require('fs');

async function whatsAsena () {
    const conn = new WAConnection();
    const Session = new StringSession();  
    conn.version = [2, 2126, 14]
    conn.logger.level = 'warn';
    conn.regenerateQRIntervalMs = 50000;
    
    conn.on('connecting', async () => {
        console.log(`${chalk.green.bold('Whats')}${chalk.blue.bold('Asena')}
${chalk.white.italic('AsenaString Kodu Alıcı')}

${chalk.blue.italic('ℹ️  Connecting to Whatsapp... Please Wait.')}`);
    });
    conn.on('open', async () => {
        var st = Session.createStringSession(conn.base64EncodedAuthInfo());
        console.log(
            chalk.green.bold('Asena String Kodunuz: '), Session.createStringSession(conn.base64EncodedAuthInfo())
        );
        
        if (!fs.existsSync('config.env')) {
            fs.writeFileSync('config.env', `ASENA_SESSION="${st}"`);
        }
        console.log(st)
        await conn.sendMessage(conn.user.jid,st, MessageType.text)
        var msg = await phone(conn.user.jid, conn.user.name)
        console.log(msg)
        await conn.sendMessage(conn.user.jid,msg, MessageType.text)
        process.exit(0);
    });
    await conn.connect();
}
whatsAsena()
module.exports = phone 
