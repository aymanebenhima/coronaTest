import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Symptoms } from 'src/app/shared/interfaces/symptoms';
import { PoorPrognosticFactor } from 'src/app/shared/interfaces/poor-prognostic-factor';
import { TestService } from 'src/app/shared/services/test.service';

@Component({
  selector: 'app-multiple-steps-form',
  templateUrl: './multiple-steps-form.component.html',
  styleUrls: ['./multiple-steps-form.component.css']
})
export class MultipleStepsFormComponent implements OnInit {

  totalStepsCount: number;
  progressBarValue;
  symptoms: Symptoms;
  ppf: PoorPrognosticFactor;

  @Output() nextEvent = new EventEmitter<any>();

  // formGroups
  feverFormGroup: FormGroup;
  feverDegreeFormGroup: FormGroup;
  coughFormGroup: FormGroup;
  muscularPainFormGroup: FormGroup;
  soreThroatFormGroup: FormGroup;
  diarrheaFormGroup: FormGroup;
  tirednessFormGroup: FormGroup;
  dyspneaFormGroup: FormGroup; // difficulty of breathing
  anorexiaFormGroup: FormGroup; // fo9dan chahia
  discomfortFormGroup: FormGroup;
  ageFormGroup: FormGroup;
  weightFormGroup: FormGroup;
  heightFormGroup: FormGroup;
  heartDiseaseFormGroup: FormGroup;
  diabetesFormGroup: FormGroup;
  cancerFormGroup: FormGroup;
  breathingIllnessFormGroup: FormGroup;
  chronicRenalFailureFormGroup: FormGroup;
  chronicLiverDiseaseFormGroup: FormGroup;
  pregnancyFormGroup: FormGroup;
  immuneSystemDiseaseFormGroup: FormGroup;
  immunosuppressiveTherapyFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private service: TestService) { }

  ngOnInit(): void {
    this.symptoms = new Symptoms();
    this.ppf = new PoorPrognosticFactor();
    console.log(this.symptoms);
    this.progressBarValue = (1 / 23) * 100;
    this.totalStepsCount = 22;
    this.initializeFormGroups();
  }

  initializeFormGroups() {
    this.feverFormGroup = this.fb.group({
      fever: ['', Validators.required]
    });
    this.feverDegreeFormGroup = this.fb.group({
      feverDegree: ['', [Validators.required, Validators.min(34), Validators.max(42)]]
    });
    this.coughFormGroup = this.fb.group({
      cough: ['', Validators.required]
    });
    this.muscularPainFormGroup = this.fb.group({
      muscularPain: ['', Validators.required]
    });
    this.soreThroatFormGroup = this.fb.group({
      soreThroat: ['', Validators.required]
    });
    this.diarrheaFormGroup = this.fb.group({
      diarrhea: ['', Validators.required]
    });
    this.tirednessFormGroup = this.fb.group({
      tiredness: ['', Validators.required]
    });
    this.dyspneaFormGroup = this.fb.group({
      dyspnea: ['', Validators.required]
    });
    this.anorexiaFormGroup = this.fb.group({
      anorexia: ['', Validators.required]
    });
    this.discomfortFormGroup = this.fb.group({
      discomfort: ['', Validators.required]
    });
    this.ageFormGroup = this.fb.group({
      age: ['', [Validators.required, Validators.min(15), Validators.max(110)]]
    });
    this.weightFormGroup = this.fb.group({
      weight: ['', [Validators.required, Validators.min(20), Validators.max(250)]]
    });
    this.heightFormGroup = this.fb.group({
      height: ['', [Validators.required, Validators.min(80), Validators.max(250)]]
    });
    this.heartDiseaseFormGroup = this.fb.group({
      heartDisease: ['', Validators.required]
    });
    this.diabetesFormGroup = this.fb.group({
      diabetes: ['', Validators.required]
    });
    this.cancerFormGroup = this.fb.group({
      cancer: ['', Validators.required]
    });
    this.breathingIllnessFormGroup = this.fb.group({
      breathingIllness: ['', Validators.required]
    });
    this.chronicRenalFailureFormGroup = this.fb.group({
      chronicRenalFailure: ['', Validators.required]
    });
    this.chronicLiverDiseaseFormGroup = this.fb.group({
      chronicLiverDisease: ['', Validators.required]
    });
    this.pregnancyFormGroup = this.fb.group({
      pregnancy: ['', Validators.required]
    });
    this.immuneSystemDiseaseFormGroup = this.fb.group({
      immuneSystemDisease: ['', Validators.required]
    });
    this.immunosuppressiveTherapyFormGroup = this.fb.group({
      immunosuppressiveTherapy: ['', Validators.required]
    });
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
    this.progressBarValue -= (1 / this.totalStepsCount) * 100;
  }

  goForward(stepper: MatStepper) {
    stepper.next();
    this.progressBarValue += (1 / this.totalStepsCount) * 100;
  }

  saveAnswers() {
    this.saveSymptoms();
    this.savePpf();
    setTimeout(() => {
      this.service.getResult(this.symptoms, this.ppf);
    }, 1000);
    setTimeout(() => {
      this.nextEvent.emit();
    }, 1000);
  }

  saveSymptoms() {
    this.symptoms.fever = this.feverFormGroup.value.fever;
    this.symptoms.feverDeg = +this.feverDegreeFormGroup.value.feverDegree;
    this.symptoms.anorexia = this.anorexiaFormGroup.value.anorexia;
    this.symptoms.cough = this.coughFormGroup.value.cough;
    this.symptoms.diarrhea = this.diarrheaFormGroup.value.diarrhea;
    if (this.discomfortFormGroup.value.discomfort === 'B' || this.discomfortFormGroup.value.discomfort === 'AB') {
      this.symptoms.discomfort = false;
    } else {
      this.symptoms.discomfort = true;
    }
    this.symptoms.dyspnea = this.dyspneaFormGroup.value.dyspnea;
    this.symptoms.muscularPain = this.muscularPainFormGroup.value.muscularPain;
    this.symptoms.soreThroat = this.soreThroatFormGroup.value.soreThroat;
    this.symptoms.tiredness = this.tirednessFormGroup.value.tiredness;
  }

  savePpf() {
    this.ppf.age = +this.ageFormGroup.value.age;
    this.ppf.imc = this.weightFormGroup.value.weight / Math.pow(this.heightFormGroup.value.height / 100, 2);
    this.ppf.breathingIllness = this.breathingIllnessFormGroup.value.breathingIllness;
    this.ppf.cancer = this.cancerFormGroup.value.cancer;
    this.ppf.chronicLiverDisease = this.chronicLiverDiseaseFormGroup.value.chronicLiverDisease;
    this.ppf.chronicRenalFailure = this.chronicRenalFailureFormGroup.value.chronicRenalFailure;
    this.ppf.diabetes = this.diabetesFormGroup.value.diabetes;
    this.ppf.heartDisease = this.heartDiseaseFormGroup.value.heartDisease;
    this.ppf.immuneSystemDisease = this.immuneSystemDiseaseFormGroup.value.immuneSystemDisease;
    this.ppf.immunosuppressiveTherapy = this.immunosuppressiveTherapyFormGroup.value.immunosuppressiveTherapy;
    if (this.pregnancyFormGroup.value.pregnancy === true) {
      this.ppf.pregnancy = true;
    } else {
      this.ppf.pregnancy = false;
    }
  }

}
