import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, ChevronUp, ChevronDown, Type, Save, Upload } from 'lucide-react';

function Teleprompter() {
  const [text, setText] = useState("Enter your script here...\n\nThis is a simple teleprompter app for recording videos. You can adjust the scroll speed, font size, and play/pause the scrolling.\n\nWhen you're ready to start, click the play button below.");
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(2);
  const [fontSize, setFontSize] = useState(32);
  const prompterRef = useRef(null);
  const textAreaRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  // Handle scrolling
  useEffect(() => {
    if (isScrolling) {
      scrollIntervalRef.current = setInterval(() => {
        if (prompterRef.current) {
          prompterRef.current.scrollTop += scrollSpeed;
        }
      }, 50);
    } else {
      clearInterval(scrollIntervalRef.current);
    }

    return () => clearInterval(scrollIntervalRef.current);
  }, [isScrolling, scrollSpeed]);

  // Toggle scrolling
  const toggleScrolling = () => {
    setIsScrolling(!isScrolling);
  };

  // Adjust scroll speed
  const changeScrollSpeed = (amount) => {
    setScrollSpeed(prev => Math.max(1, prev + amount));
  };

  // Adjust font size
  const changeFontSize = (amount) => {
    setFontSize(prev => Math.max(16, Math.min(72, prev + amount)));
  };

  // Reset scroll position
  const resetScroll = () => {
    if (prompterRef.current) {
      prompterRef.current.scrollTop = 0;
      setIsScrolling(false);
    }
  };

  // Save text to a file
  const saveScript = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'teleprompter-script.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Load text from a file
  const loadScript = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setText(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Web Teleprompter</h1>
        <div className="flex items-center space-x-2">
          <button 
            onClick={saveScript} 
            className="flex items-center bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm"
            title="Save script"
          >
            <Save size={16} className="mr-1" /> Save
          </button>
          <label className="flex items-center bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm cursor-pointer">
            <Upload size={16} className="mr-1" /> Load
            <input 
              type="file" 
              accept=".txt" 
              onChange={loadScript} 
              className="hidden" 
            />
          </label>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-col md:flex-row gap-4 flex-grow">
        {/* Editor section */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h2 className="text-xl mb-2">Edit Script</h2>
          <textarea
            ref={textAreaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-grow bg-gray-800 text-white p-4 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your script here..."
          />
        </div>

        {/* Teleprompter section */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h2 className="text-xl mb-2">Teleprompter Preview</h2>
          <div 
            ref={prompterRef}
            className="flex-grow bg-black p-4 rounded overflow-y-auto"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="text-center" style={{ fontSize: `${fontSize}px` }}>
              {text.split('\n').map((line, index) => (
                <p key={index} className="my-4">
                  {line || <br />}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex flex-wrap justify-center items-center gap-4">
          {/* Play/Pause control */}
          <div className="flex items-center">
            <button
              onClick={toggleScrolling}
              className="bg-green-600 hover:bg-green-700 p-3 rounded-full"
              title={isScrolling ? "Pause" : "Play"}
            >
              {isScrolling ? <Pause size={24} /> : <Play size={24} />}
            </button>
          </div>

          {/* Scroll speed control */}
          <div className="flex items-center bg-gray-800 p-2 rounded">
            <span className="mr-2">Speed:</span>
            <button
              onClick={() => changeScrollSpeed(-0.5)}
              className="p-1 hover:bg-gray-700 rounded"
              title="Decrease speed"
            >
              <ChevronDown size={18} />
            </button>
            <span className="mx-2">{scrollSpeed.toFixed(1)}</span>
            <button
              onClick={() => changeScrollSpeed(0.5)}
              className="p-1 hover:bg-gray-700 rounded"
              title="Increase speed"
            >
              <ChevronUp size={18} />
            </button>
          </div>

          {/* Font size control */}
          <div className="flex items-center bg-gray-800 p-2 rounded">
            <Type size={18} className="mr-2" />
            <button
              onClick={() => changeFontSize(-2)}
              className="p-1 hover:bg-gray-700 rounded"
              title="Decrease font size"
            >
              <ChevronDown size={18} />
            </button>
            <span className="mx-2">{fontSize}px</span>
            <button
              onClick={() => changeFontSize(2)}
              className="p-1 hover:bg-gray-700 rounded"
              title="Increase font size"
            >
              <ChevronUp size={18} />
            </button>
          </div>

          {/* Reset button */}
          <button
            onClick={resetScroll}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            title="Reset scroll position"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Teleprompter;
