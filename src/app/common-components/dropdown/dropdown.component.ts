import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { GetcoredataService } from 'src/app/services/getcoredata.service';
import { HttpService } from 'src/app/shared/http.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, IonicSelectableComponent],
  host: {
    '(document:click)': 'clickOutSideClose($event)',
  },
})
export class DropdownComponent implements OnInit {
  @Output() dropDownEmit = new EventEmitter<any>();
  @Input() flightData: any;

  @Input() isOriginList: any;
  @Input() isDestiniList: any;
  @Input() isAirline: any;
  @Input() value: any;
  airline: any = [];

  constructor(
    private getCoreService: GetcoredataService,
    private _eref: ElementRef,
    private http: HttpService,
  ) {}

  ngOnInit() {
    this.airline = [
      {
        name: 'CargoDemo',
        url: 'https://cargodemo.proverne.com/cargo/services',
      },
      { name: 'QuikJet', url: 'https://qo-test.proverne.com/cargo/services' },
    ];
  }

  clickOutSideClose(event: { target: any }) {
    // console.log('event',event)
    if (!this._eref.nativeElement.contains(event.target)){
      this.isOriginList = false;
      this.isDestiniList = false;
      // this.isAirline = false
    }
      // or some similar check
  }

  onSelect(origin: string, name: string, field: string) {
    this.dropDownEmit.emit({ origin: origin, originName: name, field: field });
  }

  onSelectAirline(name: string, url: string) {
    this.dropDownEmit.emit({ name: name, url: url });
  }
}
