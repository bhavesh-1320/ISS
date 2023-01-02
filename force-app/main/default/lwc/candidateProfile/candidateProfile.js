import { LightningElement, track, wire } from 'lwc';
import profileData from '@salesforce/apex/getProfileData.userData';
import editIcon from '@salesforce/resourceUrl/editIcon';
import cancel from '@salesforce/resourceUrl/cancel';
import bellICon from '@salesforce/resourceUrl/bellICon';
import deleteIcon from '@salesforce/resourceUrl/deleteIcon';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import upgrade from '@salesforce/resourceUrl/upgrade';
import fileIcon from '@salesforce/resourceUrl/fileIcon';
import basepath from '@salesforce/community/basePath';
import uploadIcon from '@salesforce/resourceUrl/uploadIcon';
import facebook from '@salesforce/resourceUrl/Facebook';
import youtube from '@salesforce/resourceUrl/Youtube';
import instagram from '@salesforce/resourceUrl/Instagram';
import Id from '@salesforce/user/Id';
import pickListValueDynamically from '@salesforce/apex/CalloutClass.pickListValueDynamically';
export default class CandidateProfile extends LightningElement {
    instagram = instagram;
    youtube = youtube;
    facebook = facebook;
    userId = Id;
    upgrade = upgrade;
    editicon = editIcon;
    paymentSectionVisibility = true;
    pagiNation = '1 Of 3';
    showPag = false;
    communityPath = basepath;
    paymentPage = this.communityPath + '/payment';
    cancel = cancel;
    careerHistoryFound = false;
    childContactFound = false;
    referenceDataFound = false;
    degreeFound = false;
    premiumPlan = true;
    bellICon = bellICon;
    deleteIcon = deleteIcon;
    uploadIcon = uploadIcon;
    fileIcon = fileIcon;
    showResume = false;
    fPage = false;
    sPage = false;
    tPage = false;
    resumeData;
    savefirstpage = false
    savesecondpage = false;
    languagesFound = false;
    showRecordPage = false;
    // savethirdpage = false;
    savedPages = { 'firstpage': false, 'secondpage': false, 'thirdpage': false };
    @track userBasicData = {};
    @track careerHistory = [];
    @track languagesSpokenList = [];
    @track degreeQualification = [];
    @track externalProfileList = [];
    chidlContacts = [];
    referenceList = [];
    changeTheData = false;
    firstPage = false;
    educationCountryValues;
    workExps=[];
    countryCareerValues;
    education=[];


    // @track externalProfile = [{Name:'John Smithson',Url:''},{Name: 'Video Smithson', Url:''}, {Name:'John_007', Url:''}];

    getRecordData(event) {
        //    console.log('event-->',event)
        this.resumeData = JSON.parse(JSON.stringify(event.detail))

        //    console.log('OUTPUT : ',JSON.parse(JSON.stringify(this.resumeData)));
    }

    @wire(pickListValueDynamically, {customObjInfo: {'sobjectType' : 'Career_History__c'},
    selectPicklistApi: 'Country__c'}) 
    selectTargetValue({data,error}){
        if(data){
            this.countryCareerValues = data;
            console.log('data 41-->',data);
        }if(error){
            console.log('error');
        }
    }

    @wire(pickListValueDynamically, {customObjInfo: {'sobjectType' : 'Education_History__c'},
    selectPicklistApi: 'Country__c'}) 
    selectTargetValues({data,error}){
        if(data){
            this.educationCountryValues = data;
            console.log('data 52-->',data);
        }if(error){
            console.log('error');
        }
    }

