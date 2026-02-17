/**
 * Theme color definitions with type-safe interface.
 * All colors use OKLCH format for perceptual uniformity.
 */

export interface ThemeColors {
  bg: string
  primary: string
  secondary: string
  tertiary: string
  error: string
  fast: string
  normal: string
  slow: string
  islandBg: string
  islandFg: string
  islandButtonBg: string
  islandButtonHoverBg: string
  mutedButtonBg: string
  mutedButtonBgHover: string
}

export interface Theme {
  name: string
  colors: ThemeColors
}

export const themes: Theme[] = [
  {
    name: 'Parchment',
    colors: {
      bg: 'oklch(44% 0.04 95)',
      primary: 'oklch(98% 0.08 100)',
      secondary: 'oklch(74% 0.05 100)',
      tertiary: 'oklch(60% 0.04 100)',
      error: 'oklch(85% 0.14 55)',
      fast: 'oklch(98% 0.08 100)',
      normal: 'oklch(85% 0.14 80)',
      slow: 'oklch(85% 0.14 40)',
      islandBg: 'oklch(98% 0.08 100 / 22%)',
      islandFg: 'oklch(98% 0.08 100)',
      islandButtonBg: 'oklch(98% 0.08 100 / 14%)',
      islandButtonHoverBg: 'oklch(98% 0.08 100 / 30%)',
      mutedButtonBg: 'oklch(74% 0.05 100 / 10%)',
      mutedButtonBgHover: 'oklch(74% 0.05 100 / 28%)'
    }
  },
  {
    name: 'Sagebrush',
    colors: {
      bg: 'oklch(52% 0.03 145)',
      primary: 'oklch(90% 0.06 70)',
      secondary: 'oklch(76% 0.05 75)',
      tertiary: 'oklch(66% 0.04 70)',
      error: 'oklch(85% 0.14 55)',
      fast: 'oklch(98% 0.08 100)',
      normal: 'oklch(85% 0.14 80)',
      slow: 'oklch(85% 0.14 40)',
      islandBg: 'oklch(90% 0.06 70 / 22%)',
      islandFg: 'oklch(90% 0.06 70)',
      islandButtonBg: 'oklch(90% 0.06 70 / 14%)',
      islandButtonHoverBg: 'oklch(90% 0.06 70 / 30%)',
      mutedButtonBg: 'oklch(76% 0.05 75 / 15%)',
      mutedButtonBgHover: 'oklch(76% 0.05 75 / 28%)'
    }
  },
  {
    name: 'Stillwater',
    colors: {
      bg: 'oklch(50.1% 0.009 176)',
      tertiary: 'oklch(60% 0.0 95)',
      secondary: 'oklch(79.2% 0.005 170)',
      primary: 'oklch(90.9% 0.004 168)',
      error: 'oklch(86% 0.071 311)',
      fast: 'oklch(1 0.12 165.27)',
      normal: 'oklch(0.95 0.12 101.95)',
      slow: 'oklch(86% 0.071 311)',
      islandFg: 'oklch(99.2% 0.003 160)',
      islandBg: 'oklch(79.2% 0.005 170 / 30%)',
      islandButtonBg: 'oklch(79.2% 0.005 170 / 20%)',
      islandButtonHoverBg: 'oklch(79.2% 0.005 170 / 30%)',
      mutedButtonBg: 'oklch(79.2% 0.005 170 / 10%)',
      mutedButtonBgHover: 'oklch(79.2% 0.005 170 / 20%)'
    }
  },
  {
    name: 'Aurelia',
    colors: {
      bg: 'oklch(55% 0.06 95)',
      primary: 'oklch(93% 0.07 91.19)',
      secondary: 'oklch(80% 0.06 91.78)',
      tertiary: 'oklch(65% 0.05 95)',
      error: 'oklch(85% 0.14 55)',
      fast: 'oklch(75% 0.14 145)',
      normal: 'oklch(98% 0.08 100)',
      slow: 'oklch(85% 0.14 55)',
      islandBg: 'oklch(91.8% 0.133 98 / 20%)',
      islandFg: 'oklch(96.9% 0.069 100)',
      islandButtonBg: 'oklch(91.8% 0.133 98 / 20%)',
      islandButtonHoverBg: 'oklch(91.8% 0.133 98 / 30%)',
      mutedButtonBg: 'oklch(80% 0.06 91.78 / 10%)',
      mutedButtonBgHover: 'oklch(80% 0.06 91.78 / 25%)'
    }
  },
  {
    name: 'Cinder',
    colors: {
      bg: 'oklch(25% 0.06 55)',
      primary: 'oklch(75% 0.14 55)',
      secondary: 'oklch(50% 0.12 55)',
      tertiary: 'oklch(35% 0.08 55)',
      error: 'oklch(62% 0.22 25)',
      fast: 'oklch(75% 0.14 145)',
      normal: 'oklch(85% 0.14 55)',
      slow: 'oklch(62% 0.22 25)',
      islandBg: 'oklch(85% 0.14 55 / 15%)',
      islandFg: 'oklch(85% 0.14 55)',
      islandButtonBg: 'oklch(85% 0.14 55 / 12%)',
      islandButtonHoverBg: 'oklch(85% 0.14 55 / 20%)',
      mutedButtonBg: 'oklch(85% 0.14 55 / 5%)',
      mutedButtonBgHover: 'oklch(85% 0.14 55 / 20%)'
    }
  },
  {
    name: 'Candelabra',
    colors: {
      bg: 'oklch(35% 0.08 55)',
      primary: 'oklch(75% 0.1 75)',
      secondary: 'oklch(60% 0.12 60)',
      tertiary: 'oklch(52% 0.1 60)',
      error: 'oklch(0.7 0.25 25.79)',
      fast: 'oklch(75% 0.14 145)',
      normal: 'oklch(85% 0.14 55)',
      slow: 'oklch(62% 0.22 25)',
      islandBg: 'oklch(85% 0.1 75 / 15%)',
      islandFg: 'oklch(85% 0.1 75)',
      islandButtonBg: 'oklch(85% 0.1 75 / 12%)',
      islandButtonHoverBg: 'oklch(85% 0.1 75 / 26%)',
      mutedButtonBg: 'oklch(68% 0.12 60 / 10%)',
      mutedButtonBgHover: 'oklch(68% 0.12 60 / 30%)'
    }
  },
  {
    name: 'Aureate',
    colors: {
      bg: 'oklch(35% 0.08 65)',
      primary: 'oklch(80% 0.14 70)',
      secondary: 'oklch(60% 0.12 70)',
      tertiary: 'oklch(45% 0.1 70)',
      error: 'oklch(0.72 0.19 47.13)',
      fast: 'oklch(0.99 0.07 107.65)',
      normal: 'oklch(87% 0.18 90)',
      slow: 'oklch(0.72 0.19 47.13)',
      islandBg: 'oklch(80% 0.14 70 / 22%)',
      islandFg: 'oklch(80% 0.14 70)',
      islandButtonBg: 'oklch(80% 0.14 70 / 14%)',
      islandButtonHoverBg: 'oklch(80% 0.14 70 / 30%)',
      mutedButtonBg: 'oklch(70% 0.12 70 / 10%)',
      mutedButtonBgHover: 'oklch(70% 0.12 70 / 28%)'
    }
  },
  {
    name: 'Brimstone',
    colors: {
      bg: 'oklch(32% 0.1 55)',
      primary: 'oklch(75% 0.2 45)',
      secondary: 'oklch(55% 0.18 40)',
      tertiary: 'oklch(42% 0.12 50)',
      error: 'oklch(0.62 0.3 25.79)',
      fast: 'oklch(80% 0.16 50)',
      normal: 'oklch(70% 0.2 45)',
      slow: 'oklch(0.62 0.3 25.79)',
      islandBg: 'oklch(70% 0.2 45 / 22%)',
      islandFg: 'oklch(75% 0.2 45)',
      islandButtonBg: 'oklch(70% 0.2 45 / 14%)',
      islandButtonHoverBg: 'oklch(70% 0.2 45 / 25%)',
      mutedButtonBg: 'oklch(52% 0.18 40 / 10%)',
      mutedButtonBgHover: 'oklch(52% 0.18 40 / 28%)'
    }
  },
  {
    name: 'Mahogany',
    colors: {
      bg: 'oklch(22% 0.05 55)',
      primary: 'oklch(65% 0.16 45)',
      secondary: 'oklch(45% 0.12 55)',
      tertiary: 'oklch(35% 0.1 55)',
      error: 'oklch(0.62 0.3 25.79)',
      fast: 'oklch(80% 0.16 50)',
      normal: 'oklch(70% 0.2 45)',
      slow: 'oklch(0.62 0.3 25.79)',
      islandBg: 'oklch(52% 0.16 45 / 22%)',
      islandFg: 'oklch(70% 0.16 45)',
      islandButtonBg: 'oklch(52% 0.16 45 / 14%)',
      islandButtonHoverBg: 'oklch(52% 0.16 45 / 30%)',
      mutedButtonBg: 'oklch(42% 0.12 55 / 18%)',
      mutedButtonBgHover: 'oklch(42% 0.12 55 / 28%)'
    }
  },
  {
    name: 'Lectern',
    colors: {
      bg: 'oklch(25% 0.037 91)',
      primary: 'oklch(89.2% 0.108 91)',
      secondary: 'oklch(58.8% 0.183 91)',
      tertiary: 'oklch(40% 0.1 91)',
      error: 'oklch(0.62 0.25 25.79)',
      fast: 'oklch(75% 0.14 145)',
      normal: 'oklch(85% 0.14 55)',
      slow: 'oklch(62% 0.22 25)',
      islandBg: 'oklch(43.1% 0.14 91 / 40%)',
      islandFg: 'oklch(75% 0.183 91)',
      islandButtonBg: 'oklch(64% 0.14 71 / 20%)',
      islandButtonHoverBg: 'oklch(64% 0.14 71 / 30%)',
      mutedButtonBg: 'oklch(49.8% 0.161 91 / 10%)',
      mutedButtonBgHover: 'oklch(49.8% 0.161 91 / 30%)'
    }
  },

  {
    name: 'Arrakis',
    colors: {
      bg: 'oklch(40% 0.12 90)',
      primary: 'oklch(95% 0.12 90)',
      secondary: 'oklch(65% 0.12 90)',
      tertiary: 'oklch(50% 0.12 90)',
      error: 'oklch(85% 0.14 50)',
      fast: 'oklch(95% 0.08 100)',
      normal: 'oklch(85% 0.14 80)',
      slow: 'oklch(85% 0.14 20)',
      islandBg: 'oklch(95% 0.15 90 / 20%)',
      islandFg: 'oklch(99% 0.12 90)',
      islandButtonBg: 'oklch(95% 0.15 90 / 12%)',
      islandButtonHoverBg: 'oklch(95% 0.15 90 / 20%)',
      mutedButtonBg: 'oklch(80% 0.12 90 / 10%)',
      mutedButtonBgHover: 'oklch(80% 0.12 90 / 30%)'
    }
  },
  {
    name: 'Imperium',
    colors: {
      bg: 'oklch(38% 0.1 75)',
      primary: 'oklch(95% 0.1 90)',
      secondary: 'oklch(65% 0.15 75)',
      tertiary: 'oklch(50% 0.14 80)',
      error: 'oklch(0.72 0.19 47.13)',
      fast: 'oklch(0.99 0.07 107.65)',
      normal: 'oklch(87% 0.18 90)',
      slow: 'oklch(0.72 0.19 47.13)',
      islandBg: 'oklch(87% 0.18 90 / 15%)',
      islandFg: 'oklch(95% 0.1 90)',
      islandButtonBg: 'oklch(87% 0.18 90 / 10%)',
      islandButtonHoverBg: 'oklch(87% 0.18 90 / 20%)',
      mutedButtonBg: 'oklch(60% 0.16 85 / 10%)',
      mutedButtonBgHover: 'oklch(60% 0.16 85 / 20%)'
    }
  },
  // {
  //   name: 'Latte',
  //   colors: {
  //     bg: 'oklch(25% 0.04 91)',
  //     primary: 'oklch(88% 0.06 91)',
  //     secondary: 'oklch(65% 0.08 91)',
  //     tertiary: 'oklch(40% 0.05 91)',
  //     error: 'oklch(65% 0.2 25)',
  //     fast: 'oklch(75% 0.12 145)',
  //     normal: 'oklch(88% 0.06 91)',
  //     slow: 'oklch(65% 0.2 25)',
  //     islandBg: 'oklch(88% 0.06 91 / 18%)',
  //     islandFg: 'oklch(88% 0.06 91)',
  //     islandButtonBg: 'oklch(88% 0.06 91 / 10%)',
  //     islandButtonHoverBg: 'oklch(88% 0.06 91 / 24%)',
  //     mutedButtonBg: 'oklch(65% 0.08 91 / 12%)',
  //     mutedButtonBgHover: 'oklch(65% 0.08 91 / 22%)'
  //   }
  // },
  // {
  //   name: 'Wheat',
  //   colors: {
  //     bg: 'oklch(30% 0.04 90)',
  //     primary: 'oklch(85% 0.08 90)',
  //     secondary: 'oklch(74% 0.07 90)',
  //     tertiary: 'oklch(46% 0.05 90)',
  //     error: 'oklch(60% 0.2 25)',
  //     fast: 'oklch(78% 0.1 120)',
  //     normal: 'oklch(85% 0.08 90)',
  //     slow: 'oklch(60% 0.2 25)',
  //     islandBg: 'oklch(85% 0.08 90 / 20%)',
  //     islandFg: 'oklch(85% 0.08 90)',
  //     islandButtonBg: 'oklch(85% 0.08 90 / 12%)',
  //     islandButtonHoverBg: 'oklch(85% 0.08 90 / 26%)',
  //     mutedButtonBg: 'oklch(74% 0.07 90 / 14%)',
  //     mutedButtonBgHover: 'oklch(74% 0.07 90 / 24%)'
  //   }
  // },

  {
    name: 'Eucalyptus',
    colors: {
      bg: 'oklch(45% 0.04 135)',
      primary: 'oklch(85% 0.05 150)',
      secondary: 'oklch(72% 0.04 150)',
      tertiary: 'oklch(56% 0.04 145)',
      error: 'oklch(62% 0.2 25)',
      fast: 'oklch(78% 0.06 155)',
      normal: 'oklch(85% 0.05 150)',
      slow: 'oklch(62% 0.2 25)',
      islandBg: 'oklch(85% 0.05 150 / 18%)',
      islandFg: 'oklch(85% 0.05 150)',
      islandButtonBg: 'oklch(85% 0.05 150 / 12%)',
      islandButtonHoverBg: 'oklch(85% 0.05 150 / 24%)',
      mutedButtonBg: 'oklch(72% 0.04 150 / 18%)',
      mutedButtonBgHover: 'oklch(72% 0.04 150 / 30%)'
    }
  },
  // {
  //   name: 'Sunlight',
  //   colors: {
  //     bg: 'oklch(22% 0.04 85)',
  //     primary: 'oklch(85% 0.12 85)',
  //     secondary: 'oklch(62% 0.1 80)',
  //     tertiary: 'oklch(38% 0.06 85)',
  //     error: 'oklch(65% 0.2 25)',
  //     fast: 'oklch(75% 0.14 145)',
  //     normal: 'oklch(85% 0.12 85)',
  //     slow: 'oklch(65% 0.2 25)',
  //     islandBg: 'oklch(85% 0.12 85 / 20%)',
  //     islandFg: 'oklch(85% 0.12 85)',
  //     islandButtonBg: 'oklch(85% 0.12 85 / 12%)',
  //     islandButtonHoverBg: 'oklch(85% 0.12 85 / 26%)',
  //     mutedButtonBg: 'oklch(62% 0.1 80 / 14%)',
  //     mutedButtonBgHover: 'oklch(62% 0.1 80 / 26%)'
  //   }
  // },
  // {
  //   name: 'Sky',
  //   colors: {
  //     bg: 'oklch(42% 0.15 250)',
  //     primary: 'oklch(90% 0.22 100)',
  //     secondary: 'oklch(78% 0.1 250)',
  //     tertiary: 'oklch(52% 0.12 250)',
  //     error: 'oklch(85% 0.18 195)',
  //     fast: 'oklch(85% 0.2 175)',
  //     normal: 'oklch(100% 0 0)',
  //     slow: 'oklch(90% 0.22 105)',
  //     islandBg: 'oklch(78% 0.1 250 / 20%)',
  //     islandFg: 'oklch(78% 0.1 250)',
  //     islandButtonBg: 'oklch(78% 0.1 250 / 15%)',
  //     islandButtonHoverBg: 'oklch(78% 0.1 250 / 25%)',
  //     mutedButtonBg: 'oklch(78% 0.1 250 / 15%)',
  //     mutedButtonBgHover: 'oklch(78% 0.1 250 / 25%)'
  //   }
  // },
  {
    name: 'Fernshade',
    colors: {
      bg: 'oklch(20% 0.06 120)',
      primary: 'oklch(82% 0.14 90)',
      secondary: 'oklch(52% 0.1 120)',
      tertiary: 'oklch(32% 0.08 120)',
      error: 'oklch(65% 0.22 30)',
      fast: 'oklch(78% 0.16 160)',
      normal: 'oklch(82% 0.14 90)',
      slow: 'oklch(65% 0.22 30)',
      islandBg: 'oklch(82% 0.14 90 / 25%)',
      islandFg: 'oklch(82% 0.14 90)',
      islandButtonBg: 'oklch(82% 0.14 90 / 15%)',
      islandButtonHoverBg: 'oklch(82% 0.14 90 / 35%)',
      mutedButtonBg: 'oklch(82% 0.14 90 / 15%)',
      mutedButtonBgHover: 'oklch(82% 0.14 90 / 25%)'
    }
  },
  // {
  //   name: 'Terracotta',
  //   colors: {
  //     bg: 'oklch(24% 0.08 35)',
  //     primary: 'oklch(85% 0.16 35)',
  //     secondary: 'oklch(55% 0.14 35)',
  //     tertiary: 'oklch(36% 0.1 35)',
  //     error: 'oklch(60% 0.24 15)',
  //     fast: 'oklch(80% 0.18 140)',
  //     normal: 'oklch(85% 0.16 35)',
  //     slow: 'oklch(60% 0.24 15)',
  //     islandBg: 'oklch(85% 0.16 35 / 25%)',
  //     islandFg: 'oklch(85% 0.16 35)',
  //     islandButtonBg: 'oklch(85% 0.16 35 / 15%)',
  //     islandButtonHoverBg: 'oklch(85% 0.16 35 / 35%)',
  //     mutedButtonBg: 'oklch(85% 0.16 35 / 15%)',
  //     mutedButtonBgHover: 'oklch(85% 0.16 35 / 25%)'
  //   }
  // },
  // {
  //   name: 'Fern',
  //   colors: {
  //     bg: 'oklch(22% 0.06 120)',
  //     primary: 'oklch(85% 0.1 120)',
  //     secondary: 'oklch(62% 0.1 120)',
  //     tertiary: 'oklch(38% 0.08 120)',
  //     error: 'oklch(65% 0.2 25)',
  //     fast: 'oklch(78% 0.12 145)',
  //     normal: 'oklch(85% 0.1 120)',
  //     slow: 'oklch(65% 0.2 25)',
  //     islandBg: 'oklch(85% 0.1 120 / 20%)',
  //     islandFg: 'oklch(85% 0.1 120)',
  //     islandButtonBg: 'oklch(85% 0.1 120 / 12%)',
  //     islandButtonHoverBg: 'oklch(85% 0.1 120 / 26%)',
  //     mutedButtonBg: 'oklch(62% 0.1 120 / 14%)',
  //     mutedButtonBgHover: 'oklch(62% 0.1 120 / 26%)'
  //   }
  // },

  {
    name: 'Meadowlight',
    colors: {
      bg: 'oklch(40% 0.06 115)',
      primary: 'oklch(95% 0.14 115)',
      secondary: 'oklch(84% 0.1 115)',
      tertiary: 'oklch(70% 0.09 115)',
      error: 'oklch(65% 0.2 25)',
      fast: 'oklch(88% 0.12 130)',
      normal: 'oklch(95% 0.14 115)',
      slow: 'oklch(65% 0.2 25)',
      islandBg: 'oklch(95% 0.14 115 / 22%)',
      islandFg: 'oklch(95% 0.14 115)',
      islandButtonBg: 'oklch(95% 0.14 115 / 14%)',
      islandButtonHoverBg: 'oklch(95% 0.14 115 / 30%)',
      mutedButtonBg: 'oklch(84% 0.1 115 / 16%)',
      mutedButtonBgHover: 'oklch(84% 0.1 115 / 26%)'
    }
  },
  // {
  //   name: 'Olive',
  //   colors: {
  //     bg: 'oklch(30% 0.05 110)',
  //     primary: 'oklch(86% 0.1 110)',
  //     secondary: 'oklch(78% 0.07 110)',
  //     tertiary: 'oklch(46% 0.08 110)',
  //     error: 'oklch(62% 0.2 25)',
  //     fast: 'oklch(80% 0.1 130)',
  //     normal: 'oklch(86% 0.1 110)',
  //     slow: 'oklch(62% 0.2 25)',
  //     islandBg: 'oklch(86% 0.1 110 / 20%)',
  //     islandFg: 'oklch(86% 0.1 110)',
  //     islandButtonBg: 'oklch(86% 0.1 110 / 12%)',
  //     islandButtonHoverBg: 'oklch(86% 0.1 110 / 26%)',
  //     mutedButtonBg: 'oklch(78% 0.07 110 / 14%)',
  //     mutedButtonBgHover: 'oklch(78% 0.07 110 / 24%)'
  //   }
  // },
  {
    name: 'Harvest',
    colors: {
      bg: 'oklch(46% 0.08 110)',
      primary: 'oklch(75% 0.12 80)',
      secondary: 'oklch(62% 0.12 95)',
      tertiary: 'oklch(52% 0.14 130)',
      error: 'oklch(60% 0.2 25)',
      fast: 'oklch(70% 0.14 130)',
      normal: 'oklch(75% 0.12 80)',
      slow: 'oklch(60% 0.2 25)',
      islandBg: 'oklch(75% 0.12 80 / 22%)',
      islandFg: 'oklch(75% 0.12 80)',
      islandButtonBg: 'oklch(75% 0.12 80 / 14%)',
      islandButtonHoverBg: 'oklch(75% 0.12 80 / 28%)',
      mutedButtonBg: 'oklch(62% 0.12 95 / 16%)',
      mutedButtonBgHover: 'oklch(62% 0.12 95 / 26%)'
    }
  }
  // {
  //   name: 'Flame',
  //   colors: {
  //     bg: 'oklch(52% 0.18 40)',
  //     primary: 'oklch(80% 0.1 50)',
  //     secondary: 'oklch(74% 0.16 55)',
  //     tertiary: 'oklch(68% 0.2 35)',
  //     error: 'oklch(75% 0.18 20)',
  //     fast: 'oklch(88% 0.08 55)',
  //     normal: 'oklch(80% 0.1 50)',
  //     slow: 'oklch(75% 0.18 20)',
  //     islandBg: 'oklch(80% 0.1 50 / 24%)',
  //     islandFg: 'oklch(80% 0.1 50)',
  //     islandButtonBg: 'oklch(80% 0.1 50 / 15%)',
  //     islandButtonHoverBg: 'oklch(80% 0.1 50 / 32%)',
  //     mutedButtonBg: 'oklch(74% 0.16 55 / 20%)',
  //     mutedButtonBgHover: 'oklch(74% 0.16 55 / 32%)'
  //   }
  // }
  // {
  //   name: 'Sunrise',
  //   colors: {
  //     bg: 'oklch(72% 0.2 55)',
  //     primary: 'oklch(95% 0.2 100)',
  //     secondary: 'oklch(92% 0.14 95)',
  //     tertiary: 'oklch(76% 0.18 65)',
  //     error: 'oklch(78% 0.18 25)',
  //     fast: 'oklch(98% 0.14 100)',
  //     normal: 'oklch(95% 0.2 100)',
  //     slow: 'oklch(78% 0.18 25)',
  //     islandBg: 'oklch(95% 0.2 100 / 28%)',
  //     islandFg: 'oklch(95% 0.2 100)',
  //     islandButtonBg: 'oklch(95% 0.2 100 / 18%)',
  //     islandButtonHoverBg: 'oklch(95% 0.2 100 / 36%)',
  //     mutedButtonBg: 'oklch(92% 0.14 95 / 24%)',
  //     mutedButtonBgHover: 'oklch(92% 0.14 95 / 36%)'
  //   }
  // },
]

