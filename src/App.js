import React, { useState } from 'react';
import { ArrowUp, RotateCcw, RotateCw } from 'lucide-react';
import './App.css';

const directions = ['N', 'E', 'S', 'W'];

const Robot = ({ direction }) => (
    <div className="w-full h-full bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
        {direction}
    </div>
);

const Cell = ({ children }) => (
    <div className="border border-gray-300 flex items-center justify-center">
        {children}
    </div>
);

const Grid = ({ robotPosition, robotDirection }) => (
    <div className="w-64 h-64 grid grid-cols-5 grid-rows-5 bg-white rounded-lg shadow-md">
        {[...Array(25)].map((_, i) => {
            const x = i % 5;
            const y = Math.floor(i / 5);
            return (
                <Cell key={i}>
                    {x === robotPosition.x && y === robotPosition.y && (
                        <Robot direction={directions[robotDirection]} />
                    )}
                </Cell>
            );
        })}
    </div>
);

const Button = ({ onClick, children, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`p-2 rounded-full ${
            disabled ? 'bg-gray-300 text-gray-500' : 'bg-orange-500 text-white hover:bg-orange-600'
        } transition-colors duration-200 ease-in-out`}
    >
        {children}
    </button>
);

function RobotControlApp() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [direction, setDirection] = useState(0); // 0: N, 1: E, 2: S, 3: W

    const moveForward = () => {
        setPosition(prev => {
            const newPos = { ...prev };
            // eslint-disable-next-line default-case
            switch (directions[direction]) {
                case 'N': newPos.y = Math.max(0, prev.y - 1); break;
                case 'E': newPos.x = Math.min(4, prev.x + 1); break;
                case 'S': newPos.y = Math.min(4, prev.y + 1); break;
                case 'W': newPos.x = Math.max(0, prev.x - 1); break;
            }
            return newPos;
        });
    };

    const rotate = (clockwise) => {
        setDirection(prev => (prev + (clockwise ? 1 : 3)) % 4);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Robot Control</h1>
            <div className="flex justify-center mb-8">
                <Grid robotPosition={position} robotDirection={direction} />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div></div>
                <Button onClick={moveForward} disabled={
                    (direction === 0 && position.y === 0) ||
                    (direction === 1 && position.x === 4) ||
                    (direction === 2 && position.y === 4) ||
                    (direction === 3 && position.x === 0)
                }>
                    <ArrowUp />
                </Button>
                <div></div>
                <Button onClick={() => rotate(false)}><RotateCcw /></Button>
                <div></div>
                <Button onClick={() => rotate(true)}><RotateCw /></Button>
            </div>
            <div className="mt-8 text-center text-gray-600">
                Position: ({position.x}, {position.y}) | Facing: {directions[direction]}
            </div>
        </div>
    );
}

function App() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <RobotControlApp />
        </div>
    );
}

export default App;