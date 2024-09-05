import { createMedia } from '@artsy/fresnel';

const ExampleAppMedia = createMedia({
  // https://tailwindcss.com/docs/screens
  breakpoints: {
    sm: 0,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
});

// Generate CSS to be injected into the head
export const mediaStyle = ExampleAppMedia.createMediaStyle();

export const { Media, MediaContextProvider } = ExampleAppMedia;
