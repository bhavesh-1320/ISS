import { LightningElement,track } from 'lwc';
import roboto from '@salesforce/resourceUrl/roboto';
import chargeUsingStripe from '@salesforce/apex/paymentStripe.main';
import couponCodes from '@salesforce/apex/paymentStripe.couponCodes';
import upgradeUser from '@salesforce/apex/paymentStripe.upgradeUser';

import testimonialIcon from '@salesforce/resourceUrl/testimonialIcon';
import successIcn  from '@salesforce/resourceUrl/successIcon';
import basepath from '@salesforce/community/basePath';



export default class PaymentPage extends LightningElement {

    vectorIcon = testimonialIcon;
    paymentFirstPage = true;
    paymentSecondPage = false;
    successIcon = successIcn;
    communityPath = basepath;
    paymentPage = this.communityPath + '/profile';
    spin = false;
    paymentSuccess = false;
    
    errorMessage = '';
    couponCodetrue = false;
    couponCodeFalse = false;
    paymentFailed = false;
    totalPrice = 75
    appliedCode;
    cardMonth;
    cardYear = 20;
    paymentDetailRequired = false;

    @track record = {Amount:'75',CurrencyCode:'INR',Cvv:'',Name:'',cardNumber:'',email:'',zip:''};

    
    renderedCallback() {

        try{

            if (window.innerWidth < 1024) {
                // console.log('in try')

                this.template.querySelector('.card1').classList.remove('slds-m-right--small');
                this.template.querySelector('.card2').classList.remove('slds-m-left--small');
                this.template.querySelector('.main').classList.remove('slds-m-right--small');
                // console.log(this.template.querySelector('.card').classList());

                // this.template.querySelector('.card').classList.remove('');

                this.template.querySelector('.inputArea').classList.remove('slds-m-right--large', 'slds-m-left--large');
                this.template.querySelector('.amountArea').classList.remove('slds-m-right--large', 'slds-m-left--large');
                this.template.querySelector('accessArea').classList.remove('slds-m-right--large', 'slds-m-left--large');


            }
        }
        catch{

        }

    }

    applyNow(){
        this.totalPrice = 75;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        // document.write(today);
        console.log('today-->',today)
        couponCodes().then(res=>{
            console.log('res-->',res)
            for(let i=0;i<res.length;i++){
                if(res[i].Coupon_Code__c == this.appliedCode && res[i].Expiry_Date__c > today){
                    // console.log('successfully applied');
                    this.totalPrice = this.totalPrice - res[i].Amount__c
                    this.couponCodetrue = true
                    this.couponCodeFalse = false;
                    this.template.querySelector('.applyBtn').style.display='none';
                    this.template.querySelector('.removeBtn').style.display='block';
                    this.template.querySelector('.inputCoupon').disabled = true;


                }else{
                    // console.log('in the else')
                    this.couponCodeFalse = true;
                    this.couponCodetrue = false
                }

            }
        }).catch(err=>{
            console.log('err-->',err)
            
        })

        

        // this.paymentSecondPage = true;
        
    }

    getAccessNow(){
        this.paymentFirstPage = false;
        this.couponCodetrue = false;
        this.couponCodefalse = true;

    }

    removeNow(){
        this.couponCodetrue = false;
        this.couponCodefalse = false;
        this.totalPrice = 75;
        this.template.querySelector('.applyBtn').style.display='block';
        
        this.template.querySelector('.removeBtn').style.display='none';
        this.template.querySelector('.inputCoupon').disabled=false;
        this.template.querySelector('.inputCoupon').value='';

    }

    couponValue(event){
        this.appliedCode = event.target.value
        console.log('this.appliedCode-->',this.appliedCode);
    }



