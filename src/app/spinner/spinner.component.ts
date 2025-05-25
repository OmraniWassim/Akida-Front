import { Component } from '@angular/core';
import { LoaderService } from '../interceptor/Loader.service';

@Component({
  selector: 'app-spinner',
  standalone: false,
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  constructor(public loader: LoaderService) { }

  ngOnInit() {
    console.log('SpinnerComponent initialized');
    console.log('boolean value of loader:', this.loader.getLoading())
    ;
  }

}
