import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import { UserService } from 'src/app/services/user/user.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [UserService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('Los campos del formulario deberían estar indefinidos', () => {
    expect(component.formItem.value).toEqual({
      username: undefined,
      email: undefined,
      password: undefined,
      passwordConfirmation: undefined
    });
  });

  it('Debe alertar en caso de que las constraseñas no coincidan', () => {
    spyOn(window, 'alert');

    component.userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
      passwordConfirmation: 'differentpassword'
    };

    component.userRegister();

    expect(window.alert).toHaveBeenCalledWith('Las contraseñas no coinciden');
  });
});
