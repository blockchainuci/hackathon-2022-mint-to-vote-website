// SPDX-License-Identifier: GPL
pragma solidity ^0.5.16;

import "./Proposal.sol";

//specifies how child contracts (which represent different proposals) are created
contract MintToVote{

  //dynamic array to store all proposal addresses
  address[] public proposals;

  //stores the number of proposals
  int numProposals;


  constructor() public{

  }

  //public function for anyone to create a new proposal, takes in a bytes 32 name, and a bytes32 array containing the voting options for the proposal
  function createNewProposal(bytes32 name, bytes32[] calldata optionNames) external{
    //store new Proposal in proposal array
    proposals.push(address(new Proposal(name, optionNames, msg.sender)));
    //increase numProposals
    numProposals+=1;
  }
}



