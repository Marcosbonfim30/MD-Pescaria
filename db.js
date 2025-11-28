import mysql2 from "mysql2/promise";

export const db = await mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "md-pescaria"
})