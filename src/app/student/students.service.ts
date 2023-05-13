import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
import { Student } from "src/app/student/student";

@Injectable({
    providedIn:'root'
})

export class StudentsService {

private apiServerUrl='http://localhost:8080';

constructor(private http: HttpClient){}

public getStudents():Observable<Student[]>{
    return this.http.get<Student[]>(`${this.apiServerUrl}/students/all`);
}

public addStudent(student: Student):Observable<Student>{
    return this.http.post<Student>(`${this.apiServerUrl}/students/add`, student);
}

public updateStudent(student: Student):Observable<Student>{
    return this.http.put<Student>(`${this.apiServerUrl}/students/update`, student);
}

public deleteStudent(studentId: number):Observable<any>{
    return this.http.delete(`${this.apiServerUrl}/students/delete/${studentId}`);
}

}

