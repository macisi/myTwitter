import * as styledCompoennts from 'styled-components/native';
import { Theme } from 'styled-components';

const {
  default: styled,
  css,
  ThemeProvider,
} = styledCompoennts as styledCompoennts.ReactNativeThemedStyledComponentsModule<
  Theme
>;

export { css, ThemeProvider };
export default styled;
