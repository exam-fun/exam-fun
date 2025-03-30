// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Test, console} from "forge-std/Test.sol";
import {Problem} from "../contracts/Problems/Problem.sol";
import {QuickSortSolutionInterface, QuickSortJudge} from "../contracts/Judges/QuickSortJudge.sol";
import {QuickSortSolution} from "../contracts/Solutions/QuickSortSolution.sol";
import {MergeSortSolution} from "../contracts/Solutions/MergeSortSolution.sol";
import {BubbleSortSolution} from "../contracts/Solutions/BubbleSortSolution.sol";
import {DeployQuickSortProblem} from "../script/DeployQuickSortProblem.s.sol";
import {DevOpsTools} from "@foundry-devops/DevOpsTools.sol";

contract TestQuickSort is Test {
    constructor() {}

    Problem sortProblem;
    QuickSortJudge judge;
    QuickSortSolution std;
    MergeSortSolution mergeSortSolution;
    BubbleSortSolution bubbleSortSolution;

    DeployQuickSortProblem deployer;

    address public USER = makeAddr("user");
    uint256[] public arr;
    uint256[] public expectedArr;
    uint256 constant MEASURE_LOWER_BOUND = 3;
    uint256 constant MEASURE_UPPER_BOUND = 1000;

    function setUp() public {
        deployer = new DeployQuickSortProblem();
        (
            sortProblem,
            judge,
            std,
            mergeSortSolution,
            bubbleSortSolution
        ) = deployer.run();
    }

    modifier prepareATestCase() {
        arr = new uint256[](0);
        uint24[8] memory sourceArr = [114514, 1919810, 1, 1, 4, 5, 1, 4];
        uint24[8] memory ansArr = [1, 1, 1, 4, 4, 5, 114514, 1919810];
        for (uint256 i = 0; i < 8; i++) {
            arr.push(uint256(sourceArr[i]));
            expectedArr.push(uint256(ansArr[i]));
        }
        _;
    }

    ////////////////////////////////
    // QuickSortSolution Tests    //
    ////////////////////////////////

    function testQuickSortCanReturnRightAnswer() public prepareATestCase {
        uint256[] memory answer = std.run(arr);
        for (uint256 i = 0; i < 8; i++) {
            console.log(answer[i]);
        }
    }

    ////////////////////////////////
    // MergeSortSolution Tests    //
    ////////////////////////////////

    function testMergeSortCanReturnRightAnswer() public prepareATestCase {
        uint256[] memory answer = mergeSortSolution.run(arr);
        for (uint256 i = 0; i < 8; i++) {
            console.log(answer[i]);
        }
    }

    ////////////////////////////////
    // BubbleSortSolution Tests   //
    ////////////////////////////////

    function testBubbleSortCanReturnRightAnswer() public prepareATestCase {
        uint256[] memory answer = bubbleSortSolution.run(arr);
        for (uint256 i = 0; i < 8; i++) {
            console.log(answer[i]);
        }
    }

    /////////////////////////////////
    // Gas Measure                 //
    /////////////////////////////////

    function prepare(uint256 length) internal returns (uint256[] memory list) {
        list = new uint256[](length);
        for (uint256 j = 0; j < length; j++) {
            list[j] = judge.getFakeRandomUnsignedInteger();
        }
        return list;
    }

    function testMeasureGas() public {
        uint256[] memory quickGasUsed = new uint256[](MEASURE_UPPER_BOUND + 1);
        uint256[] memory mergeGasUsed = new uint256[](MEASURE_UPPER_BOUND + 1);
        uint256[] memory bubbleGasUsed = new uint256[](MEASURE_UPPER_BOUND + 1);
        uint256 gas1 = 0;
        uint256 gas2 = 0;

        for (
            uint256 i = MEASURE_LOWER_BOUND;
            i <= MEASURE_UPPER_BOUND;
            i = (i * 7) / 5
        ) {
            arr = prepare(i);

            gas1 = gasleft();
            std.run(arr);
            gas2 = gasleft();
            quickGasUsed[i] = gas1 - gas2;

            gas1 = gasleft();
            mergeSortSolution.run(arr);
            gas2 = gasleft();
            mergeGasUsed[i] = gas1 - gas2;

            gas1 = gasleft();
            bubbleSortSolution.run(arr);
            gas2 = gasleft();
            bubbleGasUsed[i] = gas1 - gas2;
        }

        for (
            uint256 i = MEASURE_LOWER_BOUND;
            i <= MEASURE_UPPER_BOUND;
            i = (i * 7) / 5
        ) {
            // console.log(i);
            // console.log(quickGasUsed[i]);
            // console.log(mergeGasUsed[i]);
            // console.log(bubbleGasUsed[i]);
            console.log(i, quickGasUsed[i], mergeGasUsed[i], bubbleGasUsed[i]);
        }
    }

    ///////////////////////
    // Problem Tests     //
    ///////////////////////
    function testCanRevertIfJudgeNotBond() public {
        vm.expectRevert(Problem.Problem__JudgeNotBond.selector);
        sortProblem.submitSolution(address(mergeSortSolution));
    }

    function testCanRevertIfNotAuthorized() public {
        vm.expectRevert(Problem.Problem__UnauthorizedAction.selector);
        sortProblem.bindJudge(address(judge));
        vm.expectRevert(Problem.Problem__UnauthorizedAction.selector);
        sortProblem.addAuthorizedEditor(USER);
    }
}
