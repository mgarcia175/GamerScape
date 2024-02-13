import React, { useState, useEffect } from 'react';

function ScreenshotGallery({ screenshotUrls }) {
    const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);

    const nextScreenshot = () => {
        setCurrentScreenshotIndex((prevIndex) => (prevIndex === screenshotUrls.length - 1 ? 0 : prevIndex + 1));
    };
    
    const prevScreenshot = () => {
        setCurrentScreenshotIndex((prevIndex) => (prevIndex === 0 ? screenshotUrls.length - 1 : prevIndex - 1));
    };

    useEffect(() => {
        const intervalId = setInterval(nextScreenshot, 3000);
        console.log('currentScreenshotIndex:', currentScreenshotIndex, 'screenshotUrls:', screenshotUrls);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='screenshot-gallery'>
            <h3>Screenshots</h3>
            <div className='gallery'>
                <div className='gallery-inner' style={{ width: `${screenshotUrls.length * 100}%`, transform: `translateX(-${currentScreenshotIndex * (100 / screenshotUrls.length)}%)` }}>
                    {screenshotUrls.map((url, index) => (
                        <div key={index} className={`screenshot-container ${index === currentScreenshotIndex ? 'active' : ''}`}>
                            <img className="screenshot" src={url} alt={`Screenshot ${index}`} />
                        </div>
                    ))}
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
