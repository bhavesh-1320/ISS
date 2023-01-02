public without sharing class candidateSearch {
    seekingPosition sP = new seekingPosition();
    
    public class objWrapper{
        @auraEnabled public List<String> degreePicklist {get;set;}
        @auraEnabled public List<contact> conLists {get;set;}
    }    
     public class seekingPosition{
        @auraEnabled public string department {get;set;}
        @auraEnabled public string subject {get;set;}
    } 
     public class careerHistory{
        @auraEnabled public string jobtype {get;set;}
        @auraEnabled public string jobTitle {get;set;}
    } 
    public class careerAbsence{
        @auraEnabled public String startDate {get;set;}
        @auraEnabled public string endDate {get;set;}
        @auraEnabled public string description {get;set;}
    }
    
    @AuraEnabled(cacheable=true)
    public static objWrapper getContactsForCandidateSearch(string userId){
        Id PortalUserProfileId = [select Id , Name from Profile where Name = 'Portal User'].Id;
        
        Id currentContactId = [Select contactId from user where Id = :UserId].contactId;
        
        List<User> userList = [select Name , contactId from User Where ProfileId = :PortalUserProfileId AND contactId !=  null AND Id != :userId];
        List<Id> ListOfIdOfContacts = new List<Id>();
        for(User currentUser : userList)
        {
            ListOfIdOfContacts.add(currentUser.contactId);
        }
        system.debug('ListOfIdOfContacts'+ListOfIdOfContacts);
        List<contact> conList = [Select Id ,(SELECT Id, Name, Status__c, Referee_Score__c, CreatedDate, School_Name__c, Start_Date__c, End_Date__c, Title__c FROM Refereee__r ),yearsOfExperience__c ,Curriculum_Experience__c ,SkypeId__c,MailingAddress,OtherAddress, Work_Email__c, secondaryEmail__c,Preferred_Country__c,(select id,Activity_Details__c,Activity_Name__c from Career_Activities__r ),Preferred_Jobtype__c,currentCountryOfResidence__c ,countryOfBirth__c, Name , Master__c , Experience__c , Available__c , refereeRating__c, Email , Country__c   , Phone , Criminal_Record__c , Birthdate , Relationship_Status__c , Number_Of_Dependents__c , Date_of_Availability__c , Partner__c , Name_Of_Institute__c , Degree_Type__c , Course_Major__c , Degree_Conferred__c , Degree_In_Education__c ,(select id,Institute_Name__c,Country__c,Degree_Type__c,Course__c,Degree_In_Education__c,Degree_Conferred__c,Start_Date__c,Completion_Date__c from Degree_Qualifications__r),(Select id, Name,City__c,Country__c,Department__c,jobTitle__c,job_Type__c ,Reason_For_Leaving__c ,start_Date__c ,Subject__c ,Years_of_Experience__c  from Career_Historys__r),(Select id,Title__c,Status__c,Expiry_Date__c,Type__c,Awarded_By__c,Country__c,Registration_Or_Certificate__c from Certificates__r), Certification__c ,(Select ID, candidateFavourite__c  FROM Activity_Tracker__r where Current_User__c = :currentContactId AND candidateFavourite__c = true ),(Select Id , Name , Contact__c , Status__c from Candidate_Jobs__r) from Contact where Id IN :ListOfIdOfContacts Order By refereeRating__c DESC NULLS LAST];
        
        objWrapper obj = new objWrapper();
        List<String> degreeList = new List<String>();
        Schema.SObjectType Degree_targetType = Schema.getGlobalDescribe().get('Degree_Qualification__c');   //From the Object Api name retrieving the SObject
        Sobject Degree_Object_name = degree_targetType.newSObject();
        Schema.sObjectType degree_sobject_type = degree_Object_name.getSObjectType(); //grab the sobject that was passed
        Schema.DescribeSObjectResult degree_sobject_describe = degree_sobject_type.getDescribe(); //describe the sobject
        Map<String, Schema.SObjectField> degree_field_map = degree_sobject_describe.fields.getMap(); //get a map of fields for the passed sobject
        List<Schema.PicklistEntry> degree_pick_list_values = degree_field_map.get('Degree_Type__c').getDescribe().getPickListValues(); //grab the list of picklist values for 
        for (Schema.PicklistEntry a : degree_pick_list_values) 
        {
            degreeList.add(a.getValue());
        }            
        obj.degreePicklist = degreeList;
        obj.conlists = conList; 
        
        return obj;
    }
    
    @AuraEnabled(cacheable=true)
    public static contact getContactRecord( string contactId){
        contact con = [Select Id,(SELECT Id, Name, Status__c, Referee_Score__c, CreatedDate, School_Name__c, Start_Date__c, End_Date__c, Title__c FROM Refereee__r ),Curriculum_Experience__c ,SkypeId__c,MailingAddress,OtherAddress, Work_Email__c, secondaryEmail__c,Preferred_Country__c,(select id,Activity_Details__c,Activity_Name__c from Career_Activities__r ),Preferred_Jobtype__c,currentCountryOfResidence__c ,countryOfBirth__c, Name , Master__c , Experience__c , Available__c , refereeRating__c, Email , Country__c   , Phone , Criminal_Record__c , Birthdate , Relationship_Status__c , Number_Of_Dependents__c , Date_of_Availability__c , Partner__c , Name_Of_Institute__c , Degree_Type__c , Course_Major__c , Degree_Conferred__c , Degree_In_Education__c ,(select id,Institute_Name__c,Country__c,Degree_Type__c,Course__c,Degree_In_Education__c,Degree_Conferred__c,Start_Date__c,Completion_Date__c from Degree_Qualifications__r),(Select id, Name,City__c,Country__c,Department__c,jobTitle__c,job_Type__c ,Reason_For_Leaving__c ,start_Date__c ,Subject__c ,Years_of_Experience__c,Description__c from Career_Historys__r),(Select id,Title__c,Status__c,Expiry_Date__c,Type__c,Awarded_By__c,Country__c,Registration_Or_Certificate__c from Certificates__r), Certification__c ,(Select ID, candidateFavourite__c  FROM Activity_Tracker__r where Current_User__c = :contactId AND candidateFavourite__c = true ), (Select Id , Name , Contact__c , Status__c from Candidate_Jobs__r) from Contact where Id = :contactId  Order By refereeRating__c DESC NULLS LAST];
        return con;
    }
    @AuraEnabled
    public static Map<String,List<Career_History__c >> getCareer(string contactId){
      Map<String,List<Career_History__c >> nMap = new Map<String,List<Career_History__c >>();
        List<Career_History__c> seekingPosition =[Select id,Years_of_Experience__c,Subject__c,Department__c from Career_History__c where RecordTypeId ='0128M000000Guh8QAC' AND Contact__c =:contactId];
        nMap.put('seekingPosition', seekingPosition);
        List<Career_History__c> positionHeld = [Select id,jobTitle__c,Organization_name__c,start_Date__c,end_Date__c,Country__c,City__c,job_Type__c,Curriculums__c,Additional_Duties__c,Reason_For_Leaving__c from Career_History__c where RecordTypeId ='0128M000000GuhDQAS' AND Contact__c =:contactId];
         nMap.put('positionHeld', positionHeld);
        List<Career_History__c> careerAbsence = [Select id,start_Date__c,end_Date__c,Description__c  from Career_History__c where RecordTypeId = '0128M000000GvUKQA0' AND Contact__c =:contactId ];
             nMap.put('careerAbsence', careerAbsence);
        system.debug(nMap);
        return nMap;
        
    }
    
    
    @AuraEnabled
    public static list<Contact> getContactsForFilters(string userId, string departments , string experience , string language , String curriculum , string degree)
    {
        system.debug(departments + ' - ' + experience + ' - ' + language + ' - ' + curriculum + ' - ' + degree);
        
        Id currentContactId = [Select contactId from user where Id = :UserId].contactId;
        Id PortalUserProfileId = [select Id , Name from Profile where Name = 'Portal User'].Id;
        List<User> userList = [select Name , contactId from User Where ProfileId = :PortalUserProfileId AND contactId !=  null AND Id != :userId];
        List<Id> ListOfIdOfContacts = new List<Id>();
        for(User currentUser : userList)
        {
            ListOfIdOfContacts.add(currentUser.contactId);
        }
        string query = 'Select Id, currentCountryOfResidence__c  ,countryOfBirth__c, Name , Master__c , yearsOfExperience__c ,languagesSpoken__c, Available__c , refereeRating__c , Email , Country__c   , Phone , Criminal_Record__c , Birthdate , Relationship_Status__c , Number_Of_Dependents__c , Date_of_Availability__c , Partner__c , Name_Of_Institute__c , Degree_Type__c , Course_Major__c , Degree_Conferred__c , Degree_In_Education__c , Certification__c , (Select Degree_Type__c from Degree_Qualifications__r where Degree_Type__c = \'' + degree + '\') ,(Select ID, candidateFavourite__c  FROM Activity_Tracker__r where Current_User__c = :currentContactId AND candidateFavourite__c = true ),(Select Id , Name , Contact__c , Status__c from Candidate_Jobs__r) from Contact where Id IN :ListOfIdOfContacts';

        if(departments != null && departments != '' && departments != 'Any')
        {
            if(departments.contains(','))
            {
                query = query + ' AND';
                query = query + ' (';
                integer count = 0;
                for(string str : departments.split(','))
                {
                    if(count == 0)
                    {
                        query = query + ' Department = \''+str+'\'';
                        count = 1;
                    }
                    else
                    {
                        query = query + ' OR Department = \''+str+'\'';
                    }
                }
                query = query + ' )';
            }
            else {
                query = query + ' AND Department = \''+departments+'\'';
            }
        }
        
        if(experience != null && experience != '' && experience != 'Any')
        {
            query = query + ' AND (';
            if(experience.contains(','))
            {
                
                list<string> expYear= experience.split(',');
                for(integer i = 0 ; i< expYear.size() ; i++ )
                {
                    system.debug('size2'+experience.split(',').size());
                    if(experience.contains('+'))
                    {
                        query = query + ' AND yearsOfExperience__c >= \'10\'';
                    }
                    else
                    {
                        system.debug('test1'+ expYear[i].split('-')[0]+expYear[i].split('-')[1] );
                        if(i == expYear.size() - 1 ){
                            system.debug('test2'+ expYear[i].split('-')[1]);
                            query = query + '(yearsOfExperience__c <= \''+ expYear[i].split('-')[1] +'\'  AND  yearsOfExperience__c >= \''+ expYear[i].split('-')[0] +'\' )';
                            
                        }
                        else{
                            query = query + '(yearsOfExperience__c <= \''+ expYear[i].split('-')[1] +'\'  AND  yearsOfExperience__c >= \''+ expYear[i].split('-')[0] +'\' ) OR ';
                        }
                        
                    }
                }
                
            }
            else
            {
                if(experience.contains('+'))
                {
                    query = query + ' AND yearsOfExperience__c > \'10\'';
                }
                else
                {
                    query = query + '( yearsOfExperience__c <= \''+ experience.split('-')[1] +'\'  AND  yearsOfExperience__c >= \''+ experience.split('-')[0] +'\' )';
                }
            }
            query = query + ' )';
        }
        
        if(curriculum != null && curriculum != '' && curriculum != 'Any')
        {
            if(curriculum.contains(','))
            {
                query = query + ' AND';
                query = query + ' (';
                integer count = 0;
                for(string str : curriculum.split(','))
                {
                    if(count == 0)
                    {
                        query = query + ' Curriculum_Experience__c includes(\''+str+'\')';
                        count = 1;
                    }
                    else
                    {
                        query = query + ' OR Curriculum_Experience__c includes(\''+str+'\')';
                    }
                }
                query = query + ' )';
            }
            else {
                query = query + ' AND Curriculum_Experience__c includes(\''+curriculum+'\')';
            }
        }

        if(degree != null && degree != '' && degree != 'Any')
        {
            if(degree.contains(','))
            {
                query = query + ' AND';
                query = query + ' (';
                integer count = 0;
                for(string str : degree.split(','))
                {
                    if(count == 0)
                    {
                        query = query + ' Degree_Type__c = \''+str+'\'';
                        count = 1;
                    }
                    else
                    {
                        query = query + ' OR Degree_Type__c  = \''+str+'\'';
                    }
                }
                query = query + ' )';
            }
            else {
                query = query + ' AND Degree_Type__c  = \''+degree+'\'';
            }
        }
        
        system.debug(query);
        
        query = query + '  Order By refereeRating__c DESC NULLS LAST';
        
        list<Contact> contacts = database.query(query);
        list<Contact> conlist = new List<contact>();
        
        if(language != null && language != '')
        {

            if(language.contains(','))
            {
                integer count = 0;
                for(string str : language.split(','))
                {
                    for(contact con : contacts)
                    {
                        if(con.languagesSpoken__c != null){
                            if(con.languagesSpoken__c.contains(str))
                            {   
                                conlist.add(con);
                            }
                        }
                    }
                }
            }
            else {
                for(contact con : contacts)
                {
                    if(con.languagesSpoken__c != null){
                        if(con.languagesSpoken__c.contains(language))
                        {   
                            conlist.add(con);
                        }
                    }
                }
            }
        }
        else
        {
            conlist = contacts;
        }
        
        
        return conlist;
    }
    
       @AuraEnabled
    public static list<Contact> getContactsMoreFilters(string userId , String dateFrom , string dateTo,string departments,string subjects,string experience,string Family,string Dependents,string Languages_Spoken,string Proficiency,string iFair_Attendance,string Position_Type,string Curriculum_Experience,string Minimum_Degree,string CountryOfResidence,string Citizenship,string InterestedCountry )
    {
        Id PortalUserProfileId = [select Id , Name from Profile where Name = 'Portal User'].Id;
        Id currentContactId = [Select contactId from user where Id = :UserId].contactId;
        List<User> userList = [select Name , contactId from User Where ProfileId = :PortalUserProfileId AND contactId !=  null AND Id != :userId];
        List<Id> ListOfIdOfContacts = new List<Id>();
        for(User currentUser : userList)
        {
            ListOfIdOfContacts.add(currentUser.contactId);
        }
        system.debug('listOfId=>>'+ListOfIdOfContacts);
        string query = 'Select Id ,currentCountryOfResidence__c ,countryOfBirth__c, Name , Master__c , yearsOfExperience__c ,languagesSpoken__c, Available__c , refereeRating__c , Email , Country__c   , Phone , Criminal_Record__c , Birthdate , Relationship_Status__c , Number_Of_Dependents__c , Date_of_Availability__c , Partner__c , Name_Of_Institute__c , Degree_Type__c , Course_Major__c , Degree_Conferred__c , Degree_In_Education__c , Certification__c , (Select Degree_Type__c from Degree_Qualifications__r),(select job_Type__c from Career_Historys__r) ,(Select ID, candidateFavourite__c  FROM Activity_Tracker__r where Current_User__c = :currentContactId AND candidateFavourite__c = true ), (Select Id , Name , Contact__c , Status__c from Candidate_Jobs__r) from Contact where Id IN :ListOfIdOfContacts';
    
        if(departments != null && departments != '' && departments != 'Any')
        {
            if(departments.contains(','))
            {
                query = query + ' AND';
                query = query + ' (';
                integer count = 0;
                for(string str : departments.split(','))
                {
                    if(count == 0)
                    {
                        query = query + ' Department = \''+str+'\'';
                        count = 1;
                    }
                    else
                    {
                        query = query + ' OR Department = \''+str+'\'';
                    }
                }
                query = query + ' )';
            }
            else {
                query = query + ' AND Department = \''+departments+'\'';
            }
        }

        if(experience != null && experience != '' && experience != 'Any')
        {
            query = query + ' AND (';
            if(experience.contains(','))
            {
                
                list<string> expYear= experience.split(',');
                for(integer i = 0 ; i< expYear.size() ; i++ )
                {
                    system.debug('size2'+experience.split(',').size());
                    if(experience.contains('+'))
                    {
                        query = query + ' AND yearsOfExperience__c >= \'10\'';
                    }
                    else
                    {
                        system.debug('test1'+ expYear[i].split('-')[0]+expYear[i].split('-')[1] );
                        if(i == expYear.size() - 1 ){
                            system.debug('test2'+ expYear[i].split('-')[1]);
                            query = query + '(yearsOfExperience__c <= \''+ expYear[i].split('-')[1] +'\'  AND  yearsOfExperience__c >= \''+ expYear[i].split('-')[0] +'\' )';
                            
                        }
                        else{
                            query = query + '(yearsOfExperience__c <= \''+ expYear[i].split('-')[1] +'\'  AND  yearsOfExperience__c >= \''+ expYear[i].split('-')[0] +'\' ) OR ';
                        }
                        
                    }
                }
                
            }
            else
            {
                if(experience.contains('+'))
                {
                    query = query + ' AND yearsOfExperience__c > \'10\'';
                }
                else
                {
                    query = query + '( yearsOfExperience__c <= \''+ experience.split('-')[1] +'\'  AND  yearsOfExperience__c >= \''+ experience.split('-')[0] +'\' )';
                }
            }
            query = query + ' )';
        }

        if(subjects != null && subjects != '' && subjects != 'Any')
        {
            if(subjects.contains(','))
            {
                query = query + ' AND';
                query = query + ' (';
                integer count = 0;
                for(string str : subjects.split(','))
                {
                    if(count == 0)
                    {
                        query = query + ' Subject__c = \''+str+'\'';
                        count = 1;
                    }
                    else
                    {
                        query = query + ' OR Subject__c  = \''+str+'\'';
                    }
                }
                query = query + ' )';
            }
            else {
                query = query + ' AND Subject__c  = \''+subjects+'\'';
            }
        }

        if(Dependents != null && Dependents != '' && Dependents != 'Any')
        {
            if(Dependents.contains(','))
            {
                query = query + ' AND';
                query = query + ' (';
                integer count = 0;
                for(string str : Dependents.split(','))
                {
                    if(count == 0)
                    {
                        if(Dependents == '3+')
                        {
                            query = query + ' Number_Of_Dependents__c  > 2';
                        }
                        else
                        {
                            query = query + ' Number_Of_Dependents__c  = '+str;
                        }
                        count = 1;
                    }
                    else
                    {
                        if(Dependents == '3+')
                        {
                            query = query + ' OR Number_Of_Dependents__c  > 2';
                        }
                        else
                        {
                            query = query + ' OR Number_Of_Dependents__c  = '+str;
                        }
                    }
                }
                query = query + ' )';
            }
            else {
                if(Dependents == '3+')
                {
                    query = query + ' AND Number_Of_Dependents__c  > 2';
                }
                else
                {
                    query = query + ' AND Number_Of_Dependents__c  = '+Dependents;
                }
            }
        }
    

        if(Curriculum_Experience != null && Curriculum_Experience != '' && Curriculum_Experience != 'Any')
        {
            if(Curriculum_Experience.contains(','))
            {
                query = query + ' AND';
                query = query + ' (';
                integer count = 0;
                for(string str : Curriculum_Experience.split(','))
                {
                    if(count == 0)
                    {
                        query = query + ' Curriculum_Experience__c includes(\''+str+'\')';
                        count = 1;
                    }
                    else
                    {
                        query = query + ' OR Curriculum_Experience__c includes(\''+str+'\')';
                    }
                }
                query = query + ' )';
            }
            else {
                query = query + ' AND Curriculum_Experience__c includes(\''+Curriculum_Experience+'\')';
            }
        }



        if(CountryOfResidence != null && CountryOfResidence != '' && CountryOfResidence != 'Any')
        {
            if(CountryOfResidence.contains(','))
            {
                query = query + ' AND';
                query = query + ' (';
                integer count = 0;
                for(string str : CountryOfResidence.split(','))
                {
                    if(count == 0)
                    {
                        query = query + ' currentCountryOfResidence__c = \''+str+'\'';
                        count = 1;
                    }
                    else
                    {
                        query = query + ' OR currentCountryOfResidence__c  = \''+str+'\'';
                    }
                }
                query = query + ' )';
            }
            else {
                query = query + ' AND currentCountryOfResidence__c  = \''+CountryOfResidence+'\'';
            }
        }


        if(Citizenship != null && Citizenship != '' && Citizenship != 'Any')
        {
            if(Citizenship.contains(','))
            {
                query = query + ' AND';
                query = query + ' (';
                integer count = 0;
                for(string str : Citizenship.split(','))
                {
                    if(count == 0)
                    {
                        query = query + ' Citizenships__c = \''+str+'\'';
                        count = 1;
                    }
                    else
                    {
                        query = query + ' OR Citizenships__c  = \''+str+'\'';
                    }
                }
                query = query + ' )';
            }
            else {
                query = query + ' AND Citizenships__c  = \''+Citizenship+'\'';
            }
        }


        if(InterestedCountry != null && InterestedCountry != '' && InterestedCountry != 'Any')
        {
            if(InterestedCountry.contains(','))
            {
                query = query + ' AND';
                query = query + ' (';
                integer count = 0;
                for(string str : InterestedCountry.split(','))
                {
                    if(count == 0)
                    {
                        query = query + ' Preferred_Country__c includes(\''+str+'\')';
                        count = 1;
                    }
                    else
                    {
                        query = query + ' OR Preferred_Country__c  includes(\''+str+'\')';
                    }
                }
                query = query + ' )';
            }
            else {
                query = query + ' AND Preferred_Country__c  includes(\''+InterestedCountry+'\')';
            }
        }

        

        if(dateFrom != null && dateFrom != '' && dateFrom != 'Any')
        {
            query = query + ' AND Date_of_Availability__c >= ' + dateFrom;
        }

        if(dateto != null && dateto != '' && dateto != 'Any')
        {
            query = query + ' AND Date_of_Availability__c <= ' + dateto;
        }

        if(Minimum_Degree != null && Minimum_Degree != '' && Minimum_Degree != 'Any')
        {
            if(Minimum_Degree.contains(','))
            {
                query = query + ' AND';
                query = query + ' (';
                integer count = 0;
                for(string str : Minimum_Degree.split(','))
                {
                    if(count == 0)
                    {
                        query = query + ' Degree_Type__c = \''+str+'\'';
                        count = 1;
                    }
                    else
                    {
                        query = query + ' OR Degree_Type__c  = \''+str+'\'';
                    }
                }
                query = query + ' )';
            }
            else {
                query = query + ' AND Degree_Type__c  = \''+Minimum_Degree+'\'';
            }
        }

        if(Position_Type != null && Position_Type != '' && Position_Type != 'Any')
        {
            if(Position_Type.contains(','))
            {
                query = query + ' AND ID IN (Select Contact__c from Career_History__c where';
                integer count = 0;
                for(string str : Position_Type.split(','))
                {
                    if(count == 0)
                    {
                        query = query + ' job_Type__c = \''+str+'\'';
                        count = 1;
                    }
                    else
                    {
                        query = query + ' OR job_Type__c  = \''+str+'\'';
                    }
                }
                query = query + ' )';
            }
            else {
                query = query + ' AND ID IN (Select Contact__c from Career_History__c where job_Type__c = \''+Position_Type+ '\')';
            }
        }
        
        
        system.debug(query);

        query = query + ' Order By refereeRating__c DESC NULLS LAST';
        
        list<Contact> contacts = database.query(query);
        Set<Contact> conList = new Set<Contact>();

        if(Languages_Spoken != null && Languages_Spoken != '' && Languages_Spoken != 'Any')
        {
            if(Languages_Spoken.contains(','))
            {
                for(string str : Languages_Spoken.split(','))
                {
                    for(contact con : contacts)
                    {
                        if(con.languagesSpoken__c != null){
                            if(con.languagesSpoken__c.contains(str))
                            {
                                conlist.add(con);
                            }
                        }
                    }
                }
            }
            else {
                for(contact con : contacts)
                {
                    if(con.languagesSpoken__c != null){
                        if(con.languagesSpoken__c.contains(Languages_Spoken))
                        {
                            conlist.add(con);
                        }
                    }
                }
            }
        }
        else
        {
            conlist = new Set<Contact>(contacts);
        }

        List<Contact> returnconlist = new List<Contact>();
        
        for(contact con : conlist)
        {
            returnconlist.add(con);
        }
        return returnconlist;
    }
    @AuraEnabled
     public static Map<String,Candidate_Job__c> getRelatedFilesByRecordId(String jobid, String contactId) {
          Map<String,Candidate_Job__c> mp = new  Map<String,Candidate_Job__c>();
         List<Candidate_Job__c> appliedJob = [Select Id, Status__c, CreatedDate from Candidate_Job__c where Contact__c =: contactId AND Job__c =:jobid]; 
        system.debug('appliedjob'+appliedJob);
         if(appliedJob.size()>0){
             system.debug('appliedjob'+appliedJob[0].Id);
             List<Attachment> att = [Select id from Attachment where ParentID =:appliedJob[0].Id];
                   //   Map<String,Candidate_Job__c> mp = new  Map<String,Candidate_Job__c>();
            List<ContentDocumentLink> files = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :appliedJob[0].Id];
            List<ID> fileIDs = new List<ID>();
         String title='';
            for (ContentDocumentLink docLink : files) {
                fileIDs.add(docLink.ContentDocumentId);
            }
     
            List<ContentVersion> docs = [SELECT ContentDocumentId, FileExtension, Title 
                FROM ContentVersion WHERE ContentDocumentId IN : fileIDs];
             system.debug('document'+docs);
             if(docs.size()>0){
                     string note = docs[0].Title;
         String extension = docs[0].FileExtension;
         String file = note+'.'+extension;
            
         system.debug('document'+docs);
     
         //List<Object> lobj = new List<Object>();
         List<String>noteTitle = new List<String>();
            Map<String, String> mapIdTitle = new Map<String, String>();
            for (ContentVersion docLink : docs) {
                //title = docLink.Title;
                noteTitle.add(docLink.Title);
                system.debug('392'+noteTitle);
               // mapIdTitle.put(docLink.ContentDocumentId, docLink.Title);
            }
         if(noteTitle.size()!=0){
               mp.put(file,appliedJob[0]);
             
         }
                  }
     
       system.debug(mp);
            return mp;
         }
         else{
             return mp;
         }

        }

    @AuraEnabled
    public static Id getContactId(string userId){
        
        Id contact_Id = [Select Name , contactId from user where Id = :userId].contactId;
        return contact_Id;
    }

    @AuraEnabled
    public static list<job__c> fetchSchoolsForRecruiters(string currentUserId){
        Id currentContactId = [Select contactId from user where Id = :currentUserId].contactId;

        List<Candidate_Roles__c> Candidate_Roles = [Select Name , School__c from Candidate_Roles__c where Contact__c = :currentContactId AND Recently_Viewed_School__c = true];

        list<job__c> jobsList = [Select Name , Job_Position__c , Department__c , Subject__c ,(Select Id , Name , Contact__c , Status__c from Candidate_Jobs__r),(Select Name,Job__c,Current_User__c from Activity_Tracker__r) from job__c where School__c = :Candidate_Roles[0].School__c];

        return jobsList;
    }

    
    
    @AuraEnabled
    public static List<List<String>> getAllFiltersOptionValues(){

        List<List<String>> fieldsValues = new List<List<String>>();

        List<String> pickListValuesListCountries= new List<String>();
		Schema.DescribeFieldResult countryFieldOptions = contact.currentCountryOfResidence__c.getDescribe();
		List<Schema.PicklistEntry> countryFieldOptionsElement = countryFieldOptions.getPicklistValues();
		for( Schema.PicklistEntry pickListVal : countryFieldOptionsElement){
			pickListValuesListCountries.add(pickListVal.getLabel());
		}    

        fieldsValues.add(pickListValuesListCountries);

        List<String> pickListValuesListCurriculum= new List<String>();
		Schema.DescribeFieldResult CurriculumFieldOptions = contact.Curriculum_Experience__c.getDescribe();
		List<Schema.PicklistEntry> CurriculumFieldOptionsElement = CurriculumFieldOptions.getPicklistValues();
		for( Schema.PicklistEntry pickListVal : CurriculumFieldOptionsElement){
			pickListValuesListCurriculum.add(pickListVal.getLabel());
		}    

        fieldsValues.add(pickListValuesListCurriculum);

        List<String> pickListValuesListSubject= new List<String>();
		Schema.DescribeFieldResult SubjectFieldOptions = Career_History__c.Subject__c.getDescribe();
		List<Schema.PicklistEntry> SubjectFieldOptionsElement = SubjectFieldOptions.getPicklistValues();
		for( Schema.PicklistEntry pickListVal : SubjectFieldOptionsElement){
			pickListValuesListSubject.add(pickListVal.getLabel());
		}    

        fieldsValues.add(pickListValuesListSubject);

        List<String> pickListValuesListDepartment= new List<String>();
		Schema.DescribeFieldResult DepartmentFieldOptions = Career_History__c.Department__c.getDescribe();
		List<Schema.PicklistEntry> DepartmentFieldOptionsElement = DepartmentFieldOptions.getPicklistValues();
		for( Schema.PicklistEntry pickListVal : DepartmentFieldOptionsElement){
			pickListValuesListDepartment.add(pickListVal.getLabel());
		}    

        fieldsValues.add(pickListValuesListDepartment);

        return fieldsValues;
    }

 @AuraEnabled
    public static void deleteNote(String noteId){
          Note__c getNote = [SELECT Id, Candidate__c, Recruiter__c,Recruiter__r.Name,  Notes_For_Candidate__c, CreatedDate FROM Note__c where Id =: noteId];
        delete getNote;
    }
     @AuraEnabled
    public static void editNote(String noteId,String noteText){
          Note__c getNote = [SELECT Id, Candidate__c, Recruiter__c,Recruiter__r.Name,  Notes_For_Candidate__c, CreatedDate FROM Note__c where Id =: noteId];
        getNote.Notes_For_Candidate__c = noteText;
        update getNote;
    }
     @AuraEnabled
     public static list<contact> getCandidateListDependingUponHeaderTabs(String userId, List<string> contactIds){
        Id currentContactId = [Select contactId from user where Id = :userId].contactId;

        List<Contact> conList =  [Select Id,Curriculum_Experience__c ,SkypeId__c,MailingAddress,OtherAddress, Work_Email__c, secondaryEmail__c,Preferred_Country__c,Preferred_Jobtype__c,currentCountryOfResidence__c ,countryOfBirth__c, Name , Master__c , Experience__c , Available__c , refereeRating__c, Email , Country__c   , Phone , Criminal_Record__c , Birthdate , Relationship_Status__c , Number_Of_Dependents__c , Date_of_Availability__c , Partner__c , Name_Of_Institute__c , Degree_Type__c , Course_Major__c , Degree_Conferred__c , Degree_In_Education__c ,(select id,Institute_Name__c,Country__c,Degree_Type__c,Course__c,Degree_In_Education__c,Degree_Conferred__c,Start_Date__c,Completion_Date__c from Degree_Qualifications__r),(Select id, Name,City__c,Country__c,Department__c,jobTitle__c,job_Type__c ,Reason_For_Leaving__c ,start_Date__c ,Subject__c ,Years_of_Experience__c  from Career_Historys__r),(Select id,Title__c,Status__c,Expiry_Date__c,Type__c,Awarded_By__c,Country__c,Registration_Or_Certificate__c from Certificates__r), Certification__c ,(Select ID, candidateFavourite__c  FROM Activity_Tracker__r where Current_User__c = :currentContactId AND candidateFavourite__c = true ),(Select Id , Name , Contact__c , Status__c from Candidate_Jobs__r) from Contact where Id IN :contactIds AND Id != :currentContactId Order By refereeRating__c DESC NULLS LAST];
        return conList;
     }
    @AuraEnabled
    public static Note__c createCandidateNotes(String candidateId,String recruiterId, String noteText){
        Id currentContactId = [Select contactId from user where Id = :recruiterId].contactId;
        // List<Note__c> n = [Select Id ,Notes_For_Candidate__c From NOte__c where Id =:noteId];
        Note__c note = new Note__c(Candidate__c = candidateId, Recruiter__c = currentContactId, Notes_For_Candidate__c = noteText);
        insert note;
        System.debug('NoteId:'+note.id);
        Note__c getNote = [SELECT Id, Candidate__c, Recruiter__c,Recruiter__r.Name,  Notes_For_Candidate__c, CreatedDate FROM Note__c where Id =: note.Id];
        System.debug('NoteId:'+getNote);
        return getNote;
        
    }
  @AuraEnabled
    public static List<Note__c> checkCandidateNotes(String candidateId){
         List<Note__c> getNote = [SELECT Id, Candidate__c, Recruiter__c,Recruiter__r.Name,  Notes_For_Candidate__c, CreatedDate FROM Note__c where Candidate__c =: candidateId order by LastModifiedDate desc];
        return getNote;
    }
    
    
    @AuraEnabled
    public static Map<String, List<sObject>> getBestMatchRecs( Id jobId, string userId ){
        try {
            List<Job__c> jobs = [SELECT Id, Department__c, Subject__c, yearsOfExperience__c, Minimum_Qualification__c, Minimum_experience__c, Job_Type__c FROM Job__c WHERE Id = :jobId];
            if( jobs.size() > 0 ){
                Id PortalUserProfileId = [select Id , Name from Profile where Name = 'Portal User'].Id;
                
                Id currentContactId = [Select contactId from user where Id = :userId].contactId;
                
                List<User> userList = [select Name , contactId from User Where ProfileId = :PortalUserProfileId AND contactId !=  null AND contactId != :currentContactId];
                Set<Id> listOfIdOfContacts = new Set<Id>();
                for(User currentUser : userList)
                {
                    listOfIdOfContacts.add(currentUser.contactId);
                }
                List<Id> matchedContIds = new List<Id>();
                Map<String, List<sObject>> matchedRecordMap = new Map<String, List<sObject>>();
                Job__c job = jobs[0];
                Map<String, Schema.SObjectField> fieldMap = Contact.sObjectType.getDescribe().fields.getMap();
                // Get all of the fields on the object
                Set<String> setFieldNames = fieldMap.keySet();
                list<String> lstFieldNames = new List<String>(setFieldNames);
                String query = 'SELECT ' + String.join(lstFieldNames, ',') + ' FROM Contact';
                String mustHaveRecsQuery = fillMustHave( query, job, listOfIdOfContacts );
                
                if( mustHaveRecsQuery.contains('WHERE') ){
                    System.debug('Must Have Query:'+mustHaveRecsQuery.substring(mustHaveRecsQuery.indexOf('WHERE')));
                    mustHaveRecsQuery +=') AND (ID IN :listOfIdOfContacts)';
                    List<sObject> mustHaveRecs = Database.query(mustHaveRecsQuery);
                    for( sObject obj : mustHaveRecs ){
                        matchedContIds.add( obj.Id );
                    }
                    matchedRecordMap.put( 'Must Have', mustHaveRecs );    
                }
                System.debug('keyMatchesRecsQuery');
                List<id> contIdContainSameDptSubAsOfJob = new List<id>();
                String keyMatchesRecsQuery = fillKeyMatches( query, job, matchedContIds, listOfIdOfContacts, contIdContainSameDptSubAsOfJob );
                System.debug('mHRecs'+keyMatchesRecsQuery);
                //System.debug(Database.query(keyMatchesRecsQuery));
                if( keyMatchesRecsQuery.contains('WHERE') ){
                    System.debug('Key Match Query:'+mustHaveRecsQuery.substring(mustHaveRecsQuery.indexOf('WHERE')));
                    mustHaveRecsQuery+=' AND (ID IN :listOfIdOfContacts)';
                    List<sObject> keyMatchRecs = Database.query(keyMatchesRecsQuery);
                    for( sObject obj : keyMatchRecs ){
                        matchedContIds.add( obj.Id );
                    }
                    matchedRecordMap.put( 'Key Match', keyMatchRecs );    
                    System.debug('Key Match');
                }
                
                //Nice to have
                //Last Logged in and partner is remaining
                query+= ' WHERE Id NOT IN :matchedContIds AND Id IN :listOfIdOfContacts ORDER BY refereeRating__c DESC';
                matchedRecordMap.put( 'Remaining Recs', Database.query(query) ); 
                System.debug('-->'+matchedRecordMap.keySet());
                System.debug( 'Matched Recs:'+ matchedRecordMap.get( 'Must Have' ));
                System.debug( 'Key Match Recs:'+ matchedRecordMap.get( 'Key Match' ));
                System.debug( 'Remaining Recs:'+ matchedRecordMap.get( 'Remaining Recs' ));
                
                /*
                System.debug( 'Matched Recs:'+ matchedRecordMap.get( 'Must Have' ).size());
                System.debug( 'Key Match Recs:'+ matchedRecordMap.get( 'Key Match' ).size());
                System.debug( 'Remaining Recs:'+ matchedRecordMap.get( 'Remaining Recs' ).size());
				*/
                return matchedRecordMap;
            }
            return null;
        } catch (Exception e) {
            System.debug('->'+e);
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    
    static String fillMustHave( String query, Job__c job, Set<Id> listOfIdOfContacts ){
        
        //TODO: Have to add teching language criteria
        
        String allContContainSameJobDegree = '(';
        List<String> degConts = new List<String>(); 
        
        //Getting candidates having same minimum degree as of job  
        if( job.Minimum_Qualification__c == 'Diploma' || job.Minimum_Qualification__c == 'Graduate Diploma' ||
           job.Minimum_Qualification__c == 'Graduate Certificate' || job.Minimum_Qualification__c == 'Advanced Diploma' ||
           job.Minimum_Qualification__c == 'PGCE' || job.Minimum_Qualification__c == 'PGDE' || job.Minimum_Qualification__c == 'Ed.D'
          ){
              for( Degree_Qualification__c dQualification : [SELECT Id, Contact__c, Degree_Type__c FROM
                                                             Degree_Qualification__c WHERE Degree_Type__c = :job.Minimum_Qualification__c AND Contact__c !=null AND Contact__c IN :ListOfIdOfContacts
                                                            ] ){
                                                                if( !degConts.contains(dQualification.Contact__c) ){
                                                                    allContContainSameJobDegree+='\''+dQualification.Contact__c+'\',';
                                                                    degConts.add( dQualification.Contact__c );
                                                                }
                                                            }
          }
        if( allContContainSameJobDegree.length() > 1 ){
            allContContainSameJobDegree = allContContainSameJobDegree.substring( 0, allContContainSameJobDegree.length()-1 );
        }
        allContContainSameJobDegree+=')';
        if( allContContainSameJobDegree.length() > 2 || job.Minimum_experience__c != null || job.Job_Type__c != null ){
            query += ' WHERE (';
            //Candidates having same degree as of job
            if( allContContainSameJobDegree.length() > 2 ){
                query+= ' Id IN '+allContContainSameJobDegree;
            }
            //Candidates having Minimum experience less than job's Minimum experience
            if( job.Minimum_experience__c != null ){
                query+= allContContainSameJobDegree.length() > 2 ? ' OR ' : '';
                query+= ' Experience__c <= '+job.Minimum_experience__c;        
            }
            //Candidates having Job Type same as job's job type
            if( job.Job_Type__c != null ){
                query += job.Minimum_experience__c != null ? ' OR ' :  allContContainSameJobDegree.length() > 2 ? ' OR ' : '';
                query+= ' (Preferred_Jobtype__c = \''+job.Job_Type__c+'\' AND Preferred_Jobtype__c IN (\'Full Time\', \'Short Term - Summer\', \'Short Term - Interim/Substitute\', \'Intern\'))';
            }
        }
        return query;
    }
    static String fillKeyMatches( String query, Job__c job, List<Id> matchedContIds, Set<ID> listOfIdOfContacts, List<id> contIdContainSameDptSubAsOfJob ){
        //TODO: Have to add Education Level(ages) criteria
        decimal yoe = 0;
        
        if( job.yearsOfExperience__c != null ){
            yoe = Decimal.valueOf(job.yearsOfExperience__c);
        }
        //Candidates having same subject, department, experience in Career History as of job
        for( Career_History__c cH : [SELECT Id, Subject__c,Contact__c, Years_of_Experience__c, Department__c FROM Career_History__c WHERE (Subject__c = :job.Subject__c AND Department__c = :job.Department__c AND Years_of_Experience__c <= :yoe) AND Contact__c NOt IN :matchedContIds AND Contact__c IN :listOfIdOfContacts] ){
            if( !(cH.Subject__c == null && cH.Department__c == null && cH.Years_of_Experience__c == null) )
                contIdContainSameDptSubAsOfJob.add( cH.Contact__c );
        }
        if( contIdContainSameDptSubAsOfJob.size() > 0 )
            query+=' WHERE (Id IN :contIdContainSameDptSubAsOfJob AND Id NOT IN :matchedContIds)';
        return query;
    }


    @AuraEnabled
    public static List<layouts__c> getDetailPageLayoutRecord(string userId , String layoutName)
    {
        List<layouts__c> layout = [SELECT Layout_Name__c , User_Id__c , Value__c FROM layouts__c where User_Id__c =: userId AND Layout_Name__c = :layoutName];
        return layout;
    }

    @AuraEnabled
    public static void createDetailPageLayoutRecord(string userId , string values , string layoutName)
    {
        List<layouts__c> previousLayout = [SELECT Layout_Name__c , User_Id__c , Value__c FROM layouts__c where User_Id__c =: userId AND Layout_Name__c = :layoutName];
        if(previousLayout.size() > 0)
        {
            previousLayout[0].Value__c = values;
            update previousLayout;
        }
        else
        {
            final String chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
            String randStr = '';
            integer len = 10;
            while (randStr.length() < len) {
            Integer idx = Math.mod(Math.abs(Crypto.getRandomInteger()), chars.length());
            randStr += chars.substring(idx, idx+1);
            }
            layouts__c layout = new layouts__c( Name = 'Detail Page Layout'+randStr, Layout_Name__c = layoutName ,User_Id__c =  userId , Value__c = values);
            insert layout;
        }
    }

}