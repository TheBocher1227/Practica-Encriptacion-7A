import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MispaquetesComponent } from './mispaquetes.component';

describe('MispaquetesComponent', () => {
  let component: MispaquetesComponent;
  let fixture: ComponentFixture<MispaquetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MispaquetesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MispaquetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
