import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { MainComponent } from "./main/main.component";
import { MinmaxComponent } from "./game/minmax/minmax.component";
import { LocalmultiplayerComponent } from "./game/localmultiplayer/localmultiplayer.component";
import { EasyComponent } from "./game/easy/easy.component";
import { HomeComponent } from "./home/home.component";
import { OptionsComponent } from "./options/options.component";
import { LoginComponent } from "./user/login/login.component";
import { RegisterComponent } from "./user/register/register.component";

@NgModule({
  declarations: [
    MinmaxComponent,
    LocalmultiplayerComponent,
    EasyComponent,
    MainComponent,
    HomeComponent,
    OptionsComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule {}
