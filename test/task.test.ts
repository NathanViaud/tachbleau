import { describe, it, expect } from "vitest";

const randomTaskName = () => {
    return Math.random().toString(36).substring(2, 15);
};

describe("Task Operations", () => {
    let taskId:string;

    it("create a task", async () => {
        const task = {
            name: randomTaskName(),
            description: "Test task description",
        };
        const response = await fetch("http://localhost:3000/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });
        const data = await response.json();
        taskId = data.id;
        expect(data).toBeDefined();
    });

    it("update a task", async () => {
        const updatedTask = {
            title: "Updated task name",
            description: "Updated task description",
        };
        const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask),
        });
        const data = await response.json();
        expect(data).toBeDefined();
        expect(data.title).toBe(updatedTask.title);
        expect(data.description).toBe(updatedTask.description);
    });

    it("delete a task", async () => {
        const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
            method: "DELETE",
        });
        expect(response.status).toBe(200);
    });
});