trigger mongodbCandidateFavourites on Activity_Tracker__c (before insert) {
if(Trigger.isInsert){
       // insertActivity.createActivity(trigger.new);
    }
}