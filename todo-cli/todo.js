const todoList = () => {
  const all = [];

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    const today = new Date().toISOString().split("T")[0];
    return all.filter((item) => item.dueDate < today);
  };

  const dueToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return all.filter((item) => item.dueDate === today);
  };

  const dueLater = () => {
    const today = new Date().toISOString().split("T")[0];
    return all.filter((item) => item.dueDate > today);
  };
  const toDisplayableList = (list) => {
    let output = "";
    list.forEach((item) => {
      const checkbox = item.completed ? "[x]" : "[ ]";
      const title = item.title;
      const due =
        item.dueDate === new Date().toISOString().split("T")[0]
          ? ""
          : ` ${item.dueDate}`;
      output += `${checkbox} ${title}${due}\n`;
    });
    return output;
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};
module.exports = todoList;
