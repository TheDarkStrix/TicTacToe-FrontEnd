import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { LocalmultiplayerComponent } from "./game/localmultiplayer/localmultiplayer.component";
import { EasyComponent } from "./game/easy/easy.component";
import { MinmaxComponent } from "./game/minmax/minmax.component";
import { HomeComponent } from "./home/home.component";
import { OptionsComponent } from "./options/options.component";

const routes: Routes = [
  {
    path: "",
    component: OptionsComponent
  },
  {
    path: "play",
    component: HomeComponent
  },
  {
    path: "LocalMultiplayer",
    component: LocalmultiplayerComponent
  },
  {
    path: "easywithAI",
    component: EasyComponent
  },
  {
    path: "hardwithAI",
    component: MinmaxComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
