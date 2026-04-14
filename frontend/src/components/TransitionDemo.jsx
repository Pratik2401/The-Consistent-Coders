import { useState } from 'react';
import './TransitionDemo.css';
export const TransitionDemo = () => {
    const [isVisible, setIsVisible] = useState(false);
    return (<div className="transition-demo">
      <button className="demo-button" onClick={() => setIsVisible(!isVisible)}>
        Preview Transition Effect
      </button>
      
      {isVisible && (<div className="demo-info">
          <h3>🎨 Beautiful Page Transitions Active!</h3>
          <p>Click any navigation link to see the colorful curtain effect in action.</p>
          <ul>
            <li>✨ Smooth GSAP animations</li>
            <li>🌈 Colorful gradient panels</li>
            <li>⚡ GPU-accelerated performance</li>
            <li>🎯 Seamless React Router integration</li>
          </ul>
        </div>)}
    </div>);
};
