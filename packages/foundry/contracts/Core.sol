// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Problem} from "./Problems/Problem.sol";
import {Judge} from "./Judges/Judge.sol";

/**
 * @title Core
 * @dev Core contract that wraps DOJ functionality and tracks users and submissions
 */
contract Core {
    // Type declarations
    struct User {
        string username;
        string tokenTicker;
        address walletAddress;
        address tokenAddress; // optional
        bool isRegistered;
    }

    struct SubmissionRecord {
        address problemAddress;
        address answerAddress;
        address submitter;
        Judge.JudgeState result;
        uint256 gasUsage;
        uint256 timestamp;
        string additionalInfo;
    }

    // Define a struct to hold problem information
    struct ProblemInfo {
        address problemAddress;
        Problem.ProblemType problemType;
        string title;
        string contentUri;
        uint256 gasLimit;
        address judgeAddress;
        uint256 index; // Index in the problems array
    }

    // State variables
    mapping(address => User) public users;
    address[] public registeredUsers;

    SubmissionRecord[] public submissions;
    mapping(address => uint256[]) public userSubmissions; // user address => submission indices

    // Problem registry
    Problem[] public problems;

    // Events
    event UserRegistered(
        address indexed userAddress,
        string username,
        string tokenTicker
    );
    event SubmissionRequested(
        address indexed userAddress,
        address indexed problemAddress,
        address answerAddress
    );
    event SubmissionResult(
        address indexed userAddress,
        address indexed problemAddress,
        address answerAddress,
        Judge.JudgeState result,
        uint256 gasUsage
    );
    event ProblemRegistered(
        address indexed problemAddress,
        address indexed judgeAddress,
        uint256 indexed problemIndex
    );

    // Modifiers
    modifier onlyRegisteredUser() {
        require(users[msg.sender].isRegistered, "Core: User not registered");
        _;
    }

    // External functions
    /**
     * @dev Register a new user
     * @param username The username of the user
     * @param tokenTicker The token ticker for the user
     * @param tokenAddress Optional token address (can be address(0))
     */
    function registerUser(
        string calldata username,
        string calldata tokenTicker,
        address tokenAddress
    ) external {
        require(
            !users[msg.sender].isRegistered,
            "Core: User already registered"
        );

        users[msg.sender] = User({
            username: username,
            tokenTicker: tokenTicker,
            walletAddress: msg.sender,
            tokenAddress: tokenAddress,
            isRegistered: true
        });

        registeredUsers.push(msg.sender);

        emit UserRegistered(msg.sender, username, tokenTicker);
    }

    /**
     * @dev Register a Problem and bind a judge to it
     * @param problemType Type of the problem (TRADITIONAL, INTERACTIVE)
     * @param title Title of the problem
     * @param contentUri URI pointing to the problem content
     * @param gasLimit Gas limit for the problem
     * @param judgeAddress Address of the judge contract
     * @return problemAddress Address of the created problem contract
     * @return problemIndex Index of the registered problem
     */
    function registerProblem(
        Problem.ProblemType problemType,
        string memory title,
        string memory contentUri,
        uint256 gasLimit,
        address judgeAddress
    ) external returns (address problemAddress, uint256 problemIndex) {
        require(judgeAddress != address(0), "Core: Invalid judge address");

        // Create a new Problem contract
        Problem problem = new Problem(problemType, title, contentUri, gasLimit);
        problemAddress = address(problem);

        // Bind the judge to the problem
        problem.bindJudge(judgeAddress);

        // Add the problem to the list
        problems.push(problem);
        problemIndex = problems.length - 1;

        emit ProblemRegistered(problemAddress, judgeAddress, problemIndex);

        return (problemAddress, problemIndex);
    }

    /**
     * @dev Request evaluation of a solution
     * @param problemIndex Index of the problem in the problems array
     * @param answerAddress Address of the solution contract
     */
    function requestEvaluation(
        uint256 problemIndex,
        address answerAddress
    ) external onlyRegisteredUser returns (SubmissionRecord memory) {
        require(problemIndex < problems.length, "Core: Invalid problem index");
        require(answerAddress != address(0), "Core: Invalid answer address");

        Problem problem = problems[problemIndex];
        address problemAddress = address(problem);

        emit SubmissionRequested(msg.sender, problemAddress, answerAddress);

        // Store submission record before actual submission to track attempts
        uint256 submissionIndex = submissions.length;

        // Submit the solution and get the result
        try problem.submitSolution(answerAddress) {
            // Get the latest submission from the problem contract
            uint256 submissionCount = problem.getSubmissionNumbers();
            Problem.Submission memory submission = problem.getSubmissionByIndex(
                submissionCount - 1
            );

            // Create and store the submission record
            SubmissionRecord memory record = SubmissionRecord({
                problemAddress: problemAddress,
                answerAddress: answerAddress,
                submitter: msg.sender,
                result: submission.judgeResult.judgeState,
                gasUsage: submission.judgeResult.gasUsed,
                timestamp: block.timestamp,
                additionalInfo: submission.judgeResult.otherInformation
            });

            submissions.push(record);
            userSubmissions[msg.sender].push(submissionIndex);

            emit SubmissionResult(
                msg.sender,
                problemAddress,
                answerAddress,
                submission.judgeResult.judgeState,
                submission.judgeResult.gasUsed
            );

            return record;
        } catch {
            // If submission fails, record it as a runtime error
            SubmissionRecord memory record = SubmissionRecord({
                problemAddress: problemAddress,
                answerAddress: answerAddress,
                submitter: msg.sender,
                result: Judge.JudgeState.RUNTIME_ERROR,
                gasUsage: 0,
                timestamp: block.timestamp,
                additionalInfo: "Submission failed"
            });

            submissions.push(record);
            userSubmissions[msg.sender].push(submissionIndex);

            emit SubmissionResult(
                msg.sender,
                problemAddress,
                answerAddress,
                Judge.JudgeState.RUNTIME_ERROR,
                0
            );

            return record;
        }
    }

    // View functions
    /**
     * @dev Get user information
     * @param userAddress Address of the user
     * @return User information
     */
    function getUser(address userAddress) external view returns (User memory) {
        return users[userAddress];
    }

    /**
     * @dev Get total number of registered users
     * @return Number of registered users
     */
    function getUserCount() external view returns (uint256) {
        return registeredUsers.length;
    }

    /**
     * @dev Get total number of submissions
     * @return Number of submissions
     */
    function getSubmissionCount() external view returns (uint256) {
        return submissions.length;
    }

    /**
     * @dev Get submission record by index
     * @param index Index of the submission
     * @return Submission record
     */
    function getSubmission(
        uint256 index
    ) external view returns (SubmissionRecord memory) {
        require(index < submissions.length, "Core: Invalid submission index");
        return submissions[index];
    }

    /**
     * @dev Get all submissions by a user
     * @param userAddress Address of the user
     * @return Array of submission indices
     */
    function getUserSubmissions(
        address userAddress
    ) external view returns (uint256[] memory) {
        return userSubmissions[userAddress];
    }

    /**
     * @dev Get total number of registered problems
     * @return Number of problems
     */
    function getProblemCount() external view returns (uint256) {
        return problems.length;
    }

    /**
     * @dev Get problem by index
     * @param index Index of the problem
     * @return Problem information including contract address and details
     */
    function getProblem(uint256 index) external view returns (ProblemInfo memory) {
        require(index < problems.length, "Core: Invalid problem index");
        Problem problem = problems[index];
        
        return ProblemInfo({
            problemAddress: address(problem),
            problemType: problem.s_problemType(),
            title: problem.getTitle(),
            contentUri: problem.getContentUri(),
            gasLimit: problem.getGasLimit(),
            judgeAddress: problem.getBondJudgeAddress(),
            index: index
        });
    }

    /**
     * @dev Get all registered problems
     * @return Array of problem information including addresses and details
     */
    function getAllProblems() external view returns (ProblemInfo[] memory) {
        ProblemInfo[] memory problemInfos = new ProblemInfo[](problems.length);
        
        for (uint256 i = 0; i < problems.length; i++) {
            Problem problem = problems[i];
            problemInfos[i] = ProblemInfo({
                problemAddress: address(problem),
                problemType: problem.s_problemType(),
                title: problem.getTitle(),
                contentUri: problem.getContentUri(),
                gasLimit: problem.getGasLimit(),
                judgeAddress: problem.getBondJudgeAddress(),
                index: i
            });
        }
        
        return problemInfos;
    }
}
