import { LightningElement, track } from 'lwc';
import bookIcon from '@salesforce/resourceUrl/bookIcon';
import pullFromPast from '@salesforce/resourceUrl/pullFromPast';
import preview from '@salesforce/resourceUrl/preview';
 import saveDraft from '@salesforce/resourceUrl/saveDraft';
import ISSSTATICRESOURCE from '@salesforce/resourceUrl/ISSSTATICRESOURCE';
import creatJob from '@salesforce/apex/createJobController.createJob';
import Id from '@salesforce/user/Id';
import basepath from '@salesforce/community/basePath';

export default class RecruiterAddJob extends LightningElement {

    CreateSpilitPositionBoolean = true;
    comboboxList = [];
    position=[];
    save = ISSSTATICRESOURCE + '/addJobIcons/saveasdraft.png';
    publish = ISSSTATICRESOURCE + '/addJobIcons/publish.png';
    preview = ISSSTATICRESOURCE + '/addJobIcons/preview.png';
    pull =ISSSTATICRESOURCE + '/addJobIcons/pull.png';
    exportIcon = ISSSTATICRESOURCE + '/addJobIcons/export.png';

    communityPath = basepath;
    jobPath = this.communityPath+'/job-page';
    userId = Id;

    isLoading = false;
    bookIcon = bookIcon;
    pullFromPast = pullFromPast;
    // preview = preview;
     saveDraft = saveDraft;
    // publish = publish;
    value = [];
    coverLetter = '';
    jobTypeValue = '';
    jobName = '';
    allotment=[];
    certificateRequired = '';
    mediaLink = '';
    startDate = '';
    selectDepartment=[];
    closeDate = '';
    minQualification = '';
    selectSubject=[];
    jobTypeV = [];
    numberOfOpening = '';
    statusvalue = '';
    desc = '';
    contractLength= '';
    SalaryRange ='';
    salarystartrange='';
    salaryEndRange='';
    gradeStarting='';
    gradeEnding='';
    checkboxArray=[];
    @track previewjob = false;


