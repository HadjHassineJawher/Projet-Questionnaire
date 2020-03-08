import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  constructor(private _Http:HttpClient) { } 
  ajouter(questionnaire){
    return this._Http.post("http://localhost:8080/questionnaire",questionnaire);
  }
  getQuestionnaire(){
    return this._Http.get("http://localhost:8080/questionnaire");
  }
  suppQuestionnaire(questionnaire){
    return this._Http.delete("http://localhost:8080/questionnaire/"+ questionnaire.id);
  }
  getQuestionnaireParId(id){
    return this._Http.get("http://localhost:8080/questionnaire/"+id);
  }
  modifierQuestionnaire(questionnaire){
    return this._Http.put("http://localhost:8080/questionnaire/"+ questionnaire.id ,questionnaire);
  }
}
