// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {LotteryToken} from "./LotteryToken.sol";

/// @title A simple lottery contract
/// @notice This contract implements a basic lottery system with custom ERC20 tokens
contract Lottery is Ownable {
    /// @notice The ERC20 token used for payments in the lottery
    LotteryToken public paymentToken;
    
    /// @notice The number of tokens given per ETH paid
    uint256 public purchaseRatio;
    
    /// @notice The price of a single bet in tokens
    uint256 public betPrice;
    
    /// @notice The fee taken from each bet in tokens
    uint256 public betFee;
    
    /// @notice The timestamp when betting will close
    uint256 public closingTime;
    
    /// @notice Whether bets are currently open
    bool public betsOpen;
    
    /// @notice Array of addresses that have placed bets
    address[] public players;
    
    /// @notice Mapping of addresses to their prize amounts
    mapping(address => uint256) public prize;

    /// @notice Emitted when bets are opened
    event BetsOpened(uint256 closingTime);
    
    /// @notice Emitted when a bet is placed
    event BetPlaced(address player);
    
    /// @notice Emitted when bets are closed and a winner is selected
    event BetsClosed(uint256 winningNumber);
    
    /// @notice Emitted when a player withdraws their prize
    event PrizeWithdrawn(address player, uint256 amount);

    /// @notice Constructs the Lottery contract
    /// @param tokenName The name of the payment token
    /// @param tokenSymbol The symbol of the payment token
    /// @param _purchaseRatio The number of tokens given per ETH
    /// @param _betPrice The price of a single bet in tokens
    /// @param _betFee The fee taken from each bet in tokens
    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        uint256 _purchaseRatio,
        uint256 _betPrice,
        uint256 _betFee
    ) Ownable(msg.sender) {
        paymentToken = new LotteryToken(tokenName, tokenSymbol);
        purchaseRatio = _purchaseRatio;
        betPrice = _betPrice;
        betFee = _betFee;
    }

    /// @notice Opens the bets for a specified duration
    /// @param duration The duration in seconds for which bets will be open
    function openBets(uint256 duration) external onlyOwner {
        require(!betsOpen, "Bets are already open");
        closingTime = block.timestamp + duration;
        betsOpen = true;
        emit BetsOpened(closingTime);
    }

    /// @notice Allows users to purchase tokens with ETH
    function purchaseTokens() external payable {
        uint256 tokensToMint = msg.value * purchaseRatio;
        paymentToken.mint(msg.sender, tokensToMint);
    }

    /// @notice Allows a user to place a bet
    function bet() public {
        require(betsOpen, "Bets are not open");
        require(block.timestamp < closingTime, "Bets are closed");
        require(paymentToken.balanceOf(msg.sender) >= betPrice + betFee, "Insufficient balance");
        
        paymentToken.transferFrom(msg.sender, address(this), betPrice + betFee);
        players.push(msg.sender);
        emit BetPlaced(msg.sender);
    }

    /// @notice Allows a user to place multiple bets at once
    /// @param times The number of bets to place
    function betMany(uint256 times) external {
        require(times > 0, "Must bet at least once");
        for (uint256 i = 0; i < times; i++) {
            bet();
        }
    }

    /// @notice Closes the lottery and selects a winner
    function closeLottery() external {
        require(betsOpen, "Bets are not open");
        require(block.timestamp >= closingTime, "Closing time not reached");
        
        betsOpen = false;
        uint256 winningNumber = getRandomNumber() % players.length;
        address winner = players[winningNumber];
        
        uint256 prizePool = betPrice * players.length;
        prize[winner] += prizePool;
        
        emit BetsClosed(winningNumber);
        delete players;
    }

    /// @notice Generates a random number
    /// @return A pseudo-random uint256
    function getRandomNumber() public view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp)));
    }

    /// @notice Allows a winner to withdraw their prize
    /// @param amount The amount of tokens to withdraw
    function prizeWithdraw(uint256 amount) external {
        require(prize[msg.sender] >= amount, "Insufficient prize balance");
        prize[msg.sender] -= amount;
        paymentToken.transfer(msg.sender, amount);
        emit PrizeWithdrawn(msg.sender, amount);
    }

    /// @notice Allows the owner to withdraw accumulated fees
    /// @param amount The amount of tokens to withdraw
    function ownerWithdraw(uint256 amount) external onlyOwner {
        uint256 balance = paymentToken.balanceOf(address(this));
        require(balance >= amount, "Insufficient contract balance");
        paymentToken.transfer(msg.sender, amount);
    }

    /// @notice Allows users to return tokens for ETH
    /// @param amount The amount of tokens to return
    function returnTokens(uint256 amount) external {
        require(paymentToken.balanceOf(msg.sender) >= amount, "Insufficient token balance");
        paymentToken.burnFrom(msg.sender, amount);
        uint256 ethToReturn = amount / purchaseRatio;
        payable(msg.sender).transfer(ethToReturn);
    }
}