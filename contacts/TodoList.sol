//SPDX-License-Identifier: MIT
pragma solidity >= 0.4.22 < 0.9.0;

contract TodoList {
    address public owner;

    struct Todo {
        string task;
        bool completed;
    }

    Todo[] public todos;

    constructor() {
        owner = msg.sender;
    }

    function addTask(string memory _task) public {
        todos.push(Todo(_task, false));
    }

    function markCompleted(uint _index) public {
        require(_index < todos.length, "Invalid task index");
        todos[_index].completed = true;
    }

    function getTask(uint _index) public view returns (string memory, bool) {
        Todo memory t = todos[_index];
        return (t.task, t.completed);
    }

    function getTaskCount() public view returns (uint) {
        return todos.length;
    }
}