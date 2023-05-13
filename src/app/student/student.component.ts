import { Component, OnInit } from '@angular/core';
import { Student } from './student';
import { StudentsService } from './students.service';
import { HttpErrorResponse} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  public students!: Student[];
  public editStudent!:Student;
  public deleteStudent!:Student;


constructor(private studentService: StudentsService, private router:Router){}

  ngOnInit(): void {
    this.getAllStudents();
  }

  public onLogOut(){
    this.router.navigateByUrl('/login');
  }
  
  public getAllStudents(): void {
    this.studentService.getStudents().subscribe(
      (response: Student[])=>{
        this.students=response
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      },

    )
  }
  
  public onAddStudent(addForm:NgForm){
    this.studentService.addStudent(addForm.value).subscribe(
      (response: Student)=>{
        console.log(response);
        this.getAllStudents();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      },
    );
    document.getElementById('add-student-form')!.click();
    addForm.reset();

  }

 public onUpdateStudent(student:Student){
    this.studentService.updateStudent(student).subscribe(
      (response: Student)=>{
        console.log(response);
        this.getAllStudents();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      },
    );

  }

  public onDeleteStudent(Id:number): void {
    this.studentService.deleteStudent(Id).subscribe(
      (response: void)=>{
        console.log(response);
        this.getAllStudents();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      },
    );

  }
  
  public searchEmployees(key: string): void {
    console.log(key);
    const results: Student[] = [];
    for (const student of this.students) {
      if (student.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || student.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || student.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || student.speciality.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(student);
      }
    }
    this.students = results;
    if (results.length === 0 || !key) {
      this.getAllStudents();
    }
  }

  public onOpenModal(student: Student | any, mode: string): void {
    const container = document.getElementById('main-container')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target','#addStudentModal');
    }
    if (mode === 'edit') {
      this.editStudent=student;
      button.setAttribute('data-target','#updateStudentModal');
    }
    if (mode === 'delete') {
      this.deleteStudent=student;
      button.setAttribute('data-target','#deleteStudentModal');
    }
    container.appendChild(button);
    button.click();
  }

  

}



