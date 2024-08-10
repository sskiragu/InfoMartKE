// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Payment {
    address public owner;
    uint256 public transactionCount = 0;

    event PaymentReceived(address indexed payer, uint256 amount, uint256 transactionId);
    event PaymentWithdrawn(address indexed payee, uint256 amount);

    struct Transaction {
        address payer;
        uint256 amount;
        uint256 timestamp;
    }

    mapping(uint256 => Transaction) public transactions;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function pay() external payable {
        require(msg.value > 0, "Payment amount must be greater than zero");

        transactionCount++;
        transactions[transactionCount] = Transaction(msg.sender, msg.value, block.timestamp);

        emit PaymentReceived(msg.sender, msg.value, transactionCount);
    }

    function withdraw(uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance in contract");

        payable(owner).transfer(amount);

        emit PaymentWithdrawn(owner, amount);
    }

    function getTransaction(uint256 transactionId) external view returns (Transaction memory) {
        require(transactionId > 0 && transactionId <= transactionCount, "Invalid transaction ID");

        return transactions[transactionId];
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
