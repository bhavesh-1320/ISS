public class CalloutClass 
{
   @AuraEnabled(cacheable=true)
     public static List < customValueWrapper > pickListValueDynamically(sObject customObjInfo, string selectPicklistApi) {
        Schema.DescribeSObjectResult objDescribe = customObjInfo.getSObjectType().getDescribe();     
        map < String, Schema.SObjectField > customFieldMap = objDescribe.fields.getMap();      
        list < Schema.PicklistEntry > custPickValues = customFieldMap.get(selectPicklistApi).getDescribe().getPickListValues();
        list < customValueWrapper > customObjWrapper = new list < customValueWrapper > ();
        for (Schema.PicklistEntry myCustPick: custPickValues) {
          customValueWrapper selectOptionValueWrapper = new customValueWrapper();
             selectOptionValueWrapper.custFldlabel = myCustPick.getLabel();
             selectOptionValueWrapper.custFldvalue = myCustPick.getValue();
            customObjWrapper.add(selectOptionValueWrapper);
        }
        
        return customObjWrapper;
  
      }
    
      // wrapper class 
        public with sharing class customValueWrapper {
          @auraEnabled public string custFldlabel {get;set;}
          @auraEnabled public string custFldvalue {get;set;}
        }
    
    
    @AuraEnabled
    public static String affindaResumeParser(ID contentDocumentID)
    {
        ContentVersion getContentVersion=[SELECT Id, VersionData,Title, ContentDocument.ParentId FROM ContentVersion where ContentDocumentId=:contentDocumentID LIMIT 1];
        
        Http h = new Http();
        
        // Instantiate a new HTTP request, specify the method (POST) as well as the endpoint
        HttpRequest req = new HttpRequest();
        req.setEndpoint( 'https://api.affinda.com/v2/resumes' );
        String authorizationHeader = 'Bearer 10b4a593dbaf09a2eaec04196d8faabd10ee65a5';
        req.setHeader('Authorization', authorizationHeader);
        req.setHeader('Content-Type', HttpFormBuilder.GetContentType());
        req.setMethod('POST');
        
        // Generate form body
        String body = '';
        body += HttpFormBuilder.WriteBoundary();
        body += HttpFormBuilder.WriteBodyParameter('file', EncodingUtil.base64Encode(getContentVersion.VersionData));
        body += HttpFormBuilder.WriteBoundary(HttpFormBuilder.EndingType.CrLf);
        
        Blob formBlob = EncodingUtil.base64Decode(body);
        
        req.setHeader('Content-Length', String.valueOf(formBlob.size()));
        System.debug('body->'+body);
        req.setBodyAsBlob(formBlob);
        
        // Send the request, and return a response
        HttpResponse res = h.send(req);
        System.debug(res.getBody());
        Delete [Select Id from ContentDocument where id=:contentDocumentID];
        return res.getBody();
        
    }
    
    @AuraEnabled(cacheable=false)
    public static void updateRecords(boolean fpage, boolean spage, boolean tpage, string recordData){
        //Id userID=UserInfo.getUserId();
        //User ConId= [Select ContactId from user where Id=:userID];
        //Id recordId=ConId.ContactId;
        Id recordId = '0035g00000mAmatAAC';
        Contact loginContact = [Select id,name from contact where id=:recordId];
        
        Map<string,Object> mapOfCustomer = (Map<string,object>)json.deserializeUntyped(recordData);
        if(fpage){
            Map<string,object> records = (Map<string,object>)mapOfCustomer.get('firstpage');
            String firstname = (String)records.get('first');
            String lastname = (String)records.get('last');
            String cityname = (String)records.get('city');
            String email = (String)records.get('email');
            String country = (String)records.get('country');
            String linkedin = (String)records.get('linkedin');
            String phone = (String)records.get('phone');
            String postalCode = (String)records.get('postalCode');
            String state = (String)records.get('state');     
            String dob = (String)records.get('dob');
            String street = (String)records.get('street');
            String title = (String)records.get('title');
            String add1 = (String)records.get('add1');
            String add2 = (String)records.get('add2');
            loginContact.FirstName = firstname;
            loginContact.LastName = lastname;
            loginContact.MailingCity = cityname;
            loginContact.Email = email;
            loginContact.MailingCountry = country;
            loginContact.LinkedIn__c  = linkedin;
            loginContact.MobilePhone = phone;
            loginContact.MailingPostalCode  = postalCode;
            loginContact.MailingState  = state;
            if(dob!=null && dob!=''){
                
                dob = dob.substring(5,7)+'/'+dob.substring(8,10)+'/'+dob.substring(0,4);
                
                
                loginContact.Birthdate  = date.parse(dob);
            }else{
                loginContact.Birthdate = null;
            }
            
            loginContact.MailingStreet  = street;
            loginContact.Title = title;
            //loginContact.MailingAddress  = add1;
            //loginContact.MailingAddress  = add2;
            update loginContact;
            
            //System.debug('firstname-->'+firstname);
        }
        if(sPage){
            List<object> records2 = (List<object>)mapOfCustomer.get('secondpage');
            List<Education_History__c> myHistory = new List<Education_History__c>();  
            for(integer i=0;i<records2.size();i++){
                Map<String,Object> mapOfCareer = (Map<String,object>)(records2[i]);
                String institution = (String)mapOfCareer.get('institution');
                String country = (String)mapOfCareer.get('country');
                String enddate = (String)mapOfCareer.get('end');
                String major = (String)mapOfCareer.get('major');
                String start = (String)mapOfCareer.get('start');
                String tyle = (String)mapOfCareer.get('tyle');
                //String major = (String)mapOfCareer.get('major');
                Education_History__c c = new Education_History__c(Contact__c=recordId,Institution__c=institution,Country__c=country,
                                                                  Major__c=major,tyle__c=tyle);
                
                if(start!=null && start!=''){
                    start = start.substring(5,7)+'/'+start.substring(8,10)+'/'+start.substring(0,4);
                    
                    c.start_Date__c = date.parse(start);
                }else{
                    c.start_Date__c = null;
                }
                if(enddate!=null && enddate!=''){
                    enddate = enddate.substring(5,7)+'/'+enddate.substring(8,10)+'/'+enddate.substring(0,4);
                    c.end_Date__c = date.parse(enddate);
                }else{
                    c.end_Date__c = null;
                }
                myHistory.add(c);
                
            }
            
            List<Education_History__c> oldRecords = [Select id from Education_History__c where contact__c=:recordId];
            delete oldRecords;
            
            insert myHistory;
        }
        
        if(tPage){
            List<object> records3 = (List<object>)mapOfCustomer.get('thirdpage');
            
            List<Career_History__c> myHistory = new List<Career_History__c>();
            for(integer i=0;i<records3.size();i++){
                Map<String,Object> mapOfCareer = (Map<String,object>)(records3[i]);
                
                
                system.debug('Total Career Histroy-->'+i);
                String country = (String)mapOfCareer.get('country');
                //String countryCareer = (String)mapOfCareer.get('countryCareer');
                String curriculum = (String)mapOfCareer.get('curriculum');
                String enddate = (String)mapOfCareer.get('end');
                
                
                String jobTitle = (String)mapOfCareer.get('jobTitle');
                String organization = (String)mapOfCareer.get('organization');
                String start = (String)mapOfCareer.get('start');
                
                
                String state = (String)mapOfCareer.get('state');
                String stateCareer = (String)mapOfCareer.get('stateCareer');     
                String subject= (String)mapOfCareer.get('subject');
                
                Career_History__c c = new Career_History__c(Contact__c=recordId,Curriculums__c=curriculum,jobTitle__c=jobTitle,
                                                            Organization_name__c=organization,State__c=state,country__c=country,job_type__c=stateCareer);
                //System.debug('start length-->'+ start.length());
                if(start!=null && start!=''){
                    start = start.substring(5,7)+'/'+start.substring(8,10)+'/'+start.substring(0,4);
                    c.start_Date__c = date.parse(start);
                }else{
                    c.start_Date__c = null;
                }
                if(enddate!=null && start!=''){
                    enddate = enddate.substring(5,7)+'/'+enddate.substring(8,10)+'/'+enddate.substring(0,4);
                    c.end_Date__c = date.parse(enddate);
                }else{
                    c.end_Date__c = null;
                }
                
                
                myHistory.add(c);
                
                
            }
            List<Career_History__c> oldRecords = [Select id from Career_History__c where contact__c=:recordId];
            delete oldRecords;
            
            insert myHistory;
        }
        
        
        
        
        
        
        
        
        
    }
}