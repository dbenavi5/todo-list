import Pool from "pg-pool";
import dotenv from "dotenv";

dotenv.config();

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const proConfig = process.env.DATABASE_URL; // heroku addon

const pool =
  process.env.NODE_ENV === "production"
    ? new Pool({
        connectionString: proConfig,
        ssl: {
          rejectUnauthorized: false,
        },
      })
    : new Pool({
        connectionString: devConfig,
      });

// const pool = new Pool({
//   connectionString:
//     process.env.NODE_ENV === "production" ? proConfig : devConfig,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// === OTHER WAY TO CONFIGURE === //



// const proConfig = { connectionString: process.env.DATABASE_URL };

// const pool = new Pool(
//   process.env.NODE_ENV === "production" ? proConfig : devConfig
// );

export default pool;
