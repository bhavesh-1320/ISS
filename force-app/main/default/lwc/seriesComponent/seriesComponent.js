import { LightningElement, api, wire, track } from 'lwc';
import LearnCandidateSearch from '@salesforce/resourceUrl/LearnCandidateSearch';
import getCoursesOfSeries from '@salesforce/apex/SearchCourseController.getCoursesOfSeries';
import getSeries from '@salesforce/apex/SearchCourseController.getSeries';
import getInstructors from '@salesforce/apex/SearchCourseController.getInstructors';
import headerpopup from '@salesforce/resourceUrl/headerPopUP';
import imagesEllen from '@salesforce/resourceUrl/imagesEllen';
import seriesImage from '@salesforce/resourceUrl/image19';
import instructorTwo from '@salesforce/resourceUrl/image21';

export default class SeriesComponent extends LightningElement {
    @api series;
    @track isModalOpen = false;
    seriesInfo = [];
    @track coursesOfSeries = [];
    totalPrice;
    totalDuration;
    totalPoints;
    totalProgress;
    @track instructors = [];
    imagePath;
    imagePopUp;
    ellenimage;
    imageHeaderSeries;
    imageInsctructor;

    connectedCallback() {
        this.imagePath = LearnCandidateSearch + '/image3.png';
        this.imagePopUp = headerpopup;
        this.ellenimage = imagesEllen;
        this.imageHeaderSeries = seriesImage;
        this.imageInsctructor = instructorTwo;
    }

    @wire(getInstructors)
    wiredInstructors({error, data}){
        if(data){
            this.instructors = data;
        } else if (error) {
            this.errors = error;
        }
    }

    @wire(getSeries,{recordId: '$series'})
    wiredSeries({error, data}){
        if(data){
            this.seriesInfo = data;
        } else if (error) {
            this.errors = error;
        }
    }

    @wire(getCoursesOfSeries,{recordId: '$series'})
    wiredCourses({error, data}){
        if(data){
            this.coursesOfSeries = data.information;
            this.totalPrice = data.totalPrice;
            this.totalDuration = data.totalDuration;
            this.totalPoints = data.totalPoints;
            this.totalProgress = data.totalProgress;
            this.errors = undefined;
        } else if (error) {
            this.coursesOfSeries = undefined;
            this.errors = error;
        }
    }

    instructorsDetail() {
        this.isModalOpen = true;
    }

    get widthPercentage(){
        return `width:${this.totalProgress}%`;
    }

    get backGroundPopup(){
        return `background:url(${this.imagePopUp}) no-repeat;`;
    }

    openModal() {
        this.isModalOpen = true;
    }
    closeModal() {
        this.isModalOpen = false;
    }
}