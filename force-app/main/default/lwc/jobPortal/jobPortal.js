import { LightningElement, track, wire } from 'lwc';
import getBestMatchRecs from '@salesforce/apex/candidateSearch.getBestMatchRecs';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import star from '@salesforce/resourceUrl/Star';
import basicInfo from '@salesforce/resourceUrl/BasicInformationIcon';
import MoreFiltersImages from '@salesforce/resourceUrl/CandidateMoreFilter';
import getContactsForCandidateSearch from '@salesforce/apex/candidateSearch.getContactsForCandidateSearch';
import getContactId from '@salesforce/apex/candidateSearch.getContactId';
import getCandidateListDependingUponHeaderTabs from '@salesforce/apex/candidateSearch.getCandidateListDependingUponHeaderTabs';
import getAllFiltersOptionValues from '@salesforce/apex/candidateSearch.getAllFiltersOptionValues';
import getContactsForFilters from '@salesforce/apex/candidateSearch.getContactsForFilters';
import businessCardLogo from '@salesforce/resourceUrl/businessCardLogo';
import getContactsMoreFilters from '@salesforce/apex/candidateSearch.getContactsMoreFilters';
import fetchSchoolsForRecruiters from '@salesforce/apex/candidateSearch.fetchSchoolsForRecruiters';
import basepath from '@salesforce/community/basePath';
import Id from '@salesforce/user/Id';
import favouriteCandidate from '@salesforce/apex/favouriteBookmarkController.candidateFavourite';
import removefavouriteCandidate from '@salesforce/apex/favouriteBookmarkController.removeCandidateFavourite';
import getDetailPageLayoutRecord from '@salesforce/apex/candidateSearch.getDetailPageLayoutRecord';
import createDetailPageLayoutRecord from '@salesforce/apex/candidateSearch.createDetailPageLayoutRecord';
export default class JobPortal extends LightningElement {
    currentLoggingUser = Id;
    @track currentLoggingUserContactId;
    @track contactList = []; @track contactListCount;
    @track compactViewContactList;
    @track visibleContact;
    @track compectViewTabAreaoptions = [];
    @track compactViewVisibleContact;
    basepath = basepath;
    childScreenVisibility = true;
    component = false;
    loader = true;
    star = star;
    childID = '';
    businessLogo = businessCardLogo;
    activityTracker = '';
    compectViewTabDataVisibility = false;
    InviteButtonIcon = basicInfo + '/ISSv2/Group1.png';
    userIcon = basicInfo + '/ISSv2/Group2.png';
    messageIcon = basicInfo + '/ISSv2/Group3.png';
    barIcon = basicInfo + '/ISSv2/Group4.png';
    multipleIcon = basicInfo + '/ISSv2/Group5.png'; degreeIds = 'Degree_Type__c';
    showDegreeList = [];
    languageIds = ''
    languageList = []
    carriculamId = '';
    carriculamList = []; sortingOption = [
        { label: 'BEST MATCHES', value: 'BEST MATCHES' },
        { label: 'Alphabetical A-Z', value: 'Alphabetical A-Z' },
        { label: 'Alphabetical Z-A', value: 'Alphabetical Z-A' },
    ]; count = 0;
    renderedCallback() {
        document.querySelector('html').style.overflowX = 'hidden';
        document.querySelector('body').style.overflowX = 'hidden';
        if (this.currentFieldsOptions != undefined) {
            this.reorderComponents();
        }
    }
    data = [
        { 'DepartMent': 'Social Studies  ', 'Subject': 'Assistent / Assistent Principal', 'Education': 'Elementry', 'Curriclum': 'NA' }
    ];
    @track Departments = []; @track Experiences = [
        { label: '0-1', value: '0-1' },
        { label: '2-4', value: '2-4' },
        { label: '5-8', value: '5-8' },
        { label: '9-10', value: '9-10' },
        { label: '10+', value: '10+' }
    ]; @track Family = [
        { label: 'All', value: 'All' },
        { label: 'Only Teams', value: 'Only Teams' },
        { label: 'Only Singles', value: 'Only Singles' }
    ]; @track Dependents = [
        { label: '0', value: '0' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3+', value: '3+' }
    ]; @track languagesSpoken = [
        { label: 'Afrikaans', value: 'Afrikaans' },
        { label: 'Arabic', value: 'Arabic' },
        { label: 'Bengali', value: 'Bengali' },
        { label: 'Chittagonian', value: 'Chittagonian' },
        { label: 'Czech', value: 'Czech' },
        { label: 'English', value: 'English' },
        { label: 'French', value: 'French' },
        { label: 'German', value: 'German' },
        { label: 'Greek', value: 'Greek' },
        { label: 'Gujarati', value: 'Gujarati' },
        { label: 'Hindi', value: 'Hindi' },
        { label: 'Hungarian', value: 'Hungarian' },
        { label: 'Indonesian', value: 'Indonesian' },
        { label: 'Italian', value: 'Italian' },
        { label: 'Japanese', value: 'Japanese' },
        { label: 'Kannada', value: 'Kannada' },
        { label: 'Korean', value: 'Korean' },
        { label: 'Kurdish', value: 'Kurdish' },
        { label: 'Maithili', value: 'Maithili' },
        { label: 'Malay', value: 'Malay' },
        { label: 'Mandarin', value: 'Mandarin' },
        { label: 'Marathi', value: 'Marathi' },
        { label: 'Nepali', value: 'Nepali' },
        { label: 'Norwegian', value: 'Norwegian' },
        { label: 'Pashto', value: 'Pashto' },
        { label: 'Persian', value: 'Persian' },
        { label: 'Polish', value: 'Polish' },
        { label: 'Portuguese', value: 'Portuguese' },
        { label: 'Punjabi', value: 'Punjabi' },
        { label: 'Romanian', value: 'Romanian' },
        { label: 'Russian', value: 'Russian' },
        { label: 'Slavic', value: 'Slavic' },
        { label: 'Spanish', value: 'Spanish' },
        { label: 'Swahili', value: 'Swahili' },
        { label: 'Swedish', value: 'Swedish' },
        { label: 'Tamil', value: 'Tamil' },
        { label: 'Telugu', value: 'Telugu' },
        { label: 'Thai', value: 'Thai' },
        { label: 'Turkish', value: 'Turkish' },
        { label: 'Ukranian', value: 'Ukranian' },
        { label: 'Urdu', value: 'Urdu' },
        { label: 'Vietnamese', value: 'Vietnamese' },
        { label: 'Wu Chinese', value: 'Wu Chinese' },
        { label: 'Other', value: 'Other' }
    ]; @track Proficiency = [
        { label: 'Basic', value: 'Basic' },
        { label: 'Beginner', value: 'Beginner' },
        { label: 'Conversant', value: 'Conversant' },
        { label: 'Proficient', value: 'Proficient' },
        { label: 'Fluent', value: 'Fluent' }
    ]; @track iFairAttendance = [
        { label: 'Time Zone Test Fair', value: 'Time Zone Test Fair' },
        { label: 'iFair® December 2022', value: 'iFair® December 2022' },
        { label: 'DoNotApply 0927 Virtual fair', value: 'DoNotApply 0927 Virtual fair' },
        { label: 'toobio', value: 'toobio' },
        { label: 'asfasf', value: 'asfasf' },
        { label: 'DoNotApply Test Fair 1210 republish unpublishing', value: 'DoNotApply Test Fair 1210 republish unpublishing' },
        { label: 'iFair® January 2022', value: 'iFair® January 2022' },
        { label: 'Testing', value: 'Testing' },
        { label: 'dONOTApply 1001 dummy school added on SA side test', value: 'dONOTApply 1001 dummy school added on SA side test' },
        { label: 'iFair® November 2021', value: 'iFair® November 2021' },
        { label: 'DoNotApply 0927 no school or candidate', value: 'DoNotApply 0927 no school or candidate' },
        { label: 'DoNotApply 1220 Test Fair', value: '' },
        { label: 'test - 2875 - 2', value: 'test - 2875 - 2' },
        { label: 'Test - 2875', value: 'Test - 2875' },
        { label: 'Test Fair 22', value: 'Test Fair 22' },
        { label: 'REC - 2875 - 3', value: 'REC - 2875 - 3' },
        { label: 'iFair® February 2022', value: 'iFair® February 2022' },
        { label: 'Test 3', value: 'Test 3' },
    ]; @track PositionType = [
        { label: 'Full Time', value: 'Full Time' },
        { label: 'Part Time', value: 'Part Time' },
        { label: 'Online', value: 'Online' },
        { label: 'Short', value: 'Term/Summer Short Term/Summer' },
        { label: 'Intern', value: 'Intern' },
        { label: 'Substitute/Supply', value: 'Substitute/Supply' },
        { label: 'Student Teacher', value: 'Student Teacher' }
    ]; @track CurriculumExperiences = []; @track MinimumDegree = [
        { label: 'Primary', value: 'Primary' },
        { label: 'Secondary', value: 'Secondary' },
        { label: 'Associates Degree', value: 'Associates Degree' },
        { label: 'Bachelors', value: 'Bachelors' },
        { label: 'Ed.D', value: 'Ed.D' },
        { label: 'Masters', value: 'Masters' },
        { label: 'Ph.D/ Doctorate', value: 'Ph.D/ Doctorate' },
        { label: 'Other', value: 'Other ' }
    ]; @track countries = []; @track subjects = []; departmentSubjects = {
        'Arts': [
            'Art ES',
            'Art HS',
            'Art MS',
            'Art Whole School',
            'Graphic Arts',
            'Head of Dept/Coordinator - ES',
            'Head of Dept/Coordinator - HS',
            'Head of Dept/Coordinator - MS',
            'Head of Dept/Coordinator - Whole School',
            'Photography'
        ],
        'Computer Education/Technology': [
            'CAD / CAM',
            'College Level/Advanced',
            'Design Technology',
            'IT/Technology Support K-12',
            'NetworkAdministrator',
            'Robotics',
            'TechnologyCoach/Coordinator-ES',
            'TechnologyCoach/Coordinator-HS',
            'TechnologyCoach/Coordinator-K-12',
            'TechnologyCoach/Coordinator-MS',
            'WholeSchool'
        ],
        'Counseling/Psychology': [
            'College/CareerCounseling',
            'Counselor-ES',
            'Counselor-HS',
            'Counselor-MS',
            'SchoolPsychologist',
            'WholeSchool'
        ],
        'EarlyChildhoodEducation(ECE)': [
            'EarlyYears/Nursery/PreK'
        ],
        'Elementary': [
            'AllGrades',
            'LowerElementary,1-2',
            'PreK - Kindergarten',
            'Upper Elementary, 3-5'
        ],
        'English as an Additional Language': [
            'EAL/ESL - Coordinator',
            'EAL/ESL - ES',
            'EAL/ESL - HS',
            'EAL/ESL - MS',
            'Whole School'
        ],
        'English/Language Arts': [
            'College Level/Advanced',
            'English/Language Arts - ES',
            'English/Language Arts - HS',
            'English/Language Arts - MS',
            'English/Language Arts - Whole School',
            'Head of Dept/Coordinator - ES',
            'Head of Dept/Coordinator - HS',
            'Head of Dept/Coordinator - MS',
            'Journalism',
            'Literacy Coach  - Secondary',
            'Literacy Coach - Primary',
            'Literature',
            'Yearbook'
        ],
        'Foreign Language': [
            'Afrikaans',
            'Arabic',
            'Bengali',
            'Chittagonian',
            'Czech',
            'English',
            'French',
            'French - College Level',
            'French - ES',
            'French - Early Years',
            'French - HS',
            'French - MS',
            'French - Whole School',
            'German',
            'German - ES',
            'German - HS',
            'German - MS',
            'Greek',
            'Gujarati',
            'Head of Dept/Coordinator - HS',
            'Head of Dept/Coordinator - MS',
            'Hindi',
            'Hungarian',
            'Indonesian',
            'Italian',
            'Japanese',
            'Japanese - HS',
            'Japanese - MS',
            'Kannada',
            'Korean',
            'Kurdish',
            'Maithili',
            'Malay',
            'Mandarin',
            'Mandarin - College Level',
            'Mandarin - ES',
            'Mandarin - Early Years',
            'Mandarin - HS',
            'Mandarin - MS',
            'Mandarin - Whole School',
            'Marathi',
            'Nepali',
            'Norwegian',
            'Other',
            'Pashto',
            'Persian',
            'Polish',
            'Portuguese',
            'Punjabi',
            'Romanian',
            'Russian',
            'Slavic',
            'Spanish',
            'Spanish ES',
            'Spanish Early Years',
            'Spanish HS',
            'Spanish MS',
            'Spanish Whole School',
            'Swahili',
            'Swedish',
            'Tamil',
            'Telugu',
            'Thai',
            'Turkish',
            'Ukranian',
            'Urdu',
            'Vietnamese',
            'World Language Coordinator',
            'Wu Chinese'
        ],
        'Humanities': [
            'Anthropology',
            'Head of Dept/Coordinator - HS',
            'Humanities - HS',
            'Humanities - MS',
            'Humanities Coordinator',
            'Model UN/Speech/Debate',
            'Philosophy',
            'Psychology',
            'Religious Studies',
            'Sociology',
            'Theory of Knowledge'
        ],
        'Library/Media': [
            'Library / Media Specialist - ES',
            'Library / Media Specialist - HS',
            'Library / Media Specialist - MS',
            'Whole School'
        ],
        'Mathematics': [
            'Calculus',
            'College Level/Advanced',
            'HS Math Coordinator / Dept Head',
            'Head of Dept/Coordinator - ES',
            'Head of Dept/Coordinator - HS',
            'Head of Dept/Coordinator - MS',
            'Head of Dept/Coordinator - Whole School',
            'MS Math Coordinator',
            'Math ES',
            'Math HS',
            'Math MS',
            'Math Whole School',
            'Mathematics Coach',
            'Statistics'
        ],
        'Music': [
            'Choral Music',
            'Head of Dept/Coordinator - HS',
            'Head of Dept/Coordinator - MS',
            'Instrumental Music',
            'Music ES',
            'Music HS',
            'Music MS',
            'Orchestral Music',
            'Whole School'
        ],
        'Performing Arts': [
            'Dance',
            'Drama/Theater',
            'Film and Multimedia',
            'Generalist',
            'Head of Dept/Coordinator'
        ],
        'Physical Education/Health': [
            'Aquatics',
            'Assistant Coach',
            'Coach',
            'Head of Dept/Coordinator - HS',
            'Head of Dept/Coordinator - MS',
            'Health',
            'Physical Education ES',
            'Physical Education HS',
            'Physical Education MS',
            'Outdoor Education',
            'Whole School'
        ],
        'Science': [
            'Biology/Life Science',
            'Chemistry',
            'College Level/Advanced',
            'Earth Science',
            'Environmental Science',
            'General Science ES',
            'General Science HS',
            'General Science MS',
            'General Science Whole School',
            'Head of Dept/Coordinator - ES',
            'Head of Dept/Coordinator - HS',
            'Head of Dept/Coordinator - MS',
            'Head of Dept/Coordinator - Whole School',
            'Physical Science',
            'Physics',
            'Science Coordinator ES',
            'Science Coordinator HS',
            'Science Coordinator MS'
        ],
        'Social Studies': [
            'Business/Marketing',
            'College Level/Advanced',
            'Economics',
            'Geography HS',
            'HS Social Studies Coordinator / Dept Head',
            'Head of Dept/Coordinator - HS',
            'Head of Dept/Coordinator - MS',
            'MS Social Studies Coordinator',
            'Social Studies - ES',
            'Social Studies - HS',
            'Social Studies - MS',
            'Social Studies - Whole School',
            'US History HS',
            'World History HS'
        ],
        'Special Education': [
            'Literacy Coach',
            'Occupational Therapist',
            'Reading Specialist ES',
            'Reading Specialist HS',
            'Reading Specialist MS',
            'Special Education / Learning Support, ES',
            'Special Education / Learning Support, HS',
            'Special Education / Learning Support, MS',
            'Speech Therapist',
            'Whole School'
        ],
        'Gifted and Talented': [
            'Gifted and Talented ES',
            'Gifted and Talented HS',
            'Gifted and Talented MS',
            'Whole School'
        ],
        'Teacher Leader': [
            'CAS Coordinator',
            'IBDP Coordinator',
            'IBMYP Coordinator',
            'IBPYP Coordinator',
            'Service Learning Coordinator',
            'Sustainability Coordinator',
            'Teaching and Learning Coach/Coordinator',
            'Wellness Coordinator'
        ],
        'Administration': [
            'Academic Dean',
            'Administrative Assistant',
            'Associate/Assistant Academic Dean',
            'Associate/Assistant Dean of Students',
            'Associate/Assistant Elementary School Principal',
            'Associate/Assistant High School Principal',
            'Associate/Assistant Middle School Principal',
            'Associate/Assistant Whole School Principal',
            'Boarding School Manager',
            'Business Manager',
            'Chief Administrative Officer (CAO)',
            'Chief Executive Officer (CEO)',
            'Chief Financial Officer (CFO)',
            'Chief Information Officer (CIO)',
            'Chief Operations Officer (COO)',
            'Dean of Students',
            'Deputy Head of School/Director/Superintendent',
            'Director of Alumni Relations',
            'Director of Athletics and Activities',
            'Director of Curriculum and Assessment',
            'Director of Curriculum and/or Assessment',
            'Director of Development and Advancement',
            'Director of Human Resources',
            'Director of Marketing and Communications',
            'Director of Student Support Services',
            'Director of Teaching and Learning',
            'Director of Technology',
            'Director of Admissions',
            'Early Childhood Associate/Assistant Director',
            'Early Childhood Director',
            'Elementary Principal',
            'Facilities Manager',
            'Head of School/Director/Superintendent',
            'High School Principal',
            'Interim Head of School/Director',
            'Middle School Principal',
            'Whole School Principal'
        ],
        'Support Positions': [
            'Art ES',
            'Art HS',
            'Art Whole School',
            'Boarding Houseparent',
            'Design Technology',
            'English/Language Arts - ES',
            'English/Language Arts - HS',
            'English/Language Arts - MS',
            'English/Language Arts - Whole School',
            'IT/Technology Support K-12',
            'Long Term Substitute - ES',
            'Long Term Substitute - Early Years',
            'Long Term Substitute - HS',
            'Long Term Substitute - MS',
            'Long Term Substitute - Whole School',
            'Teaching Assistant - ES',
            'Teaching Assistant - Early Years',
            'Teaching Assistant - HS',
            'Teaching Assistant - MS',
            'Teaching Assistant - Whole School'
        ],
        'Secondary Teachers': [
            'Secondary Teachers'
        ]
    }

    @track subjectListDepartment = [];
    selectSubject(event) {
        try {
            var arr = this.departmentSubject[event.currentTarget.value];
            var sub = [];
            for (var i = 0; i < arr.length; i++) {
                var subjectJson = {
                    label: arr[i],
                    value: arr[i]
                }
                sub.push(subjectJson)
            }
            this.subjectListDepartment = sub;
        } catch (err) {
            console.log('OUTPUT : ', err);
        }
    }
    groups = MoreFiltersImages + '/filterIcons/group.png';
    invites = MoreFiltersImages + '/filterIcons/Group1.png';
    checked = MoreFiltersImages + '/filterIcons/Group2.png';
    inviteButtonIcon = MoreFiltersImages + '/filterIcons/Group3.png';
    email = MoreFiltersImages + '/filterIcons/Group4.png';
    likedUser = MoreFiltersImages + '/filterIcons/Group5.png';
    query = MoreFiltersImages + '/filterIcons/Group6.png';
    cancle = MoreFiltersImages + '/filterIcons/Group8.png';
    barchart1 = MoreFiltersImages + '/filterIcons/Group8.png';
    starChecked = MoreFiltersImages + '/filterIcons/starChecked.png';
    starUnchecked = MoreFiltersImages + '/filterIcons/starUnchecked.png'; showUsers = MoreFiltersImages + '/filterIcons/Group750.png';
    showStar = MoreFiltersImages + '/filterIcons/Star3.png';
    showExclaim = MoreFiltersImages + '/filterIcons/Group166.png'; table;
    tabledata = [
        { id: 1, name: "Oli Bob", age: "12", col: "red", dob: "" },
        { id: 2, name: "Mary May", age: "1", col: "blue", dob: "14/05/1982" },
        { id: 3, name: "Christine Lobowski", age: "42", col: "green", dob: "22/05/1982" },
        { id: 4, name: "Brendon Philips", age: "125", col: "orange", dob: "01/08/1980" },
        { id: 5, name: "Margret Marmajuke", age: "16", col: "yellow", dob: "31/01/1999" },
    ];
    showDetails(event) {
        if (window.innerWidth <= 700) {
            console.log('Showing CHiled')
            this.template.querySelector('.childScreen').style.display = 'block';
            if (this.childScreenVisibility == true) {
                this.contactList.forEach(element => {
                    if (element.Id == event.target.dataset.record) {
                        this.visibleContact = element;
                    }
                });
                this.childScreenVisibility = true;
                // this.template.querySelector('c-job-child-component').showChat(event.target.dataset.record);
            }
            else {
                this.contactList.forEach(element => {
                    if (element.Id == event.target.dataset.record) {
                        this.visibleContact = element;
                    }
                });
                this.childScreenVisibility = true;
            }
            this.template.querySelector('c-job-child-component').controllFromParent();
        }
        else {
            if (this.childScreenVisibility == true) {
                this.template.querySelector('c-job-child-component').showChat(event.target.dataset.record);
            }
            else {
                this.contactList.forEach(element => {
                    5
                    if (element.Id == event.target.dataset.record) {
                        this.visibleContact = element;
                    }
                });
                this.childScreenVisibility = true;
            }
        }
    }

    months = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']; @track schoolList;
    @track jobsPositionList = [];
    currentActiveJob;
    total = 0; totalRecords = [];
    Hired; hiredRecords = [];
    countInvited; countInvitedRecords = [];
    Contacted; ContactedRecords = [];
    InvitationAccepted; InvitationAcceptedRecords = [];
    InvitationDeclined; InvitationDeclinedRecords = [];
    Interested; InterestedRecords = [];
    @track jobListRowData;

    updateHeaderTabsValues(element) {
        console.log('Changing Job : ');
        this.contactList = this.totalRecords;
        setTimeout(() => {
            this.template.querySelector('.currentRecordsType').innerHTML = 'Total';
        }, 0);
        this.contactListCount = this.contactList.length; let countInvited = 0;
        let InvitationAccepted = 0;
        let InvitationDeclined = 0;
        let Hired = 0;
        let Contacted = 0;
        this.Interested = 0;
        this.hiredRecords = [];
        this.countInvitedRecords = [];
        this.ContactedRecords = [];
        this.InvitationAcceptedRecords = [];
        this.InvitationDeclinedRecords = [];
        this.InterestedRecords = [];
        console.log('Step 3');
        if (this.contactList.length > 0) {
            console.log('Step 31');
            this.childScreenVisibility = true;
            this.visibleContact = this.contactList[0];
            setTimeout(() => {
                this.template.querySelector('c-job-child-component').addFirstTab(this.visibleContact);
            }, 0)
        }
        else {
            console.log('Step 32');
            this.childScreenVisibility = false;
        } console.log('Step 4'); if (element.Candidate_Jobs__r == undefined) {
            countInvited = 0;
            InvitationAccepted = 0;
            InvitationDeclined = 0;
            Hired = 0;
            Contacted = 0;
        }
        else {
            element.Candidate_Jobs__r.forEach(ele => {
                if (ele.Status__c == 'Invited') {
                    countInvited++;
                    this.countInvitedRecords.push(ele.Contact__c);
                }
                if (ele.Status__c == 'Invitation Declined') {
                    InvitationDeclined++;
                    this.InvitationDeclinedRecords.push(ele.Contact__c);
                }
                if (ele.Status__c == 'Invitation Accepted') {
                    InvitationAccepted++;
                    this.InvitationAcceptedRecords.push(ele.Contact__c);
                }
                if (ele.Status__c == 'Hired') {
                    Hired++;
                    this.hiredRecords.push(ele.Contact__c);
                }
                if (ele.Status__c == 'Contacted') {
                    Contacted++;
                    this.ContactedRecords.push(ele.Contact__c);
                }
            });
        } console.log('Step 5'); this.countInvited = countInvited;
        this.InvitationAccepted = InvitationAccepted;
        this.InvitationDeclined = InvitationDeclined;
        this.Hired = Hired;
        this.Contacted = Contacted;
        this.Interested = element.Activity_Tracker__r.length;
        if (element.Activity_Tracker__r.length > 0) {
            element.Activity_Tracker__r.forEach(elm => {
                this.InterestedRecords.push(elm.Current_User__c);
            });
        }
    } @track subjectsOptions;
    connectedCallback() {
        this.subjectsOptions = this.subjects;

        getDetailPageLayoutRecord({ userId: this.currentLoggingUser, layoutName: 'Compact Page' }).then(result => {
            let res = result;
            console.log('getDetailPageLayoutRecord : ' + res);
            if (res.length > 0) {
                console.log('Has Records');
                this.currentFieldsOptions = JSON.parse(res[0].Value__c);
                this.reorderComponents();
                this.currentFieldsOptions.forEach(element => {
                    console.log(element);
                })
            }
            else {
                console.log('no Records');
                this.currentFieldsOptions = this.defaultValues;
                this.reorderComponents();
            }
        }).catch(error => {
            console.log(error);
        })

        getContactId({ userId: this.currentLoggingUser }).then(result => {
            this.currentLoggingUserContactId = result;
            fetchSchoolsForRecruiters({ currentUserId: this.currentLoggingUser }).then(result => {
                this.jobListRowData = result; this.jobListRowData.forEach(element => {
                    this.jobsPositionList.push({ label: element.Name, value: element.Id, position: element.Job_Position__c, department: element.Department__c, subject: element.Subject__c });
                })
                if (this.jobsPositionList.length > 0) {
                    this.currentActiveJob = this.jobsPositionList[0].value; setTimeout(() => {
                        this.template.querySelector('.jobListInput').value = this.jobsPositionList[0].label;
                        this.template.querySelector('c-job-child-component').getJobId(this.currentActiveJob);
                    }, 0);
                } this.updateHeaderTabsValues(this.jobListRowData[0]);
            }).catch(error => {
                console.log(error);
            })
        }).catch(error => {
            console.log(error);
        })
        getContactsForCandidateSearch({ userId: this.currentLoggingUser }).then(res => {
            this.contactList = JSON.parse(JSON.stringify(res.conLists));
            this.contactList.forEach(element => {
                element.classes = 'remainingRecords';
            })
            this.total = this.contactList.length;
            this.totalRecords = this.contactList;
            this.contactList.forEach(element => {
                if (element.Activity_Tracker__r == undefined) {
                    element.bookmarkStatus = this.starUnchecked;
                    element.checked = 'true';
                }
                else {
                    element.bookmarkStatus = this.starChecked;
                    element.checked = 'false';
                }
                if (element.Date_of_Availability__c != undefined) {
                    element.Date_of_Availability__c = this.months[parseInt(element.Date_of_Availability__c.split('T')[0].split('-')[1]) - 1] + ' ' + element.Date_of_Availability__c.split('T')[0].split('-')[2] + ', ' + element.Date_of_Availability__c.split('T')[0].split('-')[0];
                } if (element.Birthdate != undefined) {
                    element.Birthdate = this.months[parseInt(element.Birthdate.split('T')[0].split('-')[1]) - 1] + ' ' + element.Birthdate.split('T')[0].split('-')[2] + ', ' + element.Birthdate.split('T')[0].split('-')[0];
                }
                if (element.yearsOfExperience__c != undefined) {
                    element.yearsOfExperience__c = element.yearsOfExperience__c + ' Year';
                }
                else {
                    element.yearsOfExperience__c = '0 Year';
                }
            })
            this.contactListCount = this.contactList.length;
            if (this.contactList.length > 0) {
                this.childScreenVisibility = true;
                this.visibleContact = this.contactList[0];
                setTimeout(() => {
                    this.template.querySelector('c-job-child-component').showChat(this.visibleContact.Id);
                }, 0);
            }
            else {
                this.childScreenVisibility = false;
            }
            this.compactViewContactList = this.contactList;
            res.degreePicklist.forEach(element => {
                this.showDegreeList.push({ label: element, value: element });
            });
            this.showDegreeList = JSON.parse(JSON.stringify(this.showDegreeList)); this.compactViewContactList = this.contactList; this.totalRecords = this.contactList; setTimeout(() => {
                this.template.querySelector('.currentRecordsType').innerHTML = 'Total';
            }, 0); this.component = true;
            this.loader = false;
        }).catch(error => {
            console.log(error);
            this.loader = false;
        })
        getAllFiltersOptionValues().then(result => {
            result[0].forEach(element => {
                this.countries.push({ label: element, value: element });
            });
            result[1].forEach(element => {
                this.CurriculumExperiences.push({ label: element, value: element });
            });
            result[2].forEach(element => {
                this.subjects.push({ label: element, value: element });
            });
            result[3].forEach(element => {
                this.Departments.push({ label: element, value: element });
            });
        }).catch(error => {
            console.log(error);
        })
    }
    hideComponent() {
        this.childScreenVisibility = false;
    }
    showfavourite(event) {
        this.childID = event.detail;
        this.contactList.forEach(element => {
            if (element.Id == this.childID) {
                element.bookmarkStatus = this.starChecked;
            }
        })
    }
    removefavourite(event) {
        this.childID = event.detail;
        this.contactList.forEach(element => {
            if (element.Id == this.childID) {
                element.bookmarkStatus = this.starUnchecked;
            }
        })
    }
    toggleComponents() {
        this.template.querySelector('.headertwoComboBox').style.display = 'flex';
        this.template.querySelector('.userList').style.display = 'block';
        this.template.querySelector('.childScreen').style.display = 'none';
    }
    showTabs() {
        this.template.querySelector('.tabs').style.display = 'flex';
        this.template.querySelector('.headerTabsOverlay').style.display = 'block';
    }
    searchContact(event) {
        if (event.target.value == "") {
            let count = 0;
            this.template.querySelectorAll('.con-bubble').forEach(element => {
                element.style.visibility = 'visible';
                element.style.position = 'relative';
                count++;
            });
            this.contactListCount = count;
        }
        else {
            let removed = 0;
            let total = 0;
            this.template.querySelectorAll('.con-bubble').forEach(element => {
                element.style.visibility = 'visible';
                element.style.position = 'relative';
                total++;
                if (!(element.querySelector('.conatactName').innerHTML.toLowerCase().includes(event.target.value.toLowerCase()))) {
                    element.style.visibility = 'hidden';
                    element.style.position = 'absolute';
                    removed++;
                }
            });
            this.contactListCount = total - removed;
        }
    } showHideCompactView() {
        this.compactViewContactList = this.contactList;
        if (this.template.querySelector('.compactViewToggleComponent').style.marginLeft == '0%') {
            this.template.querySelector('.compactViewToggleComponent').style.marginLeft = '-110%';
        }
        else {
            this.template.querySelector('.compactViewToggleComponent').style.marginLeft = '0%';
            this.template.querySelector('c-job-child-component').getOpenTabsFromCompactView(this.compectViewTabAreaoptions);
        }
    } createTabsForCompactView() {
        let elementChecked;
        this.template.querySelectorAll('.checkBox').forEach(element => {
            if (element.checked == true) {
                elementChecked = true;
            }
        }); if (elementChecked == true) {
            this.compectViewTabAreaoptions = []; this.template.querySelector('.compectViewTabArea').style.display = 'flex';
            this.template.querySelector('.compactViewHeader').style.display = 'none';
            this.template.querySelector('.compectViewButtons').style.display = 'none'; let ids = [];
            this.template.querySelectorAll('.checkBox').forEach(element => {
                if (element.checked == true) {
                    ids.push(element.dataset.id);
                }
            }); ids.forEach(element => {
                this.contactList.forEach(ele => {
                    if (ele.Id == element) {
                        this.compectViewTabAreaoptions.push(ele);
                    }
                });
            }); this.compactViewVisibleContact = this.compectViewTabAreaoptions[0];
            this.template.querySelector('.compectViewData').style.display = 'none'; setTimeout(() => {
                this.template.querySelector('.tab').classList.add('active');
            }, 0); this.compectViewTabDataVisibility = true;
        }
        else {
            const event = new ShowToastEvent({
                message: 'Please select atleast one contact.',
                variant: 'error'
            });
            this.dispatchEvent(event);
        }
    } createTabsInBrowser() {
        let elementChecked;
        this.template.querySelectorAll('.checkBox').forEach(element => {
            if (element.checked == true) {
                elementChecked = true;
            }
        }); if (elementChecked == true) {
            this.template.querySelectorAll('.checkBox').forEach(element => {
                if (element.checked == true) {
                    window.open(this.basepath + '/candidate-details?cid=' + element.dataset.id);
                }
            });
        }
        else {
            const event = new ShowToastEvent({
                message: 'Please select atleast one contact.',
                variant: 'error'
            });
            this.dispatchEvent(event);
        }
    }
    changeTab(event) {
        if (this.template.querySelector('.compectViewData').style.display != 'none') {
            this.template.querySelector('.compactViewHeader').style.display = 'none';
            this.template.querySelector('.compectViewButtons').style.display = 'none';
            this.template.querySelector('.compectViewData').style.display = 'none';
            this.compectViewTabDataVisibility = true;
        } switch (event.target.nodeName) {
            case 'DIV':
                this.template.querySelectorAll('.tab').forEach(element => {
                    element.classList.remove('active');
                });
                event.target.classList.add('active');
                this.contactList.forEach(element => {
                    if (element.Id == event.target.dataset.id) {
                        this.compactViewVisibleContact = element;
                    }
                });
                break;
            case 'P':
                this.template.querySelectorAll('.tab').forEach(element => {
                    element.classList.remove('active');
                });
                event.target.parentElement.classList.add('active');
                this.contactList.forEach(element => {
                    if (element.Id == event.target.parentElement.dataset.id) {
                        this.compactViewVisibleContact = element;
                    }
                });
                break;
            case 'LIGHTNING-ICON':
                if (this.compectViewTabAreaoptions.length > 1) {
                    if (event.target.parentElement.dataset.index == 0 && event.target.parentElement.classList.contains('active')) {
                        this.compactViewVisibleContact = this.compectViewTabAreaoptions[1];
                        this.compectViewTabAreaoptions.splice(event.target.dataset.index, 1);
                        setTimeout(() => {
                            this.template.querySelector('.tab').classList.add('active');
                        }, 100)
                    }
                    else {
                        if (event.target.parentElement.classList.contains('active')) {
                            this.template.querySelectorAll('.tab').forEach(element => {
                                if ((event.target.parentElement.dataset.index - 1) == element.dataset.index) {
                                    element.classList.add('active');
                                    this.contactList.forEach(ele => {
                                        if (ele.Id == element.dataset.id) {
                                            this.compactViewVisibleContact = ele;
                                        }
                                    });
                                }
                            });
                            this.compectViewTabAreaoptions.splice(event.target.dataset.index, 1);
                        }
                        else {
                            this.compectViewTabAreaoptions.splice(event.target.dataset.index, 1);
                        }
                    }
                }
                else {
                    this.compectViewTabDataVisibility = false;
                    this.template.querySelector('.compectViewTabArea').style.display = 'none';
                    this.template.querySelector('.compactViewHeader').style.display = 'flex';
                    this.template.querySelector('.compectViewButtons').style.display = 'flex';
                    this.template.querySelector('.compectViewData').style.display = 'block';
                    this.template.querySelector('.compactViewHeader').style.borderTopLeftRadius = '20px';
                    this.template.querySelector('.compactViewHeader').style.borderTopRightRadius = '20px';
                }
                break;
        }
    } showTable() {
        this.template.querySelectorAll('.tab').forEach(element => {
            element.classList.remove('active');
        });
        this.compectViewTabDataVisibility = false;
        this.template.querySelector('.compactViewHeader').style.display = 'flex';
        this.template.querySelector('.compectViewButtons').style.display = 'flex';
        this.template.querySelector('.compectViewData').style.display = 'block';
        this.template.querySelector('.compactViewHeader').style.borderTopLeftRadius = '0px';
        this.template.querySelector('.compactViewHeader').style.borderTopRightRadius = '0px';
    } showMoreFilter() {
        this.template.querySelector('.morefiltersModal').style.display = 'block';
        this.template.querySelector('.morefiltersModalOverlay').style.display = 'block';
        this.MoreFiltersoptionsOverlayClicked();
    } hideMoreFilter() {
        this.template.querySelector('.morefiltersModalOverlay').style.opacity = '0';
        this.template.querySelector('.morefiltersModal').style.top = '-80vh';
        setTimeout(() => {
            this.template.querySelector('.morefiltersModal').style.display = 'none';
            this.template.querySelector('.morefiltersModalOverlay').style.display = 'none';
            this.template.querySelector('.morefiltersModalOverlay').style.opacity = '0.5';
            this.template.querySelector('.morefiltersModal').style.top = '10vh';
        }, 600);
    } shortByName() {
        if (this.template.querySelector('.shortByName').iconName == 'utility:up') {
            this.template.querySelector('.shortByName').iconName = 'utility:down'; for (let i = 0; i < this.compactViewContactList.length; i++) {
                if (this.compactViewContactList[i].Name[0].toLowerCase() < this.compactViewContactList[i + 1].Name[0].toLowerCase()) {
                    const temp = this.compactViewContactList[i];
                    this.compactViewContactList[i] = this.compactViewContactList[i + 1];
                    this.compactViewContactList[i + 1] = temp;
                    i = -1;
                }
            }
        }
        else {
            this.template.querySelector('.shortByName').iconName = 'utility:up'; for (let i = 0; i <= this.compactViewContactList.length; i++) {
                if (this.compactViewContactList[i].Name[0].toLowerCase() > this.compactViewContactList[i + 1].Name[0].toLowerCase()) {
                    const temp = this.compactViewContactList[i];
                    this.compactViewContactList[i] = this.compactViewContactList[i + 1];
                    this.compactViewContactList[i + 1] = temp;
                    i = -1;
                }
            }
        }
    } shortByCountry() {
        if (this.template.querySelector('.shortByCountry').iconName == 'utility:up') {
            this.template.querySelector('.shortByCountry').iconName = 'utility:down'; for (let i = 0; i < this.compactViewContactList.length; i++) {
                if (this.compactViewContactList[i].Country__c[0].toLowerCase() < this.compactViewContactList[i + 1].Country__c[0].toLowerCase()) {
                    const temp = this.compactViewContactList[i];
                    this.compactViewContactList[i] = this.compactViewContactList[i + 1];
                    this.compactViewContactList[i + 1] = temp;
                    i = -1;
                }
            }
        }
        else {
            this.template.querySelector('.shortByCountry').iconName = 'utility:up'; for (let i = 0; i <= this.compactViewContactList.length; i++) {
                if (this.compactViewContactList[i].Country__c[0].toLowerCase() > this.compactViewContactList[i + 1].Country__c[0].toLowerCase()) {
                    const temp = this.compactViewContactList[i];
                    this.compactViewContactList[i] = this.compactViewContactList[i + 1];
                    this.compactViewContactList[i + 1] = temp;
                    i = -1;
                }
            }
        }
    }
    shortByRefereeScore() {
        if (this.template.querySelector('.shortByRefereeScore').iconName == 'utility:up') {
            this.template.querySelector('.shortByRefereeScore').iconName = 'utility:down'; for (let i = 0; i < this.compactViewContactList.length; i++) {
                if (this.compactViewContactList[i].refereeRating__c < this.compactViewContactList[i + 1].refereeRating__c) {
                    const temp = this.compactViewContactList[i];
                    this.compactViewContactList[i] = this.compactViewContactList[i + 1];
                    this.compactViewContactList[i + 1] = temp;
                    i = -1;
                }
            }
        }
        else {
            this.template.querySelector('.shortByRefereeScore').iconName = 'utility:up'; for (let i = 0; i <= this.compactViewContactList.length; i++) {
                if (this.compactViewContactList[i].refereeRating__c > this.compactViewContactList[i + 1].refereeRating__c) {
                    const temp = this.compactViewContactList[i];
                    this.compactViewContactList[i] = this.compactViewContactList[i + 1];
                    this.compactViewContactList[i + 1] = temp;
                    i = -1;
                }
            }
        }
    }
    shortByExperience() {
        if (this.template.querySelector('.shortByExperience').iconName == 'utility:up') {
            this.template.querySelector('.shortByExperience').iconName = 'utility:down'; for (let i = 0; i < this.compactViewContactList.length; i++) {
                if (this.compactViewContactList[i].yearsOfExperience__c.split(' Year')[0] < this.compactViewContactList[i + 1].yearsOfExperience__c.split(' Year')[0]) {
                    const temp = this.compactViewContactList[i];
                    this.compactViewContactList[i] = this.compactViewContactList[i + 1];
                    this.compactViewContactList[i + 1] = temp;
                    i = -1;
                }
            }
        }
        else {
            this.template.querySelector('.shortByExperience').iconName = 'utility:up'; for (let i = 0; i <= this.compactViewContactList.length; i++) {
                if (this.compactViewContactList[i].yearsOfExperience__c.split(' Year')[0] > this.compactViewContactList[i + 1].yearsOfExperience__c.split(' Year')[0]) {
                    const temp = this.compactViewContactList[i];
                    this.compactViewContactList[i] = this.compactViewContactList[i + 1];
                    this.compactViewContactList[i + 1] = temp;
                    i = -1;
                }
            }
        }
    } shortByEmail() {
        if (this.template.querySelector('.shortByEmail').iconName == 'utility:up') {
            this.template.querySelector('.shortByEmail').iconName = 'utility:down'; for (let i = 0; i < this.compactViewContactList.length; i++) {
                if (this.compactViewContactList[i].Email[0].toLowerCase() < this.compactViewContactList[i + 1].Email[0].toLowerCase()) {
                    let firstElement = this.compactViewContactList[i];
                    let secondElement = this.compactViewContactList[i + 1]; this.compactViewContactList[i] = secondElement;
                    this.compactViewContactList[i + 1] = firstElement;
                    i = -1;
                }
            }
        }
        else {
            this.template.querySelector('.shortByEmail').iconName = 'utility:up'; for (let i = 0; i <= this.compactViewContactList.length; i++) {
                if (this.compactViewContactList[i].Email[0].toLowerCase() > this.compactViewContactList[i + 1].Email[0].toLowerCase()) {
                    const temp = this.compactViewContactList[i];
                    this.compactViewContactList[i] = this.compactViewContactList[i + 1];
                    this.compactViewContactList[i + 1] = temp;
                    i = -1;
                }
            }
        }
    }
    closeOtherFilters(event) {
        let options = this.template.querySelectorAll('.cmbOptions');
        options.forEach(ele => {
            if (ele.parentElement.classList == event.currentTarget.classList) {
                if (ele.style.display == 'none') {
                    this.template.querySelector('.optionsOverlay').style.display = 'block';
                    ele.style.display = 'block';
                }
                else {
                    this.template.querySelector('.optionsOverlay').style.display = 'none';
                    ele.style.display = 'none';
                }
            }
            else {
                ele.style.display = 'none';
            }
        })
        if (event.target.nodeName == 'P') {
            this.template.querySelector('.optionsOverlay').style.display = 'none';
            if (event.target.innerHTML == 'None') {
                event.target.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';
                event.target.parentElement.parentElement.style.display = 'none';
                this.handleChangeFilter();
            }
            else {
                event.target.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.target.innerHTML;
                event.target.parentElement.parentElement.style.display = 'none';
                this.handleChangeFilter();
            }
        }
    } expInAdvance(event) {
        let SelectedDataStr = '';
        event.currentTarget.parentElement.parentElement.querySelectorAll('p').forEach(element => {
            if (element.querySelector('input').checked) {
                if (SelectedDataStr == '') {
                    SelectedDataStr = element.querySelector('span').innerHTML;
                }
                else {
                    SelectedDataStr = SelectedDataStr + ',' + element.querySelector('span').innerHTML;;
                }
            }
        })
        event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = SelectedDataStr;
        event.currentTarget.parentElement.parentElement.style.display = 'none';
    } showOptionMoreFilter(event) {
        let optionsSelected; switch (event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder) {
            case 'Department':
                optionsSelected = this.DepartmentModalOptionValue;
                break;
            case 'Subject':
                optionsSelected = this.SubjectModalOptionValue;
                break;
            case 'Experience':
                optionsSelected = this.ExperienceModalOptionValue;
                break;
            case 'Family':
                optionsSelected = this.FamilyModalOptionValue;
                break;
            case 'Dependents':
                optionsSelected = this.DependentsModalOptionValue;
                break;
            case 'Languages Spoken':
                optionsSelected = this.LanguagesSpokenModalOptionValue;
                break;
            case 'Proficiency':
                optionsSelected = this.ProficiencyModalOptionValue;
                break;
            case 'iFair Attendance':
                optionsSelected = this.iFairAttendanceModalOptionValue;
                break;
            case 'Position Type':
                optionsSelected = this.PositionTypeModalOptionValue;
                break;
            case 'Curriculum Experience':
                optionsSelected = this.CurriculumExperienceModalOptionValue;
                break;
            case 'Minimum Degree':
                optionsSelected = this.MinimumDegreeModalOptionValue;
                break;
            case 'Country of Residence':
                optionsSelected = this.CountryofResidenceModalOptionValue;
                break;
            case 'Citizenship':
                optionsSelected = this.CitizenshipModalOptionValue;
                break;
            case 'Interested Country':
                optionsSelected = this.InterestedCountryModalOptionValue;
                break;
            default:
                break;
        }        let options = this.template.querySelectorAll('.moreFilterOptions');
        options.forEach(ele => {
            if (ele.parentElement.classList == event.currentTarget.parentElement.parentElement.parentElement.classList) {
                if (ele.style.display == 'none') {
                    ele.style.display = 'block';
                    ele.querySelectorAll('span').forEach(element => {
                        if (optionsSelected.includes(element.innerHTML)) {
                            element.parentElement.querySelector('input').checked = true;
                        } else {
                            element.parentElement.querySelector('input').checked = false;
                        }
                    });
                }
                else {
                    ele.style.display = 'none';
                }
            }
            else {
                ele.style.display = 'none';
            }
        })
    }
    showOption(event) {
        console.log('Showing Options'); let optionsSelected; console.log(event.currentTarget.placeholder);
        switch (event.currentTarget.placeholder) {
            case 'Department':
                console.log('Department Selected');
                optionsSelected = this.DepartmentModalOptionValue;
                break;
            case 'Experience':
                optionsSelected = this.ExperienceModalOptionValue;
                break;
            case 'Language':
                optionsSelected = this.LanguagesSpokenModalOptionValue;
                break;
            case 'Curriculum':
                optionsSelected = this.CurriculumExperienceModalOptionValue;
                break;
            case 'Degree':
                optionsSelected = this.MinimumDegreeModalOptionValue;
                break;
            case 'Subject':
                optionsSelected = this.SubjectModalOptionValue;
                break;
            case 'Family':
                optionsSelected = this.FamilyModalOptionValue;
                break;
            case 'Dependents':
                optionsSelected = this.DependentsModalOptionValue;
                break;
            case 'Proficiency':
                optionsSelected = this.ProficiencyModalOptionValue;
                break;
            case 'iFairAttendance':
                optionsSelected = this.iFairAttendanceModalOptionValue;
                break;
            case 'Position Type':
                optionsSelected = this.PositionTypeModalOptionValue;
                break;
            case 'Country of Residence':
                optionsSelected = this.CountryofResidenceModalOptionValue;
                break;
            case 'Citizenship':
                optionsSelected = this.CitizenshipModalOptionValue;
                break;
            case 'Interested Country':
                optionsSelected = this.InterestedCountryModalOptionValue;
                break;
            default:
                break;
        }
        let options = this.template.querySelectorAll('.cmbOptions');
        console.log('Checking Options');
        options.forEach(ele => {
            if (ele.parentElement.classList == event.currentTarget.parentElement.parentElement.parentElement.classList) {
                if (ele.style.display == 'none') {
                    console.log('Options Are hidden ! Showing ...');
                    this.template.querySelector('.optionsOverlay').style.display = 'block';
                    ele.style.display = 'block';
                    console.log('showed');
                    ele.querySelectorAll('span').forEach(element => {
                        if (optionsSelected.includes(element.innerHTML)) {
                            element.parentElement.querySelector('input').checked = true;
                        } else {
                            element.parentElement.querySelector('input').checked = false;
                        }
                    });
                    console.log('Ended');
                }
                else {
                    this.template.querySelector('.optionsOverlay').style.display = 'none';
                    ele.style.display = 'none';
                }
            }
            else {
                ele.style.display = 'none';
            }
        })
    } modalClicked(event) {
        if (event.target.classList.contains('morefiltersModal')) {
            this.MoreFiltersoptionsOverlayClicked();
        }
    } MoreFiltersoptionsOverlayClicked() {
        let options = this.template.querySelectorAll('.moreFilterOptions');
        options.forEach(ele => {
            ele.style.display = 'none';
        });
    } optionsOverlayClicked() {
        let options = this.template.querySelectorAll('.cmbOptions');
        options.forEach(ele => {
            ele.style.display = 'none';
        });
        this.template.querySelector('.optionsOverlay').style.display = 'none';
    }

    pageJobChanged(event) {
        this.filtersReset();
        this.scrollToTopConList();
        this.template.querySelector('.bestMatchFilter').value = '';
        event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.dataset.name;
        event.currentTarget.parentElement.parentElement.style.display = 'none';
        this.currentActiveJob = event.currentTarget.dataset.id;
        this.template.querySelector('.optionsOverlay').style.display = 'none';
        if (this.childScreenVisibility == true) {
            this.template.querySelector('c-job-child-component').getJobId(this.currentActiveJob);
        }
        this.jobListRowData.forEach(element => {
            if (element.Id == event.currentTarget.dataset.id) {
                this.updateHeaderTabsValues(element);
            }
        });
    }
    sortData(fieldname, direction) {
        this.contactList.forEach(element => {
            element.classes = 'remainingRecords';
        })
        let parseData = this.contactList;
        let keyValue = (a) => {
            return a[fieldname];
        };
        let isReverse = direction === 'asc' ? 1 : -1;
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : '';
            y = keyValue(y) ? keyValue(y) : '';
            return isReverse * ((x > y) - (y > x));
        }); this.contactList = [];
        this.contactList = parseData;
    }
    scrollToTopConList() {
        this.template.querySelector('.conList').scrollTop = 0;
    }
    handleBestMatch(event) {
        this.scrollToTopConList();
        event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.innerHTML;
        event.currentTarget.parentElement.parentElement.style.display = 'none';
        let contactList = this.contactList;
        if (event.currentTarget.innerHTML == 'BEST MATCHES') {
            this.loader = true;
            this.template.querySelector('.currentRecordsType').innerHTML = 'Total';
            getBestMatchRecs({ userId: this.currentLoggingUser, jobId: this.currentActiveJob }).then(result => {
                console.log(result);
                let results = result;
                this.loader = false;
                this.contactList = [];
                if (results['Must Have'] != undefined) {
                    results['Must Have'].forEach(element => {
                        element.classes = 'mustHave';
                        this.contactList.push(element);
                    });
                }
                if (results['Key Match'] != undefined) {
                    results['Key Match'].forEach(element => {
                        element.classes = 'keyMatches';
                        this.contactList.push(element);
                    });
                }
                if (results['Remaining Recs'] != undefined) {
                    results['Remaining Recs'].forEach(element => {
                        element.classes = 'remainingRecords';
                        this.contactList.push(element);
                    });
                } this.contactListCount = this.contactList.length;
                this.compactViewContactList = this.contactList; this.contactList.forEach(element => {
                    if (element.Activity_Tracker__r == undefined) {
                        element.bookmarkStatus = this.starChecked;
                        element.checked = 'true';
                    }
                    else {
                        element.bookmarkStatus = this.starUnchecked;
                        element.checked = 'false';
                    }
                    if (element.Date_of_Availability__c != undefined) {
                        element.Date_of_Availability__c = this.months[parseInt(element.Date_of_Availability__c.split('T')[0].split('-')[1]) - 1] + ' ' + element.Date_of_Availability__c.split('T')[0].split('-')[2] + ', ' + element.Date_of_Availability__c.split('T')[0].split('-')[0];
                    }
                    if (element.Birthdate != undefined) {
                        element.Birthdate = this.months[parseInt(element.Birthdate.split('T')[0].split('-')[1]) - 1] + ' ' + element.Birthdate.split('T')[0].split('-')[2] + ', ' + element.Birthdate.split('T')[0].split('-')[0];
                    }
                    if (element.yearsOfExperience__c != undefined) {
                        element.yearsOfExperience__c = element.yearsOfExperience__c + ' Year';
                    }
                    else {
                        element.yearsOfExperience__c = '0 Year';
                    }
                })
                if (this.contactList.length > 0) {
                    this.childScreenVisibility = true;
                    this.visibleContact = this.contactList[0];
                    this.template.querySelector('c-job-child-component').addFirstTab(this.visibleContact);
                }
                else {
                    this.childScreenVisibility = false;
                }
            }).catch(error => {
                console.log(error);
                this.loader = false;
            })
        }
        if (event.currentTarget.innerHTML == 'Alphabetical A-Z') {
            this.sortData('Name', 'asc');
        }
        if (event.currentTarget.innerHTML == 'Alphabetical Z-A') {
            this.sortData('Name', 'dsc');
        }
        this.template.querySelector('.optionsOverlay').style.display = 'none';
        this.contactList = contactList;
        this.compactViewContactList = this.contactList;
    }

    setDepartmentValue() {
        console.log('Setting Departmnet Vlaue');
        let departmentValues = new Set();
        if (this.SubjectModalOptionValue == '') {
            this.template.querySelector('.DepartmentModalFilter').value = '';
            this.primaryFilters[0].value = '';
            this.DepartmentModalOptionValue = '';
        }
        else {
            if (this.SubjectModalOptionValue.includes(',')) {
                this.SubjectModalOptionValue.split(',').forEach(elm => {
                    for (let i = 0; i < Object.keys(this.departmentSubjects).length; i++) {
                        for (let j = 0; j < this.departmentSubjects[Object.keys(this.departmentSubjects)[i]].length; j++) {
                            if (elm == this.departmentSubjects[Object.keys(this.departmentSubjects)[i]][j]) {
                                departmentValues.add(Object.keys(this.departmentSubjects)[i]);
                            }
                        }
                    }
                });
            }
            else {
                for (let i = 0; i < Object.keys(this.departmentSubjects).length; i++) {
                    for (let j = 0; j < this.departmentSubjects[Object.keys(this.departmentSubjects)[i]].length; j++) {
                        if (this.SubjectModalOptionValue == this.departmentSubjects[Object.keys(this.departmentSubjects)[i]][j]) {
                            departmentValues.add(Object.keys(this.departmentSubjects)[i]);
                        }
                    }
                }
            }
        }

        if (departmentValues.size > 0) {
            if (departmentValues.size == 1) {
                let firstCmp = 0;
                departmentValues.forEach(element => {
                    if (firstCmp == 0) {
                        this.DepartmentModalOptionValue = element;
                        firstCmp = 1;
                    }
                    else {
                        this.DepartmentModalOptionValue = this.DepartmentModalOptionValue + ',' + element;
                    }
                })
                this.primaryFilters[0].value = 'Department : ' + this.DepartmentModalOptionValue; this.template.querySelector('.DepartmentModalFilter').value = 'Department : ' + this.DepartmentModalOptionValue;
            }
            else {
                let firstCmp = 0;
                departmentValues.forEach(element => {
                    if (firstCmp == 0) {
                        this.DepartmentModalOptionValue = element;
                        firstCmp = 1;
                    }
                    else {
                        this.DepartmentModalOptionValue = this.DepartmentModalOptionValue + ',' + element;
                    }
                })
                this.primaryFilters[0].value = 'Department : ( ' + departmentValues.size + ' )'; this.template.querySelector('.DepartmentModalFilter').value = 'Department : ( ' + departmentValues.size + ' )';
            }
        }
    } setSubjectValues() {
        this.subjectsOptions = [];
        if (this.DepartmentModalOptionValue != null && this.DepartmentModalOptionValue != '' && this.DepartmentModalOptionValue != undefined) {
            if (this.DepartmentModalOptionValue.includes(',')) {
                this.DepartmentModalOptionValue.split(',').forEach(ele => {
                    this.departmentSubjects[ele].forEach(element => {
                        this.subjectsOptions.push({ label: element, value: element })
                    })
                });
            }
            else {
                this.departmentSubjects[this.DepartmentModalOptionValue].forEach(element => {
                    this.subjectsOptions.push({ label: element, value: element })
                })
            }
        }
        else {
            this.subjectsOptions = this.subjects;
        }
    }
    submitOptions(event) {
        let SelectedDataStr = ''; let size = 0;
        event.currentTarget.parentElement.parentElement.querySelectorAll('p').forEach(element => {
            if (element.querySelector('input').checked) {
                if (SelectedDataStr == '') {
                    SelectedDataStr = element.querySelector('span').innerHTML;
                }
                else {
                    SelectedDataStr = SelectedDataStr + ',' + element.querySelector('span').innerHTML;
                }
                size++;
            }
        })
        let textValue; if (size == 0) {
            event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';
            textValue = '';
        }
        else {
            if (size == 1) {
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder + ': ' + SelectedDataStr;
                textValue = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder + ': ' + SelectedDataStr;
            }
            else {
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder + ': ( ' + size + ' )';
                textValue = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder + ': ( ' + size + ' )';
            }
        } switch (event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder) {
            case 'Department':
                this.template.querySelector('.DepartmentModalFilter').value = textValue;
                this.DepartmentModalOptionValue = SelectedDataStr;
                this.setSubjectValues();
                break;
            case 'Experience':
                this.template.querySelector('.ExperienceModalFilter').value = textValue;
                this.ExperienceModalOptionValue = SelectedDataStr;
                break;
            case 'Language':
                this.template.querySelector('.LanguagesSpokenModalFilter').value = textValue;
                this.LanguagesSpokenModalOptionValue = SelectedDataStr;
                break;
            case 'Curriculum':
                this.template.querySelector('.CurriculumExperienceModalFilter').value = textValue;
                this.CurriculumExperienceModalOptionValue = SelectedDataStr;
                break;
            case 'Degree':
                this.template.querySelector('.MinimumDegreeModalFilter').value = textValue;
                this.MinimumDegreeModalOptionValue = SelectedDataStr;
                break;
            case 'Subject':
                this.template.querySelector('.SubjectModalFilter').value = textValue;
                this.SubjectModalOptionValue = SelectedDataStr;
                break;
            case 'Family':
                this.template.querySelector('.FamilyModalFilter').value = textValue;
                this.FamilyModalOptionValue = SelectedDataStr;
                break;
            case 'Dependents':
                this.template.querySelector('.DependentsModalFilter').value = textValue;
                this.DependentsModalOptionValue = SelectedDataStr;
                break;
            case 'Proficiency':
                this.template.querySelector('.ProficiencyModalFilter').value = textValue;
                this.ProficiencyModalOptionValue = SelectedDataStr;
                break;
            case 'iFairAttendance':
                this.template.querySelector('.iFairAttendanceModalFilter').value = textValue;
                this.iFairAttendanceModalOptionValue = SelectedDataStr;
                break;
            case 'Position Type':
                this.template.querySelector('.MinimumDegreeModalFilter').value = textValue;
                this.MinimumDegreeModalOptionValue = SelectedDataStr;
                break;
            case 'Country of Residence':
                this.template.querySelector('.CountryOfResidenceModalFilter').value = textValue;
                this.CountryofResidenceModalOptionValue = SelectedDataStr;
                break;
            case 'Citizenship':
                this.template.querySelector('.CitizenshipModalFilter').value = textValue;
                this.CitizenshipModalOptionValue = SelectedDataStr;
                break;
            case 'Interested Country':
                this.template.querySelector('.InterestedCountryModalFilter').value = textValue;
                this.InterestedCountryModalOptionValue = SelectedDataStr;
                break;
            default:
                break;
        }        event.currentTarget.parentElement.parentElement.style.display = 'none'; this.optionsOverlayClicked();
        this.searchMoreFilters();
    }

    resetOptions(event) {
        event.currentTarget.parentElement.parentElement.querySelectorAll('p').forEach(element => {
            element.querySelector('input').checked = false;
        })
        event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';
        event.currentTarget.parentElement.parentElement.style.display = 'none'; switch (event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder) {
            case 'Department':
                this.DepartmentModalOptionValue = '';
                this.template.querySelector('.DepartmentModalFilter').value = '';
                this.SubjectModalOptionValue = '';
                this.template.querySelector('.SubjectModalFilter').value = '';
                this.setSubjectValues();
                break;
            case 'Experience':
                this.ExperienceModalOptionValue = '';
                this.template.querySelector('.ExperienceModalFilter').value = '';
                break;
            case 'Language':
                this.LanguagesSpokenModalOptionValue = '';
                this.template.querySelector('.LanguagesSpokenModalFilter').value = '';
                break;
            case 'Curriculum':
                this.CurriculumExperienceModalOptionValue = '';
                this.template.querySelector('.CurriculumExperienceModalFilter').value = '';
                break;
            case 'Degree':
                this.MinimumDegreeModalOptionValue = '';
                this.template.querySelector('.MinimumDegreeModalFilter').value = '';
                break;
            case 'Subject':
                this.SubjectModalOptionValue = '';
                this.template.querySelector('.SubjectModalFilter').value = '';
                this.template.querySelector('.DepartmentModalFilter').value = '';
                this.DepartmentModalOptionValue = '';
                this.primaryFilters[0] = { placeholder: 'Department', value: '', classes: "slds-input inputBar DepartmentFilter", optionValues: this.Departments, iconClass: 'slds-icon slds-input__icon slds-input__icon_right slds-icon-text-default iconClassBlack' };
                break;
            case 'Family':
                this.FamilyModalOptionValue = '';
                this.template.querySelector('.FamilyModalFilter').value = '';
                break;
            case 'Dependents':
                this.DependentsModalOptionValue = '';
                this.template.querySelector('.DependentsModalFilter').value = '';
                break;
            case 'Proficiency':
                this.ProficiencyModalOptionValue = '';
                this.template.querySelector('.ProficiencyModalFilter').value = '';
                break;
            case 'iFairAttendance':
                this.iFairAttendanceModalOptionValue = '';
                this.template.querySelector('.iFairAttendanceModalFilter').value = '';
                break;
            case 'Position Type':
                this.PositionTypeModalOptionValue = '';
                this.template.querySelector('.MinimumDegreeModalFilter').value = '';
                break;
            case 'Country of Residence':
                this.CountryofResidenceModalOptionValue = '';
                this.template.querySelector('.CountryOfResidenceModalFilter').value = '';
                break;
            case 'Citizenship':
                this.CitizenshipModalOptionValue = '';
                this.template.querySelector('.CitizenshipModalFilter').value = '';
                break;
            case 'Interested Country':
                this.InterestedCountryModalOptionValue = '';
                this.template.querySelector('.InterestedCountryModalFilter').value = '';
                break;
            default:
                break;
        }        this.optionsOverlayClicked();
        this.searchMoreFilters();
    }
    DepartmentModalOptionValue = '';
    SubjectModalOptionValue = '';
    ExperienceModalOptionValue = '';
    FamilyModalOptionValue = '';
    DependentsModalOptionValue = '';
    LanguagesSpokenModalOptionValue = '';
    ProficiencyModalOptionValue = '';
    iFairAttendanceModalOptionValue = '';
    PositionTypeModalOptionValue = '';
    CurriculumExperienceModalOptionValue = '';
    MinimumDegreeModalOptionValue = '';
    CountryofResidenceModalOptionValue = '';
    CitizenshipModalOptionValue = '';
    InterestedCountryModalOptionValue = '';

    modalsubmitOptions(event) {
        console.log('Submiting IOptions');
        let SelectedDataStr = '';
        let size = 0;
        event.currentTarget.parentElement.parentElement.querySelectorAll('p').forEach(element => {
            if (element.querySelector('input').checked) {
                if (SelectedDataStr == '') {
                    SelectedDataStr = element.querySelector('span').innerHTML;
                }
                else {
                    SelectedDataStr = SelectedDataStr + ',' + element.querySelector('span').innerHTML;
                }
                size++;
            }
        })
        let TextValue;
        if (size == 0) {
            event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';
            TextValue = '';
        }
        else {
            if (size == 1) {
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder + ': ' + SelectedDataStr;
                TextValue = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder + ': ' + SelectedDataStr;
            }
            else {
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder + ': ( ' + size + ' )';
                TextValue = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder + ': ( ' + size + ' )';
            }
        }
        switch (event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder) {
            case 'Department':
                this.DepartmentModalOptionValue = SelectedDataStr;
                this.setSubjectValues();
                break;
            case 'Subject':
                this.SubjectModalOptionValue = SelectedDataStr;
                this.setDepartmentValue();
                break;
            case 'Experience':
                this.ExperienceModalOptionValue = SelectedDataStr;
                break;
            case 'Family':
                this.FamilyModalOptionValue = SelectedDataStr;
                break;
            case 'Dependents':
                this.DependentsModalOptionValue = SelectedDataStr;
                break;
            case 'Languages Spoken':
                this.LanguagesSpokenModalOptionValue = SelectedDataStr;
                break;
            case 'Proficiency':
                this.ProficiencyModalOptionValue = SelectedDataStr;
                break;
            case 'iFair Attendance':
                this.iFairAttendanceModalOptionValue = SelectedDataStr;
                break;
            case 'Position Type':
                this.PositionTypeModalOptionValue = SelectedDataStr;
                break;
            case 'Curriculum Experience':
                this.CurriculumExperienceModalOptionValue = SelectedDataStr;
                break;
            case 'Minimum Degree':
                this.MinimumDegreeModalOptionValue = SelectedDataStr;
                break;
            case 'Country of Residence':
                this.CountryofResidenceModalOptionValue = SelectedDataStr;
                break;
            case 'Citizenship':
                this.CitizenshipModalOptionValue = SelectedDataStr;
                break;
            case 'Interested Country':
                this.InterestedCountryModalOptionValue = SelectedDataStr;
                break;
            default:
                break;
        }
        event.currentTarget.parentElement.parentElement.style.display = 'none'; this.MoreFiltersoptionsOverlayClicked();
    }
    modalResetOptions(event) {
        event.currentTarget.parentElement.parentElement.querySelectorAll('p').forEach(element => {
            element.querySelector('input').checked = false;
        })
        event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';
        event.currentTarget.parentElement.parentElement.style.display = 'none'; switch (event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder) {
            case 'Department':
                this.DepartmentModalOptionValue = '';
                this.setSubjectValues();
                this.SubjectModalOptionValue = '';
                this.template.querySelector('.SubjectModalFilter').value = '';
                break;
            case 'Subject':
                this.SubjectModalOptionValue = '';
                this.setDepartmentValue();
                this.template.querySelector('.DepartmentModalFilter').value = '';
                this.DepartmentModalOptionValue = '';
                this.primaryFilters[0] = { placeholder: 'Department', value: '', classes: "slds-input inputBar DepartmentFilter", optionValues: this.Departments, iconClass: 'slds-icon slds-input__icon slds-input__icon_right slds-icon-text-default iconClassBlack' };
                break;
            case 'Experience':
                this.ExperienceModalOptionValue = '';
                break;
            case 'Family':
                this.FamilyModalOptionValue = '';
                break;
            case 'Dependents':
                this.DependentsModalOptionValue = '';
                break;
            case 'Languages Spoken':
                this.LanguagesSpokenModalOptionValue = '';
                break;
            case 'Proficiency':
                this.ProficiencyModalOptionValue = '';
                break;
            case 'iFair Attendance':
                this.iFairAttendanceModalOptionValue = '';
                break;
            case 'Position Type':
                this.PositionTypeModalOptionValue = '';
                break;
            case 'Curriculum Experience':
                this.CurriculumExperienceModalOptionValue = '';
                break;
            case 'Minimum Degree':
                this.MinimumDegreeModalOptionValue = '';
                break;
            case 'Country of Residence':
                this.CountryofResidenceModalOptionValue = '';
                break;
            case 'Citizenship':
                this.CitizenshipModalOptionValue = '';
                break;
            case 'Interested Country':
                this.InterestedCountryModalOptionValue = '';
                break;
            default:
                break;
        }        this.MoreFiltersoptionsOverlayClicked();
    }
    sortRecords(event) {
        var val = event.target.value;
        if (val == 'Best Match') {
            this.bestMatchLogic();
        }
    }
    bestMatchLogic() {
        this.primarySort();
    }
    subjectsG;
    deptG;
    secondarySort() {
        let DateFrom = this.template.querySelector('.dateFromModalFilter').value;
        let dateTo = this.template.querySelector('.dateToModalFilter').value;
        let Departments = '';
        let Subjects = '';
        let experience = '';
        let Family = '';
        let Dependents = '';
        let Languages_Spoken = '';
        let Proficiency = '';
        let iFair_Attendance = '';
        let Position_Type = '';
        let Curriculum_Experience = '';
        let Minimum_Degree = '';
        let CountryOfResidence = '';
        let Citizenship = '';
        let InterestedCountry = '';
        var pSortIds = [];
        this.contactList.forEach(contact => {
            pSortIds.push(contact['Id']);
        })
        getContactsMoreFilters({ userId: this.currentLoggingUser, dateFrom: DateFrom, dateTo: dateTo, departments: Departments, subjects: Subjects, experience: experience, Family: Family, Dependents: Dependents, Languages_Spoken: Languages_Spoken, Proficiency: Proficiency, iFair_Attendance: iFair_Attendance, Position_Type: Position_Type, Curriculum_Experience: Curriculum_Experience, Minimum_Degree: Minimum_Degree, CountryOfResidence: CountryOfResidence, Citizenship: Citizenship, InterestedCountry: InterestedCountry }).then(result => {
            var arr = this.contactList;
            result.forEach(res => {
                if (!pSortIds.includes(res['Id'])) {
                    res.primary = false;
                    arr.push(res);
                }
            });
            this.contactList = arr; this.contactList.forEach(element => {
                element.classes = 'remainingRecords';
            })
            this.compactViewContactList = this.contactList;
            this.contactList.forEach(element => {
                if (element.Activity_Tracker__r == undefined) {
                    element.bookmarkStatus = this.starChecked;
                    element.checked = 'true';
                }
                else {
                    element.bookmarkStatus = this.starUnchecked;
                    element.checked = 'false';
                }
                if (element.Date_of_Availability__c != undefined) {
                    element.Date_of_Availability__c = this.months[parseInt(element.Date_of_Availability__c.split('T')[0].split('-')[1]) - 1] + ' ' + element.Date_of_Availability__c.split('T')[0].split('-')[2] + ', ' + element.Date_of_Availability__c.split('T')[0].split('-')[0];
                }
                if (element.Birthdate != undefined) {
                    element.Birthdate = this.months[parseInt(element.Birthdate.split('T')[0].split('-')[1]) - 1] + ' ' + element.Birthdate.split('T')[0].split('-')[2] + ', ' + element.Birthdate.split('T')[0].split('-')[0];
                }
                if (element.yearsOfExperience__c != undefined) {
                    element.yearsOfExperience__c = element.yearsOfExperience__c + ' Year';
                }
                else {
                    element.yearsOfExperience__c = '0 Year';
                }
            })
            if (this.contactList.length > 0) {
                this.childScreenVisibility = true;
                this.visibleContact = this.contactList[0];
            }
            else {
                this.childScreenVisibility = false;
            }
            this.contactListCount = this.contactList.length; this.loader = false;
        }).catch(error => {
            this.loader = false;
        });
    }
    primarySort() {
        getContactsForFilters({ userId: this.currentLoggingUser, departments: this.deptG, experience: this.template.querySelector('.ExperienceFilter').value, language: this.template.querySelector('.LanguageFilter').value, curriculum: this.template.querySelector('.CurriculumFilter').value, degree: this.template.querySelector('.DegreeFilter').value }).then(result => {
            result.forEach(rr => {
                rr.primary = true;
            })
            this.contactList = result;
            this.contactList.forEach(element => {
                element.classes = 'remainingRecords';
            })
            this.compactViewContactList = this.contactList; this.contactList.forEach(element => {
                if (element.Activity_Tracker__r == undefined) {
                    element.bookmarkStatus = this.starChecked;
                    element.checked = 'true';
                }
                else {
                    element.bookmarkStatus = this.starUnchecked;
                    element.checked = 'false';
                }
                if (element.Date_of_Availability__c != undefined) {
                    element.Date_of_Availability__c = this.months[parseInt(element.Date_of_Availability__c.split('T')[0].split('-')[1]) - 1] + ' ' + element.Date_of_Availability__c.split('T')[0].split('-')[2] + ', ' + element.Date_of_Availability__c.split('T')[0].split('-')[0];
                }
                if (element.Birthdate != undefined) {
                    element.Birthdate = this.months[parseInt(element.Birthdate.split('T')[0].split('-')[1]) - 1] + ' ' + element.Birthdate.split('T')[0].split('-')[2] + ', ' + element.Birthdate.split('T')[0].split('-')[0];
                }
                if (element.yearsOfExperience__c != undefined) {
                    element.yearsOfExperience__c = element.yearsOfExperience__c + ' Year';
                }
                else {
                    element.yearsOfExperience__c = '0 Year';
                }
            })
            if (this.contactList.length > 0) {
                this.childScreenVisibility = true;
                this.visibleContact = this.contactList[0];
            }
            else {
                this.childScreenVisibility = false;
            }
            this.contactListCount = this.contactList.length;
            this.loader = false;
            this.secondarySort();
        }).catch(error => {
            this.loader = false;
        })
    }
    primaryFilters = [
        { placeholder: 'Department', value: '', classes: "slds-input inputBar DepartmentFilter", optionValues: this.Departments, iconClass: 'slds-icon slds-input__icon slds-input__icon_right slds-icon-text-default iconClassBlack' },
        { placeholder: 'Experience', value: '', classes: "slds-input inputBar ExperienceFilter", optionValues: this.Experiences, iconClass: 'slds-icon slds-input__icon slds-input__icon_right slds-icon-text-default iconClassBlack' },
        { placeholder: 'Language', value: '', classes: "slds-input inputBar LanguageFilter", optionValues: this.languagesSpoken, iconClass: 'slds-icon slds-input__icon slds-input__icon_right slds-icon-text-default iconClassBlack' },
        { placeholder: 'Curriculum', value: '', classes: "slds-input inputBar CurriculumFilter", optionValues: this.CurriculumExperiences, iconClass: 'slds-icon slds-input__icon slds-input__icon_right slds-icon-text-default iconClassBlack' },
        { placeholder: 'Degree', value: '', classes: "slds-input inputBar DegreeFilter", optionValues: this.MinimumDegree, iconClass: 'slds-icon slds-input__icon slds-input__icon_right slds-icon-text-default iconClassBlack' }
    ];
    modalFiltersForPillsView = this.primaryFilters;
    modalFiltersForPillsViewDate = [];

    searchMoreFilters() {
        this.template.querySelector('.currentRecordsType').innerHTML = 'Total';
        this.loader = true; let DateFrom = this.template.querySelector('.dateFromModalFilter').value;
        let dateTo = this.template.querySelector('.dateToModalFilter').value;
        let Departments = this.DepartmentModalOptionValue;
        this.deptG = Departments;
        let Subjects = this.SubjectModalOptionValue;
        this.subjectsG = Subjects;
        let experience = this.ExperienceModalOptionValue;
        let Family = this.FamilyModalOptionValue;
        let Dependents = this.DependentsModalOptionValue;
        let Languages_Spoken = this.LanguagesSpokenModalOptionValue;
        let Proficiency = this.ProficiencyModalOptionValue;
        let iFair_Attendance = this.iFairAttendanceModalOptionValue;
        let Position_Type = this.PositionTypeModalOptionValue;
        let Curriculum_Experience = this.CurriculumExperienceModalOptionValue;
        let Minimum_Degree = this.MinimumDegreeModalOptionValue;
        let CountryOfResidence = this.CountryofResidenceModalOptionValue;
        let Citizenship = this.CitizenshipModalOptionValue;
        let InterestedCountry = this.InterestedCountryModalOptionValue;
        this.hideMoreFilter();
        getContactsMoreFilters({ userId: this.currentLoggingUser, dateFrom: DateFrom, dateTo: dateTo, departments: Departments, subjects: Subjects, experience: experience, Family: Family, Dependents: Dependents, Languages_Spoken: Languages_Spoken, Proficiency: Proficiency, iFair_Attendance: iFair_Attendance, Position_Type: Position_Type, Curriculum_Experience: Curriculum_Experience, Minimum_Degree: Minimum_Degree, CountryOfResidence: CountryOfResidence, Citizenship: Citizenship, InterestedCountry: InterestedCountry }).then(result => {
            if (this.childScreenVisibility == true) {
                this.template.querySelector('c-job-child-component').clearAllTabs();
            }
            this.contactList = result;
            this.contactList.forEach(element => {
                element.classes = 'remainingRecords';
            })
            this.contactListCount = this.contactList.length;
            this.compactViewContactList = this.contactList;
            this.contactList.forEach(element => {
                if (element.Activity_Tracker__r == undefined) {
                    element.bookmarkStatus = this.starChecked;
                    element.checked = 'true';
                }
                else {
                    element.bookmarkStatus = this.starUnchecked;
                    element.checked = 'false';
                }
                if (element.Date_of_Availability__c != undefined) {
                    element.Date_of_Availability__c = this.months[parseInt(element.Date_of_Availability__c.split('T')[0].split('-')[1]) - 1] + ' ' + element.Date_of_Availability__c.split('T')[0].split('-')[2] + ', ' + element.Date_of_Availability__c.split('T')[0].split('-')[0];
                }
                if (element.Birthdate != undefined) {
                    element.Birthdate = this.months[parseInt(element.Birthdate.split('T')[0].split('-')[1]) - 1] + ' ' + element.Birthdate.split('T')[0].split('-')[2] + ', ' + element.Birthdate.split('T')[0].split('-')[0];
                }
                if (element.yearsOfExperience__c != undefined) {
                    element.yearsOfExperience__c = element.yearsOfExperience__c + ' Year';
                }
                else {
                    element.yearsOfExperience__c = '0 Year';
                }
            })

            if (this.contactList.length > 0) {
                console.log('Child data Passing & adding First Element')
                this.childScreenVisibility = true;
                this.visibleContact = this.contactList[0];
                this.template.querySelector('c-job-child-component').addFirstTab(this.visibleContact);
            }
            else {
                this.childScreenVisibility = false;
            }

            this.loader = false;
        }).catch(error => {
            console.log(error);
            this.loader = false;
        }); let allFieldsValue = [
            { label: 'DateFrom', value: this.template.querySelector('.dateFromModalFilter').value, classname: 'DateFromModalOutside' },
            { label: 'DateTo', value: this.template.querySelector('.dateToModalFilter').value, classname: 'DateToModalOutside' },
            { label: 'Department', value: this.template.querySelector('.DepartmentModalFilter').value, optionValues: this.Departments, classname: 'DepartmentModalOutside' },
            { label: 'Subject', value: this.template.querySelector('.SubjectModalFilter').value, optionValues: this.subjects, classname: 'SubjectModalOutside' },
            { label: 'Experience', value: this.template.querySelector('.ExperienceModalFilter').value, optionValues: this.Experiences, classname: 'ExperienceModalOutside' },
            { label: 'Family', value: this.template.querySelector('.FamilyModalFilter').value, optionValues: this.Family, classname: 'FamilyModalOutside' },
            { label: 'Dependents', value: this.template.querySelector('.DependentsModalFilter').value, optionValues: this.Dependents, classname: 'DependentsModalOutside' },
            { label: 'Language', value: this.template.querySelector('.LanguagesSpokenModalFilter').value, optionValues: this.languagesSpoken, classname: 'languagesSpokenModalOutside' },
            { label: 'Proficiency', value: this.template.querySelector('.ProficiencyModalFilter').value, optionValues: this.Proficiency, classname: 'ProficiencyModalOutside' },
            { label: 'iFairAttendance', value: this.template.querySelector('.iFairAttendanceModalFilter').value, optionValues: this.iFairAttendance, classname: 'iFairAttendanceModalOutside' },
            { label: 'Position Type', value: this.template.querySelector('.PositionTypeModalFilter').value, optionValues: this.PositionType, classname: 'PositionTypeModalOutside' },
            { label: 'Curriculum', value: this.template.querySelector('.CurriculumExperienceModalFilter').value, optionValues: this.CurriculumExperiences, classname: 'CurriculumExperiencesModalOutside' },
            { label: 'Degree', value: this.template.querySelector('.MinimumDegreeModalFilter').value, optionValues: this.MinimumDegree, classname: 'MinimumDegreeModalOutside' },
            { label: 'Country of Residence', value: this.template.querySelector('.CountryOfResidenceModalFilter').value, optionValues: this.countries, classname: 'ResidenceCountryModalOutside' },
            { label: 'Citizenship', value: this.template.querySelector('.CitizenshipModalFilter').value, optionValues: this.countries, classname: 'CitizenshipModalOutside' },
            { label: 'Interested Country', value: this.template.querySelector('.InterestedCountryModalFilter').value, optionValues: this.countries, classname: 'InterestedCountriesModalOutside' }
        ]; let resetBtn = false; this.modalFiltersForPillsView = [];
        this.modalFiltersForPillsViewDate = [];
        allFieldsValue.forEach(element => {
            if (element.value == '') {
                switch (element.label) {
                    case 'Department':
                        this.primaryFilters[0].value = '';
                        break;
                    case 'Experience':
                        this.primaryFilters[1].value = '';
                        break;
                    case 'Language':
                        this.primaryFilters[2].value = '';
                        break;
                    case 'Curriculum':
                        this.primaryFilters[3].value = '';
                        break;
                    case 'Degree':
                        this.primaryFilters[4].value = '';
                        break;
                    default:
                        break;
                }
            }
            else {
                switch (element.label) {
                    case 'Department':
                        this.primaryFilters[0].value = element.value;
                        resetBtn = true;
                        break;
                    case 'Experience':
                        this.primaryFilters[1].value = element.value;
                        resetBtn = true;
                        break;
                    case 'Language':
                        this.primaryFilters[2].value = element.value;
                        resetBtn = true;
                        break;
                    case 'Curriculum':
                        this.primaryFilters[3].value = element.value;
                        resetBtn = true;
                        break;
                    case 'Degree':
                        this.primaryFilters[4].value = element.value;
                        resetBtn = true;
                        break;
                    default:
                        break;
                }
                if (element.label != 'Department' && element.label != 'Experience' && element.label != 'Language' && element.label != 'Curriculum' && element.label != 'Degree') {
                    if (element.label == 'DateFrom' || element.label == 'DateTo') {
                        this.modalFiltersForPillsViewDate.push({ value: element.value, classes: element.classname });
                        resetBtn = true;
                    }
                    else {
                        this.modalFiltersForPillsView.push({ placeholder: element.label, value: element.value, classes: "slds-input inputBar activeFilter " + element.classname, optionValues: element.optionValues, iconClass: 'slds-icon slds-input__icon slds-input__icon_right slds-icon-text-default iconClass' });
                        resetBtn = true;
                    }
                }
            }
        })
        this.resetBtn = resetBtn; let filledValues = [];
        let emptyValues = []; this.primaryFilters.forEach(element => {
            if (element.value == '') {
                if (element.classes.includes('activeFilter')) {
                    element.classes = element.classes.split(' activeFilter')[0] + element.classes.split(' activeFilter')[1];
                }
                element.iconClass = 'slds-icon slds-input__icon slds-input__icon_right slds-icon-text-default iconClassBlack';
                emptyValues.push(element);
            }
            else {
                element.classes = element.classes + ' activeFilter ';
                element.iconClass = 'slds-icon slds-input__icon slds-input__icon_right slds-icon-text-default iconClass'
                filledValues.push(element);
            }
        })
        this.modalFiltersForPillsView.push(...filledValues); this.modalFiltersForPillsView.push(...emptyValues);
    }
    dateChangedInRecentFilters(event) {
        if (event.currentTarget.classList.contains('DateFromModalOutside')) {
            this.template.querySelector('.dateFromModalFilter').value = event.currentTarget.value;
        }
        if (event.currentTarget.classList.contains('DateToModalOutside')) {
            this.template.querySelector('.dateToModalFilter').value = event.currentTarget.value;
        }
        this.searchMoreFilters();
    }
    resetBtn = false;

    initializeAll() {
        this.DepartmentModalOptionValue = '';
        this.SubjectModalOptionValue = '';
        this.ExperienceModalOptionValue = '';
        this.FamilyModalOptionValue = '';
        this.DependentsModalOptionValue = '';
        this.LanguagesSpokenModalOptionValue = '';
        this.ProficiencyModalOptionValue = '';
        this.iFairAttendanceModalOptionValue = '';
        this.PositionTypeModalOptionValue = '';
        this.CurriculumExperienceModalOptionValue = '';
        this.MinimumDegreeModalOptionValue = '';
        this.CountryofResidenceModalOptionValue = '';
        this.CitizenshipModalOptionValue = '';
        this.InterestedCountryModalOptionValue = ''; this.template.querySelector('.dateFromModalFilter').value = '';
        this.template.querySelector('.dateToModalFilter').value = '';
        this.template.querySelector('.DepartmentModalFilter').value = '';
        this.template.querySelector('.ExperienceModalFilter').value = '';
        this.template.querySelector('.LanguagesSpokenModalFilter').value = '';
        this.template.querySelector('.CurriculumExperienceModalFilter').value = '';
        this.template.querySelector('.MinimumDegreeModalFilter').value = '';
        this.template.querySelector('.SubjectModalFilter').value = '';
        this.template.querySelector('.FamilyModalFilter').value = '';
        this.template.querySelector('.DependentsModalFilter').value = '';
        this.template.querySelector('.ProficiencyModalFilter').value = '';
        this.template.querySelector('.PositionTypeModalFilter').value = '';
        this.template.querySelector('.iFairAttendanceModalFilter').value = '';
        this.template.querySelector('.MinimumDegreeModalFilter').value = '';
        this.template.querySelector('.CountryOfResidenceModalFilter').value = '';
        this.template.querySelector('.CitizenshipModalFilter').value = '';
        this.template.querySelector('.InterestedCountryModalFilter').value = '';
        this.primaryFilters[0].classes = 'slds-input inputBar DepartmentFilter';
        this.primaryFilters[1].classes = 'slds-input inputBar ExperienceFilter';
        this.primaryFilters[2].classes = 'slds-input inputBar LanguageFilter';
        this.primaryFilters[3].classes = 'slds-input inputBar CurriculumFilter';
        this.primaryFilters[4].classes = 'slds-input inputBar DegreeFilter';
        this.primaryFilters.forEach(element => {
            element.value = '';
            element.iconClass = 'slds-icon slds-input__icon slds-input__icon_right slds-icon-text-default iconClassBlack';
        });
        this.modalFiltersForPillsView = this.primaryFilters;
        this.modalFiltersForPillsViewDate = [];
    }
    filtersReset() {
        this.initializeAll();
        this.searchMoreFilters();
    } changedHeight(event) {
        this.template.querySelector('.conList').style.height = (event.detail - 155) + 'px';
    } manageSelectAll(event) {
        this.template.querySelectorAll('.checkBox').forEach(element => {
            element.checked = event.currentTarget.checked;
        });
    }
    headerTabClicked(event) {
        this.template.querySelector('.currentRecordsType').innerHTML = event.currentTarget.querySelector('h1').innerHTML;
        if (event.currentTarget.querySelector('h1').innerHTML == 'Total') {
            this.contactList = this.totalRecords; this.contactList.forEach(element => {
                element.classes = 'remainingRecords';
            })
            if (this.childScreenVisibility == true) {
                this.template.querySelector('c-job-child-component').clearAllTabs();
            } this.contactList.forEach(element => {
                if (element.Activity_Tracker__r == undefined) {
                    element.bookmarkStatus = this.starUnchecked;
                    element.checked = 'true';
                }
                else {
                    element.bookmarkStatus = this.starChecked;
                    element.checked = 'false';
                }
            })
            this.contactListCount = this.contactList.length;
            if (this.contactList.length > 0) {
                this.childScreenVisibility = true;
                this.visibleContact = this.contactList[0];
                setTimeout(() => {
                    this.template.querySelector('c-job-child-component').showChat(this.visibleContact.Id);
                }, 0);
            }
            else {
                this.childScreenVisibility = false;
            }
            this.compactViewContactList = this.contactList;
        }
        else {
            this.loader = true;
            let contactIds;
            this.template.querySelector('.bestMatchFilter').value = '';
            switch (event.currentTarget.querySelector('h1').innerHTML) {
                case 'Invited':
                    contactIds = this.countInvitedRecords;
                    break;
                case 'Hired':
                    contactIds = this.hiredRecords;
                    break;
                case 'Contacted':
                    contactIds = this.ContactedRecords;
                    break;
                case 'Interested':
                    contactIds = this.InterestedRecords;
                    break;
                case 'Declined':
                    contactIds = this.InvitationDeclinedRecords;
                    break;
                default:
                    break;
            }
            this.initializeAll();
            this.resetBtn = false;
            getCandidateListDependingUponHeaderTabs({ userId: this.currentLoggingUser, contactIds: contactIds }).then(result => {
                this.loader = false;
                this.contactList = result;
                this.contactList.forEach(element => {
                    element.classes = 'remainingRecords';
                })
                this.compactViewContactList = this.contactList;
                if (this.childScreenVisibility == true) {
                    this.template.querySelector('c-job-child-component').clearAllTabs();
                }
                this.contactList.forEach(element => {
                    if (element.Activity_Tracker__r == undefined) {
                        element.bookmarkStatus = this.starUnchecked;
                        element.checked = 'true';
                    }
                    else {
                        element.bookmarkStatus = this.starChecked;
                        element.checked = 'false';
                    }
                    if (element.Date_of_Availability__c != undefined) {
                        element.Date_of_Availability__c = this.months[parseInt(element.Date_of_Availability__c.split('T')[0].split('-')[1]) - 1] + ' ' + element.Date_of_Availability__c.split('T')[0].split('-')[2] + ', ' + element.Date_of_Availability__c.split('T')[0].split('-')[0];
                    }
                    if (element.Birthdate != undefined) {
                        element.Birthdate = this.months[parseInt(element.Birthdate.split('T')[0].split('-')[1]) - 1] + ' ' + element.Birthdate.split('T')[0].split('-')[2] + ', ' + element.Birthdate.split('T')[0].split('-')[0];
                    }
                    if (element.yearsOfExperience__c != undefined) {
                        element.yearsOfExperience__c = element.yearsOfExperience__c + ' Year';
                    }
                    else {
                        element.yearsOfExperience__c = '0 Year';
                    }
                })
                this.contactListCount = this.contactList.length;
                if (this.contactList.length > 0) {
                    this.childScreenVisibility = true;
                    this.visibleContact = this.contactList[0];
                    setTimeout(() => {
                        this.template.querySelector('c-job-child-component').showChat(this.visibleContact.Id);
                    }, 0);
                }
                else {
                    this.childScreenVisibility = false;
                }
                this.compactViewContactList = this.contactList;
            }).catch(error => {
                console.log(error);
                this.loader = false;
            })
        }
        if (window.innerWidth <= 700) {
            this.closeTabs();
        }
    }

    closeTabs() {
        this.template.querySelector('.tabs').style.display = 'none';
        this.template.querySelector('.headerTabsOverlay').style.display = 'none';
    }

    modalBodyClicked(event) {
        if (event.target.classList.contains('modalBody')) {
            this.MoreFiltersoptionsOverlayClicked();
        }
    } bookmarkBtnClicked(event) {
        if (event.currentTarget.querySelector('img').src.split('.com')[1] == this.starChecked) {
            favouriteCandidate({ candidate: event.currentTarget.dataset.id, userId: this.currentLoggingUser }).then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error);
                this.contactList.forEach(element => {
                    if (element.Id == event.currentTarget.dataset.id) {
                        element.bookmarkStatus = this.starChecked;
                    }
                })
                this.template.querySelector('c-job-child-component').bookmarkCheckValueCheckFromParent(event.currentTarget.dataset.id, 'true');
            });
            this.contactList.forEach(element => {
                if (element.Id == event.currentTarget.dataset.id) {
                    element.bookmarkStatus = this.starUnchecked;
                }
            })
            this.template.querySelector('c-job-child-component').bookmarkCheckValueCheckFromParent(event.currentTarget.dataset.id, 'false');
        }
        else {
            removefavouriteCandidate({ candidate: event.currentTarget.dataset.id, userId: this.currentLoggingUser }).then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error);
                this.contactList.forEach(element => {
                    if (element.Id == event.currentTarget.dataset.id) {
                        element.bookmarkStatus = this.starUnchecked;
                    }
                })
                this.template.querySelector('c-job-child-component').bookmarkCheckValueCheckFromParent(event.currentTarget.dataset.id, 'false');
            });
            this.contactList.forEach(element => {
                if (element.Id == event.currentTarget.dataset.id) {
                    element.bookmarkStatus = this.starChecked;
                }
            })
            this.template.querySelector('c-job-child-component').bookmarkCheckValueCheckFromParent(event.currentTarget.dataset.id, 'true');
        }
    }
    setConlistHeight(event) {
        this.template.querySelector('.conList').style.height = 'calc(' + event.detail + 'px - 100px)';
    } @track recordsToExport = []; exportContactData() {
        let elementChecked;
        let ids = [];
        this.template.querySelectorAll('.checkBox').forEach(element => {
            if (element.checked == true) {
                ids.push(element.dataset.id);
                elementChecked = true;
            }
        }); if (elementChecked == true) {
            let checkedRecords = []; this.contactList.forEach(element => {
                if (ids.includes(element.Id)) {
                    checkedRecords.push(element);
                }
            })
            let doc = '';
            this.currentFieldsOptions.forEach(element => {
                if (doc == '') {
                    doc = doc + element.split('Field')[0];
                }
                else {
                    doc = doc + ',' + element.split('Field')[0];
                }
            });
            checkedRecords.forEach(element => {
                if (this.currentFieldsOptions.includes('NameField')) {
                    if (element.Name != undefined) {
                        doc = doc + '\n' + element.Name;
                    }
                    else {
                        doc = doc + '\n';
                    }
                }
                if (this.currentFieldsOptions.includes('EmailField')) {
                    if (element.Email != undefined) {
                        doc = doc + ',' + element.Email;
                    }
                    else {
                        doc = doc + ',';
                    }
                }
                if (this.currentFieldsOptions.includes('AvailableDateField')) {
                    if (element.Date_of_Availability__c != undefined) {
                        doc = doc + ',' + element.Date_of_Availability__c.split(',')[0] + element.Date_of_Availability__c.split(',')[1];
                    }
                    else {
                        doc = doc + ',';
                    }
                }
                if (this.currentFieldsOptions.includes('CountryField')) {
                    if (element.Country__c != undefined) {
                        doc = doc + ',' + element.Country__c;
                    }
                    else {
                        doc = doc + ',';
                    }
                }
                if (this.currentFieldsOptions.includes('PartnerField')) {
                    if (element.Partner__c != undefined) {
                        doc = doc + ',' + element.Partner__c;
                    }
                    else {
                        doc = doc + ',';
                    }
                }
                if (this.currentFieldsOptions.includes('ExperienceField')) {
                    if (element.yearsOfExperience__c != undefined) {
                        doc = doc + ',' + element.yearsOfExperience__c;
                    }
                    else {
                        doc = doc + ',';
                    }
                }
                if (this.currentFieldsOptions.includes('RefereeScoreField')) {
                    if (element.refereeRating__c != undefined) {
                        doc = doc + ',' + element.refereeRating__c;
                    }
                    else {
                        doc = doc + ',';
                    }
                } if (this.currentFieldsOptions.includes('PhoneField')) {
                    if (element.Phone != undefined) {
                        doc = doc + ',' + element.Phone;
                    }
                    else {
                        doc = doc + ',';
                    }
                }
                if (this.currentFieldsOptions.includes('CertificateField')) {
                    if (element.Certification__c != undefined) {
                        doc = doc + ',' + element.Certification__c;
                    }
                    else {
                        doc = doc + ',';
                    }
                }
                if (this.currentFieldsOptions.includes('PreferredCountryField')) {
                    if (element.Preferred_Country__c != undefined) {
                        doc = doc + ',' + element.Preferred_Country__c;
                    }
                    else {
                        doc = doc + ',';
                    }
                }
                if (this.currentFieldsOptions.includes('CriminalRecordField')) {
                    if (element.Criminal_Record__c != undefined) {
                        doc = doc + ',' + element.Criminal_Record__c;
                    }
                    else {
                        doc = doc + ',';
                    }
                }
                if (this.currentFieldsOptions.includes('BirthdateField')) {
                    if (element.Birthdate != undefined) {
                        doc = doc + ',' + element.Birthdate;
                    }
                    else {
                        doc = doc + ',';
                    }
                }
                if (this.currentFieldsOptions.includes('RelationshipStatusField')) {
                    if (element.Relationship_Status__c != undefined) {
                        doc = doc + ',' + element.Relationship_Status__c;
                    }
                    else {
                        doc = doc + ',';
                    }
                }
                if (this.currentFieldsOptions.includes('NumberOfDependentsField')) {
                    if (element.Number_Of_Dependents__c != undefined) {
                        doc = doc + ',' + element.Number_Of_Dependents__c;
                    }
                    else {
                        doc = doc + ',';
                    }
                }
                if (this.currentFieldsOptions.includes('DegreeTypeField')) {
                    if (element.Degree_Type__c != undefined) {
                        doc = doc + ',' + element.Degree_Type__c;
                    }
                    else {
                        doc = doc + ',';
                    }
                }
                if (this.currentFieldsOptions.includes('CourseMajorField')) {
                    if (element.Course_Major__c != undefined) {
                        doc = doc + ',' + element.Course_Major__c;
                    }
                    else {
                        doc = doc + ',';
                    }
                }
                if (this.currentFieldsOptions.includes('DegreeConferredField')) {
                    if (element.Degree_Conferred__c != undefined) {
                        doc = doc + ',' + element.Degree_Conferred__c;
                    }
                    else {
                        doc = doc + ',';
                    }
                }
            }); var element = 'data:application/vnd.ms-excel,' + encodeURIComponent(doc);
            let downloadElement = document.createElement('a');
            downloadElement.href = element;
            downloadElement.target = '_self';
            downloadElement.download = 'CandidateList.csv';
            document.body.appendChild(downloadElement);
            downloadElement.click();
        }
        else {
            const event = new ShowToastEvent({
                message: 'Please select atleast one contact.',
                variant: 'error'
            });
            this.dispatchEvent(event);
        }
    } addRemoveColumnModal = false;
    hideAddRemoveColumnModal() {
        this.addRemoveColumnModal = false;
    } showfieldsOption(event) {
        if (event.currentTarget.parentElement.parentElement.parentElement.querySelector('.Options').style.display == 'none') {
            event.currentTarget.parentElement.parentElement.parentElement.querySelector('.Options').style.display = 'block';
        }
        else {
            event.currentTarget.parentElement.parentElement.parentElement.querySelector('.Options').style.display = 'none';
        }
    }


    showNameField = true;
    showEmailField = true;
    showAvailableDateField = true;
    showCountryField = true;
    showPartnerField = true;
    showExperienceField = true;
    showRefereeScoreField = true;
    showPhoneField = false;
    showCertificateField = false; showPreferredCountryField = false;
    showCriminalRecordField = false;
    showBirthdateField = false;
    showRelationshipStatusField = false;
    showNumberOfDependentsField = false;
    showDegreeTypeField = false;
    showCourseMajorField = false;
    showDegreeConferredField = false;
    showAddremoveOptionVisibility = false;


    resetFieldListOptions(event) {
        event.currentTarget.parentElement.parentElement.querySelectorAll('input').forEach(element => {
            element.checked = false;
        })
        event.currentTarget.parentElement.parentElement.style.display = 'none';
        this.addRemoveColumnModal = false;
    }
    addAndRemoveFieldsOptionValue = '';

    @track allFieldsAvailable = [
        { label: 'Name', value: 'NameField' },
        { label: 'Email', value: 'EmailField' },
        { label: 'AvailableDate', value: 'AvailableDateField' },
        { label: 'Country', value: 'CountryField' },
        { label: 'Partner', value: 'PartnerField' },
        { label: 'Experience', value: 'ExperienceField' },
        { label: 'RefereeScore', value: 'RefereeScoreField' },
        { label: 'Phone', value: 'PhoneField' },
        { label: 'Certificate', value: 'CertificateField' },
        { label: 'PreferredCountry', value: 'PreferredCountryField' },
        { label: 'CriminalRecord', value: 'CriminalRecordField' },
        { label: 'Birthdate', value: 'BirthdateField' },
        { label: 'RelationshipStatus', value: 'RelationshipStatusField' },
        { label: 'NumberOfDependents', value: 'NumberOfDependentsField' },
        { label: 'DegreeType', value: 'DegreeTypeField' },
        { label: 'CourseMajor', value: 'CourseMajorField' },
        { label: 'DegreeConferred', value: 'DegreeConferredField' }
    ]
    @track currentFieldsOptions = [];
    @track allFieldsOptions = ['NameField', 'EmailField', 'AvailableDateField', 'CountryField', 'PartnerField', 'ExperienceField', 'RefereeScoreField', 'PhoneField', 'CertificateField', 'PreferredCountryField', 'CriminalRecordField', 'BirthdateField', 'RelationshipStatusField', 'NumberOfDependentsField', 'DegreeTypeField', 'CourseMajorField', 'DegreeConferredField'];

    @track defaultValues = ['NameField', 'EmailField', 'AvailableDateField', 'CountryField', 'PartnerField', 'ExperienceField', 'RefereeScoreField'];
    addRemoveBtnClicked() {
        this.tempSelectedValues = this.currentFieldsOptions;
        this.showAddremoveOptionVisibility = true;
    }

    hideaddRemoveOptions() {
        this.showAddremoveOptionVisibility = false;
    }

    fieldsSubmitReorderOptions() {
        console.log('Submiting Data');
        this.currentFieldsOptions = this.tempSelectedValues;
        createDetailPageLayoutRecord({ userId: this.currentLoggingUser, values: JSON.stringify(this.currentFieldsOptions), layoutName: 'Compact Page' }).then(result => {
            console.log('RecordCreated');
        }).catch(error => {
            console.log(error);
        })
        this.reorderComponents();
        this.hideaddRemoveOptions();
        console.log('Edded');
    }

    fieldsresetReorderOptions() {
        this.currentFieldsOptions = this.defaultValues;
        this.tempSelectedValues = this.currentFieldsOptions;
    }


    @track tempSelectedValues = [];
    handleAddRemoveListOptionChanged(e) {
        this.tempSelectedValues = e.detail.value;
    }

    reorderComponents() {
        for (let ind = 0; ind < this.currentFieldsOptions.length; ind++) {

            var eleHead = this.template.querySelector('.' + this.currentFieldsOptions[ind] + 'Head');
            var parentElemHead = eleHead.parentElement;
            parentElemHead.insertBefore(eleHead, parentElemHead.children[ind]);

            var ele = this.template.querySelectorAll('.' + this.currentFieldsOptions[ind]);
            ele.forEach(el => {
                var parentElem = el.parentElement;
                parentElem.insertBefore(el, parentElem.children[ind]);
            })
        }

        for (let ind = 0; ind < this.allFieldsOptions.length; ind++) {
            var eleHead = this.template.querySelector('.' + this.allFieldsOptions[ind] + 'Head');
            if (this.currentFieldsOptions.includes(eleHead.dataset.class)) {
                eleHead.style.display = 'flex';
            }
            else {
                eleHead.style.display = 'none';
            }

            var ele = this.template.querySelectorAll('.' + this.allFieldsOptions[ind]);
            ele.forEach(el => {
                if (this.currentFieldsOptions.includes(el.dataset.class)) {
                    el.style.display = 'flex';
                }
                else {
                    el.style.display = 'none';
                }
            })
        }
    }

}