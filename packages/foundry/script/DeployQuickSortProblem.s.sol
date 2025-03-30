// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Script, console} from "forge-std/Script.sol";
import {Problem} from "../contracts/Problems/Problem.sol";
import {QuickSortSolutionInterface, QuickSortJudge} from "../contracts/Judges/QuickSortJudge.sol";
import {QuickSortSolution} from "../contracts/Solutions/QuickSortSolution.sol";
import {MergeSortSolution} from "../contracts/Solutions/MergeSortSolution.sol";
import {BubbleSortSolution} from "../contracts/Solutions/BubbleSortSolution.sol";

import "./DeployHelpers.s.sol";

contract DeployQuickSortProblem is ScaffoldETHDeploy {
    constructor() {}

    Problem sortProblem;
    QuickSortJudge judge;
    QuickSortSolution std;
    MergeSortSolution mergeSortSolution;
    BubbleSortSolution bubbleSortSolution;

    uint256 public length = 1000;
    uint256 public gasLimit = 1000000;

    string public problemContentUri =
        vm.readFile("./contracts/Problems/ProblemUri.txt");

    function run() external ScaffoldEthDeployerRunner {
        new QuickSortSolution();
        new MergeSortSolution();
        new BubbleSortSolution();
        new QuickSortJudge(std, 10, 1000, gasLimit);
        new Problem(
            Problem.ProblemType.TRADITIONAL,
            "Quick Sort",
            problemContentUri,
            gasLimit
        );
    }
}
