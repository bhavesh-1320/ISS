public with sharing class QuizVitController {
    @AuraEnabled(cacheable=true)
    public static List<Question__c> getQuestions() {
        List<Question__c> results=[SELECT Id,Question_Title__c,Question_Type__c,Picklist_Value__c,defaultValue__c,options__c,label__c FROM Question__c WHERE RecordType.Name='Module Quiz Question'];
        return results;
    }

    @AuraEnabled
    public static Map<String,Object> checkAnswers(Map<String,String> answers) {
        System.debug(answers);
        Set<String> QuestionsId=answers.keySet();
        Map<String,Boolean> results=new Map<String,Boolean>();
        Map<String,Object> resultSet=new Map<String,Object>();
        resultSet.put('isAllCorrect',true);
        List<Question__c> correctAnswers=[SELECT Id,Correct_Answer__c FROM Question__c WHERE Id IN :QuestionsId];

        for(Question__c correctAnswer:correctAnswers){
            if(answers.get(correctAnswer.Id)==correctAnswer.Correct_Answer__c){
                results.put(correctAnswer.Id,true);
            }else{
                results.put(correctAnswer.Id,false);
                resultSet.put('isAllCorrect',false);
            }
        }
        resultSet.put('results',results);
        return resultSet;
    }
}