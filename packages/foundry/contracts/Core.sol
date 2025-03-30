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

    // State variables
    mapping(address => User) public users;
    address[] public registeredUsers;

    SubmissionRecord[] public submissions;
    mapping(address => uint256[]) public userSubmissions; // user address => submission indices

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
     * @dev Request evaluation of a solution
     * @param problemAddress Address of the problem contract
     * @param answerAddress Address of the solution contract
     */
    function requestEvaluation(
        address problemAddress,
        address answerAddress
    ) external onlyRegisteredUser {
        require(problemAddress != address(0), "Core: Invalid problem address");
        require(answerAddress != address(0), "Core: Invalid answer address");

        emit SubmissionRequested(msg.sender, problemAddress, answerAddress);

        // Call the problem contract to evaluate the solution
        Problem problem = Problem(problemAddress);

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
}
