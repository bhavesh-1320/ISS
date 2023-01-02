import { LightningElement, api, track } from 'lwc';
import searchHeading from '@salesforce/resourceUrl/candidateSearchIconData';
import searchHeading2 from '@salesforce/resourceUrl/candidateSearchIconData';
import addJobToBookmark from '@salesforce/apex/candidateJobSearchReview.addJobToBookmark';
import checkBookmark from '@salesforce/apex/candidateJobSearchReview.checkBookmark';
import checkApplyStatus from '@salesforce/apex/candidateJobSearchReview.checkApplyStatus';
import removeJobFromBookmark from '@salesforce/apex/candidateJobSearchReview.removeJobFromBookmark';
import getSchoolDataForJob from '@salesforce/apex/candidateJobSearchReview.getSchoolDataForJob';
// import checkApplyLimit from '@salesforce/apex/candidateJobSearchReview.checkApplyLimit';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import basepath from '@salesforce/community/basePath';
import Id from '@salesforce/user/Id';

export default class HighSchoolMath extends LightningElement {
  currentLoggingUser = Id;
  basepath = basepath;
  dropDownIcon = "utility:down";
  candidateMessaging = basepath + '/candidate-messaging';
  teacherdata = ['one', 'two ', 'three', 'four'];
  @api getValue;
  @track schoolDetails=[];
  teacher;
  admin;
  contract;
    @track contactInformation = [];
    @track salaryInformation=[];
    @track visaInformation=[];
    @track benefits = [];
    @track educationalInformation = [];
    @track teacherInformation = [];
    @track studentInformation = [];
    @track studentEnrollment = [];
    @track tuition = [];
    @track schooldataForJob = {};
  showApply = false;
  urlId ='';
  likes = false;
  showData = true;
  bookmarked = false;
  applyBtnVisibility = true;
  @track schoolName;
  @track schoolDescription;
  rectangleImage = searchHeading + '/candidateSearchIconData/Rectangle30.png';
  rectangleImage1 = searchHeading2 + '/candidateSearchIconData/job2.PNG';
  rectangleImage2 = searchHeading2 + '/candidateSearchIconData/job3.PNG';
  TeacherImage = searchHeading2 + '/candidateSearchIconData/job4.png';
  Bookmark = searchHeading2 + '/candidateSearchIconData/job6.png';
  RightSign = searchHeading2 + '/candidateSearchIconData/job7.png';

