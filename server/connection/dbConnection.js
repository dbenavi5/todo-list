import Pool from 'pg-pool';

const pool = new Pool({
    user: 'dianabenavides',
    password: 'Db082788',
    host: 'localhost',
    port: 5432,
    database: 'perntodo',
});

export default pool;
