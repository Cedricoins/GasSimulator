// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract GasSimulator {
    string public message = "Hello World!";
    event GasReport(uint gasUsed, uint ethPriceUSD, uint costUSD);

    function setMessage(string memory _msg) public {
        uint startGas = gasleft();
        message = _msg;
        uint gasUsed = startGas - gasleft();
        
        // Prix ETH live via Chainlink (simulé ici)
        uint ethPrice = 3085 * 1e8; // 3085 $ en wei
        uint costUSD = (gasUsed * tx.gasprice * ethPrice) / 1e18;
        
        emit GasReport(gasUsed, ethPrice / 1e8, costUSD / 1e16);
    }
}
