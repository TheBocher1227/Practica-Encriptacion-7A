import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MislogsComponent } from './mislogs.component';

describe('MislogsComponent', () => {
  let component: MislogsComponent;
  let fixture: ComponentFixture<MislogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MislogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MislogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
