import React, { useState } from 'react'

function Random() {

    const [grid, setGrid] = useState(
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]
    )

    const getRandomNumber = (n) => Math.floor(Math.random() * n)
    
    const resetGrid = () => {
        let newGrid = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]

        newGrid[getRandomNumber(3)][getRandomNumber(3)] = 2
        newGrid[getRandomNumber(3)][getRandomNumber(3)] = 2

        setGrid(newGrid)
    }
    return (
        <div>
            {grid}
            <br />

            <button onClick={resetGrid}>Reset</button>
        </div>
    )
}

export default Random
