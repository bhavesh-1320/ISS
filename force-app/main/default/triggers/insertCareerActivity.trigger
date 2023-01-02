trigger insertCareerActivity on Career_Activity__c (before insert) {
  if(Trigger.isInsert){
        //insertCertificate.createCareerActivity(trigger.new);
    }
}