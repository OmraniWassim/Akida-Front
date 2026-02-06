import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCommandsComponent } from './gestion-commands.component';

describe('GestionCommandsComponent', () => {
  let component: GestionCommandsComponent;
  let fixture: ComponentFixture<GestionCommandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionCommandsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
