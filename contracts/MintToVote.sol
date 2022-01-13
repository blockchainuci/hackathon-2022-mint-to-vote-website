// SPDX-License-Identifier: GPL
pragma solidity ^0.8.4;

import "./Proposal.sol";

//specifies how child contracts (which represent different proposals) are created
contract voteToMint {
    //dynamic array to store all proposals
    Proposal[] public proposals;

    //stores the number of proposals
    int256 numProposals;

    constructor() {

    }

    //public function for anyone to create a new proposal, takes in a bytes 32 name, and a bytes32 array containing the voting options for the proposal
    function createNewProposal(bytes32 name, bytes32[] calldata optionNames)
        external
    {
        //store new Proposal in proposal array
        proposals.push(new Proposal(name, optionNames, msg.sender));
        //increase numProposals
        numProposals += 1;
    }
}
