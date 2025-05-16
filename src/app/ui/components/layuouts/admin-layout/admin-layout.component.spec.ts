import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayoutComponent } from './admin-loyout.component';
import { FooterComponent } from '../../molecules/footer/footer.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../molecules/sidebar/sidebar.component';
import { NavbarComponent } from '../../molecules/navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';



describe('AdminLayoutComponent', () => {
  let component: AdminLayoutComponent;
  let fixture: ComponentFixture<AdminLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminLayoutComponent,FooterComponent,SidebarComponent,NavbarComponent],
      imports:[RouterModule,RouterTestingModule],
    });
    fixture = TestBed.createComponent(AdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
