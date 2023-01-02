import { LightningElement, track } from 'lwc';
import badgeImage from '@salesforce/resourceUrl/badgeicon';
import graphCandidateDashboard from '@salesforce/resourceUrl/graphCandidateDashboard';
import messageCadidateDashboard from '@salesforce/resourceUrl/messageCadidateDashboard';
import Id from '@salesforce/user/Id';
import searchHeading2 from '@salesforce/resourceUrl/candidateSearchIconData';
import getProfileName from '@salesforce/apex/getProfileController.getProfileName';
import basepath from '@salesforce/community/basePath';

export default class CandidateDashboard extends LightningElement {

    badgeImg = badgeImage + '/badgeicon/image12.png';
    communityPath = basepath;

    graphImg = graphCandidateDashboard;
    msgImg = messageCadidateDashboard;
    rectangleImage1 = searchHeading2 + '/candidateSearchIconData/job2.PNG';
    notificationPanel = true;
    showContent = false;
    userId = Id;
    @track profileName;

    connectedCallback() {
        getProfileName({ currentUserId: this.userId }).then(result => {
            this.profileName = result;
            console.log('this.profileName',this.profileName);
            if (this.profileName != 'Candidate') {
                console.log('window.location.pathname->',window.location.pathname);
                console.log('this.communityPath->',this.communityPath + '/recruiter-dashboard');
                console.log('line 30')
                // window.location.pathname = '/s/recruiter-dashboard';
                window.location.href = this.communityPath + '/recruiter-dashboard';
            }
            else
            {
                this.showContent = true;
            }
        }).catch(error => {
            console.log(error);
        })
    }

    closeNotification() {
        this.notificationPanel = false;
    }



}