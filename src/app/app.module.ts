import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//1. -Para trabajar con Reactive Forms
import {ReactiveFormsModule} from '@angular/forms';

//2. -Para trabajar con las peticiones http
import {HttpClientModule} from '@angular/common/http';

//3. -Para trabajar con las tabalas de material
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

//4. -Para trabajar con controles de formularios de material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCommonModule} from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';

//5. -Para trabajar con mensajes alertas de material
import {MatSnackBarModule} from '@angular/material/snack-bar';

//6. -Para trabajar con iconos de material
import {MatIconModule} from '@angular/material/icon';

//7. -Para trabajar con modales de material
import {MatDialogModule} from '@angular/material/dialog';

//8. -Para trabjar con cuadriculas
import {MatGridListModule} from '@angular/material/grid-list';
// import { ModalsComponent } from './modals/modals.component';
import { DialogAddEditComponent } from './Dialogs/dialog-add-edit/dialog-add-edit.component';
import { DialogoDeleteComponent } from './Dialogs/dialogo-delete/dialogo-delete.component';


@NgModule({
  declarations: [
    AppComponent,
    // ModalsComponent,
    DialogAddEditComponent,
    DialogoDeleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCommonModule,
    MomentDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
