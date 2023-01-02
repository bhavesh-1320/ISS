public without sharing class favouriteBookmarkController {
     @AuraEnabled
    public Static void candidateFavourite(String candidate,string userId){
        Id contactId = [Select contactId from user where Id = :UserId].contactId;
        Activity_Tracker__c favouritecandidate = new Activity_Tracker__c(Contact__c  = candidate,Current_User__c  =contactId,candidateFavourite__c=true );
        insert favouritecandidate;
      
    }

    @AuraEnabled
    public Static void removeCandidateFavourite(String candidate,string userId){
        Id contactId = [Select contactId from user where Id = :UserId].contactId;
        List<Activity_Tracker__c> favouritecandidate = [Select id from Activity_Tracker__c where candidateFavourite__c=true AND Contact__c = :candidate AND Current_User__c = :contactId limit 1];
     delete favouritecandidate;
    }

    @AuraEnabled
    public static string checkCandidateFavourite(string userId , string candidate){
        Id contactId = [Select contactId from user where Id = :UserId].contactId;
        List<Activity_Tracker__c> checkFav = [Select id from Activity_Tracker__c where Current_User__c = :contactId AND Contact__c = :candidate limit 1];
        
        string returnStr;
        if(checkFav.size() > 0)
        {
          returnStr = 'true';
        }
        else
        {
            returnStr = 'false';
        }
        return returnStr;
        }
    


}