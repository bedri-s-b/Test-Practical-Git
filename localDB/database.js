const sqlite3 = require('sqlite3').verbose();

// Създаваме или отваряме база cheat_sheets.db
const db = new sqlite3.Database('cheat_sheets.db', (err) => {
    if (err) {
        console.error('Грешка при отваряне на базата', err.message);
    } else {
        console.log('Базата е готова!');
    }
});
