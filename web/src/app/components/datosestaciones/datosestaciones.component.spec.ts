import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosestacionesComponent } from './datosestaciones.component';

describe('DatosestacionesComponent', () => {
  let component: DatosestacionesComponent;
  let fixture: ComponentFixture<DatosestacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosestacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosestacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
