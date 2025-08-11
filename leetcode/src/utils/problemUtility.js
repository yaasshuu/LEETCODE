const axios = require('axios');

const getLanguageById = (lang) => {
  const language = {
      "c++": 54,
      "java": 62,
      "javascript": 63,
      "python": 109    
  }
  return language[lang.toLowerCase()];
}

const submitBatch = async (submissions)=>{

    
const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
    params: {
      base64_encoded: 'false'
    },
    headers: {
      'x-rapidapi-key': 'a235e1ff14msh39b51757e655a5ap1caa3cjsn29da89ff4066',
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      submissions
    }
  };
  
  async function fetchData() {
      try {
          const response = await axios.request(options);
          return response.data;
      } catch (error) {
        console.error(error);
        return null;  
      }
  }
  
  return await fetchData();

}

const waiting =async(timer)=>{
    setTimeout(()=>{
       return 1;
    },timer);

};

const submitToken = async (resultToken)=>{

    const options = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
          tokens: resultToken.join(","),
          base64_encoded: 'false',
          fields: '*'
        },
        headers: {
          'x-rapidapi-key': 'a235e1ff14msh39b51757e655a5ap1caa3cjsn29da89ff4066',
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
      };
      
      async function fetchData() {
          try {
              const response = await axios.request(options);
              return response.data;
          } catch (error) {
            console.error(error);
            return null;  
          }
      }

      while(true){

     const result = await fetchData();

     const isResultObtained = result.submissions.every((r)=>r.status_id > 2);

     if(isResultObtained)
       return result.submissions;

       await waiting(1000);

      }

}

module.exports = { getLanguageById, submitBatch, submitToken };




