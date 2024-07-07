import { Component, EventEmitter, Output, TemplateRef, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from '../../states/Task.model';
import { addTask, deleteTask } from '../../states/task.actions';
import { Store } from '@ngrx/store';
import { generateUniqueId } from '../util';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  private modalService = inject(NgbModal);
  closeResult = '';
  form: FormGroup = new FormGroup({});

  @Output()
  submitTaskFormData: EventEmitter<any> = new EventEmitter<any>();

  TaskFormData: Task;

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.onSubmit()
      },
      (reason) => {
        this.taskForm.reset();
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
  taskForm: FormGroup;

  constructor(private store: Store<{ tasks: Task[] }>) {

    this.taskForm = new FormGroup({
      id: new FormControl(generateUniqueId()),
      taskname: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),
      taskDate: new FormControl('', Validators.required),
      achievedDate: new FormControl(''),
      tags: new FormArray([])
    });
  }


  ngOnInit(): void { }

  get tags(): FormArray {
    return this.taskForm.get('tags') as FormArray;
  }

  addTag(): void {
    const tagForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
    this.tags.push(tagForm);
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      console.log(this.taskForm.value);
      this.TaskFormData = this.taskForm.value;
      this.submitTaskFormData.emit(this.TaskFormData)
      this.taskForm.reset();
    } else {
      this.taskForm.markAllAsTouched()
    }
  }
}
