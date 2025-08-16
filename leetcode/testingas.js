// const json ={
//     "title": "Add Two Numbers",
//     "description": "Write a program that takes two integers as input and returns their sum.",
//     "difficulty": "easy",
//     "tags": "array",
//     "visibleTestCases": [
//         {
//             "input": "2 3",
//             "output": "5",
//             "explanation": "2 + 3 equals 5"
//         },
//         {
//             "input": "-1 5",
//             "output": "4",
//             "explanation": "-1 + 5 equals 4"
//         }
//     ],
//     "hiddenTestCases": [
//         {
//             "input": "10 20",
//             "output": "30"
//         },
//         {
//             "input": "100 250",
//             "output": "350"
//         }
//     ],
//     "startCode": [
//         {
//             "language": "C++",
//             "initialCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read input here\n    cout << a + b;\n    return 0;\n}"
//         },
//         {
//             "language": "Java",
//             "initialCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Read input here\n    }\n}"
//         },
//         {
//             "language": "JavaScript",
//             "initialCode": "const readline = require('readline');\n\n// Complete input handling here"
//         }
//     ],
//     "referenceSolution": [
//         {
//             "language": "C++",
//             "completeCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b;\n    return 0;\n}"
//         },
//         {
//             "language": "Java",
//             "completeCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n    }\n}"
//         },
//         {
//             "language": "JavaScript",
//             "completeCode": "const input = require('fs').readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);\nconsole.log(a + b);"
//         }
//     ]
// }


// // #include<iostream>
// // using namespace std;

// // int main(){
// //     int a,b;
// //     cin>>a>>b;
// //     cout<<a+b;
// //     return 0;
// // }

// // const input = require('fs').readFileSync(0, 'utf-8').trim();
// // const [a, b] = input.split(' ').map(Number);
// // console.log(a + b);


// // const user = await User.findById(req.user._id)
// //       .populate({
// //         path: 'problemSolved',
// //         select: 'title difficulty tags createdAt', // Select needed fields
// //       });





// // 

// userSchema.post('findOneAndDelete', async function (doc) {
//     if (doc) {
//       await mongoose.model('submission').deleteMany({ userId: doc._id });
//     }
// });




// submissionSchema.index({userId:1,problemId:1});








