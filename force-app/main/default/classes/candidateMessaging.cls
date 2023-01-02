public without sharing class candidateMessaging {
    
    @AuraEnabled
    public static String createMessage(string senderId, string receiverId, string content, Map<string,Integer> msgDate){
        system.debug('Hllo');
        try{
            SMS_Message__c newMessage = new SMS_Message__c();
            newMessage.Content__c = content;
            newMessage.Sender_ID__c = senderId;
            newMessage.Receiver_IDs__c = receiverId;
            newMessage.Message_Time__c = DateTime.newInstance(msgDate.get('year'), msgDate.get('month'), msgDate.get('date'), msgDate.get('hour'), msgDate.get('minutes'), msgDate.get('seconds'));
            newMessage.IsRead__c = false;
            insert newMessage;
            return 'Success';
        }catch(exception e){
            return e.getMessage();
        }
        
    }
    
    @AuraEnabled
    public static string getCurrentUserId(){
        return [SELECT Id, ContactId FROM User WHERE Id =: UserInfo.getUserId()].ContactId;
    }
    
    @AuraEnabled
    public static Map<string,string> fetchContactsName(List<string> contactId){
        
        Map<string,string> contactName = new Map<string,string>();
        
        for(Contact con : [Select Name from Contact where Id in :contactId]){
            contactName.put(con.Id,con.Name);
        }
        
        return contactName;
    }


    @AuraEnabled
    public static List<SMS_Message__c> fetchAllMessage(Id currentUserId , Id currentReceiverId){
        system.debug('Object : ' + currentReceiverId.getSObjectType());

        List<SMS_Message__c> message = new List<SMS_Message__c>();
        if(currentReceiverId.getSObjectType() == Schema.getGlobalDescribe().get('Messaging_Group__c')){
            message = [Select Receiver_IDs__c,Sender_ID__c, Message_Time__c, Content__c,IsRead__c from SMS_Message__c WHERE Receiver_IDs__c = :currentReceiverId Order By Message_Time__c];
        }
        else{
            if(currentReceiverId.getSObjectType() == Schema.getGlobalDescribe().get('Contact'))
            {
                List<SMS_Message__c> allMessgaes = [Select Sender_ID__c, Receiver_IDs__c, Message_Time__c, Content__c , IsRead__c from SMS_Message__c WHERE Sender_ID__c = :currentReceiverId AND Receiver_IDs__c =  :currentUserId];
                for(SMS_Message__c msg : allMessgaes ){
                    msg.IsRead__c = true;
                }
                update allMessgaes;

                message = [Select Receiver_IDs__c,Sender_ID__c, Message_Time__c, Content__c,IsRead__c from SMS_Message__c where (Sender_ID__c = :currentUserId AND Receiver_IDs__c = :currentReceiverId) OR (Sender_ID__c = :currentReceiverId AND Receiver_IDs__c = :currentUserId) Order By Message_Time__c];
            }
        }
        system.debug('Message======= '+message);
        return message;
    }
    
    
    @AuraEnabled
    public static list<List<String>> fetchInboxContactsRecruiter(String relatedSchool){
        list<Contact> Con = [Select id,name,Account.Name,AccountId, recordType.Name from contact where accountId =:relatedSchool AND recordType.Name = 'Candidate'];
        string userId = [SELECT Id, ContactId FROM User WHERE Id =: UserInfo.getUserId()].ContactId;
        List<SMS_Message__c> allMessgaes = [Select Sender_ID__c, Receiver_IDs__c, Message_Time__c, Content__c , IsRead__c from SMS_Message__c where Sender_ID__c = :userId OR Receiver_IDs__c = :userId Order By Message_Time__c DESC];
        List<List<String>> toReturn = new List<List<String>>();
        for(Contact contactt : Con){
            integer messageFound = 0;
            for(SMS_Message__c msg : allMessgaes ){
                if( (msg.Sender_ID__c == userId &&  msg.Receiver_IDs__c == contactt.id ) || (msg.Sender_ID__c == contactt.id &&  msg.Receiver_IDs__c ==  userId ))
                {
                    if(messageFound == 0)
                    {
                        system.debug(msg);
                        List<String> temp = new List<String>();
                        temp.add(JSON.serialize(contactt));
                        temp.add(msg.Content__c);
                        temp.add(string.valueOfGmt(msg.Message_Time__c));
                        temp.add(string.valueOfGmt(DateTime.Now()));
                        temp.add(string.valueOf(msg.IsRead__c));
                        toReturn.add(temp);
                        messageFound = 1;
                    }
                }
            }
            
            if(messageFound == 0)
            {
                if(contactt.recordType.Name == 'Candidate')
                {
                    List<String> temp = new List<String>();
                    temp.add(JSON.serialize(contactt));
                    temp.add('');
                    temp.add('');
                    temp.add('');
                    toReturn.add(temp);
                }
            }
        }
        system.debug(toReturn);
        return toReturn;
    }


    @AuraEnabled
    public static list<contact> getRecruitersFromSameSchool(String relatedSchool){
        list<Contact> Con = [Select id,name,Account.Name,AccountId, recordType.Name from contact where accountId =:relatedSchool AND recordType.Name = 'Recruiter'];
        return Con;
    }

    
    @AuraEnabled
    public static string createGroup(string candidateId , string currentUserId , string newRecruiterId){
        String query = 'SELECT Name , Group_Members__c from Messaging_Group__c where Group_Members__c LIKE \'%'+ candidateId +'%\' AND Group_Members__c LIKE \'%'+ currentUserId +'%\' AND Group_Members__c LIKE \'%'+ newRecruiterId +'%\'';
        List<Messaging_Group__c> oldGroup = database.query(query);

        if(oldGroup.size() > 0)
        {
            return 'false';
        }
        else {
            List<Contact> conList = [SELECT Name,AccountId from Contact where Id = :candidateId OR Id = :currentUserId OR Id = :newRecruiterId];
            system.debug('ConList : '+conList);
            Messaging_Group__c newGroup = new Messaging_Group__c(Name = conList[0].Name+', '+conList[1].Name+' & '+conList[2].Name,Group_Members__c = candidateId+';'+currentUserId+';'+newRecruiterId,school__c = conList[0].AccountId );
            insert newGroup;
            return 'true';
        }
    }
    
    
    @AuraEnabled
    public static list<List<String>> fetchInboxContacts(String relatedSchool){
        list<Contact> Con = [Select id,name,Account.Name,AccountId, recordType.Name from contact where accountId =:relatedSchool];
        
        
        string userId = [SELECT Id, ContactId FROM User WHERE Id =: UserInfo.getUserId()].ContactId;
        
        List<SMS_Message__c> allMessgaes = [Select Sender_ID__c, Receiver_IDs__c, Message_Time__c, Content__c , IsRead__c from SMS_Message__c where Sender_ID__c = :userId OR Receiver_IDs__c = :userId Order By CreatedDate DESC];
        List<List<String>> toReturn = new List<List<String>>();
        for(Contact contactt : Con){
            integer messageFound = 0;
            for(SMS_Message__c msg : allMessgaes ){
                if( (msg.Sender_ID__c == userId &&  msg.Receiver_IDs__c == contactt.id ) || (msg.Sender_ID__c == contactt.id &&  msg.Receiver_IDs__c ==  userId ))
                {
                    if(messageFound == 0)
                    {
                        system.debug(msg);
                        List<String> temp = new List<String>();
                        temp.add(JSON.serialize(contactt));
                        temp.add(msg.Content__c);
                        temp.add(string.valueOfGmt(msg.Message_Time__c));
                        temp.add(string.valueOfGmt(DateTime.Now()));
                        temp.add(string.valueOf(msg.IsRead__c));
                        temp.add(string.valueOf(msg.Receiver_IDs__c));
                        toReturn.add(temp);
                        messageFound = 1;
                    }
                }
            }
        }
        
        system.debug(toReturn);
        return toReturn;
    }
    
    @AuraEnabled
    public static list<List<String>> getRecentContacts( string currentUserId)
    {
        list<Contact> Con = [Select id,name,Account.Name,AccountId from contact];
        string userId = currentUserId;
        
        List<SMS_Message__c> allMessgaes = [Select Sender_ID__c, Receiver_IDs__c, Message_Time__c, Content__c , IsRead__c from SMS_Message__c where Sender_ID__c = :userId OR Receiver_IDs__c = :userId Order By CreatedDate DESC];
        List<List<String>> toReturn = new List<List<String>>();
        for(Contact contactt : Con){
            integer messageFound = 0;
            for(SMS_Message__c msg : allMessgaes ){
                if( (msg.Sender_ID__c == userId &&  msg.Receiver_IDs__c == contactt.id ) || (msg.Sender_ID__c == contactt.id &&  msg.Receiver_IDs__c ==  userId ))
                {
                    if(messageFound == 0)
                    {
                        system.debug(msg);
                        List<String> temp = new List<String>();
                        temp.add(JSON.serialize(contactt));
                        temp.add(msg.Content__c);
                        temp.add(string.valueOfGmt(msg.Message_Time__c));
                        temp.add(string.valueOfGmt(DateTime.Now()));
                        temp.add(string.valueOf(msg.IsRead__c));
                        temp.add(string.valueOf(msg.Receiver_IDs__c));
                        toReturn.add(temp);
                        messageFound = 1;
                    }
                }
            }
        }
        
        system.debug('Contact List with Last Msg'+toReturn);
        return toReturn;
    }
    
    @AuraEnabled
    public static list<List<String>> getGroups(string currentUserId){
        string query = 'select Name , group_members__c,school__c from messaging_group__c where group_members__c LIKE \'%'+currentUserId+'%\'';
        list<Messaging_Group__c> groups = database.query(query);
        List<SMS_Message__c> allMessgaes = [Select Sender_ID__c, Receiver_IDs__c, Message_Time__c, Content__c , IsRead__c from SMS_Message__c Order By CreatedDate DESC];
        list<List<String>> toReturn = new list<List<String>>();
        string userId = currentUserId;
        if(groups.size() > 0)
        {
            for(Messaging_Group__c singleGroup : groups){
                integer messageFound = 0;
                for(SMS_Message__c msg : allMessgaes ){
                    if( (msg.Sender_ID__c == userId &&  msg.Receiver_IDs__c == singleGroup.id ) || (msg.Sender_ID__c == singleGroup.id &&  msg.Receiver_IDs__c ==  userId ))
                    {
                        if(messageFound == 0)
                        {
                            system.debug(msg);
                            List<String> temp = new List<String>();
                            temp.add(JSON.serialize(singleGroup));
                            temp.add(msg.Content__c);
                            temp.add(string.valueOfGmt(msg.Message_Time__c));
                            temp.add(string.valueOfGmt(DateTime.Now()));
                            temp.add(string.valueOf(msg.IsRead__c));
                            temp.add(string.valueOf(msg.Receiver_IDs__c));
                            toReturn.add(temp);
                            messageFound = 1;
                        }
                    }
                }
                if(messageFound == 0)
                {
                    List<String> temp = new List<String>();
                    temp.add(JSON.serialize(singleGroup));
                    temp.add('');
                    temp.add('');
                    temp.add('');
                    toReturn.add(temp);
                }
            }
        }

        return toReturn;
    }
    
    
    @AuraEnabled
    public static list<account> fetchSchools(string currentUserId){
        list<account> schoolList = [Select id,name from account Order by Name];
        list<account> schoolListToReturn = new list<account>();
        List<SMS_Message__c> allMessgaes = [Select Sender_ID__c, Receiver_IDs__c, Message_Time__c, Content__c , IsRead__c from SMS_Message__c where Sender_ID__c = :currentUserId OR Receiver_IDs__c = :currentUserId Order By Message_Time__c DESC];
        list<Contact> Con = [Select id,name,Account.Name,AccountId, recordType.Name from contact];
        for(account school : schoolList)
        {
            List<List<String>> toReturn = new List<List<String>>();
            
            for(Contact contactt : Con){
                if(contactt.accountId == school.Id)
                {
                    integer messageFound = 0;
                    for(SMS_Message__c msg : allMessgaes ){
                        if( (msg.Sender_ID__c == currentUserId &&  msg.Receiver_IDs__c == contactt.id ) || (msg.Sender_ID__c == contactt.id &&  msg.Receiver_IDs__c ==  currentUserId ))
                        {
                            if(messageFound == 0)
                            {
                                system.debug(msg);
                                List<String> temp = new List<String>();
                                temp.add(JSON.serialize(contactt));
                                temp.add(msg.Content__c);
                                temp.add(string.valueOfGmt(msg.Message_Time__c));
                                temp.add(string.valueOfGmt(DateTime.Now()));
                                temp.add(string.valueOf(msg.IsRead__c));
                                toReturn.add(temp);
                                messageFound = 1;
                            }
                        }
                    }
                }
            }
            if(toReturn.size() > 0)
            {
                schoolListToReturn.add(school);
            }
        }
        
        return schoolListToReturn;
        
    }
    
    @AuraEnabled
    public static list<account> fetchSchoolsForRecruiters(string currentUserId){
        List<AccountContactRelation> AccountContactRelations = [Select AccountId, Account.Name , contactId from AccountContactRelation where contactId = :currentUserId];
        list<Account> schoolList = new List<Account>();
        for(AccountContactRelation AccountContact : AccountContactRelations)
        {
            schoolList.add(new Account(Id=AccountContact.AccountId , Name = AccountContact.Account.Name));
        }

        return schoolList;
    }
    
    @AuraEnabled
    public static String fetchSchoolName(string userId){
        system.debug('User Id : '+userId);
        contact con = [Select Name , Account.Name,AccountId from Contact where Id =: userId];
        return con.Name+';'+con.Account.Name;
    }
    
}