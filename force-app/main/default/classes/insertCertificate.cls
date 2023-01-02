public class insertCertificate {
    public static void createChild(List<Certificate__c>certList){
        Set<String> username = new Set<String>();
        for(Certificate__c c:certList){
           username.add(c.Mongodb_Username__c);           
        }
        Contact[] conList = [SELECT userName__c FROM Contact Where userName__c In :username];
        Map<String, Contact> conMap = new Map<String, Contact>();
        for(Contact con : conList)
        {
            conMap.put(con.userName__c, con);
        }
		for(Certificate__c certificate : certList) {
  			Contact c = conMap.get(certificate.Mongodb_Username__c);
            if(c!=null)
            {
            	certificate.Contact__c = c.Id;    
            }
            
		}
    }
    public static void createDegree(List<Degree_Qualification__c> degreeList){
          Set<String> username = new Set<String>();
        for(Degree_Qualification__c c:degreeList){
           username.add(c.Mongodb_Username__c);           
        }
        Contact[] conList = [SELECT userName__c FROM Contact Where userName__c In :username];
        Map<String, Contact> conMap = new Map<String, Contact>();
        for(Contact con : conList)
        {
            conMap.put(con.userName__c, con);
        }
         for(Degree_Qualification__c degree:degreeList){
          	Contact c = conMap.get(degree.Mongodb_Username__c);
             if(c!=null)
            {
            	degree.Contact__c = c.Id;   
            }
            
        }
        
    }
       public static void createCareer(List<Career_History__c> careerList){
        Set<String> username = new Set<String>();
        for(Career_History__c c:careerList){
           username.add(c.Mongodb_Username__c);           
        }
        Contact[] conList = [SELECT userName__c FROM Contact Where userName__c In :username];
        Map<String, Contact> conMap = new Map<String, Contact>();
        for(Contact con : conList)
        {
            conMap.put(con.userName__c, con);
        }
         for(Career_History__c career:careerList){
          	Contact c = conMap.get(career.Mongodb_Username__c);
             if(c!=null)
            {
            	career.Contact__c = c.Id;   
            }

        }
        
    }
        public static void createCareerActivity(List<Career_Activity__c> careerList){
             Set<String> username = new Set<String>();
        for(Career_Activity__c c:careerList){
           username.add(c.Mongodb_Username__c);           
        }
        Contact[] conList = [SELECT userName__c FROM Contact Where userName__c In :username];
        Map<String, Contact> conMap = new Map<String, Contact>();
        for(Contact con : conList)
        {
            conMap.put(con.userName__c, con);
        }
         for(Career_Activity__c career:careerList){
          	Contact c = conMap.get(career.Mongodb_Username__c);
             if(c!=null)
            {
            	career.Contact__c = c.Id;  
            }
            
        }
        
    }
         public static void createJob(List<Job__c> careerList){
             
        List<Account> aclist = [SELECT Id,MongoDB_Id__c FROM Account];
         for(Account c:aclist)
         {
             for(Job__c co : careerList)
             {
                 if(co.School_ID__c == c.MongoDB_Id__c )
                 {
                     co.School__c = c.Id;
                 }
        	}
        }
        
    }
    
    public static void createPosition(List<Position__c> posiList)
    {
        List<Job__c> jobList = [Select Id, MongoDB_Id__c from Job__c];
        for(Job__c j : jobList)
        {
            for(Position__c p : posiList)
            {
                if(j.MongoDB_Id__c == p.MongoDB_Id__c)
                {
                    p.Job__c = j.Id;
                }
            }
        }
    }
    
    
    public static void createQuestion(List<Question__c> quesList)
    {
       List<Job__c> jobList = [Select Id, MongoDB_Id__c from Job__c];
        for(Job__c j : jobList)
        {
            for(Question__c p : quesList)
            {
                if(j.MongoDB_Id__c == p.MongoDB_Id__c)
                {
                    p.Job__c = j.Id;
                }
            }
        }
    }

}