import {Component, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TransportistaService} from '../../../service/transportista/transportista.service';
import {Transportista} from '../../../interface/transportista';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editar-transportista',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './editar-transportista.component.html',
  styleUrl: './editar-transportista.component.scss'
})
export class EditarTransportistaComponent {
  @Input() transportistaSeleccionado!: Transportista;
  estadosDisponibles: string[] = ['activo', 'inactivo'];

  constructor(private readonly transportistaService: TransportistaService,
              public activeModal: NgbActiveModal) {
  }

  guardarCambios(): void {
    this.transportistaService.actualizarTransportista(this.transportistaSeleccionado)
      .subscribe({
        next: (data) => {
          this.activeModal.close('Transportista modificado');
        },
        error: (err) => {
          console.error('Error actualizando transportista', err);
          if (err.status === 404) {
            alert('El transportista no se puede actualizar porque su estado esta: inactivo');
          } else {
            alert('Hubo un error al actualizar el transportista. Inténtalo de nuevo.');
          }
        }
      });
  }
}
