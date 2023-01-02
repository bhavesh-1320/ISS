import { LightningElement, track, api, wire } from "lwc";

import apexGetQuestions from "@salesforce/apex/QuizController.getQuestions";
import apexCheckAnswers from "@salesforce/apex/QuizController.checkAnswers";

export default class Quiz extends LightningElement {
    @api recordId='testModuleId';
    @track questions=[];
    @track isQuizComplite=false;
    @track isModalOpen=false;
    @track isSubmitDis=true;
    @track buttonStyle='slds-button slds-button_inverse slds-m-left_x-small slds-float_right submitBtn'
    answers={};
    value="";
    
    @wire(apexGetQuestions, { recordId: '$recordId'})wiredData({ error, data }) {
        console.log('work');
        if (data) {
            let index=1;         
            data.forEach(question => {
                let handleQuestion={};
                Object.assign(handleQuestion, question);
                handleQuestion.handleOptions=[];
                question.options__c.split(';').forEach(opt=>{
                    let handleOption={};
                    handleOption.label=opt;
                    handleOption.value=opt;
                    handleQuestion.handleOptions.push(handleOption);
                });
                handleQuestion.index=index++;
                this.questions.push(handleQuestion);
            });
            console.log('work1'+JSON.stringify(data));
            console.log('work1.2'+JSON.stringify(this.questions));
        } else if (error) {
            console.log('work2'+error);
        }
    }

    handleAnswerChange(event){
        console.log('work7'+JSON.stringify(event.currentTarget.dataset.id));
        console.log('work7.1'+JSON.stringify(event.detail));
        const questionId=event.currentTarget.dataset.id;
        this.answers[questionId]=event.detail.value;
        console.log('work8'+JSON.stringify(this.answers));
        
        let counter = 0;
        for (let key in this.answers) {
            counter++;
        }
        if(counter===this.questions.length){
            this.isSubmitDis=false;
            this.buttonStyle+=' activeBtn';
        }
    }

    closeModal() {
        this.isModalOpen = false;
    }

    async handleSubmit() {
        console.log('work9'+JSON.stringify(this.answers));
        const r = await apexCheckAnswers({
            answers: this.answers
        });
        console.log('work10'+JSON.stringify(r));
        if(r.isAllCorrect){
            this.isQuizComplite=true;
            this.isModalOpen=true;
        }else{
            this.isSubmitDis=true;
            this.buttonStyle=this.buttonStyle.replace(' activeBtn','');
            console.log('buttonStyle'+this.buttonStyle);
            for (let key in r.results) {
                let el=this.template.querySelector(`[data-id="${key}"]`);
                console.log(JSON.stringify(el));
                
                console.log('work11'+JSON.stringify(r.results[key]));
                if(!r.results[key]){
                    el.setError();
                    console.log('work12'+JSON.stringify(el));
                    delete this.answers[key];
                }    
            }
        }
    }
}