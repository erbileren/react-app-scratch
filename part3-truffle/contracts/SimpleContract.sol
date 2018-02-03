pragma solidity ^0.4.18;

contract SimpleContract {
  uint simpleData;

  function setData(uint x) public {
    simpleData = x;
  }

  function getData() public view returns (uint) {
    return simpleData;
  }
}