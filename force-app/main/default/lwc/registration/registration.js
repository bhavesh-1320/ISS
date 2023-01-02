import { LightningElement } from 'lwc';
import input from '@salesforce/resourceUrl/input'
import { loadStyle } from 'lightning/platformResourceLoader';
import candidateregistration from '@salesforce/resourceUrl/candidateRegistration';
import issLogo from '@salesforce/resourceUrl/issLogo'; 
import recruiterHomePage from '@salesforce/resourceUrl/recruiterHomePage'
import 	footerLogo from '@salesforce/resourceUrl/footerLogo';
import 	twitterLogo from '@salesforce/resourceUrl/twitterLogo';
import linkedinFooter from '@salesforce/resourceUrl/linkedinFooter';
import 	facebookFooter from '@salesforce/resourceUrl/facebookFooter';
import createCandidate from '@salesforce/apex/createCandidateController.createCandidate';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import basepath from '@salesforce/community/basePath';
import bgImage from '@salesforce/resourceUrl/bgImage';
import loginScrennIcons from '@salesforce/resourceUrl/loginScrennIcons';

export default class Registration extends LightningElement {

   loginPage = basepath;
  firstNameValue='';
  lastNameValue='';
  emailvalue='';
  errorBoolean=false;
  submitMessage='';
    showpassword = false
    candiateFlag = true;
    schoolrecruiterFlag = false;


     	twitterLogo = 	twitterLogo;
     	footerLogo = 	footerLogo
     linkedinFooter = linkedinFooter
     	facebookFooter = facebookFooter
    candidateregistrationLogo = candidateregistration;
    issLogo = issLogo;

    edurecruit = loginScrennIcons + '/loginScrennIcons/edurecruit.png';
    finance = loginScrennIcons + '/loginScrennIcons/finance.png';
    learn = loginScrennIcons + '/loginScrennIcons/Group447.png';
    marketPlace = loginScrennIcons + '/loginScrennIcons/marketPlace.png';
    optimize = loginScrennIcons + '/loginScrennIcons/optimize.png';
    bgImage = bgImage;
    hideUI = false ;
    
handleToggleIconname(){
   this.showpassword = !this.showpassword
}

schoolRecruiterButton(){
  let btn1 = this.template.querySelector('[data-id="schoolRecruiter"]');
  btn1.style.color = '#46a39d'
  let btn2 = this.template.querySelector('[data-id="candidateanchor"]')
  btn2.style.color = '#7e8083'
  btn2.style.borderBottom= 'none '
  let btn3 = this.template.querySelector('[data-id="candidate"]');
  btn3.style.borderBottom= 'none'
   btn1.style.borderBottom= ' 2px solid #46a39d'
  this.candiateFlag = false;
  this.schoolrecruiterFlag=true;
  this.candidateregistrationLogo='';
  this.candidateregistrationLogo = recruiterHomePage;
}


firstNameValueChange(event){
  console.log(event.target.value);
  this.firstNameValue = event.target.value;
}
lastNameValueChange(event){
console.log(event.target.value);
  this.lastNameValue = event.target.value;
}
emailvalueChange(event){
console.log(event.target.value);
  this.emailvalue = event.target.value;
}
submitCandidateData(){
  if(this.firstNameValue == '' || this.lastNameValue == '' || this.emailvalue == ''){
    this.errorBoolean = true;
    this.submitMessage = 'Please enter all the required fields.'
  }
  createCandidate({firstName: this.firstNameValue, lastName: this.lastNameValue ,emailValue: this.emailvalue}).then((result)=>{
    console.log(result);
    
   
    this.showToast(result);
    if (result=='Thank you for registering. Your account has been created successfully and an email has been sent to you to complete the registration process.') {
       this.submitMessage = result;
       this.hideUI = true;
       this.errorBoolean = true;
      // this.submitMessage = result;
    }else {
      this.errorBoolean = true;
      this.submitMessage = result;
    }
  

  }).catch((e)=>{
console.log('error-=-=',e);
  })

}
connectedCallback() {
  loadStyle(this,input).then(()=>{
    console.log("style loaded successfully");
  }).catch(error=>{
    console.log('error-=-=->>',error);
  })
 

  //code
}

dataPrivacy(){
  window.open("https://www.iss.edu/who-we-are/privacy", "_blank");
}

showToast(result) {
    const event = new ShowToastEvent({
        
        message: result,
        variant: 'success',
        mode: 'dismissable'
    });
    this.dispatchEvent(event);
}

renderedCallback(){
  console.log('line46')
    let windowHeight = window.innerHeight;
    console.log('window height -- > ',window.innerHeight);
  // let btn1 = this.template.querySelector('[data-id="candidateanchor"]');
  // btn1.style.color = '#46a39d'
 
  // let btn3 = this.template.querySelector('[data-id="candidate"]');
  // btn3.style.borderBottom= ' 2px solid #46a39d'
  // let btn2 = this.template.querySelector('[data-id="schoolRecruiter"]')
  // btn2.style.color = '#7e8083'
  // btn2.style.borderBottom= 'none '
  if(window.innerWidth>1024){

    this.template.querySelector('.loginFunctionlity').style.height = `${windowHeight-139}px`;
    console.log('line 140');
    this.template.querySelector('.backgroundImg').style.height = `${windowHeight-111+24}px`;
  }
  if(window.innerWidth<1400){

    this.template.querySelector('.firstNameField').style.height = '36px'
    this.template.querySelector('.lastNameField').style.height = '36px'
    this.template.querySelector('.emailField').style.height = '36px'
    this.template.querySelector('.btn').style.height = '36px'
  }
}

get passwordIcon(){
  return this.showpassword ? 'utility:hide':'utility:preview'
}
get passwordType(){
  return this.showpassword ? 'text':'password'
}

}