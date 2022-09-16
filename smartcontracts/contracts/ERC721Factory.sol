// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./myERC721.sol";

contract ERC721Factory {

    event NftContractCreated(
        string name,
        string symbol,
        uint256 maxSupply,
        address contractAddress,
        address sender
    );

    function createNewNftContract(string memory _name, string memory _symbol, uint256 _maxSupply) public returns(myERC721) {
        myERC721 newNftContract = new myERC721(_name, _symbol, _maxSupply, msg.sender);
        emit NftContractCreated(_name, _symbol, _maxSupply, address(newNftContract), msg.sender);
        return newNftContract;
    }
}