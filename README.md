# DAOnad 🚀

A decentralized crowdfunding platform built for Monad, inspired by DAOHaus. This platform enables web2/web3 founders to propose projects and receive funding from backers, with milestone-based fund releases governed by backer voting.

## 🌟 Features

### Founder Mode
- **8-Question Proposal System**: Founders answer comprehensive questions about their project
- **AI Verification**: Projects are verified to prevent spam and duplicate ideas
- **Milestone-Based Funding**: Break down projects into milestones with specific deliverables
- **Automatic Governance Token Creation**: Each project gets its own governance token

### Backer Mode
- **Governance Tokens**: Backers receive governance tokens proportional to their backing amount
- **Milestone Voting**: Backers vote on milestone completion before funds are released
- **Transparent Funding**: All projects and milestones are on-chain and transparent
- **Nested DAO Structure**: Each project operates as its own mini-DAO

## 🏗️ Architecture

### Smart Contracts
- **TestUSDC.sol**: ERC20 stablecoin for payments (6 decimals, testnet only)
- **ProjectGovernanceToken.sol**: ERC20Votes token for project governance
- **DAOnad.sol**: Main platform contract with proposal, backing, and voting logic

### Frontend
- **Next.js 14**: React framework with App Router
- **Wagmi + RainbowKit**: Web3 wallet connection
- **Tailwind CSS**: Modern, responsive UI
- **TypeScript**: Type-safe development

## 📋 Project Flow

1. **Founder Creates Project**
   - Fills out 8 questions
   - Defines milestones and funding amounts
   - Submits for AI verification

2. **AI Verification**
   - Platform owner verifies project (AI check for spam/duplicates)
   - Project goes live if verified

3. **Backers Fund Project**
   - Backers contribute USDC
   - Receive governance tokens (1 token per 1 USDC)

4. **Milestone Completion**
   - Founder marks milestone as complete
   - Voting period starts (7 days)

5. **Backer Voting**
   - Backers vote with governance tokens
   - Requires 30% quorum
   - Yes votes must exceed no votes

6. **Fund Release**
   - If voting passes, funds are released to founder
   - Process repeats for each milestone

## 🎯 Monad-Specific Optimizations

This platform leverages Monad's unique features:
- **Fast Block Times**: Quick transaction confirmations for better UX
- **Parallel Execution**: Efficient handling of multiple projects and votes
- **Asynchronous Handling**: Optimized for concurrent milestone completions

## 📁 Project Structure

```
monad-blitz-bangalore/
├── contracts/                  # Smart contracts
│   ├── TestUSDC.sol
│   ├── ProjectGovernanceToken.sol
│   └── DAOnad.sol
├── app/                        # Next.js frontend
│   ├── components/             # React components
│   ├── config/                 # Chain and ABI configs
│   └── utils/                  # Utility functions
└── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MetaMask or compatible wallet
- Monad testnet configured in wallet

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your contract addresses
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Deployment

### Step 1: Deploy Smart Contracts (Remix IDE)

#### Prerequisites
1. **Remix IDE**: Visit [remix.ethereum.org](https://remix.ethereum.org)
2. **Monad Testnet RPC**: `https://testnet-rpc.monad.xyz`
3. **Chain ID**: `10143`
4. **Testnet MON**: Get from Monad testnet faucet
5. **MetaMask or compatible wallet** configured for Monad testnet

#### Add Monad Testnet to MetaMask
1. Open MetaMask
2. Go to Settings > Networks > Add Network
3. Add the following:
   - **Network Name**: Monad Testnet
   - **RPC URL**: `https://testnet-rpc.monad.xyz`
   - **Chain ID**: `10143`
   - **Currency Symbol**: MON
   - **Block Explorer**: `https://testnet-explorer.monad.xyz`

#### Install OpenZeppelin Contracts in Remix
1. Open Remix IDE
2. Go to the **File Explorer** tab
3. Click on **contracts** folder
4. Right-click and select **New File**
5. Create a file named `package.json` with:
```json
{
  "dependencies": {
    "@openzeppelin/contracts": "^5.0.0"
  }
}
```

6. Alternatively, use the Remix Package Manager:
   - Go to **Plugin Manager**
   - Search for "OpenZeppelin"
   - Install the OpenZeppelin plugin

#### Create Contract Files in Remix
Create the following files in Remix's `contracts` folder:

1. **TestUSDC.sol** - Copy from `contracts/TestUSDC.sol`
2. **ProjectGovernanceToken.sol** - Copy from `contracts/ProjectGovernanceToken.sol`
3. **DAOnad.sol** - Copy from `contracts/DAOnad.sol`

**Note**: Make sure the import paths match. In Remix, you may need to adjust imports to:
- `import "@openzeppelin/contracts/token/ERC20/ERC20.sol";`
- Or use relative paths if OpenZeppelin is in a different location

#### Compile Contracts
1. Go to the **Solidity Compiler** tab
2. Select compiler version: **0.8.24** (or compatible)
3. Click **Compile TestUSDC.sol**
4. Repeat for other contracts
5. Fix any compilation errors

#### Deploy Contracts

**Deploy Order:**
1. **TestUSDC** (deploy first)
2. **DAOnad** (needs USDC address)
3. **ProjectGovernanceToken** (created automatically by DAOnad)

**Deploy TestUSDC:**
1. Go to **Deploy & Run Transactions** tab
2. Select **Injected Provider - MetaMask** as environment
3. Make sure you're connected to Monad Testnet
4. Select **TestUSDC** from the contract dropdown
5. In the deploy parameters, enter your address as the `initialOwner`
6. Click **Deploy**
7. **Copy the deployed contract address** - you'll need it for the next step

