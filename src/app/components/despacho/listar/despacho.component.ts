import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DespachoService } from '../../../service/despacho/despacho.service';
import { Despacho } from '../../../interface/despacho';
import { CrearDespachoComponent } from '../crear/crear-despacho.component';

@Component({
  selector: 'app-despacho',
  imports: [
    CommonModule
  ],
  templateUrl: './despacho.component.html',
  styleUrl: './despacho.component.scss'
})
export class DespachoComponent implements OnInit {
  despacho: Despacho[] = [];

  constructor(
    private readonly despachoService: DespachoService,
    private readonly modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.cargarDespacho();
  }

  cargarDespacho(): void {
    this.despachoService.getDespacho().subscribe({
      next: (data) => {
        this.despacho = data;
      },
      error: (error) => {
        console.error('Error al cargar los despachos:', error);
      }
    });
  }

  abrirModalCrearDespacho(): void {
    const modalRef = this.modalService.open(CrearDespachoComponent);
    modalRef.result.then(
      (result) => {
        if (result === 'Despacho creado') {
          this.cargarDespacho();
        }
      },
      (reason) => {
        console.log(reason);
      }
    );
  }

  editarDespacho(despacho: Despacho): void {
    console.log(`Editar despacho con id: ${despacho.id}`);
    const modalRef = this.modalService.open(CrearDespachoComponent);
    modalRef.componentInstance.despacho = despacho;
    modalRef.result.then(
      (result) => {
        if (result === 'Despacho creado') {
          this.cargarDespacho();
        }
      },
      (reason) => {
        console.log(reason);
      }
    );
  }

  eliminarDespacho(documento: number): void {
    if (confirm(`¿Estás seguro de que deseas eliminar el despacho con documento ${documento}?`)) {
      this.despachoService.deleteDespacho(documento).subscribe({
        next: (response) => {
          console.log('Despacho eliminado exitosamente:', response);
          this.cargarDespacho();
        },
        error: (error) => {
          console.error(`Error al eliminar el despacho con id ${documento}:`, error);
        }
      });
    }
  }
}
