import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { eq, like, or } from 'drizzle-orm' 
import { users } from './db/schema'

const app = new Hono()

app.use("/api/*", cors({
  origin: "http://localhost:3000",
}))

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})
// connect database
const db = drizzle(client)

const routes = app
  .get('/api/v1/hello', (c) => {
    return c.json({
      message: "hello from tanstack start & hono"
    })
  })
  // ユーザー一覧を取得する
  .get('/api/v1/users' ,async (c) => {
    const result = await db.select().from(users).all()
    return c.json(result)
  })
  // ユーザーを取得する
  .get('/api/v1/user/:id', async (c) => {
    // requestのparameterの中の変数idを数値として取得し、idに入れる
    const id = Number(c.req.param("id"))
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1)
    const user = result[0]
    return c.json(user)
  })
  // 検索する
  .get('/api/v1/search' , async (c) => {
    const query = c.req.query('q')
    
    const result = await db.select().from(users).where(or(
      like(users.name, `%${query}%`),
      like(users.profile, `%${query}%`)
    ))
    
    return c.json(result)
  })


export type AppType = typeof routes

export default app
