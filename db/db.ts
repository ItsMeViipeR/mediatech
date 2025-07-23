import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { schema } from "./schema"; // <- assure-toi que le chemin est bon

const client = postgres(process.env.DATABASE_URL!);

export const db = drizzle<typeof schema>(client, { schema });
