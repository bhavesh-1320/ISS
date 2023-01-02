import { LightningElement } from 'lwc';

import candidateregistration from '@salesforce/resourceUrl/candidateRegistration';
import issLogo from '@salesforce/resourceUrl/issLogo';
import footerLogo from '@salesforce/resourceUrl/footerLogo';

import { NavigationMixin } from 'lightning/navigation';
import twitterLogo from '@salesforce/resourceUrl/twitterLogo';
import linkedinFooter from '@salesforce/resourceUrl/linkedinFooter';
import facebookFooter from '@salesforce/resourceUrl/facebookFooter';
import resetPassword from '@salesforce/apex/ForgotPasswordController.testForgotPasswordController';
import basepath from '@salesforce/community/basePath';
import bgImage from '@salesforce/resourceUrl/bgImage';
import loginScrennIcons from '@salesforce/resourceUrl/loginScrennIcons';
export default class ForgotResestPassword extends NavigationMixin (LightningElement) {
    
    twitterLogo = twitterLogo;
    emailValue = '';
    forgotPassswordPage = true;
    emailInputField = true;
    confirmEmailValue = '';
    footerLogo = footerLogo
    linkedinFooter = linkedinFooter
    facebookFooter = facebookFooter
    candidateregistrationLogo = candidateregistration;

    edurecruit = loginScrennIcons + '/loginScrennIcons/edurecruit.png';
    finance = loginScrennIcons + '/loginScrennIcons/finance.png';
    learn = loginScrennIcons + '/loginScrennIcons/Group447.png';
    marketPlace = loginScrennIcons + '/loginScrennIcons/marketPlace.png';
    optimize = loginScrennIcons + '/loginScrennIcons/optimize.png';
    bgImage = bgImage;
    issLogo = issLogo;
    loginPage = basepath;
    errorBoolean = false;
    errorMessage ;


    checkKey(event){
    // console.log('console..',event.keyCode)
    // console.log('console..',event.target.value)
    if(event.keyCode==13){
        this.sendEmail();
  }
  }
    
    dataPrivacy(){
    window.open("https://www.iss.edu/who-we-are/privacy", "_blank");
  }
    
    emailvalue(event) {
        console.log(event.target.value);

        this.emailValue = event.target.value;
    }

    supportPage(){
    window.open("https://www.iss.edu/contact", "_blank");
  }

    renderedCallback(){
        console.log('line46')
    let windowHeight = window.innerHeight;
    console.log('window height -- > ',window.innerHeight);
    if(window.innerWidth>1024){

      this.template.querySelector('.loginFunctionlity').style.height = `${windowHeight-139}px`;
      this.template.querySelector('.backgroundImg').style.height = `${windowHeight-111+24}px`;
    }

        if(window.innerWidth<1400){
            console.log('line 52')
            this.template.querySelector('.emailInput').style.height = '36px';
            // this.template.querySelector('.confirmEmailInput').style.height = '36px';
            this.template.querySelector('.btn').style.height = '36px';
            console.log('line 55')
            this.template.querySelector('.login-text').style.fontSize = '20px';
            this.template.querySelector('.customerSupport').style.fontSize = '14px';
            this.template.querySelector('.backToSign').style.fontSize = '14px';
            this.template.querySelector('.errMsg').style.fontSize = '14px';



        }
    
        
      }
    
    confirmEmailvalue(event) {
        this.confirmEmailValue = event.target.value
    }

//     reset(){
//         resetPassword({email:this.emailValue}).then((result)=>{
//   console.log(result);
//         })  
//     }
    sendEmail(){
        if(this.emailValue ==''){
            this.errorMessage = 'Please enter email address.'
            this.errorBoolean = true
        }
        else{

            console.log('called');
            this.forgotPassswordPage = false;
            this.emailInputField = false;

            this.errorBoolean = true
            this.template.querySelector('.loginFunctionlity').style.alignContent = 'center';
            // this.template.querySelector('.loginFunctionlity').classlist.add('slds-align--absolute-center');

            this.errorMessage = "Check your email for instructions on resetting your password. Remember to look in your spam folder, where automated messages sometimes filter. If you still can't log in, contact your administrator.";


            resetPassword({userEmail:this.emailValue}).then(result=>{
                console.log(result);
                    })  
        }
    }
    eventhandler() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/apex/vf page name'
            }
        })
    }
}