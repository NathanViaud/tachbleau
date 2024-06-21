import { describe, it, expect } from "vitest";
import axios from "axios";

const randomTaskName = () => {
    return Math.random().toString(36).substring(2, 15);
};

async function setup() {
    const user = {
        email: "amine@mail.com",
        password: "amine2",
    };
    const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    const data = await response.json();
    return data.token;
}


describe("Task Operations", () => {
    let taskId:string;
    let token: string;

    // beforeEach(async () => {
    //     const user = {
    //         email: "amine@mail.com",
    //         password: "amine2",
    //     };
    //     const response = await fetch("http://localhost:3000/api/users/login", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(user),
    //     });
    //     const data = await response.json();
    //     token = data.token;
    // });

    it("create a task", async () => {
        token = await setup();
        const task = {
            name: randomTaskName(),
            description: "Test task description",
            deadline: new Date(),
            duration:2,
        };
        const response = await fetch("http://localhost:3000/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(task),
        });
        const data = await response.json();
        taskId = data.id;
        expect(data).toBeDefined();
    });

    it("update a task", async () => {
        token = await setup();
        console.log(token);
        const updatedTask = {
            title: "Updated task title",
            description: "Updated task description",
        };
        const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(updatedTask),
        });
        const data = await response.json();
        expect(data).toBeDefined();
        expect(data.title).toBe(updatedTask.title);
        expect(data.description).toBe(updatedTask.description);
    });

    it("delete a task", async () => {
        token = await setup();
        const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        expect(response.status).toBe(200);
    });
});
