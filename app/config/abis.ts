export const DAONAD_ABI = [
  {
    inputs: [
      { name: 'title', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'targetAmount', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
      { name: 'milestoneDescriptions', type: 'string[]' },
      { name: 'milestoneAmounts', type: 'uint256[]' },
      { name: 'milestoneDeadlines', type: 'uint256[]' },
      { name: 'questionAnswers', type: 'string[8]' },
    ],
    name: 'createProject',
    outputs: [{ name: 'projectId', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'projectId', type: 'uint256' }, { name: 'amount', type: 'uint256' }],
    name: 'backProject',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'projectId', type: 'uint256' }],
    name: 'getProject',
    outputs: [
      {
        components: [
          { name: 'founder', type: 'address' },
          { name: 'title', type: 'string' },
          { name: 'description', type: 'string' },
          { name: 'targetAmount', type: 'uint256' },
          { name: 'deadline', type: 'uint256' },
          { name: 'createdAt', type: 'uint256' },
          { name: 'status', type: 'uint8' },
          { name: 'totalBacked', type: 'uint256' },
          { name: 'milestoneCount', type: 'uint256' },
          { name: 'aiVerified', type: 'bool' },
          { name: 'questionAnswers', type: 'string[8]' },
        ],
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'projectCounter',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'founder', type: 'address' }],
    name: 'getFounderProjects',
    outputs: [{ name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'backer', type: 'address' }],
    name: 'getBackerProjects',
    outputs: [{ name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'projectId', type: 'uint256' }, { name: 'milestoneIndex', type: 'uint256' }],
    name: 'getMilestone',
    outputs: [
      {
        components: [
          { name: 'description', type: 'string' },
          { name: 'amount', type: 'uint256' },
          { name: 'deadline', type: 'uint256' },
          { name: 'completed', type: 'bool' },
          { name: 'fundsReleased', type: 'bool' },
          { name: 'completedAt', type: 'uint256' },
        ],
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'projectId', type: 'uint256' }, { name: 'milestoneIndex', type: 'uint256' }],
    name: 'completeMilestone',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'projectId', type: 'uint256' },
      { name: 'milestoneIndex', type: 'uint256' },
      { name: 'support', type: 'bool' },
    ],
    name: 'voteOnMilestone',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'projectId', type: 'uint256' }, { name: 'milestoneIndex', type: 'uint256' }],
    name: 'releaseMilestoneFunds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export const USDC_ABI = [
  {
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

