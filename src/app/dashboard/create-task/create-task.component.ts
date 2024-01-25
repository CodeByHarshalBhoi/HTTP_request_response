import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/Model/task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {

  @Input() isEditMode:boolean = false;


  @Input() selectedTask: any;
  
  @ViewChild('taskForm') taskForm: NgForm | undefined;



  @Output() CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() EmitTaskData:EventEmitter<Task>  = new EventEmitter<Task>()

  onSubmitForm(formValue:NgForm){
    this.EmitTaskData.emit(formValue.value);
    console.log(formValue.value);
    this.CloseForm.emit(false)

  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.taskForm?.form.patchValue(this.selectedTask);
    }, 0);
    // this.taskForm.form.patchValue(this.selectedTask);
  }

  OnCloseForm(){
    this.CloseForm.emit(false);
  }
}
