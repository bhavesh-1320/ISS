import { LightningElement, wire, track } from 'lwc';
import filterIcon from '@salesforce/resourceUrl/FilterIcon';
import teacherBoard from '@salesforce/resourceUrl/teacherBoardData';
import getCount from '@salesforce/apex/candidateJobSearchReview.getJobsCount';
import searchHeading from '@salesforce/resourceUrl/candidateSearchIcon';
import candidateJobs from '@salesforce/apex/candidateJobSearchReview.getJobs';
import getAccountData from '@salesforce/apex/candidateJobSearchReview.getAccountData';
import filterData from '@salesforce/apex/candidateJobSearchReview.getFilteredData';
import getAllSchoolName from '@salesforce/apex/candidateJobSearchReview.getAllSchoolName';
import getAllFiltersOptionValues from '@salesforce/apex/candidateJobSearchReview.getAllFiltersOptionValues';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getAlljobs from '@salesforce/apex/candidateJobSearchReview.getAlljobs';
import getAlljobs2 from '@salesforce/apex/candidateJobSearchReview.getAlljobs2';
import getSubjectPickListValues from '@salesforce/apex/candidateJobSearchReview.getSubjectPickListValues';
import getMorefilterResults from '@salesforce/apex/candidateJobSearchReview.getMorefilterResults';
import Id from '@salesforce/user/Id';
import TickerSymbol from '@salesforce/schema/Account.TickerSymbol';
import getJOBFilters from '@salesforce/apex/candidateJobSearchReview.getJOBFilters';
import getBestMatchRecs from '@salesforce/apex/candidateJobSearchReview.getBestMatchRecs';


export default class CandidateJobSearchReviewPage extends LightningElement {
    dateRange='';
    jobsCount='';
    modalFiltersForPillsView = [];
    modalFiltersForPillsViewDate = [];
    modalFiltersForRadio=[];
    resetBtn = false;
    showCount = (0)
    showCountSubject = 0
    showCountCountry = 0
    countShow = false;
    @track items = [];
    rectangleImage = searchHeading + '/ISSV2/Rectangle.png';
    groups = searchHeading + '/ISSV2/Group328.png';
    hatImage = searchHeading + '/ISSV2/graduate.png';
    locationImage = searchHeading + '/ISSV2/locationImg.png';
    currentLoggingUser = Id;
    // currentLoggingUser = '0058M000000ujwwQAA';
    openrolesId = 'job_position__c';
    openRolesValue = '';
    datafilterlist = [];
    likes = false;
    schoolName = [];
    board = teacherBoard;
    dataJobs;
    openDepartId = 'Department__c';
    openSubjId = 'Subject__c';
    @track bestMatchJob = [];
    NoDatafound = false;
    resultCounts;
    moreFiltersVisibility = true;
    loaderInner = false;
    showMoreBtn = true;
    isApply = true;

    DepartmentModalOptionValue = '';
    SubjectModalOptionValue = '';
    CountryModalOptionValue = '';
    JobTypeModalOptionValue = '';
    ExperienceModalOptionValue = '';
    SchoolNameModalOptionValue = '';
    CurriculumSpokenModalOptionValue = '';
    DateFromModalOptionValue = '';
    DateToModalOptionValue = '';
    PositionDateFromModalOptionValue = '';
    PositionDateToModalOptionValue = '';
    StartDateModalOptionValue = '';
    EndDateModalOptionValue = '';
    PositionJobFairModalOptionValue = '';
    BookmarkOptionValue = '';
    // InterestedCountryModalOptionValue = '';

    @track countryList = []
    @track subjectList = [];
    @track departmentList = [];
    @track CurriculumExperiences = []
    @track subjectOptionValue=[]

    showToast() {
        
    }

