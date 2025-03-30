// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Judge} from "../Judges/Judge.sol";

contract Problem {
    // Errors
    error Problem__UnauthorizedAction();
    error Problem__JudgeNotBond();

    // Type declarations

    enum ProblemType {
        NON_EXISTENT,
        TRADITIONAL,
        INTERACTIVE
    }

    struct Submission {
        address submitterAddress;
        address solutionAddress;
        uint256 timestamp;
        Judge.JudgeResult judgeResult;
    }

    // State variables

    address[] public s_authorizedEditorList;

    Judge public s_bondJudge;

    ProblemType public s_problemType;
    string public s_title;
    string public s_contentUri;
    uint256 public s_gasLimit;

    Submission[] public s_submissionList;
    uint256 public s_bestSubmissionId;

    // Modifiers

    modifier onlyIfAuthorized() {
        bool isAuthorized = false;
        for (uint256 i = 0; i < s_authorizedEditorList.length; i++) {
            if (s_authorizedEditorList[i] == msg.sender) {
                isAuthorized = true;
                break;
            }
        }
        if (isAuthorized == false) {
            revert Problem__UnauthorizedAction();
        }
        _;
    }

    modifier onlyIfJudgeHasBeenBond() {
        if (address(s_bondJudge) == address(0)) {
            revert Problem__JudgeNotBond();
        }
        _;
    }

    // Events

    event newSubmission(
        address indexed submitterAddress,
        address indexed solutionAddress,
        uint256 indexed timestamp,
        Judge.JudgeState judgeState,
        uint256 gasUsed,
        string otherInformation
    );

    event newRecordCreated(
        uint256 indexed submissionId, address indexed submitterAddress, address indexed solutionAddress
    );

    // Constructor, receive and fallback functions

    constructor(ProblemType problemType_, string memory title_, string memory contentUri_, uint256 gasLimit_) {
        s_problemType = problemType_;
        s_authorizedEditorList.push(msg.sender);
        s_title = title_;
        s_contentUri = contentUri_;
        s_gasLimit = gasLimit_;
    }

    // External functions

    function submitSolution(address solutionAddress) external onlyIfJudgeHasBeenBond {
        Judge.JudgeResult memory judgeResult = s_bondJudge.enterJudge(solutionAddress);
        s_submissionList.push(Submission(msg.sender, solutionAddress, block.timestamp, judgeResult));
        emit newSubmission(
            msg.sender,
            solutionAddress,
            block.timestamp,
            judgeResult.judgeState,
            judgeResult.gasUsed,
            judgeResult.otherInformation
        );

        if (
            judgeResult.judgeState == Judge.JudgeState.ACCEPTED
                && judgeResult.gasUsed < getSubmissionByIndex(s_bestSubmissionId).judgeResult.gasUsed
        ) {
            s_bestSubmissionId = s_submissionList.length - 1;
            emit newRecordCreated(s_submissionList.length - 1, msg.sender, solutionAddress);
        }
    }

    function bindJudge(address judgeAddress) external onlyIfAuthorized {
        s_bondJudge = Judge(judgeAddress);
    }

    function addAuthorizedEditor(address editorAddress) external onlyIfAuthorized {
        s_authorizedEditorList.push(editorAddress);
    }

    // Getter functions

    function getTitle() public view returns (string memory) {
        return s_title;
    }

    function getContentUri() public view returns (string memory) {
        return s_contentUri;
    }

    function getGasLimit() public view returns (uint256) {
        return s_gasLimit;
    }

    function getSubmissionNumbers() public view returns (uint256) {
        return s_submissionList.length;
    }

    function getSubmissionByIndex(uint256 index) public view returns (Submission memory) {
        return s_submissionList[index];
    }

    function getBondJudgeAddress() public view returns (address) {
        return address(s_bondJudge);
    }
}
