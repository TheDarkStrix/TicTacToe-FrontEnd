import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { LocalmultiplayerComponent } from "./localmultiplayer/localmultiplayer.component";
import { EasyComponent } from "./easy/easy.component";
import { MinmaxComponent } from "./minmax/minmax.component";

const routes: Routes = [
  {
    path: "",
    component: MainComponent
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
