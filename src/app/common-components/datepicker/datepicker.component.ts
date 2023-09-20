import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IonInput, IonicModule, ViewWillEnter } from '@ionic/angular';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DatepickerComponent implements OnInit {
  @Output() datePic = new EventEmitter<string>();
  @Input() showfield: string = '';
  @Input() issueDateFrom: string | undefined;
  @Input() issueDateTo: string | undefined;
  @Input() departureDate: any | undefined;

  constructor() {}

  ngOnInit() {
    // this.departureDate = new Date(this.departureDate).toISOString()
  }

  dateChanged(event: CustomEvent | any) {
    this.datePic.emit(event);
  }
}
