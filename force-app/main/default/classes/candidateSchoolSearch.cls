public without sharing class candidateSchoolSearch {
    @AuraEnabled(cacheable=true)
    public static  Integer getAllUserCount(){
        List<Account> accListName = [SELECT Id,Name,siteUrl__c ,Tuition_Year__c ,Tuition_Fees_Lower_Limit__c ,Tuition_Fees_Upper_Limit__c ,Regional_Organizational_Membership__c, foundedYear__c, School_Type__c, calenderLink__c, accreditation__c, accreditationBy__c, organization__c, governance__c, religion__c, ownerShip__c, studentBody__c, generalEmail__c, jobEmail__c, phone__c, fax__c, contractStartMonth__c, contractEndMonth__c, initialContractLengthTeacher__c, initialContractLengthAdmin__c, salaryPaidIn__c, percentPaidInUsd__c, certificationNeeded__c, hasVisaRestrictions__c, maximumAge__c, schoolProvidesVisaAssistance__c, interns__c, minimumYearsOfExperience__c, minimumQualifications__c, localTaxes__c, savingsPotentialSingle__c, savingsPotentialTeam__c, teachingDays__c, localTaxPercent__c, schoolHiringPreference__c, selectedReligion__c, languagesTaught__c, clubs__c, sports__c, extraCurricularActivities__c, examinations__c, schoolSupportServices__c, averageClassSize__c, collegeGraduatesPercent__c, universitiesAttended__c, languagesOfInstruction__c, studentEnrolmentPreK__c, studentEnrolmentElementary__c, studentEnrolmentMiddleSchool__c, studentEnrolmentHighSchool__c, studentEnrolmentGrade13__c, studentNationalitiesRepresented__c, studentEnrolmentNursery__c, studentEndGrade__c, studentStartGrade__c, adminSalaryLowerLimit__c, adminSalaryUpperLimit__c, teacherSalaryUpperLimit__c, teacherSalaryLowerLimit__c, teacherNationalitiesRepresented__c, diversity__c, diversityComment__c, childProtection__c, childProtectionComment__c, hasDentalInsurance__c, hasOpportunitiesForDependents__c, opportunityForDependentsNote__c, disabilityInsuranceNote__c, hasDisabilityInsurance__c, dentalInsuranceNote__c, medicalInsuranceNote__c, hasMedicalInsurance__c, recurringTransportationNote__c, hasRecurringTransportation__c, Country__c, CustomerPriority__c, NumberofLocations__c, studentPopulation__c, expectedJobListingsPerAnnum__c, annualTuitionFee__c, hasAdvancedCurriculum__c, memberShipStatus__c, annualMembershipFeesInUSD__c, memberShipType__c, memberShipExpiry__c, blogLinks__c, overview__c, expectation__c, hasSavingsPotential__c, savingsPotentialNote__c, hasRetirementPlan__c, retirementPlanNote__c, hasTaxes__c, taxesNote__c, hasTuitionForDependents__c, tuitionForDependentsNote__c, hasTransportation__c, transportationNote__c, hasMovingAllowance__c, movingAllowanceNote__c, hasSettlingInAllowance__c, settlingInAllowanceNote__c, hasAccommodation__c, accommodationNote__c, isAccommodationShared__c, accommodationSharedNote__c, hasUtilities__c, utilitiesNote__c, certifications__c, citizenshipRestrictions__c, otherInfo__c, orgmembership__c, history__c, yearlyReportingDate__c FROM Account ];
        return accListName.size();
            
    }
    @AuraEnabled(cacheable=true)
    public static  schoolSearchData getUserDetails(){
        try {
            schoolSearchData schoolSearch = new schoolSearchData();

            List<Account> accListName = [SELECT Id,Name,siteUrl__c ,Tuition_Year__c ,Tuition_Fees_Lower_Limit__c ,Tuition_Fees_Upper_Limit__c ,Regional_Organizational_Membership__c, foundedYear__c, School_Type__c, calenderLink__c, accreditation__c, accreditationBy__c, organization__c, governance__c, religion__c, ownerShip__c, studentBody__c, generalEmail__c, jobEmail__c, phone__c, fax__c, contractStartMonth__c, contractEndMonth__c, initialContractLengthTeacher__c, initialContractLengthAdmin__c, salaryPaidIn__c, percentPaidInUsd__c, certificationNeeded__c, hasVisaRestrictions__c, maximumAge__c, schoolProvidesVisaAssistance__c, interns__c, minimumYearsOfExperience__c, minimumQualifications__c, localTaxes__c, savingsPotentialSingle__c, savingsPotentialTeam__c, teachingDays__c, localTaxPercent__c, schoolHiringPreference__c, selectedReligion__c, languagesTaught__c, clubs__c, sports__c, extraCurricularActivities__c, examinations__c, schoolSupportServices__c, averageClassSize__c, collegeGraduatesPercent__c, universitiesAttended__c, languagesOfInstruction__c, studentEnrolmentPreK__c, studentEnrolmentElementary__c, studentEnrolmentMiddleSchool__c, studentEnrolmentHighSchool__c, studentEnrolmentGrade13__c, studentNationalitiesRepresented__c, studentEnrolmentNursery__c, studentEndGrade__c, studentStartGrade__c, adminSalaryLowerLimit__c, adminSalaryUpperLimit__c, teacherSalaryUpperLimit__c, teacherSalaryLowerLimit__c, teacherNationalitiesRepresented__c, diversity__c, diversityComment__c, childProtection__c, childProtectionComment__c, hasDentalInsurance__c, hasOpportunitiesForDependents__c, opportunityForDependentsNote__c, disabilityInsuranceNote__c, hasDisabilityInsurance__c, dentalInsuranceNote__c, medicalInsuranceNote__c, hasMedicalInsurance__c, recurringTransportationNote__c, hasRecurringTransportation__c, Country__c, CustomerPriority__c, NumberofLocations__c, studentPopulation__c, expectedJobListingsPerAnnum__c, annualTuitionFee__c, hasAdvancedCurriculum__c, memberShipStatus__c, annualMembershipFeesInUSD__c, memberShipType__c, memberShipExpiry__c, blogLinks__c, overview__c, expectation__c, hasSavingsPotential__c, savingsPotentialNote__c, hasRetirementPlan__c, retirementPlanNote__c, hasTaxes__c, taxesNote__c, hasTuitionForDependents__c, tuitionForDependentsNote__c, hasTransportation__c, transportationNote__c, hasMovingAllowance__c, movingAllowanceNote__c, hasSettlingInAllowance__c, settlingInAllowanceNote__c, hasAccommodation__c, accommodationNote__c, isAccommodationShared__c, accommodationSharedNote__c, hasUtilities__c, utilitiesNote__c, certifications__c, citizenshipRestrictions__c, otherInfo__c, orgmembership__c, history__c, yearlyReportingDate__c FROM Account limit 50];
            schoolSearch.getSchool = accListName;
            String recordId  = accListName[0].Id;
           List<Job__c> openJob = [SELECT Id,Salary_Range__c ,School__c, school__r.name,Country__c,Grade_Range__c , Organization__c, CreatedDate  , Job_Description__c, Job_Type__c, Number_Of_Openings__c, Job_Role_Start_Date__c, Certification_Required__c, Cover_letter__c, Media_Link__c, Curriculum__c, Education_Level__c, Department__c, Job_Category__c, Job_Position__c, Name FROM Job__c where School__c =: recordId];
            schoolSearch.getSchoolJob = openJob;
			
			//fatch details of country picklist 
			 List<String> country = new List<String>();
            Schema.SObjectType targetType = Schema.getGlobalDescribe().get('Account');	//From the Object Api name retrieving the SObject
            Sobject Object_name = targetType.newSObject();
            Schema.sObjectType sobject_type = Object_name.getSObjectType(); //grab the sobject that was passed
            Schema.DescribeSObjectResult sobject_describe = sobject_type.getDescribe(); //describe the sobject
            Map<String, Schema.SObjectField> field_map = sobject_describe.fields.getMap(); //get a map of fields for the passed sobject
            List<Schema.PicklistEntry> pick_list_values = field_map.get('Country__c').getDescribe().getPickListValues(); //grab the list of picklist values for 
            for (Schema.PicklistEntry a : pick_list_values) 
            { //for all values in the picklist list
            	country.add(a.getValue());//add the value  to our final list
            }            
            
            schoolSearch.getCountry = country;
            // picklist values for class size 
             List<String> class_size = new List<String>();
            Schema.SObjectType class_targetType = Schema.getGlobalDescribe().get('Account');	//From the Object Api name retrieving the SObject
            Sobject class_Object_name = class_targetType.newSObject();
            Schema.sObjectType class_sobject_type = class_Object_name.getSObjectType(); //grab the sobject that was passed
            Schema.DescribeSObjectResult class_sobject_describe = class_sobject_type.getDescribe(); //describe the sobject
            Map<String, Schema.SObjectField> class_field_map = class_sobject_describe.fields.getMap(); //get a map of fields for the passed sobject
            List<Schema.PicklistEntry> class_pick_list_values = field_map.get('Class_Size__c').getDescribe().getPickListValues(); //grab the list of picklist values for 
            for (Schema.PicklistEntry a : class_pick_list_values) 
            { //for all values in the picklist list
            	class_size.add(a.getValue());//add the value  to our final list
            }  
            
            // this code will get school type picklist values 
            
             List<String> school_type = new List<String>();
            Schema.SObjectType school_targetType = Schema.getGlobalDescribe().get('Account');	//From the Object Api name retrieving the SObject
            Sobject school_Object_name = school_targetType.newSObject();
            Schema.sObjectType school_sobject_type = school_Object_name.getSObjectType(); //grab the sobject that was passed
            Schema.DescribeSObjectResult school_sobject_describe = school_sobject_type.getDescribe(); //describe the sobject
            Map<String, Schema.SObjectField> school_field_map = school_sobject_describe.fields.getMap(); //get a map of fields for the passed sobject
            List<Schema.PicklistEntry> school_pick_list_values = field_map.get('School_Type__c').getDescribe().getPickListValues(); //grab the list of picklist values for 
            for (Schema.PicklistEntry a : school_pick_list_values) 
            { //for all values in the picklist list
            	school_type.add(a.getValue());//add the value  to our final list
            }  
            schoolSearch.getSchoolType = school_type;
            
          	

              List<String> regionValues  = new List<String>();
            Schema.SObjectType region_targetType = Schema.getGlobalDescribe().get('Account');	//From the Object Api name retrieving the SObject
            Sobject region_Object_name = region_targetType.newSObject();
            Schema.sObjectType region_sobject_type = region_Object_name.getSObjectType(); //grab the sobject that was passed
            Schema.DescribeSObjectResult region_sobject_describe = region_sobject_type.getDescribe(); //describe the sobject
            Map<String, Schema.SObjectField> region_field_map = region_sobject_describe.fields.getMap(); //get a map of fields for the passed sobject
            List<Schema.PicklistEntry> region_pick_list_values = field_map.get('Region__c').getDescribe().getPickListValues(); //grab the list of picklist values for 
            for (Schema.PicklistEntry a : region_pick_list_values) 
            { //for all values in the picklist list
            	regionValues.add(a.getValue());//add the value  to our final list
            }  
            schoolSearch.getRegion = regionValues;
            schoolSearch.getClassSize = class_size;

             List<String> regionOrgValues  = new List<String>();
            Schema.SObjectType regionOrg_targetType = Schema.getGlobalDescribe().get('Account');	//From the Object Api name retrieving the SObject
            Sobject regionOrg_Object_name = regionOrg_targetType.newSObject();
            Schema.sObjectType regionOrg_sobject_type = regionOrg_Object_name.getSObjectType(); //grab the sobject that was passed
            Schema.DescribeSObjectResult regionOrg_sobject_describe = regionOrg_sobject_type.getDescribe(); //describe the sobject
            Map<String, Schema.SObjectField> regionOrg_field_map = regionOrg_sobject_describe.fields.getMap(); //get a map of fields for the passed sobject
            List<Schema.PicklistEntry> regionOrg_pick_list_values = field_map.get('Regional_Organization__c').getDescribe().getPickListValues(); //grab the list of picklist values for 
            for (Schema.PicklistEntry a : regionOrg_pick_list_values) 
            { //for all values in the picklist list
            	regionOrgValues.add(a.getValue());//add the value  to our final list
            }  
            schoolSearch.getRegionOrg = regionOrgValues ;
          	return schoolSearch; 
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static schoolSearchData fatchAccountDetails(String recordId){
        try {
            schoolSearchData schoolSearch = new schoolSearchData();
            List<Account> accDetailName = [ SELECT Id,siteUrl__c,curriculumType__c ,Tuition_Year__c ,Tuition_Fees_Upper_Limit__c ,Tuition_Fees_Lower_Limit__c, Name,Regional_Organizational_Membership__c, foundedYear__c, School_Type__c, calenderLink__c, accreditation__c, accreditationBy__c, organization__c, governance__c, religion__c, ownerShip__c, studentBody__c, generalEmail__c, jobEmail__c, phone__c, fax__c, contractStartMonth__c, contractEndMonth__c, initialContractLengthTeacher__c, initialContractLengthAdmin__c, salaryPaidIn__c, percentPaidInUsd__c, certificationNeeded__c, hasVisaRestrictions__c, maximumAge__c, schoolProvidesVisaAssistance__c, interns__c, minimumYearsOfExperience__c, minimumQualifications__c, localTaxes__c, savingsPotentialSingle__c, savingsPotentialTeam__c, teachingDays__c, localTaxPercent__c, schoolHiringPreference__c, selectedReligion__c, languagesTaught__c, clubs__c, sports__c, extraCurricularActivities__c, examinations__c, schoolSupportServices__c, averageClassSize__c, collegeGraduatesPercent__c, universitiesAttended__c, languagesOfInstruction__c, studentEnrolmentPreK__c, studentEnrolmentElementary__c, studentEnrolmentMiddleSchool__c, studentEnrolmentHighSchool__c, studentEnrolmentGrade13__c, studentNationalitiesRepresented__c, studentEnrolmentNursery__c, studentEndGrade__c, studentStartGrade__c, adminSalaryLowerLimit__c, adminSalaryUpperLimit__c, teacherSalaryUpperLimit__c, teacherSalaryLowerLimit__c, teacherNationalitiesRepresented__c, diversity__c, diversityComment__c, childProtection__c, childProtectionComment__c, hasDentalInsurance__c, hasOpportunitiesForDependents__c, opportunityForDependentsNote__c, disabilityInsuranceNote__c, hasDisabilityInsurance__c, dentalInsuranceNote__c, medicalInsuranceNote__c, hasMedicalInsurance__c, recurringTransportationNote__c, hasRecurringTransportation__c, Country__c, CustomerPriority__c, NumberofLocations__c, studentPopulation__c, expectedJobListingsPerAnnum__c, annualTuitionFee__c, hasAdvancedCurriculum__c, memberShipStatus__c, annualMembershipFeesInUSD__c, memberShipType__c, memberShipExpiry__c, blogLinks__c, overview__c, expectation__c, hasSavingsPotential__c, savingsPotentialNote__c, hasRetirementPlan__c, retirementPlanNote__c, hasTaxes__c, taxesNote__c, hasTuitionForDependents__c, tuitionForDependentsNote__c, hasTransportation__c, transportationNote__c, hasMovingAllowance__c, movingAllowanceNote__c, hasSettlingInAllowance__c, settlingInAllowanceNote__c, hasAccommodation__c, accommodationNote__c, isAccommodationShared__c, accommodationSharedNote__c, hasUtilities__c, utilitiesNote__c, certifications__c, citizenshipRestrictions__c, otherInfo__c, orgmembership__c, history__c, yearlyReportingDate__c, (Select name , account__c from Activity_Tracker__r) from Account where Id =: recordId ];
            schoolSearch.getSchoolDetail = accDetailName[0];

            List<Job__c> openJob = [SELECT Id,Salary_Range__c , school__r.name,School__c ,Country__c,Grade_Range__c , Organization__c, CreatedDate  , Job_Description__c, Job_Type__c, Number_Of_Openings__c, Job_Role_Start_Date__c, Certification_Required__c, Cover_letter__c, Media_Link__c, Curriculum__c, Education_Level__c, Department__c, Job_Category__c, Job_Position__c, Name FROM Job__c where School__c =: recordId ];
                schoolSearch.getSchoolJob = openJob;
            return schoolSearch;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage() +'line number ' + e.getLineNumber());
        }
    }
    
    @AuraEnabled 
    public static List<Account>   getJOBFilters(string class_size , string school_type , String Country  ){
     
        system.debug('departments'+'='+class_size + '---'+'school_type__c'+'='+school_type + '---'+'Conuntry'+'='+Country + '---');
            // List<User> userDetails = [SELECT Id, name, accountid , ContactId FROM User where Id = :recordId];
            // system.debug('userDetails=>'+userDetails);
            // String userContactId = userDetails[0].contactId;
            // String userAccountId = userDetails[0].accountId;
            // system.debug('userContactId=>'+userContactId);
             List<JOb__c> fatchJobs = new List<Job__c>();
            // List<Contact> contactDetail = [select Name , Id, subscriptionType__c from contact where Id = :userContactId];
            // system.debug('contactDetail=>'+contactDetail);
            string query = 'Select Name,Id,Class_Size__c , country__c , school_type__c from account where   ';
            //if(contactDetail[0].subscriptionType__c == 'Free'){
                //fatchJobs = [SELECT Id, Salary_Range__c,Minimum_Qualification__c , school__r.name,Country__c,Grade_Range__c , Organization__c, CreatedDate  , Job_Description__c, Job_Type__c, Job_Close_Date__c, Number_Of_Openings__c,Is_LeaderShip__c ,  Minimum_experience__c, Certification_Required__c, Cover_letter__c, Media_Link__c, Curriculum__c, Education_Level__c, Department__c, Job_Category__c, Job_Position__c, Name FROM Job__c where Is_LeaderShip__c  = True order by createdDate Desc ];        
                //System.debug('List according to Free subscription ' + fatchJObs);
                
                
                
                if(class_size != null && class_size != '' && class_size != 'None')
                {
                    String val =  'Class_Size__c  = \''+class_size+ '\'';
                    query = query + val + ' AND ';
                }
                
                if(school_type != null && school_type != '' && school_type != 'None')
                {
                    String val  =  ' school_type__c = \''+school_type+ '\'';
                    query = query + val + ' AND '  ; 
                }
                
                if(Country != null && Country != '' && Country != 'None')
                {	
                    String val =  'Country__c= \''+Country+ '\'';
                    query = query + val + ' AND ' ; 
                }
                query = query.subString(0,query.length() - 5);
                //query = query +' order by createdDate Desc ';
            //}else {
               // fatchJobs = [SELECT Id, Salary_Range__c,Minimum_Qualification__c , school__r.name,Country__c,Grade_Range__c , Organization__c, CreatedDate  , Job_Description__c, Job_Type__c, Job_Close_Date__c, Number_Of_Openings__c,  Minimum_experience__c, Certification_Required__c, Cover_letter__c, Media_Link__c, Curriculum__c, Education_Level__c, Department__c, Job_Category__c, Job_Position__c, Name FROM Job__c order by createdDate Desc  ];
                
                // if(class_size != null && class_size != '' && class_size != 'None')
                // { 
                //     query = query + ' AND Class_Size__c = \''+class_size + '\'';
                // }
                // if(school_type != null && school_type != '' && school_type != 'None')
                // {
                //     query = query + ' AND school_type__c = \''+school_type+ '\'';
                    
                // }
                
                // if(Country != null && Country != '' && Country != 'None')
                // {	
                //     query = query + ' AND Country__c = \''+Country+ '\'';
                // }
               
                //query = query +' order by createdDate Desc ';
            //}
            
            system.debug(query);
            
            list<Account> jbs = database.query(query);
            
            system.debug('jbs=>'+jbs);
            //return jbs ;  
            return jbs;
    }
    @AuraEnabled
    public static List<object> searchSchoolData(String searchfield , Integer offset, Integer limitSize,  String mainStringValue ){
        mainStringValue = mainStringValue.length() > 0 ? '(' + mainStringValue + ')' : '';
        mainStringValue += mainStringValue.length() > 0 ? ' AND ' : '';
            String str =  'SELECT Id,name,curriculumType__c, foundedYear__c, School_Type__c, calenderLink__c, accreditation__c, accreditationBy__c, organization__c, governance__c, religion__c, ownerShip__c, studentBody__c, generalEmail__c, jobEmail__c, phone__c, fax__c, contractStartMonth__c, contractEndMonth__c, initialContractLengthTeacher__c, initialContractLengthAdmin__c, salaryPaidIn__c, percentPaidInUsd__c, certificationNeeded__c, hasVisaRestrictions__c, maximumAge__c, schoolProvidesVisaAssistance__c, interns__c, minimumYearsOfExperience__c, minimumQualifications__c, localTaxes__c, savingsPotentialSingle__c, savingsPotentialTeam__c, teachingDays__c, localTaxPercent__c, schoolHiringPreference__c, selectedReligion__c, languagesTaught__c, clubs__c, sports__c, extraCurricularActivities__c, examinations__c, schoolSupportServices__c, averageClassSize__c, collegeGraduatesPercent__c, universitiesAttended__c, languagesOfInstruction__c, studentEnrolmentPreK__c, studentEnrolmentElementary__c, studentEnrolmentMiddleSchool__c, studentEnrolmentHighSchool__c, studentEnrolmentGrade13__c, studentNationalitiesRepresented__c, studentEnrolmentNursery__c, studentEndGrade__c, studentStartGrade__c, adminSalaryLowerLimit__c, adminSalaryUpperLimit__c, teacherSalaryUpperLimit__c, teacherSalaryLowerLimit__c, teacherNationalitiesRepresented__c, diversity__c, diversityComment__c, childProtection__c, childProtectionComment__c, hasDentalInsurance__c, hasOpportunitiesForDependents__c, opportunityForDependentsNote__c, disabilityInsuranceNote__c, hasDisabilityInsurance__c, dentalInsuranceNote__c, medicalInsuranceNote__c, hasMedicalInsurance__c, recurringTransportationNote__c, hasRecurringTransportation__c, Country__c, CustomerPriority__c, NumberofLocations__c, studentPopulation__c, expectedJobListingsPerAnnum__c, annualTuitionFee__c, hasAdvancedCurriculum__c, memberShipStatus__c, annualMembershipFeesInUSD__c, memberShipType__c, memberShipExpiry__c, blogLinks__c, overview__c, expectation__c, hasSavingsPotential__c, savingsPotentialNote__c, hasRetirementPlan__c, retirementPlanNote__c, hasTaxes__c, taxesNote__c, hasTuitionForDependents__c, tuitionForDependentsNote__c, hasTransportation__c, transportationNote__c, hasMovingAllowance__c, movingAllowanceNote__c, hasSettlingInAllowance__c, settlingInAllowanceNote__c, hasAccommodation__c, accommodationNote__c, isAccommodationShared__c, accommodationSharedNote__c, hasUtilities__c, utilitiesNote__c, certifications__c, citizenshipRestrictions__c, otherInfo__c, orgmembership__c, history__c, yearlyReportingDate__c FROM Account where ' + mainStringValue +' name LIKE \'%'+  searchfield + '%\' LIMIT ' + Limitsize + ' OFFSET ' +  offset;
            try {

            List<object> objlist = Database.query(str);
            return objlist ; 
            }
            catch(Exception e) {
                return (List<Object>) new List<String>{str};
            }

      
    }
    @AuraEnabled
    public static List<object> getFilterData (String mainStringValues , integer limitsize , integer offset){
        List<Object> acclist = new List<Object>();
        String str = 'Select Name , country__c , School_type__c ,hasVisaRestrictions__c , Class_Size__c , Region__c , Regional_Organization__c from account where '+mainStringValues + ' LIMIT '+ limitsize + ' OFFSET '+ offset ;
        string str2 = 'Select Name , country__c , School_type__c ,hasVisaRestrictions__c, Class_Size__c ,  Region__c , Regional_Organization__c from account '+ ' LIMIT '+ limitsize + ' OFFSET '+ offset  ;
        if(mainStringValues != ''){
            
            acclist = Database.query(str);
        }
        else{
            acclist = Database.query(str2);
        }
        return acclist;
        
    }
    @AuraEnabled
    public static boolean addJobToBookmark(String jobId){
        Boolean flag = false;
        System.debug('id' + jobId);
        List<Activity_Tracker__c> ac = new list<Activity_Tracker__c>();
        ac.add(new Activity_Tracker__c(Account__c = jobId ));
        Database.SaveResult[] srList = Database.insert(ac, false);
        // Iterate through each returned result
        for (Database.SaveResult sr : srList) {
            if (sr.isSuccess()) {
                // Operation was successful, so get the ID of the record that was processed
                System.debug('Successfully inserted account. Account ID: ' + sr.getId());
                flag = true;
            }
            else {
                // Operation failed, so get all errors                
                for(Database.Error err : sr.getErrors()) {
                    System.debug('The following error has occurred.');                    
                    System.debug(err.getStatusCode() + ': ' + err.getMessage());
                    System.debug('Account fields that affected this error: ' + err.getFields());
                }
            }
        }
        return flag ; 
    }
    @AuraEnabled
    public static boolean removeJobFromBookmark(String jobId){
        Boolean flag = false;
        System.debug('id' + jobId);
        List<Activity_Tracker__c> ac = [select name , account__c from Activity_Tracker__c where account__c =: jobId];
       Database.DeleteResult[] drList = Database.delete(ac, false);

        for(Database.DeleteResult dr : drList) {
            if (dr.isSuccess()) {
                // Operation was successful, so get the ID of the record that was processed
                System.debug('Successfully deleted account with ID: ' + dr.getId());
                flag = true;
            }
            else {
                // Operation failed, so get all errors                
                for(Database.Error err : dr.getErrors()) {
                    System.debug('The following error has occurred.');                    
                    System.debug(err.getStatusCode() + ': ' + err.getMessage());
                    System.debug('Account fields that affected this error: ' + err.getFields());
                }
            }
        }
        return flag ; 
    }
    @AuraEnabled
    public static List<Job__c> getDataForChild(String userId){
        List<Job__c> openJob = [SELECT Id,Salary_Range__c ,School__c, school__r.name,Country__c,Grade_Range__c , Organization__c, CreatedDate  , Job_Description__c, Job_Type__c, Number_Of_Openings__c, Job_Role_Start_Date__c, Certification_Required__c, Cover_letter__c, Media_Link__c, Curriculum__c, Education_Level__c, Department__c, Job_Category__c, Job_Position__c, Name FROM Job__c where School__c =: userId];
        return openJob;
    }

    public class schoolSearchData{
        @AuraEnabled public List<Account> getSchool {get;set;}
        @AuraEnabled public Account getSchoolDetail {get;set;}
        @AuraEnabled public List<Job__c> getSchoolJob {get;set;}
        @AuraEnabled public List<String> getCountry {get;set;}
        @AuraEnabled public List<String> getClassSize {get;set;}
        @AuraEnabled public List<Job__c> filterData {get;set;}
        @AuraEnabled public List<String> getSchoolType {get;set;}
        @AuraEnabled public List<String> getRegion {get;set;}
        @AuraEnabled public List<String> getRegionOrg {get;set;}
    }

}