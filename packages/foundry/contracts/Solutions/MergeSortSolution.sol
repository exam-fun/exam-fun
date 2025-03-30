// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {QuickSortSolutionInterface} from "../Judges/QuickSortJudge.sol";

contract MergeSortSolution is QuickSortSolutionInterface {
    function run(uint256[] memory inputArr) external payable override returns (uint256[] memory) {
        uint256[] memory arr = new uint256[](inputArr.length);
        for (uint256 i = 0; i < inputArr.length; i++) {
            arr[i] = inputArr[i];
        }
        mergeSort(arr, 0, arr.length - 1);
        return arr;
    }

    function mergeSort(uint256[] memory arr, uint256 left, uint256 right) internal pure {
        if (left < right) {
            uint256 middle = (left + right) / 2;
            mergeSort(arr, left, middle);
            mergeSort(arr, middle + 1, right);
            merge(arr, left, middle, right);
        }
    }

    function merge(uint256[] memory arr, uint256 left, uint256 middle, uint256 right) internal pure {
        uint256[] memory temp = new uint256[](right - left + 1);
        uint256 i = left;
        uint256 j = middle + 1;
        uint256 k = 0;

        while (i <= middle && j <= right) {
            if (arr[i] <= arr[j]) {
                temp[k] = arr[i];
                i++;
            } else {
                temp[k] = arr[j];
                j++;
            }
            k++;
        }

        while (i <= middle) {
            temp[k] = arr[i];
            i++;
            k++;
        }

        while (j <= right) {
            temp[k] = arr[j];
            j++;
            k++;
        }

        for (i = 0; i < temp.length; i++) {
            arr[left + i] = temp[i];
        }
    }
}
