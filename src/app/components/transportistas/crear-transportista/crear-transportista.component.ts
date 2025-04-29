import {Component} from '@angular/core';
import {TransportistaService} from '../../../service/transportista/transportista.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {Transportista} from '../../../interface/transportista';

@Component({
  selector: 'app-crear-transportista',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './crear-transportista.component.html',
  styleUrl: './crear-transportista.component.scss'
})
export class CrearTransportistaComponent {

  estadosDisponibles: string[] = ['activo', 'inactivo'];
  nuevoTransportista: Transportista = {
    documento: 0,
    razonSocial: '',
    contacto: '',
    tipoVehiculo: '',
    capacidadCarga: '',
    estado: ''
  };

  constructor(private readonly transportistaService: TransportistaService,
              public activeModal: NgbActiveModal) {
  }


  crearTransportista(): void {
    console.log('CrearTransportistaComponent');
    this.transportistaService.crearTransportista(this.nuevoTransportista)
      .subscribe({
        next: (data) => {
          this.activeModal.close('Transportista creado');
        },
        error: (err) => {
          console.error('Error creando transportista', err);
          alert('Hubo un error al crear el transportista.');
        }
      });
  }
}
