trigger candidateRolesTrigger on Candidate_Roles__c (after insert ) {
	candidateHelpers.sendEmailsToRoles(trigger.new);
}