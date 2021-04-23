import { Component, OnInit } from '@angular/core';
import {TaskService} from '../services/task.service';
import {Task} from '../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {



  tasks: Task[] = [];

  myTask: Task = {
    label: '',
    completed: false
  };

  showFAdd = false;
  showFUpdate = false;
  searchText = '';

  constructor(private service: TaskService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll()
  {
    return this.service.getAll().subscribe(data => this.tasks = data);
  }

  delete(id: any){
    return this.service.delete(id).subscribe(res => {
      this.findAll();
    });
  }

  create()
  {
    return this.service.create(this.myTask).subscribe(res => {
      this.findAll();
      this.myTask = {
        label: '',
        completed: false
      };
      this.showFAdd = false;
    });
  }

  update(task: Task)
  {
    this.service.update(task.id, task).subscribe(res => {
      this.findAll();
      this.myTask = {
        label: '',
        completed: false
      };
      this.showFAdd = false;
      this.showFUpdate = false;

    });
  }

  search()
  {
     console.log(this.searchText);
     this.tasks.filter((task) => task.label.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));
  }

  toggleUpdate(task: Task)
  {
      this.showFAdd = true;
      this.showFUpdate = true;
      this.myTask = task;
  }


  toggleStatus(task: Task)
  {
    return this.service.toggleStatus(task.id, task.completed).subscribe(res =>{
      this.findAll();
    });
  }

}
