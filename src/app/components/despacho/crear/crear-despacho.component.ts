import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DespachoService } from '../../../service/despacho/despacho.service';
import { CommonModule } from '@angular/common';
import {Despacho} from '../../../interface/despacho';

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
  buttonTitle = '';
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
      urgente: [false],
      productos: this.fb.array([this.crearProductoFormGroup(0)])
    });
  }

  ngOnInit() {
    this.title = !this.despacho ? 'Crear nuevo despacho' : 'Editar despacho';
    this.buttonTitle = !this.despacho ? 'Crear despacho' : 'Editar despacho';
    if (this.despacho) {
      this.formularioDespacho.patchValue({
        id: this.despacho.id,
        codigoSeguimiento: this.despacho.codigoSeguimiento,
        nombreCompletoCliente: this.despacho.nombreCompletoCliente,
        documentoCliente: this.despacho.documentoCliente,
        direccionEntrega: this.despacho.direccionEntrega,
        contacto: this.despacho.contacto,
        urgente: this.despacho.urgente,
        productos: this.despacho.productos,
      })
    }
  }

  crearProductoFormGroup(id: number) {
    return this.fb.group({
      id,
      codigoProducto: [null,[Validators.required]],
      cantidad: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    })
  }

  agregarProducto(): void {
    this.productos.push(this.crearProductoFormGroup(this.productos.length));
  }

  removerProducto(index: number): void {
    this.productos.removeAt(index);
  }

  get productos(): FormArray {
    return this.formularioDespacho.get('productos') as FormArray;
  }

  crearDespacho(): void {
    if (this.formularioDespacho.valid) {

      this.despachoService.createDespacho(this.formularioDespacho.value).subscribe({
        next: (data) => {
          console.log(data);
          this.mensajeResultado = 'Despacho creado exitosamente.';
          this.mostrarMensaje = true;
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
