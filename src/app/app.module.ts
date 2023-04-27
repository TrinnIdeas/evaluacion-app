import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { DxAutocompleteModule  } from 'devextreme-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component'; // Agregar esta línea
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    HttpClientModule,
    FormsModule,
    
    
    DxAutocompleteModule,
    
    MatDialogModule,
    NgbModule
    
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