export const DEFAULT_THEME_INDEX = 0

/**
 * CSS variable names mapped to ThemeColors keys
 */
export const CSS_VAR_MAP: Record<keyof ThemeColors, string> = {
  bg: '--bg',
  primary: '--primary',
  secondary: '--secondary',
  tertiary: '--tertiary',
  error: '--error',
  fast: '--fast',
  normal: '--normal',
  slow: '--slow',
  islandBg: '--island-bg',
  islandFg: '--island-fg',
  islandButtonBg: '--island-button-bg',
  islandButtonHoverBg: '--island-button-hover-bg',
  mutedButtonBg: '--muted-button-bg',
  mutedButtonBgHover: '--muted-button-bg-hover'
}

/**
 * Apply theme colors to an element's style
 */
export function applyThemeToElement(element: HTMLElement, colors: ThemeColors): void {
  for (const [key, cssVar] of Object.entries(CSS_VAR_MAP)) {
    element.style.setProperty(cssVar, colors[key as keyof ThemeColors])
  }
}

/**
 * Generate inline script for SSR theme initialization
 */
export function generateThemeScript(): string {
  const colorsOnly = themes.map(t => t.colors)
  return `(function(){
  var themes=${JSON.stringify(colorsOnly)};
  var DEFAULT=${DEFAULT_THEME_INDEX};
  var stored=localStorage.getItem('theme');
  var idx=stored?parseInt(stored,10):DEFAULT;
  if(isNaN(idx)||idx<0||idx>=${themes.length})idx=DEFAULT;
  var c=themes[idx];
  var r=document.documentElement;
  r.style.setProperty('--bg',c.bg);
  r.style.setProperty('--primary',c.primary);
  r.style.setProperty('--secondary',c.secondary);
  r.style.setProperty('--tertiary',c.tertiary);
  r.style.setProperty('--error',c.error);
  r.style.setProperty('--fast',c.fast);
  r.style.setProperty('--normal',c.normal);
  r.style.setProperty('--slow',c.slow);
  r.style.setProperty('--island-bg',c.islandBg);
  r.style.setProperty('--island-fg',c.islandFg);
  r.style.setProperty('--island-button-bg',c.islandButtonBg);
  r.style.setProperty('--island-button-hover-bg',c.islandButtonHoverBg);
  r.style.setProperty('--muted-button-bg',c.mutedButtonBg);
  r.style.setProperty('--muted-button-bg-hover',c.mutedButtonBgHover);
  var meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.setAttribute('content',c.bg);
})();`
}
