public class CourseEnrollmentTriggerHelper 
{
	public static void createRecord(List<Course_Enrollment__c> getCourseEnrollment)
    {
        Map<ID,List<Module__c>> getCourseModule=new Map<ID,List<Module__c>>();
        Map<Id,List<Question__c>> getQuestion =new Map<Id,List<Question__c>>();
        
        for(Course_Enrollment__c courseEnroll:getCourseEnrollment)
        {
            if(!getCourseModule.containsKey(courseEnroll.Course__c))
            {
                getCourseModule.put(courseEnroll.Course__r.Id,null);
            }
        }
        
       // List<ID> newGetList=new List<ID>(getCourseModule.keySet());
        List<Module__c> allEnrollModules=[SELECT Name, Id, CreatedDate, Course__c,Course__r.Id FROM Module__c where Course__r.Id=:getCourseModule.keySet()];
        List<Enroll_Module__c> allEnrollModule=new List<Enroll_Module__c>();
        For(Module__c allModule:allEnrollModules)
        {	//List<Module__c> allMod=new List<Module__c>();
            if(getCourseModule.containsKey(allModule.Course__r.Id))
            {
				List<Module__c> allMod= getCourseModule.get(allModule.Course__r.Id);          
                allMod.add(allModule);
            }
            if(!getQuestion.containsKey(allModule.Id))
            {
                getQuestion.put(allModule.Id,null);
            }
        }
		Id devRecordTypeId = Schema.SObjectType.Question__c.getRecordTypeInfosByName().get('Module Quiz Question').getRecordTypeId();

        List<Question__c> allModuleQuestion=[SELECT Name, Module__c,Module__r.Id, Id, RecordTypeId FROM Question__c where RecordTypeId=:devRecordTypeId and Module__r.Id=:getQuestion.keyset() ];
        
           // [SELECT Id,Name, Course_Enrollment__c FROM Enroll_Module__c ]
    }
}