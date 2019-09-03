import { createContext } from 'react';
import { Dimensions } from 'react-native';

export default createContext(Dimensions.get('window'));
