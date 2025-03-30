# Description

Gas limit: 10000000 gas 

You're give an `uint256[]` array, whose length is no more than $1000$ . Try to sort it in the increasing manner.

# Input

*  `uint256[] memory` : The array that you need to sort.

# Output

*  `uint256[] memory` : The array sorted in the increasing manner.

# Example

## Input

```
[114514, 1919810, 1, 1, 4, 5, 1, 4]
```

## Output

```
[1, 1, 1, 4, 4, 5, 114514, 1919810]
```

# Note

Your contract should implement the interface below to interact with the judge.

```solidity
interface QuickSortSolutionInterface is SolutionInterface {
    function run(uint256[] memory) external payable returns (uint256[] memory);
}
```

Or you can also copy-paste the template below for convenience.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

interface QuickSortSolutionInterface {
    function run(uint256[] memory) external payable returns (uint256[] memory);
}

contract MySolution is QuickSortSolutionInterface {
    function run(uint256[] memory arr) external payable override returns (uint256[] memory) {
        
    }
}

```