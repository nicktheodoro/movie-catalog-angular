import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { LayoutModule } from "@angular/cdk/layout";
import { MAT_DATE_LOCALE } from "@angular/material/core";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing.module";

import { MaterialModule } from "./shared/material/material.module";
import { AlertaComponent } from "./shared/components/alerta/alerta.component";
import { TopoComponent } from "./shared/components/topo/topo.component";
import { RodapeComponent } from "./shared/components/rodape/rodape.component";

@NgModule({
  declarations: [AppComponent, AlertaComponent, TopoComponent, RodapeComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MaterialModule,
  ],
  entryComponents: [AlertaComponent],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "pt" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
