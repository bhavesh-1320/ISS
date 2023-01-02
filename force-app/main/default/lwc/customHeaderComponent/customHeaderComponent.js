import { LightningElement, track, wire } from 'lwc';
import logo from '@salesforce/resourceUrl/SchoolLogo';
import hamburger from '@salesforce/resourceUrl/hamburgerIcon';
import headerIcon from '@salesforce/resourceUrl/headerIcons';
import refreshIcon from '@salesforce/resourceUrl/refreshIcon';
import newHeaderLogo from '@salesforce/resourceUrl/newHeaderLogo';
import upgrade from '@salesforce/resourceUrl/upgrade';
import Id from '@salesforce/user/Id';
import profile from '@salesforce/apex/getProfileController.getProfilepList';
import getUnreadMessageCount from '@salesforce/apex/getProfileController.getUnreadMessageCount';
import assignPermissionSet from '@salesforce/apex/getProfileController.assignPermissionSet';
import getProfileName from '@salesforce/apex/getProfileController.getProfileName';
import checkCandidateRoleStatus from '@salesforce/apex/getProfileController.checkCandidateRoleStatus';
import accountType from '@salesforce/apex/getProfileController.accountType';
import basepath from '@salesforce/community/basePath';
import { CurrentPageReference } from 'lightning/navigation';
import fetchSchoolsForRecruiters from '@salesforce/apex/getProfileController.fetchSchoolsForRecruiters';
import changeRecentSchool from '@salesforce/apex/getProfileController.changeRecentSchool';

export default class customHeaderComponent extends LightningElement {



    showOne = false;
    communityPath = basepath;
    singleSchoolName;
    jobPath = this.communityPath + '/recruiter-jobs';
    jobSearch = this.communityPath + '/job-search'
    schoolPath1 = this.communityPath + '/candidateschoolsearch';
    ifairPage1 = this.communityPath + '/ifair-page';
    candidatelmsPage1 = this.communityPath + '/candidatelms';
    paymentPage = this.communityPath + '/payment';
    addjob = this.communityPath+'/recruiter-job';
    cMessagePage;
    profilePage = this.communityPath + '/profile';
    candidateDashboard = this.communityPath + '/candidate-dashboard';
    edulearnDashboard = this.communityPath + '/edulearn-dashboard';
    candidateSearch = this.communityPath + '/candidate-search';
    recruiterifair = this.communityPath + '/recruiterifair';
    logout = window.location.origin + '/secur/logout.jsp';
    userDashboard;
    showCount = true;
    unreadMessageCount = '';
    upgradeUser = true;
    hamburgerIcon = hamburger;
    refreshIcon = refreshIcon;
    whiteSchoolLogo = newHeaderLogo;
    recruiterProfile = true;
    teacherProfile = false;
    teacherProfileMobile = false;
    validitySubscription;
    recruiterProfileMobile = false;
    showSwitchTab = true;
    upgrade = upgrade;
    mapData = [];
    profileName;
    nameOfUser;
    userName;
    dataId = '';
    userId = Id;
    appLauncher = false;
    schoolLogo = logo;
    profilePhoto = headerIcon + '/ISSnew/Ellipse3.png';
    //profilePhoto = headerIcon + '/ISSnew/Group60.png';
    chat = headerIcon + '/ISSnew/icchat.jpg';
    notification = headerIcon + '/ISSnew/icnotification.png';
    arrowIcon = headerIcon + '/ISSnew/rectangle22.png';
    issEduRecruit = headerIcon + '/ISSnew/edurecruit.png';
    issEduLearn = headerIcon + '/ISSnew/subnav_edulearn.png';
    // issEduRecruit = headerIcon + '/ISSnew/edurecruit.png';
    issSupplyMarketPlace = headerIcon + '/ISSnew/supplyMarketplace.png';
    rectangle = headerIcon + '/ISSnew/Rectangle25.jpg';
    @track schoolList;

    renderedCallback() {
        // 
        // 
        // 
        // 
        if (window.location.href == window.location.origin + basepath + '/edulearn-dashboard') {
            
            this.template.querySelector('.headerProfile').src = this.issEduLearn;

        }
    }

