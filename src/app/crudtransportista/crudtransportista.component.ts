declare const bootstrap: {
  Modal: {
    new (element: Element, options?: object): BootstrapModal;
    getInstance(element: Element): BootstrapModal | null;
    getOrCreateInstance(element: Element): BootstrapModal;
  };
};

declare class BootstrapModal {
  show(): void;
  hide(): void;
}

import { Component, OnInit } from '@angular/core';
import { TransportistaService } from '../service/transportista.service';
import { CommonModule } from '@angular/common';  // Necesario para *ngIf, *ngFor
import { Transportista } from '../interface/transportista';
import { NgxPaginationModule } from 'ngx-pagination';
import {FormsModule} from '@angular/forms';




@Component({
  selector: 'app-consultartransportista',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule],
  templateUrl: './crudtransportista.component.html',
  //styleUrls: ['./consultartransportista.component.css']
})

export class CrudtransportistaComponent implements OnInit {

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

  mostrarFormularioCrear = false;

  nuevoTransportista: Transportista = {
    documento: 0,
    razonSocial: '',
    contacto: '',
    tipoVehiculo: '',
    capacidadCarga: '',
    estado: ''
  };

  // Transportista que se va a editar
  transportistaSeleccionado: Transportista = {
    documento: 0,
    razonSocial: '',
    contacto: '',
    tipoVehiculo: '',
    capacidadCarga: '',
    estado: ''
  };



  constructor(private transportistaService: TransportistaService) {
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

  crearTransportista(): void {
    this.transportistaService.crearTransportista(this.nuevoTransportista)
      .subscribe({
        next: (data) => {
          alert('Transportista creado exitosamente');
          // Añadir el nuevo transportista en la tabla para que se vea de inmediato
          this.transportistasFiltrados.push(data);
          this.resultadosBusqueda.push(data);

          // Limpiar el formulario
          this.nuevoTransportista = {
            documento: 0,
            razonSocial: '',
            contacto: '',
            tipoVehiculo: '',
            capacidadCarga: '',
            estado: ''
          };
          this.mostrarFormularioCrear = false; // Cerrar el formulario
        },
        error: (err) => {
          console.error('Error creando transportista', err);
          alert('Hubo un error al crear el transportista.');
        }
      });
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

  // Abrir el modal de edición
  editarTransportista(transportista: Transportista): void {
    this.transportistaSeleccionado = { ...transportista }; // Hacer copia para edición
    const modalElement = document.getElementById('editarTransportistaModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  guardarCambios(): void {
    this.transportistaService.actualizarTransportista(this.transportistaSeleccionado)
      .subscribe({
        next: (data) => {
          alert('Transportista actualizado exitosamente.');

          // Actualizar en transportistasFiltrados
          const indexFiltrado = this.transportistasFiltrados.findIndex(t => t.documento === data.documento);
          if (indexFiltrado !== -1) {
            this.transportistasFiltrados[indexFiltrado] = data;
          }

          // Actualizar en resultadosBusqueda
          const indexBusqueda = this.resultadosBusqueda.findIndex(t => t.documento === data.documento);
          if (indexBusqueda !== -1) {
            this.resultadosBusqueda[indexBusqueda] = data;
          }

          // Cerrar el modal
          const modalElement = document.getElementById('editarTransportistaModal');
          if (modalElement) {
            const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
            modal.hide();
          }
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

  /*editarTransportista(transportista: Transportista): void {
    console.log('Editar transportista:', transportista);
    alert(`Editar transportista: ${transportista.razonSocial}`);
    // Aquí puedes abrir un modal o navegar a otra página para editar
  }*/


}
