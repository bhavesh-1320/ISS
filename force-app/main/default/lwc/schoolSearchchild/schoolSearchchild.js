import { LightningElement, api , track } from 'lwc';
import getImage from '@salesforce/resourceUrl/candidateSearchIconData';
import searchHeading from '@salesforce/resourceUrl/candidateSearchIcon';
import basepath from '@salesforce/community/basePath';
import { NavigationMixin } from 'lightning/navigation';
import addJobToBookmark from '@salesforce/apex/candidateSchoolSearch.addJobToBookmark';
import removeJobFromBookmark from '@salesforce/apex/candidateSchoolSearch.removeJobFromBookmark';
import getDataForChild from '@salesforce/apex/candidateSchoolSearch.getDataForChild';

export default class SchoolSearchchild extends NavigationMixin (LightningElement) {
    teacherdata = ['one' , 'two ' , 'three' , 'four'];
    @api getValue ;
    @api accountUserId; 
    @track bookmarked = false;
    @track schoolDetails=[];
    @track contactInformation = [];
    @track salaryInformation=[];
    @track visaInformation=[];
    @track benefits = [];
    @track educationalInformation = [];
    @track teacherInformation = [];
    @track studentInformation = [];
    @track studentEnrollment = [];
    @track tuition = [];
    //@api getJobValue = [];
    foundedYear = false;
    schoolType = false;
    calendarLink = false;
    accreditation = false;
    governance = false;
    accreditatedBy = false;
    organizationValue = false;
    regionalOrganizational = false;
    ownershipType = false;
    religiousAffliation = false;
    studentBody = false;

    @api jobList;
    @api sizeList; 
    @track getMoreJobs = [];
    checkFunc = false; 
    showMoreData = false;
    rectangleImage = searchHeading + '/ISSV2/Rectangle.png';
	hatImage = searchHeading + '/ISSV2/graduate.png';
	locationImage = searchHeading + '/ISSV2/location.png';
    messageChannel = basepath + '/candidate-messaging';
    teacherImage = getImage + '/candidateSearchIconData/job4.png';
    bookmark = getImage + '/candidateSearchIconData/job6.png';
    copyOfJobValue = [];
    getjobsmorethanlimit = [];
    months = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    
    connectedCallback() {
       // // console.log('OUTPUT in connected call : ',this.accountUserId);
       this.callJobMethod(this.accountUserId);

     
    }
    
    callJobMethod(accountid){
       // // console.log('OUTPUT : in test mehod',accountid);
        getDataForChild({userId : this.accountUserId})
        .then(res=>{
            try{
                // console.log('OUTPUT : ',res );
                res.forEach(element => {
                        //var mydate = new Date(element.Job_Role_Start_Date__c);
                        // // console.log(element.Job_Role_Start_Date__c);
                        element.Job_Role_Start_Date__c = this.months[parseInt(element.Job_Role_Start_Date__c.split('T')[0].split('-')[1]) - 1] + ' ' + element.Job_Role_Start_Date__c.split('T')[0].split('-')[2] + ', ' + element.Job_Role_Start_Date__c.split('T')[0].split('-')[0];
                        // // console.log(element.Job_Role_Start_Date__c);
                        element.CreatedDate = 'Posted: ' + this.months[parseInt(element.CreatedDate.split('T')[0].split('-')[1]) - 1] + ' ' + element.CreatedDate.split('T')[0].split('-')[2] + ', ' + element.CreatedDate.split('T')[0].split('-')[0];


                    });
                this.getMoreJobs = res;

            }
            catch(err){
                // console.log('OUTPUT :catch ',JSON.stringify(err.message));
            }
          
        })
        .catch(err =>{
            // console.log('OUTPUT :error  ',JSON.stringify(err ));
        })
    }

