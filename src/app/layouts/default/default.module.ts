import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { HomeComponent } from 'src/app/modules/home/home.component';
import { AdviceComponent } from 'src/app/modules/advice/advice.component';
import { RouterModule } from '@angular/router';
import { QuizComponent } from 'src/app/modules/quiz/quiz.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MultipleStepsFormComponent } from 'src/app/modules/multiple-steps-form/multiple-steps-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    AdviceComponent,
    QuizComponent,
    MultipleStepsFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatStepperModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
          loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => {
            return new TranslateHttpLoader(http, './assets/i18n/', '.json');
          },
          deps: [HttpClient]
          }
          }) 
  ]
})
export class DefaultModule { }
