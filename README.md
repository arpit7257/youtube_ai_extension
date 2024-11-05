Here’s the updated README file reflecting the use of `pnpm` in your project:

```markdown
# YouTube Extension

## Overview

**YouTube Extension** is a Chrome extension designed to enhance your YouTube viewing experience by providing useful functionalities such as video summaries, transcripts, and a chat feature for asking questions related to the video content.

## Features

- **Video Summary**: Get concise summaries of YouTube videos to quickly understand the main points.
- **Transcript Display**: View the complete transcript of the video, making it easier to follow along or reference specific parts.
- **Chat Section**: Ask questions related to the video content and receive instant responses.

## Technologies Used

- **Plasmo Framework**: A framework for building Chrome extensions.
- **TypeScript**: Used for static typing to enhance code quality.
- **Gemini API**: Utilized for making API calls to fetch summaries and answer questions.

## Installation

To get started with the YouTube Extension, follow these steps:

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/youtube-extension.git
   ```

2. Navigate to the project directory:
   ```bash
   cd youtube-extension
   ```

3. Install the dependencies using `pnpm`:
   ```bash
   pnpm install
   ```

## Scripts

- `pnpm run dev`: Start the development server.
- `pnpm run build`: Build the extension for production.
- `pnpm run package`: Package the extension for distribution.

## Manifest

The extension uses the following permissions in its manifest:

```json
{
  "host_permissions": [
    "https://*/*"
  ],
  "permissions": [
    "tabs"
  ]
}
```

**Note**: This extension only works for videos that have transcripts available.

## Author

- **Arpit Karn** - [GitHub profile](https://github.com/arpit7257)


## Acknowledgments

- Thank you to the Plasmo framework and its contributors for providing a robust tool for building Chrome extensions.
- Special thanks to the creators of the Gemini API for their powerful features that enhance our extension's capabilities.
```


