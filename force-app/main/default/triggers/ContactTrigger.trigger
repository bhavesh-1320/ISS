trigger ContactTrigger on Contact (after insert,after Update) {
  //List<contact> ct = trigger.new;
    if(Trigger.isInsert){
        if(!trigger.new[0].Child_Record__c){
        createCommunityUser.createUser(trigger.new);
       }
   }
    
    if(Trigger.isUpdate){
        system.debug('trigger.new[0].blacklisted__c '+trigger.new[0].blacklisted__c);
        system.debug('trigger.old[0].blacklisted__c '+trigger.old[0].blacklisted__c);
        if(trigger.new[0].Disable_User__c != trigger.old[0].Disable_User__c  && trigger.new[0].blacklisted__c == false ){
                
                   createCommunityUser.updateUser(trigger.new[0].Id, trigger.new[0].Disable_User__c);            
        }
        else if(trigger.new[0].Disable_User__c != trigger.old[0].Disable_User__c  && trigger.new[0].blacklisted__c == true){
            trigger.new[0].adderror('Please remove the user from blacklist.');
        }
    }

}