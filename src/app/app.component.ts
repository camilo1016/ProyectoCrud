
import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { Paciente } from './Interfaces/paciente';
import { PacienteService } from './Services/paciente.service';

import { MatSnackBar } from '@angular/material/snack-bar';

import {MatDialog} from '@angular/material/dialog';
import { DialogAddEditComponent } from './Dialogs/dialog-add-edit/dialog-add-edit.component';
import { DialogoDeleteComponent } from './Dialogs/dialogo-delete/dialogo-delete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['NombreCompleto', 'TipoIdentificacion', 'NumeroIdentificacion', 'Consulta', 'FechaConsulta', 'Acciones'];
  dataSource = new MatTableDataSource<Paciente>();

  constructor(
    private _pacienteServicio: PacienteService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
    ){

  }

  ngOnInit(): void {
      this.mostrarPacientes();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarPacientes() {
    this._pacienteServicio.getList().subscribe({
      next:(dataResponse) => {
        console.log(dataResponse)
        this.dataSource.data = dataResponse;
      }, error:(e) => {}
    })
  }

  dialogoNuevoPaciente() {
    this.dialog.open(DialogAddEditComponent, {
      disableClose: true,
      width: "450px"
    }).afterClosed().subscribe(resultado => {
      if(resultado === "creado"){
        this.mostrarPacientes();
      }
    })
  }

  dialogoEditarPaciente(dataPaciente: Paciente) {
    this.dialog.open(DialogAddEditComponent, {
      disableClose: true,
      width: "450px",
      data: dataPaciente
    }).afterClosed().subscribe(resultado => {
      if(resultado === "editado"){
        this.mostrarPacientes();
      }
    })
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  dialogoEliminarPaciente(dataPaciente: Paciente) {
    this.dialog.open(DialogoDeleteComponent, {
      disableClose: true,
      data: dataPaciente
    }).afterClosed().subscribe(resultado => {
      if(resultado === "eliminar"){
        
        this._pacienteServicio.delete(dataPaciente.idPaciente).subscribe({
          next:(data) => {
            this.mostrarAlerta("La Consulta del Paciente fue Eliminada", "Listo");
            this.mostrarPacientes();
          },
          error:(e) => {
            console.log(e)
          }
        })

      }
    })
  }

}

