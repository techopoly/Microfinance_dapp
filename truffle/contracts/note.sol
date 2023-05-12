// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Note {
    struct User {
        string name;
        uint256 number;
        address account_address;
    }

    address[] public all_address;

    mapping(address => User) public all_users;
    mapping(address => string) public notes;

    function register(string memory name, uint256 number) public {
        if (all_users[msg.sender].number > 0) {
            revert();
        } else {
            User memory user = User({
                name: name,
                number: number,
                account_address: msg.sender
            });
            all_users[msg.sender] = user;
            all_address.push(msg.sender);
        }
    }

    function saveNote(string memory note) public {
        notes[msg.sender] = note;
    }

    function getNote() public view returns (string memory) {
        return notes[msg.sender];
    }

    // User[] values;

    // function getAllValues() public returns (User[] memory) {
    //     User[] memory values;
    //     for (uint256 i = 0; i < all_address.length; i++) {
    //         values.push(all_users[all_address[i]]);
    //     }
    //     return values;
    // }

    function getAddress() public view returns (address[] memory) {
        return all_address;
    }

    function getUser(address id) public view returns (User memory) {
        return all_users[id];
    }

    function showNotes() public view returns (string[] memory) {
        uint256 size = all_address.length; // determine the size of the mapping
        // Notee[] memory noteArray = new Notee[](size);
        string[] memory noteArray = new string[](size);

        for (uint256 i = 0; i < size; i++) {
            noteArray[i] = notes[all_address[i]];
        }
        return noteArray;
    }

    function showUser() public view returns (User[] memory) {
        uint256 size = all_address.length; // determine the size of the mapping
        User[] memory userArray = new User[](size);

        for (uint256 i = 0; i < size; i++) {
            userArray[i] = all_users[all_address[i]];
        }
        return userArray;
    }
}
