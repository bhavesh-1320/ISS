import { LightningElement, track, wire} from 'lwc';

import apexGetQuestions from "@salesforce/apex/QuizVitController.getQuestions";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import apexCheckAnswers from "@salesforce/apex/QuizVitController.checkAnswers";

export default class QuizVit extends LightningElement {
    @track numberOfQuestionList = {1:'A. ', 2:'B. ', 3:'C. ', 4:'D. ', 5:'E. ', 6: 'F. ' , 7: 'G. ', 8: 'H. '};
    @track questions= [];
    @track answers = {};
    countQuestion = 0;
    @wire(apexGetQuestions)
    getQuestions({ data }) {
        if (data) {

            let radioNumber = 1;

            data.forEach(question => {

                let handleQuestion={};
                Object.assign(handleQuestion, question);
                handleQuestion.handleOptions=[];
                let numberOfQuestion = 1;

                question.options__c.split(';').forEach(opt=>{
                    let handleOption={};
                    handleOption.Id = question.id;
                    handleOption.name = 'rad00' + radioNumber;
                    handleOption.label= this.numberOfQuestionList[numberOfQuestion] + opt;
                    handleOption.value= this.numberOfQuestionList[numberOfQuestion] + opt;
                    handleQuestion.handleOptions.push(handleOption);
                    numberOfQuestion++;
                });
                
                radioNumber++;
                this.countQuestion++;
                this.questions.push(handleQuestion);
            });
        }
    }

    clickAnswer(event) {
        const questionId = event.target.title;
        let answer = event.target.value.split('. ');
        console.log('answer ' + answer[1]);
        this.answers[questionId] = answer[1];
    }
      
    async handleSubmit() {

        const allAnswers = await apexCheckAnswers({
            answers: this.answers
        });

        if(Object.keys(this.answers).length !== this.countQuestion) { 
            const event = new ShowToastEvent({
                title: 'Please choose all answers',
            });
            this.dispatchEvent(event);
        }
        else if(allAnswers.isAllCorrect) {

            const event = new ShowToastEvent({
                title: 'You passed!',
                message:
                    'Congratulations you\'ve passed the Quiz ',
                variant: 'success'
            });
            this.dispatchEvent(event);
        }
        else {
            for (let key in allAnswers.results) {

              if(!allAnswers.results[key]) {

                let spanElements = this.template.querySelectorAll(`span[title="${key}"]`);

                spanElements.forEach( span => {

                  let spanValue = span.innerHTML.split('. ');

                  if(this.answers[key] === spanValue[1]) {
                    span.style.color = 'white';
                    span.style.backgroundColor = '#B32428';
                    span.style.border = '#B32428';
                  }
                  
                });
              }
            }
            const event = new ShowToastEvent({
                title: 'Some answers are wrong, please try again',
            });
            this.dispatchEvent(event);
        }

    }    
}