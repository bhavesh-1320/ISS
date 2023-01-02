import {LightningElement, wire} from 'lwc';
import communityPath from '@salesforce/community/basePath';
import {NavigationMixin} from 'lightning/navigation';
import userId from '@salesforce/user/Id';
import {loadStyle, loadScript} from 'lightning/platformResourceLoader';
import sourceStyles from '@salesforce/resourceUrl/sourceStyles';
import getActiveCoursesInfo from '@salesforce/apex/LearningCoursesController.getActiveCoursesInfo';
import toSearch from '@salesforce/messageChannel/ToSearch__c';
import {
    MessageContext, APPLICATION_SCOPE, publish
} from 'lightning/messageService';

const ALL_COURSES_PAGE_NAME = '/testcourses';

export default class LearningCourses extends NavigationMixin(LightningElement) {
    userId = userId;
    activeCourses = [];
    upcomingLiveSessions = [];
    hasLearnerActiveCourses;
    hasUpcomingLiveSessions;
    showArrows = true;
    showSlicks = false;

    @wire(MessageContext)
    context;

    connectedCallback() {
        this.getActiveCoursesInfo();

        console.log('Path === ', document.location.pathname);
        console.log('Connected')

        Promise.all([
            loadStyle(this, sourceStyles + '/css/main.css'),
            loadScript(this, sourceStyles + '/js/jquery.min.js'),
            loadScript(this, sourceStyles + '/js/slicksLibrary.js'),
            loadScript(this, sourceStyles + '/js/smooth-scroll.js'),
        ]).then(() => {
            console.log('userId ===', this.userId)
            // jQuery('.iss-blocks').slick({
            //     slidesToScroll: 1,
            //     rows: 0,
            //     slidesToShow: 3,
            //     prevArrow: '<button class="slick-prev"><span class="icon-chevron-down-solid"></span></button>',
            //     nextArrow: '<button class="slick-next"><span class="icon-chevron-down-solid"></span></button>',
            //     fade: false,
            //     focusOnSelect: true,
            //     autoplay: false,
            //     loop: false
            // });
        });
    }

    getActiveCoursesInfo() {
        getActiveCoursesInfo({userId: this.userId})
            .then((result) => {
                this.activeCourses = result.activeCourses;
                this.hasLearnerActiveCourses = result.activeCourses.length > 0;
                this.upcomingLiveSessions = result.upcomingLiveSessions;
                this.hasUpcomingLiveSessions = result.upcomingLiveSessions.length > 0;
            })
            .catch((error) => {
                this.error = error;
            })
    }

    handleClickAction() {
        console.log('Log')
    }

    handleSeeMoreClick(event) {
        // event.preventDefault();
        let payload = {
            message: 'hello'
            // type: ['courses', 'live session'],
            // tag: ['school', 'math']
        };
        publish(this.context, toSearch, payload);
        let pageUrl = communityPath + '/testcourses';
        window.open(pageUrl, "_self");

        // this.navigateToCommunityPage(ALL_COURSES_PAGE_NAME);
    }

    navigateToCommunityPage(pageName) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageName
            }
        });
    }
}