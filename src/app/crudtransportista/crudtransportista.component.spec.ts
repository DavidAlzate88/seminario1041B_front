import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudtransportistaComponent } from './crudtransportista.component';

describe('ConsultartransportistaComponent', () => {
  let component: CrudtransportistaComponent;
  let fixture: ComponentFixture<CrudtransportistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudtransportistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudtransportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
