trigger userCreation on User (after insert) {

    UserTriggerHelper.assignPermission( Trigger.new[0].Id );

    // if(trigger.isUpdate)
    // {
    //     Id portalUserProfileId = [SELECT Id, Name FROM Profile where Name = 'Portal User'].Id;
    //     if(trigger.isBefore)
    //     {
    //         if(Trigger.new[0].IsActive == True && Trigger.old[0].IsActive == false)
    //         {
    //             if(Trigger.old[0].passwordReset__c == false)
    //             {
    //                 Trigger.new[0].passwordReset__c = true;
    //             }
    //         }
    //     }
    //     if(trigger.isAfter)
    //     {
    //         if(Trigger.new[0].IsActive == True && Trigger.old[0].IsActive == false)
    //         {
    //             if(Trigger.old[0].passwordReset__c == false)
    //             {
    //                 System.resetPassword(Trigger.new[0].Id, true);
    //                 if(trigger.new[0].ProfileId  == portalUserProfileId)
    //                 {
    //                     UserTriggerHelper.assignPermission( Trigger.new[0].Id );
    //                 }
    //             }
    //         }
    //     }
    // }
}