// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "./DeployHelpers.s.sol";
import {Core} from "../contracts/Core.sol";

contract DeployCoreContract is ScaffoldETHDeploy {
    function run() external ScaffoldEthDeployerRunner {
        new Core();
    }
}
