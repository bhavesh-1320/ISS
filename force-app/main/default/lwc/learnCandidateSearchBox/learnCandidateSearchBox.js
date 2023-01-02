import { LightningElement } from 'lwc';

export default class LearnCandidateSearchBox extends LightningElement {
    searchkey = '';
    Courses = false
    LiveSession = false
    School = false

    handlesearch(event){
            event.preventDefault();
            this.searchkey = event.target.value;
            const selectedEvent = new CustomEvent('search', { detail: this.searchkey });
            this.dispatchEvent(selectedEvent);
    }

    // handleFilter(event){
    //     console.log('Filter',event.target.value)
    //     if (event.target.value == 'Course'){
    //         console.log('in if',event.target.value)
    //         this.Courses = !this.Courses;
    //         let answer = {Name:event.target.value, Add:this.Courses};
    //         console.log(answer)
    //         const selectedEvent = new CustomEvent('filter', { detail: answer});
    //         this.dispatchEvent(selectedEvent);
    //     }
        
    // }



}