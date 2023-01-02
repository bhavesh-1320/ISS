public without sharing class getProfileData {
    @AuraEnabled(cacheable=true)
    public static userDataWrapper userData(String recordId){
        try {
            System.debug('recordId ' + recordId);
            
            userDataWrapper userData = new userDataWrapper();
            List<User> userList  = [SELECT Id, Name, Email , ContactId , ProfileId from User where Id =: recordId ];
            //List<PermissionSetAssignment> allAssignmentsRecruiter =  [SELECT Id, PermissionSetId, AssigneeId FROM PermissionSetAssignment where AssigneeId = :currentUserId]
            
            String profileName = getProfileController.getProfileName(userList[0].Id);
            System.debug('userList = ' + userList);
            String contactids = userList[0].ContactId;
            
            List<contact> contactUserList =  [select Id, Number_Of_Dependents__c, languagesSpoken__c, OtherAddress, MailingAddress, travellingWithCandidate__c, Citizenships__c, euPassport__c, currentCountryOfResidence__c, countryOfBirth__c, Partner__c, Certification__c, Degree_Conferred__c, Course_Major__c, Degree_In_Education__c, Degree_Type__c, Country__c, Name_Of_Institute__c ,SubscriptionType__c, Subscription_End_Date__c, Name ,SkypeId__c, Instagram__c,Youtube__c,Email, Work_Email__c, Phone,Date_of_Availability__c,Birthdate ,Relationship_Status__c ,Criminal_Record__c, Gender__c FROM contact where id =: contactids];
            System.debug('contact list ' + contactUserList);
            userData.Name = contactUserList[0].Name;
            
            userData.email= contactUserList[0].Email;
            userData.subscriptionType= contactUserList[0].SubscriptionType__c;
            userData.subscriptionEndDate= contactUserList[0].Subscription_End_Date__c;
            
            userData.workEmail = contactUserList[0].Work_Email__c;
            userData.profileName = profileName;
            userData.phone = contactUserList[0].Phone;
            userData.availableDate =contactUserList[0].Date_of_Availability__c;
            userData.relationshipStatus = contactUserList[0].Relationship_Status__c;
            userData.birthdayDate = contactUserList[0].Birthdate;
            userData.gender = contactUserList[0].Gender__c;
            userData.skypeId = contactUserList[0].SkypeId__c;
            userData.criminalRecord = String.valueOf(contactUserList[0].Criminal_Record__c);

            userData.nameOfInstitute= contactUserList[0].Name_Of_Institute__c;
            userData.Country= contactUserList[0].Country__c;
            userData.degreeType= contactUserList[0].Degree_Type__c;
            userData.degreeInEducation= contactUserList[0].Degree_In_Education__c;
            userData.courseMajor= contactUserList[0].Course_Major__c;
            userData.degreeConferred= contactUserList[0].Degree_Conferred__c;
            userData.Partner= contactUserList[0].Partner__c;
            userData.countryOfBirth= contactUserList[0].countryOfBirth__c;
            userData.countryOfResidence= contactUserList[0].currentCountryOfResidence__c;
            userData.euPassport= contactUserList[0].euPassport__c;
            userData.Citizenships= contactUserList[0].Citizenships__c;
            userData.travellingWithCandidate= String.valueOf(contactUserList[0].travellingWithCandidate__c);
            userData.currentAddress= contactUserList[0].OtherAddress;
            userData.permanentAddress= contactUserList[0].MailingAddress;
            userData.languagesSpoken= contactUserList[0].languagesSpoken__c;
            userData.Instagram=contactUserList[0].Instagram__c;
            userData.Youtube=contactUserList[0].Youtube__c;
            userData.numberOfDependents=contactUserList[0].Number_Of_Dependents__c;
            userData.Certification=contactUserList[0].Certification__c;
            

            List<Career_History__c> careerData = [SELECT Id, start_Date__c, Subject__c, Department__c, Name, jobTitle__c, Organization_name__c, Contact__c, end_Date__c, job_Type__c, Country__c, State__c, Curriculums__c FROM Career_History__c where contact__c =:contactids];
            userData.ListCareerHistoryObj = careerData;
            
            List<Degree_Qualification__c> listOfDegree = [SELECT Id, Name, Degree_Type__c, Country__c, Degree_In_Education__c, Start_Date__c, End_Date__c, Degree_Conferred__c, Major__c, Institute_Name__c, Contact__c FROM Degree_Qualification__c where contact__c  =: contactids];
            userData.listOfDegreeQualificaitons = listOfDegree;
            
            List<contact> fatchChildContact = [SELECT Id, Name,Email,Phone, Parent_Contact__c, Birthdate, Gender__c, contact.Relationship_Status__c FROM Contact where parent_contact__c =:contactids];
            userData.listOfChildContact = fatchChildContact;   
            
            List<reference__c > listOfReference = [SELECT Id, Start_Date__c, End_Date__c, Reference_Date__c, Status__c, Email__c, Refer_To__c, Name FROM Reference__c where Refer_to__c =:contactids];
            userData.listOfReferenceData = listOfReference;
            
            
            
            
            
            System.debug('userData - ' + userData);
            
            
            
            
            return userData ;
            
        } catch (Exception e) {
            //return null;
            throw new AuraHandledException(e.getMessage() + 'line ' + e.getLineNumber());
        }
    }
    
    
    public class userDataWrapper {


        @AuraEnabled public string nameOfInstitute{get;set;}
        @AuraEnabled public string Country{get;set;}
        @AuraEnabled public string degreeType{get;set;}
        @AuraEnabled public string degreeInEducation{get;set;}
        @AuraEnabled public string courseMajor{get;set;}
        @AuraEnabled public string degreeConferred{get;set;}
        @AuraEnabled public string Partner{get;set;}
        @AuraEnabled public string countryOfBirth{get;set;}
        @AuraEnabled public string countryOfResidence{get;set;}
        @AuraEnabled public string euPassport{get;set;}
        @AuraEnabled public string Citizenships{get;set;}
        @AuraEnabled public String travellingWithCandidate{get;set;}
        @AuraEnabled public Address currentAddress{get;set;}
        @AuraEnabled public Address permanentAddress{get;set;}
        @AuraEnabled public String languagesSpoken{get;set;}
        @AuraEnabled public String Instagram{get;set;}
        @AuraEnabled public String Youtube{get;set;}
        @AuraEnabled public String Certification{get;set;}
        @AuraEnabled public Decimal numberOfDependents{get;set;}
        

        @AuraEnabled public string Name{get;set;}
        @AuraEnabled public string profileName{get;set;}
        @AuraEnabled public date subscriptionEndDate{get;set;} 
        @AuraEnabled public string gender{get;set;} 
        @AuraEnabled public String email {get;set;}
        @AuraEnabled public String subscriptionType {get;set;}
        @AuraEnabled public String workEmail {get;set;}
        @AuraEnabled public String skypeId {get;set;}
        @AuraEnabled public String phone {get;set;}
        @AuraEnabled public Date availableDate {get;set;}
        @AuraEnabled public string relationshipStatus {get;set;}
        @AuraEnabled public Date birthdayDate {get;set;}
        @AuraEnabled public String criminalRecord {get;set;}
        @AuraEnabled public List<Career_History__c> ListCareerHistoryObj {get;set;} 
        @AuraEnabled public List<Degree_Qualification__c> listOfDegreeQualificaitons {get;set;} 
        @AuraEnabled public List<contact> listOfChildContact{get;set;}
        @AuraEnabled public List<reference__c> listOfReferenceData{get;set;}
        //Public string personalEmail {get;set}
        
    }
    
}