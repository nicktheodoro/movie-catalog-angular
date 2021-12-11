import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "dio-app-alerta",
  templateUrl: "./alerta.component.html",
  styleUrls: ["./alerta.component.css"],
})
export class AlertaComponent implements OnInit {
  titulo = "Sucesso!";
  descricao = "Seu registro foi cadastrado.";
  btnSucesso = "Ok";
  btnCancelar = "Cancelar";
  corBtn = "primary";
  existeBtnFechar = false;

  constructor(
    public dialogRef: MatDialogRef<AlertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.titulo = this.data.titulo || this.titulo;
      this.descricao = this.data.descricao || this.descricao;
      this.btnSucesso = this.data.btnSucesso || this.btnSucesso;
      this.btnCancelar = this.data.btnCancelar || this.btnCancelar;
      this.corBtn = this.data.corBtn || this.corBtn;
      this.existeBtnFechar = this.data.existeBtnFechar || this.existeBtnFechar;
    }
  }
}
