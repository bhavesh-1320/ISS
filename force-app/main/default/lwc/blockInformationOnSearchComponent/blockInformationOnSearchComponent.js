import { api, LightningElement, track, wire } from 'lwc';
import LearnCandidateSearch from '@salesforce/resourceUrl/LearnCandidateSearch';
import getTags from '@salesforce/apex/SearchCourseController.getTags';

export default class BlockInformationOnSearchComponent extends LightningElement {
    @api content;
    @track tags = [];
    imagePath;

    connectedCallback(){
        this.imagePath = LearnCandidateSearch + '/image3.png';
    }

    @wire(getTags,{recordId: '$content.Id'})
    wiredTags({error, data}){
        if(data){
            this.tags = data;
            this.errors = undefined;
        } else if (error) {
            this.tags = undefined;
            this.errors = error;
        }
    }

    linkToContent(event){
        let recordId = event.target.getAttribute("data-item");

        const selectSeriesEvent = new CustomEvent('showdetails', { detail:  recordId});
        this.dispatchEvent(selectSeriesEvent);
    }

    linkToCourse(event) {
        let recordId = event.target.getAttribute("data-item");

        const selectCourseEvent = new CustomEvent('showcourse', { detail:  recordId});
        this.dispatchEvent(selectCourseEvent);
    }
}