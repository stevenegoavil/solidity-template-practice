const { expect } = require("chai");

describe("TodoList", function () {
  let todoList;

  beforeEach(async function () {
    const TodoList = await ethers.getContractFactory("TodoList");
    todoList = await TodoList.deploy();
  });

  it("should add tasks correctly", async function () {
    await todoList.addTask("Learn Solidity");
    const [task, completed] = await todoList.getTask(0);

    expect(task).to.equal("Learn Solidity");
    expect(completed).to.be.false;
  });

  it("should mark tasks as completed", async function () {
    await todoList.addTask("Deploy Contract");
    await todoList.markCompleted(0);
    const [task, completed] = await todoList.getTask(0);

    expect(task).to.equal("Deploy Contract");
    expect(completed).to.be.true;
  });

  it("should return correct task count", async function () {
    await todoList.addTask("Task 1");
    await todoList.addTask("Task 2");

    const count = await todoList.getTaskCount();
    expect(count).to.equal(2);
  });

  it("should revert if marking invalid task index", async function () {
    await expect(todoList.markCompleted(99)).to.be.revertedWith("Invalid task index");
  });
});