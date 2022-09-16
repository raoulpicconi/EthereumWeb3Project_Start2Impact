// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error myERC721__ReachedMaxSupply();

contract myERC721 is ERC721URIStorage, ERC721Enumerable, Ownable{

    using SafeMath for uint256;
    uint public constant mintPrice = 0;

    uint256 immutable i_maxSupply;

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable){

        super._beforeTokenTransfer(from, to, tokenId);
    }
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory){

        return super.tokenURI(tokenId);
    }
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool){

        return super.supportsInterface(interfaceId);
    }
    
    constructor(string memory _name, string memory _symbol, uint256 _maxSupply, address owner) ERC721(_name, _symbol){
        i_maxSupply = _maxSupply;
        transferOwnership(owner);
    }
    
    function mint(string memory _uri) public payable onlyOwner() {
        uint256 mintIndex = totalSupply();
        if(mintIndex >= i_maxSupply) {
            revert myERC721__ReachedMaxSupply();
        }
        _safeMint(msg.sender, mintIndex);
        _setTokenURI(mintIndex, _uri);
    }
}