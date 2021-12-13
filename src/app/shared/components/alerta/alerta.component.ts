import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Alerta } from "../../models/alerta";

@Component({
  selector: "dio-app-alerta",
  templateUrl: "./alerta.component.html",
  styleUrls: ["./alerta.component.css"],
})
export class AlertaComponent implements OnInit {
  alerta = {
    titulo: "Sucesso!",
    descricao: "Seu registro foi cadastrado.",
    btnSucesso: "Ok",
    btnCancelar: "Cancelar",
    corBtnSucesso: "accent",
    corBtnCancelar: "warn",
    existeBtnFechar: false,
  } as Alerta

  constructor(
    public dialogRef: MatDialogRef<AlertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alerta
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.alerta.titulo = this.data.titulo || this.alerta.titulo;
      this.alerta.descricao = this.data.descricao || this.alerta.descricao;
      this.alerta.btnSucesso = this.data.btnSucesso || this.alerta.btnSucesso;
      this.alerta.btnCancelar = this.data.btnCancelar || this.alerta.btnCancelar;
      this.alerta.corBtnSucesso = this.data.corBtnSucesso || this.alerta.corBtnSucesso;
      this.alerta.corBtnCancelar = this.data.corBtnCancelar || this.alerta.corBtnCancelar;
      this.alerta.existeBtnFechar = this.data.existeBtnFechar || this.alerta.existeBtnFechar;
    }
  }
}
