public without sharing class  iFairRecordController {
     @AuraEnabled(cacheable = true)
    public static List<Ifair__c> getData(){
        
        List<Ifair__c> ifairDetails = [SELECT Id, Name, IFair_Start_Date__c, Registration_Last_Date__c, IFair_Close_Date__c, Fair_Code__c, Description__c FROM Ifair__c];
        return ifairDetails;
    }
    @AuraEnabled
    public static Ifair__c getChildData(String childId){
        system.debug(childId);
        List<Ifair__c> childRecordlst = [SELECT Id, Name, IFair_Start_Date__c, Registration_Last_Date__c, IFair_Close_Date__c, Fair_Code__c, Description__c FROM Ifair__c where Id =:childId LIMIT 1];
       system.debug(childRecordlst);
        return childRecordlst[0];
    }

    @AuraEnabled
    public static List<Ifair__c> iFairSearch(String searchValue){
        list<Ifair__c> acclist = new List<Ifair__c>();
        try {
            string tempInput = '%' + searchValue + '%';
            list<Ifair__c> accLst = [SELECT Id, Name, IFair_Start_Date__c, Registration_Last_Date__c, IFair_Close_Date__c, Fair_Code__c, Description__c FROM Ifair__c  WHERE Name LIKE :tempInput];
            System.debug('acclist' + accLst);
            if(accLst.isEmpty()) {
                throw new AuraHandledException('No Record Found..');
            }
            return accLst; 
        } catch (Exception e) {
            System.debug('no record ' + e.getMessage());
        }
        
        return accList; 
    }
  

}