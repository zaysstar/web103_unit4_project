import { pool } from './database.js';

const createKeyboardsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS custom_keyboards;
        
        CREATE TABLE IF NOT EXISTS custom_keyboards (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            case_color VARCHAR(100) NOT NULL,
            switch_type VARCHAR(100) NOT NULL,
            keycap_theme VARCHAR(100) NOT NULL,
            total_price INTEGER NOT NULL
        );
    `;

    try {
        const res = await pool.query(createTableQuery);
        console.log('🎉 custom_keyboards table created successfully');
    } catch (err) {
        console.error('⚠️ error creating custom_keyboards table', err);
    }
};

const seedDatabase = async () => {
    await createKeyboardsTable();
    // You can add insert statements here later to pre-populate some example keyboards!
};

seedDatabase();