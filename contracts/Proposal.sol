// SPDX-License-Identifier: GPL
pragma solidity ^0.5.16;


contract Proposal{

  struct Option{
    bytes32 optionName; //up to 32byte long name of option to vote for in proposal
    uint voteCount; //cumulative votes for said option
  }

  //dynamically sized array of options for proposal
  Option[] public options;

  //person who created the proposal
  address _proposer;

  //name of proposal
  bytes32 _name;

  //mapping to chekc if a user has already voted on a proposal
  mapping(address => bool) hasVoted;


  constructor(bytes32 name, bytes32[] memory optionNames, address proposer) public {
    _proposer = proposer;
    _name = name;

    //for each of the options names, create a new Option object and append to 'options' dynamic array
    for (uint i = 0; i < optionNames.length; i++) {
      options.push(Option({
        optionName: optionNames[i],
        voteCount: 0
      }));
    }
  }

  //casts a vote where option is the index of the selected option
  function vote(uint option) external{
    address sender = msg.sender;
    require(!hasVoted[sender], "This address has already voted on this proposal");
    hasVoted[sender] = true;
    options[option].voteCount += 1;
  }

  //computes winning option from proposal by looking at all votes
  function winningOption() public view
            returns (uint winningOption_)
    {
        uint winningOptionCount = 0;
        for (uint p = 0; p < options.length; p++) {
            if (options[p].voteCount >= winningOptionCount) {
                winningOptionCount = options[p].voteCount;
                winningOption_ = p;
            }
        }
    }

    // Calls winningProposal() function to get the index
    // of the winner contained in the proposals array and then
    // returns the name of the winner
    function winnerName() external view
            returns (bytes32 winnerName_)
    {
        winnerName_ = options[winningOption()].optionName;
    }
}

