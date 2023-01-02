public without sharing class createCandidateController {
    
    @AuraEnabled
    public static string createCandidate(String firstName, String lastName, string emailValue){
        system.debug(firstName);
        system.debug(lastName);
        system.debug(emailValue);
        try{
            user ut = [Select id, email, contactId from user where Username=:emailValue];
            
            
            Id cId = ut.contactId;
            Contact ct = [Select id, blacklisted__c from contact where id=:cId];
            
            
                if(ct.blacklisted__c)
                {
                    return 'There was an issue in logging into your account. Please contact the ISS team for more information.';
                    
                }
                else{
                    return 'This email address is already registered for an account';
                }
                
            
            
        }catch(exception e){
            List <Account> ac =[SELECT Name, Id FROM Account where Name ='EDUrecruit' LIMIT 1];
            Contact candidateContact = new Contact();
            candidateContact.FirstName = firstName;
            candidateContact.LastName = lastName;
            candidateContact.Email = emailValue;
            candidateContact.RecordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Candidate').getRecordTypeId();
            candidateContact.AccountId = ac[0].Id;
            candidateContact.SubscriptionType__c = 'Trial';
            Insert candidateContact;
            return 'Thank you for registering. Your account has been created successfully and an email has been sent to you to complete the registration process.';
        }
        
        
        
        // List<Contact> lst = [Select id from Contact where email =:emailValue ];
        
        
        
    }
    
    
}