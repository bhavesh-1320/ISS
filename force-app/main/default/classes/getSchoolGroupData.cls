public class getSchoolGroupData {
    
    @AuraEnabled
    public static void getSchoolData(){
        List<String> schoolgroup = new List<String>();
    List<Account> school = [Select Name, ParentId from Account where ParentId !=  NULL];
    System.debug('School Data'+school);
        
        for(Account ac: school){
            schoolgroup.add(ac.ParentId);
        }
        
        
       system.debug(schoolgroup);
    }
}