    backgroundDivClick(){
        this.appLauncher = false;
        this.profileOptionsVisibility = false;
        this.template.querySelector('.backgroundDiv').style.zIndex = '-1';
        this.template.querySelector('.schoolOption').style.display = 'none';
    }

    changeSchool(event) {
        this.template.querySelector('.backgroundDiv').style.zIndex = '-1'
        this.dataId = event.target.dataset.id
        this.userDashboard = this.communityPath + '?id=' + event.target.dataset.id;
        //  window.location.replace(this.userDashboard);
        window.history.pushState({ "html": event.target.dataset.name, "pageTitle": 'recruiter-dashboard' }, "", this.userDashboard)
        
        this.template.querySelector('.currentSchoolName').innerHTML = event.target.dataset.name;
        this.template.querySelector('.schoolOption').style.display = 'none';

        // 
        // let totalId = []
        // for(let i = 0; i<this.schoolList.length; i++){
        //     totalId.push(this.schoolList[i].Id)
        // }
        // 
        
        
        
        changeRecentSchool({currentUserId:this.userId, selectedSchool: event.target.dataset.id}).then(res=>{
            
        }).catch(err=>{
            
        })

        




    }
    jobspath() {
        

        //this.jobPath = this.jobPath + '?id=' + this.dataId;
        
        
        //window.location.href = this.jobPath;
    }

    @wire(accountType, { currentUserId: '$userId' })
    getAccountType({ error, data }) {
        if (data) {
            
            if (data[0].SubscriptionType__c == 'Premium') {
                this.upgradeUser = false;
                this.validitySubscription = data[0].Subscription_End_Date__c;
            }
            else {
                this.upgradeUser = true;
            }
        }
        if (error) {

        }
    }
    @wire(getProfileName, { currentUserId: '$userId' })
    getProfileName({ error, data }) {
        if (data) {
            
            
            this.profileName = data;
            if (this.profileName == 'Candidate') {
                this.userDashboard = this.communityPath + '/candidate-dashboard';
                this.cMessagePage = this.communityPath + '/candidate-messaging';
                if (window.innerWidth < 1024) {
                    this.teacherProfileMobile = true;
                    this.teacherProfile = false;
                    this.recruiterProfile = false
                    this.recruiterProfileMobile = false;
                } else {

                    this.teacherProfileMobile = false;
                    this.teacherProfile = true;
                    this.recruiterProfile = false
                    this.recruiterProfileMobile = false;
                }
            }
            else {
                if (this.profileName == 'Recruiter') {

                    this.userDashboard = this.communityPath + '/recruiter-dashboard';
                    this.cMessagePage = this.communityPath + '/recruiter-messaging';

                    
                    fetchSchoolsForRecruiters({ currentUserId: this.userId }).then(result => {
                        
                        this.schoolList = result;
                        // 
                        for(let i=0;i<this.schoolList.length; i++){
                            if(this.schoolList[i].Recently_Viewed_School__c == true){
                                this.template.querySelector('.currentSchoolName').innerHTML = this.schoolList[i].Name
                            }
                        }
                        if(this.schoolList.length==1){
                            this.showOne = true
                            // this.singleSchoolName = this.schoolList[0].Name
                            // 
                            

                        }else{
                            this.showOne = false;
                        }
                        
                    }).catch(error => {
                        
                    })
                    if (window.innerWidth < 1024) {
                        this.teacherProfileMobile = false;
                        this.teacherProfile = false;
                        this.recruiterProfile = false
                        this.recruiterProfileMobile = true;
                    } else {

                        this.teacherProfileMobile = false;
                        this.teacherProfile = false;
                        this.recruiterProfile = true
                        this.recruiterProfileMobile = false;
                    }
                }
            }

            checkCandidateRoleStatus({ currentUserId: this.userId }).then(result => {
                
                if (result == 'true') {
                    this.showSwitchTab = true;
                }
                else {
                    this.showSwitchTab = false;
                }
            }).catch(error => {
                
            });
        }
        else if (error) {
            
        }
    }


