import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTransportistaComponent } from './listar-transportista.component';

describe('ConsultartransportistaComponent', () => {
  let component: ListarTransportistaComponent;
  let fixture: ComponentFixture<ListarTransportistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarTransportistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarTransportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
