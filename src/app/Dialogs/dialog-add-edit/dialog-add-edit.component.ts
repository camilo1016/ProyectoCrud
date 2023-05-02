import { Component, OnInit, Inject } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';

import { TipoIdentificacion } from 'src/app/Interfaces/tipo-identificacion';
import { Paciente } from 'src/app/Interfaces/paciente';
import { TipoIdentificacionService } from 'src/app/Services/tipo-identificacion.service';
import { PacienteService } from 'src/app/Services/paciente.service';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css'],
  providers: [
    {provide : MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class DialogAddEditComponent implements OnInit{

  formPaciente: FormGroup;
  tituloAccion: string = "Nueva";
  botonAccion: string = "Guardar";
  listaTipoIdentificacion: TipoIdentificacion[] = [];

  constructor(

    private dialogoReferencia: MatDialogRef<DialogAddEditComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _tipoIdentificacionServicio: TipoIdentificacionService,
    private _pacienteServicio: PacienteService,
    @Inject (MAT_DIALOG_DATA) public dataPaciente: Paciente

  ) {

    this.formPaciente = this.fb.group({

      nombreCompleto: ['', Validators.required],
      idTipoId: ['', Validators.required],
      numeroId: ['', Validators.required],
      consulta: ['', Validators.required],
      fechaConsulta: ['', Validators.required],

    })

    this._tipoIdentificacionServicio.getList().subscribe({
      next:(data) => {
        this.listaTipoIdentificacion = data;
      }, error:(e) => {}
    })

  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  addEditPaciente() {

    console.log(this.formPaciente.value)

    const modelo: Paciente = {
      idPaciente: 0,
      nombreCompleto: this.formPaciente.value.nombreCompleto,
      idTipoId: this.formPaciente.value.idTipoId,
      numeroId: this.formPaciente.value.numeroId,
      consulta: this.formPaciente.value.consulta,
      fechaConsulta: moment(this.formPaciente.value.fechaConsulta).format("DD/MM/YYYY")
    }

    if(this.dataPaciente == null) {

      this._pacienteServicio.add(modelo).subscribe({
        next:(data) => {
          this.mostrarAlerta("Consulta Creada para el Paciente", "Listo");
          this.dialogoReferencia.close("creado");
        }, error:(e) => {
          this.mostrarAlerta("No se pudo crear la Consulta para el Paciente", "Error");
        }
      })

    } else {

      this._pacienteServicio.update(this.dataPaciente.idPaciente, modelo).subscribe({
        next:(data) => {
          this.mostrarAlerta("Consulta Editada para el Paciente", "Listo");
          this.dialogoReferencia.close("editado");
        }, error:(e) => {
          console.log(e)
          this.mostrarAlerta("No se pudo Editar la Consulta para el Paciente", "Error");
        }
      })
      
    }

  }

  ngOnInit(): void {

    if(this.dataPaciente) {

      this.formPaciente.patchValue({
        nombreCompleto: this.dataPaciente.nombreCompleto,
        idTipoId: this.dataPaciente.idTipoId,
        numeroId: this.dataPaciente.numeroId,
        consulta: this.dataPaciente.consulta,
        fechaConsulta: moment(this.dataPaciente.fechaConsulta, "DD/MM/YYYY")
      })

      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";

    }

  }

}
