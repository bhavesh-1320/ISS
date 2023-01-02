public class ForgotPasswordController {
    public String username {get; set;}   
       
    public ForgotPasswordController() {}
	
  	public PageReference forgotPassword() {
  		boolean success = Site.forgotPassword(username);
        system.debug('before'+success);
  		PageReference pr = Page.ForgotPasswordConfirm;
        system.debug('success'+success);
  		pr.setRedirect(true);
  		
  		if (success) {  			
  			return pr;
  		}
  		return null;
  	}
  	 @AuraEnabled
  	 public static  void testForgotPasswordController(String userEmail) {
    	// Instantiate a new controller with all parameters in the page
    	ForgotPasswordController controller = new ForgotPasswordController();
    	controller.username = userEmail;
         //system.debug(userEmail);
         //system.debug(controller);
         //
    	System.assertEquals(controller.forgotPassword(),null); 
    }
}