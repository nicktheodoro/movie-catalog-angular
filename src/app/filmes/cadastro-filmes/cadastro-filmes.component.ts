import { FilmesService } from "./../../core/filmes.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidarCamposService } from "src/app/shared/components/campos/validarCampos.service";
import { Filme } from "src/app/shared/models/filme";
import { MatDialog } from "@angular/material";
import { AlertaComponent } from "src/app/shared/components/alerta/alerta.component";

@Component({
  selector: "dio-cadastro-filmes",
  templateUrl: "./cadastro-filmes.component.html",
  styleUrls: ["./cadastro-filmes.component.scss"],
})
export class CadastroFilmesComponent implements OnInit {
  cadastro: FormGroup;
  generos: Array<string>;

  constructor(
    public dialog: MatDialog,
    public validacao: ValidarCamposService,
    private fb: FormBuilder,
    private FilmesService: FilmesService
  ) {}

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    this.cadastro = this.fb.group({
      titulo: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ],
      ],
      urlFoto: ["", [Validators.minLength(10)]],
      dtLancamento: ["", [Validators.required]],
      descricao: [""],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDB: ["", [Validators.minLength(10)]],
      genero: ["", [Validators.required]],
    });

    this.generos = [
      "Ação",
      "Aventura",
      "Comédia",
      "Documentário",
      "Drama",
      "Faroeste",
      "Fantasia",
      "Ficção científica",
      "Filmes de guerra",
      "Mistério",
      "Musical",
      "Romance",
      "Terror",
      "Thriller",
    ];
  }

  submit(): void {
    this.cadastro.markAllAsTouched();

    if (this.cadastro.invalid) {
      return;
    }

    const filme = this.cadastro.getRawValue() as Filme;
    this.salvar(filme);
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private salvar(filme: Filme): void {
    this.FilmesService.salvar(filme).subscribe(
      () => {
        const dialogRef = this.dialog.open(AlertaComponent);
        this.reiniciarForm();
      },
      () => {
        alert("Erro ao salvar");
      }
    );
  }
}
