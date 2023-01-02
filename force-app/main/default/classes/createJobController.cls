public class createJobController {
    @AuraEnabled
    public static void createJob(String jobName,String startDate,String salaryRange,String graderange, String numberOfOpening,String closeDate,String mediaLink,String jobTypeValue,String minQualification,String certificateRequired,String coverLetter,String minimumYear, String userId, String status, String description, List<String> curriculumn,List<Object> position){
       //curriculumn.remove(null);
       system.debug(position);
string allstring = string.join(curriculumn,',');
        system.debug(allstring);
        Job__c newJob = new Job__c();
        newJob.Name  = jobName;
        newJob.Salary_Range__c = salaryRange;
        newJob.Grade_Range__c = graderange;
       // newJob.Job_Role_Start_Date__c = date.ValueOf(startDate);
        newJob.Certification_Required__c = certificateRequired;
   
        newJob.Media_Link__c = mediaLink;
        newJob.Job_Type__c = jobTypeValue;
        newJob.Cover_letter__c = coverLetter;
       // newJob.Minimum_experience__c = minimumYear;
        newJob.Minimum_Qualification__c =minQualification;
        newJob.Number_Of_Openings__c = numberOfOpening;
        newJob.Status__c = status;
        newJob.OwnerId = userId;
        newJob.Job_Description__c = description;
        newJob.Curriculum__c = allstring;
        newJob.School__c = '0018M00000FkiRpQAJ';
        system.debug(newJob);

        System.debug(newJob);
        insert newJob;
    }

}