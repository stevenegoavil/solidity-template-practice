//SPDX-License-Identifier: MIT
pragma solidity >= 0.4.22 < 0.9.0;

contract Counter {

    uint public count;

    function increment() public {
        count += 1;}
    function decrement() public {
        require(count>0, "The count can not be less than or equal to zero");
        count -=1;}
    function getCount() public view returns(uint){
        return count;} 

}