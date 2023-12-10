import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  currentProgram
  program: BehaviorSubject<number>;
  constructor() {
      let current = JSON.parse(localStorage.getItem('program'))
      this.currentProgram = current.program_id
      this.program = new BehaviorSubject(this.currentProgram);
  }

  nextProgram(e) {
      this.program.next(e)
  }
}