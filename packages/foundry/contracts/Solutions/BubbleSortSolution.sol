// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {QuickSortSolutionInterface} from "../Judges/QuickSortJudge.sol";

contract BubbleSortSolution is QuickSortSolutionInterface {
    function run(uint256[] memory arr) external payable override returns (uint256[] memory) {
        uint256 n = arr.length;
        for (uint256 i = 0; i < n - 1; i++) {
            for (uint256 j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap arr[j] and arr[j+1]
                    (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);
                }
            }
        }
        return arr;
    }
}
