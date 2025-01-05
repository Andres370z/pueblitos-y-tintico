import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMyProjectComponent } from './about-my-project.component';

describe('AboutMyProjectComponent', () => {
  let component: AboutMyProjectComponent;
  let fixture: ComponentFixture<AboutMyProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutMyProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutMyProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
