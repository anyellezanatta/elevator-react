// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      dark: string;
      light: string;
      white: string;
    };

    fontsSizes: {
      fs400: string;
    };

    fontFamilies: {
      serif: string;
    };
  }
}
