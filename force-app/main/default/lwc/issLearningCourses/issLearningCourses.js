import {LightningElement, api, track} from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import userId from '@salesforce/user/Id';
import {loadStyle, loadScript} from 'lightning/platformResourceLoader';
import sourceStyles from '@salesforce/resourceUrl/sourceStyles';
import getActiveCoursesInfo from '@salesforce/apex/LearningCoursesController.getActiveCoursesInfo';
import getAllCoursesInfo from '@salesforce/apex/ISSLearningCoursesController.getAllCourses';
import communityBasePath from '@salesforce/community/basePath';

const ALL_COURSES_PAGE_NAME = 'DEV_Search_Courses__c';


export default class LearningCourses extends NavigationMixin(LightningElement) {


    userId = userId;
    activeCourses = [];
    upcomingLiveSessions = [];
    hasLearnerActiveCourses;
    hasUpcomingLiveSessions;
    showArrows = true;
    showSlicks = false;
    recommendedCourses = [];
    allCourses = [];
    @track favoriteList = [];
    isSearchActive = false;
    searchValue = ''; 
    //liveCourses = [];
    // @track screenWidth;
    connectedCallback() {
        getAllCoursesInfo().then(result => {
            this.recommendedCourses = result.recommendedCourses;
            console.log('RecommendedCourses:' + this.recommendedCourses);
            this.upcomingLiveSessions = result.upcomingLiveSessions;
            this.hasUpcomingLiveSessions = result.upcomingLiveSessions.length > 0;
            this.activeCourses = result.activeCourses;
            this.hasLearnerActiveCourses = result.activeCourses.length > 0;
        }).catch(error => {
            console.log(error);
        });
        console.log(this.upcomingLiveSessions);


        //this.getActiveCoursesInfo();
        Promise.all([
            loadStyle(this, sourceStyles + '/css/main.css'),
            loadScript(this, sourceStyles + '/js/jquery.min.js'),
            loadScript(this, sourceStyles + '/js/slicksLibrary.js'),
            loadScript(this, sourceStyles + '/js/smooth-scroll.js'),
        ]).then(() => {
            console.log('UserID: ', this.userId);
        });
    }

    handleInput(event) {
        event.preventDefault();
        this.searchValue = event.target.value;
        console.log(this.searchValue);
    }

    handleSeeMoreClick(event) {
        event.preventDefault();
        this.navigateToCommunityPage(ALL_COURSES_PAGE_NAME);
        console.log('Navigated');
    }

    navigateToCommunityPage(pageName) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageName,
            },
            state: {
                c__id: this.searchValue
             },
        });
    }

    addToFavorite(event) {
        event.preventDefault();
        const curentCourseData = event.detail.name;
        console.log(curentCourseData);
        this.favoriteList.push({id : 1, name : curentCourseData});
        console.log('|event handled|');
        console.log(JSON.stringify(this.favoriteList));
        // this.template.querySelector('[data-id="cardIndex"]').a
        this.template.querySelector('[data-id="favoritesComponent"]').addFavorite();

    }
    removeFromFavorite(event) {
        event.preventDefault();
        const curentCourseData = event.detail.name;
        this.template.querySelector('[data-id="favoritesComponent"]').removeFromFavorite(curentCourseData);
    }
    // @api
    // get favorites() {
    //     return this.favoriteList;
    // }

}