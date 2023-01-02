import { LightningElement, track } from 'lwc';
import searchHeading from '@salesforce/resourceUrl/candidateSearchIcon';
import Id from '@salesforce/user/Id';
import getProfileName from '@salesforce/apex/getProfileController.getProfileName';
export default class RecruiterDashboard extends LightningElement {

    inviteButtonIcon = searchHeading + '/ISSV2/Group90.png';
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
    rectangleImage = searchHeading + '/ISSV2/Rectangle.png';

    savedAlerts = [{ 'JobName': 'High School Math Teacher', 'SchoolName': 'Union School', 'Status': 'New' },
    { 'JobName': 'High School Math Teacher', 'SchoolName': 'Union School', 'Status': 'New' },
    { 'JobName': 'High School Math Teacher', 'SchoolName': 'Union School', 'Status': 'New' },
    { 'JobName': 'High School Math Teacher', 'SchoolName': 'Union School', 'Status': 'New' },
    { 'JobName': 'High School Math Teacher', 'SchoolName': 'Union School', 'Status': 'New' }
    ];
    recentSearches = [{ 'JobName': 'High School Math Teacher', 'SchoolName': 'Union School', 'Status': 'New' },
    { 'JobName': 'High School Math Teacher', 'SchoolName': 'Union School', 'Status': 'New' },
    { 'JobName': 'High School Math Teacher', 'SchoolName': 'Union School', 'Status': 'New' },
    { 'JobName': 'High School Math Teacher', 'SchoolName': 'Union School', 'Status': 'New' },
    { 'JobName': 'High School Math Teacher', 'SchoolName': 'Union School', 'Status': 'New' }
    ];
    newApps = [{ 'Name': 'Jim Bob (Florida, USA)', 'School': 'Math Teacher, High School' },
    { 'Name': 'Jim Bob (Florida, USA)', 'School': 'Math Teacher, High School' },
    { 'Name': 'Jim Bob (Florida, USA)', 'School': 'Math Teacher, High School' },
    { 'Name': 'Jim Bob (Florida, USA)', 'School': 'Math Teacher, High School' }];

    msgCenters = [{ 'Name': 'Jim Bob (Florida, USA)', 'Des': 'Hey Jim we just wanted to reach out and talk to you about a position that you may be interested. We’d...' },
    { 'Name': 'Jim Bob (Florida, USA)', 'Des': 'Hey Jim we just wanted to reach out and talk to you about a position that you may be interested. We’d...' },
    ];
    openJobs = [{ 'Subject': 'Math Teacher', 'School': 'Union School' }, { 'Subject': 'English Teacher', 'School': 'Union School' },];
    fromIss = [{ 'Name': 'School Supplies Credit', 'Des': 'Learn how to get your potential candidates a credit for new school supplies throught ISS EDUrecruit!' },
    { 'Name': 'School Supplies Credit', 'Des': 'Learn how to get your potential candidates a credit for new school supplies throught ISS EDUrecruit!' },
    ];


    showContent = false;
    userId = Id;
    @track profileName;

    connectedCallback() {
        getProfileName({ currentUserId: this.userId }).then(result => {
            this.profileName = result;
            if (this.profileName != 'Recruiter') {
                window.location.pathname = 's/';
            }
            else {
                this.showContent = true;
            }
        }).catch(error => {
            console.log(error);
        })
    }
}