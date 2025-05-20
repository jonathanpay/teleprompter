# Web Teleprompter

A simple, browser-based teleprompter application for video recording. This lightweight React application allows you to create, edit, and scroll through scripts at an adjustable pace.

![Web Teleprompter Screenshot](screenshot.png)

## Features

- **Script Editor**: Edit your script in real-time
- **Adjustable Scroll Speed**: Fine-tune the scrolling to match your speaking pace
- **Font Size Control**: Adjust text size for optimal visibility
- **Play/Pause Controls**: Start and stop scrolling with a single click
- **Save/Load Scripts**: Export and import scripts as text files
- **Responsive Design**: Works on desktop and tablet devices

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/web-teleprompter.git
   cd web-teleprompter
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter your script in the editor panel on the left
2. Adjust the font size to your preference using the controls at the bottom
3. Click the play button to start the autoscroll
4. Adjust the scroll speed as needed
5. Click pause when you need to stop
6. Use the save button to export your script as a text file

## Building for Production

To create a production build:

```
npm run build
```

This will generate a `build` folder with the optimised production build.

## Technologies Used

- React (Create React App)
- Tailwind CSS
- Lucide React (for icons)

## Customisation

You can customise the appearance by editing the CSS in the `App.css` file or by modifying the Tailwind classes in the component.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
