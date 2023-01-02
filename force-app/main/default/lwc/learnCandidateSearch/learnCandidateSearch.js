import { LightningElement, track, wire } from 'lwc';
import LearnCandidateSearch from '@salesforce/resourceUrl/LearnCandidateSearch';
import getCourses from '@salesforce/apex/learnCandidateSearchController.getCourses';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import toSearch from '@salesforce/messageChannel/ToSearch__c';
import { NavigationMixin, CurrentPageReference  } from 'lightning/navigation';
import {
    APPLICATION_SCOPE,
    MessageContext,
    subscribe,
    unsubscribe,
} from 'lightning/messageService';

export default class CoursesTest extends NavigationMixin(LightningElement) {
    
    subscription = null;
    firstPic = LearnCandidateSearch + '/image1.png';
    @track courses = [];
    searchkey = '';
    @track filters = [];
    type = null;
    tag = null;

    @wire(MessageContext)
    messageContext;

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
       if (currentPageReference) {
          this.type = currentPageReference.state?.type;
          this.tag = currentPageReference.state?.tag;
       }
    }

    subscribeToMessageChannel() {
        if (!this.subscription) {
            console.log('sub')
            this.subscription = subscribe(
                this.messageContext,
                toSearch,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
            console.log(this.subscription)
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    connectedCallback() {
        console.log('here is filters before', this.filters);
        this.subscribeToMessageChannel();
        console.log('here is filters after', this.filters);
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    handleMessage(message) {
        console.log(message);
        this.filters = message;
    }

    dispatchToast(error) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error loading contact',
                message: error,
                variant: 'error'
            })
        );
    }


    @wire(getCourses)
    wiredCourses({ error, data }) {
        if (data) {
            console.log(data)
            this.courses = data;
        }
        else {
            console.log(error);
        }
    }

    contentSearch(event) {
        this.searchkey = event.detail;
        if(this.searchkey.length < 3){
            getCourses({searchkey: null, filters: this.filters})
            .then((result) => {
              this.courses = result});
        } else {
            getCourses({searchkey: this.searchkey, filters: this.filters})
            .then((result) => {
              this.courses = result});
        }

    }

    // handleLearningCourses(){
    //     this[NavigationMixin.Navigate]({
    //         type: 'comm__namedPage',
    //         attributes: {
    //             pageName: 'learning-courses'
    //         }
    //     });
    // }

    // handleFilter(event){
    //     console.log('in Parent')
    //     console.log(event.detail.Name);
    //     console.log(event.detail.Add);
    //     console.log(event.detail);
    //     console.log(this.filters);
    //     if (event.detail.Add){
    //         this.filters.push(event.detail.Name);
    //         getCourses({searchkey: this.searchkey, filters: this.filters})
    //         .then((result) => {
    //           this.courses = result});
    //     } else {

    //     }
    // }
}