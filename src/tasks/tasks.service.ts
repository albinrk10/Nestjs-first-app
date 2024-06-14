import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v4 } from 'uuid';
import { UpdateTaskDto } from './dto/task.dto';


@Injectable()
export class TasksService {

    private tasks: Task[] = [

        {
            id: '1',
            title: 'primera tarea',
            description: 'esta es la primera tarea',
            status: TaskStatus.PENDING
        },



    ];


    getAllTask() {
        return this.tasks;
    }

    createTask(title: String, description: String) {
        const task = {
            id: v4(),
            title,
            description,
            status: TaskStatus.PENDING,
        }
        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string) {
        this.tasks = this.tasks.filter(task => task.id !== id);
     }

     getAllTaskbyid(id: string) {
        return this.tasks.find(task => task.id === id);
     }

    updateTask(id: string, updateFields: UpdateTaskDto):Task {
        const task = this.getAllTaskbyid(id)
        const newtask =  Object.assign(task, updateFields);
        this.tasks = this.tasks.map(task => task.id === id ? newtask : task);
        return newtask;
        


     }
}
