import {LightningElement, api} from 'lwc';
import COURSE_IMAGES from '@salesforce/resourceUrl/sourceStyles';

export default class ActiveCourseCard extends LightningElement {
    @api course;

    @api get isActiveCourse() {
        return this.course.courseType === 'Active Course';
    }

    @api get isUpcomingLiveSession() {
        return this.course.courseType === 'Upcoming Live Session';
    }
    imagePath;


    connectedCallback() {
        this.imagePath = COURSE_IMAGES + '/images/' + this.course.courseImageName;
    }

    handleCourseClick(event) {
        event.preventDefault();

    }

    handleStarClick(event) {
        event.preventDefault();
    }
}