    handleChange(event){

        
        if(event.target.name=='expiry'){
            let data = event.target.value
            if(data.length==2 && event.code!="Backspace"){
                // console.log('event-->',event);
                // console.log('data.->',data)
                this.template.querySelector('.expiryInput').value = data+'/' 
                console.log('data.length->',data.length)
                this.cardMonth = data.substring(0,2)
                
                // console.log('this.cardMonth-->',this.cardMonth)
            }else if(data.length==3 && event.code=="Backspace"){

                this.template.querySelector('.expiryInput').value = data.substring(0,2);
                console.log('data.length->',data.length)

                // console.log('data.length-<',data.length)
                // console.log('data-<',data)

                // this.template.querySelector('.expiryInput').value. = data.slice(0,-1);
            }else if(data.length>3){
                this.cardYear = 20
                this.cardYear = this.cardYear+ data.substring(3,5)
                console.log('this.cardYear-->',this.cardYear)

            }
            // else if(data.length<3 && data.length>1){
            //     this.template.querySelector('.expiryInput').value = data+'/' 
            // }
            // console.log(event.target.value.length)
            // event.target.value = event.target.value+'/'
            
        }

        // if(event.target.name =='expiry'){
        //     let data = event.target.value
        //     console.log('data-->',data)
        //     this.cardMonth = data.substring(0,2)
        //     // console.log('data month-->',data.substring(0,2))
        //     this.cardYear = data.substring(2,4)
        //     // this.record['Month'] =  
        // }
        else if(event.target.name =='email'){
            var mail = event.target.value
            var email = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;

            if (mail.match(email))
            {
                // this.invalidEmail = false
                this.paymentDetailRequired = false;
                this.record[event.target.name] = event.target.value;
            }
            else
            {
                // this.invalidEmail = true
                this.paymentDetailRequired = true
                this.errorMessage =  'Please provide a valid email address';
            }
        }
        else{
            
            this.record[event.target.name] = event.target.value;
        
            console.log('this.record[event.target.name]-->',event.target.name)
            console.log('event.target.value-->',event.target.value)
        }

        


        console.log('record-->',this.record)
    }

    checkLength(event){
        if(event.target.name =='Cvv' && event.target.value.length>3){
                
            event.target.value = event.target.value.slice(0,3);
        }else if(event.target.name =='cardNumber' && event.target.value.length>16){
            event.target.value = event.target.value.slice(0,16);
            
        }
        // else if(event.target.name =='expiry' && event.target.value.length>5){
        //     event.target.value = event.target.value.slice(0,5);
            
        // }
    }

    handleCharge(){
        this.error = null;
        let isValid = this.validityCheck();

        if(this.record.Amount =='' || this.record.CurrencyCode == '' || this.record.Cvv== '', this.record.Name=='',this.record.cardNumber=='',this.record.email=='',this.record.zip==''){
            this.errorMessage = 'Please fill all the fields '
            this.paymentDetailRequired = true;
            // this.paymentSuccess = false;
        }else{
            this.paymentDetailRequired = false;
            // this.paymentSuccess = true;
            
            
            if(isValid) {
                 let cardYear = parseInt(this.cardYear);
                 let cardNumber = parseInt(this.record.cardNumber)
                 this.spin = true;
                //  this.totalPrice = parseInt(this.totalPrice+'00');
                 let totalPayment= parseInt(this.totalPrice+'00');

                chargeUsingStripe({cardEmail : this.record.email, amount:totalPayment, cardNo:cardNumber, expMonth:this.cardMonth, expYear:cardYear, cvvNo:this.record.Cvv, NameCard:this.record.Name, zipCode:this.record.zip,countryName:'United States'})
                .then(result=>{
                    console.log('result-->',result)
                    if(result!=null){
                        this.spin = false
    
                        this.paymentSuccess = true;
                        this.paymentFailed = false
    
                        upgradeUser().then(res=>{
                            console.log('res==>',res);
                        }).catch(e=>{
                            console.log('error==>',e);
                        })
            
                        console.log('line 203')
                        window.location.replace(this.communityPath + '/profile');
                        //this.record.email=''
                    }else{
                        this.spin = false
                        this.paymentFailed = true;
                        this.paymentSuccess = false;
                    }
                    
                    
                    
                })
                .catch(error=>{
                    // this.error = error;
                    this.spin = false;
                    console.log('error-->',error)
                    // this.showNotification(error, 'error', 'ERROR');
    
                })
            }
        }


    }

    closeModal(){
        this.paymentSuccess = false;
        this.paymentFailed = false;

    }


    validityCheck(){
        let validity;
            let elements = Array.from(this.template.querySelectorAll('[data-id =checkValidity]'));
                if(elements!= undefined &&
                    elements!=null) {
                    validity =  elements.reduce((validSoFar,inputcmp) => {
                        inputcmp.reportValidity();
                        return validSoFar && inputcmp.checkValidity();
                    },true );
                }
        return validity;
    }

}