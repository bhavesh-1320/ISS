import { LightningElement, api } from 'lwc';
import COURSE_IMAGES from '@salesforce/resourceUrl/sourceStyles';
import {loadStyle, loadScript} from 'lightning/platformResourceLoader';
import sourceStyles from '@salesforce/resourceUrl/sourceStyles';
import SystemModstamp from '@salesforce/schema/Account.SystemModstamp';

export default class CourseCard extends LightningElement {
    @api course;
    @api isActiveCourse = false;
    courseToDisplay;
    starPressed = false;
    connectedCallback() {
        Promise.all([
            loadStyle(this, sourceStyles + '/css/main.css'),
            loadScript(this, sourceStyles + '/js/jquery.min.js'),
            loadScript(this, sourceStyles + '/js/slicksLibrary.js'),
            loadScript(this, sourceStyles + '/js/smooth-scroll.js'),
        ]).then(() => {
            console.log('userId ===', this.userId)
        });
    }

    @api
    get price() {
        return  this.course.coursePrice ? this.course.coursePrice+'$' : '';
    }
    @api
    get points() {
        return this.course.coursePoints ? '+' + this.course.coursePoints + ' pts' : '';
    }
    @api
    get name() {
        return this.course.courseName;
    }
    @api
    get imagePath() {
        return this.course.courseImageName ? COURSE_IMAGES + '/images/' + this.course.courseImageName : COURSE_IMAGES + '/images/image4.png';
    }
    @api
    get durationTime() {
        return this.course.courseDuration;
    }
    @api
    get liveSessionDate() {
        return this.course.liveSessionDate;
    }
    @api
    get tags() {
        return [];
    }
    @api
    get starColor() {
        return this.starPressed ? 'icon-star-solid gold-star' : 'icon-star-solid white-star';
    }

    addToFavorites(event) {
        event.preventDefault();
        this.starPressed = !this.starPressed; 
        if(this.starPressed) {
            this.dispatchEvent(new CustomEvent('addtofavorite',{
                detail : {name : this.course.courseName},    
            }));
        } else {
            this.dispatchEvent(new CustomEvent('removefromfavourite',{
                detail : {name : this.course.courseName},    
            }));
        }
    }

}