    @wire(profileData, { recordId: '$userId' })
    wiredAccount({ error, data }) {
        if (data) {

            // console.log('data');
            this.userBasicData = data;
            //getting languages
            if(this.userBasicData.languagesSpoken) {
                let lang = this.userBasicData.languagesSpoken.split(',');
                console.log('languages',lang[0]);
                lang.forEach((a=> {
                    console.log(a);
                    let keyValue = a.split(':');
                    this.languagesSpokenList.push({key:keyValue[0],value:keyValue[1]});
                }))
            }
            if(this.languagesSpokenList.length>0) {
                this.languagesFound = true;
            }
            console.log('line65',this.userBasicData);

            let youtube = this.userBasicData.Youtube.split('/');
            this.externalProfileList.push({name:youtube[3],url:this.userBasicData.Youtube,img:this.youtube})
            let instagram = this.userBasicData.Instagram.split('/');
            this.externalProfileList.push({name:instagram[3],url:this.userBasicData.Instagram,img:this.instagram})
            console.log(JSON.stringify(this.externalProfileList));

            if (this.userBasicData.profileName == 'Candidate') {
                this.paymentSectionVisibility = true;
                    console.log('lone 69')
                if (this.userBasicData.subscriptionType == 'Free' || this.userBasicData.subscriptionType == 'Trial') {
                    this.premiumPlan = true
                } else {
                    this.premiumPlan = false;
                }
            }

            // console.log('without string' ,data);
            let ccareerHistory = [];
            ccareerHistory = data.ListCareerHistoryObj;
            this.careerHistory = ccareerHistory;
            console.log('this.careerHistory -->', this.careerHistory);
            if (this.careerHistory.length == 0) {
                this.careerHistoryFound = false;
            } else {
                this.careerHistoryFound = true;
            }
            this.degreeQualification = data.listOfDegreeQualificaitons;
            if (this.degreeQualification.length == 0) {
                this.degreeFound = false
            } else {
                this.degreeFound = true;
            }
            this.chidlContacts = data.listOfChildContact;
            if(this.chidlContacts.length==0){
                this.childContactFound=false;
            }else{
                this.childContactFound = true;
            }
            this.referenceList = data.listOfReferenceData;
            if(this.referenceList.length==0){
                this.referenceDataFound = false;
            }else{
                this.referenceDataFound = true;
            }
            // console.log('coming the data ', this.careerHistory );


        } else if (error) {
            console.log(error);
        }
        //    console.log('thru');
    }


    test() {
        // console.log('button is clicked');
    }
    handlePageChange() {
        this.fPage = true;
        this.showPag = true;
    }
    handleShowResume(event) {

        if (this.showResume) {
            if (event.target.name == 'closebottom') {
                this.savedPages.thirdpage = false;
                this.savedPages.firstpage = this.savefirstpage;
                this.savedPages.secondpage = this.savesecondpage;
                this.template.querySelector('c-resume-parser').saveData(this.savedPages, this.resumeData);
                this.showResume = false;
                this.fPage = false;
                this.pagiNation = '1 Of 3';
                this.sPage = false;
                this.tPage = false;
                this.showPag = false;

            } else {
                this.showResume = false;
                this.fPage = false;
                this.pagiNation = '1 Of 3';
                this.sPage = false;
                this.tPage = false;
                this.showPag = false;
            }




        } else this.showResume = true;
    }
    /* handleNext( event ){
         var l = event.target.dataset.btn;
         console.log('LL:', l);
         if( l == 'one' ){
             this.sPage = true;
             this.tPage = false;
             this.fPage = false;
         }else if( l == 'two' ){
             this.sPage = false;
             this.tPage = true;
             this.fPage = false;
         }
     } */
    handleNext(event) {
        // console.log('-->',event.target.classList);
        var l = event.target.dataset.btn;
        // console.log('LL:', l);
        if (l == 'one') {
            if (event.target.name == 'skip') {
                this.savefirstpage = false;
            }
            else {
                this.savefirstpage = true;
            }
            l = 'tw';
            /* this.sPage = true;
            this.tPage = false;
            this.fPage = false; */
        } else if (l == 'two') {
            if (event.target.name == 'skip') {
                this.savesecondpage = false;
            }
            else {
                this.savesecondpage = true;
            }
            l = 'thr';
            /* this.sPage = false;
            this.tPage = true;
            this.fPage = false; */
        }
        if (l == 'on') {
            this.pagiNation = '1 Of 3';
            this.removeAllClasses();

            this.template.querySelector('.fBtn').classList.add('fillColor');
            this.template.querySelector('.twBtn').classList.add('grayColor');
            this.template.querySelector('.thrBtn').classList.add('grayColor');

            this.sPage = false;
            this.tPage = false;
            this.fPage = true;
        } else if (l == 'tw') {
            this.pagiNation = '2 Of 3';
            this.removeAllClasses();

            this.template.querySelector('.twBtn').classList.add('fillColor');
            this.template.querySelector('.fBtn').classList.add('blueColor');
            this.template.querySelector('.thrBtn').classList.add('grayColor');

            this.sPage = true;
            this.tPage = false;
            this.fPage = false;
        } else if (l == 'thr') {
            this.pagiNation = '3 Of 3';
            this.removeAllClasses();

            this.template.querySelector('.thrBtn').classList.add('fillColor');
            this.template.querySelector('.twBtn').classList.add('blueColor');
            this.template.querySelector('.fBtn').classList.add('blueColor');

            this.sPage = false;
            this.tPage = true;
            this.fPage = false;
        }


    }
    // testMethod(){
    //     console.log('test clicked')
    //    console.log('OUTPUT : ',this.template.querySelector('c-resume-parser')); 
    //     console.log('classes-->',
    //     this.template.querySelector('.saved-resume-data').classList()

