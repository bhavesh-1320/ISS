public without sharing  class candidateHelpers {
    public static void sendEmailsToRoles(List<Candidate_Roles__c> dataOfroles){
        List<String> ids = new List<String>();
        List<Candidate_Roles__c> updateCandidateRoles = new List<candidate_roles__c>();
        String encryptedValue ;
        Blob encry;
        for(Candidate_Roles__c cr : dataofroles){
            ids.add(cr.id);
            Blob data = Blob.valueof(cr.Id);
            Blob encryptionKey = crypto.generateAeskey(128);
            Blob initVector = Blob.valueOf('bPmSgVkYp4s6v9t$');
            Blob encryptedData = Crypto.encrypt('AES128', encryptionkey, initVector, data);
            encry = encryptedData;
            encryptedValue = EncodingUtil.Base64Encode(encryptedData);
            System.debug('encru' +encryptedValue);
            
        }
                
        List<String> emails = new List<String>();
        List<Candidate_Roles__c> emailList = [SELECT Id, School__c, Contact__r.email, contact__r.Name, school__r.Name , roles__c FROM Candidate_Roles__c where Id IN:ids];
        for(Candidate_Roles__c cr : emailList){
            emails.add(cr.Contact__r.Email);
            updateCandidateRoles.add(new candidate_roles__c(Id = cr.id , encryptedId__c = EncodingUtil.base64Encode(encry),Roles__c = 'Recruiter Requested'));
            //, Work_Email__c = cr.contact__r.name.deleteWhitespace() +'@'+cr.school__r.name.deleteWhitespace()+ '.com')
        }
        update updateCandidateRoles;
		
        System.debug('contact Email ' + emails);
        
        Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
        message.toAddresses = new String[emails];
        //String url= 'https://internationalschoolsservices--dev.sandbox.preview.salesforce-experience.com/s/recruiter-approve';
        message.subject = 'Welcome to ISS - School';
        String communityUrl = Site.getBaseUrl();
        message.setPlainTextBody('Verification From ISS.' + 'https://internationalschoolsservices--dev.sandbox.my.site.com/s/recruiter-approve?language=en_US&key='+encryptedValue);
        Messaging.SingleEmailMessage[] messages =  new List<Messaging.SingleEmailMessage> {message};
            Messaging.SendEmailResult[] results = Messaging.sendEmail(messages);
        if (results[0].success) {
            System.debug('The email was sent successfully.');
        } else {
            System.debug('The email failed to send: '
                         + results[0].errors[0].message);
        }
        
    }
    
    @auraEnabled
    public static   String updateRoleField(String encrptedData ){
        system.debug('encrpted Data ' + encrptedData );
        List<Candidate_Roles__c> updateroles = new List<Candidate_Roles__c>();
        String customerVarification = 'Not verified'; 
            List<Candidate_Roles__c> searchData = [SELECT Id, Roles__c, encryptedId__c FROM Candidate_Roles__c where encryptedId__c = :encrptedData];
            system.debug('search data ' + searchData);
            if(searchData.size() > 0 ){
                 
                   
                for(candidate_roles__c cr : searchData){
                	//updateroles.add(new candidate_roles__c( id = cr.id , Roles__c = 'Recruiter Approve'));
                    cr.Roles__c = 'Recruiter Approve' ; 
            	   	customerVarification = 'Verified';
                }
            }
            	update searchData;      
            
        
        return customerVarification;        
    }
}