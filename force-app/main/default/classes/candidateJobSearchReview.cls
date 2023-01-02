public without sharing  class  candidateJobSearchReview {
    
   
 public class jobWrapper{
        @AuraEnabled public List<Job__c> listOfJobs {get;set;}
        @AuraEnabled public List<String> listOfRoles {get;set;}
        @AuraEnabled public List<String>  subjectPicklist {get;set;}
        @AuraEnabled public List<String>  departPicklist {get;set;}
        @AuraEnabled public List<String>  countryPicklist {get;set;}
    }
    @AuraEnabled
    public static Map<String ,Object > getAlljobs2(Id jobId, string UserId ,Integer limitSize, Integer offset){
        Id currentContactId = [Select contactId from user where Id = :UserId].contactId;
        Contact contactDetail = [select Name , Id, subscriptionType__c from contact where Id = :currentContactId];
        List<Candidate_Roles__c> CandidateRoles = [SELECT Id, School__c,School__r.Name, Contact__c , Roles__c FROM Candidate_Roles__c where Contact__c = :currentContactId AND Roles__c = 'Recruiter Approve'];
        list<Job__c> jobList = new List<Job__c>();
        Map<String ,Object > nmap = new Map<String , Object > ();
        AggregateResult[] groupedResults;
        
        
        if(contactDetail.subscriptionType__c == 'Free'){
            groupedResults = [SELECT count(Id) FROM Job__c  where Is_LeaderShip__c  = True];
            jobList = [SELECT Id, Salary_Range__c,Minimum_Qualification__c , school__r.name, school__r.Description , Country__c,Grade_Range__c , Subject__c , Organization__c, CreatedDate  , Job_Description__c, Job_Type__c, Job_Role_Start_Date__c , Job_Close_Date__c, Number_Of_Openings__c,Is_LeaderShip__c ,  Minimum_experience__c, Certification_Required__c, Cover_letter__c, Media_Link__c, Curriculum__c, Education_Level__c, Department__c, Job_Category__c, Job_Position__c, Name FROM Job__c where Is_LeaderShip__c  = True And Id =:jobid Order By createdDate LIMIT :limitSize OFFSET :offset];
        }else {
            groupedResults = [SELECT count(Id) FROM Job__c];
            jobList = [SELECT Id, Salary_Range__c,Minimum_Qualification__c , school__r.name, school__r.Description , Country__c,Grade_Range__c , Subject__c , Organization__c, CreatedDate  , Job_Description__c, Job_Type__c, Job_Role_Start_Date__c , Job_Close_Date__c, Number_Of_Openings__c,  Minimum_experience__c, Certification_Required__c, Cover_letter__c, Media_Link__c, Curriculum__c, Education_Level__c, Department__c, Job_Category__c, Job_Position__c, Name FROM Job__c Where Id =:jobid Order By createdDate LIMIT :limitSize OFFSET :offset];
        }
        nmap.put('data',jobList);
        nmap.put('count',groupedResults);
        return nmap;
    }
    
    @AuraEnabled
    public static Map<String ,Object > getAlljobs(string UserId ,Integer limitSize, Integer offset, String urlJobId){
        list<Job__c> jobList = new List<Job__c>();
        Id currentContactId = [Select contactId from user where Id = :UserId].contactId;
        Contact contactDetail = [select Name , Id, subscriptionType__c from contact where Id = :currentContactId];
        List<Candidate_Roles__c> CandidateRoles = [SELECT Id, School__c,School__r.Name, Contact__c , Roles__c FROM Candidate_Roles__c where Contact__c = :currentContactId AND Roles__c = 'Recruiter Approve'];
        Map<String ,Object > nmap = new Map<String , Object > ();
        AggregateResult[] groupedResults;
        
        
        if(contactDetail.subscriptionType__c == 'Free'){
            groupedResults = [SELECT count(Id) FROM Job__c  where Is_LeaderShip__c  = True];
            jobList = [SELECT Id, Salary_Range__c,Minimum_Qualification__c , school__r.name, school__r.Description , Country__c,Grade_Range__c , Subject__c , Organization__c, CreatedDate  , Job_Description__c, Job_Type__c, Job_Role_Start_Date__c , Job_Close_Date__c, Number_Of_Openings__c,Is_LeaderShip__c ,  Minimum_experience__c, Certification_Required__c, Cover_letter__c, Media_Link__c, Curriculum__c, Education_Level__c, Department__c, Job_Category__c, Job_Position__c, Name FROM Job__c where Is_LeaderShip__c  = True Order By createdDate LIMIT :limitSize OFFSET :offset];
        }else {
            groupedResults = [SELECT count(Id) FROM Job__c];
            jobList = [SELECT Id, Salary_Range__c,Minimum_Qualification__c , school__r.name, school__r.Description , Country__c,Grade_Range__c , Subject__c , Organization__c, CreatedDate  , Job_Description__c, Job_Type__c, Job_Role_Start_Date__c , Job_Close_Date__c, Number_Of_Openings__c,  Minimum_experience__c, Certification_Required__c, Cover_letter__c, Media_Link__c, Curriculum__c, Education_Level__c, Department__c, Job_Category__c, Job_Position__c, Name FROM Job__c Order By createdDate LIMIT :limitSize OFFSET :offset];
        }
        if( urlJobId != null ){
            Job__c job = [SELECT Id, Salary_Range__c,Minimum_Qualification__c , school__r.name, school__r.Description , Country__c,Grade_Range__c , Subject__c , Organization__c, CreatedDate  , Job_Description__c, Job_Type__c, Job_Role_Start_Date__c , Job_Close_Date__c, Number_Of_Openings__c,Is_LeaderShip__c ,  Minimum_experience__c, Certification_Required__c, Cover_letter__c, Media_Link__c, Curriculum__c, Education_Level__c, Department__c, Job_Category__c, Job_Position__c, Name FROM Job__c where Id = :urlJobId];
        	jobList.add( job );
            Job__c j = jobList[0];
            jobList[0] = jobList[jobList.size()-1];
            jobList[jobList.size()-1] = j;
        }
        nmap.put('data',jobList);
        System.debug('oo:'+jobList[0]);
        nmap.put('count',groupedResults);
        return nmap;
    }
    @AuraEnabled
    public static Integer getJobsCount(){
        integer  count= database.countQuery('select count() from Job__c');
        return count;
    }
    
    // @AuraEnabled
    // public static list<Job__c> getAlljobsForOneSchool(string UserId , string schoolId){
    //     Id currentContactId = [Select contactId from user where Id = :UserId].contactId;
    //     Contact contactDetail = [select Name , Id, subscriptionType__c from contact where Id = :currentContactId];
    
    //     list<Job__c> jobList = new List<Job__c>();
    
    //     if(contactDetail.subscriptionType__c == 'Free'){
    //     	jobList = [SELECT Id, Salary_Range__c,Minimum_Qualification__c , school__r.name,Country__c,Grade_Range__c , Organization__c, CreatedDate  , Job_Description__c, Job_Type__c, Job_Close_Date__c, Number_Of_Openings__c,Is_LeaderShip__c ,  Minimum_experience__c, Certification_Required__c, Cover_letter__c, Media_Link__c, Curriculum__c, Education_Level__c, Department__c, Job_Category__c, Job_Position__c, Name FROM Job__c where School__c = :schoolId AND Is_LeaderShip__c  = True Order By createdDate ];
    //     }else {
    //         jobList = [SELECT Id, Salary_Range__c,Minimum_Qualification__c , school__r.name,Country__c,Grade_Range__c , Organization__c, CreatedDate  , Job_Description__c, Job_Type__c, Job_Close_Date__c, Number_Of_Openings__c,  Minimum_experience__c, Certification_Required__c, Cover_letter__c, Media_Link__c, Curriculum__c, Education_Level__c, Department__c, Job_Category__c, Job_Position__c, Name FROM Job__c where School__c = :schoolId Order By createdDate];
    //     }
    
    //     return jobList;
    // }
    
    
    @AuraEnabled(cacheable = true )
    public static jobWrapper getJobs(String recordId , string schoolId){
        try {
            
            List<User> userDetails = [SELECT Id, name, accountid , contactid FROM User where Id = :recordId];
            String userContactId = userDetails[0].contactId;
            String userAccountId = userDetails[0].accountId;
            
            List<JOb__c> fatchJobs = new List<Job__c>();
            List<Contact> contactDetail = [select Name , Id, subscriptionType__c from contact where Id = :userContactId];
            if(contactDetail[0].subscriptionType__c == 'Free'){
                fatchJobs = [SELECT Id, Salary_Range__c,Minimum_Qualification__c , school__r.name,Country__c,Grade_Range__c , Organization__c, CreatedDate  , Job_Description__c, Job_Type__c, Job_Close_Date__c, Number_Of_Openings__c,Is_LeaderShip__c ,  Minimum_experience__c, Certification_Required__c, Cover_letter__c, Media_Link__c, Curriculum__c, Education_Level__c, Department__c, Job_Category__c, Job_Position__c, Name FROM Job__c where Is_LeaderShip__c  = True order by createdDate Desc limit 10 ];        
                System.debug('List according to Free subscription ' + fatchJObs);
            }else {
                fatchJobs = [SELECT Id, Salary_Range__c,Minimum_Qualification__c , school__r.name,Country__c,Grade_Range__c , Organization__c, CreatedDate  , Job_Description__c, Job_Type__c, Job_Close_Date__c, Number_Of_Openings__c,  Minimum_experience__c, Certification_Required__c, Cover_letter__c, Media_Link__c, Curriculum__c, Education_Level__c, Department__c, Job_Category__c, Job_Position__c, Name FROM Job__c order by createdDate Desc limit 10];
            }
            
            // ********* this Code for View Open Jobs filter ***** 
            List<String> lstPickvals=new List<String>();
            Schema.SObjectType targetType = Schema.getGlobalDescribe().get('Job__c');//From the Object Api name retrieving the SObject
            Sobject Object_name = targetType.newSObject();
            Schema.sObjectType sobject_type = Object_name.getSObjectType(); //grab the sobject that was passed
            Schema.DescribeSObjectResult sobject_describe = sobject_type.getDescribe(); //describe the sobject
            Map<String, Schema.SObjectField> field_map = sobject_describe.fields.getMap(); //get a map of fields for the passed sobject
            List<Schema.PicklistEntry> pick_list_values = field_map.get('Job_Position__c').getDescribe().getPickListValues(); //grab the list of picklist values for 
            for (Schema.PicklistEntry a : pick_list_values) 
            { 
                //for all values in the picklist list
                lstPickvals.add(a.getValue());//add the value  to our final list
            }
            
            //this piclist return the subjects ;   
            
            List<String> subjectPicklists=new List<String>();
            Schema.SObjectType subjectTargetType = Schema.getGlobalDescribe().get('Job__c');//From the Object Api name retrieving the SObject
            Sobject subjectObject_name = subjectTargetType.newSObject();
            Schema.sObjectType subjectsObject_type = subjectObject_name.getSObjectType(); //grab the sobject that was passed
            Schema.DescribeSObjectResult subject_sobject_describe = subjectsObject_type.getDescribe(); //describe the sobject
            Map<String, Schema.SObjectField> subject_field_map = subject_sobject_describe.fields.getMap(); //get a map of fields for the passed sobject
            List<Schema.PicklistEntry> subject_pick_list_values = subject_field_map.get('Subject__c').getDescribe().getPickListValues(); //grab the list of picklist values for 
            for (Schema.PicklistEntry a : subject_pick_list_values) 
            { 
                //for all values in the picklist list
                subjectPicklists.add(a.getValue());//add the value  to our final list
            }
            
            // this picklist retrun the department  
            List<String> departPicklists=new List<String>();
            Schema.SObjectType depart_TargetType = Schema.getGlobalDescribe().get('Job__c');//From the Object Api name retrieving the SObject
            Sobject depart_Object_name = depart_TargetType.newSObject();
            Schema.sObjectType depart_sobject_type = depart_Object_name.getSObjectType(); //grab the sobject that was passed
            Schema.DescribeSObjectResult depart_sobject_describe = depart_sobject_type.getDescribe(); //describe the sobject
            Map<String, Schema.SObjectField> depart_field_map = depart_sobject_describe.fields.getMap(); //get a map of fields for the passed sobject
            List<Schema.PicklistEntry> depart_pick_list_values = depart_field_map.get('Department__c').getDescribe().getPickListValues(); //grab the list of picklist values for 
            for (Schema.PicklistEntry a : depart_pick_list_values) 
            { 
                //for all values in the picklist list
                departPicklists.add(a.getValue());//add the value  to our final list
            }
            
            
            // this code will help me country picklist 
            List<String> Country_Picklists=new List<String>();
            Schema.SObjectType country_TargetType = Schema.getGlobalDescribe().get('Job__c');//From the Object Api name retrieving the SObject
            Sobject country_Object_name = country_TargetType.newSObject();
            Schema.sObjectType country_sobject_type = country_Object_name.getSObjectType(); //grab the sobject that was passed
            Schema.DescribeSObjectResult country_sobject_describe = country_sobject_type.getDescribe(); //describe the sobject
            Map<String, Schema.SObjectField> country_field_map = country_sobject_describe.fields.getMap(); //get a map of fields for the passed sobject
            List<Schema.PicklistEntry> country_pick_list_values = country_field_map.get('Country__c').getDescribe().getPickListValues(); //grab the list of picklist values for 
            for (Schema.PicklistEntry a : country_pick_list_values) 
            { 
                //for all values in the picklist list
                Country_Picklists.add(a.getValue());//add the value  to our final list
            }
            
            
            
            
            
            
            //***** this code for show all the jobs in UI*********//
            jobWrapper  jobWrapperObj = new jobWrapper();
            System.debug('wire called form lwc');
            
            // ,( select Id , Name from Candidate_jobs__r)
            System.debug('fatch jobs ' + fatchJobs);
            jobWrapperObj.listOfJobs = fatchJobs;
            jobWrapperObj.listOfRoles = lstPickvals ; 
            jobWrapperObj.departPicklist = departPicklists;
            jobWrapperObj.subjectPicklist =subjectPicklists;
            jobWrapperObj.countryPicklist = Country_Picklists;
            
            
            return jobWrapperObj;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage() + 'line number => ' + e.getLineNumber());
        }
        
    }
    
    @AuraEnabled(cacheable=true)
    public static List<List<String>> getAllFiltersOptionValues(){

        List<List<String>> fieldsValues = new List<List<String>>();

        List<String> pickListValuesListCountries= new List<String>();
		Schema.DescribeFieldResult countryFieldOptions = Job__c.Country__c.getDescribe();
		List<Schema.PicklistEntry> countryFieldOptionsElement = countryFieldOptions.getPicklistValues();
		for( Schema.PicklistEntry pickListVal : countryFieldOptionsElement){
			pickListValuesListCountries.add(pickListVal.getLabel());
		}    

        fieldsValues.add(pickListValuesListCountries);

       

        List<String> pickListValuesListSubject= new List<String>();
		Schema.DescribeFieldResult SubjectFieldOptions = Job__c.Subject__c.getDescribe();
		List<Schema.PicklistEntry> SubjectFieldOptionsElement = SubjectFieldOptions.getPicklistValues();
		for( Schema.PicklistEntry pickListVal : SubjectFieldOptionsElement){
			pickListValuesListSubject.add(pickListVal.getLabel());
		}    

        fieldsValues.add(pickListValuesListSubject);

        List<String> pickListValuesListDepartment= new List<String>();
		Schema.DescribeFieldResult DepartmentFieldOptions = Job__c.Department__c.getDescribe();
		List<Schema.PicklistEntry> DepartmentFieldOptionsElement = DepartmentFieldOptions.getPicklistValues();
		for( Schema.PicklistEntry pickListVal : DepartmentFieldOptionsElement){
			pickListValuesListDepartment.add(pickListVal.getLabel());
		}    

        fieldsValues.add(pickListValuesListDepartment);
        
        List<String> pickListValuesListCurriculum= new List<String>();
		Schema.DescribeFieldResult CurriculumFieldOptions = Job__c.curriculum_multi__c.getDescribe();
		List<Schema.PicklistEntry> CurriculumFieldOptionsElement = CurriculumFieldOptions.getPicklistValues();
		for( Schema.PicklistEntry pickListVal : CurriculumFieldOptionsElement){
			pickListValuesListCurriculum.add(pickListVal.getLabel());
		}    

        fieldsValues.add(pickListValuesListCurriculum);

        return fieldsValues;
    }

    @AuraEnabled
    public static List<sObject> getFilteredData(String roles){
        String WhereCondition = '';
        System.debug('roles =>' + roles );     
        List<Object> objList = (List<object>)JSON.deserializeUntyped(roles);
        Map<String ,String > nmap = new Map<String , String > ();
        
        for(object o : objlist){
            Map<String ,Object > nmap2 = (Map<String ,Object >) o;
            system.debug('val => ' + (String)nmap2.get('value'));
            whereCondition += (String)nmap2.get('value') + ' AND ';
            
        }	
        system.debug('map => ' + nmap);
        whereCondition = WhereCondition.substring(0, whereCondition.length() - 4 );
        System.debug('where condition '  + WhereCondition);
        List<sObject> jobfilterList = Database.query('SELECT Id, Salary_Range__c,Minimum_Qualification__c , school__r.name,Country__c,Grade_Range__c , Organization__c, CreatedDate  , Job_Description__c, Job_Type__c, Job_Close_Date__c, Number_Of_Openings__c, Job_Role_Start_Date__c, Minimum_experience__c, Certification_Required__c, Cover_letter__c, Media_Link__c, Curriculum__c, Education_Level__c, Department__c, Job_Category__c, Job_Position__c, Name FROM Job__c where '+whereCondition);
        return jobFilterList;
    }
    @AuraEnabled
    public static list<Job__c> getAccountData(String searchfields) {
        //searchfields = (searchfields + '%');
        list<Job__c> accLst = [SELECT Id, Salary_Range__c,Minimum_Qualification__c, Education_Level__c , Job_Close_Date__c , school__r.name,Country__c,Grade_Range__c , Organization__c, Name From Job__c WHERE Name LIKE :( '%'+ searchfields + '%') ];
        System.debug('acclist' + accLst);
        if(accLst.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }
        return accLst; 
    }
    @AuraEnabled
    public static Job__c fatchJobDetails(String recordId ){
        try {
            System.debug('recordId ' + recordId );
            List<Job__c> jobDetails = [SELECT Id,Salary_Range__c,Minimum_Qualification__c , school__r.name,Country__c,Grade_Range__c , Organization__c, CreatedDate  , Job_Description__c, Job_Type__c, Job_Close_Date__c, Number_Of_Openings__c, Job_Role_Start_Date__c, Certification_Required__c, Cover_letter__c, Media_Link__c, Curriculum__c, Education_Level__c, Department__c, Job_Category__c, Job_Position__c, Name FROM Job__c where Id =: recordId LIMIT 1];
            System.debug('List Of Job details ' + jobDetails);
            Job__c jobdetailsValues = jobDetails[0];
            return jobdetailsValues;
        } 
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<Id> saveFiles(String filesToInsert){
        
        List<Id> lst = new List<Id>();
        List<FileInfo> data = (List<FileInfo>) System.JSON.deserializeStrict(filesToInsert, List<FileInfo>.class);
        List<ContentVersion> lstVersionsToInsert = new List<ContentVersion>();
        for (FileInfo file : data) {
            system.debug(file);
            ContentVersion objCntVersion = new ContentVersion();
            objCntVersion.PathOnClient = file.Title;
            objCntVersion.Title = file.Title;
            objCntVersion.VersionData = file.VersionData;
            lstVersionsToInsert.add(objCntVersion);
            
        }
        system.debug(lstVersionsToInsert);
        
        if(lstVersionsToInsert.size() > 0){
            insert lstVersionsToInsert;
            system.debug(lstVersionsToInsert);
            List<ContentVersion> contVer = [SELECT Id, ContentDocumentId FROM ContentVersion where Id In :lstVersionsToInsert];
            for(ContentVersion cv: contVer){
                
                lst.add(cv.ContentDocumentId);
                system.debug(lst);
            }
            
            
        }
        system.debug(lst);
        return lst;
    }
    @AuraEnabled
    public static String submitJobApplication(String Jobappliedstr, String Status,String docDatas)
    {
        List<Id> documentIDs = saveFiles(docDatas);
        system.debug('Jobappliedstr'+Jobappliedstr);
        String newString=Jobappliedstr.replace('"','');
        System.debug('newString'+documentIDs[0]);
        //Job__c Jobapplied = (Job__c) JSON.deserializeStrict(Jobappliedstr, Job__c.class);
        User u = [SELECT Id, ContactId FROM User WHERE Id =: UserInfo.getUserId()];
        system.debug(u);
        Contact conLst = [Select id,Applied_Jobs__c, SubscriptionType__c from Contact where Id=:u.ContactId LIMIT 1];
        system.debug(conLst);
        system.debug('conLst.SubscriptionType__c'+conLst.SubscriptionType__c);
        if(conLst.SubscriptionType__c == 'Trial'){
            system.debug(conLst.Applied_Jobs__c);
            if(true){
                Candidate_Job__c CJ = new Candidate_Job__c(Contact__c=u.ContactId, Job__c=newString, Status__c=Status);
                insert CJ;
                system.debug(CJ);
                List<ContentDocumentLink> insertDocument = new List<ContentDocumentLink>();
               // for(Id DocId: documentIDs){
                 //   system.debug(DocId);
                    
                    ContentDocumentLink CDL = new ContentDocumentLink();
                    CDL.LinkedEntityId = CJ.Id;
                    CDL.ContentDocumentId = documentIDs[0];
                    CDL.ShareType = 'V';
                    CDL.Visibility = 'AllUsers';
                    system.debug(CDL);
                    insertDocument.add(CDL);
               // }
                if(insertDocument.size() > 0){
                    insert insertDocument;
                }
                
                return 'Applied Successfully!';
            }
            else{
                return 'Please Update Your Account to Premium';
            }
            
        }
        if(conLst.SubscriptionType__c == 'Premium')
        {
            Candidate_Job__c CJ = new Candidate_Job__c(Contact__c=u.ContactId, Job__c=newString, Status__c=Status);
            insert CJ;
            system.debug(CJ);
            List<ContentDocumentLink> insertDocument = new List<ContentDocumentLink>();
           // for(String DocId: documentIDs){
                system.debug(documentIDs[0]);
                
                ContentDocumentLink CDL = new ContentDocumentLink();
                CDL.LinkedEntityId = CJ.Id;
                CDL.ContentDocumentId = documentIDs[0];
                CDL.ShareType = 'V';
                CDL.Visibility = 'AllUsers';
                system.debug(CDL);
                insertDocument.add(CDL);
           // }
            if(insertDocument.size() > 0){
                insert insertDocument;
            }
            
            return 'Applied Successfully!';
        }
        else{
            return 'Please Update Your Account to Premium';
        }
        //return 'Applied Successfully';
        
        
    }
    
    @AuraEnabled
    public static list<Job__c> getJOBFilters( string startDate , List<string> departments , List<string> subject , List<string> Country,ID recordId , Integer limitSize, Integer offset)
    {
        System.debug('Hello');
        /*List<String> departments1 = departments.split(',');
List<String> subject1 = subject.split(',');
List<String> country1 = Country.split(',');*/
        
        
        /*System.debug('!!->'+departments1);
System.debug('!!->'+departments1);
System.debug('!!->'+departments1);
String depts = getSets( departments1 );
String countrys = getSets( country1 );
String subjects = getSets( subject1 );*/
        
        String endDateStr ='';
        string dateStart;
        string dateEnd;
        if(startDate!=null && startDate!=''){
            List<String> dateLst = startDate.split(' - ');
            endDateStr = dateLst[1];
            dateStart = String.ValueOf(Date.valueOf(dateLst[0]));
            dateEnd = String.ValueOf(Date.valueOf(dateLst[1]));
            
        }
        system.debug(dateStart);
        system.debug(dateEnd);
        
        system.debug('getJobFilterCalled');
        system.debug('startDate'+'='+startDate + '---'+'departments'+'='+departments + '---'+'subject'+'='+subject + '---'+'Conuntry'+'='+Country + '---'+'recordId'+'='+recordId);
        List<User> userDetails = [SELECT Id, name, accountid , ContactId FROM User where Id = :recordId];
        system.debug('userDetails=>'+userDetails);
        String userContactId = userDetails[0].contactId;
        String userAccountId = userDetails[0].accountId;
        system.debug('userContactId=>'+userContactId);
        List<JOb__c> fatchJobs = new List<Job__c>();
        List<Contact> contactDetail = [select Name , Id, subscriptionType__c from contact where Id = :userContactId];
        system.debug('contactDetail=>'+contactDetail);
        string query = 'Select Name,Id,Salary_Range__c,Subject__c,Minimum_Qualification__c, school__r.name, school__r.Description, Country__c, Grade_Range__c, Organization__c, CreatedDate, Job_Description__c, Job_Type__c, Job_Close_Date__c, Number_Of_Openings__c, Is_LeaderShip__c,  Minimum_experience__c, Certification_Required__c, Cover_letter__c, Media_Link__c, Curriculum__c, Education_Level__c, Department__c, Job_Category__c, Job_Position__c from Job__c ';
        
        if(contactDetail[0].subscriptionType__c == 'Free')
        {
            query = query + ' where Is_LeaderShip__c  = True';
        }
        else
        {
            query = query + ' where Is_LeaderShip__c  = false';
        }
        
        
        if(departments.size() > 0 && !departments.contains('Any'))
        {
            query = query + ' AND Department__c IN :departments';
        }
        
        if(subject.size() > 0 && !subject.contains('Any') )
        {
            query = query + ' AND Subject__c IN :subject';
            
        }
        
        if(Country.size() > 0 && !Country.contains('Any'))
        {	
            query = query + ' AND Country__c IN :country';
        }
        
        if(startDate != null && startDate != '' && startDate != 'None')
        {
            query = query + ' AND DAY_ONLY(Job_Role_Start_Date__c) > ' +dateStart;
        }
        if(endDateStr != null && endDateStr != '' && endDateStr != 'None')
        {
            query = query + ' AND DAY_ONLY(Job_Role_Start_Date__c) < '  +dateEnd;
        }
        
        
        query = query +' Order By createdDate LIMIT '+limitSize +' OFFSET '+offset;
        system.debug('-->>'+query);
        
        list<Job__c> jbs = database.query(query);
        
        system.debug('jbs=>'+jbs);
        return jbs;
    }
    
    static String getSets( List<String> arrs ){
        String value = '(';
        for( String arr : arrs ){
            value+='\''+arr+'\',';
        }
        if( value.length() > 1 ){
            value = value.substring( 0, value.length()-1 );
        }
        value+=')';
        return value;
    }
    @AuraEnabled(cacheable = true )
    public static List<String> getSubjectPickListValues(){
        List<String> pickListValuesList= new List<String>();
        Schema.DescribeFieldResult fieldResult = job__c.Subject__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for( Schema.PicklistEntry pickListVal : ple){
            pickListValuesList.add(pickListVal.getLabel());
        }     
        return pickListValuesList;
    }
    
    
    @AuraEnabled
    public static void addJobToBookmark(string userId,string jobId){
        Id contactId = [Select contactId from user where Id = :UserId].contactId;
        // Candidate_Job__c bookmarkRecord = new Candidate_Job__c(Job__c = jobId ,Contact__c = contactId ,Bookmarked__c = true );
        Activity_Tracker__c bookmarkRecord = new Activity_Tracker__c(Current_User__c = contactId , Job__c = jobId, Bookmark__c  = true);
        insert bookmarkRecord;
    }
    
    @AuraEnabled
    public static void removeJobFromBookmark(string userId,string jobId){
        Id contactId = [Select contactId from user where Id = :UserId].contactId;
        // List<Candidate_Job__c> CandidatJob = [Select Bookmarked__c from Candidate_Job__c where Job__c = :jobId AND Contact__c = :contactId limit 1];
        List<Activity_Tracker__c> CandidatJob = [Select Name,Bookmark__c from Activity_Tracker__c where Job__c = :jobId AND Current_User__c = :contactId];
      // CandidatJob[0].Bookmark__c = false;
        delete CandidatJob;
    }
    
    @AuraEnabled
    public static string checkBookmark(string userId , string jobId){
        Id contactId = [Select contactId from user where Id = :UserId].contactId;
        // List<Candidate_Job__c> CandidatJob = [Select Bookmarked__c from Candidate_Job__c where Job__c = :jobId AND Contact__c = :contactId limit 1];
        List<Activity_Tracker__c> CandidatJob = [Select Name from Activity_Tracker__c where Job__c = :jobId AND Current_User__c = :contactId AND Bookmark__c  = true];
        
        string returnStr;
        if(CandidatJob.size() > 0)
        {
            returnStr = 'true';
            // if(CandidatJob[0].Bookmarked__c == true)
            // {
            //     returnStr = 'true';
            // }
            // else
            // {
            //     returnStr = 'false';
            // }
        }
        else
        {
            returnStr = 'false';
        }
        return returnStr;
    }
    
    @AuraEnabled
    public static string checkApplyStatus(string userId , string jobId){
        Id contactId = [Select contactId from user where Id = :UserId].contactId;
        List<Candidate_Job__c> jobRecords = [Select Name from Candidate_Job__c where Bookmarked__c = false AND Job__c = :jobId AND Contact__c = :contactId];
        if(jobRecords.size() > 0)
        {
            return 'Applied';
        }
        else
        {
            return 'Not Applied';
        }
    }
    
    @AuraEnabled
    public static string checkApplyLimit(string userId){
        Id contactId = [Select contactId from user where Id = :UserId].contactId;
        contact contactRecord = [Select Name , SubscriptionType__c from contact where Id = :contactId];
        if(contactRecord.SubscriptionType__c == 'Trial')
        {
            List<Candidate_Job__c> jobRecords = [Select Name from Candidate_Job__c where Bookmarked__c = false AND Contact__c = :contactId];
            if(jobRecords.size() > 4)
            {
                return 'Not Allow';
            }
            else
            {
                return 'Allow';
            }
        }
        else
        {
            return 'Allow';
        }
    }
    
    
    public class FileInfo {
        public String ID;
        public String Title;
        public Blob VersionData;
    }
    
    
    @AuraEnabled(cacheable = true )
    public static List<Account> getAllSchoolName(){
        List<Account> SchoolList = [Select Id , Name from Account];
        
        return SchoolList;
    }
    @AuraEnabled
    public static Account getSchoolDataForJob(Id jobId){
        Job__c j = [Select id, School__c  from Job__c where id =:jobId];
        system.debug(j);
        Account school = [SELECT Id,Name,siteUrl__c ,Tuition_Year__c ,Tuition_Fees_Lower_Limit__c ,Tuition_Fees_Upper_Limit__c ,Regional_Organizational_Membership__c, foundedYear__c, School_Type__c, calenderLink__c, accreditation__c, accreditationBy__c, organization__c, governance__c, religion__c, ownerShip__c, studentBody__c, generalEmail__c, jobEmail__c, phone__c, fax__c, contractStartMonth__c, contractEndMonth__c, initialContractLengthTeacher__c, initialContractLengthAdmin__c, salaryPaidIn__c, percentPaidInUsd__c, certificationNeeded__c, hasVisaRestrictions__c, maximumAge__c, schoolProvidesVisaAssistance__c, interns__c, minimumYearsOfExperience__c, minimumQualifications__c, localTaxes__c, savingsPotentialSingle__c, savingsPotentialTeam__c, teachingDays__c, localTaxPercent__c, schoolHiringPreference__c, selectedReligion__c, languagesTaught__c, clubs__c, sports__c, extraCurricularActivities__c, examinations__c, schoolSupportServices__c, averageClassSize__c, collegeGraduatesPercent__c, universitiesAttended__c, languagesOfInstruction__c, studentEnrolmentPreK__c, studentEnrolmentElementary__c, studentEnrolmentMiddleSchool__c, studentEnrolmentHighSchool__c, studentEnrolmentGrade13__c, studentNationalitiesRepresented__c, studentEnrolmentNursery__c, studentEndGrade__c, studentStartGrade__c, adminSalaryLowerLimit__c, adminSalaryUpperLimit__c, teacherSalaryUpperLimit__c, teacherSalaryLowerLimit__c, teacherNationalitiesRepresented__c, diversity__c, diversityComment__c, childProtection__c, childProtectionComment__c, hasDentalInsurance__c, hasOpportunitiesForDependents__c, opportunityForDependentsNote__c, disabilityInsuranceNote__c, hasDisabilityInsurance__c, dentalInsuranceNote__c, medicalInsuranceNote__c, hasMedicalInsurance__c, recurringTransportationNote__c, hasRecurringTransportation__c, Country__c, CustomerPriority__c, NumberofLocations__c, studentPopulation__c, expectedJobListingsPerAnnum__c, annualTuitionFee__c, hasAdvancedCurriculum__c, memberShipStatus__c, annualMembershipFeesInUSD__c, memberShipType__c, memberShipExpiry__c, blogLinks__c, overview__c, expectation__c, hasSavingsPotential__c, savingsPotentialNote__c, hasRetirementPlan__c, retirementPlanNote__c, hasTaxes__c, taxesNote__c, hasTuitionForDependents__c, tuitionForDependentsNote__c, hasTransportation__c, transportationNote__c, hasMovingAllowance__c, movingAllowanceNote__c, hasSettlingInAllowance__c, settlingInAllowanceNote__c, hasAccommodation__c, accommodationNote__c, isAccommodationShared__c, accommodationSharedNote__c, hasUtilities__c, utilitiesNote__c, certifications__c, citizenshipRestrictions__c, otherInfo__c, orgmembership__c, history__c, yearlyReportingDate__c FROM Account where Id =:j.School__c ];
      		system.debug(school);  
        return school;
    }
    
    @AuraEnabled
    public static Map<string,Object> getMorefilterResults(String startDate, String bookmark, string UserId ,Integer limitSize, Integer offset, List<string> department, List<String> Subject, List<String> Country, List<String> JobType,List<String> School,List<String> curriculum,String ApplyDateFrom,String ApplyDateTo,String PositionDateFrom, String PositionDateTo, String NewJobsDateFrom, String NewJobsDateTo){
        System.debug('More:'+bookmark);
        Id currentContactId = [Select contactId from user where Id = :UserId].contactId;
        Contact contactDetail = [select Name , Id, subscriptionType__c from contact where Id = :currentContactId];
        String endDateStr ='';
        string dateStart;
        string dateEnd;
        String totalexp = '';
       	String startexp;
        String endexp;
        if(startDate!=null && startDate!=''){
            List<String> dateLst = startDate.split(' - ');
            if(dateLst.size()>1){
                endDateStr = dateLst[1];
                dateStart = String.ValueOf(Date.valueOf(dateLst[0]));
                dateEnd = String.ValueOf(Date.valueOf(dateLst[1]));
            }else{
                dateStart = String.ValueOf(Date.valueOf(dateLst[0]));
            }
            
            
        }
        /**
        if(exp!=null && exp!=''){
            List<String> expList = exp.split('-');
            if(expList.size()>1){
                totalexp = expList[1];
                startexp = String.ValueOf(expList[0]);
                endexp = String.ValueOf(expList[1]);
            }else{
                startexp = String.ValueOf(expList[0]);
            }
            
            
        } **/
        
        system.debug(dateStart);
        system.debug(dateEnd);
        system.debug(startexp);
        system.debug(endexp);
        
        string query; 
        string query2;
        //Boolean bookmark = true;
        List<Activity_Tracker__c> newActivity = new List<Activity_Tracker__c>();
        List<Id> newJobs = new List<Id>();
        /**
        if(bookmark=='Bookmark: Show Only Bookmarks'){
             newActivity = [Select id,Job__c from Activity_Tracker__c where Bookmark__c = true and Job__c!=null And Current_User__c =:currentContactId Limit 50000];
            for(Activity_Tracker__c j : newActivity){
                newJobs.add(j.Job__c);
            }

        }
        
        else if(bookmark=='Bookmark: Don\'t Show Bookmarks'){
            newActivity = [Select Job__c from Activity_Tracker__c where Bookmark__c = false and Job__c!=null Limit 50000];
            for(Activity_Tracker__c j : newActivity){
                newJobs.add(j.Job__c);
            }
        }else{
            
        }
        system.debug('newJobs--+'+newJobs); **/
        
          newActivity = [Select id,Job__c from Activity_Tracker__c where Bookmark__c = true and Job__c!=null And Current_User__c =:currentContactId Limit 50000];
            for(Activity_Tracker__c j : newActivity){
                newJobs.add(j.Job__c);
            }
        
        if(contactDetail.subscriptionType__c == 'Free'){
            query2 = 'Select Count(Id)  FROM Job__c where Is_LeaderShip__c  = True ';
            query = 'SELECT Id, Salary_Range__c,Minimum_Qualification__c , school__r.name, school__r.Description , Country__c,Grade_Range__c , Subject__c , Organization__c, CreatedDate  , Job_Description__c, Job_Type__c, Job_Role_Start_Date__c , Job_Close_Date__c, Number_Of_Openings__c,Is_LeaderShip__c ,  Minimum_experience__c, Certification_Required__c, Cover_letter__c, Media_Link__c, Curriculum__c, Education_Level__c, Department__c, Job_Category__c, Job_Position__c, Name FROM Job__c where Is_LeaderShip__c  = True ';
        }else {
            query2 = 'Select Count(Id)  FROM Job__c where Is_LeaderShip__c  = False ';
            query = 'SELECT Id, Salary_Range__c,Minimum_Qualification__c , school__r.name, school__r.Description , Country__c,Grade_Range__c , Subject__c , Organization__c, CreatedDate  , Job_Description__c, Job_Type__c, Job_Role_Start_Date__c , Job_Close_Date__c, Number_Of_Openings__c,  Minimum_experience__c, Certification_Required__c, Cover_letter__c, Media_Link__c, Curriculum__c, Education_Level__c, Department__c, Job_Category__c, Job_Position__c, Name FROM Job__c where Is_LeaderShip__c  = False ';
        }
        
        if(department.size() > 0 && !department.contains('Any'))
        {
            query = query + ' AND Department__c IN :department';
            query2 = query2 + ' AND Department__c IN :department';
        }
        
        
        
        if(subject.size() > 0 && !subject.contains('Any'))
        {
            query = query + ' AND Subject__c IN :subject';
            query2 = query2 + ' AND Subject__c IN :subject';
            
        }
        
        if(startDate != null && startDate != '' && startDate != 'None')
        {
            query = query + ' AND DAY_ONLY(Job_Role_Start_Date__c) > ' +dateStart;
            query2 = query2 + ' AND DAY_ONLY(Job_Role_Start_Date__c) > ' +dateStart;
        }
        if(endDateStr != null && endDateStr != '' && endDateStr != 'None')
        {
            query = query + ' AND DAY_ONLY(Job_Role_Start_Date__c) < '  +dateEnd;
            query2 = query2 + ' AND DAY_ONLY(Job_Role_Start_Date__c) < '  +dateEnd;
        }
        /**
        if(startexp != null && startexp != '' && startexp != 'None')
        {
           
            query = query + 'AND Minimum_experience__c > ' + '\''+startexp+'\'';
            System.debug('start query-->'+query);
        }
        if(endexp != null && endexp != '' && endexp != 'None')
        {
            query = query + 'AND Minimum_experience__c < '  +endexp;
            System.debug('end query-->'+query);
            
        }
**/
        
        if(Country.size() > 0 && !Country.contains('Any'))
        {	
            query = query + ' AND Country__c IN :Country';
            query2 = query2 + ' AND Country__c IN :Country';
        }
        
        if(JobType.size() > 0 && !JobType.contains('Any'))
        {	
            query = query + ' AND Job_Type__c IN :JobType';
            query2 = query2 + ' AND Job_Type__c IN :JobType';
        }
        
        
        if(curriculum.size() > 0 && !curriculum.contains('Any'))
        {	
            query = query + ' AND Curriculum__c IN :curriculum';
            query2 = query2 + ' AND Curriculum__c IN :curriculum';
        }
        
        
        
        if(School.size() > 0 && !School.contains('Any'))
        {	
            query = query + ' AND school__r.name IN :School';
            query2 = query2 + ' AND school__r.name IN :School';
        }
        // Experience
        // curriculum
        // ApplyDateFrom
        // ApplyDateTo
        // PositionDateFrom
        // PositionDateTo
        // NewJobsDateFrom
        // NewJobsDateTo
        //  bookmark
        
        string lastQuery = query;
        system.debug('query--'+query);
        string countQuery = query2;
        if(bookmark !='Bookmark: Show All' && bookmark!='Bookmark: Don\'t Show Bookmarks' && bookmark!=''){
            query = query + ' AND Id IN :newJobs Order By createdDate LIMIT '+limitSize+' OFFSET '+offset;
            query2 = query2+' AND Id IN :newJobs';
        } else if(bookmark == 'Bookmark: Don\'t Show Bookmarks'){
            
             query = query + ' AND Id NOT IN :newJobs Order By createdDate LIMIT '+limitSize+' OFFSET '+offset;
            query2 = query2+' AND Id NOT IN :newJobs';
            
        }
            
            else{
         	query = query + ' Order By createdDate LIMIT '+limitSize+' OFFSET '+offset;   
        }        
        //query = query + ' AND Id IN :newActivity Order By createdDate LIMIT '+limitSize+' OFFSET '+offset;
        system.debug('queryBook--'+query);
        
        list<Job__c> jobList = database.query(query);
        AggregateResult[] groupedResults = database.query(query2);
        
        
        list<Job__c> jobListBookmark = new list<Job__c>();
        Map<String,Object> m = new Map<String, Object>(); 
        m.put('data', jobList);
        m.put('count', groupedResults);
        return m;
        /** if(bookmark == 'true')
{
List<Candidate_Job__c> CandidatJob = [Select Bookmarked__c , Job__c , Contact__c from Candidate_Job__c where Bookmarked__c = true AND Contact__c = :currentContactId];

system.debug(CandidatJob);
for(Candidate_Job__c bookMarkJob : CandidatJob)
{
for(Job__c job : jobList)
{
if((String)job.Id == (String)bookMarkJob.Job__c)
{
system.debug('Matched');
jobListBookmark.add(job);
}
}
}

return jobListBookmark;
}
else
{ 
return jobList;
}  **/
    }
    @AuraEnabled
    public static Map<String, List<sObject>> getBestMatchRecs(String startDate, String bookmark, Id userId ,Integer limitSize, Integer offset, List<string> department, List<String> Subject, List<String> Country, List<String> JobType,List<String> School,List<String> curriculum,String ApplyDateFrom,String ApplyDateTo,String PositionDateFrom, String PositionDateTo, String NewJobsDateFrom, String NewJobsDateTo){
        try {
            List<User> user = [SELECT Id, ContactId FROM User WHERE Id = :userId];
            if( user.size() > 0 ){
                List<Id> matchedContIds = new List<Id>();
                Contact cont = [SELECT Id, subscriptionType__c, Experience__c, Preferred_Jobtype__c FROM Contact WHERE Id = :user[0].ContactId LIMIT 1];
                
                /* More Filter
                String endDateStr ='';
                string dateStart;
                string dateEnd;
                String totalexp = '';
                String startexp;
                String endexp;
                if(startDate!=null && startDate!=''){
                    List<String> dateLst = startDate.split(' - ');
                    if(dateLst.size()>1){
                        endDateStr = dateLst[1];
                        dateStart = String.ValueOf(Date.valueOf(dateLst[0]));
                        dateEnd = String.ValueOf(Date.valueOf(dateLst[1]));
                    }else{
                        dateStart = String.ValueOf(Date.valueOf(dateLst[0]));
                    }
                    
                    
                }
                string query; 
                List<Activity_Tracker__c> newActivity = new List<Activity_Tracker__c>();
                List<Id> newJobs = new List<Id>();
                
                newActivity = [Select id,Job__c from Activity_Tracker__c where Bookmark__c = true and Job__c!=null And Current_User__c =:cont.Id Limit 50000];
                for(Activity_Tracker__c j : newActivity){
                    newJobs.add(j.Job__c);
                }
                
                if(cont.subscriptionType__c == 'Free'){
                    query = 'SELECT Id, Salary_Range__c,Minimum_Qualification__c , school__r.name, school__r.Description , Country__c,Grade_Range__c , Subject__c , Organization__c, CreatedDate  , Job_Description__c, Job_Type__c, Job_Role_Start_Date__c , Job_Close_Date__c, Number_Of_Openings__c,Is_LeaderShip__c ,  Minimum_experience__c, Certification_Required__c, Cover_letter__c, Media_Link__c, Curriculum__c, Education_Level__c, Department__c, Job_Category__c, Job_Position__c, Name FROM Job__c where ( Is_LeaderShip__c  = True ';
                }else {
                    query = 'SELECT Id, Salary_Range__c,Minimum_Qualification__c , school__r.name, school__r.Description , Country__c,Grade_Range__c , Subject__c , Organization__c, CreatedDate  , Job_Description__c, Job_Type__c, Job_Role_Start_Date__c , Job_Close_Date__c, Number_Of_Openings__c,  Minimum_experience__c, Certification_Required__c, Cover_letter__c, Media_Link__c, Curriculum__c, Education_Level__c, Department__c, Job_Category__c, Job_Position__c, Name FROM Job__c where ( Is_LeaderShip__c  = False ';
                }
                
                if(department.size() > 0 && !department.contains('Any'))
                {
                    query = query + ' AND Department__c IN :department';
                }
                
                
                
                if(subject.size() > 0 && !subject.contains('Any'))
                {
                    query = query + ' AND Subject__c IN :subject'; 
                }
                
                if(startDate != null && startDate != '' && startDate != 'None')
                {
                    query = query + ' AND DAY_ONLY(Job_Role_Start_Date__c) > ' +dateStart;
                }
                if(endDateStr != null && endDateStr != '' && endDateStr != 'None')
                {
                    query = query + ' AND DAY_ONLY(Job_Role_Start_Date__c) < '  +dateEnd;
                }
                if(Country.size() > 0 && !Country.contains('Any'))
                {	
                    query = query + ' AND Country__c IN :Country';
                }
                
                if(JobType.size() > 0 && !JobType.contains('Any'))
                {	
                    query = query + ' AND Job_Type__c IN :JobType';
                }
                
                
                if(curriculum.size() > 0 && !curriculum.contains('Any'))
                {	
                    query = query + ' AND Curriculum__c IN :curriculum';
                }
                
                
                
                if(School.size() > 0 && !School.contains('Any'))
                {	
                    query = query + ' AND school__r.name IN :School';
                }
                
                string lastQuery = query;
                system.debug('query--'+query);
                if(bookmark !='Bookmark: Show All' && bookmark!='Bookmark: Don\'t Show Bookmarks' && bookmark!=''){
                    query = query + ' AND Id IN :newJobs Order By createdDate LIMIT '+limitSize+' OFFSET '+offset;
                } else if(bookmark == 'Bookmark: Don\'t Show Bookmarks'){
                    query = query + ' AND Id NOT IN :newJobs )';
                }
                
                else{
                    query = query + ' )';   
                }        
                More Filter End */
                
                Map<String, Schema.SObjectField> fieldMap = Job__c.sObjectType.getDescribe().fields.getMap();
                Map<String, List<sObject>> matchedRecordMap = new Map<String, List<sObject>>();
                // Get all of the fields on the object
                
                Set<String> setFieldNames = fieldMap.keySet();
                list<String> lstFieldNames = new List<String>(setFieldNames);
                String query = 'SELECT ' + String.join(lstFieldNames, ',') + ' FROM Job__c';
                String mustHaveRecsQuery = fillMustHave( query, cont );
                
                System.debug('mustHaveRecsQuery');
                List<sObject> mustHaveRecs = new List<sObject>();
                List<sObject> keyMatchRecs = new List<sObject>();
                if( mustHaveRecsQuery.contains('WHERE') ){
                    System.debug('Must Have Query:'+mustHaveRecsQuery.substring(mustHaveRecsQuery.indexOf('WHERE')));
                    mustHaveRecsQuery+=' LIMIT :limitSize OFFSET :offset';
                    mustHaveRecs = Database.query(mustHaveRecsQuery);
                    for( sObject obj : mustHaveRecs ){
                        matchedContIds.add( obj.Id );
                    }
                    matchedRecordMap.put( 'Must Have', mustHaveRecs );    
                }
                if( mustHaveRecs.size() < limitSize ){
                    Integer lS = limitSize - mustHaveRecs.size();
                    System.debug('Key Match');
                    List<String> allCareerHistoryDept = new List<String>();
                    List<String> allCareerHistorySub = new List<String>();
                    List<String> allCareerHistoryExp = new List<String>();
                    String keyMatchesRecsQuery = fillKeyMatches( query, cont, matchedContIds, allCareerHistoryDept, allCareerHistorySub, allCareerHistoryExp );
                    if( keyMatchesRecsQuery.contains('WHERE') ){
                        System.debug('Key Match Query:'+keyMatchesRecsQuery.substring(keyMatchesRecsQuery.indexOf('WHERE')));
                        keyMatchesRecsQuery+=' LIMIT :lS OFFSET :offset';
                        keyMatchRecs = Database.query(keyMatchesRecsQuery);
                        for( sObject obj : keyMatchRecs ){
                            matchedContIds.add( obj.Id );
                        }
                        matchedRecordMap.put( 'Key Match', keyMatchRecs );    
                    }
                    if( (keyMatchRecs.size()+mustHaveRecs.size()) < limitSize ){
                        Integer lS2 = limitSize - (keyMatchRecs.size()+mustHaveRecs.size());
                        query+= ' WHERE Id NOT IN :matchedContIds LIMIT :lS2 OFFSET :offset';
                        matchedRecordMap.put( 'Remaining Recs', Database.query(query) ); 
                        System.debug('-->'+matchedRecordMap.keySet());
                        System.debug( 'Matched Recs:'+ matchedRecordMap.get( 'Must Have' ));
                        System.debug( 'Key Recs:'+ matchedRecordMap.get( 'Key Match' ));
                        System.debug( 'Remaining Recs:'+ matchedRecordMap.get( 'Remaining Recs' ));
                        //System.debug( 'Matched Recs:'+ matchedRecordMap.get( 'Must Have' ).size());
                        //System.debug( 'Key Match Recs:'+ matchedRecordMap.get( 'Key Match' ).size());
                        //System.debug( 'Remaining Recs:'+ matchedRecordMap.get( 'Remaining Recs' ).size());
                        //return null;
                    }
                }
                return matchedRecordMap;
            }
            return null;
        } catch (Exception e) {
            System.debug('->'+e.getMessage());
            System.debug(e);
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    static String fillMustHave( String query, Contact cont ){
        System.debug('Inside Must have'+cont);
        //TODO: Have to add teching language criteria
        String contactDegrees = '(';
        //Getting degrees of candidate
        for( Degree_Qualification__c dQualification : [SELECT Id, Degree_Type__c FROM 
                                                       Degree_Qualification__c WHERE Degree_Type__c IN ('Diploma', 'Graduate Diploma', 'Graduate Certificate',
                                                                                                        'Advanced Diploma', 'PGCE', 'PGDE', 'Ed.D') AND Contact__c = :cont.Id
                                                      ] ){
                                                          contactDegrees+='\''+dQualification.Degree_Type__c+'\',';
                                                      }
        if( contactDegrees.length() > 1 ){
            contactDegrees = contactDegrees.substring( 0, contactDegrees.length()-1 );
        }
        contactDegrees+=')';
        Decimal totalExp = 0;
        //Getting totalExp of candidate from their Career History
        /*for(Career_History__c cH : [SELECT Id, Department__c, Subject__c, Years_of_Experience__c FROM Career_History__c WHERE Contact__c = :cont.Id]){
            totalExp += cH.Years_of_Experience__c;
            System.debug('Caree Exp:'+cH.Years_of_Experience__c +':'+totalExp);
        }*/
        
        if( cont.Experience__c != null || totalExp > 0 || cont.Preferred_Jobtype__c != null || contactDegrees.length() > 2 ){
            /*if( query.contains('WHERE') ){
                query+=' AND ('; 
            }else{*/
            	query+=' WHERE ';    
            //}
        }
        /*if( cont.Experience__c != null ){
            //Have to change it to Less than
            String exp = String.valueOf(cont.Experience__c);
            query+= ' Minimum_experience__c < \''+exp+'\'';
        }*/
        
        //Getting jobs having Minimum experience less than candidate experience
        /*if( totalExp > 0 ){
            query+= cont.Experience__c != null ? ' OR ' : '';
            query+= ' Minimum_experience__c < '+totalExp;
        }*/
        //Getting jobs having same job type as of candidate
        if( cont.Preferred_Jobtype__c != null ){
            //query+= cont.Experience__c != null ? ' OR ' : '';
            query+= ' (Job_Type__c = \''+cont.Preferred_Jobtype__c +'\' AND Job_Type__c IN (\'Full Time\', \'Short Term - Summer\', \'Short Term - Interim/Substitute\', \'Intern\', \'Short Term/Summer\'))';
        }
        //Getting jobs having qualification same as candidate
        if( contactDegrees.length() > 2 ){
            query+= cont.Preferred_Jobtype__c != null ? ' OR ' : '';
            query+= ' Minimum_Qualification__c IN '+contactDegrees;
        }
        /*if( query.substring( query.length()-1 ) == '(' ){
            query = query.substring( 0, query.length()-5 );
        }else{
            query+=' )';
        }*/
        return query;
    }
    static String fillKeyMatches( String query, Contact cont, List<Id> matchedContIds, List<String> allCareerHistoryDept,
                                 List<String> allCareerHistorySub, List<String> allCareerHistoryExp
                                ){
			//TODO: Have to add Education Level(ages) criteria
			
            //Getting department, subject and experience of candidate
            for( Career_History__c cH : [SELECT Id, Department__c, Subject__c, Years_of_Experience__c
                                         FROM Career_History__c WHERE Contact__c = :cont.Id
                                        ] ){
                                            allCareerHistoryDept.add( cH.Department__c );
                                            allCareerHistorySub.add( cH.Subject__c );
                                            allCareerHistoryExp.add( String.valueOf(cH.Years_of_Experience__c) );
                                        }
        if( allCareerHistoryExp.size() > 0 || allCareerHistorySub.size() > 0 || allCareerHistoryDept.size() > 0 ){
            query+= ' WHERE ID Not IN :matchedContIds AND';
        }
		//Gettinf jobs having same department, subject and experience                                    
        if( allCareerHistoryExp.size() > 0 ){
            query+= ' (Department__c IN :allCareerHistoryDept ';
            if( allCareerHistorySub.size() <= 0 ){
                query+=')';
            }
        }
        if( allCareerHistorySub.size() > 0 ){
            query+= allCareerHistoryExp.size() > 0 ? ' AND ' : ' ( ';
            query+= ' Subject__c IN :allCareerHistorySub )';
        }
        /*if( allCareerHistoryExp.size() > 0 ){
            query+= allCareerHistorySub.size() > 0 ? ' OR ' : allCareerHistoryExp.size() > 0 ? ' OR ' : ' ( ';
            query+= ' yearsOfExperience__c IN :allCareerHistoryExp) ';
        }*/  
        return query;
    }
}