public without sharing class CustomLoginController {
    public virtual class BaseException extends Exception {}
    public class OtherException extends Exception  {}
    
    public CustomLoginController() {
        
    }
    
    @AuraEnabled
    public static string doLogin(String username, String password){
        try{
        System.debug('username ' + username  + '---- Password ' + password );
        list<Contact> uts = [select name,Blacklisted__c from contact where email  =:username limit 1];
        Contact ut;
        
        if(uts.size() <= 0){
            throw new BaseException('Username or Password is incorrect'); 
        }
        else{
             ut = uts[0];
        }
        if(ut.Blacklisted__c){
            try{
                
                throw new CalloutException();
            }
            catch (Exception e) {
               // system.debug('e.getMessagelogin+   '+e.getMessage());
                //throw new AuraHandledException('Hey I am blackli');
                return 'Blacklisted';
                
                
            }
            
        }
        else {
         //   try {
                
                //String startUrl = 'https://internationalschoolsservices--dev.sandbox.my.site.com/recruitment/s/';
                //String startUrl = System.currentPageReference().getParameters().get('startURL');
                String communityUrl = Site.getBaseUrl();
                System.debug(communityUrl);
                //system.debug(startUrl);
                ApexPages.PageReference pageRef = Site.login(username, password, communityUrl);
                
                if(pageRef != null){
                    pageRef.setRedirect(true);
                    return pageRef.getUrl();
                } 
                
                
                throw new CalloutException();
                
                //return null;
                
                
          /*  } catch (Exception e) {
                system.debug('e.getMessagelogin+   '+e.getMessage());
                throw new AuraHandledException(e.getMessage());
                
                // return null;
            }*/
            
        }
            
        
    }catch(BaseException e){
        return 'Username or Password is incorrect';
        // throw new OtherException(e);
    }
    }
}