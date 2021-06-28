import {atom} from 'recoil';

export const playerNameState = atom({
  key: 'playerNameState',
  default: '',
});

export const currentPlayersListState = atom({
  key: 'currentPlayersListState',
  default: ['palegreen', 'gold', 'royalblue', 'tomato'],
});

export const currentPlayerState = atom({
  key: 'currentPlayerState',
  default: 'royalblue',
});

export const currentDiceState = atom({
  key: 'currentDiceState',
  default: {num: 0, isLocked: false, lastRolledBy: null},
});

/**
 * Posible values:
 * "home" - initial state
 * "won" - coin entered won state
 */
export const allCoinState = atom({
  key: 'allCoinState',
  default: {
    palegreen: {
      p0: {position: 'home', isTurnAvailable: true},
      p1: {position: 'home', isTurnAvailable: true},
      p2: {position: 'home', isTurnAvailable: true},
      p3: {position: 'home', isTurnAvailable: true},
    },
    gold: {
      g0: {position: 'home', isTurnAvailable: true},
      g1: {position: 'home', isTurnAvailable: true},
      g2: {position: 'home', isTurnAvailable: true},
      g3: {position: 'home', isTurnAvailable: true},
    },
    royalblue: {
      r0: {position: 'home', isTurnAvailable: true},
      r1: {position: 'home', isTurnAvailable: true},
      r2: {position: 'home', isTurnAvailable: true},
      r3: {position: 'home', isTurnAvailable: true},
    },
    tomato: {
      t0: {position: 'home', isTurnAvailable: true},
      t1: {position: 'home', isTurnAvailable: true},
      t2: {position: 'home', isTurnAvailable: true},
      t3: {position: 'home', isTurnAvailable: true},
    },
  },
});

export const allBlockState = atom({
  key: 'allBlockState',
  default: {
    // t30: ["t0", "p1"],
    // "r-won": ["r0", "r1"],
    // r51: ["r2"],
    // p01: ['p0', 'p0', 'p0'],
    // r10: ['p1'],
    // p15: ['r1'],
    // g51: ['p1'],
    // t01: ['t1'],
    // 'p-won': ['p0', 'p0', 'p0', 'p0'],
    // 'g-won': ['g0', 'g0', 'g0', 'g0'],
    // 'r-won': ['r0', 'r0', 'r0', 'r0'],
    // 't-won': ['t0', 't0', 't0', 't0'],
  },
});
