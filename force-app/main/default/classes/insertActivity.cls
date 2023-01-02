public class insertActivity {

    public static void createActivity(List<Activity_Tracker__c > careerList){
          Set<String> username = new Set<String>();
        Set<String>schoolId = new Set<String>();
        for(Activity_Tracker__c c:careerList){
           username.add(c.Mongodb_Username__c);  
            schoolId.add(c.MongoDB_Favourite_Id__c);
        }
          Contact[] conList = [SELECT userName__c FROM Contact Where userName__c In :username];
        Account [] alist = [SELECT id from Account where Id In :schoolId];
        
         Map<String, Contact> conMap = new Map<String, Contact>();
        Map<String, Account> accMap = new Map<String, Account>();
         for(Contact con : conList)
        {
            conMap.put(con.userName__c, con);
        }
        for(Account a : alist){
            
        }
		for(Activity_Tracker__c certificate : careerList) {
            if(certificate.MongoDB_Favourite_Type__c == 'School'){
              Account a = accMap.get(certificate.MongoDB_Favourite_Id__c);
                if(a!=null){
                    certificate.Account__c = a.Id;
                }
            }
  			Contact c = conMap.get(certificate.Mongodb_Username__c);
            if(c!=null)
            {
            	certificate.Contact__c = c.Id;    
            }
            
		}
    }
}