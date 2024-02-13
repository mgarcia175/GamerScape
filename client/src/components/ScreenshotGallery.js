import React, { useState } from 'react';

function ScreenshotGallery({ screenshotUrls }) {
    const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);

    const nextScreenshot = () => {
        setCurrentScreenshotIndex(prevIndex => (prevIndex === screenshotUrls.length - 1 ? 0 : prevIndex + 1));
    };

    const prevScreenshot = () => {
        setCurrentScreenshotIndex(prevIndex => (prevIndex === 0 ? screenshotUrls.length - 1 : prevIndex - 1));
    };

    return (
        <div className='screenshot-gallery'>
            <h3>Screenshots</h3>
            <div className='gallery'>
                <div className='gallery-inner'>
                    <div className='screenshot-container'>
                        <img className="screenshot" src={screenshotUrls[currentScreenshotIndex]} alt={`Screenshot ${currentScreenshotIndex}`} />
                    </div>
                </div>
                <div className='nav-buttons'>
                    <button onClick={prevScreenshot}>Prev</button>
                    <button onClick={nextScreenshot}>Next</button>
                </div>
            </div>
        </div>
    );
}

export default ScreenshotGallery;