    @track valueOpening = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '10', value: '10' },
    ];
    @track experience = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '10', value: '10' },
    ];

    @track cover = [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
    ];
    @track certificate = [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
    ];
    @track subject =[
       { label: 'Academic Dean', value: 'Academic Dean' },
       { label: 'Administrative Assistant', value: 'Administrative Assistant' },
       { label: 'Associate/Assistant Academic Dean', value: 'Associate/Assistant Academic Dean' },
       { label: 'Associate/Assistant Dean of Students', value: 'Associate/Assistant Dean of Students' },
       { label: 'Associate/Assistant Elementary School Principal', value: 'Associate/Assistant Elementary School Principal' },
    ];
    @track jobType = [
        { label: 'Full Time', value: 'Full Time' },
        { label: 'Part Time', value: 'Part Time' },
        { label: 'Online', value: 'Online' },
        { label: 'Short Term/Summer', value: 'Short Term/Summer' },
        { label: 'Intern', value: 'Intern' },
        { label: 'Substitute/Supply', value: 'Substitute/Supply' },
        { label: 'Student Teacher', value: 'Student Teacher' }
    ];
    @track minimumQualification = [
        { label: 'Diploma', value: 'Diploma' },
        { label: 'Graduate Certificate', value: 'Graduate Certificate' },
        { label: 'Certificate', value: 'Certificate' },
        { label: 'PGCE', value: 'PGCE' },
        { label: 'PGDE', value: 'PGDE' },
        { label: 'OTS', value: 'OTS' },
        { label: 'TOEFL', value: 'TOEFL' },
        { label: 'Graduate diploma', value: 'Graduate diploma' },
        { label: 'Advanced diploma', value: 'Advanced diploma' },
        { label: 'Associates degree', value: 'Associates degree' },
        { label: 'Bachelor', value: 'Bachelor' },
        { label: 'Masters', value: 'Masters' },
        { label: 'Ed.D', value: 'Ed.D' },
        { label: 'Ph.D / doctorate', value: 'Ph.D / doctorate' },
        { label: 'Other', value: 'Other' },
    ];
       Departments = [
        { label: 'Administration', value: 'Administration' },
        { label: 'Arts', value: 'Arts' },
        { label: 'Computer Education/Technology', value: 'Computer Education/Technology' },
        { label: 'Counseling/Psychology', value: 'Counseling/Psychology' },
        { label: 'Early Childhood Education (ECE)', value: 'Early Childhood Education (ECE)' },
        { label: 'Elementary', value: 'Elementary' },
        { label: 'English as an Additional Language', value: 'English as an Additional Language' },
        { label: 'English/Language Arts', value: 'English/Language Arts' },
        { label: 'Foreign Language', value: 'Foreign Language' },
        { label: 'Gifted and Talented', value: 'Gifted and Talented' },
        { label: 'Humanities', value: 'Humanities' },
        { label: 'Library/Media', value: 'Library/Media' },
        { label: 'Mathematics', value: 'Mathematics' },
        { label: 'Music', value: 'Music' },
        { label: 'Performing Arts', value: 'Performing Arts' },
        { label: 'Physical Education/Health', value: 'Physical Education/Health' },
        { label: 'Science', value: 'Science' },
        { label: 'Secondary Teachers', value: 'Secondary Teachers' },
        { label: 'Social Studies', value: 'Social Studies' },
        { label: 'Special Education', value: 'Special Education' },
        { label: 'Support Positions', value: 'Support Positions' },
        { label: 'Teacher Leader', value: 'Teacher Leader' }
    ];
    checkBoxValue = ['Advanced Placement (AP)', 'Australian', 'Cambridge', 'Canadicam', 'Common Care\ ', 'IB MYP', ' ESL/EFL', ' IB Career-related Program (IBCP)', 'IB DP', 'IB DP', ' IB PYP', 'IEYC', 'IMYC', 'IPC', 'Irish', 'Montessori', 'National', 'New Zealand', 'Other', 'Pearson', 'SAT', 'STEM', 'Southern African', 'UK - A - Levels', 'UK - GCSE', 'UK - IGCSE', 'United Kingdom', 'United States'];

    handleChange(event) {

        console.log(event);
        console.log('name-->', event.target.name);
        // console.log('dataset obj-->', event.target.dataset.obj);
        //  const {name, value} = event.target
        // console.log(name +'==>' +value);
        console.log(this.template.querySelector(".jobName").value);
        //this.jobName = this.template.querySelector(".jobName").value;
        if (event.target.name == 'jobName') {
            this.jobName = event.target.value;
            console.log('OUTPUT : ', this.jobName);
        }
        else if (event.target.name == 'JobType') {
            this.jobTypeValue = event.target.value;
        }
        else if (event.target.name == 'Openings') {
            this.numberOfOpening = event.target.value;

        }
        else if (event.target.name == 'MinimumQualification') {
            this.minQualification = event.target.value;

        }
        else if (event.target.name == 'MinimumYearofExperience') {
            this.minimumYear = event.target.value;

        }
        else if (event.target.name == 'CertificationRequired') {
            this.certificateRequired = event.target.value;

        }
        else if (event.target.name == 'CoverLetter') {
            this.coverLetter = event.target.value;
        }
        else if (event.target.name == 'media') {
            this.mediaLink = event.target.value;

        }
        else if (event.target.name == 'salarystartrange') {
            this.salarystartrange = event.target.value;

        }
        else if (event.target.name == 'SalaryEndRange') {
            this.salaryEndRange = event.target.value;

        }
        else if (event.target.name == 'GradeStarting') {
            this.gradeStarting = event.target.value;

        }
        else if (event.target.name == 'GradeEnding') {
            this.gradeEnding = event.target.value;

        }
        else if (event.target.name == 'contractLength') {
            this.contractLength = event.target.value;

        }
        else if (event.target.name == 'closeDate') {
            this.closeDate = event.target.value;
            // if (this.closeDate == '') {
            //     this.closeDate = null;
            // }

        }
        else if (event.target.name == 'SelectDepartment') {
            this.selectDepartment.push(event.target.value);
           
        }
        else if(event.target.name == 'Subject'){
            this.selectSubject.push(event.target.value);
        }
         else if(event.target.name == 'Allotment'){
            this.allotment.push(event.target.value);
        }
    }

    get selectedValues() {
        return this.value.join(',');
    }


    // Save as Draft

    // saveAsDraft(event) {
    //     console.log(this.jobName);
    //     console.log(this.startDate);
    //     // console.log(this.startDate.toDateString());
    //     // console.log('type : ', typeof this.startDate );

       
    //     console.log(this.closeDate);



    //     console.log(this.mediaLink);
    //     console.log(this.jobTypeValue);
    //     console.log(this.numberOfOpening);
    //     console.log(this.minQualification);
    //     console.log(this.certificateRequired);
    //     console.log(this.coverLetter);
    //     console.log(this.minimumYear);

    //     this.statusvalue = event.target.dataset.id;
    //     console.log("status : ", this.statusvalue);

    //     creatJob({ jobName: this.jobName, startDate: this.startDate, numberOfOpening: this.numberOfOpening, closeDate: this.closeDate, mediaLink: this.mediaLink, jobTypeValue: this.jobTypeValue, minQualification: this.minQualification, certificateRequired: this.certificateRequired, coverLetter: this.coverLetter, minimumYear: this.minimumYear, userId: this.userId, status: this.statusvalue })
    //         .then((result) => {
    //             console.log(result);
    //         })


    // }
    
    handleClick(event) {
        console.log('1');
      const value = event.target.value;
     
      this.desc = value;
  }

    publishData(event) {
        this.position=[];
        console.log('clicked');
        console.log(this.template.querySelectorAll('.positionSplit'));
        this.template.querySelectorAll('.positionSplit').forEach(element=>{
            console.log(element);
            let jsonData = {
                department:element.querySelector('.department').value,
                subject:element.querySelector('.subject').value,
                allotment:element.querySelector('.allotment').value
            }

     this.position.push(jsonData);
        })
   
        // if(inputError){
console.log(this.jobName);
        console.log(this.startDate);
        console.log('OUTPUT : ',this.salarystartrange);
        this.SalaryRange = this.salarystartrange+'-'+this.salaryEndRange;
        // console.log(this.startDate.toDateString());
        // console.log('type : ', typeof this.startDate );
     console.log(this.contractLength);
     console.log(this.SalaryRange);
        console.log(this.closeDate);
        console.log(this.mediaLink);
        console.log(this.jobTypeValue);
        console.log(this.numberOfOpening);
        console.log(this.minQualification);
        console.log(this.certificateRequired);
        console.log(this.coverLetter);
        console.log(this.minimumYear);
        console.log(this.checkboxArray);
        this.GradeRange = this.gradeStarting+'-'+this.gradeEnding;
        console.log(this.GradeRange);
        console.log('description  :' ,this.desc);
         console.log(this.desc.replace( /(<([^>]+)>)/ig, ''));

        this.statusvalue = event.target.dataset.id;
        console.log("status : ", this.statusvalue);
        console.log(this.position);
       

        creatJob({ jobName: this.jobName, startDate: this.startDate, salaryRange:this.SalaryRange,graderange:this.GradeRange, numberOfOpening: this.numberOfOpening, closeDate: this.closeDate, mediaLink: this.mediaLink, jobTypeValue: this.jobTypeValue, minQualification: this.minQualification, certificateRequired: this.certificateRequired, coverLetter: this.coverLetter, minimumYear: this.minimumYear, userId: this.userId, status: this.statusvalue,description:this.desc,curriculumn:this.checkboxArray,position:this.position })
            .then((result) => {
                console.log(result);
                 this.isLoading = true;
                console.log(this.jobPath);
                window.location.href = this.jobPath;
            })
        
        

// cutsom validity -------
console.log('OUTPUT : ',this.template.querySelectorAll('.inputFieldError'));
    let projectCode = this.template.querySelectorAll('.inputFieldError');
let projectCodeSize = projectCode.value;
    //console.log('index value  ' ,event.target.dataset.id);
    console.log('length: ' + projectCode.length);
    projectCode.forEach(currentItem => {
        //TODO : currentItem
        // console.log('OUTPUT : ',this.template.querySelector('[target'));
        // console.log('OUTPUT : ', JSON.stringify(currentItem.value));
        var inputvalue =  JSON.stringify(currentItem.value);
        if (inputvalue == "" || inputvalue == null || inputvalue == undefined || inputvalue < 1) {
      
    }
    currentItem.setCustomValidity("This is a required value");
    currentItem.reportValidity();
       
    });



 //for (let index = 0; index < 3; index++) {
if (projectCode[index].value == "" || projectCode[index].value == null || projectCode[index].value == undefined || projectCode[index].value.length < 1) {
      projectCode[index].setCustomValidity("Please enter the value");
    }
 //}
    // let projectCodeSize = projectCode.value;
    // let size = projectCodeSize.length;
    // if (projectCode.value == "" || projectCode.value == null || projectCode.value == undefined || projectCode.value.length < 1) {
    //   projectCode.setCustomValidity("Please enter the value");
    // }
    // projectCode.reportValidity();
   

    }

    renderedCallback() {
        let style = document.createElement('style');
        style.innerText = '.slds-form-element__label { padding-left: 13px; padding-bottom: 5px !important;color:#848898; font-weight: 400; font-size: 14px;}';
        this.template.querySelector('lightning-combobox').appendChild(style);
    }


    // inputError() {
    //     var areAllvalid = true;
    //     var inputs = this.template.querySelectorAll('.inputFieldError');
    //     try {
    //         inputs.forEach(input => {
    //             if (input.value == "" || input.value == null || input.value == undefined || input.value.length < 1) {
    //                 console.log(input.value);
    //                 console.log("report validity");
    //                 input.reportValidity();
    //                 areAllvalid = false;
    //             }

    //         })
    //     } catch (Exception) {
    //         console.log("An error occurred");
    //     }
    //     return areAllvalid;
    // }

    onClickHandler() {
        var chk = document.getElementById("box").value;
        console.log("chk: " + chk);
    }

    previewInfo(){
        this.previewjob = true;        
    }

    closeModal(){
         this.previewjob = false;
    }
    handleCheckBox(event){
        var chckbox = event.target.name;
        console.log('OUTPUT : ',chckbox);
        console.log('OUTPUT : ',event.target.checked);
        if(event.target.checked){
           this.checkboxArray.push(chckbox);
        }
        else{
            var index = this.checkboxArray.indexOf(chckbox);
            this.checkboxArray.splice(index, 1);
        }
        console.log('checkbox array-=-=-=->>>'+this.checkboxArray);
    }


    CreateSpilitPosition(event){

        if(this.CreateSpilitPositionBoolean){
            this.CreateSpilitPositionBoolean = false;
            event.target.innerText = 'Add More';
            let list = this.comboboxList;
            list.push('1');
            this.comboboxList = [...list];
        }
        else{
            let list = this.comboboxList;
            list.push('1');
            this.comboboxList = [...list];
        }

    }

    Remove(){

        if(this.comboboxList.length==1){
            this.CreateSpilitPositionBoolean = true;
            this.template.querySelector('[data-id="CreateSpilitPosition"]').innerText = 'Create Spilit Position';
            let list = this.comboboxList;
            list.pop();
            this.comboboxList = [...list];
        }
        else{
            let list = this.comboboxList;
            list.pop();
            this.comboboxList = [...list];
        }

    }

}