    @api processParentData( getJobValue , bookmarkValue){
        
        // // // console.log('child called from parent ' , bookmark, getJobValue, getJobValue.length);
        try{
            // // console.log('OUTPUT : bookmark value ==> ',getJobValue);
            //changes for bookmark fucntionality  start 
                if(bookmarkValue == '' || bookmarkValue == null){
                    // // console.log('OUTPUT : data coming is in if 54');
                    this.bookmarked = false;
                }
                else{

                    bookmarkValue.forEach(element=>{
                        // // console.log('OUTPUT activity tracker: ',element.Name);
                        if(bookmarkValue.Name != undefined || bookmarkValue.Name != ''){
                            this.bookmarked =true;
                        }
                        
                    })
                }
            //change end for bookmark functionality 
            // // console.log('OUTPUT sizelist: ',this.sizeList);
                // if(this.sizeList == true){
                //     this.showMoreData = false;
                //     this.getMoreJobs = []
                //     getJobValue = [];
                // }  
              

                    let copyofgetmorejobs =  [];
                    // this.sizeList = false;
                   //  // console.log('OUTPUT in else:119 child ',JSON.stringify(getJobValue));
                    let templist  = getJobValue ; 
                   // // console.log('OUTPUT : 121',JSON.stringify(templist));
                    this.getMoreJobs = templist ; 
                   // // console.log('OUTPUT : get more jobs ', JSON.stringify(this.getMoreJobs));
                    this.showMoreData = false;
                    // // console.log('final OUTPUT :>  ',this.getMoreJobs);     
        }
        catch(err){
             // console.log('OUTPUT : ',JSON.stringify(err.message));
        }
    }
    goBack(event){
       //SSS // // console.log('this job s' ,this.getJobValue);
        const custEvent = new CustomEvent(
            'callpasstoparent', {
                detail: 'goBack'
            });
        this.dispatchEvent(custEvent);
    }
    val = true;
    showMoreJobs(){
        
        if(this.val == true){
            this.getMoreJobs = this.getjobsmorethanlimit
            this.template.querySelector('.moreData').innerHTML = 'Show less';
            // // console.log('OUTPUT : in if show more ',this.getJobValue);
            this.val = false;
            
        }
        else if (this.val == false){
            // // console.log('OUTPUT : in if show less ',this.getJobValue);
            
            this.template.querySelector('.moreData').innerHTML = 'Show More';
            this.getMoreJobs = this.copyOfJobValue;
            this.val = true;

        }
         // // console.log('OUTPUT : in the showmorehobs ' , this.template.querySelector('.moreData').innerHTML);
        
        
    }
    addBookmark(event) {
    // // console.log(this.currentLoggingUser + '-' + event.currentTarget.dataset.id);
    addJobToBookmark({ jobId: event.currentTarget.dataset.id }).then(result => {
      // // console.log(result);
      this.bookmarked = true;
    }).catch(error => {
      // // console.log(error);
    })
  }

