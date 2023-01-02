import { LightningElement, api } from 'lwc';

export default class FindCoursesComponent extends LightningElement {
    @api searchkey;
    sortBy    = 'Short';
    courses = false;
    series  = false;
    isShort = false;
    @api isShowSearchResult;

    @api doSearchOnInit = false;

    connectedCallback() {
        console.log('isShowSearchResult: ' + this.isShowSearchResult);
        console.log('FIND:', this.searchkey); 
        if(!this.searchkey) {
            this.searchkey = ''
        }   
        if (this.doSearchOnInit) {
            console.log('search on init', this.searchkey);
            this.doSearch(this.searchkey);
        }
    }

    handlesearch(event){
        event.preventDefault();
        this.searchkey = event.target.value;
        this.doSearch(this.searchkey);
    }

    doSearch(searchVal) {
        console.log('doSearch', searchVal);
        let answer = {SortBy:this.sortBy, searchKey:searchVal};
        const selectedEvent = new CustomEvent('search', { detail: answer });
        this.dispatchEvent(selectedEvent);
        if (!this.isShowSearchResult) {
            this.isShowSearchResult = true;
        }
    }

    handleFilter(event){
        console.log('Filter',event.target.value)
        console.log('Name: ' + event.target.value);
        if (event.target.value == 'Course' && !this.courses){
            console.log('in if',event.target.value);
            this.courses = !this.courses;
            let answer = {Name:event.target.value, Add:this.courses, SortBy:this.sortBy};
            console.log(answer)
            const selectedEvent = new CustomEvent('filter', { detail: answer});
            this.dispatchEvent(selectedEvent);
        } else if (this.courses) {
            this.courses = false;
        }

        if (event.target.value == 'Series' && !this.series){
            console.log('in if',event.target.value);
            this.series = !this.series;
            let answer = {Name:event.target.value, Add:this.series, SortBy:this.sortBy};
            console.log(answer)
            const selectedEvent = new CustomEvent('filter', { detail: answer});
            this.dispatchEvent(selectedEvent);
        } else if (this.series) {
            this.series = false;
        }
    }

    selectSortBy(event) {
        let selectedVal = event.detail.value;
        console.log('selectedVal: ' + selectedVal);
        this.sortBy = selectedVal;
        let answer = {};
        if (this.series == true) {
            answer = {Name:'Series', Add:this.series, SortBy:this.sortBy};
        } else  if (this.courses == true) {
            answer = {Name:'Course', Add:this.courses, SortBy:this.sortBy};
        } else {
            answer = {SortBy:this.sortBy};
        }
        const selectedEvent = new CustomEvent('filter', { detail: answer});
        this.dispatchEvent(selectedEvent);
    }

    // showResultSection() {
    //     this.isShowSearchResult = false;
    // }
}