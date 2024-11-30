/*export  const PORT = process.env.PORT || 3000
export  const DB_HOST = process.env.DB_HOST || 'localhost'
export  const DB_USER = process.env.DB_USER || 'root'
export  const DB_PASSWORD = process.env.DB_PASSWORD || ''
export  const DB_NAME = process.env.DB_NAME || 'agenda'
export  const DB_PORT = process.env.DB_PORT || 3306*/
module.exports = {
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_USER: process.env.DB_USER,
    DB_PORT: process.env.DB_PORT,
    PORT: process.env.PORT || 3000
  };