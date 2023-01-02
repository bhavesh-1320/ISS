public without sharing class UserTriggerHelper {
	@future
    public static void assignPermission( Id uIds ){
        Id candidatePermissionSetId = [SELECT Id, Name FROM PermissionSet where Name = 'ISS_Candidate'].Id;
        PermissionSetAssignment newAssignment = new PermissionSetAssignment(PermissionSetId = candidatePermissionSetId , AssigneeId = uIds );
        insert newAssignment;
    }

}