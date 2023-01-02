trigger insertJob on Job__c (before insert) {
    insertCertificate.createJob(trigger.new);
}