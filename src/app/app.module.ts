import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { provideServerRendering } from '@angular/platform-server';

import { AppComponent } from './app.component';
import { TaskService } from './services/task.service';
import { UnsavedChangesGuard } from './guards/unsaved-changes.guard';
import { ComponentsModule } from './components/components.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    ComponentsModule
  ],
  providers: [
    TaskService,
    UnsavedChangesGuard,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(withEventReplay()),
    provideServerRendering(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

