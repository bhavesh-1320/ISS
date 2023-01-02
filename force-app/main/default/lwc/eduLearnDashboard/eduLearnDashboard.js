import { LightningElement } from 'lwc';
import images from '@salesforce/resourceUrl/edulearn';

export default class EduLearnDashboard extends LightningElement {
    banner = images + '/edulearn/banner.jpg';
    course = images + '/edulearn/Rectangle.png';
    allCourses = ['1','1','1','1','1','1','1','1','1','1','1','1','1','1']


    renderedCallback()
    {
        this.template.querySelector('.banner').style.backgroundImage = 'url('+this.banner+')';
    }
}