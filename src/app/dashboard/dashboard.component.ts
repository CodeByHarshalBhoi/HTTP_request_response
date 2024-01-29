import { Component, OnInit } from '@angular/core';
import { Task } from '../Model/task';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{


  showCreateTaskForm: boolean = false;
  allTask:Task[]=[]
  editmode:boolean = false;
  selectedTask: any;
  currentTaskId: string = '';

  //FOR LOADER
  isLoading:boolean = false;

  constructor(private http:HttpClient){}


  ngOnInit(): void {
    this.fetchData();
  }


  OpenCreateTaskForm(){
    this.showCreateTaskForm = true;
    this.editmode = false
  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }


  CreatTaskOrUpateTask (data:Task){
    if(!this.editmode)
  // console.log(data);
  this.http.post('http://localhost:3000/taskdata', data).subscribe((res)=>{
    console.log(res);

    // FOR SHOW TASK ON UI
    // this.fetchData();

  })
  else
  this.http.put('http://localhost:3000/taskdata'+`/${this.currentTaskId}`, data).subscribe()
this.fetchData();
  }

  fetchNewData(){
    this.fetchData()
  }

    fetchData(){
      this.http.get<any>('http://localhost:3000/taskdata').subscribe((res)=>{
        this.allTask = res;
        // console.log(res);
      })
    }


    deleteTask(id:any){
      this.http.delete('http://localhost:3000/taskdata'+`/${id}`).subscribe((res)=>{
        console.log(res);
      this.fetchData()
      })
    }


    deleteAllTask(){
      this.http.delete('http://localhost:3000/taskdata').subscribe((res)=>{
        console.log(res);
        this.fetchData()
      })
    }

    onEditClick(id: any){
      this.currentTaskId = id;
      //OPEN EDIT TASK FORM
      this.showCreateTaskForm = true;
      this.editmode = true;
      this.selectedTask = this.allTask.find((task) => {return task.id === id})
      this.fetchData();
    }
}