    @wire(profile, { recordId: '$userId' })
    userProfile({ error, data }) {
        
        if (data) {
            
            //this.nameOfUser = data.Name
      
                let fname;
                let firstName;
                let lname;
                let lastName;
                
                

                try{

                    fname = data.FirstName[0];
                    firstName = data.FirstName;
                }catch{
                    fname = ''
                    firstName = ''
                    this.template.querySelector('.profileTextDiv').style.width = '32px';
                }

                try{
                    lname = data.LastName[0];
                    lastName = data.LastName;
                }catch{
                    lname = ''
                    lastName = ''
                    this.template.querySelector('.profileTextDiv').style.width = '32px';

                }

                this.nameOfUser = firstName + ' ' + lastName;
                this.userName = fname + lname;

                
                
            

            
            // for (let key in data) {
            //     this.userName = key;
            //     this.userName = this.userName.split(' ')

            //     
            //     this.nameOfUser = this.userName[0] + ' ' + this.userName[1];
            //     let fname = this.userName[0][0]
            //     let lname = this.userName[1][0]
            //     this.userName = fname + lname;

                // this.profileName = data[key];
                // //this.mapData.push({value:data[key], key:key});
                // 
                // 
                // this.profileName = "Teacher";
                // if (this.profileName == 'Teacher') {
                //     this.currentProfile = 'Candidate';
                //     if (window.innerWidth < 1024) {
                //         this.teacherProfileMobile = true;
                //         this.teacherProfile = false;
                //     } else {
                //         this.teacherProfileMobile = false
                //         // this.teacherProfile = true;
                //     }
                // }
                // else if (this.profileName == 'Recruiter') {
                //     this.currentProfile = 'Recruiter';
                //     if (window.innerWidth < 1024) {
                //         this.recruiterProfile = false
                //         this.recruiterProfileMobile = true;
                //     } else {
                //         this.recruiterProfileMobile = false;
                //         // this.recruiterProfile = true;
                //     }
                // }

            
        } else if (error) {
            
        }
    }

    @wire(getUnreadMessageCount, {})
    unreadMessageCount({ error, data }) {
        if (data) {
            this.unreadMessageCount = data;
            if (data == '0') {
                this.showCount = false;
            }
        } else if (error) {
            
        }
    };

    openOneApp() {
        
        this.template.querySelector('.backgroundDiv').style.height = '100%'
        this.template.querySelector('.backgroundDiv').style.zIndex = '10'
        this.template.querySelector('.backgroundDiv').style.width = `${window.innerWidth}px`;
        this.profileOptionsVisibility = false;
        if (this.appLauncher) {
            this.appLauncher = false;
        } else {
            this.appLauncher = true;
        }
        
    }




    toggleHamburger() {
        if (document.body.classList.contains('comm-page-home')) {

        }
        //    document.body.getElementsByClassName('comm-page-home').style.overflow='hidden';
        if (this.template.querySelector('.hamburgerOpen').style.width == '0px') {
            
            document.body.style.overflow = 'hidden';
            // 
            //    document.getElementsByClassName('comm-page-home').style.overflow='hidden';


            //    this.template.querySelector('.comm-page-home').style.overflow='hidden'
            this.template.querySelector('.hamburgerOpen').style.width = '80%'
            this.template.querySelector('.mobileSideNav').style.opacity = '1'
            this.template.querySelector('.mobileSideNav').style.zIndex = '2'
            //    this.template.querySelector('.mobileSideNav').style.display='block'

            this.template.querySelector('.iconHam').style.color = 'white'
            //    this.template.querySelector('.iconHam').style.color='white'
            this.template.querySelector('.logoISS').src = this.whiteSchoolLogo;

            //    this.template.querySelector('.hamburgerOpen').style.left='-250px';

        } else {
            document.body.style.overflow = 'scroll';

            this.template.querySelector('.iconHam').style.color = '#549BA5'
            // document.getElementsByClassName('comm-page-home').style.overflow='auto';

            this.template.querySelector('.logoISS').src = this.schoolLogo;

            this.template.querySelector('.hamburgerOpen').style.width = '0'
            this.template.querySelector('.mobileSideNav').style.opacity = '0'
            this.template.querySelector('.mobileSideNav').style.zIndex = '-1'
            //    this.template.querySelector('.mobileSideNav').style.display='none'

        }
    }

