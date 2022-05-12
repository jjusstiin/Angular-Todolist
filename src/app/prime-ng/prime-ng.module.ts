import { NgModule } from '@angular/core';
import {ButtonModule} from 'primeng/button';


const  primeNGComponent = [
  ButtonModule
]

@NgModule({
  imports: [primeNGComponent],
  exports: [primeNGComponent]
})
export class PrimeNGModule { }
