'use server'
import { neon } from "@neondatabase/serverless";

export async function addUrl(url: string, hash: string) {
    const DB_URL = process.env.DATABASE_URL;
    if (!DB_URL) {
        console.error("Database URL not found");
        return;
    }

    const sql = neon(DB_URL);
    const response = await sql`INSERT INTO urls (slug, url) VALUES (${hash}, ${url})`;
    return response;
}

export async function getUrl(slug: string) {
    const DB_URL = process.env.DATABASE_URL;
    if (!DB_URL) {
        console.error("Database URL not found");
        return;
    }

    const sql = neon(DB_URL);
    const response = await sql`SELECT * FROM urls WHERE slug = ${slug}`;
    return response;
}