**Deploy DAOnad:**
1. Select **DAOnad** from the contract dropdown
2. In the deploy parameters:
   - `_usdc`: Paste the TestUSDC contract address
   - `initialOwner`: Your address (or the address that will verify projects)
3. Click **Deploy**
4. **Copy the deployed contract address** - this is your main platform contract

#### Verify Contracts (Optional but Recommended)
1. Go to [Monad Testnet Explorer](https://testnet-explorer.monad.xyz)
2. Find your deployed contract
3. Click **Verify Contract**
4. Upload the source code
5. Select compiler version and settings matching Remix

#### Mint Test USDC for Testing
After deployment, you can mint test USDC:
1. In Remix, go to **Deploy & Run Transactions**
2. Find your deployed **TestUSDC** contract
3. Expand it to see available functions
4. Call `mint(address to, uint256 amount)` with:
   - `to`: Your address
   - `amount`: Amount in 6 decimals (e.g., `1000000000` for 1000 USDC)

### Step 2: Deploy Frontend (Vercel)

#### Prerequisites
- Node.js 18+ installed
- Vercel account (free tier works)
- Deployed contract addresses

#### Local Development
1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Environment Variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` with your contract addresses:
   ```env
   NEXT_PUBLIC_USDC_ADDRESS=0x...
   NEXT_PUBLIC_DAONAD_ADDRESS=0x...
   NEXT_PUBLIC_CHAIN_ID=10143
   NEXT_PUBLIC_MONAD_RPC_URL=https://testnet-rpc.monad.xyz
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

#### Deploy to Vercel

**Option 1: Vercel CLI**
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   Follow the prompts. For production:
   ```bash
   vercel --prod
   ```

**Option 2: Vercel Dashboard**
1. **Push to GitHub**
   - Create a GitHub repository
   - Push your code

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click **New Project**
   - Import your GitHub repository
   - Configure environment variables (see below)
   - Click **Deploy**

#### Environment Variables in Vercel
In Vercel dashboard, go to **Settings > Environment Variables** and add:

- `NEXT_PUBLIC_USDC_ADDRESS` - Your deployed TestUSDC contract address
- `NEXT_PUBLIC_DAONAD_ADDRESS` - Your deployed DAOnad contract address
- `NEXT_PUBLIC_CHAIN_ID` - `10143` (Monad testnet)
- `NEXT_PUBLIC_MONAD_RPC_URL` - `https://testnet-rpc.monad.xyz`
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - Get from [WalletConnect Cloud](https://cloud.walletconnect.com)

#### Getting WalletConnect Project ID
1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Sign up / Log in
3. Create a new project
4. Copy the Project ID
5. Add it to your environment variables

## 🔧 Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_USDC_ADDRESS` | TestUSDC contract address | `0x1234...` |
| `NEXT_PUBLIC_DAONAD_ADDRESS` | DAOnad contract address | `0x5678...` |
| `NEXT_PUBLIC_CHAIN_ID` | Monad testnet chain ID | `10143` |
| `NEXT_PUBLIC_MONAD_RPC_URL` | Monad testnet RPC endpoint | `https://testnet-rpc.monad.xyz` |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect project ID | Get from walletconnect.com |

## 🧪 Testing Your Deployment

1. **Connect Wallet** (MetaMask on Monad testnet)
2. **Mint Test USDC** (via Remix, call `mint()` on TestUSDC)
3. **Create Project** (Founder Mode)
4. **Verify Project** (as owner, call `verifyProject()`)
5. **Back Project** (Backer Mode)
6. **Complete Milestone** (Founder)
7. **Vote** (Backers)
8. **Release Funds** (if vote passes)

## 🔒 Security Considerations

- Contracts use OpenZeppelin's battle-tested libraries
- ReentrancyGuard protection on critical functions
- Access control with Ownable pattern
- Milestone voting prevents premature fund release
- Voting quorum (30% of supply)
- Milestone deadline enforcement

## 🐛 Troubleshooting

### Contract Compilation Errors
- Make sure OpenZeppelin contracts are installed in Remix
- Verify Solidity version is 0.8.24
- Check import paths match your Remix setup
- Use the Remix Package Manager if needed

### Deployment Fails
- Check you have enough MON for gas
- Verify you're on Monad Testnet
- Check contract addresses are valid

### Transaction Reverts
- Check all parameters are correct
- Verify contract addresses exist
- Check you have sufficient USDC balance for backing

### Frontend Build Errors
- Check all environment variables are set
- Verify contract addresses are correct
- Check Node.js version (18+)

### Contract Interaction Errors
- Verify you're connected to Monad testnet
- Check contract addresses match deployment
- Ensure you have test USDC and MON tokens
- Check contract ABI matches deployed contract

### Vercel Deployment Issues
- Check build logs in Vercel dashboard
- Verify environment variables are set
- Ensure `package.json` has correct scripts
- Check Next.js version compatibility

## 📝 Post-Deployment Checklist

- [ ] Contracts deployed and verified on Monad testnet
- [ ] Contract addresses added to environment variables
- [ ] Frontend deployed to Vercel
- [ ] Test wallet connection
- [ ] Test creating a project
- [ ] Test backing a project
- [ ] Test milestone completion and voting
- [ ] Update README with live URLs

## 📝 License

MIT

## 🤝 Contributing

This is a Monad Blitz Bangalore - IBW Edition's submission. For questions or issues, please open an issue in the repository.

---

**Built for Monad Blitz Bangalore - IBW 2025 Edition** 🎉
