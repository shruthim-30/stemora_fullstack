/**
 * Standalone Database Initializer for MySQL
 * Run: node database/initDb.js
 */
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function runMigration() {
  console.log('[MIGRATION] Connecting to MySQL server...');
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true
    });

    console.log('[MIGRATION] Reading schema.sql...');
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');

    console.log('[MIGRATION] Executing schema queries...');
    await connection.query(schemaSql);

    console.log('✅ [MIGRATION COMPLETE] All tables and default data created successfully!');
    await connection.end();
    process.exit(0);
  } catch (err) {
    console.error('❌ [MIGRATION ERROR]', err.message);
    process.exit(1);
  }
}

runMigration();
