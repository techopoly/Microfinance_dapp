// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Mifi {
    // IERC20 public stablecoin;

    struct User {
        address user_address;
        uint256 credit_score;
        bool is_nid_verified;
        uint256[] loan_id;
        uint256 balance;
    }

    struct Loan {
        uint256 amount;
        address borrower;
        Status status;
        address staker;
        uint256 start_date;
        uint256 vault_id;
        string vault_type;
        uint256 borrowing_group_id;
        uint256 no_of_installments;
        uint256 no_of_installments_done;
        uint256 each_installment_amount;
        uint256 each_term;
        uint256 next_term_due_date;
    }

    struct Staker {
        uint256 total_amount_staked;
        uint256 reputation_score;
        bool is_nid_verified;
        address[] referred_borrower;
        uint256 reward;
        uint256 balance;
    }

    struct Vault {
        address vault_owner;
        uint256 vault_id;
        uint256 total_supply;
        uint256 remaining_supply;
        uint256 interest_rate;
        uint256 interest_earned;
        uint256 creation_date;
        Status status;
    }
    struct Group_Vault {
        address protocol_manager;
        uint256 vault_id;
        uint256 total_supply;
        uint256 remaining_supply;
        uint256 interest_rate;
        uint256 interest_earned;
        uint256 creation_date;
        Status status;
    }
    struct Contribution {
        uint256 vault_id;
        address member;
        uint256 contribution;
    }

    struct Borrowing_group {
        uint256 total_funded;
        mapping(address => mapping(uint256 => uint256)) member_loanId_votes;
        Status status;
    }

    enum Status {
        pending,
        approved,
        cancelled
    }

    mapping(address => User) public address_user;
    mapping(uint256 => Vault) public vaultId_vault;
    mapping(uint256 => Group_Vault) public groupVaultId_vault;
    mapping(address => Staker) public address_staker;
    mapping(uint256 => Loan) public loanId_loan;
    mapping(uint256 => Borrowing_group) public groupId_borrowingGroup;
    mapping(uint256 => Contribution[]) public groupVaultId_contribution;

    uint256 private last_borrowing_group_id;
    uint256 private last_vault_id;
    uint256 private last_group_vault_id;
    uint256 private last_loan_id;
    address owner;

    constructor() {
        //IERC20 _stablecoin
        // stablecoin = _stablecoin;
        owner = payable(msg.sender);
        last_borrowing_group_id = 0;
        last_vault_id = 0;
        last_group_vault_id = 0;
        last_loan_id = 0;
    }

    function become_staker(bool _is_nid_verified) external {
        address_staker[msg.sender] = Staker({
            total_amount_staked: 0,
            reputation_score: 100,
            is_nid_verified: _is_nid_verified,
            balance: 0,
            reward: 0,
            referred_borrower: new address[](10)
        });
    }

    function stake(uint256 loan_id) external {
        require(
            address_staker[msg.sender].balance > loanId_loan[loan_id].amount,
            "You don't have enough balance. you balance is "
        );
        require(
            address_staker[msg.sender].is_nid_verified == true,
            "Staker NID is not verified"
        );

        loanId_loan[loan_id].staker = msg.sender;
        address_staker[msg.sender].balance -= loanId_loan[loan_id].amount;
        address_staker[msg.sender].total_amount_staked = loanId_loan[loan_id]
            .amount;
        address_staker[msg.sender].referred_borrower.push(
            loanId_loan[loan_id].borrower
        );

        //emit en event to the PM.
    }

    function create_individual_vault(
        uint256 total_amount,
        uint256 interest_rate
    ) external {
        User storage user = address_user[msg.sender];
        require(user.balance >= total_amount, "Insufficient balance");
        require(
            address_user[msg.sender].is_nid_verified == true,
            "NID is not verified"
        );

        user.balance = user.balance - total_amount;

        uint256 vault_id = last_vault_id + 1;
        last_vault_id++;
        // vaultId_vault[vault_id] = Vault({});
        Vault storage vault = vaultId_vault[vault_id];
        vault.vault_owner = msg.sender;
        vault.vault_id = vault_id;
        vault.total_supply = total_amount;
        vault.remaining_supply = total_amount; //remaining balance
        vault.interest_rate = interest_rate;
        vault.status = Status.pending;
        // emit VaultCreated(vaultId, msg.sender, interestRate, isGroupVault);
    }

    function initiate_group_vault(uint256 interest_rate) external {
        // require(
        //     msg.sender == pm_address;
        //     "only pm can initiate a group vault"
        // ); //
        uint256 vault_id = last_group_vault_id + 1;
        last_group_vault_id++;
        Group_Vault storage group_vault = groupVaultId_vault[vault_id];
        group_vault.protocol_manager = msg.sender;
        group_vault.interest_rate = interest_rate;
        group_vault.status = Status.pending;
        group_vault.vault_id = vault_id;
    }

    function join_group_vault(uint256 _contribution, uint256 _vault_id)
        external
    {
        require(
            address_user[msg.sender].balance >= _contribution,
            "Insufficient balance"
        );
        require(
            address_user[msg.sender].is_nid_verified == true,
            "NID is not verified"
        );
        User storage user = address_user[msg.sender];
        groupVaultId_vault[_vault_id].total_supply += _contribution;
        user.balance = user.balance - _contribution;

        Contribution memory contribution = Contribution({
            vault_id: _vault_id,
            member: msg.sender,
            contribution: _contribution
        });
        groupVaultId_contribution[_vault_id].push(contribution);
    }

    function approve_vault(uint256 vault_id, string memory vault_type)
        external
    {
        string memory _individual = "individual";
        string memory _group = "group";
        //for individual vault
        if (
            keccak256(abi.encodePacked(vault_type)) ==
            keccak256(abi.encodePacked(_individual))
        ) {
            if (vaultId_vault[vault_id].vault_owner != address(0)) {
                vaultId_vault[vault_id].status = Status.approved;
                vaultId_vault[vault_id].creation_date = block.timestamp;
                vaultId_vault[vault_id].remaining_supply = vaultId_vault[
                    vault_id
                ].total_supply;
            }
        }
        if (
            keccak256(abi.encodePacked(vault_type)) ==
            keccak256(abi.encodePacked(_group))
        ) {
            if (groupVaultId_vault[vault_id].protocol_manager != address(0)) {
                groupVaultId_vault[vault_id].status = Status.approved;
                groupVaultId_vault[vault_id].creation_date = block.timestamp;
                groupVaultId_vault[vault_id]
                    .remaining_supply = groupVaultId_vault[vault_id]
                    .total_supply;
            }
        }
    }

    function individual_borrow(
        uint256 _vault_id,
        string memory _vault_type,
        uint256 _amount,
        uint256 _each_installment_amount,
        uint256 _no_of_installments,
        uint256 _each_term
    ) external {
        require(_amount <= 100000, "exceeded loan limit. Only upto 10000 taka");
        uint256 loan_id = last_loan_id + 1;
        last_loan_id++;

        Loan memory loan = Loan({
            borrower: msg.sender,
            amount: _amount,
            status: Status.pending,
            vault_id: _vault_id,
            vault_type: _vault_type,
            no_of_installments: _no_of_installments,
            each_installment_amount: _each_installment_amount,
            each_term: _each_term,
            staker: address(0), // Add a default value or a suitable value for the staker field
            start_date: 0, // Add a default value or a suitable value for the start_date field
            borrowing_group_id: 0, // Add a default value or a suitable value for the borrowing_group_id field
            no_of_installments_done: 0, // Add a default value for the no_of_installments_done field
            next_term_due_date: 0
        });
        loanId_loan[loan_id] = loan;
    }

    function approve_loan(uint256 _loan_id, string memory vault_type) external {
        string memory _individual = "individual";
        string memory _group = "group";
        //for individual vault
        if (
            keccak256(abi.encodePacked(vault_type)) ==
            keccak256(abi.encodePacked(_individual))
        ) {
            require(
                vaultId_vault[loanId_loan[_loan_id].vault_id]
                    .remaining_supply >= loanId_loan[_loan_id].amount,
                "Not enough fund in the vault"
            );
            require(
                loanId_loan[_loan_id].staker != address(0),
                "No staker found"
            );

            User storage user = address_user[loanId_loan[_loan_id].borrower];
            user.loan_id.push(_loan_id);
            user.balance += loanId_loan[_loan_id].amount;
            vaultId_vault[loanId_loan[_loan_id].vault_id]
                .remaining_supply -= loanId_loan[_loan_id].amount;
            loanId_loan[_loan_id].status = Status.approved;
            loanId_loan[_loan_id].start_date = block.timestamp;
        }
        if (
            keccak256(abi.encodePacked(vault_type)) ==
            keccak256(abi.encodePacked(_group))
        ) {
            require(
                groupVaultId_vault[loanId_loan[_loan_id].vault_id]
                    .remaining_supply >= loanId_loan[_loan_id].amount,
                "Not enough fund in the vault"
            );
            require(
                loanId_loan[_loan_id].staker != address(0),
                "No staker found"
            );

            User storage user = address_user[loanId_loan[_loan_id].borrower];
            user.balance += loanId_loan[_loan_id].amount;
            groupVaultId_vault[loanId_loan[_loan_id].vault_id]
                .remaining_supply -= loanId_loan[_loan_id].amount;
            loanId_loan[_loan_id].status = Status.approved;
            loanId_loan[_loan_id].start_date = block.timestamp;
        }
    }

    function cashout_balance(uint256 _amount) external {
        // require(msg.sender == owner, "Only the owner can transfer money from contract.");
        require(
            address_user[msg.sender].balance >= _amount,
            "you don't have enough balance"
        );
        require(
            address(this).balance >= _amount,
            "Not enough balance in the contract."
        );
        uint256 cashout_amount = _amount - calculate_fees(_amount, 1);
        payable(msg.sender).transfer(cashout_amount);
        address_user[msg.sender].balance -= _amount;
    }

    function individual_installment_repay_wtih_interest(
        uint256 _loan_id,
        string memory _vault_type
    ) external payable {
        uint256 installment_amount = loanId_loan[_loan_id]
            .each_installment_amount;
        uint256 interest_earned;
        uint256 staker_fee;
        uint256 vault_type = detect_vault(_vault_type);
        if (vault_type == 0) {
            uint256 vault_id = loanId_loan[_loan_id].vault_id;
            Vault storage vault = vaultId_vault[vault_id];
            uint256 interest_rate = vault.interest_rate;
            require(
                msg.value >= installment_amount,
                "Amount must be equal or more than each_term"
            );
            loanId_loan[_loan_id].no_of_installments_done += 1;
            uint256 capital_amount = breakdown_repayment(
                installment_amount,
                interest_rate
            );
            vault.remaining_supply += capital_amount;
            interest_earned = installment_amount - capital_amount;
            staker_fee = calculate_fees(interest_earned, 5);
            vault.interest_earned = interest_earned - staker_fee;
            //calculate credit score for borrower
            update_credit_score(msg.sender);
            // give staker the reward
            address_staker[loanId_loan[_loan_id].staker].reward = staker_fee;
        }
        if (vault_type == 1) {
            uint256 vault_id = loanId_loan[_loan_id].vault_id;
            Group_Vault storage vault = groupVaultId_vault[vault_id];
            uint256 interest_rate = vault.interest_rate;
            require(
                msg.value >= installment_amount,
                "Amount must be equal or more than each installment amount"
            );
            loanId_loan[_loan_id].no_of_installments_done += 1;
            // add the interest
            uint256 capital_amount = breakdown_repayment(
                installment_amount,
                interest_rate
            );
            vault.remaining_supply += capital_amount;
            interest_earned = installment_amount - capital_amount;
            staker_fee = calculate_fees(interest_earned, 5);
            vault.interest_earned = interest_earned - staker_fee;
            //calculate credit score for borrower
            update_credit_score(msg.sender);
            // give staker the reward
            address_staker[loanId_loan[_loan_id].staker].reward = staker_fee;
        }
    }

    function detect_vault(string memory _vault_type)
        internal
        pure
        returns (uint256)
    {
        string memory _individual = "individual";
        string memory _group = "group";

        if (
            keccak256(abi.encodePacked(_vault_type)) ==
            keccak256(abi.encodePacked(_individual))
        ) {
            return 0;
        }
        if (
            keccak256(abi.encodePacked(_vault_type)) ==
            keccak256(abi.encodePacked(_group))
        ) {
            return 1;
        }
        return 400;
    }

    function update_credit_score(address user_address)
        public
        returns (uint256)
    {
        User storage user = address_user[user_address];

        uint256 total_loans_taken = user.loan_id.length;
        uint256 total_loan_repaid = 0;
        uint256 timely_repayments = 0;
        uint256 total_repayment_days = 0;
        uint256 defaults = 0;
        uint256 time_elapsed;
        uint256 avg_repayment_per_day = 0;

        for (uint256 i = 0; i < total_loans_taken; i++) {
            Loan storage loan = loanId_loan[user.loan_id[i]];
            total_loan_repaid +=
                loan.no_of_installments_done *
                loan.each_installment_amount;
            total_repayment_days +=
                loan.no_of_installments_done *
                (loan.each_term / 86400);
            time_elapsed = block.timestamp - loan.start_date;
            if (loan.each_term != 0) {
                defaults =
                    loan.no_of_installments_done -
                    (time_elapsed / loan.each_term);
            }
            timely_repayments = loan.no_of_installments_done;
        }

        if (total_repayment_days != 0) {
            avg_repayment_per_day = total_loan_repaid / total_repayment_days;
        }

        uint256 new_credit_score = (total_loans_taken * 5) +
            (total_loan_repaid / 1000) +
            (timely_repayments * 10) +
            (avg_repayment_per_day / 10) -
            (defaults * 20);

        if (new_credit_score > 100) {
            user.credit_score = 100;
            return 100;
        } else if (new_credit_score < 0) {
            user.credit_score = 0;
            return 0;
        } else {
            user.credit_score = new_credit_score;
            return new_credit_score;
        }
    }

    function breakdown_repayment(
        uint256 repayment_amount,
        uint256 interest_rate
    ) internal pure returns (uint256) {
        uint256 capital_amount = (100 * repayment_amount) /
            (100 + interest_rate);
        return capital_amount;
    }

    function calculate_fees(uint256 _amount, uint256 rate)
        internal
        pure
        returns (uint256)
    {
        uint256 x = _amount;
        uint256 y = rate; //fee = 1%
        uint256 decimals = 2; // Number of decimal places

        uint256 result = (x * y) / (10**decimals);
        return result;
    }

    function calculate_interest(uint256 _amount, uint256 interest_rate)
        internal
        pure
        returns (uint256)
    {
        uint256 x = _amount;
        uint256 y = interest_rate; //interest_rate(1%-10%)
        uint256 decimals = 2; // Number of decimal places

        uint256 result = (x * y) / (10**decimals);
        return result;
    }

    function add_balance(string memory user_type) external payable {
        string memory _user = "user";
        string memory _staker = "staker";
        if (
            keccak256(abi.encodePacked(user_type)) ==
            keccak256(abi.encodePacked(_user))
        ) {
            uint256 amount = msg.value;
            address_user[msg.sender].balance += amount;
        }
        if (
            keccak256(abi.encodePacked(user_type)) ==
            keccak256(abi.encodePacked(_staker))
        ) {
            Staker storage staker = address_staker[msg.sender];
            staker.balance += msg.value;
        }
    }

    function add_user() external {
        address_user[msg.sender] = User({
            user_address: msg.sender,
            is_nid_verified: true,
            loan_id: new uint256[](0),
            balance: 0,
            credit_score: 0
        });
    }

    function get_balance() external view returns (uint256) {
        return address_user[msg.sender].balance;
    }

    function show_user() external view returns (User memory) {
        return address_user[msg.sender];
    }

    function show_last_vault_id() external view returns (uint256) {
        return last_vault_id;
    }

    function withdraw_balance(uint256 amount) external {
        User storage user = address_user[msg.sender];
        require(
            amount <= user.balance,
            "withdraw amount is more than your balance"
        );
        payable(msg.sender).transfer(amount);
        user.balance -= amount;
    }

    function show_contract_balance() external view returns (uint256) {
        return address(this).balance;
    }

    function show_all_individual_vault() public view returns (Vault[] memory) {
        uint256 size = last_vault_id; // determine the size of the mapping
        Vault[] memory vaultArray = new Vault[](size);

        for (uint256 i = 1; i <= size; i++) {
            vaultArray[i - 1] = vaultId_vault[i];
        }
        return vaultArray;
    }

    function show_all_group_vault() public view returns (Group_Vault[] memory) {
        uint256 size = last_group_vault_id; // determine the size of the mapping
        Group_Vault[] memory group_vautl_array = new Group_Vault[](size);

        for (uint256 i = 1; i <= size; i++) {
            group_vautl_array[i - 1] = groupVaultId_vault[i];
        }
        return group_vautl_array;
    }

      function show_contribution(uint _vault_id) public view returns (Contribution[] memory) {
        return groupVaultId_contribution[_vault_id];
    }


    function show_all_loan() public view returns (Loan[] memory) {
        uint256 size = last_loan_id; // determine the size of the mapping
        Loan[] memory loanArray = new Loan[](size);

        for (uint256 i = 1; i <= size; i++) {
            loanArray[i - 1] = loanId_loan[i];
        }
        return loanArray;
    }

    function time() public view returns (uint256) {
        return block.timestamp;
    }
}
