public class createCommunityUser {
    
    public static void createUser(List<Contact> conList){
        Id pId = [ SELECT Id FROM Profile where Name = 'Portal User'].Id;
        	List<Contact> updateContact = new List<Contact>();
            List<user> createUser = new List<User>();
        	
        for(Contact co : conList){
            //Contact con = [select id,email,firstName,lastname,accountId from Contact where Id =:co.Id];         
            Database.DMLOptions dmo = new Database.DMLOptions();
            dmo.EmailHeader.triggerUserEmail = false;       
            dmo.EmailHeader.triggerOtherEmail = false;
            dmo.EmailHeader.triggerAutoResponseEmail = false;       
            dmo.optAllOrNone = false;
            
            // create portal user
            string nick = co.email!=null?co.email.substring(0, co.email.indexOf('@')):'';
            nick += Datetime.now().getTime();
            User newUser1 = new User(alias=co.firstName, email = co.email, emailencodingkey = 'UTF-8', firstname = co.firstName, lastname = co.lastname, languagelocalekey = 'en_US',localesidkey = 'en_US',contactId = co.Id,timezonesidkey = 'Asia/Dubai',username = co.email,CommunityNickname = nick,ProfileId =pId, IsActive = true);
            
            
            newUser1.setOptions(dmo);
            createUser.add(newUser1);
            
        }
        insert createUser;
       
    }
    
    @future
    public static void updateUser(Id rcdId, boolean accValue){
        User ut = [Select id, isActive from user where contactId=:rcdId];
        if(accValue){
            ut.isActive = false;
        }else{
            ut.IsActive = true;
        }
        update ut;
    }
    
    
    
}