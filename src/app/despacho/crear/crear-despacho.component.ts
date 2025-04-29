import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DespachoService } from '../../service/despacho/despacho.service';
import { CommonModule } from '@angular/common';
import {Despacho} from '../../interface/despacho';

@Component({
  selector: 'app-crear-despacho',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './crear-despacho.component.html',
  styleUrl: './crear-despacho.component.scss'
})
export class CrearDespachoComponent implements OnInit {
  @Input() despacho!: Despacho;
  title = '';
  formularioDespacho: FormGroup;
  mensajeResultado: string = '';
  mostrarMensaje: boolean = false;

  constructor(
    private readonly despachoService: DespachoService,
    private readonly fb: FormBuilder,
    public activeModal: NgbActiveModal,
  ) {
    this.formularioDespacho = this.fb.group({
      id: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      codigoSeguimiento: ['', [Validators.required]],
      nombreCompletoCliente: ['', [Validators.required]],
      documentoCliente: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      direccionEntrega: ['', [Validators.required]],
      contacto: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      urgente: [false]
    });
  }

  ngOnInit() {
    this.title = !this.despacho ? 'Crear nuevo despacho' : 'Editar despacho';
  }

  crearDespacho(): void {
    if (this.formularioDespacho.valid) {
      const nuevoDespacho: Despacho = {...this.formularioDespacho.value,
        producto: [
          {
            id: 0,
            codigoProducto: "PD000",
            cantidad: 10,
            descripcion: "Producto prueba"
          }
        ]
      };

      this.despachoService.createDespacho(nuevoDespacho).subscribe({
        next: (data) => {
          console.log(data);
          this.mensajeResultado = 'Despacho creado exitosamente.';
          this.mostrarMensaje = true;
          // Opcional: Cerrar el modal después de la creación exitosa
          this.activeModal.close('Despacho creado');
          this.formularioDespacho.reset();
        },
        error: (error) => {
          console.error('Error al crear el despacho:', error);
          this.mensajeResultado = 'Error al crear el despacho.';
          this.mostrarMensaje = true;
        }
      });
    } else {
      this.formularioDespacho.markAllAsTouched();
      this.mensajeResultado = 'Por favor, complete todos los campos correctamente.';
      this.mostrarMensaje = true;
    }
  }

  cerrarMensaje(): void {
    this.mostrarMensaje = false;
  }
}
