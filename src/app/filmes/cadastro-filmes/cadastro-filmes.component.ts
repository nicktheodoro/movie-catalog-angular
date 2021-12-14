import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material";

import { AlertaComponent } from "src/app/shared/components/alerta/alerta.component";

import { Alerta } from "src/app/shared/models/alerta";
import { Filme } from "src/app/shared/models/filme";

import { FilmesService } from "./../../core/filmes.service";
import { ValidarCamposService } from "src/app/shared/components/campos/validarCampos.service";

@Component({
  selector: "dio-cadastro-filmes",
  templateUrl: "./cadastro-filmes.component.html",
  styleUrls: ["./cadastro-filmes.component.scss"],
})
export class CadastroFilmesComponent implements OnInit {
  id: number;
  cadastro: FormGroup;
  generos: Array<string>;

  constructor(
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private filmesService: FilmesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];

    if (this.id) {
      this.filmesService
        .visualizar(this.id)
        .subscribe((filme: Filme) => this.criarFormulario(filme));
    } else {
      this.criarFormulario(this.criarFilmeEmBranco());
    }

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

    if (this.id) {
      filme.id = this.id;
      this.editar(filme);
    } else {
      this.salvar(filme);
    }
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private criarFormulario(filme: Filme): void {
    this.cadastro = this.fb.group({
      titulo: [
        filme.titulo,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ],
      ],
      urlFoto: [filme.urlFoto, [Validators.minLength(10)]],
      dtLancamento: [filme.dtLancamento, [Validators.required]],
      descricao: [filme.descricao],
      nota: [
        filme.nota,
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
      urlIMDB: [filme.urlIMDB, [Validators.minLength(10)]],
      genero: [filme.genero, [Validators.required]],
    });
  }

  private criarFilmeEmBranco(): Filme {
    return {
      id: null,
      titulo: null,
      dtLancamento: null,
      urlFoto: null,
      descricao: null,
      nota: null,
      urlIMDB: null,
      genero: null,
    } as Filme;
  }
  private salvar(filme: Filme): void {
    this.filmesService.salvar(filme).subscribe(
      () => {
        const config = {
          data: {
            btnSucesso: "Ir para a listagem",
            btnCancelar: "Cadastrar um novo filme",
            corBtnCancelar: "primary",
            existeBtnFechar: true,
          } as Alerta,
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe((opcao: boolean) => {
          if (opcao) {
            this.router.navigateByUrl("filmes");
          } else {
            this.reiniciarForm();
          }
        });
      },
      () => {
        const config = {
          data: {
            titulo: "Erro",
            descricao:
              "Não foi possível cadastrar o seu registro, tente novamente mais tarde.",
            btnSucesso: "Fechar",
            corBtnSucesso: "warn",
          } as Alerta,
        };
        this.dialog.open(AlertaComponent, config);
      }
    );
  }

  private editar(filme: Filme): void {
    this.filmesService.editar(filme).subscribe(
      () => {
        const config = {
          data: {
            descricao: "Seu registro foi atualizado com sucesso!",
            btnSucesso: "Ir para a listagem",
          } as Alerta,
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef
          .afterClosed()
          .subscribe(() => this.router.navigateByUrl("filmes"));
      },
      () => {
        const config = {
          data: {
            titulo: "Erro ao editar o registro!",
            descricao:
              "Não conseguimos editar seu registro, favor tentar novamente mais tarde",
            corBtnSucesso: "warn",
            btnSucesso: "Fechar",
          } as Alerta,
        };
        this.dialog.open(AlertaComponent, config);
      }
    );
  }
}
