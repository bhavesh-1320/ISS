public without sharing class candidateJobs {
     public class jobWrapper{
        @AuraEnabled public List<Job__c> listOfJobs {get;set;}
        @AuraEnabled public List<String > listOfOpenJobs {get;set;}
        
    }
    public class jobWrapperDetails{
        @AuraEnabled public List<Job__c> listOfJobDetails {get;set;}
    }



    @AuraEnabled(cacheable= true)
    public static jobWrapper getJobs(){
        try {
            //***** this code for show all the jobs in UI*********//
            jobWrapper  jobWrapperObj = new jobWrapper();
            System.debug('wire called form lwc');
            List<Job__c> fatchJobs = [SELECT Id, Salary_Range__c,Minimum_Qualification__c , school__r.name,Country__c,Grade_Range__c , Organization__c, CreatedDate  , Job_Description__c, Job_Type__c, 
             Number_Of_Openings__c, Job_Role_Start_Date__c, Minimum_experience__c, Certification_Required__c, Cover_letter__c, Media_Link__c, Curriculum__c, Education_Level__c, Department__c, Job_Category__c, Job_Position__c, Name ,( select Id , Name from Candidate_jobs__r) FROM Job__c order by createdDate Desc ];
            System.debug('fatch jobs ' + fatchJobs);
            jobWrapperObj.listOfJobs = fatchJobs;
            
            // ********* this Code for View Open Jobs filter ***** 
            // 
            List<String> lstPickvals=new List<String>();
            Schema.SObjectType targetType = Schema.getGlobalDescribe().get('Job__c');//From the Object Api name retrieving the SObject
            Sobject Object_name = targetType.newSObject();
            Schema.sObjectType sobject_type = Object_name.getSObjectType(); //grab the sobject that was passed
            Schema.DescribeSObjectResult sobject_describe = sobject_type.getDescribe(); //describe the sobject
            Map<String, Schema.SObjectField> field_map = sobject_describe.fields.getMap(); //get a map of fields for the passed sobject
            List<Schema.PicklistEntry> pick_list_values = field_map.get('Job_Position__c').getDescribe().getPickListValues(); //grab the list of picklist values for 
            for (Schema.PicklistEntry a : pick_list_values) { //for all values in the picklist list
            lstPickvals.add(a.getValue());//add the value  to our final list
           }
                jobWrapperObj.listOfOpenJobs = lstPickvals;
            return jobWrapperObj;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static Job__c getFullDetails(String recordId){
        try {
                jobWrapperDetails  jobWrapperDetailsObj = new jobWrapperDetails();
                System.debug('recordId ' + recordId );
                List<Job__c> jobDetails = [SELECT Id,Salary_Range__c,Minimum_Qualification__c , school__r.name,Country__c,Grade_Range__c , Organization__c, CreatedDate  , Job_Description__c, Job_Type__c, Number_Of_Openings__c, Job_Role_Start_Date__c, Certification_Required__c, Cover_letter__c, Media_Link__c, Curriculum__c, Education_Level__c, Department__c, Job_Category__c, Job_Position__c, Name FROM Job__c where Id =: recordId LIMIT 1];
                System.debug('List Of Job details ' + jobDetails);
                Job__c jobdetailsValues = jobDetails[0];
                //jobWrapperDetailsObj.listOfJobDetails = jobDetails;
                //return jobWrapperDetailsObj;
                return jobdetailsValues;
            } 
            catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static list<Job__c> getAccountData(String searchfields) {
        //searchfields = (searchfields + '%');
        list<Job__c> accLst = [SELECT Id, Salary_Range__c,Minimum_Qualification__c, Education_Level__c , school__r.name,Country__c,Grade_Range__c , Organization__c, Name From Job__c WHERE Name LIKE :( '%'+ searchfields + '%')];
        System.debug('acclist' + accLst);
        if(accLst.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }
        return accLst; 
    }
    @AuraEnabled
    public static List<Job__c> getDataOnRoles(String role){
        try {
            list<Job__c> posiLst = [SELECT Id,Salary_Range__c,Minimum_Qualification__c, school__r.name, Country__c,Grade_Range__c , Organization__c, CreatedDate  , Job_Description__c, Job_Type__c, Number_Of_Openings__c, Job_Role_Start_Date__c, Minimum_experience__c, Certification_Required__c, Cover_letter__c, Media_Link__c, Curriculum__c, Education_Level__c, Department__c, Job_Category__c, Job_Position__c, Name FROM Job__c WHERE Job_Position__c =: role ]; 
            return posiLst;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
   
}