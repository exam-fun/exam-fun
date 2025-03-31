/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  31337: {
    QuickSortSolution: {
      address: "0x2c4b93b614ddbfaf0807e8f4ca982e9f9c2e2aa4",
      abi: [
        {
          type: "function",
          name: "run",
          inputs: [
            {
              name: "arr",
              type: "uint256[]",
              internalType: "uint256[]",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256[]",
              internalType: "uint256[]",
            },
          ],
          stateMutability: "payable",
        },
      ],
      inheritedFunctions: {},
      deploymentFile: "run-1743385401.json",
      deploymentScript: "Deploy.s.sol",
    },
    MergeSortSolution: {
      address: "0x04fc820176617a99ae134904935bc854b2e51628",
      abi: [
        {
          type: "function",
          name: "run",
          inputs: [
            {
              name: "inputArr",
              type: "uint256[]",
              internalType: "uint256[]",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256[]",
              internalType: "uint256[]",
            },
          ],
          stateMutability: "payable",
        },
      ],
      inheritedFunctions: {},
      deploymentFile: "run-1743385401.json",
      deploymentScript: "Deploy.s.sol",
    },
    BubbleSortSolution: {
      address: "0xf1078fd568ad76e49e6f88d1ff485402a086976b",
      abi: [
        {
          type: "function",
          name: "run",
          inputs: [
            {
              name: "arr",
              type: "uint256[]",
              internalType: "uint256[]",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256[]",
              internalType: "uint256[]",
            },
          ],
          stateMutability: "payable",
        },
      ],
      inheritedFunctions: {},
      deploymentFile: "run-1743385401.json",
      deploymentScript: "Deploy.s.sol",
    },
    QuickSortJudge: {
      address: "0xe8f76a822b57b973c7a89006092364fff8f69040",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "_std",
              type: "address",
              internalType: "contract QuickSortSolutionInterface",
            },
            {
              name: "testCaseNumber",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "maximumListLength",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "gasLimit",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "enterJudge",
          inputs: [
            {
              name: "solutionAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "tuple",
              internalType: "struct Judge.JudgeResult",
              components: [
                {
                  name: "judgeState",
                  type: "uint8",
                  internalType: "enum Judge.JudgeState",
                },
                {
                  name: "gasUsed",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "otherInformation",
                  type: "string",
                  internalType: "string",
                },
              ],
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "getFakeRandomUnsignedInteger",
          inputs: [
            {
              name: "max",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "getFakeRandomUnsignedInteger",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "nonpayable",
        },
      ],
      inheritedFunctions: {},
      deploymentFile: "run-1743385401.json",
      deploymentScript: "Deploy.s.sol",
    },
    Problem: {
      address: "0x4e85dc48a70da1298489d5b6fc2492767d98f384",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "problemType_",
              type: "uint8",
              internalType: "enum Problem.ProblemType",
            },
            {
              name: "title_",
              type: "string",
              internalType: "string",
            },
            {
              name: "contentUri_",
              type: "string",
              internalType: "string",
            },
            {
              name: "gasLimit_",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "addAuthorizedEditor",
          inputs: [
            {
              name: "editorAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "bindJudge",
          inputs: [
            {
              name: "judgeAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "getBondJudgeAddress",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getContentUri",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getGasLimit",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getSubmissionByIndex",
          inputs: [
            {
              name: "index",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "tuple",
              internalType: "struct Problem.Submission",
              components: [
                {
                  name: "submitterAddress",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "solutionAddress",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "timestamp",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "judgeResult",
                  type: "tuple",
                  internalType: "struct Judge.JudgeResult",
                  components: [
                    {
                      name: "judgeState",
                      type: "uint8",
                      internalType: "enum Judge.JudgeState",
                    },
                    {
                      name: "gasUsed",
                      type: "uint256",
                      internalType: "uint256",
                    },
                    {
                      name: "otherInformation",
                      type: "string",
                      internalType: "string",
                    },
                  ],
                },
              ],
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getSubmissionNumbers",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getTitle",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "s_authorizedEditorList",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "s_bestSubmissionId",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "s_bondJudge",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract Judge",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "s_contentUri",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "s_gasLimit",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "s_problemType",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint8",
              internalType: "enum Problem.ProblemType",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "s_submissionList",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "submitterAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "solutionAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "timestamp",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "judgeResult",
              type: "tuple",
              internalType: "struct Judge.JudgeResult",
              components: [
                {
                  name: "judgeState",
                  type: "uint8",
                  internalType: "enum Judge.JudgeState",
                },
                {
                  name: "gasUsed",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "otherInformation",
                  type: "string",
                  internalType: "string",
                },
              ],
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "s_title",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "submitSolution",
          inputs: [
            {
              name: "solutionAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "event",
          name: "newRecordCreated",
          inputs: [
            {
              name: "submissionId",
              type: "uint256",
              indexed: true,
              internalType: "uint256",
            },
            {
              name: "submitterAddress",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "solutionAddress",
              type: "address",
              indexed: true,
              internalType: "address",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "newSubmission",
          inputs: [
            {
              name: "submitterAddress",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "solutionAddress",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "timestamp",
              type: "uint256",
              indexed: true,
              internalType: "uint256",
            },
            {
              name: "judgeState",
              type: "uint8",
              indexed: false,
              internalType: "enum Judge.JudgeState",
            },
            {
              name: "gasUsed",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
            {
              name: "otherInformation",
              type: "string",
              indexed: false,
              internalType: "string",
            },
          ],
          anonymous: false,
        },
        {
          type: "error",
          name: "Problem__JudgeNotBond",
          inputs: [],
        },
        {
          type: "error",
          name: "Problem__UnauthorizedAction",
          inputs: [],
        },
      ],
      inheritedFunctions: {},
      deploymentFile: "run-1743385401.json",
      deploymentScript: "Deploy.s.sol",
    },
    Core: {
      address: "0x4d8e02bbfcf205828a8352af4376b165e123d7b0",
      abi: [
        {
          type: "function",
          name: "getAllProblems",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "tuple[]",
              internalType: "struct Core.ProblemInfo[]",
              components: [
                {
                  name: "problemAddress",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "problemType",
                  type: "uint8",
                  internalType: "enum Problem.ProblemType",
                },
                {
                  name: "title",
                  type: "string",
                  internalType: "string",
                },
                {
                  name: "contentUri",
                  type: "string",
                  internalType: "string",
                },
                {
                  name: "gasLimit",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "judgeAddress",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "index",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getProblem",
          inputs: [
            {
              name: "index",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "tuple",
              internalType: "struct Core.ProblemInfo",
              components: [
                {
                  name: "problemAddress",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "problemType",
                  type: "uint8",
                  internalType: "enum Problem.ProblemType",
                },
                {
                  name: "title",
                  type: "string",
                  internalType: "string",
                },
                {
                  name: "contentUri",
                  type: "string",
                  internalType: "string",
                },
                {
                  name: "gasLimit",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "judgeAddress",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "index",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getProblemCount",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getSubmission",
          inputs: [
            {
              name: "index",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "tuple",
              internalType: "struct Core.SubmissionRecord",
              components: [
                {
                  name: "problemAddress",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "answerAddress",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "submitter",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "result",
                  type: "uint8",
                  internalType: "enum Judge.JudgeState",
                },
                {
                  name: "gasUsage",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "timestamp",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "additionalInfo",
                  type: "string",
                  internalType: "string",
                },
              ],
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getSubmissionCount",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getUser",
          inputs: [
            {
              name: "userAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "tuple",
              internalType: "struct Core.User",
              components: [
                {
                  name: "username",
                  type: "string",
                  internalType: "string",
                },
                {
                  name: "tokenTicker",
                  type: "string",
                  internalType: "string",
                },
                {
                  name: "walletAddress",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "tokenAddress",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "isRegistered",
                  type: "bool",
                  internalType: "bool",
                },
              ],
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getUserCount",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getUserSubmissions",
          inputs: [
            {
              name: "userAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256[]",
              internalType: "uint256[]",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "problems",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract Problem",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "registerProblem",
          inputs: [
            {
              name: "problemType",
              type: "uint8",
              internalType: "enum Problem.ProblemType",
            },
            {
              name: "title",
              type: "string",
              internalType: "string",
            },
            {
              name: "contentUri",
              type: "string",
              internalType: "string",
            },
            {
              name: "gasLimit",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "judgeAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "problemAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "problemIndex",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "registerUser",
          inputs: [
            {
              name: "username",
              type: "string",
              internalType: "string",
            },
            {
              name: "tokenTicker",
              type: "string",
              internalType: "string",
            },
            {
              name: "tokenAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "registeredUsers",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "requestEvaluation",
          inputs: [
            {
              name: "problemIndex",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "answerAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "tuple",
              internalType: "struct Core.SubmissionRecord",
              components: [
                {
                  name: "problemAddress",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "answerAddress",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "submitter",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "result",
                  type: "uint8",
                  internalType: "enum Judge.JudgeState",
                },
                {
                  name: "gasUsage",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "timestamp",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "additionalInfo",
                  type: "string",
                  internalType: "string",
                },
              ],
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "submissions",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "problemAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "answerAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "submitter",
              type: "address",
              internalType: "address",
            },
            {
              name: "result",
              type: "uint8",
              internalType: "enum Judge.JudgeState",
            },
            {
              name: "gasUsage",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "timestamp",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "additionalInfo",
              type: "string",
              internalType: "string",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "userSubmissions",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "users",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "username",
              type: "string",
              internalType: "string",
            },
            {
              name: "tokenTicker",
              type: "string",
              internalType: "string",
            },
            {
              name: "walletAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "tokenAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "isRegistered",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "event",
          name: "ProblemRegistered",
          inputs: [
            {
              name: "problemAddress",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "judgeAddress",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "problemIndex",
              type: "uint256",
              indexed: true,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "SubmissionRequested",
          inputs: [
            {
              name: "userAddress",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "problemAddress",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "answerAddress",
              type: "address",
              indexed: false,
              internalType: "address",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "SubmissionResult",
          inputs: [
            {
              name: "userAddress",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "problemAddress",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "answerAddress",
              type: "address",
              indexed: false,
              internalType: "address",
            },
            {
              name: "result",
              type: "uint8",
              indexed: false,
              internalType: "enum Judge.JudgeState",
            },
            {
              name: "gasUsage",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "UserRegistered",
          inputs: [
            {
              name: "userAddress",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "username",
              type: "string",
              indexed: false,
              internalType: "string",
            },
            {
              name: "tokenTicker",
              type: "string",
              indexed: false,
              internalType: "string",
            },
          ],
          anonymous: false,
        },
      ],
      inheritedFunctions: {},
      deploymentFile: "run-1743385401.json",
      deploymentScript: "Deploy.s.sol",
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