 connectedCallback() {
   console.log('inside connected')
  
     var urlParameters = window.location.href;
        var urlStateParameters = urlParameters.split('id=');
        console.log('url',urlStateParameters);
        var urlIDValue = urlStateParameters[1];
        console.log('id from url',urlIDValue);
        this.urlId = urlIDValue;
        if(urlIDValue){
        console.log('inside if');
        getSchoolDataForJob({jobId:urlIDValue})
    .then((result)=>{
      console.log('58',result);
      this.schooldataForJob = result
    }).catch(err=>{
      console.log('err-->',err);
    })


        }
 }
  renderedCallback() {
    //  this.template.querySelectorAll('.textSecFont').forEach(ele => {
    //         // console.log('392',ele.innerHTML);
    //          ele.innerHTML.replaceAll(",", ", ");
    //     })
    //       this.template.querySelectorAll('.labelValue').forEach(ele => {
    //         // console.log('392',ele.innerHTML);
    //         ele.innerHTML.replaceAll(",", ", ");
     //   })
    // console.log(this.template.querySelectorAll('.education').length);
  //   if(this.template.querySelectorAll('.education').length != 0){
  // if(this.template.querySelectorAll('.education').length % 2 == 0){
  //    let education = this.template.querySelectorAll('.education');
  //    this.template.querySelectorAll('.education').forEach((element)=>{
  //      element.style.borderBottom = "1px solid #ccc;"
  //    })
  //   let lastElem = education[education.length-1];
  //   lastElem.style.borderBottom = "0px"
    
  //   let scndlastElem = education[education.length-2];
  //   scndlastElem.style.borderBottom = "0px"
  //   console.log('OUTPUT : ',lastElem);
  //   console.log('OUTPUT : ',education);
  //   }
  //   else{
  //       let education = this.template.querySelectorAll('.education');
  //   let lastElem = education[education.length-1];
  //   lastElem.style.borderBottom = "0px"
  //   }
  //   }
  
    
    // console.log('OUTPUT : render');
    //  console.log(educationalInformation.length)
      this.template.querySelectorAll('.labelValue').forEach(currentItem => {
      // if(currentItem.innerHTML == 'true'){
      //     currentItem.innerHTML = 'Yes';
      // }else if(currentItem.innerHTML == 'false'){
      //     currentItem.innerHTML = 'No';
      // }
    });
    const style = document.createElement('style');
    style.innerText = `
                        .Teacher2{
                            background-image: url(${this.TeacherImage});
                            background-repeat: no-repeat;
                            background-size: cover;
                            height : 232px;
                        }

                        `;

    
    // let getData = JSON.parse(JSON.stringify(this.getValue))
  
   
    if (this.getValue != 'undefined') {
      this.showData = true;
      this.template.querySelector('.Teacher').appendChild(style);
    }
  }
  @api checkGetRecord(value) {
    console.log('line 139')
    console.log('value-->',value);
    const style = document.createElement('style');
    style.innerText = `
                                .Teacher2{
                                    background-image: url(${this.TeacherImage});
                                    background-repeat: no-repeat;
                                    background-size: cover;
                                }
                                
                                `;

    
    
    
    // this.template.querySelector("c-apply-job").jobDetails = this.getValue;
    
    if (value == {} || value == 'undefined') {
      
      this.showData = false;
      this.childCmpResized();
    }
    else {
      this.showData = true;
      
      setTimeout(() => {
        this.getValue = value;
        console.log('OUTPUT : ',JSON.stringify(this.getValue));
        this.childCmpResized();
      }, 100)
      
      // this.bookmarked = true;
      console.log('value.id-->',value.Id);
      checkBookmark({ userId: this.currentLoggingUser, jobId: value.Id }).then(result => {
        let bookMark = result;
        if (bookMark == 'true') {
          this.bookmarked = true;
        }
        else {
          this.bookmarked = false;
        }
      }).catch(error => {
        
      })

      checkApplyStatus({ userId: this.currentLoggingUser, jobId: value.Id }).then(result => {
        let status = result;
        if (status == 'Applied') {
          this.applyBtnVisibility = false;
        }
        else {
          this.applyBtnVisibility = true;
        }
      }).catch(error => {
        
      })
       
      console.log('inside if');
 getSchoolDataForJob({jobId:value.Id})
    .then((result)=>{
      this.schooldataForJob = result
      if(this.schooldataForJob.teacherSalaryLowerLimit__c == undefined){
        this.schooldataForJob.teacherSalaryLowerLimit__c = 0;
      }
       if(this.schooldataForJob.teacherSalaryUpperLimit__c == undefined){
        this.schooldataForJob.teacherSalaryUpperLimit__c = 0;
      }
       if(this.schooldataForJob.contractStartMonth__c == undefined){
        this.schooldataForJob.contractStartMonth__c = 0;
      }
       if(this.schooldataForJob.contractEndMonth__c == undefined){
        this.schooldataForJob.contractEndMonth__c = 0;
      }
       if(this.schooldataForJob.adminSalaryLowerLimit__c == undefined){
        this.schooldataForJob.adminSalaryLowerLimit__c = 0;
      }
       if(this.schooldataForJob.adminSalaryUpperLimit__c == undefined){
        this.schooldataForJob.adminSalaryUpperLimit__c = 0;
      }
        if(this.schooldataForJob.maximumAge__c == undefined){
        this.schooldataForJob.maximumAge__c = 0;
      }
      //console.log(Json.stringify(result));
    })
    .catch((err)=>{
      console.log('Error : ',err);
    })
    
   
      // this.schoolName = value.School__r.Name;
      // this.schoolDescription = value.School__r.Description;

      this.template.querySelector('.Teacher').appendChild(style);

    }
  }
  closeModal() {
    this.likes = false;
  }
  likeClick() {
    this.likes = true;
  }
  goBack(event) {
    const custEvent = new CustomEvent(
      'callpasstoparent', {
      detail: 'goBack'
    });
    this.dispatchEvent(custEvent);
  }
  // handleChildEvents(event)
  // {
  //   
  //     this.showApply = event.detail.popupApply;
  //     
  //     if(event.detail.submitApplication)
  //     {
  //       //Call apex function
  //     }
  // }
  handleShowJob(event) {
    this.showApply = true;
  }
  handleCloseJobApply(event) {
    
    this.showApply = false;
  }
  handleSubmitApplication(event) {
    this.showApply = false;
    this.applyBtnVisibility = false;
    //Call Apex
  }
  handleSaveDraft(event) {
    // this.showApply = false;
    //Call Apex
  }

