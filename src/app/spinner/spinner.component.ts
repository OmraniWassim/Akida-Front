import { Component } from '@angular/core';
import { LoaderService } from '../interceptor/Loader.service';

@Component({
  selector: 'app-spinner',
  standalone: false,
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {

  constructor(public loader: LoaderService) { }


}
