import { Injectable } from '@angular/core';
import { Symptoms } from '../interfaces/symptoms';
import { PoorPrognosticFactor } from '../interfaces/poor-prognostic-factor';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  resultat: string;
  message = 'خليك فدارك حتى تحيد الاعراض، عبر درجة الحراة 2 مرات فالنهار. ومتنساوش النظافة و غسل إيديك بزاف ديال المرات فالنهار.';

  constructor() { }

  calculateMinorSeverityFactor(symptoms: Symptoms) {
    let factor = 0;
    if (symptoms.feverDeg >= 39) { factor++; }
    if (symptoms.tiredness) { factor++; }
    if (symptoms.discomfort) { factor++; }
    return factor;
  }

  calculateMajorSeverityFactor(symptoms: Symptoms) {
    let factor = 0;
    if (symptoms.dyspnea) { factor++; }
    if (symptoms.anorexia) { factor++; }
    if (symptoms.feverDeg <= 35.4) { factor++; }
    return factor;
  }

  calculatePoorPrognosticFactor(ppf: PoorPrognosticFactor) {
    if (ppf.age >= 70 || ppf.imc >= 30 || ppf.pregnancy || ppf.breathingIllness || ppf.cancer || ppf.chronicLiverDisease
      || ppf.chronicRenalFailure || ppf.diabetes || ppf.heartDisease || ppf.immuneSystemDisease || ppf.immunosuppressiveTherapy) {
      return true;
    } else {
      return false;
    }
  }

  getResult(symptoms: Symptoms, ppf: PoorPrognosticFactor) {
    const fact_gravite_min = this.calculateMinorSeverityFactor(symptoms);
    const fact_gravite_maj = this.calculateMajorSeverityFactor(symptoms);
    const fact_pronostique = this.calculatePoorPrognosticFactor(ppf);

    if (symptoms.fever || (symptoms.cough && symptoms.soreThroat) || (symptoms.cough && symptoms.muscularPain) || (symptoms.fever && symptoms.diarrhea)) {
      if (fact_gravite_maj > 0) {
        this.resultat = 'خصك تعيط ل 141';
      } else if (!fact_pronostique) {
        if (ppf.age < 50 && fact_gravite_min === 0) {
          this.resultat = 'تنوصيوك باش تبقى فدارك و تتصل بطبيبك إذا بانت شي أعراض أخرى . وتقد فاي وقت تعاود الإختبار باش طمن على راسك';
        }
        if (((ppf.age > 50 && ppf.age < 70) && fact_gravite_min === 0) || fact_gravite_min > 0) {
          this.resultat = 'تقد تشاور مع طبيب فالتيليفون او يزورك طبيب فالدار' +
            '\nإذا كان عندك صعوبة فالتنفس او مقديتيش تاكل مزيان او تشرب لكثر من 24 ساعة ضروري اتصل ب 141';
        }
      } else {
        if (fact_gravite_min <= 1) {
          this.resultat = 'تقد تشاور مع طبيب فالتيليفون او يزورك طبيب فالدار' +
            '\nإذا كان عندك صعوبة فالتنفس او مقديتيش تاكل مزيان او تشرب لكثر من 24 ساعة ضروري اتصل ب 141';
        } else {
          this.resultat = 'خصك تعيط ل 141';
        }
      }
    } else if (symptoms.fever && symptoms.cough) {
      if (fact_gravite_maj > 0) {
        this.resultat = 'خصك تعيط ل 141';
      } else if (!fact_pronostique) {
        this.resultat = 'تقد تشاور مع طبيب فالتيليفون او يزورك طبيب فالدار' +
            '\nإذا كان عندك صعوبة فالتنفس او مقديتيش تاكل مزيان او تشرب لكثر من 24 ساعة ضروري اتصل ب 141';
      } else {
        if (fact_gravite_min <= 1) {
          this.resultat = 'تقد تشاور مع طبيب فالتيليفون او يزورك طبيب فالدار' +
            '\nإذا كان عندك صعوبة فالتنفس او مقديتيش تاكل مزيان او تشرب لكثر من 24 ساعة ضروري اتصل ب 141';
        } else {
          this.resultat = 'خصك تعيط ل 141';
        }
      }
    } else if (symptoms.fever || symptoms.cough || symptoms.soreThroat || symptoms.muscularPain) {
      if (fact_gravite_maj === 0 && fact_gravite_min === 0) {
        this.resultat = 'موحال واش فيك فيروس كورونا، ولكن إلى شكيتي ممكن تتصل بطبيب ديالك';
      } else if (fact_gravite_min > 0 || fact_gravite_maj > 0 || fact_pronostique) {
        this.resultat = 'موحال واش فيك فيروس كورونا ؛ تنصحوك تشاور مع طبيب. وإلى شكيتي اتصل ب 141';
      }
    } else {
      this.resultat = 'موحال واش فيك فيروس كورونا، إذا عندك شك اتصل بالطبيب ديالك. تقد تعاود الإختبار لكانوا عندك اعراض اخرى. لبغيتي تعرف اكثر على الڤيروس ممكن تشوف صفحة النصائح';
    }
  }

}
