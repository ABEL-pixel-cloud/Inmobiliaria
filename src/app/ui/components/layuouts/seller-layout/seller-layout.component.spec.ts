import { FooterComponent } from './../../molecules/footer/footer.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerLayoutComponent } from './seller-layout.component';
import { SidebarComponent } from '../../molecules/sidebar/sidebar.component';
import { NavbarComponent } from '../../molecules/navbar/navbar.component';
import { RouterModule } from '@angular/router';

describe('SellerLayoutComponent', () => {
  let component: SellerLayoutComponent;
  let fixture: ComponentFixture<SellerLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerLayoutComponent,FooterComponent,SidebarComponent,NavbarComponent],
        imports: [RouterModule.forRoot([])]
    });
    fixture = TestBed.createComponent(SellerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
