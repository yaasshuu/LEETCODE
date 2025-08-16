const Problem = require("../models/problem");
const Submission = require("../models/submission");
const User = require("../models/user");
 const {submitBatch,submitToken,getLanguageById} = require("../utils/problemUtility");

const submitCode = async(req,res)=>{

    try{
        const userId = req.result._id;
        const problemId= req.params.id;

        const {code,language} = req.body;

        if(!userId || !problemId || !code || !language)
          return res.status(400).send("Some field misiing");

          //fetch the problem by database

        const problem = await Problem.findById(problemId);

        //We have to store the submission 
        const submittedResult = await Submission.create({
          userId,
          problemId,
          code,
          language,
          status:'pending',
          testCasesTotal :problem.hiddenTestCases.length,

        })

        //judge0 ko code submit krna hai abb

        const languageId = getLanguageById(language);

        const submissions = problem.hiddenTestCases.map((testcase)=>({
          source_code:code,
          language_id: languageId,
          stdin: testcase.input,
          expected_output: testcase.output
      }));

      const submitResult = await submitBatch(submissions);

      const resultToken = submitResult.map((value)=> value.token);

      const testResult = await submitToken(resultToken);
        
      let testcasesPassed =0;
      let runtime =0;
      let memory =0;
      let status = "accepted";
      let errorMessage = null;

      for(const test of testResult){
        if(test.status_id==3){
          testcasesPassed ++;
          runtime = runtime +parseFloat(test.time);
          memory = Math.max(memory,test.memory);
        }else{
          if(test.status_id==4){
            status ="error";
            errorMessage = test.stderr;
          }
          else{
            status ="Wrong Result {compilation errornhi hai}";
            errorMessage = test.stderr;
          }

        }
      }

       //store the result in database in submission 
       submittedResult.status = status;
       submittedResult.testCasesPassed = testcasesPassed;

       submittedResult.errorMessage = errorMessage;
       submittedResult.runtime = runtime;
       submittedResult.memory = memory;

       await submittedResult.save();

       //problemId ko insert krenge userSchema ke ProblemSolved me if it is not present there 
       if (!req.result.ProblemSolved) {
        req.result.ProblemSolved = [];
      }
      
      if (!req.result.ProblemSolved.includes(problemId)) {
        req.result.ProblemSolved.push(problemId);
        await req.result.save();
      }
      
       res.status(201).send(submittedResult);

    }
    catch(err){
      res.status(500).send("Internal server Error" +err);

    }

}

const runCode = async(req,res)=>{
 
  try{
    const userId = req.result._id;
    const problemId= req.params.id;

    const {code,language} = req.body;

    if(!userId || !problemId || !code || !language)
      return res.status(400).send("Some field misiing");

      //fetch the problem by database

    const problem = await Problem.findById(problemId);

    //judge0 ko code submit krna hai abb

    const languageId = getLanguageById(language);

    const submissions = problem.visibleTestCases.map((testcase)=>({
      source_code:code,
      language_id: languageId,
      stdin: testcase.input,
      expected_output: testcase.output
  }));

  const submitResult = await submitBatch(submissions);

  const resultToken = submitResult.map((value)=> value.token);

  const testResult = await submitToken(resultToken);



   res.status(201).send(testResult);

}
catch(err){
  res.status(500).send("Internal server Error" +err);

}

}

module.exports = {submitCode ,runCode};