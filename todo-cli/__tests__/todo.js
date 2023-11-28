/* eslint-disable no-undef */
const todoList = require("../");
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

const createTodo = (title, dueDate) => ({ title, dueDate, completed: false });
const dateToday = new Date();
const today = dateToday.toLocaleDateString("en-CA");
const yesterday = new Date(dateToday);
yesterday.setDate(dateToday.getDate() - 1);
const Yesterday = yesterday.toLocaleDateString("en-CA");

const tomorrow = new Date(dateToday);
tomorrow.setDate(dateToday.getDate() + 1);
const Tomorrow = tomorrow.toLocaleDateString("en-CA");
beforeAll(() => {
  add(createTodo("Test Todo 1", today));
});
test("adds a new todo", () => {
  const itemcount = all.length;
  const newTodoItem = createTodo("New Test Todo", today);
  add(newTodoItem);
  const newlen = all.length;
  expect(newlen).toBe(itemcount + 1);
});

test("marks a todo as complete", () => {
  expect(all[0].completed).toBe(false);
  markAsComplete(0);
  expect(all[0].completed).toBe(true);
});

test("retrieves overdue items", () => {
  const overdueItems = overdue();
  add(createTodo("Test Todo 2", Yesterday));
  expect(overdue().length).toBe(overdueItems.length + 1);
});

test("retrieves due today items", () => {
  const dueTodayItems = dueToday();
  add(createTodo("Test Todo 3", today));
  expect(dueToday().length).toBe(dueTodayItems.length + 1);
});

test("retrieves due later items", () => {
  const dueLaterItems = dueLater();
  add(createTodo("Test Todo 4", Tomorrow));
  expect(dueLater().length).toBe(dueLaterItems.length + 1);
});
