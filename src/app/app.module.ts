import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { MainComponent } from "./main/main.component";
import { MinmaxComponent } from "./minmax/minmax.component";
import { LocalmultiplayerComponent } from "./localmultiplayer/localmultiplayer.component";
import { EasyComponent } from "./easy/easy.component";
import { HomeComponent } from './home/home.component';
import { OptionsComponent } from './options/options.component';

@NgModule({
  declarations: [
    MinmaxComponent,
    LocalmultiplayerComponent,
    EasyComponent,
    MainComponent,
    HomeComponent,
    OptionsComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule {}
