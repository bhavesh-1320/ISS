trigger insertQuestion on Question__c (before insert) {
	insertCertificate.createQuestion(trigger.new);
}