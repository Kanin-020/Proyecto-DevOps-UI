import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryComponent } from './history.component';
import { HistoryService } from 'src/app/services/history/history.service';
import { SessionGuard } from 'src/app/guards/session.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let historyService: HistoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoryComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [HistoryService, SessionGuard]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    historyService = TestBed.inject(HistoryService);
    fixture.detectChanges();
  });

  it('Debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('Debería realizar la llamada para obtener el Array de historiales', () => {
    const response = [{ id: "1", fecha_cambio: '2023-05-17', detalle_cambio: 'Change 1', responsable: 1, proyecto_asignado: 1 }];

    spyOn(historyService, 'getHistoryList').and.returnValue(of(response));

    component.getHistoryList();

    expect(historyService.getHistoryList).toHaveBeenCalled();
    expect(component.historyArray).toEqual(response);
  });

  it('Debería realizar la llamada para crear un historial y cerrar el popup', () => {
    const historyData = { fecha_cambio: '2023-05-18', detalle_cambio: 'New change', responsable: 2, proyecto_asignado: 2 };

    spyOn(historyService, 'addHistory').and.returnValue(of({}));
    spyOn(component, 'closeAddPopup');

    component.historyData = historyData;
    component.createHistory();

    expect(historyService.addHistory).toHaveBeenCalledWith(
      historyData.fecha_cambio,
      historyData.detalle_cambio,
      historyData.responsable,
      historyData.proyecto_asignado
    );
    expect(component.closeAddPopup).toHaveBeenCalled();
  });

  it('Debería realizar una llamada para editar el historial y cerrar el popup', () => {
    const editingElement = { id: "1", fecha_cambio: '2023-05-17', detalle_cambio: 'Change 1', responsable: 1, proyecto_asignado: 1 };
    const historyData = { fecha_cambio: '2023-05-18', detalle_cambio: 'Updated change', responsable: 2, proyecto_asignado: 2 };

    spyOn(historyService, 'updateHistoryInfo').and.returnValue(of({}));
    spyOn(component, 'closeEditorPopup');

    component.editingElement = editingElement;
    component.historyData = historyData;
    component.editHistory();

    expect(historyService.updateHistoryInfo).toHaveBeenCalledWith(
      editingElement.id,
      historyData.fecha_cambio,
      historyData.detalle_cambio,
      historyData.responsable,
      historyData.proyecto_asignado
    );
    expect(component.closeEditorPopup).toHaveBeenCalled();
  });

  it('Debería realizar una llamada para eliminar un historial', () => {
    const historyId = '1';

    spyOn(historyService, 'deleteHistory').and.returnValue(of({}));

    component.deleteHistory(historyId);

    expect(historyService.deleteHistory).toHaveBeenCalledWith(historyId);
  });

  it('Debería abrir el popup para agregar', () => {
    const popup: HTMLElement = document.createElement('div');
    popup.className = 'popupAdd';
    document.body.appendChild(popup);

    component.openAddPopup();

    const computedStyle = getComputedStyle(popup);
    expect(computedStyle.display).toBe('block');
  });

  it('Debería cerrar el popup para agregar', () => {
    const popup: HTMLElement = document.createElement('div');
    popup.className = 'popupAdd';
    document.body.appendChild(popup);

    component.closeAddPopup();

    expect(popup.style.display).toBe('');
  });

  it('Debería abrir el popup y mandar un dato para editar', () => {
    const editingElement = { id: "1", fecha_cambio: '2023-05-17', detalle_cambio: 'Change 1', responsable: 1, proyecto_asignado: 1 };
    const popup: HTMLElement = document.createElement('div');
    popup.className = 'popupEdit';
    document.body.appendChild(popup);

    component.openEditorPopup(editingElement);

    const computedStyle = getComputedStyle(popup);
    expect(computedStyle.display).toBe('block');
    expect(component.editingElement).toEqual(editingElement);
  });

  it('Debería cerrar el popup de edición', () => {
    const popup: HTMLElement = document.createElement('div');
    popup.className = 'popupEdit';
    document.body.appendChild(popup);

    component.closeEditorPopup();

    expect(popup.style.display).toBe('');
  });
});
