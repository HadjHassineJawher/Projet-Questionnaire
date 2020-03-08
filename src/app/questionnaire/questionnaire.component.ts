import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms'
import { QuestionnaireService } from '../questionnaire.service';
@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
questionnaire:FormGroup;
que:object;
  router: any;
  constructor(private fb:FormBuilder, private ques:QuestionnaireService) { }


  // deletequestionnaire(){
  //   this.ques.getquestionnaire().subscribe(Response=>{
  //     this.que=Response;
  //   });
  // }


  ngOnInit() {
    this.questionnaire=this.fb.group({ 
      id:[''],
      questionnaireName: ['', Validators.required ], 
      typeques: ['', Validators.required ],     
      section : this.fb.array([this.creatSection()])
    })
    this.afficherQuestionnaire();
    
  }
 
  onSubmit(u){
    this.ques.ajouter(u).subscribe(Response=>{
      this.afficherQuestionnaire();
    });
  }

  afficherQuestionnaire(){
    this.ques.getQuestionnaire().subscribe(Response=>{
      this.que=Response;
    });
  }
creatSection():FormGroup{
return this.fb.group({
 sectionName:['', Validators.required],
 question:this.fb.array([this.creatQuestion()])
}) 
}
public get section(){
  return this.questionnaire.controls['section'] as FormArray;
}
addSection(){
  this.section.push(this.creatSection());
}

creatQuestion():FormGroup{
  return this.fb.group({
    questionName:['', Validators.required],
    type:['checkbox'],
    answer:this.fb.array([this.creatAnswer()])
  })
}

addQuestion(groupSection:FormArray){
  const arrayQuestion=groupSection.get('question') as FormArray
  arrayQuestion.push(this.creatQuestion())
}

creatAnswer():FormGroup{
  return this.fb.group({
    answerName:['', Validators.required]
  })
}

addAnswer(groupQuestion:FormArray){
  const arrayAnswer=groupQuestion.get('answer') as FormArray;
arrayAnswer.push(this.creatAnswer());
}
removeSection(i:number){
  this.section.removeAt(i);
}
removeQuestion(groupSection:FormArray,j:number){
  const arrayQuestion=groupSection.get('question') as FormArray
  arrayQuestion.removeAt(j);
}
removeAnswer(groupQuestion:FormArray,k:number){
  const arrayAnswer=groupQuestion.get('answer') as FormArray
  arrayAnswer.removeAt(k);
}


}
