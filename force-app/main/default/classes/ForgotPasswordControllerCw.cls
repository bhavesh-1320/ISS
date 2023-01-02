public class ForgotPasswordControllerCw {
    public String username {get; set;}
    public ForgotPasswordControllerCw() {}
	
  	public PageReference forgotPassword() {
  		boolean success = Site.forgotPassword(username);
  		PageReference pr = Page.ForgotPasswordConfirm;
  		pr.setRedirect(true);
  		
  		if (success) {  			
  			return pr;
  		}
  		return null;
  	}
  	
     @AuraEnabled
  	 public static void testForgotPasswordController() {
    	
    	ForgotPasswordControllerCw controller = new ForgotPasswordControllerCw();
    	controller.username = 'aabidnew@test.com';     	
    	//System.assertEquals(controller.forgotPassword(),null);
    }
}