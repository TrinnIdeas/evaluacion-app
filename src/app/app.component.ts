import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PracticaService } from './servicios/practica.service';
import { CiudadesPaisesService } from './servicios/ciudadespaises.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('content') content!: ElementRef;
  @ViewChild('popupButton') popupButton!: ElementRef;
  
  alertMessage:string = '<b>Por favor verifique los datos. Todos los campos son requeridos</b>';

  title = 'prueba-tecnica';
  formulario: FormGroup;
  cities: any ; // Arreglo de ciudades y países
  cities2: any ; // Arreglo de ciudades y países
  selectedCity: any; // Ciudad seleccionada
  alertVisible:boolean=false;
  searchValue: string = '';
  filteredCities: any[] = [];
  searchModeOption = 'contains';
  searchExprOption: any = 'formatted';
  searchTimeoutOption = 200;

  minSearchLengthOption = 0;

  showDataBeforeSearchOption = false;
  selectedCityName:string='';
  
  private searchSubject: Subject<string> = new Subject();


  constructor(private fb: FormBuilder,
    private formularioService:PracticaService,
    private ciudadesPaisesService:CiudadesPaisesService,
    private modalService: NgbModal) { 

    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      fecha: [new Date(), Validators.required],
      ciudadEstado: ['', Validators.required]
    });
  }

  ngOnInit() {
   
    
    
    this.filteredCities = this.cities;
    this.setDefaultDate();   
    this.onCityInputArray_Text();
    
  }

  submit() {
    let valid:boolean=false;
    this.alertVisible = false;
    this.alertMessage = '';
    this.formulario.patchValue({
      ciudadEstado: this.selectedCity
    });


    
      if(this.validarCamposNulos()){
        this.formularioService.enviarFormulario(this.formulario.value)
        .subscribe(
          response => {
            
            this.formulario.reset();
            this.selectedCity = '';

            this.alertMessage = "<b>La información se envió correctamente</b>";
            this.openPopup();
          },
          error => {
            this.alertMessage = "<b>"+error+"</b>";
            
            this.openPopup();
          }
        );
      }
      else {      
        this.openPopup();
      }
      
    
  }

  setDefaultDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month: string | number = currentDate.getMonth() + 1;
    let day: string | number = currentDate.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    const formattedDate = year + '-' + month + '-' + day;
    
    this.formulario.get('fecha')?.setValue(formattedDate);
  }

  onCitySelected(city: any) {
    this.selectedCity = city;
    this.searchValue = '';
  }
  
  



  onCityInputArray_Text() {    

    this.ciudadesPaisesService.buscarCiudadesArray('Mexico').subscribe(s=>{
      this.cities2 = s;
      
    })
    
  }

  

  openPopup() {
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      console.log(`Popup cerrado con el botón ${result}`);
    }, (reason) => {
      console.log(`Popup cerrado con la razón ${reason}`);
    });
  }

  validarCamposNulos():boolean {
    const nombre = this.formulario.controls['nombre'].value;
    const email = this.formulario.controls['email'].value;
    const telefono = this.formulario.controls['telefono'].value;
    const fecha = this.formulario.controls['fecha'].value;
    const ciudadEstado = this.formulario.controls['ciudadEstado'].value;

    let valido:boolean=true;
   console.log(nombre);
    if (!nombre || nombre== "" || this.formulario.controls['nombre'].status == 'INVALID') {
      
      this.alertMessage = '<br>Error en "Nombre"';
      valido = false;
    }
  
    if (!email || email== "" || this.formulario.controls['email'].status == 'INVALID') {
      this.alertMessage = this.alertMessage + '<br>Revisar el valor de "Email" ';
      valido = false;
    }
  
    if (!telefono || telefono == ""  || this.formulario.controls['telefono'].status == 'INVALID' ) {
      this.alertMessage = this.alertMessage + '<br>Revisar el valor de "Telefono"';
      valido = false;
    }
  
    if (!fecha || fecha== "" || this.formulario.controls['fecha'].status == 'INVALID') {
      this.alertMessage = this.alertMessage + '<br>Revisar el valor de "Fecha" ';
      valido = false;
 
    }

    if(!this.validarFechaRango100(fecha)){
      this.alertMessage = this.alertMessage + '<br>Revisar el valor de "Fecha" debe de estar entre hoy y 100 años atrás ';
      valido = false;
    }
  
    if (!this.selectedCity || this.selectedCity== "" || this.formulario.controls['ciudadEstado'].status == 'INVALID') {
      this.alertMessage = this.alertMessage + '<br>Revisar el valor de "Ciudad Estado"';
      valido = false;
 
    }

    return valido;
  }

  validarFechaRango100(value:Date): boolean {
    const fecha = new Date(value);
      const hoy = new Date();
      const hace100Anios = new Date();
      hace100Anios.setFullYear(hace100Anios.getFullYear() - 100);
  
      if (fecha < hace100Anios || fecha > hoy) {
        return false;
      }
  
      return true;
  }
  
  
  
}
