public class paymentStripe{
    
    @AuraEnabled(cacheable=true)
    public static List<Coupon_Code__c> couponCodes(){
        //Id userID=UserInfo.getUserId();
        //User ConId= [Select ContactId from user where Id=:userID];
        //Id recordId=ConId.ContactId;
        
        List<Coupon_Code__c> cCodes = [Select Coupon_Code__c,Amount__c,Expiry_Date__c from Coupon_Code__c];
        return cCodes;
    }
    
    @Auraenabled(cacheable=false)
    public static void upgradeUser(){
        Id userID=UserInfo.getUserId();
       User ConId= [Select ContactId from user where Id=:userID];
       Id rcdId=ConId.ContactId;
       Contact ct = [Select  id, SubscriptionType__c, Subscription_End_Date__c from contact where id=:rcdId];
       ct.SubscriptionType__c ='Premium';
       ct.Subscription_End_Date__c = System.today().addYears(1);
       update ct;
    }
    
    @AuraEnabled(cacheable=false)
    public static String main(string cardEmail, decimal amount, decimal cardNo, integer expMonth, integer expYear, integer cvvNo, String NameCard, String zipCode, String countryName){
        Id userID=UserInfo.getUserId();
        User ConId= [Select ContactId from user where Id=:userID];
        Id rcdId=ConId.ContactId;
        //0035g00000mAmatAAC
        
        
        Contact checkContactInfo = [Select Email,MobilePhone,FirstName, LastName,Description,Country__c,stripeCustomerId__c from Contact where id=:rcdId];
        String customerEmail = checkContactInfo.Email;
        if(customerEmail.contains('+')){
            customerEmail = customerEmail.remove('+');/*;
            List<String> newMail = customerEmail.split('+');
            customerEmail ='';
            for(integer i=0; i<newMail.size(); i++){
                customerEmail+=i;
            }*/
        }
        String customerPhone = checkContactInfo.MobilePhone;
        String customerName = checkContactInfo.FirstName +' '+ checkContactInfo.LastName;
        String customerDescription = checkContactInfo.Description;
        String customerCountry = checkContactInfo.Country__c;
        string CustomerId;
        string PaymentMethodID;
        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
       String accessToken = 'sk_test_51M5UhLKzjXv6LswkJ36VE7AY0ZgpP5ldyzJNMNZnMaRePWMcTtY70iA9BPsiOIpP4uAETb5Yqqt7o32cCboETlhM00jIvpXmCt';
        //String accessToken = '';

          if(checkContactInfo.stripeCustomerId__c == null){
            //customer create:-
            
            request.setMethod('POST');
            request.setEndpoint('https://api.stripe.com/v1/customers');
            request.setHeader('Content-Type','application/x-www-form-urlencoded');
            request.setHeader('Authorization','Bearer '+accessToken );
            String Customerjson ='name='+customerName+'&email='+customerEmail+'&description='+customerDescription+'&phone='+customerPhone;
            System.debug('Customer JSON Object'+Customerjson);
            request.setBody(Customerjson);
            HttpResponse response = new HttpResponse();
            try {
                response = http.send(request);
                String responseBody = response.getBody();
                //system.debug(responseBody);
                System.debug('response -->'+responseBody);
                Map<string,Object> mapOfCustomer = (Map<string,object>)json.deserializeUntyped(responseBody);
                CustomerId = (string)mapOfCustomer.get('id');
                checkContactInfo.stripeCustomerId__c = CustomerId;
                checkContactInfo.Stripe_Customer__c = 'https://dashboard.stripe.com/test/customers/'+CustomerId;
                
                system.debug(CustomerId);
            } catch(System.CalloutException e) {
                System.debug('Callout error: '+ e);
                System.debug(response.toString());
                
            }
        }else{
            CustomerId = checkContactInfo.stripeCustomerId__c;
        }
        
        
        
        //PaymentMethod Callout
        request.setEndpoint('https://api.stripe.com/v1/payment_methods');
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.setHeader('Authorization','Bearer '+accessToken);
        string PaymentMethodbody= 'type =card'+'&card[number]='+cardNo+'&card[exp_month]='+expMonth+'&card[exp_year]='+expYear+'&card[cvc]='+cvvNo;
        System.debug('paymentmethodjson JSON Object'+PaymentMethodbody);
        request.setBody(PaymentMethodbody);
        HttpResponse response1 = new HttpResponse();
        try{
            response1 = http.send(request);
            String responseBody1 = response1.getBody();
            // system.debug(responseBody1);
            map<string,object> result1 =(map<string,object>)JSON.deserializeUntyped(responseBody1);
            PaymentMethodID = (string)result1.get('id');
            system.debug(PaymentMethodID);
        }
        catch(System.CalloutException e) {
            System.debug('Callout error: '+ e.getMessage());
        }
        //Payment intent callout:-
        request.setEndpoint('https://api.stripe.com/v1/payment_intents');
        request.setMethod('POST');
        request.setHeader('Content-Type','application/x-www-form-urlencoded');
        request.setHeader('Authorization','Bearer '+accessToken);
        
        String PaymentIntentbody ='amount='+amount+'&confirm='+'true'+'&currency='+'USD'+'&payment_method_types[]='+'card'+'&customer='+CustomerId+'&payment_method='+PaymentMethodID+'&description='+'Payment For Premium Membership';
        System.debug('Paymentintent JSON Object'+PaymentIntentbody);
        request.setBody(PaymentIntentbody);
        HttpResponse response2 = new HttpResponse();
        try{
            response2 = http.send(request);
            system.debug(response2);
            String responseBodyy = response2.getBody();
            map<string,object> result2 =(map<string,object>)JSON.deserializeUntyped(responseBodyy);
            string PaymentIntentID = (string)result2.get('id');
            system.debug(PaymentIntentID);
            
            
            update checkContactInfo;
            //amount = String.valueOf(amount);
            String totalamount = String.valueOf(amount);
            totalamount = totalamount.substring(0,2);
            Integer finalamount = Integer.valueOf(totalamount);
            Payment_Transaction__c newPay = new Payment_Transaction__c(Contact__c=rcdId,Description__c='Premium Membership Payment',Amount__c=finalamount,Payment_Transaction_Id__c=PaymentIntentID);
            insert newPay;
            return PaymentIntentID;
            
            
        }
        catch(System.CalloutException e) {
            System.debug('Callout error: '+ e.getMessage());
            return e.getMessage();
            
        }
        
        
        
    }
}