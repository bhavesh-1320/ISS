import { LightningElement, track } from 'lwc';
import input from '@salesforce/resourceUrl/input'
import { NavigationMixin } from "lightning/navigation";
import doLogin from '@salesforce/apex/CustomLoginController.doLogin'
import { loadStyle } from 'lightning/platformResourceLoader';
import candidateregistration from '@salesforce/resourceUrl/candidateRegistration';
import issLogo from '@salesforce/resourceUrl/issLogo';
import footerLogo from '@salesforce/resourceUrl/footerLogo';
import twitterLogo from '@salesforce/resourceUrl/twitterLogo';
import linkedinFooter from '@salesforce/resourceUrl/linkedinFooter';
import facebookFooter from '@salesforce/resourceUrl/facebookFooter';
import bgImage from '@salesforce/resourceUrl/bgImage';
import basepath from '@salesforce/community/basePath';
import loginScrennIcons from '@salesforce/resourceUrl/loginScrennIcons';


export default class LoginPage extends NavigationMixin(LightningElement) {

    jobPath = basepath + '/SelfRegister';
    forgotPath = basepath + '/ForgotPassword';
    //jobPath = basepath + '/login/SelfRegister';

  showpassword = false
  largeScreen  = true;

  username='';
  password='';
  errorMessage='';
  errorBoolean = false;
  bgImage = bgImage;
  twitterLogo = twitterLogo;
  footerLogo = footerLogo
  linkedinFooter = linkedinFooter
  facebookFooter = facebookFooter
  candidateregistrationLogo = candidateregistration;
  issLogo = issLogo;

  edurecruit = loginScrennIcons + '/loginScrennIcons/edurecruit.png';
  finance = loginScrennIcons + '/loginScrennIcons/finance.png';
  learn = loginScrennIcons + '/loginScrennIcons/Group447.png';
  marketPlace = loginScrennIcons + '/loginScrennIcons/marketPlace.png';
  optimize = loginScrennIcons + '/loginScrennIcons/optimize.png';


  
  checkKey(event){
    // console.log('console..',event.keyCode)
    // console.log('console..',event.target.value)
  if(event.keyCode==13){
    this.login();
  }
  }
  renderedCallback(){
    console.log('line46')
    let windowHeight = window.innerHeight;
    console.log('window height -- > ',window.innerHeight);
    if(window.innerWidth>1024){

      this.template.querySelector('.loginFunctionlity').style.height = `${windowHeight-139}px`;
      this.template.querySelector('.backgroundImg').style.height = `${windowHeight-111+24}px`;
    }

    if(window.innerWidth<1400 && window.innerWidth>1024){
      this.template.querySelector('.backgroundImg').style.height = `${windowHeight-111+9}px`;
      this.template.querySelector('.welcomeIss').style.fontSize = '30px';

      this.template.querySelector('.createAccount').style.height = '36px';
      this.template.querySelector('.signInBtn').style.height = '36px';
      this.template.querySelector('.login-text').style.fontSize = '20px';
      // this.templ;ate.querySelector('.login-text').style.fontSize = '20px';
      this.template.querySelector('.emailInput').style.height = '36px';
      this.template.querySelector('.createAccount').style.fontSize = '11px';
      this.template.querySelector('.imgOptimize').style.display = 'none';
      this.template.querySelector('.imgFinance').style.display = 'none';
      this.template.querySelector('.footer').style.padding = '10px 86px 10px 86px';

      this.template.querySelector('.passwordInput').style.height = '36px';
      this.template.querySelector('.frgtPaas').style.fontSize = '12px';
      this.template.querySelector('.lgnTxt').style.fontSize = '18px';
      // this.template.querySelector('.customerSupport').style.fontSize = '14px';
      this.template.querySelector('label').style.fontSize = '12px';
      console.log('into innerwidth')
      this.template.querySelector('.customerSupport').style.fontSize = '12px';
      this.template.querySelector('.describeIss').style.fontSize = '16px';
      this.template.querySelector('.btn').style.fontSize = '11px';
      this.template.querySelector('.dataPrivacytxt').style.fontSize = '12px';
      this.template.querySelector('.footerCopyright').style.fontSize = '12px';
      this.template.querySelector('.errMsg').style.fontSize = '12px';
      console.log('line 75')

    }

    if(window.innerWidth<1024){
      this.largeScreen = false;
      this.template.querySelector('.backgroundImgMobile').style.height = `${windowHeight-111}px`;
      // this.template.querySelector('.loginFunctionlityMobile').style.height = `${windowHeight-139}px`;

    }

    
  }

  handleToggleIconname() {
    this.showpassword = !this.showpassword
  }

  login() {
    if(this.password=='' ||  this.username == ''){
      this.errorBoolean = true;
      this.errorMessage = 'Please fill all the required fields.'
    }
    else{

      doLogin({ username: this.username, password: this.password })
        .then((result) => {
          console.log({ result });
          if (result=='Blacklisted'){
            console.log(this.errorMessage);

            console.log('line 38')
            this.errorMessage = 'There was an issue in logging into your account. Please contact the ISS team for more information.'
            this.errorBoolean = true;
            console.log('line 41')
            console.log(this.errorMessage);
            
          }else if (result=='Username or Password is incorrect'){
            console.log(this.errorMessage);

            console.log('line 38')
            this.errorMessage = 'Username or Password is incorrect';
            this.errorBoolean = true;
            console.log('line 41')
            console.log(this.errorMessage);
            
          } else{

            window.location.replace(result);
          }

        }).catch((error) => {
            this.errorBoolean = true;
          
          if(error.body.message == 'List has no rows for assignment to SObject'){
              this.errorMessage = 'Your login attempt has failed. Make sure the username and password are correct.';
          }
          if(error.body.message == 'List has more than 1 row for assignment to SObject'){
            this.errorMessage = 'please fill the email field ';
          }else{
            this.errorMessage = error.body.message;
          }
          this.template.querySelector('.login-text').style.marginBottom = '0px';
          console.log({ error });
        })
    }
  }
    connectedCallback() {
    loadStyle(this, input).then(() => {
      console.log("style loaded successfully");
    }).catch(error => {

      console.log('error-=-=->>', error);
    })
    //code
  }
  
  usernameValue(event) {
    console.log({ event });
    console.log(event.target.value);
    this.username = event.target.value;
  }

  supportPage(){
    window.open("https://www.iss.edu/contact", "_blank");
  }
  dataPrivacy(){
    window.open("https://www.iss.edu/who-we-are/privacy", "_blank");
  }

  passwordValue(event) {
    console.log({ event });
    console.log(event.target.value);
    this.password = event.target.value;
  }
  get passwordIcon() {
    return this.showpassword ? 'utility:hide' : 'utility:preview'
  }
  get passwordType() {
    return this.showpassword ? 'text' : 'password'
  }

  handleNavigate(result) {
    const config = {
      type: 'standard__webPage',
      attributes: {
          url: 'http://salesforce.com'
      }
	};
    this[NavigationMixin.Navigate](config);
  }
}