    departmentSubjects = {
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




    @wire(getAllFiltersOptionValues)
    totalResults({ error, data }){
        if(data){
            // console.log('data-->',data)
            data[0].forEach(element => {
                this.countryList.push({ label: element, value: element });
            });
            data[1].forEach(element => {
                this.subjectList.push({ label: element, value: element });
                this.subjectOptionValue.push({ label: element, value: element });
            
            });
            data[2].forEach(element => {
                this.departmentList.push({ label: element, value: element });
            });
            data[3].forEach(element => {
                this.CurriculumExperiences.push({ label: element, value: element });
            });




        }if(error){
            console.log('eror-->',error);
        }
    }

    openRoles = [];
   


    subjectListDepartment = [];

    schoolList = [];

    @wire(getAllSchoolName)
    getAllSchoolName({ data, error }) {
        if (data) {
            data.forEach(element => {
                this.schoolList.push({ label: element.Name, value: element.Id });
            });
        }
        else {
            if (error) {
                
            }
        }
    }

    jobTypes = [
        { label: 'Part Time', value: 'Part Time' },
        { label: 'Online', value: 'Online' },
        { label: 'Short Term/Summer', value: 'Short Term/Summer' },
        { label: 'Intern', value: 'Intern' },
        { label: 'Substitute/Supply', value: 'Substitute/Supply' },
        { label: 'Student Teacher', value: 'Student Teacher' }
    ];

    

    bookmarkCombobox = [
        { label: 'Show All', value: 'Show All'},
        { label: 'Show Only Bookmarks', value: 'Show Only Bookmarks'},
        { label: "Don't Show Bookmarks", value: "Don't Show Bookmarks"}
    ]


    
    Experiences = [
        { label: '0-1', value: '0-1' },
        { label: '2-4', value: '2-4' },
        { label: '5-8', value: '5-8' },
        { label: '9-10', value: '9-10' },
        { label: '10+', value: '10+' }
    ];

    loader = true;
    jobsData = [];
    JobFullDetails = [];
    value = {};
    jobPosition = [];
    sizeOfJobList;
    allusers = [];
    copyOfJobData = [];
    countryListId = 'Country__c';
    showLeftList;
    openStartDateId = 'Job_Role_Start_Date__c';
    sortId = 'Sorting'



    startDateList = [
        { label: 'None', value: 'None' },
        { label: 'Today', value: 'Today' },
        { label: 'This Week', value: 'This Week' },
        { label: 'This Month', value: 'This Month' },
    ];

    sortingOption = [
        { label: 'BEST MATCHES', value: 'BEST MATCHES' },
        { label: 'Recently Posted', value: 'Recently Posted' },
        { label: 'Apply By Date', value: 'Apply By Date' },
        { label: 'Starting Date', value: 'Starting Date' },
        { label: 'Alphabetical A-Z', value: 'Alphabetical A-Z' },
        { label: 'Alphabetical Z-A', value: 'Alphabetical Z-A' },
        { label: 'New Jobs', value: 'New Jobs' },
    ];


    

    getClick(event) {
        
   
        
            this.bestMatchJob.forEach(element => {
                if (element.Id == event.currentTarget.dataset.id) {
                    console.log('element--->',element);
                    // 
                    this.value = element;

                    this.template.querySelector('c-high-school-math').checkGetRecord(this.value);
                    this.template.querySelector('c-high-school-math').closeDropDown();
                    
                }
            })
        

    }
    closeModal() {
        this.likes = true;
    }

    months = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    schoollIdFromURL;
    limitSize = 50;
    offset = 0;
    bmOffset = 0;
    getSubject(event) {
        var arr = this.departmentSubject[event.currentTarget.value];
       
    }

    handleBestMatch(event) {
        if(event.currentTarget.innerHTML=='Alphabetical A-Z')
        {
            event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = `Sort Order: A-Z`
        }else if(event.currentTarget.innerHTML=='Alphabetical Z-A'){
            event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = `Sort Order: Z-A`
            
        }else{

            event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = `Sort Order: `+event.currentTarget.innerHTML;
        }
        event.currentTarget.parentElement.parentElement.style.display = 'none';
        // this.template.querySelector('.sortingDiv').style.display = 'none';
        let contactList = this.bestMatchJob;
        if (event.currentTarget.innerHTML == 'Alphabetical A-Z') {
            this.sortData('Name', 'asc')
        }

        if (event.currentTarget.innerHTML == 'Alphabetical Z-A') {
          
            this.sortData('Name', 'dsc')
        }
        if (event.currentTarget.innerHTML == 'Apply By Date') {
            this.sortData('JobCloseDateOld', 'asc')
        }
        if (event.currentTarget.innerHTML == 'Starting Date') {
            this.sortData('JobRoleStartDateOld', 'asc')
        }
        if (event.currentTarget.innerHTML == 'New Jobs') {
            this.sortData('CreatedDateOld', 'dsc')

        }
     
        if (event.currentTarget.innerHTML == 'Recently Posted') {
           
                       this.sortData('CreatedDateOld', 'dsc')
        }
        if (event.currentTarget.innerHTML == 'BEST MATCHES') {
            this.loader = true;
            this.sortBestMatchRecs();
        }
        this.optionsOverlayClicked();

    }
    sortBestMatchRecs( moreRes ){
        /* let JobType = this.template.querySelector('.moreFilterJobType').value;
        let Experience = this.template.querySelector('.moreFilterExperience').value;
        let School = this.template.querySelector('.moreFilterSchool').value;
        let curriculum = this.template.querySelector('.moreFilterCurriculum').value;
        let ApplyDateFrom = this.template.querySelector('.moreFilterApplyDateFrom').value;
        let ApplyDateTo = this.template.querySelector('.moreFilterApplyDateTo').value;
        let PositionDateFrom = this.template.querySelector('.moreFilterPositionDateFrom').value;
        let PositionDateTo = this.template.querySelector('.moreFilterPositionDateTo').value;
        let NewJobsDateFrom = this.template.querySelector('.moreFilterNewJobsDateFrom').value;
        let NewJobsDateTo = this.template.querySelector('.moreFilterNewJobsDateTo').value;
        let bookmark2 = this.template.querySelector('.moreFiltersBookmark').value;
        this.hideMoreFilter(); */

        getBestMatchRecs({ userId: this.currentLoggingUser, limitSize: this.limitSize, offset: this.bmOffset }).then(result => {
        // getBestMatchRecs({ bookmark:bookmark2, startDate: this.dateRange, department: this.modalDepartmentList, Subject: this.modalSubjectList, Country: this.modalCountryList, JobType: this.modalJobTypeList,  School: this.modalSchoolList, curriculum: this.modalCurriculumList, ApplyDateFrom: ApplyDateFrom, ApplyDateTo: ApplyDateTo, PositionDateFrom: PositionDateFrom, PositionDateTo: PositionDateTo, NewJobsDateFrom: NewJobsDateFrom, NewJobsDateTo: NewJobsDateTo, userId: this.currentLoggingUser, limitSize: this.limitSize, offset: this.bmOffset }).then(result => {
            this.loader = false;
            this.loaderInner = false;
            console.log('BM Recs:',result);
            let results = result;
            if( moreRes == undefined ){
                this.bestMatchJob = [];
            }
            if (results['Must Have'] != undefined) {
                results['Must Have'].forEach(element => {
                    element.classes = 'mustHave job-bubbleFC slds-card';
                    this.bestMatchJob.push(element);
                });
            }
            if (results['Key Match'] != undefined) {
                results['Key Match'].forEach(element => {
                    element.classes = 'keyMatches job-bubbleFC slds-card';
                    this.bestMatchJob.push(element);
                });
            }
            if (results['Remaining Recs'] != undefined) {
                results['Remaining Recs'].forEach(element => {
                    element.classes = 'remainingRecords job-bubbleFC slds-card';
                    this.bestMatchJob.push(element);
                });
            }

            this.resultCounts = this.contactList.length;

            this.bestMatchJob.forEach(element => {
                if (element.Job_Close_Date__c != undefined)  {
                    element.JobCloseDateOld = new Date(element.Job_Close_Date__c)
                    element.Job_Close_Date__c =`Apply By: ${this.months[parseInt(element.Job_Close_Date__c.split('T')[0].split('-')[1]) - 1] + ' ' + element.Job_Close_Date__c.split('T')[0].split('-')[2] + ', ' + element.Job_Close_Date__c.split('T')[0].split('-')[0]}`;
                }
                if (element.Job_Role_Start_Date__c != undefined) {
                    element.JobRoleStartDateOld = new Date(element.Job_Role_Start_Date__c);
                    element.Job_Role_Start_Date__c = this.months[parseInt(element.Job_Role_Start_Date__c.split('T')[0].split('-')[1]) - 1] + ' ' + element.Job_Role_Start_Date__c.split('T')[0].split('-')[2] + ', ' + element.Job_Role_Start_Date__c.split('T')[0].split('-')[0];
                }
                if(element.CreatedDate!=undefined){
                    element.CreatedDateOld = new Date(element.CreatedDate);
                    
                    element.CreatedDate = 'Posted: ' + this.months[parseInt(element.CreatedDate.split('T')[0].split('-')[1]) - 1] + ' ' + element.CreatedDate.split('T')[0].split('-')[2] + ', ' + element.CreatedDate.split('T')[0].split('-')[0]; 
                        
                    
                }if(element.School__r!=undefined){
                    element.SchoolName = element.School__r.Name; 
                }
            })

            if (this.bestMatchJob.length > 0) {
                this.value = this.bestMatchJob[0];
                //this.template.querySelector('c-high-school-math').checkGetRecord(this.value);
            }
            else {
                this.value = 'undefined';
                //this.template.querySelector('c-high-school-math').checkGetRecord(this.value);
            }


        }).catch(error => {
            console.log(error);
            this.loader = false;
        })
    }


    sortData(fieldname, direction) {
        let parseData = JSON.parse(JSON.stringify(this.bestMatchJob));
        // 
        // Return the value stored in the field
        let keyValue = (a) => {
            console.log('into the key value')
            return a[fieldname];
        };
        // cheking reverse direction
        let isReverse = direction === 'asc' ? 1: -1;
        // sorting data
        parseData.sort((x, y) => {
            x.classes = 'job-bubbleFC slds-card';
            y.classes = 'job-bubbleFC slds-card';

            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';
            // sorting values based on direction
            console.log('end of sorting')
            return isReverse * ((x > y) - (y > x));
        });

        
        this.bestMatchJob = JSON.parse(JSON.stringify(parseData));
        console.log('end of sort data')
    }    

    
    countTime = 0;

    loadMoreResult() {
        // console.log('into the fun')
        let temp1 = this.template.querySelector('.jobslist');
        let totalscrollHeight = temp1.scrollHeight;
        let offSetHeight = temp1.parentNode.offsetHeight;
        
        var scrollbarheight = temp1.parentNode.offsetHeight - temp1.offsetHeight;
        let scrollY = temp1.scrollTop
        
        
            if(this.resultCounts>49){
                console.log('totalscrollHeight-->',totalscrollHeight)
                console.log('temp1.offsetHeight-->',temp1.offsetHeight)
                 console.log('scrollY-->',scrollY)
                // console.log('temp1.parentNode.offsetHeight-->',temp1.parentNode.offsetHeight)
                 console.log('temp1.parentNode.offsetHeight Round-->',Math.round(temp1.offsetHeight + scrollY) );
                 console.log('temp1.parentNode.offsetHeight Round-->',Math.round(temp1.offsetHeight + scrollY)+1 );
                // console.log('temp1.parentNode.offsetHeight-->',temp1.parentNode.offsetHeight)


                if(totalscrollHeight < temp1.parentNode.offsetHeight + scrollY)
                    {
               
                    // console.log('line 900')
                    this.loaderInner = true;
                    
                    if (this.template.querySelector('.handleBestMatch').value == 'Sort Order: BEST MATCHES') {
                        console.log('Calling best match From more res');
                        this.bmOffset = this.bmOffset + this.limitSize;
                        this.sortBestMatchRecs(true);
                    }else{
                        let schoolId;
                        if (this.schoollIdFromURL == undefined) {
                            schoolId = 'all';
                        }
                        else {
                            schoolId = this.schoollIdFromURL;
                        }
                
                    
                        let JobType = this.template.querySelector('.moreFilterJobType').value;
                        
                        let Experience = this.template.querySelector('.moreFilterExperience').value;
                    
                        let School = this.template.querySelector('.moreFilterSchool').value;
                    
                        let curriculum = this.template.querySelector('.moreFilterCurriculum').value;
                        
                        let ApplyDateFrom = this.template.querySelector('.moreFilterApplyDateFrom').value;
                    
                        let ApplyDateTo = this.template.querySelector('.moreFilterApplyDateTo').value;
                        
                        let PositionDateFrom = this.template.querySelector('.moreFilterPositionDateFrom').value;
                        
                        let PositionDateTo = this.template.querySelector('.moreFilterPositionDateTo').value;
                        
                        let NewJobsDateFrom = this.template.querySelector('.moreFilterNewJobsDateFrom').value;
                        
                        let NewJobsDateTo = this.template.querySelector('.moreFilterNewJobsDateTo').value;
                        let bookmark2 = this.template.querySelector('.moreFiltersBookmark').value;
                        // console.log('bookmark2-->',bookmark2);
                        // if(bookmark2=='Bookmark: Show Only Bookmarks'){
                        //     bookmark2 = true
                        // }else if(bookmark2 == "Bookmark: Don't Show Bookmarks"){
                        //     bookmark2 = false;
                        // }else{
                        //     bookmark2 = null
                        // }
                        this.hideMoreFilter();
                        
                        this.offset = this.offset + this.limitSize;
                        
                        // console.log('410')
                        getMorefilterResults({bookmark:bookmark2, startDate: this.dateRange, UserId: this.currentLoggingUser, limitSize: this.limitSize, offset: this.offset, department: this.modalDepartmentList, Subject: this.modalSubjectList, Country: this.modalCountryList, JobType: this.modalJobTypeList,  School: this.modalSchoolList, curriculum: this.modalCurriculumList, ApplyDateFrom: ApplyDateFrom, ApplyDateTo: ApplyDateTo, PositionDateFrom: PositionDateFrom, PositionDateTo: PositionDateTo, NewJobsDateFrom: NewJobsDateFrom, NewJobsDateTo: NewJobsDateTo}).then(result => {
                        // console.log('412')

                            
                        
                            // let bestMatchJob = JSON.parse(JSON.stringify(result));
                            let bestMatchJob = result.data;
                            
                
                        
                            // if (this.bestMatchJob.length < 50) {
                            //     this.showMoreBtn = false;
                            // }
                            // else {
                            //     this.showMoreBtn = true;
                            // }
                
                            bestMatchJob.forEach(element => {
                                element.classes = 'job-bubbleFC slds-card';
                                if (element.Job_Close_Date__c != undefined) {
                                    element.JobCloseDateOld = element.Job_Close_Date__c;
                                    element.Job_Close_Date__c = `Apply By: ${this.months[parseInt(element.Job_Close_Date__c.split('T')[0].split('-')[1]) - 1] + ' ' + element.Job_Close_Date__c.split('T')[0].split('-')[2] + ', ' + element.Job_Close_Date__c.split('T')[0].split('-')[0]}`;
                                }
                                if (element.Job_Role_Start_Date__c != undefined) {
                                    element.JobRoleStartDateOld = new Date(element.Job_Role_Start_Date__c);
                                    element.Job_Role_Start_Date__c = this.months[parseInt(element.Job_Role_Start_Date__c.split('T')[0].split('-')[1]) - 1] + ' ' + element.Job_Role_Start_Date__c.split('T')[0].split('-')[2] + ', ' + element.Job_Role_Start_Date__c.split('T')[0].split('-')[0];
                                }
                                if(element.CreatedDate!=undefined){
                                    element.CreatedDateOld = new Date(element.CreatedDate)
                                    element.CreatedDate = 'Posted: ' + this.months[parseInt(element.CreatedDate.split('T')[0].split('-')[1]) - 1] + ' ' + element.CreatedDate.split('T')[0].split('-')[2] + ', ' + element.CreatedDate.split('T')[0].split('-')[0]; 
                                    
                                
                                }
                                if(element.School__r!=undefined){
                                    element.SchoolName = element.School__r.Name; // console.log('element.SchoolName-->',element.SchoolName);
                                }
                            })

                            

                            this.optionsOverlayClicked();
                
                            this.bestMatchJob = this.bestMatchJob.concat(bestMatchJob);
                            
                            this.jobsCount = this.resultCounts;
                
                            if (this.bestMatchJob.length > 0) {
                                this.value = this.bestMatchJob[0];
                                this.template.querySelector('c-high-school-math').checkGetRecord(this.value);
                            }
                            else {
                                this.value = 'undefined';
                                this.template.querySelector('c-high-school-math').checkGetRecord(this.value);
                            }
                
                            // this.resultCounts = this.bestMatchJob.length;
                            this.totalResultsFetch = result.count[0].expr0
                            this.resultCounts = result.count[0].expr0;


                            this.loaderInner = false;
                            console.log('innerHtml-->',this.template.querySelector('.handleBestMatch').value);
                            if (this.template.querySelector('.handleBestMatch').value == 'Sort Order: A-Z') {
                                console.log('into the handleBestMatch')
                                this.sortData('Name', 'asc')
                            }
                    
                            else if (this.template.querySelector('.handleBestMatch').value == 'Sort Order: Z-A') {
                            
                                this.sortData('Name', 'dsc')
                            }
                            else if (this.template.querySelector('.handleBestMatch').value == 'Sort Order: Apply By Date') {
                                this.sortData('JobCloseDateOld', 'asc')
                            }
                            else if (this.template.querySelector('.handleBestMatch').value == 'Sort Order: Starting Date') {
                                this.sortData('JobRoleStartDateOld', 'asc')
                            }
                            else if (this.template.querySelector('.handleBestMatch').value == 'Sort Order: New Jobs') {
                                this.sortData('CreatedDateOld', 'dsc')            
                            }
                        
                            else if (this.template.querySelector('.handleBestMatch').value == 'Sort Order: Recently Posted') {
                            
                                        this.sortData('CreatedDateOld', 'dsc')
                            }

                        }).catch(error => {
                        
                            this.loaderInner = false;
                        })
                    }
                    // console.log('bM:',bestMatchOp);
                    
                // this.countTime-=1
                }
            } 

     
    
        
    }

    connectedCallback() {
        // getCount({}).then((result)=>{
            
        //     this.jobsCount = result;
        // })
        let newData;
        if(window.location.search!=''){
            newData = window.location.search.split('=');
            newData = newData[1];
        }
        console.log('newData-->',newData);
        getAlljobs({ UserId: this.currentLoggingUser, limitSize: this.limitSize, offset: this.offset ,urlJobId: newData}).then(result => {
        
            this.loader = false;
   
            this.bestMatchJob = result.data;
            console.log('bestmatchjob----->',this.bestMatchJob);
            this.totalResultsFetch = result.count[0].expr0 ;
            this.resultCounts = result.count[0].expr0-2;

          
            if (this.bestMatchJob.length < 50) {
                this.showMoreBtn = false;
            }
            else {
                this.showMoreBtn = true;
            }

            this.bestMatchJob.forEach(element => {
                element.classes = 'job-bubbleFC slds-card';
                if (element.Job_Close_Date__c != undefined)  {
                    element.JobCloseDateOld = new Date(element.Job_Close_Date__c)
                    element.Job_Close_Date__c =`Apply By: ${this.months[parseInt(element.Job_Close_Date__c.split('T')[0].split('-')[1]) - 1] + ' ' + element.Job_Close_Date__c.split('T')[0].split('-')[2] + ', ' + element.Job_Close_Date__c.split('T')[0].split('-')[0]}`;
                }
                if (element.Job_Role_Start_Date__c != undefined) {
                    element.JobRoleStartDateOld = new Date(element.Job_Role_Start_Date__c);
                    element.Job_Role_Start_Date__c = this.months[parseInt(element.Job_Role_Start_Date__c.split('T')[0].split('-')[1]) - 1] + ' ' + element.Job_Role_Start_Date__c.split('T')[0].split('-')[2] + ', ' + element.Job_Role_Start_Date__c.split('T')[0].split('-')[0];
                }
                if(element.CreatedDate!=undefined){
                    element.CreatedDateOld = new Date(element.CreatedDate);
                    
                    element.CreatedDate = 'Posted: ' + this.months[parseInt(element.CreatedDate.split('T')[0].split('-')[1]) - 1] + ' ' + element.CreatedDate.split('T')[0].split('-')[2] + ', ' + element.CreatedDate.split('T')[0].split('-')[0]; 
                     
                   
                }if(element.School__r!=undefined){
                    element.SchoolName = element.School__r.Name; // console.log('element.SchoolName-->',element.SchoolName);
                }
            })

            if (this.bestMatchJob.length > 0) {
                
            
        
                            this.value = this.bestMatchJob[0];
                            this.template.querySelector('c-high-school-math').checkGetRecord(this.value);
                    

               
                    
             
            }
            else {
                this.value = 'undefined';
                this.template.querySelector('c-high-school-math').checkGetRecord(this.value);
            }

      

        }).catch(error => {
            console.log('error--->',JSON.stringify(error));
            this.loader = false;
        })

        
    }

    getJobRecord(newId){
        console.log('checkID-->',newId)
        getAlljobs2({ UserId: this.currentLoggingUser, limitSize: this.limitSize, offset: this.offset, jobId : newId  }).then(result => {
            console.log('result.data->',result.data)
            let test = result.data[0]

            this.value = JSON.parse(JSON.stringify(test));
            console.log('this.value-->',this.value)
            // this.bestMatchJob = JSON.parse(JSON.stringify(this.bestMatchJob))
            this.template.querySelector('c-high-school-math').checkGetRecord(this.value);
            this.loader = false;
    })  

}

   
    MoreFiltersoptionsOverlayClicked(){
        let options = this.template.querySelectorAll('.moreFilterOptions');
        options.forEach(ele => {
            ele.style.display = 'none';
        });
        this.template.querySelector('.modalOptionsOverlay').style.display = 'none';s
    }

    showOptionMoreFilter(event) {
        

        let optionsSelected;

        switch (event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder) {
            case 'Department':
                optionsSelected = this.modalDepartmentList;
                
                break;
            case 'Subject':
                optionsSelected = this.modalSubjectList;
                break;
            case 'Country':
                optionsSelected = this.modalCountryList;
                break;
            case 'Job Type':
                optionsSelected = this.modalJobTypeList;
                break;
            case 'Experience':
                optionsSelected = this.modalExperienceList;
                break;
            case 'School Name':
                optionsSelected = this.modalSchoolList;
                break;
            case 'Curriculum':
                optionsSelected = this.modalCurriculumList;
                break;
           
            case 'Positions At Upcoming Job Fairs':
                optionsSelected = this.modalPositionList;
                break;
            case 'Bookmark':
                optionsSelected = this.modalBookmarkList;
                break;
            default:
                break;
        }

        let options = this.template.querySelectorAll('.moreFilterOptions');
        options.forEach(ele => {
            if (ele.parentElement.classList == event.currentTarget.parentElement.parentElement.parentElement.classList) {
                if (ele.style.display == 'none') {
                
                    ele.style.display = 'block';
                    this.template.querySelector('.modalOptionsOverlay').style.display = 'block';
                    ele.querySelectorAll('span').forEach(element => {
                      
                        
                       
                        if(optionsSelected == undefined){
                            
                        }else if (optionsSelected.includes(element.innerHTML)) {
                    
                            
                            element.parentElement.querySelector('input').checked = true;
                        

                        }
                       
                        else {
                         

                            element.parentElement.querySelector('input').checked = false;
                     
                        }
                    });
                }
                else{
                  
                    ele.style.display = 'none';
                    this.template.querySelector('.modalOptionsOverlay').style.display = 'none';
                }
            }
            else {
             
                ele.style.display = 'none';
            }
        })

    }

    searchInnerModal(event){
     

        let total;
        let removed = 0;
        let options = this.template.querySelectorAll('.moreFilterOptions');
        options.forEach(ele => {
             if (ele.parentElement.classList == event.currentTarget.parentElement.parentElement.parentElement.classList) {
                try{

                    ele.querySelectorAll('.checkParentDiv').forEach(element => {
                        
                        element.style.visibility = 'visible';
                        element.style.position = 'relative';
                        
                        
                        if (!(element.querySelector('.checkinnerdata').innerHTML.toLowerCase().includes(event.target.value.toLowerCase()))) {
                            
                            element.style.visibility = 'hidden';
                            element.style.position = 'absolute';
                        }
                    })
                }catch (err) {
                    
                }
            }
        })
      
    }

    showOption(event) {
       

        let optionsSelected;
        // this.template.querySelector('.optionsFields1').style.display = 'block';

        switch (event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder) {
            case 'Department':
                optionsSelected = this.modalDepartmentList;
                break;
            case 'Subject':
               
                    optionsSelected = this.modalSubjectList;
                
                break;
            case 'Country':
                optionsSelected = this.modalCountryList;
                break;
            case 'Job Type':
                optionsSelected = this.modalJobTypeList;
                break;
            case 'Experience':
                optionsSelected = this.modalExperienceList;
                break;
            case 'School Name':
                optionsSelected = this.modalSchoolList;
                break;
            case 'Curriculum':
                optionsSelected = this.modalCurriculumList;
                break;
            case 'Date From':
             
                break;
            case 'Date To':
              
                break;
            case 'Position Date From':
             
                break;
            case 'Position Date To':
               
                break;
            case 'Start Date':
               
                break;
            case 'End Date':
               
                break;
            case 'Positions At Upcoming Job Fairs':
                optionsSelected = this.modalPositionList;
                break;
            case 'Bookmark':
                optionsSelected = this.modalBookmarkList;
                break;
            default:
                break;
        }
        // if(this.modalDepartmentList.length==0){
        //     console.log('into else')
        //     const evt = new ShowToastEvent({
        //         title: '',
        //         message: 'Please Select Atleast One Department.',
        //         variant: 'error',
        //         mode: 'dismissable'
        //     });
        //     this.dispatchEvent(evt);
        //     console.log('line 1128')
       
        // }
        let options = this.template.querySelectorAll('.cmbOptions');
        options.forEach(ele => {
            if (ele.parentElement.classList == event.currentTarget.parentElement.parentElement.parentElement.classList) {
                if (ele.style.display == 'none') {
                    this.template.querySelector('.optionsOverlay').style.display = 'block';
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
                    this.template.querySelector('.optionsOverlay').style.display = 'none';
                    ele.style.display = 'none';
                }
            }
            else {
                ele.style.display = 'none';
            }
        })


        

       
    }

    getClickMobile(event) {
        let Ids = event.currentTarget.id;
        
        this.template.querySelector('.mobile-view-dropdown').style.display = 'none';
        this.template.querySelector('.mobile-view-childCmp').style.display = 'block';
    }
    passToParent(event) {
       
        this.template.querySelector('.mobile-view-dropdown').style.display = 'block';
        this.template.querySelector('.mobile-view-childCmp').style.display = 'none';
    }

    bookmarkCheckBoxValue='';

    handleChange(event){
        console.log('value-->',this.template.querySelector('.modalBookmarkRadio').value)
        const selectedOption = this.template.querySelector('.modalBookmarkRadio').value;
        if(this.template.querySelector('.modalBookmarkRadio').value!=null && this.template.querySelector('.modalBookmarkRadio').value!=undefined && this.template.querySelector('.modalBookmarkRadio').value!=''){
            this.bookmarkCheckBoxValue = this.template.querySelector('.modalBookmarkRadio').value
            this.template.querySelector('.moreFiltersBookmark').value = `Bookmark: ${this.template.querySelector('.modalBookmarkRadio').value}`
            // this.template.querySelector('.moreFiltersBookmark2').value = `Bookmark: ${this.template.querySelector('.modalBookmarkRadio').value}`
        }
        this.template.querySelector('.bookmarkOptions').style.display = 'none';

    }

    handleResetChange(event){
        this.bookmarkCheckBoxValue =''
        this.template.querySelector('.moreFiltersBookmark').value = '';
        this.template.querySelector('.modalBookmarkRadio').value  = '';

        this.template.querySelector('.bookmarkOptions').style.display = 'none';

    }

    
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
      
            for (var v of arr) {
              
            }
        } catch (err) {
            
        }
     

    }
    handleSearch(evt) {
        let searchText = evt.currentTarget.value;
        if (searchText == '') {
            let count = 0;
            this.template.querySelectorAll('.job-bubbleFC').forEach(element => {
                element.style.position = 'relative';
                element.style.height = 'max-content';
                element.style.padding = '1px';
                element.style.display = 'block';

                count++;
            });
            this.resultCounts = this.totalResultsFetch;
        }
        else {
            let removed = 0;
            let total = 0;
            this.template.querySelectorAll('.job-bubbleFC').forEach(element => {
                console.log('check inner')
                
                element.style.position = 'relative';
                element.style.height = 'max-content';
                element.style.padding = '1px';
                element.style.display = 'block';

                total++;
                if (!(element.querySelector('.articleHeadingFC').innerHTML.toLowerCase().includes(searchText.toLowerCase()))) {
                    element.style.position = 'absolute';
                    element.style.height = '0px';
                    element.style.padding = '0px';
                    element.style.display = 'none';
                    removed++;
                }
            });
            this.resultCounts = total - removed;
            if(this.resultCounts==0){
                this.value = 'undefined';
                this.template.querySelector('c-high-school-math').checkGetRecord(this.value);
            }else{
                this.value = this.bestMatchJob[0];
                this.template.querySelector('c-high-school-math').checkGetRecord(this.value);
            }
        }
    }
    handleSortData(evt) {
        let id = evt.target.dataset.id;
        let value = evt.target.value;
        // 
        if (value == 'Apply By Date') {
            this.sortByApplyDate(value);
        }
        if (value == 'Starting Date') {
            this.jobStartingDateFilter();
        }
        if (value == 'Recently Posted') {
            this.RecentlyPostedFilter();
        }


    }
    getStartDate(event) {
        // 
        this.template.querySelector('.moreFilterNewJobsDateFrom').value = event.target.value;
        

    }
    getEndDate(event) {
        // 
        this.template.querySelector('.moreFilterNewJobsDateTo').value = event.target.value;

    }
    sortByApplyDate(value) {
        // 
        let copyOfBestMatch = this.bestMatchJob;
        for (let i = 0; i < copyOfBestMatch.length; i++) {
            let date1 = new Date(copyOfBestMatch[i].Job_Close_Date__c);
            let date2 = new Date(copyOfBestMatch[i + 1].Job_Close_Date__c);
            if (date1 > date2) {
                // 
                let firstElement = copyOfBestMatch[i];
                let secondElement = copyOfBestMatch[i + 1];

                copyOfBestMatch[i] = secondElement;
                copyOfBestMatch[i + 1] = firstElement;
                i = 0;
            }
        }
        // 
        this.bestMatchJob = copyOfBestMatch;
        this.resultCounts = this.bestMatchJob.length;

    }
    jobStartingDateFilter() {
        let copyOfBestMatch = this.bestMatchJob;
        for (let i = 0; i < copyOfBestMatch.length; i++) {
            let date1 = new Date(copyOfBestMatch[i].Job_Role_Start_Date__c);
            let date2 = new Date(copyOfBestMatch[i + 1].Job_Role_Start_Date__c);
            if (date1 > date2) {
                // 
                let firstElement = copyOfBestMatch[i];
                let secondElement = copyOfBestMatch[i + 1];

                copyOfBestMatch[i] = secondElement;
                copyOfBestMatch[i + 1] = firstElement;
                i = 0;
            }
        }
        // 
        this.bestMatchJob = copyOfBestMatch;
        this.resultCounts = this.bestMatchJob.length;

    }
    RecentlyPostedFilter() {
        let copyOfBestMatch = this.bestMatchJob;
        let newfilterdata;
        for (let i = 0; i < copyOfBestMatch.length; i++) {
            let date1 = new Date();

            if (copyOfBestMatch[i].CreatedDate == date1) {
                newfilterdata.push(copyOfBestMatch[i]);
                //i = 0;
            }
        }
        
        this.bestMatchJob = copyOfBestMatch;
        this.resultCounts = this.bestMatchJob.length;

    }

    submitDate(event)
    {
        if(event.currentTarget.parentElement.parentElement.querySelector('.startDateInput').value=='' || event.currentTarget.parentElement.parentElement.querySelector('.endDateInput').value ==''){
            this.resetDate()
        }
        else{

            this.dateRange = event.currentTarget.parentElement.parentElement.querySelector('.startDateInput').value +' - '+event.currentTarget.parentElement.parentElement.querySelector('.endDateInput').value;
            let test = event.currentTarget.parentElement.parentElement.querySelector('.startDateInput').value.split('-');
            let test2 = event.currentTarget.parentElement.parentElement.querySelector('.endDateInput').value.split('-');
            test.forEach(element => {
                element = parseInt(element)
                
            });
            test2.forEach(element => {
                element = parseInt(element)
                
            });
            // console.log('month--?',this.months[0]);
            event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = this.months[parseInt(test[1])-1]+' '+test[2]+' '+test[0]+' - '+this.months[parseInt(test2[1])-1]+' '+test2[2]+' '+test2[0]
            //   event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = this.dateRange;
            this.resetBtn = true;
            this.offset = 0
            this.searchMoreFilters();
            let thisHtml = this.template.querySelector('.startDateOutside');
            console.log('line 1033')
            const list  = this.template.querySelector('.mainDiv')
            console.log('line 1035')
            
            event.currentTarget.parentElement.parentElement.style.display = 'none';
            list.removeChild(this.template.querySelector('.startDateOutside'));
            

            this.template.querySelector('.mainDiv').prepend(thisHtml); 
            console.log('line 1041')
      
        }
      
    }
    resetDate(event){
        event.currentTarget.parentElement.parentElement.style.display = 'none';
        event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value='';
        this.dateRange='';
        this.offset = 0;
      
        event.currentTarget.parentElement.parentElement.querySelector('.startDateInput').value='';
        event.currentTarget.parentElement.parentElement.querySelector('.endDateInput').value='';
        this.template.querySelector('.moreFilterNewJobsDateTo').value = '';
        this.template.querySelector('.moreFilterNewJobsDateFrom').value = '';
        this.template.querySelector('.startDateOutside').classList.remove('activeFilter')
        this.template.querySelector('.startDateOutside').classList.add('inactiveFilter')
        this.template.querySelector('.dateIcon').classList.remove('iconClass');
        this.searchMoreFilters();


    }



    optionsOverlayClicked() {
     
        let options = this.template.querySelectorAll('.cmbOptions');
        options.forEach(ele => {
           
            ele.style.display = 'none';
            
        });
        this.template.querySelector('.optionsOverlay').style.display = 'none';
    }




    setFilterValue(event) {
        this.optionsOverlayClicked();
        if (event.currentTarget.innerHTML == 'Any') {
            event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';
            event.currentTarget.parentElement.parentElement.style.display = 'none';
          
            this.handleChangeFilter();
        }
        else {
             event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.innerHTML;
            event.currentTarget.parentElement.parentElement.style.display = 'none';
            this.handleChangeFilter();
        }
    }

    
    countryListData;
    departmentListData;
    subjectListData;

    submitOptions(event) {
        
        let SelectedDataStr = '';
        let countData = [];
        event.currentTarget.parentElement.parentElement.querySelectorAll('p').forEach(element => {
            if (element.querySelector('input').checked) {
                if (SelectedDataStr == '') {
                    SelectedDataStr = element.querySelector('span').innerHTML;
                    countData.push(element.querySelector('span').innerHTML)
                }
                else {

                    SelectedDataStr = SelectedDataStr + ',' + element.querySelector('span').innerHTML;;
                    countData.push(element.querySelector('span').innerHTML)
                }
            }
        })

        
       
            

        
        try{
            
            if(countData.length ==1){
                if(event.target.dataset.id =='country'){
                    // 
                    this.countryCountShow = false;
                    this.showCountCountry = `: ${countData[0]}`;
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').classList.remove('inactiveFilter');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').classList.add('activeFilter');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('lightning-icon').classList.add('iconClass');
                    

                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +  this.showCountCountry;

                }
                if(event.target.dataset.id =='subject'){
                    
                    this.subjectCountShow = false;
                    
                    this.showCountSubject = `: ${countData[0]}`;
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').classList.remove('inactiveFilter');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').classList.add('activeFilter');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('lightning-icon').classList.add('iconClass');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder + this.showCountSubject;

                }
                if(event.currentTarget.dataset.id == 'department'){
                    this.countShow = false;
                   
                    this.showCount = `: ${countData[0]}`;
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').classList.remove('inactiveFilter');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').classList.add('activeFilter');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('lightning-icon').classList.add('iconClass');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +  this.showCount;
                    // 
                    // 


                    // this.showCount = '10';
                }
            }
            else if(countData.length>1){
                if(event.target.dataset.id =='country'){

                  
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').classList.remove('inactiveFilter');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').classList.add('activeFilter');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('lightning-icon').classList.add('iconClass');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +`: ( ${countData.length} )`;

                }
                if(event.target.dataset.id =='subject'){
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').classList.remove('inactiveFilter');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').classList.add('activeFilter');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('lightning-icon').classList.add('iconClass');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +`: ( ${countData.length} )`;

                }
                if(event.target.dataset.id == 'department'){
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').classList.remove('inactiveFilter');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').classList.add('activeFilter');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('lightning-icon').classList.add('iconClass');
                   event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +`: ( ${countData.length} )`;

                }
            }
            else{
                if(event.target.dataset.id =='country'){

                    this.countryCountShow = false;
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').classList.add('inactiveFilter');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').classList.remove('activeFilter');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('lightning-icon').classList.remove('iconClass');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';
                }
                if(event.target.dataset.id =='subject'){

                    this.subjectCountShow = false;
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').classList.add('inactiveFilter');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').classList.remove('activeFilter');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('lightning-icon').classList.remove('iconClass');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';
                }
                if(event.target.dataset.id == 'department'){
                    this.countShow = false;
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').classList.add('inactiveFilter');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').classList.remove('activeFilter');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('lightning-icon').classList.remove('iconClass');
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';
                }
            }
        }catch{
            
        }
    event.currentTarget.parentElement.parentElement.style.display = 'none';
        this.offset = 0;
      
        

        switch (event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder) {
            case 'Department':
                this.modalDepartmentList = countData;
               
                console.log(this.modalDepartmentList.length)
                if(this.modalDepartmentList.length>0){
                 
                    let test = this.template.querySelector('.departmentOuter');

                    this.template.querySelector('.mainDiv').prepend(test); 
                    
                }
                this.template.querySelector('.DepartmentModalFilter').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value
                this.setSubjectValues();
                break;
            case 'Subject':
                this.modalSubjectList = countData;
                if(this.modalSubjectList.length>0){
                    
                    let test = this.template.querySelector('.subjectOuter');

                    this.template.querySelector('.mainDiv').prepend(test); 
                   
                }
                this.template.querySelector('.moreFilterSubject').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value

                break;
            case 'Country':
                this.modalCountryList  = countData;
                if(this.modalCountryList.length>0){
                    
                    let test = this.template.querySelector('.countryOutside');

                    this.template.querySelector('.mainDiv').prepend(test); 
                   
                }
                this.template.querySelector('.moreFilterCountry').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value

                break;
            case 'Job Type': 
                this.modalJobTypeList = countData;
                if(countData.length == 1){
                    this.showCount = `: ${countData[0]}`;
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +  this.showCount;
                    
                }else if(countData.length>1){
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +`: ( ${countData.length} )`;
                    
                }else{
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';
                    
                }
                
                this.template.querySelector('.moreFilterJobType').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value

                break;
            case 'Experience':
                this.modalExperienceList  = countData;
                if(countData.length == 1){
                    this.showCount = `: ${countData[0]}`;
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +  this.showCount;
                    
                }else if(countData.length>1){
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +`: ( ${countData.length} )`;
                    
                }else{
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';
                    
                }
                this.template.querySelector('.moreFilterExperience').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value

                break;
            case 'School Name':
                 this.modalSchoolList = countData;
                 if(countData.length == 1){
                    this.showCount = `: ${countData[0]}`;
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +  this.showCount;
                    
                }else if(countData.length>1){
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +`: ( ${countData.length} )`;
                    
                }else{
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';
                    
                }
                this.template.querySelector('.moreFilterSchool').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value

                break;
            case 'Curriculum':
                this.modalCurriculumList = countData;
                
                if(countData.length == 1){
                

                    this.showCount = `: ${countData[0]}`;
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +  this.showCount;
                    
                }else if(countData.length>1){
                

                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +`: ( ${countData.length} )`;
                    
                }else{
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';
                    
                }
                
                this.template.querySelector('.moreFilterCurriculum').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value

                break;
            case 'Date From':
                 break;
            case 'Date To':
                 break;
            case 'Position Date From':
                   break;
            case 'Position Date To':
                 break;
            case 'Start Date':
                break;
            case 'End Date':
                console.log('countData-->',countData);
                break;
            case 'Positions At Upcoming Job Fairs':
                this.modalPositionList = countData;
                if(countData.length == 1){
                    this.showCount = `: ${countData[0]}`;
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +  this.showCount;
                    
                }else if(countData.length>1){
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +`: ( ${countData.length} )`;
                    
                }else{
                    event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';
                    
                }
                this.template.querySelector('.moreFilterpostionJobFair').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value

                break;
            case 'Bookmark':
            
                break;
            default:
                break;
        }

        this.searchMoreFilters();
       
        this.optionsOverlayClicked();
      

    }

    handleChange2(){
        this.bookmarkCheckBoxValue = this.template.querySelector('.modalBookmarkRadio2').value;
        console.log('this.bookmarkCheckBoxValue->',this.bookmarkCheckBoxValue)

        this.template.querySelector('.moreFiltersBookmark').value = this.template.querySelector('.BookmarkModalOutside').placeholder +': '+this.template.querySelector('.modalBookmarkRadio2').value;
        this.template.querySelector('.BookmarkModalOutside').value = this.template.querySelector('.BookmarkModalOutside').placeholder +': '+this.template.querySelector('.modalBookmarkRadio2').value;
        this.searchMoreFilters();
        this.optionsOverlayClicked();

    }
    

    

    countryCountShow = false;
    subjectCountShow = false;
    


    resetOptions(event) {
        event.currentTarget.parentElement.parentElement.querySelectorAll('p').forEach(element => {
            element.querySelector('input').checked = false;
        })
        event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';
          event.currentTarget.parentElement.parentElement.style.display = 'none';
        this.offset = 0;

      
        
        switch (event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder) {
            case 'Department':
                this.showCount = 0
                this.countShow = false;
                this.departmentListData = [];
                this.modalDepartmentList = [];


                this.template.querySelector('.departmanrFilter').classList.add('inactiveFilter')
                this.template.querySelector('.departmanrFilter').classList.remove('activeFilter')
                this.template.querySelector('.departmentIcon').classList.remove('iconClass');
               


                this.template.querySelector('.DepartmentModalFilter').value = '';
                this.template.querySelector('.DepartmentModalFilter').parentElement.parentElement.parentElement.querySelectorAll('p').forEach(element => {
                    element.querySelector('input').checked = false;
                })
                this.setSubjectValues();
                break;
            case 'Subject':
                this.showCountSubject = 0
                this.subjectCountShow = false;
                this.template.querySelector('.subjectval').classList.add('inactiveFilter')
                this.template.querySelector('.subjectval').classList.remove('activeFilter')
                this.template.querySelector('.subjectIcon').classList.remove('iconClass');
                
                
                this.subjectListData  = [];
                this.modalSubjectList = [];
                this.template.querySelector('.moreFilterSubject').value = '';
                
               this.template.querySelector('.moreFilterSubject').parentElement.parentElement.parentElement.querySelectorAll('p').forEach(element => {
                    element.querySelector('input').checked = false;
                })
                break;
            case 'Country':
                this.showCountCountry = 0
                this.countryCountShow = false;
                   
                this.countryListData=[]
                this.template.querySelector('.countryVal').classList.add('inactiveFilter')
                            this.template.querySelector('.countryVal').classList.remove('activeFilter')
                            this.template.querySelector('.countryIcon').classList.remove('iconClass');
                            
                this.modalCountryList = [];
                this.template.querySelector('.moreFilterCountry').value = '';
                this.template.querySelector('.moreFilterCountry').parentElement.parentElement.parentElement.querySelectorAll('p').forEach(element => {
                    element.querySelector('input').checked = false;
                })
                break;
            case 'Job Type':
                this.modalJobTypeList = []
               console.log('Job type resetOptions')
                this.template.querySelector('.moreFilterJobType').value = '';
                this.template.querySelector('.moreFilterJobType').parentElement.parentElement.parentElement.querySelectorAll('p').forEach(element => {
                    element.querySelector('input').checked = false;
                })
                break;
            case 'Experience':
                this.template.querySelector('.moreFilterExperience').value = '';
                console.log('Experience resetOptions')
                 this.template.querySelectorAll('.experienceInnerCheckboxess').forEach(element => {
                    this.modalExperienceList = []
                     element.checked = false;
               
                })
               
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').classList.add('inactiveFilter');
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').classList.remove('activeFilter');

                break;
            case 'School Name':
                this.modalSchoolList = []
              
                this.template.querySelector('.moreFilterSchool').value = '';
                console.log('School Name resetOptions')
                this.template.querySelector('.moreFilterSchool').parentElement.parentElement.parentElement.querySelectorAll('p').forEach(element => {
                    element.querySelector('input').checked = false;
                })
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').classList.add('inactiveFilter');
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').classList.remove('activeFilter');
                break;
            case 'Curriculum':
                this.modalCurriculumList = [];
            
                this.template.querySelector('.moreFilterCurriculum').value = '';
                console.log('Curriculum resetOptions')
                
              
                this.template.querySelector('.moreFilterCurriculum').parentElement.parentElement.parentElement.querySelectorAll('p').forEach(element => {
                    
                    element.querySelector('input').checked = false;
                })
                break;
            case 'Date From':
              
                this.template.querySelector('.moreFilterApplyDateFrom').value = '';
           
                break;
            case 'Date To':
         
                this.template.querySelector('.moreFilterApplyDateTo').value = '';
              
                break;
            case 'Position Date From':
                
                this.template.querySelector('.moreFilterPositionDateFrom').value = '';
             
                break;
            case 'Position Date To':
               
                this.template.querySelector('.moreFilterPositionDateTo').value = '';
            
                break;
            case 'Start Date':
             
                this.template.querySelector('.moreFilterNewJobsDateFrom').value = '';
            
                break;
            case 'End Date':
            
                this.template.querySelector('.moreFilterNewJobsDateTo').value = '';
              
                break;
            case 'Positions At Upcoming Job Fairs':
            
                this.template.querySelector('.moreFilterpostionJobFair').value = '';
                this.template.querySelector('.InterestedCountryModalFilter').querySelectorAll('p').forEach(element => {
                    element.querySelector('input').checked = false;
                })
                break;
            case 'Bookmark':
              
                console.log('into the bookmark case')
                this.template.querySelector('.moreFiltersBookmark').value = '';
             
                this.template.querySelector('.modalBookmarkRadio').value='';
                break;
            default:
                break;
        }

        this.searchMoreFilters();
        this.optionsOverlayClicked();
        
        
        setTimeout(() => {
                
            this.checkSortData();
        }, 100);
    }

    

    closeOtherFilters(event) {

        let options = this.template.querySelectorAll('.options');
        options.forEach(ele => {
            if (ele.parentElement.classList == event.currentTarget.classList) {
                if (ele.style.display == 'none') {
                    ele.style.display = 'block';
                }
                else {
                   
                }
            }
            else {
                
                ele.style.display = 'none';
            }
        })

        if (event.target.nodeName == 'P') {
            if (event.target.innerHTML == 'None') {
                event.target.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';
                event.target.parentElement.parentElement.style.display = 'none';
                // 
                this.offset = 0;
                this.handleChangeFilter();
            }
            else {
                event.target.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.target.innerHTML;
                event.target.parentElement.parentElement.style.display = 'none';
                // 
                this.offset = 0;
                this.handleChangeFilter();
            }
        }
    }

    showMoreFilters() {
      
        this.template.querySelector('.morefiltersModal').style.display = 'block';
        this.template.querySelector('.morefiltersModal').style.top = '10vh';

    
        this.template.querySelector('.morefiltersModalOverlay').style.display = 'block';
        this.MoreFiltersoptionsOverlayClicked();

    }


    hideMoreFilter() {
   
      this.template.querySelector('.morefiltersModal').style.top = '-80vh';
      
        this.template.querySelector('.modalOptionsOverlay').style.opacity = '0';

        setTimeout(() => {
            this.template.querySelector('.morefiltersModal').style.top = '10vh';
            this.template.querySelector('.morefiltersModal').style.display = 'none';
            this.template.querySelector('.morefiltersModalOverlay').style.display = 'none';
            this.template.querySelector('.morefiltersModalOverlay').style.opacity = '0.5';
        }, 600);
        
           }
    changedHeight(event) {
        this.template.querySelector('.jobslist').style.height = (event.detail - 51) + 'px'
    }

    totalList = [];
    totalResultsFetch;



    searchMoreFilters() {
        
        this.template.querySelectorAll('.innerModalInput').forEach(element=>{
            element.value=""
          
        })
        this.template.querySelectorAll('.checkParentDiv').forEach(element => {
            element.style.visibility = 'visible';
            element.style.position = 'relative';
        });
        let JobType = this.template.querySelector('.moreFilterJobType').value;
        // 
        let Experience = this.template.querySelector('.moreFilterExperience').value;
        // let Experience = this.modalExperienceList;
        // if (Experience.length>1){
        //     let totalexp = [];
        //     for(let i=0;i<Experience.length;i++){
        //         // let changeExp = []
        //         if(Experience[i]=='10+'){
        //             totalexp.push('10');
        //         }else{
                    
        //         }
        //         let newData = Experience[i].split('-');
        //         totalexp.push(...newData);
        //         
        //     }

        //     for(let i=0;i<totalexp.length;i++){
        //         
        //     }
        // }else{
        //     if(Experience[0]=='10+'){
        //         Experience = '10-'
        //     }
        // }

        
       

        // 
      
        let School = this.template.querySelector('.moreFilterSchool').value;
       
        let curriculum = this.template.querySelector('.moreFilterCurriculum').value;
        
        let ApplyDateFrom = this.template.querySelector('.moreFilterApplyDateFrom').value;
        
        let ApplyDateTo = this.template.querySelector('.moreFilterApplyDateTo').value;

        

        let PositionDateFrom = this.template.querySelector('.moreFilterPositionDateFrom').value;
     
        let PositionDateTo = this.template.querySelector('.moreFilterPositionDateTo').value;
       
        let NewJobsDateFrom = this.template.querySelector('.moreFilterNewJobsDateFrom').value;
       
        let NewJobsDateTo = this.template.querySelector('.moreFilterNewJobsDateTo').value;

        if(NewJobsDateFrom!='' && NewJobsDateFrom!=undefined && NewJobsDateTo!='' && NewJobsDateTo!=undefined){

            this.dateRange = NewJobsDateFrom +' - '+NewJobsDateTo;
            
        }else if(NewJobsDateFrom!='' && NewJobsDateFrom!=undefined){
            this.dateRange = NewJobsDateFrom+' - '

        }else if(NewJobsDateTo!='' && NewJobsDateTo!=undefined){
            this.dateRange = ''
        }else{
            this.dateRange = ''
        }
       
        let bookmark2 = this.template.querySelector('.moreFiltersBookmark').value;
    
         this.hideMoreFilter();
       
        this.loader = true;
        
        try{

            

            let resetBtn = false;


            let allFieldsValue = [
                { label: 'Department', value: this.template.querySelector('.DepartmentModalFilter').value,optionValues: this.departmentList, classname: 'DepartmentModalOutside'},
                { label: 'Subject', value: this.template.querySelector('.moreFilterSubject').value,optionValues: this.subjectList, classname: 'SubjectModalOutside'},
                { label: 'Country', value: this.template.querySelector('.moreFilterCountry').value, optionValues: this.countryList, classname: 'CountryModelOutside'},
                { label: 'Job Type', value: this.template.querySelector('.moreFilterJobType').value, optionValues: this.jobTypes, classname: 'JobTypeModelOutside'},
                { label: 'Experience', value: this.template.querySelector('.moreFilterExperience').value, optionValues: this.Experiences, classname: 'ExperienceModalOutside'},
                { label: 'School Name', value: this.template.querySelector('.moreFilterSchool').value, optionValues: this.schoolList, classname: 'SchoolNameModelOutside'},
                { label: 'Curriculum', value: this.template.querySelector('.moreFilterCurriculum').value, optionValues: this.CurriculumExperiences, classname: 'CurriculumModelOutside'},
                { label: 'Date From', value: this.template.querySelector('.moreFilterApplyDateFrom').value,  classname: 'DateFromModalOutside dateOutside'},
                { label: 'Date To', value: this.template.querySelector('.moreFilterApplyDateTo').value,  classname: 'DateToModalOutside dateOutside'},
                { label: 'Position Date From', value: this.template.querySelector('.moreFilterPositionDateFrom').value,  classname: 'PositionDateFromModalOutside dateOutside'},
                { label: 'Position Date To', value: this.template.querySelector('.moreFilterPositionDateTo').value, classname: 'PositionDateToModalOutside dateOutside'},
                { label: 'Start Date', value: this.template.querySelector('.moreFilterNewJobsDateFrom').value,  classname: 'StartDateModalOutisde'},
                { label: 'End Date', value: this.template.querySelector('.moreFilterNewJobsDateTo').value,  classname: 'EndDateModalOutside'},
                { label: 'Positions At Upcoming Job Fairs', value: this.template.querySelector('.moreFilterpostionJobFair').value, optionValues: this.countries, classname: 'PositionFairModalOutside'},
                { label: 'Bookmark', value: this.template.querySelector('.moreFiltersBookmark').value, optionValues: this.bookmarkCombobox, classname: 'BookmarkModalOutside'}
                
            ];

            this.modalFiltersForPillsView = [];
            this.modalFiltersForPillsViewDate = [];
            this.modalFiltersForRadio = [];
            

            
            let firstDate;
            let secondDate;
            allFieldsValue.forEach(element => {
                if (element.value == '') {
                    switch (element.label) {
                        case 'Department':
                            this.template.querySelector('.departmanrFilter').value = '';
                            this.template.querySelector('.departmanrFilter').classList.add('inactiveFilter')
                            this.template.querySelector('.departmanrFilter').classList.remove('activeFilter')
                            this.template.querySelector('.departmentIcon').classList.remove('iconClass');
                            break;
                        case 'Subject':
                            this.template.querySelector('.subjectval').value = '';
                            this.template.querySelector('.subjectval').classList.add('inactiveFilter')
                            this.template.querySelector('.subjectval').classList.remove('activeFilter')
                            this.template.querySelector('.subjectIcon').classList.remove('iconClass');
                            break;
                        case 'Country':
                            this.template.querySelector('.countryVal').value = '';
                            this.template.querySelector('.countryVal').classList.add('inactiveFilter')
                            this.template.querySelector('.countryVal').classList.remove('activeFilter')
                            this.template.querySelector('.countryIcon').classList.remove('iconClass');
                            
                            break;

                        case 'Start Date':
                            this.template.querySelector('.startDateInput').value = '';
                            break;


                        

                        case 'End Date':
                            this.template.querySelector('.endDateInput').value = '';
                            break;

                        default:
                            break;
                    }
                }
                else {
                    switch (element.label) {
                        case 'Department':
                            
                        this.template.querySelector('.departmanrFilter').classList.remove('inactiveFilter')
                        this.template.querySelector('.departmanrFilter').classList.add('activeFilter')
                        this.template.querySelector('.departmentIcon').classList.add('iconClass');
                            this.template.querySelector('.departmanrFilter').value = element.value;
                            this.template.querySelector('.mainDiv').prepend(this.template.querySelector('.departmentOuter'));

                            resetBtn = true;
                           
                            break;
                        case 'Subject':
                            this.template.querySelector('.subjectval').classList.remove('inactiveFilter')
                            this.template.querySelector('.subjectval').classList.add('activeFilter')
                            this.template.querySelector('.subjectIcon').classList.add('iconClass');
                            this.template.querySelector('.subjectval').value = element.value;
                            this.template.querySelector('.mainDiv').prepend(this.template.querySelector('.subjectOuter'));

                            resetBtn = true;
                            break;
                        case 'Country':
                            this.template.querySelector('.countryVal').classList.remove('inactiveFilter')
                            this.template.querySelector('.countryVal').classList.add('activeFilter')
                            this.template.querySelector('.countryIcon').classList.add('iconClass');
                            this.template.querySelector('.countryVal').value = element.value;
                            this.template.querySelector('.mainDiv').prepend(this.template.querySelector('.countryOutside'));

                            resetBtn = true;
                            break;
                        case 'Start Date':
                            console.log('into the switch')
                            console.log('ele->',element.value);
                            firstDate = element.value.split('-');
                            firstDate.forEach(element => {
                                element = parseInt(element)
                                console.log(element);
                                
                            });
                            

                            
                            this.template.querySelector('.startDateInput').value = element.value;
                            firstDate =  this.months[parseInt(firstDate[1])-1]+' '+firstDate[2]+' '+firstDate[0]
                            
                            resetBtn = true;
                            break;




                        

                        case 'End Date':
                            secondDate = element.value.split('-');
                            secondDate.forEach(element => {
                                element = parseInt(element)
                                console.log(element);
                                
                            });
                            this.template.querySelector('.endDateInput').value = element.value;
                            secondDate = this.months[parseInt(secondDate[1])-1]+' '+secondDate[2]+' '+secondDate[0]
                            
                            resetBtn = true;
                            break;
                        default:
                            break;
                    }
                    
                    if (element.label != 'Department' && element.label != 'Subject' && element.label != 'Country' && element.label != 'Start Date' && element.label != 'End Date') {
                        
                        if (element.label == 'Date From' || element.label == 'Date To' || element.label == 'Position Date From' || element.label == 'Position Date To') {
                            this.modalFiltersForPillsViewDate.push({ value: element.value, classes: element.classname });
                            resetBtn= true;
                        }
                        else if(element.label == 'Bookmark'){
                            this.modalFiltersForRadio.push({ placeholder: element.label, value: element.value, classes: "slds-input inputBar activeFilter " + element.classname, optionValues: element.optionValues });
                            resetBtn = true;
                        }

                        else{
                            
                            this.modalFiltersForPillsView.push({ placeholder: element.label, value: element.value, classes: "slds-input inputBar activeFilter " + element.classname, optionValues: element.optionValues });
                           
                            resetBtn= true;

                        }

    
                    }
                }
                setTimeout(() => {
         
                    this.togglePills();
                },10);
                this.resetBtn = resetBtn;
                
                
                
                
            })

  
                if(firstDate!=null && firstDate!=undefined && secondDate!=null && secondDate!=undefined){
                    let thisHtml = this.template.querySelector('.startDateOut');
                           
                            const list  = this.template.querySelector('.mainDiv')
                            list.removeChild(this.template.querySelector('.startDateOut'));
                            this.template.querySelector('.mainDiv').prepend(thisHtml); 
                            this.template.querySelector('.startDateOutside').value = firstDate+' - '+secondDate;
                            this.template.querySelector('.startDateOutside').classList.remove('inactiveFilter')
                            this.template.querySelector('.startDateOutside').classList.add('activeFilter')
                            this.template.querySelector('.dateIcon').classList.add('iconClass')
                            
                }else if(firstDate!=undefined && secondDate==undefined){
                    let thisHtml = this.template.querySelector('.startDateOut');
                  
                    const list  = this.template.querySelector('.mainDiv')
                    list.removeChild(this.template.querySelector('.startDateOut'));
                    this.template.querySelector('.mainDiv').prepend(thisHtml); 
                    this.template.querySelector('.startDateOutside').value = firstDate
                    this.template.querySelector('.startDateOutside').classList.remove('inactiveFilter')
                            this.template.querySelector('.startDateOutside').classList.add('activeFilter')
                            this.template.querySelector('.dateIcon').classList.add('iconClass')

                }else if(secondDate!=undefined && firstDate==undefined){
                    let thisHtml = this.template.querySelector('.startDateOut');
                          
                            const list  = this.template.querySelector('.mainDiv')
                            list.removeChild(this.template.querySelector('.startDateOut'));
                            this.template.querySelector('.mainDiv').prepend(thisHtml); 
                    this.template.querySelector('.startDateOutside').value = secondDate
                    this.template.querySelector('.startDateOutside').classList.remove('inactiveFilter')
                            this.template.querySelector('.startDateOutside').classList.add('activeFilter')
                            this.template.querySelector('.dateIcon').classList.add('iconClass')

    
                }
           
            

            getMorefilterResults({bookmark:bookmark2, startDate: this.dateRange, UserId: this.currentLoggingUser, limitSize: this.limitSize, offset: this.offset, department: this.modalDepartmentList, Subject: this.modalSubjectList, Country: this.modalCountryList, JobType: this.modalJobTypeList,  School: this.modalSchoolList, curriculum: this.modalCurriculumList, ApplyDateFrom: ApplyDateFrom, ApplyDateTo: ApplyDateTo, PositionDateFrom: PositionDateFrom, PositionDateTo: PositionDateTo, NewJobsDateFrom: NewJobsDateFrom, NewJobsDateTo: NewJobsDateTo}).then(result => {
                
                this.loader = false;
                
                this.bestMatchJob = result.data;
                this.totalResultsFetch = result.count[0].expr0;
                this.resultCounts = result.count[0].expr0;
    
            
                if (this.bestMatchJob.length < 50) {
                    this.showMoreBtn = false;
                }
                else {
                    this.showMoreBtn = true;
                }
    
                this.bestMatchJob.forEach(element => {
                    element.classes = 'job-bubbleFC slds-card';
                    if (element.Job_Close_Date__c != undefined) {
                        element.JobCloseDateOld = new Date(element.Job_Close_Date__c)
                         element.Job_Close_Date__c = `Apply By: ${this.months[parseInt(element.Job_Close_Date__c.split('T')[0].split('-')[1]) - 1] + ' ' + element.Job_Close_Date__c.split('T')[0].split('-')[2] + ', ' + element.Job_Close_Date__c.split('T')[0].split('-')[0]}`;
                    }
                    if (element.Job_Role_Start_Date__c != undefined) {
                        element.Job_Role_Start_Date__c = this.months[parseInt(element.Job_Role_Start_Date__c.split('T')[0].split('-')[1]) - 1] + ' ' + element.Job_Role_Start_Date__c.split('T')[0].split('-')[2] + ', ' + element.Job_Role_Start_Date__c.split('T')[0].split('-')[0];
                    }
                    if(element.CreatedDate!=undefined){
                        element.CreatedDateOld = new Date(element.CreatedDate)
                        element.CreatedDate = 'Posted: ' + this.months[parseInt(element.CreatedDate.split('T')[0].split('-')[1]) - 1] + ' ' + element.CreatedDate.split('T')[0].split('-')[2] + ', ' + element.CreatedDate.split('T')[0].split('-')[0]; 
                     
                    }
                    if(element.School__r!=undefined){
                        element.SchoolName = element.School__r.Name; 
                    }
                })
    
                if (this.bestMatchJob.length > 0) {
                    this.value = this.bestMatchJob[0];
                    this.template.querySelector('c-high-school-math').checkGetRecord(this.value);
                }
                else {
                    this.value = 'undefined';
                    this.template.querySelector('c-high-school-math').checkGetRecord(this.value);
                }
            }).catch(error => {

                this.loader = false;
            })
            // setTimeout(() => {
                
            //     this.checkSortData();
            // }, 100);
            this.template.querySelector('.bestMatchFilter').value=''

        }catch(err){
       
        }

      
      
     
        
        
    }

    checkSortData(){
        if (this.template.querySelector('.handleBestMatch').value == 'Sort Order: A-Z') {
            console.log('into the handleBestMatch')
            this.sortData('Name', 'asc')
        }

        else if (this.template.querySelector('.handleBestMatch').value == 'Sort Order: Z-A') {
        
            this.sortData('Name', 'dsc')
        }
        else if (this.template.querySelector('.handleBestMatch').value == 'Sort Order: Apply By Date') {
            this.sortData('JobCloseDateOld', 'asc')
        }
        else if (this.template.querySelector('.handleBestMatch').value == 'Sort Order: Starting Date') {
            this.sortData('JobRoleStartDateOld', 'asc')
        }
        else if (this.template.querySelector('.handleBestMatch').value == 'Sort Order: New Jobs') {
            this.sortData('CreatedDateOld', 'dsc')            
        }
    
        else if (this.template.querySelector('.handleBestMatch').value == 'Sort Order: Recently Posted') {
        
                    this.sortData('CreatedDateOld', 'dsc')
        }

        else if (this.template.querySelector('.handleBestMatch').value == 'Sort Order: BEST MATCHES') {
            console.log('Calling best match ');
            this.loader = true;
            this.sortBestMatchRecs();
        }

    }

    

    togglePills(){
        
                if(this.modalFiltersForRadio.length>0){
                    this.template.querySelectorAll('.outerRadioButton').forEach(element=>{
                      
                        this.template.querySelector('.mainDiv').prepend(element);
                     
                    })
                }
        
                if(this.modalFiltersForPillsView.length>0){
                    this.template.querySelectorAll('.searchMorePills').forEach(element=>{
                 
                        this.template.querySelector('.mainDiv').prepend(element);
                      
                    })
                }
        
                if(this.modalFiltersForPillsViewDate.length>0){
                    this.template.querySelectorAll('.dateOutside').forEach(element=>{
                   
                        this.template.querySelector('.mainDiv').prepend(element);
                     
                    })
                }
        
            
    
    }

    filtersReset(){

    this.bookmarkCheckBoxValue = '';
    this.modalDepartmentList =[]
    this.modalSubjectList = []
    this.modalCountryList = []
    this.modalJobTypeList = []
    this.modalExperienceList = []
    this.modalSchoolList = []
    this.modalCurriculumList = []
    this.modalPositionList= []

    this.modalBookmarkList  = []


    this.DepartmentModalOptionValue = '';
    
    this.SubjectModalOptionValue = '';
    this.CountryModalOptionValue = '';
    this.JobTypeModalOptionValue = '';
    this.ExperienceModalOptionValue = '';
    this.SchoolNameModalOptionValue = '';
    this.CurriculumSpokenModalOptionValue = '';
    this.DateFromModalOptionValue = '';
    this.DateToModalOptionValue = '';
    this.PositionDateFromModalOptionValue = '';
    this.PositionDateToModalOptionValue = '';
    this.StartDateModalOptionValue = '';
    this.EndDateModalOptionValue = '';
    this.PositionJobFairModalOptionValue = '';
    this.BookmarkOptionValue = '';

        this.template.querySelector('.DepartmentModalFilter').value = '';
        this.template.querySelector('.moreFilterSubject').value = '';
        this.template.querySelector('.moreFilterCountry').value = '';
        this.template.querySelector('.moreFilterJobType').value = '';
        this.template.querySelector('.moreFilterExperience').value = '';
        this.template.querySelector('.moreFilterSchool').value = '';
        this.template.querySelector('.moreFilterCurriculum').value = '';
        this.template.querySelector('.moreFilterApplyDateFrom').value = '';
        this.template.querySelector('.moreFilterApplyDateTo').value = '';
        this.template.querySelector('.moreFilterPositionDateFrom').value = '';
        this.template.querySelector('.moreFilterPositionDateTo').value = '';
        this.template.querySelector('.moreFilterNewJobsDateFrom').value = '';
        this.template.querySelector('.moreFilterNewJobsDateTo').value = '';
        this.template.querySelector('.moreFilterpostionJobFair').value = '';
        this.template.querySelector('.moreFiltersBookmark').value = '';
        this.template.querySelector('.modalBookmarkRadio').value = '';
        
       

        this.template.querySelector('.departmanrFilter').value = '';
        this.template.querySelector('.departmanrFilter').classList.remove('activeFilter')
        this.template.querySelector('.departmanrFilter').classList.add('inactiveFilter')
        this.template.querySelector('.startDateInput').value = '';
        this.template.querySelector('.startDateOutside').classList.remove('activeFilter')
        this.template.querySelector('.startDateOutside').classList.add('inactiveFilter')
        this.template.querySelector('.endDateInput').value = '';
        this.template.querySelector('.subjectval').value = '';
        this.template.querySelector('.subjectval').classList.remove('activeFilter')
        this.template.querySelector('.subjectval').classList.add('inactiveFilter')
        this.template.querySelector('.countryVal').value = '';
        this.template.querySelector('.countryVal').classList.remove('activeFilter')
        this.template.querySelector('.countryVal').classList.add('inactiveFilter')

        this.template.querySelector('.startDateOutside').value='';
        this.dateRange='';

        this.template.querySelectorAll('.slds-input__icon').forEach(element=>{
            element.classList.remove('iconClass');
        })

        this.template.querySelectorAll('.innerModalInput').forEach(element=>{
            element.value=""
            
        })
        this.template.querySelectorAll('.checkParentDiv').forEach(element => {
            element.style.visibility = 'visible';
            element.style.position = 'relative';
        });
        this.template.querySelector('.bestMatchFilter').value=''

        this.modalFiltersForPillsView = [];
        this.modalFiltersForPillsViewDate = [];
     
  
        this.searchMoreFilters();
       
        setTimeout(() => {
                
            this.checkSortData();
        }, 100);
        

    }




    dateChangedInRecentFilters(event){
        if (event.currentTarget.classList.contains('DateFromModalOutside')) {
            this.template.querySelector('.moreFilterApplyDateFrom').value = event.currentTarget.value;
        }
        if (event.currentTarget.classList.contains('DateToModalOutside')) {
            this.template.querySelector('.moreFilterApplyDateTo').value = event.currentTarget.value;
        }
        if (event.currentTarget.classList.contains('PositionDateFromModalOutside')) {
            this.template.querySelector('.moreFilterPositionDateFrom').value = event.currentTarget.value;
        }
        if (event.currentTarget.classList.contains('PositionDateToModalOutside')) {
            this.template.querySelector('.moreFilterPositionDateTo').value = event.currentTarget.value;
        }
        this.searchMoreFilters();
    }


    modalDepartmentList=[];  
    modalSubjectList;
    modalCountryList;
    modalJobTypeList;
    modalExperienceList;
    modalSchoolList;
    modalCurriculumList;
    modalPositionList;
    modalBookmarkList;

    modalsubmitOptions(event){
    
        let SelectedDataStr = '';
       
                        
        let countData = [];
     
        try{
            event.currentTarget.parentElement.parentElement.querySelector('input').value = ""

            event.currentTarget.parentElement.parentElement.querySelectorAll('.checkParentDiv').forEach(element=>{
                console.log('test')
                element.style.visibility = 'visible';
                element.style.position = 'relative';
            })
            event.currentTarget.parentElement.parentElement.querySelectorAll('p').forEach(element => {
                if (element.querySelector('input').checked) {
                    // 
                    if (SelectedDataStr == '') {
                        SelectedDataStr = element.querySelector('span').innerHTML;
                        
                        countData.push(element.querySelector('span').innerHTML)
                    }
                    else {
              
                        SelectedDataStr = SelectedDataStr + ',' + element.querySelector('span').innerHTML;;
                        countData.push(element.querySelector('span').innerHTML)
                    }
                }
            })
        }catch{
            
        }

        if(countData.length ==1){
            if(event.target.dataset.id =='department'){
                
                let showCountCountry = `: ${countData[0]}`;
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +  showCountCountry;
            }
            if(event.target.dataset.id =='subject'){
                let showCountCountry = `: ${countData[0]}`;
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +  showCountCountry;
             
               
            }
            if(event.target.dataset.id =='country'){
                let showCountCountry = `: ${countData[0]}`;
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +  showCountCountry;
                
            }
            if(event.target.dataset.id =='jobtype'){
                let showCountCountry = `: ${countData[0]}`;
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +  showCountCountry;
                
            }
            if(event.target.dataset.id =='experience'){
                let showCountCountry = `: ${countData[0]}`;
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +  showCountCountry;
                
            }
            if(event.target.dataset.id =='school'){
                let showCountCountry = `: ${countData[0]}`;
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +  showCountCountry;
               
            }
            if(event.target.dataset.id =='curriculum'){
                let showCountCountry = `: ${countData[0]}`;
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +  showCountCountry;
               
            }
            if(event.target.dataset.id =='position'){
                let showCountCountry = `: ${countData[0]}`;
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +  showCountCountry;
              
            }
            
           
        }

        else if(countData.length>1){
            if(event.target.dataset.id =='department'){
                
                let showCountCountry = `: ( ${countData.length} )`;
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +  showCountCountry;
            }
            if(event.target.dataset.id =='subject'){
                let showCountCountry = `: ( ${countData.length} )`;
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +  showCountCountry;
            
               
            }
            if(event.target.dataset.id =='country'){
                let showCountCountry = `: ( ${countData.length} )`;
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +  showCountCountry;
              
            }
            if(event.target.dataset.id =='jobtype'){
                let showCountCountry = `: ( ${countData.length} )`;
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +  showCountCountry;
                
            }
            if(event.target.dataset.id =='experience'){
                let showCountCountry = `: ( ${countData.length} )`;
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +  showCountCountry;
             
            }
            if(event.target.dataset.id =='school'){
                let showCountCountry = `: ( ${countData.length} )`;
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +  showCountCountry;
         
            }
            if(event.target.dataset.id =='curriculum'){
                let showCountCountry = `: ( ${countData.length} )`;
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +  showCountCountry;
            
            }
            if(event.target.dataset.id =='position'){
                let showCountCountry = `: ( ${countData.length} )`;
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +  showCountCountry;
                
            }
            
            if(event.target.dataset.id =='bookmark'){
                let showCountCountry = `: ( ${countData.length} )`;
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder +  showCountCountry;

            }
        }
        else{
            if(event.target.dataset.id =='department'){
             
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';

                }
            if(event.target.dataset.id =='subject'){
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';
                    
            }
            if(event.target.dataset.id =='country'){
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';

            }
            if(event.target.dataset.id =='jobtype'){
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';
               
            }
            if(event.target.dataset.id =='experience'){
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';
                
            }
            if(event.target.dataset.id =='school'){
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';
                
            }
            if(event.target.dataset.id =='curriculum'){
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';
                
            }
            if(event.target.dataset.id =='position'){
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';
                
            }
            
            if(event.target.dataset.id =='bookmark'){
                event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';
                
            }
        }
        
        if(event.target.dataset.id =='department'){
            
            this.modalDepartmentList = countData;
            console.log('this.modalDepartmentList-->',JSON.stringify(this.modalDepartmentList))
            this.template.querySelector('.departmanrFilter').parentElement.parentElement.parentElement.querySelectorAll('p').forEach(element => {
            
            })
            this.setSubjectValues();
        }
        if(event.target.dataset.id =='subject'){

            this.modalSubjectList = countData
            
           
        }
        if(event.target.dataset.id =='country'){

            this.modalCountryList = countData;
        }
        if(event.target.dataset.id =='jobtype'){

            this.modalJobTypeList = countData;
        }
        if(event.target.dataset.id =='experience'){

            this.modalExperienceList = countData;
        }
        if(event.target.dataset.id =='school'){

            this.modalSchoolList = countData;
        }
        if(event.target.dataset.id =='curriculum'){

            this.modalCurriculumList = countData;
        }
        if(event.target.dataset.id =='position'){

            this.modalPositionList = countData;
        }
        
        if(event.target.dataset.id =='bookmark'){

            this.modalBookmarkList = countData;
        }

      
        event.currentTarget.parentElement.parentElement.style.display = 'none';

        this.MoreFiltersoptionsOverlayClicked();
    }


    renderedCallback(){
        console.log('this.template.querySelector-->',this.template.querySelector('.left').style.height);
    }

   
    
    setSubjectValues() {
        this.subjectList = [];
        if (this.modalDepartmentList.length>0) {
           this.modalDepartmentList.forEach(ele => {
                    this.departmentSubjects[ele].forEach(element => {
                        this.subjectList.push({ label: element, value: element })
                    })
                });
            }
            
        
        else {
            this.subjectList = this.subjectOptionValue;
        }
    }

    modalresetOptions(event){
      
        event.currentTarget.parentElement.parentElement.querySelectorAll('p').forEach(element => {
            element.querySelector('input').checked = false;
        

        })
        console.log('event.currentTarget.parentElement.parentElement->',event.currentTarget.parentElement.parentElement)
        event.currentTarget.parentElement.parentElement.querySelector('input').value = ""

        event.currentTarget.parentElement.parentElement.querySelectorAll('.checkParentDiv').forEach(element=>{
            console.log('test')
            element.style.visibility = 'visible';
            element.style.position = 'relative';
        })

        if(event.target.dataset.id =='department'){

            this.modalDepartmentList = [];
            this.setSubjectValues();
        }
        if(event.target.dataset.id =='subject'){

            this.modalSubjectList = []
           
        }
        if(event.target.dataset.id =='country'){

            this.modalCountryList = [];
        }
        if(event.target.dataset.id =='jobtype'){

            this.modalJobTypeList = [];
        }
        if(event.target.dataset.id =='experience'){

            this.modalExperienceList = [];
        }
        if(event.target.dataset.id =='school'){

            this.modalSchoolList = [];
        }
        if(event.target.dataset.id =='curriculum'){

            this.modalCurriculumList = [];
        }
        if(event.target.dataset.id =='position'){

            this.modalPositionList = [];
        }
      
        if(event.target.dataset.id =='bookmark'){

            this.modalBookmarkList = [];
        }
        event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = '';
        event.currentTarget.parentElement.parentElement.style.display = 'none';

        this.MoreFiltersoptionsOverlayClicked();

    }
}