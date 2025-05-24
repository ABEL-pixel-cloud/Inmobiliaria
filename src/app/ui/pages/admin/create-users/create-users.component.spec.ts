import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateUsersComponent } from './create-users.component';
import { CreateUserComponent } from 'src/app/ui/components/organisms/create-user/create-user.component';
import { PagesModule } from '../../pages.module';
import { ToastrModule } from 'ngx-toastr';

describe('CreateUsersComponent', () => {
  let component: CreateUsersComponent;
  let fixture: ComponentFixture<CreateUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUsersComponent,CreateUserComponent],
       imports: [PagesModule,HttpClientTestingModule,ToastrModule.forRoot(),],
    });
    fixture = TestBed.createComponent(CreateUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
