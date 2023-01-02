public class recruiterMessaging {

    @AuraEnabled(cacheable=true)
    public static list<account> fetchSchools(){
        list<account> acc = [Select id,name from account Order by Name];
        return acc;
    }
    
    @AuraEnabled
    public static String fetchSchoolName(string userId){
        system.debug(userId);
        contact con = [Select Name , Account.Name from Contact where Id =: userId];
        return con.Name+';'+con.Account.Name;
    }
    
        @AuraEnabled(cacheable=true)
    public static list<List<String>> getRecentContacts()
    {
        list<Contact> Con = [Select id,name,Account.Name from contact];
        //string userId = [SELECT Id, ContactId FROM User WHERE Id =: UserInfo.getUserId()].ContactId;
        string userId = '0035g00000kqtEAAAY';
        
        List<SMS_Message__c> allMessgaes = [Select Sender_ID__c, Receiver_IDs__c, Message_Time__c, Content__c , IsRead__c from SMS_Message__c Order By CreatedDate DESC];
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
        return toReturn;
    }
    
    
    @AuraEnabled(cacheable=true)
    public static list<List<String>> fetchInboxContacts(String relatedSchool){
        list<Contact> Con = [Select id,name,Account.Name, recordType.Name from contact where accountId =:relatedSchool];


        //string userId = [SELECT Id, ContactId FROM User WHERE Id =: UserInfo.getUserId()].ContactId;
        string userId = '0035g00000kqtEAAAY';
        List<SMS_Message__c> allMessgaes = [Select Sender_ID__c, Receiver_IDs__c, Message_Time__c, Content__c , IsRead__c from SMS_Message__c Order By Message_Time__c DESC];
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
                system.debug('contactt.recordType.Name : '+contactt.recordType.Name);
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
        return toReturn;
    }
    
    
    @AuraEnabled
    public static void fetchRecentMessages(List<Id> usersId, string currentUserId){
        
    }
    
    // @AuraEnabled
    // public static List<List<String>>  searchUsers(string name, string relatedSchool){
    //    // name = '%'+name+'%';
    //    // List<Contact> conLst = [Select Name from Contact where Name like :name and accountId =:relatedSchool];
    //    // return conLst;

    //     list<Contact> Con = [Select id,name,Account.Name from contact  where Name like :name and accountId =:relatedSchool];


    //     //string userId = [SELECT Id, ContactId FROM User WHERE Id =: UserInfo.getUserId()].ContactId;
    //     string userId = '0035g00000kqtEAAAY';
    //     List<SMS_Message__c> allMessgaes = [Select Sender_ID__c, Receiver_IDs__c, Message_Time__c, Content__c from SMS_Message__c Order By Message_Time__c DESC];
    //     List<List<String>> toReturn = new List<List<String>>();
    //     for(Contact contactt : Con){
    //         integer messageFound = 0;
    //         for(SMS_Message__c msg : allMessgaes ){
    //             if( (msg.Sender_ID__c == userId &&  msg.Receiver_IDs__c == contactt.id ) || (msg.Sender_ID__c == contactt.id &&  msg.Receiver_IDs__c ==  userId ))
    //             {
    //                 if(messageFound == 0)
    //                 {
    //                     system.debug(msg);
    //                     List<String> temp = new List<String>();
    //                     temp.add(JSON.serialize(contactt));
    //                     temp.add(msg.Content__c);
    //                     temp.add(string.valueOfGmt(msg.Message_Time__c));
    //                     temp.add(string.valueOfGmt(DateTime.Now()));
    //                     toReturn.add(temp);
    //                     messageFound = 1;
    //                 }
    //             }
    //         }
    //         if(messageFound == 0)
    //         {
    //             List<String> temp = new List<String>();
    //             temp.add(JSON.serialize(contactt));
    //             temp.add('');
    //             temp.add('');
    //             temp.add('');
    //             toReturn.add(temp);
    //         }
    //     }
    //     return toReturn;
    // }
    
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
        return '0035g00000kqtEAAAY';
        //return [SELECT Id, ContactId FROM User WHERE Id =: UserInfo.getUserId()].ContactId;
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
    public static List<SMS_Message__c> fetchAllMessage(string selectedAcc){
        
        //string userId = [SELECT Id, ContactId FROM User WHERE Id =: UserInfo.getUserId()].ContactId;
        
        string userId = '0035g00000kqtEAAAY';
        String SelectedAccount = selectedAcc;
        System.debug('SelectedAccount '+selectedAcc +' &UserId id : '+ userId);

        List<SMS_Message__c> message = new List<SMS_Message__c>();

        List<SMS_Message__c> allMessgaes = [Select Sender_ID__c, Receiver_IDs__c, Message_Time__c, Content__c , IsRead__c from SMS_Message__c Order By CreatedDate DESC];
        system.debug('allmsgs : '+allMessgaes);
        for(SMS_Message__c msg : allMessgaes ){
            if( msg.Sender_ID__c == selectedAcc &&  msg.Receiver_IDs__c ==  userId )
            {
                msg.IsRead__c = true;
            }
        }
        update allMessgaes;

        for(SMS_Message__c msg : [Select Receiver_IDs__c,Sender_ID__c, Message_Time__c, Content__c,IsRead__c from SMS_Message__c Order By Message_Time__c]){
            List<string> receiverLst = msg.Receiver_IDs__c.split(';');
            if((receiverLst.contains(userId) || msg.Sender_ID__c == userId) && (msg.Sender_ID__c == selectedAcc || receiverLst.contains(selectedAcc))){
                message.add(msg);                
            }
        }
        System.debug('Message======= '+message);
        return message;
        
    }

    
}