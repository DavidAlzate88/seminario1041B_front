

import { Component, OnInit } from '@angular/core';
import { TransportistaService } from '../../../service/transportista/transportista.service';
import { CommonModule } from '@angular/common';  // Necesario para *ngIf, *ngFor
import { Transportista } from '../../../interface/transportista';
import { NgxPaginationModule } from 'ngx-pagination';
import {FormsModule} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditarTransportistaComponent} from '../editar-transportista/editar-transportista.component';
import {CrearTransportistaComponent} from '../crear-transportista/crear-transportista.component';




@Component({
  selector: 'app-consultartransportista',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule],
  templateUrl: './listar-transportista.component.html',
  //styleUrls: ['./consultartransportista.component.css']
})

export class ListarTransportistaComponent implements OnInit {

  transportistas: Transportista[] = [];
  resultadosBusqueda: Transportista[] = [];
  //transportistasFiltrados: Transportista[] = [];
  page = 1; // <-- Para manejar en qué página estás
  itemsPerPage = 10; // <-- Número de registros por página
  searchTerm = '';
  searchTermEstado = '';
  searchTermRazonSocial = '';
  estadosDisponibles: string[] = ['activo', 'inactivo'];

  cargando = false;
  error = '';

  // Transportista que se va a editar
  transportistaSeleccionado: Transportista = {
    documento: 0,
    razonSocial: '',
    contacto: '',
    tipoVehiculo: '',
    capacidadCarga: '',
    estado: ''
  };



  constructor(private readonly transportistaService: TransportistaService,
              private readonly modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.obtenerTransportistas();
  }

  obtenerTransportistas(): void {
    this.cargando = true;
    this.transportistaService.consultarTransportistas()
      .subscribe({
        next: (data) => {
          this.transportistas = data;
          this.cargando = false;
        },
        error: (err) => {
          this.error = 'Error al consultar transportistas';
          console.error(err);
          this.cargando = false;
        }
      });
  }

  get transportistasFiltrados(): Transportista[] {
    if (!this.searchTerm) {
      return this.transportistas;
    }
    const term = this.searchTerm.toLowerCase();
    return this.transportistas.filter(t =>
      t.razonSocial.toLowerCase().includes(term) ||
      t.contacto.toLowerCase().includes(term) ||
      t.tipoVehiculo.toLowerCase().includes(term) ||
      t.documento.toString().includes(term)
    );
  }


  buscarPorEstado(): void {
    if (!this.searchTermEstado) {
      this.resultadosBusqueda = [];
      return;
    }
    this.transportistaService.buscarPorEstado(this.searchTermEstado)
      .subscribe({
        next: (data) => {
          this.resultadosBusqueda = data;
          this.page = 1;
        },
        error: (err) => {
          console.error('Error buscando por estado', err);
        }
      });
  }

  buscarPorRazonSocial(): void {
    if (!this.searchTermRazonSocial) {
      this.resultadosBusqueda = [];
      return;
    }
    this.transportistaService.buscarPorRazonSocial(this.searchTermRazonSocial)
      .subscribe({
        next: (data) => {
          this.resultadosBusqueda = data;
          if (this.resultadosBusqueda.length === 0) {
            alert('No se encontraron transportistas con esa razón social.');
          }
          this.page = 1;
        },
        error: (err) => {
          console.error('Error buscando por razón social', err);
        }
      });
  }

  limpiarBusqueda(): void {
    this.resultadosBusqueda = [];
    this.searchTermEstado = '';
    this.searchTermRazonSocial = '';
    this.page = 1;
  }

  // Abrir el modal de creacion
  mostrarFormularioCrear(): void {
    const modalRef = this.modalService.open(CrearTransportistaComponent);

    modalRef.result.then(
      (result) => {
        if (result === 'Transportista creado') {
          console.log('Transportista creado exitosamente');
          this.limpiarBusqueda();
          this.obtenerTransportistas();
        }
      },
      (reason) => {
        console.log(reason);
      }
    )
  }

  eliminarTransportista(transportista: Transportista): void {
    const confirmacion = confirm(`¿Estás seguro de eliminar a ${transportista.razonSocial}?`);
    if (confirmacion) {
      this.transportistaService.eliminarTransportista(transportista.documento)
        .subscribe({
          next: (respuesta) => {
            alert(respuesta);

            // 🔥 Actualizar contenido de transportistasFiltrados SIN reasignar
            const indexFiltrado = this.transportistasFiltrados.findIndex(
              t => +t.documento === +transportista.documento
            );
            if (indexFiltrado > -1) {
              this.transportistasFiltrados.splice(indexFiltrado, 1);
            }

            // 🔥 Actualizar contenido de resultadosBusqueda (aquí SÍ puedes reasignar si no es readonly)
            this.resultadosBusqueda = this.resultadosBusqueda.filter(
              t => +t.documento !== +transportista.documento
            );

            if (this.transportistasFiltrados.length === 0 || this.resultadosBusqueda.length === 0) {
              this.page = 1;
            }
          },
          error: (err) => {
            console.error('Error eliminando transportista', err);
            alert('Hubo un error al eliminar el transportista.');
          }
        });
    }
  }


  editarTransportista(transportista: Transportista): void {
    const modalRef = this.modalService.open(EditarTransportistaComponent);
    modalRef.componentInstance.transportistaSeleccionado = transportista;
    modalRef.result.then(
      (result) => {
        if (result === 'Transportista modificado') {
          console.log('Transportista modificado exitosamente');
          this.limpiarBusqueda();
        }
      },
      (reason) => {
        console.log(reason);
      }
    )
  }
}
