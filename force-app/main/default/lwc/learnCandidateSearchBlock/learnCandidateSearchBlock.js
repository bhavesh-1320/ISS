import { api, LightningElement, track, wire } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import LearnCandidateSearch from '@salesforce/resourceUrl/LearnCandidateSearch';
import getTabs from '@salesforce/apex/learnCandidateSearchController.getTabs';

export default class LearnCandidateSearchBlock extends NavigationMixin(LightningElement) {
    @api content;
    @api courseId;
    @track tags = [];
    imagePath = LearnCandidateSearch + '/image3.png';

    connectedCallback(){
        console.log(LearnCandidateSearch)
    }

    @wire(getTabs,{recordId: '$content.Id'})
    wiredTabs({error, data}){
        if(data){
            this.tags = data;
            this.errors = undefined;
        } else if (error) {
            this.tags = undefined;
            this.errors = error;
        }
    }

    linkToTag(event){
        Event.preventDefault();
    }
    linkToContent(event){
        Event.preventDefault();
    }
}