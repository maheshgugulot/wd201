/* eslint-disable no-undef */
const todoList = require("../");
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

const createTodo = (title, dueDate) => ({ title, dueDate, completed: false });
const dateToday = new Date();
const today = dateToday.toISOString().split("T")[0];
const yesterday = new Date(dateToday);
yesterday.setDate(dateToday.getDate() - 1);
const Yesterday = yesterday.toISOString().split("T")[0];

const tomorrow = new Date(dateToday);
tomorrow.setDate(dateToday.getDate() + 1);
const Tomorrow = tomorrow.toISOString().split("T")[0];
beforeAll(() => {
  add(createTodo("Test Todo 1", today));
  add(createTodo("Test Todo 2", Tomorrow));
  add(createTodo("Test Todo 3", Yesterday));
});
test("adds a new todo", () => {
  const itemcount = all.length;
  const newTodoItem = createTodo("New Test Todo", Yesterday);
  add(newTodoItem);
  const newlen = all.length;
  expect(newlen).toBe(itemcount + 1);
});

test("marks a todo as complete", () => {
  markAsComplete(0);
  expect(all[0].completed).toBe(true);
});

test("retrieves overdue items", () => {
  const overdueItems = overdue();
  expect(
    overdueItems.every((t) => {
      return t.dueDate < today;
    }),
  ).toBe(true);
});

test("retrieves due today items", () => {
  const dueTodayItems = dueToday();
  expect(
    dueTodayItems.every((t) => {
      return t.dueDate === today;
    }),
  ).toBe(true);
});

test("retrieves due later items", () => {
  const dueLaterItems = dueLater();
  expect(
    dueLaterItems.every((t) => {
      return t.dueDate > today;
    }),
  ).toBe(true);
});
