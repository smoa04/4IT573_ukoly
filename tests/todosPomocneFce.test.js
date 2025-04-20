import test from "ava"
import { migrate } from "drizzle-orm/libsql/migrator"
import { db, getAllTodos, getTodoById, updateTodo, deleteTodo } from "../src/app.js"
import { todosTable } from "../src/schema.js"

test.before("run migrations", async () => {
    await migrate(db, { migrationsFolder: "drizzle" })
})

test("getAllTodos", async (t) => {
    const initialTodos = await getAllTodos()
    const initialCount = initialTodos.length

    await db
        .insert(todosTable)
        .values([
            { id: 1, title: "První todo", done: false },
            { id: 2, title: "Druhé todo", done: true },
        ])

    const todos = await getAllTodos()


    t.true(todos.length >= initialCount + 2)
    t.is(todos.find(todo => todo.id === 1)?.title, "První todo")
    t.is(todos.find(todo => todo.id === 2)?.title, "Druhé todo")
})

test("updateTodo updates todo", async (t) => {
    await db
        .insert(todosTable)
        .values({ id: 3, title: "Todo před úpravou", done: false })

    await updateTodo(3, { title: "Todo po úpravě", done: true })

    const updatedTodo = await getTodoById(3)

    t.is(updatedTodo.title, "Todo po úpravě")
    t.is(updatedTodo.done, true)
})

test("deleteTodo removes todo", async (t) => {
    await db
        .insert(todosTable)
        .values({ id: 4, title: "Todo ke smazání", done: false })

    await deleteTodo(4)

    const deletedTodo = await getTodoById(4)

    t.is(deletedTodo, undefined)
})
