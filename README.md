# Community Protocol (CoCo)
This project was built for Lighthouse Labs Vancouver as a proof of concept. Community Protocol was ideated and constructed over a course of 3 month and served as a graduation project for me (Artem Kuznetsov) for Lighthouse Labs Blockchain Developer program.


## Desctiption
###### Project Goal
To reward and incentivize kindness / community building without triggering political shortcomings.
All participants start at the base line and only get rewards on top, but never fall short. Transaction anonymity and forced lack of favouritism is built directly into the system.


###### Summary
The reason for creation of CommunityProtocol and CommunityCoin is in the pragmatical incentive and reward system for each individual members to participate in the growth of the community. The CoCo protocol can be customized and deployed for any company / organization (/ community). The reward system is directly reliant on monetary injections / donations towards the contract from the participants and company leadership. With the current implementation of the system it can only be done via Ethereum (will change in the future).Coco is meant to engage and reward every member, even if they don’t participate directly.

The way CoCo solves the described challenge is via 2 layer token system. Each participant naturally accumulates un-spendable (Hollow) tokens (Community Coins) with time. There is no immediate value in Hollow CoCo to the accumulating participant. However when those tokens are sent to another community member, they automatically transform into Solid CoCo, which can be traded for physical goods and / or cryptocurrency (reward system is sustained by the organization). Solid tokens can only be spent (burnt), but cannot be transferred.

Value of the Solid CoCo is derived mathematically by the contract and cannot be manipulated by the organization. The only thing that organization is capable of doing is drain the entire reward system of the cryptocurrency attached, rendering all CoCo of any value.

In order for each participant to feel the permanence of those rewards - CoProtocol has no administrative party that can take away their Solid CoCo. They can only restrict their ability to accumulate CoCo Hollow and receive new Solid CoCo.

- Meant to be deployed on a private chain
- Community has to approve / add members, but cannot remove them. Only deactivate their hollow coin generation
- All of the users will permanently retain Solid CoCo withdrawal rights. Only their receiving / active (accumulation) state can be taken away
- All transactions are anonymous
- Growth of the token numbers is only possible by the growth of the community and length of it’s existence
- Current daily harvest rate: 5 Hollow CoCo
- Current maximum transaction between 2 users: Up to 15 Hollow CoCo each direction per week
- Current Solid CoCo balance update period: once per month
- Coins have no decimal points
- Current unspent Hollow CoCo burn rate: all unspent coins are burned once a month
- CoPo only manages tokens, but not identities. Identities are stored and mapped to the wallet addresses by the company private directory
- Hollow CoCo cannot be harvested for the first month (full harvest allowed after first month), but later it can be harvested at will


###### Short System Description Architecture
**User's rights**
- User
    - [x] Create new user by yourself (comes with a little ether, not shown - for token harvest)
        - [x] Not active by default
        - [x] Must be activated by admin
    - [x] Can harvest 5 tokens per day (token harvest also brings a little ether to pay for future state changes)
        - [x] Harvest also updates the balances of all other tokens
    - [x] Can harvest solid tokens once a month
- Admins
    - [x] Can activate / deactivate users
    - [x] Can’t deactivate Super Admins and Admins
- Super Admin (future - possibly overwrite the super admin with 2/3 keys)
    - [x] Can add admins
    - [x] Can remove admins
    - [x] Can deactivate anyone
    - [x] Can withdraw ether from the contract

**Smart Contract**
- [x] Stores all the mappings
    - [x] User to Hollow Balances
    - [x] User to Current Solid Balances
    - [x] User to Future Solid
    - [x] User to Last Harvest
    - [x] User to Transactions
    - [x] User to Active Status
    - [x] User to Admin List
    - [x] Super Admin
    - [x] Token count
    - [x] Token value
- [x] Can receive ether
- [x] Executes the token burn / withdrawal - rewards with ether
- [x] Owned by the deployer (Super Admin)
- [x] isOwnable from OpenZeppelin
- [x] Anyone can donate to the contract

**Transactions**
- [x] Mapped in the contract (User to transactions)
- [x] Timestamped
- [x] From source
- [x] Value transferred

**Token management**
- [x] All hollow tokens are burned once each month pt. 2 from Super Admin trigger (currently no time restriction on that pull)
- [x] Projected value of the tokens calculated pt. 3 from Super Admin trigger (currently no time restriction on that pull)
- [x] Transfers must check conditions - less than or equal to 15 tokens from one user in one week (tell why we failed if happens)
- [x] Token transfer from user to user
- [x] Token harvest with timestamp update


## Getting Started
Because this app is made of two projects, there are two places to run npm (or yarn) commands:

Smart contracts at the root `./`
React UI in `frontend/` directory.

###### Prerequisites
[Metamask](https://metamask.io/)

Truffle
```
npm install -g truffle
```

[Ganache](https://truffleframework.com/ganache)


###### Run Smart Contract Tests
Open Ganache
Run Tests:
```
truffle test ./test/communitycoin.js
```

###### Run The App
At the root
```
truffle develop
compile
migrate
```

If `migrate` doesn't work, run:
```
truffle develop
migrate --reset
compile
migrate
```

Let truffle spin
Open another terminal tab
```
cd frontend/
yarn run start
```

In Metamask connect to `http://127.0.0.1:9545/`
Import all your accounts from Truffle to Metamask (you can find private keys for them when you just start `truffle develop`).
Play around with the app.

WARNING: App was meant to be viewed on mobile screen, so recommended resolution to set your browser to is `width 400px` or less.


## Built With
[React.js](https://reactjs.org/)
[Truffle](https://www.truffleframework.com/)
[Ganache](https://truffleframework.com/ganache)
