public without sharing  class getUserInfo {
    @AuraEnabled(cacheable=true)
    public static List<contact>  userDetailes(String recordId ){
        System.debug('recordId '+ recordId);
        List<User> userDetail = [SELECT id , name , profileId  , contactid  FROM User where Id =: recordId];
        String contactId  = userDetail[0].contactId;
        System.debug('contact Id '+ contactId);
        List<contact> contactDetails = [SELECT Id, AccountId,account.Name, LastName, FirstName, RecordTypeId FROM Contact where Id =: contactId];
        System.debug('Contact Details'+contactDetails);

        return contactDetails;
    }
}