    activeOverflow() {
        document.body.style.overflow = 'scroll';
    }

    issEduLearnClick() {
        this.template.querySelector('.headerProfile').src = this.issEduLearn
        this.template.querySelector('.headerProfile').style.height = '32px'
        this.template.querySelector('.comboboxProfile').style.right = '115px'
        this.appLauncher = false;
        // window.location.pathname = 'recruitment/s/edulearn-dashboard';
    }

    issEduRecruitClick() {
        this.template.querySelector('.headerProfile').src = this.issEduRecruit
        this.template.querySelector('.headerProfile').style.height = '32px'
        this.template.querySelector('.comboboxProfile').style.right = '120px'
        this.appLauncher = false;



    }

    issSupplyMarketPlaceClick() {
        this.template.querySelector('.headerProfile').src = this.issSupplyMarketPlace;
        this.template.querySelector('.headerProfile').style.height = '32px'
        this.template.querySelector('.comboboxProfile').style.right = '94px';

        this.appLauncher = false;


    }

    hamburgerEmptyArea() {
        document.body.style.overflow = 'scroll';

        this.template.querySelector('.hamburgerOpen').style.width = '0'
        this.template.querySelector('.mobileSideNav').style.opacity = '0'
        this.template.querySelector('.iconHam').style.color = '#549BA5'
        this.template.querySelector('.logoISS').src = this.schoolLogo;

        this.template.querySelector('.mobileSideNav').style.zIndex = '-1'
        //    this.template.querySelector('.mobileSideNav').style.display='none'

    }

    profileOptionsVisibility = false;

    profileOptions() {
        this.template.querySelector('.backgroundDiv').style.height = '100%'
        this.template.querySelector('.backgroundDiv').style.zIndex = '10'
        this.template.querySelector('.backgroundDiv').style.width = `${window.innerWidth}px`;
        this.appLauncher = false;
        if (this.profileOptionsVisibility == true) {
            this.profileOptionsVisibility = false;
        }
        else {
            this.profileOptionsVisibility = true;
        }
    }

    changeProfile() {
        if (this.profileName == 'Recruiter') {
            
            assignPermissionSet({ permissonSetName: 'recruiter', currentUserId: this.userId }).then(result => {
                
                if (result == 'true') {
                    
                    // window.location.href = this.communityPath;
                    window.location.pathname = 's/';
                }
            }).catch(error => {
                
            });
        }
        else {
            if (this.profileName == 'Candidate') {
                
                assignPermissionSet({ permissonSetName: 'candidate', currentUserId: this.userId }).then(result => {
                    
                    if (result == 'true') {
                        
                        // window.location.href = this.communityPath;
                        
                        window.location.pathname = 's/recruiter-dashboard';
                    }
                }).catch(error => {
                    
                });
            }
        }
    }

    showSchoolOption(event) {
        

        // if (event.currentTarget.parentElement.querySelector('.schoolOption').style.display == 'none') {
        //     event.currentTarget.parentElement.querySelector('.schoolOption').style.display = 'block';
        //     
        // }
        // else {
        //     event.currentTarget.parentElement.querySelector('.schoolOption').style.display = 'none';
        //     

        // }
        if (this.template.querySelector('.schoolOption').style.display == 'block') {
            this.template.querySelector('.schoolOption').style.display = 'none';
            
        }
        else {
            this.template.querySelector('.schoolOption').style.display = 'block';
            

        }
        this.template.querySelector('.backgroundDiv').style.height = '100%'
        this.template.querySelector('.backgroundDiv').style.zIndex = '10'
        this.template.querySelector('.backgroundDiv').style.width = `${window.innerWidth}px`;
    }

    showSchoolOptionMobile(event) {
        
        if (event.currentTarget.parentElement.querySelector('.schoolOptionMobile').style.height == 'auto') {
            event.currentTarget.parentElement.querySelector('.schoolOptionMobile').style.height = '0px';
        }
        else {
            event.currentTarget.parentElement.querySelector('.schoolOptionMobile').style.height = 'auto';
        }
    }

}