  removeBookmark(event) {
        removeJobFromBookmark({ userId: this.currentLoggingUser, jobId: event.currentTarget.dataset.id }).then(result => {
            // // console.log(result);
            this.bookmarked = false;
        })
        .catch(error => {
            // // console.log(error);
        })
  }
   CollapseDropDown(event) {
       // // console.log('get school data',this.getValue);
       let basicInformation = [
            {label:'Year Founded', value: this.getValue.foundedYear__c},
            {label:'School Type', value: this.getValue.School_Type__c},
            {label:'School Calendar Link', value: this.getValue.calenderLink__c},
            {label:'Accreditation', value: this.getValue.accreditation__c},
            {label:'Governance', value: this.getValue.governance__c},
            {label:'Accredited By', value: this.getValue.accreditationBy__c},
            {label:'Organization', value: this.getValue.organization__c},
            {label:'Regional Organizational Membership', value: this.getValue.Regional_Organizational_Membership__c},
            {label:'School Ownership Type', value: this.getValue.ownerShip__c},
            {label:'Religious Affiliation', value: this.getValue.religion__c},
            {label:'Student Body', value: this.getValue.studentBody__c}
        ]
        let contactInformation = [
            {label:'School URL', value: this.getValue.siteUrl__c},
            {label:'General Contact Email Address', value: this.getValue.generalEmail__c},
            {label:'Job Related Email Address', value: this.getValue.jobEmail__c},
            {label:'Primary Phone Number', value: this.getValue.phone__c},
            {label:'Primary Fax Number ', value: this.getValue.fax__c},
            {label:'Address Line ', value: this.getValue.BillingStreet},
            {label:'Country', value: this.getValue.BillingCountry},
            {label:'City', value: this.getValue.BillingCity},
            {label:'State / Province', value: this.getValue.BillingState},
            {label:'ZIP / Post Code', value: this.getValue.BillingPostalCode},

        ]
        let salaryInformation = [
            {label:'Salary Range (Teachers)', value: 'USD '+this.getValue.teacherSalaryLowerLimit__c +'-'+ this.getValue.teacherSalaryUpperLimit__c},
             {label:'Contract Duration', value: this.getValue.contractStartMonth__c +'-'+ this.getValue.contractEndMonth__c},
            {label:'Salary Range (Administrators)', value: 'USD '+this.getValue.adminSalaryLowerLimit__c +'-'+this.getValue.adminSalaryUpperLimit__c},
            {label:'Initial Contract Length (Teachers)', value: this.getValue.initialContractLengthTeacher__c},
           {label:'Salary Paid In', value: this.getValue.salaryPaidIn__c},
                 {label:'Initial Contract Length (Administrators)', value: this.getValue.initialContractLengthAdmin__c},
                 {label:'% Salary Paid in USD', value: this.getValue.percentPaidInUsd__c},
                 {label:'School Hiring Preference', value: this.getValue.schoolHiringPreference__c},
                 {label:'Local Taxes On Salary', value: this.getValue.localTaxes__c},
                 {label:'Certification Needed', value: this.getValue.certificationNeeded__c},
                 {label:'Savings Potential Per Year (Single)', value: this.getValue.savingsPotentialSingle__c},
                  {label:'Teaching Days', value: this.getValue.teachingDays__c},
                   {label:'Savings Potential Per Year (Team)', value: this.getValue.savingsPotentialTeam__c},
            {label:'Intern', value: this.getValue.interns__c}

        ]
        let visa=[
              {label:'Visa Restrictions', value: this.getValue.hasVisaRestrictions__c},
               {label:'Certifications', value: this.getValue.certifications__c},
                {label:'Age (maximum)', value: this.getValue.maximumAge__c +' Years'},
                {label:'Min. Years of Experience', value: this.getValue.minimumYearsOfExperience__c},
                {label:'School Provdies Visa Assistance', value: this.getValue.schoolProvidesVisaAssistance__c},
                 {label:'Min. Qualifications', value: this.getValue.minimumQualifications__c},
        ]
        let benefits = [
               {label:'Saving Potential', value: this.getValue.hasSavingsPotential__c},
                  {label:'Retirement Plan', value: this.getValue.hasRetirementPlan__c},
                     {label:'Taxes', value: this.getValue.hasTaxes__c},
                        {label:'Tuition for Dependents', value: this.getValue.hasTuitionForDependents__c},
                           {label:'Flight Transportation', value: this.getValue.hasTransportation__c},
                           {label:'Moving Allowance', value: this.getValue.hasMovingAllowance__c},
                             {label:'Settling in Allowance', value: this.getValue.hasSettlingInAllowance__c},
                               {label:'Accommodation', value: this.getValue.hasAccommodation__c},
                                 {label:'Accommodation Shared for Singles', value: this.getValue.isAccommodationShared__c},
                                   {label:'Utilities', value: this.getValue.hasUtilities__c},
                                     {label:'Reoccurring Flight/ transportation', value: this.getValue.hasRecurringTransportation__c},
                                       {label:'Medical Insurance', value: this.getValue.hasMedicalInsurance__c},
                                         {label:'Dental Insurance', value: this.getValue.hasDentalInsurance__c},
                             {label:'Disability Insurance', value: this.getValue.hasDisabilityInsurance__c},
                         {label:'Opportunities for Dependents', value: this.getValue.hasOpportunitiesForDependents__c}


        ]
        let educational = [
             {label:'Universities/Collages Attended By Recent Graduates', value: this.getValue.universitiesAttended__c},
              {label:'Average Class Size', value: this.getValue.averageClassSize__c},
                {label:'Percentage of graduates who take admission to college', value: this.getValue.collegeGraduatesPercent__c},
                  {label:'Curriculum Type', value: this.getValue.curriculumType__c}, 
                  {label:'Languages of Instruction', value: this.getValue.languagesOfInstruction__c},
                  {label:'Examination and Tests', value: this.getValue.examinations__c},
                  {label:'Extra Curricular Programs', value: this.getValue.extraCurricularActivities__c},
                  {label:'Sports', value: this.getValue.sports__c},
                  {label:'Clubs', value: this.getValue.clubs__c},
                  {label:'School Support Services', value: this.getValue.schoolSupportServices__c},
            ]

                let studentInformation = [
              {label:'Start Grade', value: this.getValue.studentStartGrade__c},
                {label:'End Grade', value: this.getValue.studentEndGrade__c},
                  {label:'Nationalities Represented', value: this.getValue.studentNationalitiesRepresented__c}, 
            ]
            let teacherInformation =[
                 {label:'Nationalities Represented', value: this.getValue.teacherNationalitiesRepresented__c},
            ]
            let studentEnrollmentGrade = [
                {label:'Nursery/Infants', value: this.getValue.studentEnrolmentNursery__c},
                {label:'PreK', value: this.getValue.studentEnrolmentPreK__c},
                {label:'Elementary K-5', value: this.getValue.studentEnrolmentElementary__c},
                {label:'Middle School 6-8', value: this.getValue.studentEnrolmentMiddleSchool__c},
                {label:'High School 9-12', value: this.getValue.studentEnrolmentHighSchool__c},
                {label:'Grade 13', value: this.getValue.studentEnrolmentGrade13__c},
            ]
            let tuition = [
                {label:'Fees Range', value: 'USD '+this.getValue.Tuition_Fees_Lower_Limit__c+'-'+this.getValue.Tuition_Fees_Upper_Limit__c},
                {label:'Year', value: this.getValue.Tuition_Year__c},
            ]

        this.schoolDetails = [];
        basicInformation.forEach((element)=>{
            if(element.value!=undefined){
                this.schoolDetails.push(element);
            }
        })
        this.contactInformation =[];
        contactInformation.forEach((element)=>{
             if(element.value!=undefined){
                this.contactInformation.push(element);
            }

        })
        this.salaryInformation=[];
        salaryInformation.forEach((element)=>{
             if(element.value!=undefined){
                this.salaryInformation.push(element);
            }

        })
        this.visaInformation=[];
        visa.forEach((element)=>{
            if( element.value!=undefined){
                this.visaInformation.push(element);
            }
        })
        this.benefits = [];
        benefits.forEach((element)=>{
             if( element.value!=undefined){
                this.benefits.push(element);
            }
        })
        this.teacherInformation = [];
        teacherInformation.forEach((element)=>{
            if( element.value!=undefined){
                this.teacherInformation.push(element);
            } 
        })
        this.studentInformation = [];
        studentInformation.forEach((element)=>{
            if( element.value!=undefined){
                this.studentInformation.push(element);
            } 
        })

        this.educationalInformation =[];
        educational.forEach((element)=>{
            if( element.value!=undefined){
                this.educationalInformation.push(element);
            } 
        })
        this.studentEnrollment = [];
        studentEnrollmentGrade.forEach((element)=>{
            if(element.value!=undefined){
                this.studentEnrollment.push(element);
            }
        })
        this.tuition = [];
        tuition.forEach((element)=>{
            if(element.value!=undefined){
                this.tuition.push(element);
            }
        })
        var school = [];
  var idx = 1;
  var c = 0;
  basicInformation.forEach((element)=>{
     if(element.value!=undefined){
      c++;
    }

  })
  basicInformation.forEach((element)=>{
      if( element.value!=undefined){
          element.showLine = false;
          if( idx%2 == 0 && idx != c ){
            element.showLine = true;
          }
          school.push(element);
          idx++;
      } 
  })
this.schoolDetails = school;
var contact = [];
idx = 1;
c = 0;
contactInformation.forEach((element)=>{
     if(element.value!=undefined){
      c++;
    }
})
contactInformation.forEach((element)=>{
      if( element.value!=undefined){
          element.showLine = false;
          if( idx%2 == 0 && idx != c ){
            element.showLine = true;
          }
          contact.push(element);
          idx++;
      } 
})
this.contactInformation = contact;

var salary = [];
idx=1;
c=0;
salaryInformation.forEach((element)=>{
    if(element.value!=undefined){
        c++;
    }
})
salaryInformation.forEach((element)=>{
      if( element.value!=undefined){
          element.showLine = false;
          if( idx%2 == 0 && idx != c ){
            element.showLine = true;
          }
          salary.push(element);
          idx++;
      } 
})
this.salaryInformation = salary;

var visaInf = [];
idx = 1;
c = 0;
visa.forEach((element)=>{
    if(element.value!=undefined){
        c++;
    }
})
visa.forEach((element)=>{
      if( element.value!=undefined){
          element.showLine = false;
          if( idx%2 == 0 && idx != c ){
            element.showLine = true;
          }
          visaInf.push(element);
          idx++;
      } 
})
this.visaInformation = visaInf;
 
var benefitIn = [];
idx = 1;
c = 0;
benefits.forEach((element)=>{
      if(element.value!=undefined){
        c++;
    }
})
benefits.forEach((element)=>{
       if( element.value!=undefined){
          element.showLine = false;
          if( idx%2 == 0 && idx != c ){
            element.showLine = true;
          }
          benefitIn.push(element);
          idx++;
      } 
})
 this.benefits = benefitIn;
 var student = [];
idx = 1;
c = 0;
studentInformation.forEach((element)=>{
      if(element.value!=undefined){
        c++;
    }
})
studentInformation.forEach((element)=>{
       if( element.value!=undefined){
          element.showLine = false;
          if( idx%2 == 0 && idx != c ){
            element.showLine = true;
          }
          student.push(element);
          idx++;
      } 
})
 this.studentInformation = student;
 var studentEnrollment = [];
idx = 1;
c = 0;
studentEnrollment.forEach((element)=>{
      if(element.value!=undefined){
        c++;
    }
})
studentEnrollment.forEach((element)=>{
       if( element.value!=undefined){
          element.showLine = false;
          if( idx%2 == 0 && idx != c ){
            element.showLine = true;
          }
          studentEnrollment.push(element);
          idx++;
      } 
})
 this.studentEnrollment = student;
  var eduactionInfo = [];
idx = 1;
c = 0;
educational.forEach((element)=>{
      if(element.value!=undefined){
        c++;
    }
})
educational.forEach((element)=>{
       if( element.value!=undefined){
          element.showLine = false;
          if( idx%2 == 0 && idx != c ){
            element.showLine = true;
          }
          eduactionInfo.push(element);
          idx++;
      } 
})
 this.educationalInformation = eduactionInfo;
 



   
    if (event.currentTarget.parentElement.querySelector('.dropdownData').style.height == '0px') {
      //this.dropDownIcon = "utility:up";
       event.currentTarget.querySelector('lightning-icon').iconName = "utility:up"
      event.currentTarget.parentElement.querySelector('.dropdownData').style.height = 'auto';
    }
    else {
      event.currentTarget.parentElement.querySelector('.dropdownData').style.height = '0px';
       event.currentTarget.querySelector('lightning-icon').iconName = "utility:down"
    }
  }
renderedCallback(){
      if(this.template.querySelectorAll('.information').length!=0){
        if(this.template.querySelectorAll('.information').length % 2 == 0){
        let elements = this.template.querySelectorAll('.information');
        let lastElement = elements[elements.length - 1];
        let secondLast = elements[elements.length - 2];
        lastElement.style.borderBottom = "0px";
        secondLast.style.borderBottom = "0px";

    }
    else{
         let elements = this.template.querySelectorAll('.information');
        let lastElement = elements[elements.length - 1];
        lastElement.style.borderBottom = "0px";
    }
      }
        if(this.template.querySelectorAll('.contact').length!=0){
        if(this.template.querySelectorAll('.contact').length % 2 == 0){
        let elements = this.template.querySelectorAll('.contact');
        let lastElement = elements[elements.length - 1];
        let secondLast = elements[elements.length - 2];
        lastElement.style.borderBottom = "0px";
        secondLast.style.borderBottom = "0px";

    }
    else{
         let elements = this.template.querySelectorAll('.contact');
        let lastElement = elements[elements.length - 1];
        lastElement.style.borderBottom = "0px";
    }
      }
    
    const customEventVar = new CustomEvent('changedheight', { detail: this.template.querySelector('.mainContainer').offsetHeight+51 });
    this.dispatchEvent(customEventVar);
    this.template.querySelectorAll('.textSecFont').forEach(currentItem => {
      if(currentItem.innerHTML == 'true'){
          currentItem.innerHTML = 'Yes';
      }else if(currentItem.innerHTML == 'false'){
          currentItem.innerHTML = 'No';
      }
    });
}
childCmpResized() {
    const customEventVar = new CustomEvent('changedheight', { detail: this.template.querySelector('.mainContainer').offsetHeight });
    this.dispatchEvent(customEventVar);
  }
 @api closeAllDropdown(){

 }
    

    getClick(evt){
        // // console.log('OUTPUT : event called ' , evt.currentTarget.dataset.id);
            this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'job_search__c'
            
            },
            state: {
                id: event.currentTarget.dataset.id //must be string
            }
        });

    }
    
}