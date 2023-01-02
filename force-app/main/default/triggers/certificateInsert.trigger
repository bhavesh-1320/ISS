trigger certificateInsert on Certificate__c (before insert) {
    if(Trigger.isInsert){
        //insertCertificate.createChild(trigger.new);
    }

}