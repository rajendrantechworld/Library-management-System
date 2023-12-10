import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ColorEvent } from 'ngx-color';
@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.scss']
})
export class ColorPaletteComponent implements OnInit {
  /**
   * Global minimalist color palette component
   */
  selectedClr = '#22194D';
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  coloChangeComplete($event: ColorEvent,index){
    let color = $event.color.hex;
    this.selectedClr = color;
  }

  submit() {
    this.activeModal.close(this.selectedClr);
  }

  close() {
    this.activeModal.close();
  }

}
