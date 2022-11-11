import { Platform } from 'react-native';

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      textWhite: '#FFF',
      primary: '#0366d6',
      appBar: '#000',
      separator: '#E8E8E8',
      error: '#d73a4a'
    },
    fonts: {
      main: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'System',
      }),
    },
    fontSizes: {
      body: 14,
      subheading: 16,
      heading: 22
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
  };
  
  export default theme;