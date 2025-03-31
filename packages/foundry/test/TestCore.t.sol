// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Test, console} from "forge-std/Test.sol";
import {Core} from "../contracts/Core.sol";
import {Problem} from "../contracts/Problems/Problem.sol";
import {Judge} from "../contracts/Judges/Judge.sol";
import {QuickSortSolutionInterface, QuickSortJudge} from "../contracts/Judges/QuickSortJudge.sol";
import {QuickSortSolution} from "../contracts/Solutions/QuickSortSolution.sol";

contract TestCore is Test {
    Core core;
    QuickSortJudge judge;
    QuickSortSolution stdSolution;
    uint256 problemIndex;
    address problemAddress;

    // Test accounts
    address public ADMIN = makeAddr("admin");
    address public USER1 = makeAddr("user1");
    address public USER2 = makeAddr("user2");

    // User registration data
    string public constant USER1_NAME = "Alice";
    string public constant USER1_TOKEN_TICKER = "ALI";
    address public constant USER1_TOKEN_ADDRESS = address(0); // No token address for this test

    string public constant USER2_NAME = "Bob";
    string public constant USER2_TOKEN_TICKER = "BOB";
    address public constant USER2_TOKEN_ADDRESS = address(1); // Mock token address

    // Problem data
    string public constant PROBLEM_TITLE = "Quick Sort";
    string public constant PROBLEM_CONTENT_URI = "Test Problem Content URI";
    uint256 public constant PROBLEM_GAS_LIMIT = 1000000;

    function setUp() public {
        // Deploy Core contract
        vm.startPrank(ADMIN);
        core = new Core();
        vm.stopPrank();

        // Deploy QuickSort solution
        stdSolution = new QuickSortSolution();

        // Deploy QuickSort judge
        judge = new QuickSortJudge(
            QuickSortSolutionInterface(address(stdSolution)),
            10, // min array length
            1000, // max array length
            PROBLEM_GAS_LIMIT
        );

        // Register problem through Core
        vm.prank(ADMIN);
        (problemAddress, problemIndex) = core.registerProblem(
            Problem.ProblemType.TRADITIONAL,
            PROBLEM_TITLE,
            PROBLEM_CONTENT_URI,
            PROBLEM_GAS_LIMIT,
            address(judge)
        );

        // Fund test accounts
        vm.deal(USER1, 10 ether);
        vm.deal(USER2, 10 ether);
    }

    /*//////////////////////////////////////////////////////////////
                        USER REGISTRATION TESTS
    //////////////////////////////////////////////////////////////*/

    function testUserRegistration() public {
        vm.startPrank(USER1);

        // Register USER1
        core.registerUser(USER1_NAME, USER1_TOKEN_TICKER, USER1_TOKEN_ADDRESS);

        // Verify registration
        Core.User memory user = core.getUser(USER1);
        assertEq(user.username, USER1_NAME);
        assertEq(user.tokenTicker, USER1_TOKEN_TICKER);
        assertEq(user.walletAddress, USER1);
        assertEq(user.tokenAddress, USER1_TOKEN_ADDRESS);
        assertEq(user.isRegistered, true);

        // Verify user count
        // assertEq(core.getUserCount(), 1);

        vm.stopPrank();
    }

    function testCannotRegisterTwice() public {
        vm.startPrank(USER1);

        // Register USER1
        core.registerUser(USER1_NAME, USER1_TOKEN_TICKER, USER1_TOKEN_ADDRESS);

        // Try to register again
        vm.expectRevert("Core: User already registered");
        core.registerUser(USER1_NAME, USER1_TOKEN_TICKER, USER1_TOKEN_ADDRESS);

        vm.stopPrank();
    }

    function testMultipleUserRegistrations() public {
        // Register USER1
        vm.prank(USER1);
        core.registerUser(USER1_NAME, USER1_TOKEN_TICKER, USER1_TOKEN_ADDRESS);

        // Register USER2
        vm.prank(USER2);
        core.registerUser(USER2_NAME, USER2_TOKEN_TICKER, USER2_TOKEN_ADDRESS);

        // Verify user count
        // assertEq(core.getUserCount(), 2);

        // Verify USER2 registration
        Core.User memory user = core.getUser(USER2);
        assertEq(user.username, USER2_NAME);
        assertEq(user.tokenTicker, USER2_TOKEN_TICKER);
        assertEq(user.walletAddress, USER2);
        assertEq(user.tokenAddress, USER2_TOKEN_ADDRESS);
        assertEq(user.isRegistered, true);
    }

    /*//////////////////////////////////////////////////////////////
                        PROBLEM REGISTRATION TESTS
    //////////////////////////////////////////////////////////////*/

    function testProblemRegistration() public view {
        // Verify problem was registered in setup
        assertEq(core.getProblemCount(), 1);

        // Verify problem address
        Core.ProblemInfo memory problemInfo = core.getProblem(problemIndex);
        assertEq(problemInfo.problemAddress, problemAddress);

        // Verify problem details
        assertEq(problemInfo.title, PROBLEM_TITLE);
        assertEq(problemInfo.contentUri, PROBLEM_CONTENT_URI);
        assertEq(problemInfo.gasLimit, PROBLEM_GAS_LIMIT);
        assertEq(problemInfo.judgeAddress, address(judge));
        assertEq(uint(problemInfo.problemType), uint(Problem.ProblemType.TRADITIONAL));
        assertEq(problemInfo.index, problemIndex);
    }

    function testRegisterMultipleProblems() public {
        // Register a second problem
        vm.prank(ADMIN);
        (address problem2Address, uint256 problem2Index) = core.registerProblem(
            Problem.ProblemType.INTERACTIVE,
            "Another Problem",
            "Another Content URI",
            500000,
            address(judge)
        );

        // Verify problem count
        assertEq(core.getProblemCount(), 2);

        // Verify problem indices
        assertEq(problemIndex, 0);
        assertEq(problem2Index, 1);

        // Verify getAllProblems
        Core.ProblemInfo[] memory allProblems = core.getAllProblems();
        assertEq(allProblems.length, 2);
        assertEq(allProblems[0].problemAddress, problemAddress);
        assertEq(allProblems[1].problemAddress, problem2Address);
        
        // Verify second problem details
        assertEq(allProblems[1].title, "Another Problem");
        assertEq(allProblems[1].contentUri, "Another Content URI");
        assertEq(allProblems[1].gasLimit, 500000);
        assertEq(uint(allProblems[1].problemType), uint(Problem.ProblemType.INTERACTIVE));
        assertEq(allProblems[0].index, 0);
        assertEq(allProblems[1].index, 1);
    }

    function testInvalidJudgeAddress() public {
        vm.prank(ADMIN);
        vm.expectRevert("Core: Invalid judge address");
        core.registerProblem(
            Problem.ProblemType.TRADITIONAL,
            "Invalid Judge Problem",
            "Content URI",
            100000,
            address(0)
        );
    }

    /*//////////////////////////////////////////////////////////////
                        SUBMISSION EVALUATION TESTS
    //////////////////////////////////////////////////////////////*/

    function testSubmissionEvaluation() public {
        // Register USER1
        vm.prank(USER1);
        core.registerUser(USER1_NAME, USER1_TOKEN_TICKER, USER1_TOKEN_ADDRESS);

        // Submit solution
        vm.prank(USER1);
        core.requestEvaluation(problemIndex, address(stdSolution));

        // Verify submission count
        assertEq(core.getSubmissionCount(), 1);

        // Verify submission record
        Core.SubmissionRecord memory record = core.getSubmission(0);
        assertEq(record.problemAddress, problemAddress);
        assertEq(record.answerAddress, address(stdSolution));
        assertEq(record.submitter, USER1);
        assertEq(uint(record.result), uint(Judge.JudgeState.RUNTIME_ERROR)); // Expecting RUNTIME_ERROR since the solution isn't properly set up in test
        assertGt(record.timestamp, 0); // Timestamp should be set
    }

    function testSubmissionRequiresRegistration() public {
        // Try to submit without registration
        vm.prank(USER1);
        vm.expectRevert("Core: User not registered");
        core.requestEvaluation(problemIndex, address(stdSolution));
    }

    function testInvalidProblemIndex() public {
        // Register USER1
        vm.prank(USER1);
        core.registerUser(USER1_NAME, USER1_TOKEN_TICKER, USER1_TOKEN_ADDRESS);

        // Try to submit with invalid problem index
        vm.prank(USER1);
        vm.expectRevert("Core: Invalid problem index");
        core.requestEvaluation(999, address(stdSolution));
    }

    function testInvalidAnswerAddress() public {
        // Register USER1
        vm.prank(USER1);
        core.registerUser(USER1_NAME, USER1_TOKEN_TICKER, USER1_TOKEN_ADDRESS);

        // Try to submit with invalid answer address
        vm.prank(USER1);
        vm.expectRevert("Core: Invalid answer address");
        core.requestEvaluation(problemIndex, address(0));
    }

    function testMultipleSubmissions() public {
        // Register USER1
        vm.prank(USER1);
        core.registerUser(USER1_NAME, USER1_TOKEN_TICKER, USER1_TOKEN_ADDRESS);

        // Submit solution multiple times
        vm.startPrank(USER1);
        core.requestEvaluation(problemIndex, address(stdSolution));
        core.requestEvaluation(problemIndex, address(stdSolution));
        core.requestEvaluation(problemIndex, address(stdSolution));
        vm.stopPrank();

        // Verify submission count
        assertEq(core.getSubmissionCount(), 3);

        // Verify user submissions
        uint256[] memory userSubs = core.getUserSubmissions(USER1);
        assertEq(userSubs.length, 3);
        assertEq(userSubs[0], 0);
        assertEq(userSubs[1], 1);
        assertEq(userSubs[2], 2);
    }

    /*//////////////////////////////////////////////////////////////
                        GETTER FUNCTIONS TESTS
    //////////////////////////////////////////////////////////////*/

    function testGetUserSubmissions() public {
        // Register both users
        vm.prank(USER1);
        core.registerUser(USER1_NAME, USER1_TOKEN_TICKER, USER1_TOKEN_ADDRESS);

        vm.prank(USER2);
        core.registerUser(USER2_NAME, USER2_TOKEN_TICKER, USER2_TOKEN_ADDRESS);

        // USER1 submits twice
        vm.startPrank(USER1);
        core.requestEvaluation(problemIndex, address(stdSolution));
        core.requestEvaluation(problemIndex, address(stdSolution));
        vm.stopPrank();

        // USER2 submits once
        vm.prank(USER2);
        core.requestEvaluation(problemIndex, address(stdSolution));

        // Verify USER1 submissions
        uint256[] memory user1Subs = core.getUserSubmissions(USER1);
        assertEq(user1Subs.length, 2);

        // Verify USER2 submissions
        uint256[] memory user2Subs = core.getUserSubmissions(USER2);
        assertEq(user2Subs.length, 1);
        assertEq(user2Subs[0], 2); // Should be the third submission (index 2)
    }

    function testGetSubmission() public {
        // Register USER1
        vm.prank(USER1);
        core.registerUser(USER1_NAME, USER1_TOKEN_TICKER, USER1_TOKEN_ADDRESS);

        // Submit solution
        vm.prank(USER1);
        core.requestEvaluation(problemIndex, address(stdSolution));

        // Try to get non-existent submission
        vm.expectRevert("Core: Invalid submission index");
        core.getSubmission(1);

        // Get valid submission
        Core.SubmissionRecord memory record = core.getSubmission(0);
        assertEq(record.submitter, USER1);
    }

    function testGetProblem() public {
        // Try to get non-existent problem
        vm.expectRevert("Core: Invalid problem index");
        core.getProblem(999);

        // Get valid problem
        Core.ProblemInfo memory problemInfo = core.getProblem(problemIndex);
        assertEq(problemInfo.problemAddress, problemAddress);
        assertEq(problemInfo.title, PROBLEM_TITLE);
        assertEq(problemInfo.contentUri, PROBLEM_CONTENT_URI);
        assertEq(problemInfo.gasLimit, PROBLEM_GAS_LIMIT);
        assertEq(problemInfo.judgeAddress, address(judge));
        assertEq(uint(problemInfo.problemType), uint(Problem.ProblemType.TRADITIONAL));
        assertEq(problemInfo.index, problemIndex);
    }
}
