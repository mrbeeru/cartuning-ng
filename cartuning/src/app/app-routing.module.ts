import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {TuningComponent} from './tuning/tuning.component';
import {AboutusComponent} from './aboutus/aboutus.component';
import {GalleryComponent} from './gallery/gallery.component';

import {AuthGuard} from './_helpers/auth.guard'
import { FaqComponent } from './aboutus/faq/faq.component';
import { ExperienceComponent } from './aboutus/experience/experience.component';
import { ContactComponent } from './aboutus/contact/contact.component';

const authModule = () => import('./modules/auth/auth.module').then(x => x.AuthModule);
const userModule = () => import('./modules/user/user.module').then(x => x.UserModule);

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'tune', component: TuningComponent },
  {path: 'gallery', component: GalleryComponent },
  {path: 'about/faq', component: FaqComponent},
  {path: 'about/experience', component: ExperienceComponent},
  {path: 'about/contact', component: ContactComponent},
  {path: 'user', loadChildren: userModule, canActivate: [AuthGuard]},
  {path: 'auth', loadChildren: authModule},

  // otherwise redirect to home
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
