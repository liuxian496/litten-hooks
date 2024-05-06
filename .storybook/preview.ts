import type { Preview } from "@storybook/react";

import "litten/dist/assets/button.css";
import "litten/dist/assets/formLabel.css";
import "litten/dist/assets/stackpanel.css";
import "litten/dist/assets/checkbox.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
