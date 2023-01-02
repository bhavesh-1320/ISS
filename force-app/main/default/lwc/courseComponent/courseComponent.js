import { LightningElement, api, wire } from 'lwc';
import getCourseDetail from '@salesforce/apex/SearchCourseController.getCourseDetail';
import videoCourse from '@salesforce/resourceUrl/videocourse';
import getInstructors from '@salesforce/apex/SearchCourseController.getInstructors';

export default class CourseComponent extends LightningElement {
    @api course;
    courseDetails = [];
    modules = [];
    tags = [];
    videoImage;
    currentInstructors;

    connectedCallback() {
        console.log('course On Detail: ' + this.course);
        this.videoImage = videoCourse;
    }

    @wire(getCourseDetail,{recordId: '$course'})
    wiredCourseDetail({error, data}){
        if(data){
            this.courseDetails = data.detailsCourse;
            this.modules = data.modules;
            this.tags = data.tags;
        } else if (error) {
            this.errors = error;
        }
    }

    @wire(getInstructors)
    wiredInstructors({error, data}){
        if(data){
            this.currentInstructors = data;
        } else if (error) {
            this.errors = error;
        }
    }

    get widthPercentage(){
        return `width:${this.courseDetails.Progress__c}%`;
    }
}