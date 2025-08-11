const { getLanguageById, submitBatch, submitToken } = require("../utils/problemUtility");

const Problem = require("../models/problem")

const createProblem = async (req,res)=>{

    const {title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution, problemCreator
    } = req.body ;


    try{
       
      for(const {language,completeCode} of referenceSolution){
         

        // source_code:
        // language_id:
        // stdin: 
        // expectedOutput:

        const languageId = getLanguageById(language);
          
        // I am creating Batch submission
        const submissions = visibleTestCases.map((testcase)=>({
            source_code:completeCode,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));


        const submitResult = await submitBatch(submissions);
        // console.log(submitResult);

        const resultToken = submitResult.map((value)=> value.token);

        // ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]
        
       const testResult = await submitToken(resultToken);

      //  console.log(testResult);

       for(const test of testResult){
        if(test.status_id!=3){
         return res.status(400).send("Error Occured");
        }
       }

      }


      // We can store it in our DB

    const userProblem =  await Problem.create({
        ...req.body,
        problemCreator: req.result._id
      });

      res.status(201).send("Problem Saved Successfully");
    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}


module.exports = createProblem;


// const submissions = [
//     {
//       "language_id": 46,
//       "source_code": "echo hello from Bash",
//       stdin:23,
//       expected_output:43,
//     },
//     {
//       "language_id": 123456789,
//       "source_code": "print(\"hello from Python\")"
//     },
//     {
//       "language_id": 72,
//       "source_code": ""
//     }
//   ]