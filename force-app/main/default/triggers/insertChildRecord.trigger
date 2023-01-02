trigger insertChildRecord on Career_History__c (before insert) {
     if(Trigger.isInsert){
        //insertCertificate.createCareer(trigger.new);
    }

}