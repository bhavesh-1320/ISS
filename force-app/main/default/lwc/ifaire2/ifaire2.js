import { LightningElement, api } from 'lwc';
import searchHeading from '@salesforce/resourceUrl/candidateSearchIcon';
import searchHeading2 from '@salesforce/resourceUrl/candidateSearchIconData';
import star from '@salesforce/resourceUrl/Star';
export default class Ifaire extends LightningElement {
        @api child = {};
        star = star;
        timeZone = false;
        bestMatchJob = ['one', 'two', 'three', 'four', 'five'];
        //  Retrive Icon from Static Resouce and show on Header of Candidate search 
        inviteButtonIcon = searchHeading + '/ISSV2/Group90.png';
        groupIcon = searchHeading + '/ISSV2/GroupImage.png';
        checked = searchHeading + '/ISSV2/Group76.png';
        query = searchHeading + '/ISSV2/Group89.png';
        question = searchHeading + '/ISSV2/Group88.png'
        groups = searchHeading + '/ISSV2/Group98.png';
        invites = searchHeading + '/ISSV2/Group144.png';
        email = searchHeading + '/ISSV2/Group145.png';
        cancle = searchHeading + '/ISSV2/Group146.png';
        barchart1 = searchHeading + '/ISSV2/Group147.png';
        barchart2 = searchHeading + '/ISSV2/Group148.png';
        addUser = searchHeading + '/ISSV2/Group149.png';

        // reterive Icon from static resource and show on best search on job 
        rectangleImage = searchHeading + '/ISSV2/Rectangle.png';
        hatImage = searchHeading + '/ISSV2/Group65.png';
        locationImage = searchHeading + '/ISSV2/location.png';
        schoolParticipating = ['one', 'two', 'three'];
        country = ['rome', 'egypt', 'england', 'United State'];
        rectangleImage1 = searchHeading + '/ISSV2/calender.png';
        rectangleImage2 = searchHeading2 + '/candidateSearchIconData/job3.PNG';
        TeacherImage = searchHeading2 + '/candidateSearchIconData/job4.png';
        Bookmark = searchHeading2 + '/candidateSearchIconData/job6.png';
        RightSign = searchHeading2 + '/candidateSearchIconData/job7.png';
        showTimezone(event) {
                console.log('button is clicked timezone');
                this.timeZone = true;

        }
        closeModal() {
                this.timeZone = false;
        }
        renderedCallback() {
                const style = document.createElement('style');
                style.innerText = `
                                .Teacher2{
                                    background-image: url(${this.TeacherImage});
                                    background-repeat: no-repeat;
                                    background-size: cover;
                                }
                                
                                `;
                this.template.querySelector('.Teacher').appendChild(style);
        }
}