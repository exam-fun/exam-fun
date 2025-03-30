// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {QuickSortSolutionInterface} from "../Judges/QuickSortJudge.sol";

contract QuickSortSolution is QuickSortSolutionInterface {
    function run(uint256[] memory arr) external payable override returns (uint256[] memory) {
        quickSort(arr, int256(0), int256(arr.length - 1));
        return arr;
    }

    function quickSort(uint256[] memory arr, int256 left, int256 right) internal {
        if (left < right) {
            int256 pivotIndex = partition(arr, left, right);
            if (pivotIndex > 1) {
                quickSort(arr, left, pivotIndex - 1);
            }
            quickSort(arr, pivotIndex + 1, right);
        }
    }

    function partition(uint256[] memory arr, int256 left, int256 right) internal pure returns (int256) {
        uint256 pivot = arr[uint256(right)];
        int256 i = left - 1;
        for (int256 j = left; j < right; j++) {
            if (arr[uint256(j)] <= pivot) {
                i++;
                (arr[uint256(i)], arr[uint256(j)]) = (arr[uint256(j)], arr[uint256(i)]);
            }
        }
        (arr[uint256(i + 1)], arr[uint256(right)]) = (arr[uint256(right)], arr[uint256(i + 1)]);
        return i + 1;
    }
}
