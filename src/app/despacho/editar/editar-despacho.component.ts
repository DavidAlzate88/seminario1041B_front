import {Component, Input, OnInit} from '@angular/core';
import {Despacho} from '../../interface/despacho';

@Component({
  selector: 'app-editar-despacho',
  imports: [],
  templateUrl: './editar-despacho.component.html',
  styleUrl: './editar-despacho.component.scss'
})
export class EditarDespachoComponent implements OnInit {
  @Input() despacho!: Despacho;

  ngOnInit() {
    console.log(this.despacho);
  }
}
