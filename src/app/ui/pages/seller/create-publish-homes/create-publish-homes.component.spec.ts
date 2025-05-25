import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePublishHomesComponent } from './create-publish-homes.component';
import { CreatePublishHomeComponent } from 'src/app/ui/components/organisms/create-publish-home/create-publish-home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { OrganismsModule } from 'src/app/ui/components/organisms/organisms.module';

describe('CreatePublishHomesComponent', () => {
  let component: CreatePublishHomesComponent;
  let fixture: ComponentFixture<CreatePublishHomesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePublishHomesComponent],
       imports: [HttpClientTestingModule,  ToastrModule.forRoot(),OrganismsModule],
    });
    fixture = TestBed.createComponent(CreatePublishHomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
