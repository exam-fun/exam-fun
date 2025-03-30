/**
 * @title QuikeSortJudge
 * @author qpdk777
 * @notice All rights not reserved :)
 * @dev This is an example of DOJ judge implementation.
 *      In this file we implement SolutionInterface interface
 *      and judge function for a quick sort problem.
 */

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {SolutionInterface, Judge} from "./Judge.sol";

interface QuickSortSolutionInterface is SolutionInterface {
    function run(uint256[] memory) external payable returns (uint256[] memory);
}

contract QuickSortJudge is Judge {
    // State Variables

    QuickSortSolutionInterface std;
    uint256 immutable i_testCaseNumber;
    uint256 immutable i_maximumListLength;
    uint256 immutable i_gasLimitPerTestCase;
    uint256 private constant GAS_INFINITY = 1e70;

    // Constructor function

    constructor(QuickSortSolutionInterface _std, uint256 testCaseNumber, uint256 maximumListLength, uint256 gasLimit)
        Judge(_std)
    {
        std = _std;
        i_testCaseNumber = testCaseNumber;
        i_maximumListLength = maximumListLength;
        i_gasLimitPerTestCase = gasLimit;
    }

    // Internal functions

    function judge(SolutionInterface solutionInterface) internal override returns (JudgeResult memory) {
        QuickSortSolutionInterface solution = QuickSortSolutionInterface(address(solutionInterface)); // This is necessary for the judge.

        uint256 totalGasUsed = 0;

        for (uint256 i = 0; i < i_testCaseNumber; i++) {
            (uint256[] memory list) = prepare();
            (uint256 gasUsed, uint256[] memory answer) = act(solution, list);
            uint256[] memory stdOutput = std.run(list);
            (JudgeState judgeState, string memory otherInformation) = check(gasUsed, answer, stdOutput);

            if (judgeState != JudgeState.ACCEPTED) {
                return JudgeResult(judgeState, totalGasUsed, otherInformation);
            }

            totalGasUsed += gasUsed;
        }

        return JudgeResult(JudgeState.ACCEPTED, totalGasUsed, "Accepted");
    }

    function prepare() internal returns (uint256[] memory list) {
        uint256 length = getFakeRandomUnsignedInteger(i_maximumListLength);
        list = new uint256[](length);
        for (uint256 j = 0; j < length; j++) {
            list[j] = getFakeRandomUnsignedInteger();
        }
        return list;
    }

    function act(QuickSortSolutionInterface solution, uint256[] memory list)
        internal
        returns (uint256 gasUsed, uint256[] memory answer)
    {
        uint256 startGas = gasleft();
        (bool success, bytes memory answerBytes) =
            address(solution).call{gas: i_gasLimitPerTestCase}(abi.encodeWithSignature("run(uint256[] memory)", list));
        uint256 endGas = gasleft();
        if (!success) {
            gasUsed = GAS_INFINITY;
        } else {
            gasUsed = startGas - endGas;
        }
        answer = abi.decode(answerBytes, (uint256[]));
        return (gasUsed, answer);
    }

    function check(uint256 gasUsed, uint256[] memory answer, uint256[] memory stdOutput)
        internal
        view
        returns (JudgeState, string memory)
    {
        if (gasUsed > i_gasLimitPerTestCase) {
            return (JudgeState.GAS_LIMIT_EXCEEDED, "Gas Limit Exceeded");
        }
        if (answer.length != stdOutput.length) {
            return (JudgeState.WRONG_ANSWER, "Wrong Answer");
        }
        for (uint256 i = 0; i < answer.length; i++) {
            if (answer[i] != stdOutput[i]) {
                return (JudgeState.WRONG_ANSWER, "Wrong Answer");
            }
        }
        return (JudgeState.ACCEPTED, "Accepted");
    }
}
