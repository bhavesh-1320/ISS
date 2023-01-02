public without sharing class  getProfileController {
    
    @AuraEnabled(cacheable=true)
    public static Contact getProfilepList(String recordId){
      /** Map<String, String> nmap = new Map<String, String>();
        List<User> userDetail = [SELECT id , name FROM User where Id =: recordId];
        List<Profile> PROFILE = [SELECT Id, Name FROM Profile WHERE Id=:userinfo.getProfileId() LIMIT 1];
        String MyProfileName = PROFILE[0].Name;
        String MyUserName = userDetail[0].Name;
        System.debug('profile:'+MyProfileName );
        nmap.put(MyUserName,MyProfileName);
        return nmap;  **/
        Id conId = [Select contactId from user where Id=:recordId].contactId;
        Contact con = [Select firstName, lastName from Contact where id=:conId];
        Contact schoolList = new Contact();
        schoolList.firstName = con.firstName;
            schoolList.lastName = con.lastName;
      return schoolList;
        //return fullName;
        
    }
    
    @AuraEnabled(cacheable=true)
    public static string getUnreadMessageCount(){

        list<Contact> Con = [Select id,name,Account.Name from contact];
        //string userId = [SELECT Id, ContactId FROM User WHERE Id =: UserInfo.getUserId()].ContactId;
        string userId = '0035g00000kqtEAAAY';
        Integer count = 10;
        List<SMS_Message__c> allMessgaes = [Select Sender_ID__c, Receiver_IDs__c, Message_Time__c, Content__c , IsRead__c from SMS_Message__c WHERE Receiver_IDs__c = :userId AND IsRead__c = false Order By CreatedDate DESC];
        // integer messageFound = 0;
        //  for(SMS_Message__c msg : allMessgaes ){
        //      if( msg.Receiver_IDs__c.contains(userId) && msg.IsRead__c == false){
        //          count++;
        //      }
        //     }
        
     
        return String.valueOf(allMessgaes.size());
    }

    @AuraEnabled
    public static string assignPermissionSet(string permissonSetName,String currentUserId)
    {

        string returningStr = 'false';
        
        Id recruiterPermissionSetId = [SELECT Id, Name FROM PermissionSet where Name = 'ISS_Recruiter'].Id;
        Id candidatePermissionSetId = [SELECT Id, Name FROM PermissionSet where Name = 'ISS_Candidate'].Id;

        if(permissonSetName == 'candidate')
        {
            List<PermissionSetAssignment> oldAssignment = [SELECT Id, PermissionSetId, AssigneeId FROM PermissionSetAssignment where permissionSetId = :candidatePermissionSetId  AND AssigneeId = :currentUserId];
            if(oldAssignment.size() > 0)
            {
                delete oldAssignment;
            }

            PermissionSetAssignment newAssignment = new PermissionSetAssignment(PermissionSetId = recruiterPermissionSetId , AssigneeId = currentUserId );
            insert newAssignment;
            returningStr = 'true';
        }
        else {
            if(permissonSetName == 'recruiter')
            {
                List<PermissionSetAssignment> oldAssignment = [SELECT Id, PermissionSetId, AssigneeId FROM PermissionSetAssignment where permissionSetId = :recruiterPermissionSetId  AND AssigneeId = :currentUserId];
                if(oldAssignment.size() > 0)
                {
                    delete oldAssignment;
                }

                PermissionSetAssignment newAssignment = new PermissionSetAssignment(PermissionSetId = candidatePermissionSetId , AssigneeId = currentUserId );
                insert newAssignment;
                returningStr = 'true';
            }
        }

        return returningStr;
    }

    @AuraEnabled(cacheable=true)
    public static string getProfileName(String currentUserId)
    {
        Id recruiterPermissionSetId = [SELECT Id, Name FROM PermissionSet where Name = 'ISS_Recruiter'].Id;
        Id candidatePermissionSetId = [SELECT Id, Name FROM PermissionSet where Name = 'ISS_Candidate'].Id;

        string toReturn = '';

        List<PermissionSetAssignment> allAssignmentsRecruiter = [SELECT Id, PermissionSetId, AssigneeId FROM PermissionSetAssignment where permissionSetId = :recruiterPermissionSetId  AND AssigneeId = :currentUserId];

        if(allAssignmentsRecruiter.size() > 0)
        {
            toReturn = 'Recruiter';
        }
        else
        {
            List<PermissionSetAssignment> allAssignmentsCandidate = [SELECT Id, PermissionSetId, AssigneeId FROM PermissionSetAssignment where permissionSetId = :candidatePermissionSetId  AND AssigneeId = :currentUserId];
            if(allAssignmentsCandidate.size() > 0)
            {
                toReturn = 'Candidate';
            }
        }

        return toReturn;
    }

    @AuraEnabled
    public static string checkCandidateRoleStatus(string currentUserId){
        user currentUser = [Select Name , Contact.Id from User where Id = :currentUserId];
        string statusActive = 'false';
        List<Candidate_Roles__c> allContactRoles = [Select Roles__c from Candidate_Roles__c where Contact__c = :currentUser.Contact.Id];
        for(Candidate_Roles__c role : allContactRoles)
        {
            if(role.Roles__c == 'Recruiter Approve')
            {
                statusActive = 'true';
            }
        }
        return statusActive;
    }

    @AuraEnabled
    public static list<account> fetchSchoolsForRecruiters(string currentUserId){
        Id currentContactId = [Select contactId from user where Id = :currentUserId].contactId;
        List<Candidate_Roles__c> CandidateRoles = [SELECT Id, School__c,School__r.Name, Contact__c ,Recently_Viewed_School__c, Roles__c FROM Candidate_Roles__c where Contact__c = :currentContactId AND Roles__c = 'Recruiter Approve'];
        list<Account> schoolList = new List<Account>();

        for(Candidate_Roles__c CandidateRole : CandidateRoles)
        {
            schoolList.add(new Account(Id=CandidateRole.School__c , Name = CandidateRole.School__r.Name, Recently_Viewed_School__c = CandidateRole.Recently_Viewed_School__c));
        }

        return schoolList;
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> accountType(String currentUserId){
        Id conId = [Select contactId from user where Id=:currentUserId].contactId;
        List<Contact> checkStatus = [Select SubscriptionType__c,Subscription_End_Date__c from Contact where id=:conId];
        return checkStatus;

    }
    
    @AuraEnabled
    public static String changeRecentSchool(String currentUserId, String selectedSchool){
        user currentUser = [Select Name , Contact.Id from User where Id = :currentUserId];
        String userId = selectedSchool;
        List<Candidate_Roles__c> allContactRoles = [Select id,School__c,Roles__c,Recently_Viewed_School__c from Candidate_Roles__c where Contact__c = :currentUser.Contact.Id];
        for(Candidate_Roles__c role : allContactRoles)
        {
            if(role.School__c == userId)
            {
                role.Recently_Viewed_School__c = true;
            }else{
                role.Recently_Viewed_School__c = false;
            }
        }
        
        update allContactRoles;
		//List<Candidate_Roles__c> updateroles = new List<Candidate_Roles__c>();
		return 'Done';
        
    }

}