import type { AddonOptionsVite } from "@storybook/addon-coverage";
import type { StorybookConfig } from "@storybook/react-vite";

const coverageConfig: AddonOptionsVite = {
    istanbul: {
        include: ["**"],
        exclude: ["**/src/test/**"],
    },
};

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@chromatic-com/storybook",
        "@storybook/addon-interactions",
        {   
            name: "@storybook/addon-coverage",
            options: {
                ...coverageConfig,
            },
        },
    ],
    framework: {
        name: "@storybook/react-vite",
        options: {},
      },
    docs: {
        autodocs: "tag",
    },
    staticDirs: ["../public"],
};
export default config;
