import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDespachoComponent } from './crear-despacho.component';

describe('CrearDespachoComponent', () => {
  let component: CrearDespachoComponent;
  let fixture: ComponentFixture<CrearDespachoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearDespachoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearDespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