  CollapseDropDown(event) {

    let basicInformation = [
      {label:'Year Founded', value: this.schooldataForJob.foundedYear__c},
      {label:'School Type', value: this.schooldataForJob.School_Type__c},
      {label:'School Calendar Link', value: this.schooldataForJob.calenderLink__c},
      {label:'Accreditation', value: this.schooldataForJob.accreditation__c},
      {label:'Governance', value: this.schooldataForJob.governance__c},
      {label:'Accredited By', value: this.schooldataForJob.accreditationBy__c},
      {label:'Organization', value: this.schooldataForJob.organization__c},
      {label:'Regional Organizational Membership', value: this.schooldataForJob.Regional_Organizational_Membership__c},
      {label:'School Ownership Type', value: this.schooldataForJob.ownerShip__c},
      {label:'Religious Affiliation', value: this.schooldataForJob.religion__c},
      {label:'Student Body', value: this.schooldataForJob.studentBody__c}
  ]
  let contactInformation = [
      {label:'School URL', value: this.schooldataForJob.siteUrl__c},
      {label:'General Contact Email Address', value: this.schooldataForJob.generalEmail__c},
      {label:'Job Related Email Address', value: this.schooldataForJob.jobEmail__c},
      {label:'Primary Phone Number', value: this.schooldataForJob.phone__c},
      {label:'Primary Fax Number ', value: this.schooldataForJob.fax__c},
      {label:'Address Line ', value: this.schooldataForJob.BillingStreet},
      {label:'Country', value: this.schooldataForJob.BillingCountry},
      {label:'City', value: this.schooldataForJob.BillingCity},
      {label:'State / Province', value: this.schooldataForJob.BillingState},
      {label:'ZIP / Post Code', value: this.schooldataForJob.BillingPostalCode},

  ]
  let salary = [
      {label:'Salary Range (Teachers)', value: 'USD '+this.schooldataForJob.teacherSalaryLowerLimit__c +'-'+ this.schooldataForJob.teacherSalaryUpperLimit__c},
       {label:'Contract Duration', value: this.schooldataForJob.contractStartMonth__c +'-'+ this.schooldataForJob.contractEndMonth__c},
      {label:'Salary Range (Administrators)', value: 'USD '+this.schooldataForJob.adminSalaryLowerLimit__c +'-'+this.schooldataForJob.adminSalaryUpperLimit__c},
      {label:'Initial Contract Length (Teachers)', value: this.schooldataForJob.initialContractLengthTeacher__c},
     {label:'Salary Paid In', value: this.schooldataForJob.salaryPaidIn__c},
           {label:'Initial Contract Length (Administrators)', value: this.getValue.initialContractLengthAdmin__c},
           {label:'% Salary Paid in USD', value: this.schooldataForJob.percentPaidInUsd__c},
           {label:'School Hiring Preference', value: this.schooldataForJob.schoolHiringPreference__c},
           {label:'Local Taxes On Salary', value: this.schooldataForJob.localTaxes__c},
           {label:'Certification Needed', value: this.schooldataForJob.certificationNeeded__c},
           {label:'Savings Potential Per Year (Single)', value: this.schooldataForJob.savingsPotentialSingle__c},
            {label:'Teaching Days', value: this.schooldataForJob.teachingDays__c},
             {label:'Savings Potential Per Year (Team)', value: this.schooldataForJob.savingsPotentialTeam__c},
      {label:'Intern', value: this.schooldataForJob.interns__c}

  ]
  let visa=[
        {label:'Visa Restrictions', value: this.schooldataForJob.hasVisaRestrictions__c},
         {label:'Certifications', value: this.schooldataForJob.certifications__c},
          {label:'Age (maximum)', value: this.schooldataForJob.maximumAge__c +' Years'},
          {label:'Min. Years of Experience', value: this.schooldataForJob.minimumYearsOfExperience__c},
          {label:'School Provdies Visa Assistance', value: this.schooldataForJob.schoolProvidesVisaAssistance__c},
           {label:'Min. Qualifications', value: this.schooldataForJob.minimumQualifications__c},
  ]
  let benefits = [
         {label:'Saving Potential', value: this.schooldataForJob.hasSavingsPotential__c},
            {label:'Retirement Plan', value: this.schooldataForJob.hasRetirementPlan__c},
               {label:'Taxes', value: this.schooldataForJob.hasTaxes__c},
                  {label:'Tuition for Dependents', value: this.schooldataForJob.hasTuitionForDependents__c},
                     {label:'Flight Transportation', value: this.schooldataForJob.hasTransportation__c},
                     {label:'Moving Allowance', value: this.schooldataForJob.hasMovingAllowance__c},
                       {label:'Settling in Allowance', value: this.schooldataForJob.hasSettlingInAllowance__c},
                         {label:'Accommodation', value: this.schooldataForJob.hasAccommodation__c},
                           {label:'Accommodation Shared for Singles', value: this.schooldataForJob.isAccommodationShared__c},
                             {label:'Utilities', value: this.getValue.hasUtilities__c},
                               {label:'Reoccurring Flight/ transportation', value: this.schooldataForJob.hasRecurringTransportation__c},
                                 {label:'Medical Insurance', value: this.schooldataForJob.hasMedicalInsurance__c},
                                   {label:'Dental Insurance', value: this.schooldataForJob.hasDentalInsurance__c},
                       {label:'Disability Insurance', value: this.schooldataForJob.hasDisabilityInsurance__c},
                   {label:'Opportunities for Dependents', value: this.schooldataForJob.hasOpportunitiesForDependents__c}


  ]
  let educational = [
       {label:'Universities/Collages Attended By Recent Graduates', value: this.schooldataForJob.universitiesAttended__c, educationBoolean:true},
        {label:'Average Class Size', value: this.schooldataForJob.averageClassSize__c, educationBoolean:true},
          {label:'Percentage of graduates who take admission to college', value: this.schooldataForJob.collegeGraduatesPercent__c, educationBoolean:true},
            {label:'Curriculum Type', value: this.schooldataForJob.curriculumType__c, educationBoolean:true}, 
            {label:'Languages of Instruction', value: this.schooldataForJob.languagesOfInstruction__c, educationBoolean:true},
            {label:'Examination and Tests', value: this.schooldataForJob.examinations__c,educationBoolean:true},
            {label:'Extra Curricular Programs', value: this.schooldataForJob.extraCurricularActivities__c, educationBoolean:true},
            {label:'Sports', value: this.schooldataForJob.sports__c, educationBoolean:true},
            {label:'Clubs', value: this.schooldataForJob.clubs__c, educationBoolean:true},
            {label:'School Support Services', value: this.schooldataForJob.schoolSupportServices__c, educationBoolean:true},
      ]

          let studentInformation = [
        {label:'Start Grade', value: this.schooldataForJob.studentStartGrade__c},
          {label:'End Grade', value: this.schooldataForJob.studentEndGrade__c},
            {label:'Nationalities Represented', value: this.schooldataForJob.studentNationalitiesRepresented__c}, 
      ]
      let teacherInformation =[
           {label:'Nationalities Represented', value: this.schooldataForJob.teacherNationalitiesRepresented__c},
      ]
      let studentEnrollmentGrade = [
          {label:'Nursery/Infants', value: this.schooldataForJob.studentEnrolmentNursery__c},
          {label:'PreK', value: this.schooldataForJob.studentEnrolmentPreK__c},
          {label:'Elementary K-5', value: this.schooldataForJob.studentEnrolmentElementary__c},
          {label:'Middle School 6-8', value: this.schooldataForJob.studentEnrolmentMiddleSchool__c},
          {label:'High School 9-12', value: this.schooldataForJob.studentEnrolmentHighSchool__c},
          {label:'Grade 13', value: this.schooldataForJob.studentEnrolmentGrade13__c},
      ]
      let tuition = [
          {label:'Fees Range', value: 'USD '+this.schooldataForJob.Tuition_Fees_Lower_Limit__c+'-'+this.schooldataForJob.Tuition_Fees_Upper_Limit__c},
          {label:'Year', value: this.schooldataForJob.Tuition_Year__c},
      ]

  this.schoolDetails = [];
  basicInformation.forEach((element)=>{
    if(element.value ===true){
      element.value = 'Yes';
    }
    else if(element.value ===false){
        element.value = 'No';
    }
      if(element.value!=undefined){
          this.schoolDetails.push(element);
      }
  })
  
  this.contactInformation =[];
  contactInformation.forEach((element)=>{
    if(element.value ===true){
      element.value = 'Yes';
    }
    else if(element.value ===false){
        element.value = 'No';
    }
       if(element.value!=undefined){
          this.contactInformation.push(element);
      }

  })

  this.salaryInformation=[];
  salary.forEach((element)=>{
    // console.log('test',!element.value.includes("undefined"));
   
    if(element.value ===true){
      element.value = 'Yes';
    }
    else if(element.value ===false){
        element.value = 'No';
    }
     
       if(element.value!=undefined  ){
         
         
          this.salaryInformation.push(element);
      }
      

  })
 
  this.visaInformation=[];
  visa.forEach((element)=>{
    if(element.value ===true){
      element.value = 'Yes';
    }
    else if(element.value ===false){
        element.value = 'No';
    }
      if( element.value!=undefined){
          this.visaInformation.push(element);
      }
  })

  this.benefits = [];
  console.log('421 : ',JSON.stringify(benefits));
  benefits.forEach((element)=>{
     if(element.value ===true){
      element.value = 'Yes';
    }
    else if(element.value ===false){
        element.value = 'No';
    }
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
  //this.educationalInformation =[];
  var edu = [];
  console.log('OUTPUT 369 : ',JSON.stringify(educational));
  this.educationalInformation = [];
  var idx = 1;
  var c = 0;
  educational.forEach((element)=>{
      if( element.value!=undefined){
          c++;
      } 
  })
  educational.forEach((element)=>{
      if( element.value!=undefined){
          element.showLine = false;
          if( idx%2 == 0 && idx != c ){
            element.showLine = true;
          }
          edu.push(element);
          idx++;
      } 
  })
 
  this.educationalInformation = edu; 
  console.log('402 : ',JSON.stringify(this.educationalInformation));
  
  var salaryInf =[];
   this.salaryInformation=[];
 idx = 1;
  c = 0;
 
  salary.forEach((element)=>{
    if(element.value!=undefined){
      c++;
    }
  })
  salary.forEach((element)=>{
      if( element.value!=undefined){
          element.showLine = false;
          if( idx%2 == 0 && idx != c ){
            element.showLine = true;
          }
          salaryInf.push(element);
          idx++;
      } 
  })
  console.log('salary',salaryInf);
  this.salaryInformation = salaryInf;
   console.log('402 : ',JSON.stringify(this.salaryInformation));


   var benefit =[];
 idx = 1;
  c = 0;
  this.benefits = [];
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
          benefit.push(element);
          idx++;
      } 
  })
  this.benefits = benefit;
  console.log('benefit',JSON.stringify(this.benefits));
  var visaInf =[];
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
  var school = [];
  idx = 1;
  c = 0;
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
  @api closeDropDown(){
    this.template.querySelectorAll('.dropdownData').forEach((element)=>{
      element.style.height = '0px';
    })
    this.template.querySelectorAll('.drop').forEach((element)=>{
      element.iconName = "utility:down";
    })
   
  }
    addBookmark(event){
 addJobToBookmark({ userId: this.currentLoggingUser, jobId: event.currentTarget.dataset.id }).then(result => {
      
      this.bookmarked = true;
    }).catch(error => {
      
    })
    }
    
   
  

  removeBookmark(event) {
    removeJobFromBookmark({ userId: this.currentLoggingUser, jobId: event.currentTarget.dataset.id }).then(result => {
      
      this.bookmarked = false;
    }).catch(error => {
      
    })
  }


  handleChandleShowJoblick() {
    this.showApply = true;
    // checkApplyLimit({ userId: this.currentLoggingUser }).then(result => {
    //   let action = result;
    //   if (action == 'Allow') {

    //   }
    //   else {
    //     this.dispatchEvent(new ShowToastEvent({ message: 'You have Exceed apply limit. Upgrade to Premium to apply for more jobs.', variant: 'error' }));
    //   }
    // }).catch(error => {
    //   
    // })
  }

  showToastMsg(event) {
    this.dispatchEvent(new ShowToastEvent({ message: event.detail[0], variant: [event.detail[1]] }));
  }

  childCmpResized() {
    const customEventVar = new CustomEvent('changedheight', { detail: this.template.querySelector('.mainContainer').offsetHeight });
    this.dispatchEvent(customEventVar);
  }

}