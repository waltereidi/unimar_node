const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
    await mongoose.connect(process.env.DBLINK);
    console.log('Conectado ao MongoDB');
}

main().catch((err) => console.log(err));

module.exports = mongoose;