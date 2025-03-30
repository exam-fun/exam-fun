// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

interface SolutionInterface {}

abstract contract Judge {
    // Type declarations

    SolutionInterface internal solutionInterface;

    enum JudgeState {
        NON_EXISTENT,
        ACCEPTED,
        WRONG_ANSWER,
        GAS_LIMIT_EXCEEDED,
        RUNTIME_ERROR
    }

    struct JudgeResult {
        JudgeState judgeState;
        uint256 gasUsed;
        string otherInformation;
    }

    // State variables

    bytes32 private fakeRandomSeed;

    // Constructor, receive and fallback functions

    constructor(SolutionInterface implementedSolutionInterface_) {
        solutionInterface = implementedSolutionInterface_;
    }

    // External functions

    function enterJudge(address solutionAddress) external returns (JudgeResult memory) {
        SolutionInterface solution = SolutionInterface(solutionAddress);
        fakeRandomSeed = keccak256(
            abi.encodePacked(
                fakeRandomSeed, msg.sender, solutionAddress, block.timestamp, block.prevrandao, block.number
            )
        );
        return judge(solution);
    }

    // Internal functions

    function judge(SolutionInterface solution) internal virtual returns (JudgeResult memory);

    // Public functions

    function getFakeRandomUnsignedInteger() public returns (uint256) {
        uint256 fakeRandomNumber = uint256(keccak256(abi.encodePacked(fakeRandomSeed)));
        fakeRandomSeed = keccak256(abi.encodePacked(fakeRandomSeed, fakeRandomNumber));
        return fakeRandomNumber;
    }

    function getFakeRandomUnsignedInteger(uint256 max) public returns (uint256) {
        return getFakeRandomUnsignedInteger() % max + 1;
    }
}
