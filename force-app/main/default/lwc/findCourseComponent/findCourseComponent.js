import {LightningElement, api} from 'lwc';

export default class FindCourseComponent extends LightningElement {
    isSearchRunning = false;
    searchStr;

    handleFindCourseChange(event) {
        this.searchStr = event.target.value;
    }

    handleFindCourseClick(event) {
        console.log('2222this.searchStr', this.searchStr)
    }
}