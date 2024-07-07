import { Component, EventEmitter, Input, Output, TemplateRef, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { generateUniqueId } from '../util';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'zone.js/lib/zone-impl';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css'
})
export class EditFormComponent {
  private modalService = inject(NgbModal);
  closeResult = '';
  form: FormGroup = new FormGroup({});

  @Output()
  submitTaskFormData: EventEmitter<any> = new EventEmitter<any>();

  TaskFormData: Task;

  @Input()
  editItem: any;

  open(content: TemplateRef<any>) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.onSubmit()

      },
      (reason) => {

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

  constructor() {

    this.taskForm = new FormGroup({
      id: new FormControl(''),
      taskname: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),
      taskDate: new FormControl('', Validators.required),
      achievedDate: new FormControl('', Validators.required),
      tags: new FormArray([])
    });
  }


  // ngOnInit(): void {
  //   setTimeout(() => {
  //     console.log(this.editItem)
  //     this.taskForm.setValue({
  //       id: this.editItem.id,
  //       taskname: this.editItem.taskname,
  //       priority: this.editItem.priority,
  //       taskDate: this.editItem.taskDate,
  //       achievedDate: this.editItem.achievedDate,
  //       tags:this.editItem.tags
  //     })
  //   }, 2000)
  // }

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

  onSubmit(){
    if(this.taskForm.valid){
    console.log(this.taskForm.value);
    this.TaskFormData = this.taskForm.value;
    this.submitTaskFormData.emit(this.TaskFormData)
   
    //alert
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Task has been updated",
      showConfirmButton: false,
      timer: 1500
    });
  }else{
    this.taskForm.markAllAsTouched()
  }

}


  setEditForm() {
    this.taskForm.setValue({
      id: this.editItem.id,
      taskname: this.editItem.taskname,
      priority: this.editItem.priority,
      taskDate: this.editItem.taskDate,
      achievedDate: this.editItem.achievedDate,
      tags: this.editItem.tags
    })
  }

  
  
}
