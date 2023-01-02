trigger degreeUpdate on Degree_Qualification__c (before insert) {
  if(Trigger.isInsert){
        //insertCertificate.createDegree(trigger.new);
    }
}