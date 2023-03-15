//SPDX-License-Identifier: MIT..

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;


// This is the main building block for smart contracts.
contract mozart {
    // Some string type variables to identify the token.
    string public name = "Mozartpeace";
    string public symbol = "MPT";
    string public description = "Some wise words here..";

    uint8 public decimals = 18;


    // The fixed amount of tokens, stored in an unsigned integer type variable.
    uint256 public totalSupply = 1000000 * 10**18 ;

    // An address type variable is used to store ethereum accounts.
    address public owner;

    // A mapping is a key/value map. Here we store each account's balance.
    mapping (address => uint256) balances;

    // A mapping is a key/value map. Here we store approved accounts and value


    mapping (address => mapping ( address => uint256)) public allowances;


    //custom token image url

    //string public constant tokenURI = "https://example.com/your_token_image.png";


    // The Transfer event helps off-chain applications understand
    // what happens within your contract.
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    // The approval event helps off-chain applications understand 
    // What happens within your contract.

    event Approval(address indexed owner, address indexed spender, uint256 value);


    /**
     * Contract initialization.
     */
    constructor() {
        // The totalSupply is assigned to the transaction sender, which is the
        // account that is deploying the contract.
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    /**
     * A function to transfer tokens.
     *
     * The `external` modifier makes a function *only* callable from *outside*
     * the contract.
     */
    function transfer(address to, uint256 amount) external {
        // Check if the transaction sender has enough tokens.
        // If `require`'s first argument evaluates to `false` then the
        // transaction will revert.
        require(balances[msg.sender] >= amount, "Not enough tokens");

        // Transfer the amount.
        balances[msg.sender] -= amount;
        balances[to] += amount;

        // Notify off-chain applications of the transfer.
        emit Transfer(msg.sender, to, amount);
    }

    /**
     * Read only function to retrieve the token balance of a given account.
     *
     * The `view` modifier indicates that it doesn't modify the contract's
     * state, which allows us to call it without executing a transaction.
     */
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
    
    // mybalance function returns balance of token the msg.sender

    function myBalance() public view returns (uint256 balance){
        return balances[msg.sender];
    } 
    //Approval function allowance of token transfer

    function approval(address spender, uint256 value) public returns (bool) {

        allowances[msg.sender][spender] = value;

        emit Approval(msg.sender, spender , value);

        return true;

    }

    /* this function transfers token on behalf of holder.. it requires
    * from address, to address and value..it requires approval of value
    *as well
    */

    function transferFrom(address from,address to, uint256 amount) public payable returns (bool){
        require(allowances[from][msg.sender] >= amount, "Not enough allowance was approved" );
       // require(balances[msg.sender] >= amount, "Insufficient balance..");
        balances[from] -= amount;
        balances[to] += amount;
        allowances[from][msg.sender] -= amount;
        emit Transfer(from , to , amount);
        return true;
    }

}