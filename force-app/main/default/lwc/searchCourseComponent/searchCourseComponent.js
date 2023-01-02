import { LightningElement, track, wire } from 'lwc';
import getRecords from '@salesforce/apex/SearchCourseController.getRecords';
import { CurrentPageReference } from 'lightning/navigation';

export default class SearchCourseComponent extends LightningElement {
    @track records = [];
    searchkey = '';
    @track filters = [];
    isShowDetailSeries = false;
    isShowResult = true;
    isShowDetailCourse = false;
    isShowFilters = true;
    @track showRecord = [];
    @track courseRecord = [];

    @wire(getRecords)
    wiredRecords({ error, data }) {
        if (data) {
            console.log(data)
            this.records = data.slice().sort((a,b) => a.Duration__c - b.Duration__c);
        }
        else {
            console.log(error);
        }
    }

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        console.log('Catched:');
        if(currentPageReference) {
            console.log('CURRENTREFERENCE:', currentPageReference.state?.c__id);
            this.searchkey = currentPageReference.state?.c__id;

        }
    }

    contentSearch(event) {
        if (this.isShowDetailSeries) {
            this.isShowDetailSeries = false;
            this.isShowResult = true;
        }
        this.searchkey = event.detail.searchKey;
        if(this.searchkey.length < 1){
            getRecords({searchkey: null, filters: this.filters})
            .then((result) => {
                if (event.detail.SortBy == 'Long') {
                    this.records = result.slice().sort((a,b) => b.Duration__c - a.Duration__c);
                } else {
                    this.records = result.slice().sort((a,b) => a.Duration__c - b.Duration__c);
                }
            });
        } else {
            getRecords({searchkey: this.searchkey, filters: this.filters})
            .then((result) => {
                if (event.detail.SortBy == 'Long') {
                    this.records = result.slice().sort((a,b) => b.Duration__c - a.Duration__c);
                } else {
                    this.records = result.slice().sort((a,b) => a.Duration__c - b.Duration__c);
                }
            });
        }

    }

    handleFilter(event){
        this.filters = [];
        console.log('in Parent')
        console.log(event.detail.Name);
        console.log(event.detail.Add);
        console.log(event.detail);
        if (event.detail.Add){
            this.filters.push(event.detail.Name);
            getRecords({searchkey: this.searchkey, filters: this.filters})
            .then((result) => {
                if (event.detail.SortBy == 'Long') {
                    this.records = result.slice().sort((a,b) => b.Duration__c - a.Duration__c);
                } else {
                    this.records = result.slice().sort((a,b) => a.Duration__c - b.Duration__c);
                }
            });
        } else {
            this.filters.pop(event.detail.Name);
            if (event.detail.SortBy == 'Long') {
                this.records = this.records.slice().sort((a,b) => b.Duration__c - a.Duration__c);
            } else {
                this.records = this.records.slice().sort((a,b) => a.Duration__c - b.Duration__c);
            }
        }
    }

    showSeriesBlock(event) {
        this.isShowDetailSeries = true;
        console.log('seriesShow ' + event.detail);
        this.showRecord = event.detail;
        console.log();
        this.isShowResult = false;
    }

    showCourseDetails(event) {
        this.isShowFilters = false;
        this.isShowDetailCourse = true;
        console.log('courseShow ' + event.detail);
        this.courseRecord = event.detail;
        this.isShowResult = false;
    }

    preventPageFromSeries(event) {
        this.isShowDetailSeries = false;
        this.isShowResult = true;
        this.showRecord = null;
    }

    preventPageFromCourse(event) {
        this.isShowFilters = true;
        this.isShowDetailCourse = false;
        this.isShowResult = true;
        this.courseRecord = null;
    }
}