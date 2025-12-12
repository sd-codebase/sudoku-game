/**
 * Modern Minimalist Design System
 * Comprehensive design tokens for the Sudoku app revamp
 */

import { Platform, TextStyle, ViewStyle } from 'react-native';

const tintColorLight = '#3B82F6';
const tintColorDark = '#60A5FA';

// Legacy Colors (kept for backward compatibility)
export const Colors = {
  light: {
    text: '#1A1A1A',
    background: '#F8F9FA',
    tint: tintColorLight,
    icon: '#6B7280',
    tabIconDefault: '#6B7280',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#E5E7EB',
    background: '#0F1419',
    tint: tintColorDark,
    icon: '#9CA3AF',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: tintColorDark,
  },
};

// Modern Minimalist Color Palette
export const MinimalistColors = {
  light: {
    // Backgrounds
    background: '#FFFFFF',
    backgroundSecondary: '#F8F9FA',
    backgroundTertiary: '#F1F3F5',

    // Surfaces (cards, modals)
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',

    // Text
    textPrimary: '#1A1A1A',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    textDisabled: '#D1D5DB',

    // Accents & Interactive
    accent: '#3B82F6',
    accentHover: '#2563EB',
    accentLight: '#DBEAFE',
    accentDark: '#1E40AF',

    // Semantic Colors
    success: '#10B981',
    successLight: '#D1FAE5',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    info: '#3B82F6',
    infoLight: '#DBEAFE',

    // Grid & Game Elements
    gridBackground: '#F8F9FA',
    gridBorder: '#E5E7EB',
    gridBorderThick: '#9CA3AF',
    cellRevealed: '#F8F9FA',
    cellEmpty: '#FFFFFF',
    cellSelected: '#DBEAFE',
    cellSelectedBorder: '#3B82F6',
    cellHighlighted: '#F3F4F6',
    cellError: '#FEE2E2',
    cellErrorBorder: '#EF4444',
    cellNote: '#F9FAFB',

    // Borders
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
    borderDark: '#9CA3AF',

    // Difficulty Colors
    difficultyEasy: '#10B981',
    difficultyMedium: '#F59E0B',
    difficultyHard: '#EF4444',
  },
  dark: {
    // Backgrounds
    background: '#0F1419',
    backgroundSecondary: '#1A1F26',
    backgroundTertiary: '#252B33',

    // Surfaces
    surface: '#1A1F26',
    surfaceElevated: '#252B33',

    // Text
    textPrimary: '#E5E7EB',
    textSecondary: '#9CA3AF',
    textTertiary: '#6B7280',
    textDisabled: '#4B5563',

    // Accents & Interactive
    accent: '#60A5FA',
    accentHover: '#93C5FD',
    accentLight: '#1E3A8A',
    accentDark: '#3B82F6',

    // Semantic Colors
    success: '#34D399',
    successLight: '#065F46',
    error: '#F87171',
    errorLight: '#7F1D1D',
    warning: '#FBBF24',
    warningLight: '#78350F',
    info: '#60A5FA',
    infoLight: '#1E3A8A',

    // Grid & Game Elements
    gridBackground: '#1A1F26',
    gridBorder: '#374151',
    gridBorderThick: '#6B7280',
    cellRevealed: '#252B33',
    cellEmpty: '#1A1F26',
    cellSelected: '#1E3A8A',
    cellSelectedBorder: '#60A5FA',
    cellHighlighted: '#252B33',
    cellError: '#7F1D1D',
    cellErrorBorder: '#F87171',
    cellNote: '#1F2937',

    // Borders
    border: '#374151',
    borderLight: '#252B33',
    borderDark: '#6B7280',

    // Difficulty Colors
    difficultyEasy: '#34D399',
    difficultyMedium: '#FBBF24',
    difficultyHard: '#F87171',
  },
};

// Typography Scale
export const Typography: Record<string, TextStyle> = {
  // Headings
  h1: {
    fontSize: 32,
    fontWeight: '700' as TextStyle['fontWeight'],
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 32,
    letterSpacing: -0.25,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 28,
    letterSpacing: 0,
  },
  h4: {
    fontSize: 16,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 24,
    letterSpacing: 0,
  },

  // Body
  bodyLarge: {
    fontSize: 18,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 28,
    letterSpacing: 0,
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 24,
    letterSpacing: 0,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 20,
    letterSpacing: 0,
  },

  // Special
  button: {
    fontSize: 16,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 24,
    letterSpacing: 0.25,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as TextStyle['fontWeight'],
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  cellNumber: {
    fontSize: 20,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 28,
    letterSpacing: 0,
  },
  cellNote: {
    fontSize: 10,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 12,
    letterSpacing: 0,
  },
};

// Spacing Scale (8px base)
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Border Radius Scale
export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

// Responsive Breakpoints
export const Breakpoints = {
  small: 375,   // iPhone SE, small phones
  medium: 414,  // iPhone Pro Max, large phones
  tablet: 768,  // iPad Mini
  large: 1024,  // iPad Pro
};

// Helper function to get device size category
export function getDeviceSize(width: number): 'small' | 'medium' | 'tablet' | 'large' {
  if (width < Breakpoints.medium) return 'small';
  if (width < Breakpoints.tablet) return 'medium';
  if (width < Breakpoints.large) return 'tablet';
  return 'large';
}

// Responsive spacing scale
export const ResponsiveSpacing = {
  small: {
    gridSize: 280,
    fontSize: 0.9,
    padding: Spacing.xs,
  },
  medium: {
    gridSize: 320,
    fontSize: 1,
    padding: Spacing.sm,
  },
  tablet: {
    gridSize: 380,
    fontSize: 1.1,
    padding: Spacing.md,
  },
  large: {
    gridSize: 420,
    fontSize: 1.2,
    padding: Spacing.lg,
  },
};

// Shadow & Elevation System
export const Shadows: Record<string, ViewStyle> = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 12,
  },
};

// Animation Configuration
export const Animations = {
  timing: {
    fast: 150,
    normal: 250,
    slow: 350,
  },

  spring: {
    gentle: { friction: 8, tension: 40 },
    bouncy: { friction: 4, tension: 40 },
    stiff: { friction: 12, tension: 100 },
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