    //     )
    // }
    saveResumeParser() {
        console.log('in the save resume parser')
        this.showResume = false;
        this.sPage = false;
        this.tPage = false;
        this.showPag = false;
        this.fPage = false
        this.pagiNation = '1 Of 3';
        this.showRecordPage = false;
        // console.log('fpage-->',this.savefirstpage)
        // console.log('spage-->',this.savesecondpage)
        this.savedPages.thirdpage = true
        this.savedPages.firstpage = this.savefirstpage;
        this.savedPages.secondpage = this.savesecondpage;
        // this.savedPages["firstpage"] = this.savefirstpage;
        // console.log('savedPage-->',this.savedPages);
        // this.handleShowResume();
        this.template.querySelector('c-resume-parser').saveData(this.savedPages, this.resumeData);
        this.showSuccessToast();

    }

    showSuccessToast() {
        const evt = new ShowToastEvent({
            title: '',
            message: 'Record Updated Successfully',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }




    removeAllClasses() {
        this.template.querySelector('.fBtn').classList.remove('blueColor');
        this.template.querySelector('.fBtn').classList.remove('grayColor');
        this.template.querySelector('.fBtn').classList.remove('fillColor');

        this.template.querySelector('.twBtn').classList.remove('blueColor');
        this.template.querySelector('.twBtn').classList.remove('grayColor');
        this.template.querySelector('.twBtn').classList.remove('fillColor');

        this.template.querySelector('.thrBtn').classList.remove('blueColor');
        this.template.querySelector('.thrBtn').classList.remove('grayColor');
        this.template.querySelector('.thrBtn').classList.remove('fillColor');
    }

    makeModalTrue()
    {
        console.log('editButton');
        this.showRecordPage = true;
        this.fPage = true;
        this.showPag = true;
    }

    closeShowRecord()
    {
        console.log('closeBUtton');
        this.showRecordPage = false;
        this.fPage = false;
        this.sPage = false;
        this.tPage = false;
        this.showPag = false;
    }

    handleChange(event){

        if(event.target.name =='firstname'){
            this.userData.first = event.target.value
        }
        else if(event.target.name=='lastname'){
            this.userData.last = event.target.value
        }
        else if(event.target.name=='title'){
            this.userData.title = event.target.value
        }
        else if(event.target.name=='email'){
            this.userData.email = event.target.value
        }
        else if(event.target.name=='phone'){
            this.userData.phone = event.target.value
        }
        else if(event.target.name=='dob'){
            // this.userData.dob = event.target.value.substring(5,7)+'/'+event.target.value.substring(8,10)+'/'+event.target.value.substring(0,4)
            this.userData.dob = event.target.value;
        }
        else if(event.target.name=='lndprofile'){
            this.userData.linkedin = event.target.value
        }
        else if(event.target.name=='city'){
            this.userData.city = event.target.value
        }
        else if(event.target.name=='state'){
            this.userData.state = event.target.value
        }
        else if(event.target.name=='country'){
            this.userData.country = event.target.value
        }
        else if(event.target.name=='postalcode'){
            this.userData.postalCode = event.target.value
        }
        else if(event.target.name=='add1' || event.target.name=='checkbox-toggle-16' || event.target.name=='checkbox-toggle-17' || event.target.name=='add2'){
            this.userData[event.target.name] = event.target.value
        }
        else if(event.target.name == 'institution'){
            this.education[event.target.dataset.idx].institution = event.target.value;
        }
        else if(event.target.name == 'countryEdu'){
            this.education[event.target.dataset.idx].country = event.target.value;
        }
        else if(event.target.name == 'tyle'){
            this.education[event.target.dataset.idx]['tyle'] = event.target.value;
        }
        else if(event.target.name == 'major'){
            this.education[event.target.dataset.idx]['major'] = event.target.value;
        }
        else if(event.target.name == 'start'){
            this.education[event.target.dataset.idx].start = event.target.value;
        }
        else if(event.target.name == 'end'){
            this.education[event.target.dataset.idx].end = event.target.value;
        }
        else if(event.target.name == 'checkbox-toggle-19'){
            this.education[event.target.dataset.idx]['checkboxdegree'] = event.target.value;
        }
        else if(event.target.name == 'checkbox-toggle-20'){
            this.education[event.target.dataset.idx]['checkboxedu'] = event.target.value;
        }

        // Third Page 
        else if(event.target.name == 'startcareer'){
            // this.workExps[event.target.dataset.idx].start = event.target.value.substring(5,7)+'/'+event.target.value.substring(8,10)+'/'+event.target.value.substring(0,4);
            this.workExps[event.target.dataset.idx].start = event.target.value
        }
        else if(event.target.name == 'endcareer'){
            // this.workExps[event.target.dataset.idx].end = event.target.value.substring(5,7)+'/'+event.target.value.substring(8,10)+'/'+event.target.value.substring(0,4);
            this.workExps[event.target.dataset.idx].end = event.target.value;
        }
        else if(event.target.name == 'organization'){
            this.workExps[event.target.dataset.idx].organization = event.target.value;
        }
        else if(event.target.name == 'jobTitle'){
            this.workExps[event.target.dataset.idx].jobTitle = event.target.value;
        }
        else if(event.target.name == 'curriculum'){
            this.workExps[event.target.dataset.idx]['curriculum'] = event.target.value;
        }
        else if(event.target.name == 'jobtype'){
            this.workExps[event.target.dataset.idx]['jobtype'] = event.target.value;
        }
        else if(event.target.name == 'subject'){
            this.workExps[event.target.dataset.idx]['subject'] = event.target.value;
        }
        else if(event.target.name == 'countryCareer'){
            console.log('event.target.value-->',event.target.value);
            this.template.querySelector('.noneField').disabled = true;
            this.workExps[event.target.dataset.idx].country = event.target.value;
        }
        else if(event.target.name == 'stateCareer'){
            this.workExps[event.target.dataset.idx].state = event.target.value;
        }



        this.recordData.firstpage = this.userData;
        this.recordData.secondpage = this.education;
        this.recordData.thirdpage = this.workExps;
        console.log('recordData.check -->',this.recordData);

        const rcdData = new CustomEvent( 'getrecorddata',{detail:this.recordData} );
        this.dispatchEvent( rcdData );

        // console.log('event-->',event);
        // console.log('event name-->',event.target.name);


        
    }

    handleAdd( event ){
        var btn = event.target.dataset.btn;
        if( btn == 'Career' ){
            var workExp = this.workExps.slice();
            workExp.push( {organization:'',
                country:'',
                state:'',
                start:'',
                end:'',
                jobTitle:''} );
            this.workExps = workExp;
            this.recordData.thirdpage = this.workExps
        }else{
            var ed = this.education.slice();
            ed.push( {institution:'',
                country:'',
                state:'',
                start:'',
                end:'',
                jobTitle:''} );
            this.education = ed;
            this.recordData.secondpage = this.education;
        }
        const rcdData = new CustomEvent( 'getrecorddata',{detail:this.recordData} );
        this.dispatchEvent( rcdData );
    }

    handleDel( event ){
        var ic = event.target.dataset.ic;
        var idx = event.target.dataset.idx;
        if( ic == 'Edu' ){
            var ed = this.education.slice();
            ed.splice( idx, 1 );
            this.education = ed;
            this.recordData.secondpage = this.education;
        }else{
            var ed = this.workExps.slice();
            ed.splice( idx, 1 );
            this.workExps = ed;
            this.recordData.thirdpage = this.workExps;
        }

        const rcdData = new CustomEvent( 'getrecorddata',{detail:this.recordData} );
        this.dispatchEvent( rcdData );
    }

    /*
     [
         {
             "url": "https://xyz.com",
             "username": "username",
             "png-icon": staticResourcePath 
         }
     ]
    */
}