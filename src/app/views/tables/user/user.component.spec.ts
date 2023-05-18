import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { UserService } from 'src/app/services/user/user.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [UserService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('Debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('Debería realizarse el llamado al Array de usuarios', async () => {
    const response = [{ id: "1", username: 'User 1' }, { id: "2", username: 'User 2' }];
    spyOn(userService, 'getUserList').and.returnValue(of(response));

    component.getUserList();

    expect(component.userArray).toEqual(response);
  });

  it('Debería realizar la llamada para editar a un usuario y cerrar el popup', async () => {
    const editingElement = { id: "1", username: "Amongus", email: "correo@editado", password: "password" }
    const userData = { username: 'Updated User', email: 'updated@example.com', password: 'newpassword' };

    spyOn(userService, 'updateUserInfo').and.returnValue(of({}));
    spyOn(component, 'closePopup');

    component.editingElement = editingElement;
    component.userData = userData;
    component.editUser();

    expect(userService.updateUserInfo).toHaveBeenCalledWith(
      editingElement.id,
      userData.username,
      userData.email,
      userData.password
    );

    expect(component.closePopup).toHaveBeenCalled();
  });

  it('Debería eliminar al usuario', async () => {
    const userId = '1';
    spyOn(userService, 'deleteUser').and.returnValue(of({}));

    await component.deleteUser(userId);

    expect(userService.deleteUser).toHaveBeenCalledWith(userId);
  });

  it('Debería abrir el popup y mandar un dato para editar', () => {
    const editingElement = { id: "1", username: 'User 1' };
    const popup: HTMLElement = document.createElement('div');
    popup.className = 'popup';
    document.body.appendChild(popup);

    component.openPopup(editingElement);

    const computedStyle = getComputedStyle(popup);
    expect(computedStyle.display).toBe('block');
    expect(component.editingElement).toEqual(editingElement);
  });

  it('Debería cerrar el popup de edición', () => {
    const popup: HTMLElement = document.createElement('div');
    popup.className = 'popup';
    document.body.appendChild(popup);

    component.closePopup();

    expect(popup.style.display).toBe('');
  });
});
