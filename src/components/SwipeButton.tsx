import React, { useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

// Define the props interface for SwipeButton component
interface SwipeButtonProps {
  onSwipeComplete: () => void; // Callback function to handle swipe completion
}

// SwipeButton component definition
const SwipeButton: React.FC<SwipeButtonProps> = ({ onSwipeComplete }) => {
  // Ref to access the container div
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for animation
  const [{ x }, set] = useSpring(() => ({ x: 0 }));

  // Drag hook to handle swipe gesture
  const bind = useDrag(({ down, movement: [mx], memo = x.get() }) => {
    // Get container width
    const containerWidth = containerRef.current?.offsetWidth || 0;
    // Check if swipe distance exceeds threshold
    const trigger = mx > containerWidth * 0.5;

    // Call onSwipeComplete callback if swipe is released and threshold is met
    if (!down && trigger) {
      onSwipeComplete();
    }

    // Update animation state based on swipe movement
    set({
      x: down ? Math.max(0, Math.min(mx + memo, containerWidth - 60)) : 0, // 60 is the button width
      immediate: down,
    });

    return memo;
  });

  // JSX rendering
  return (
    <div ref={containerRef} style={styles.container}>
      {/* Animated div representing the swipeable button */}
      <animated.div
        {...bind()}
        style={{
          ...styles.swipeable,
          transform: x.to(x => `translateX(${x}px)`), // Apply animation transform
        }}
      />
      {/* Container for button text */}
      <div style={styles.buttonTextContainer}>
        {/* Text indicating swipe action */}
        <span style={styles.buttonText}>Swipe to Fetch</span>
      </div>
    </div>
  );
};

// CSS styles for the SwipeButton component
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'relative',
    width: '250px',
    height: '60px',
    borderRadius: '30px',
    backgroundColor: '#1b9aaa',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
  },
  swipeable: {
    position: 'absolute',
    width: '60px',
    height: '60px',
    borderRadius: '30px',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  buttonTextContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    zIndex: 1,
    pointerEvents: 'none', // Prevents the text from interfering with the swipe gesture
  },
};

// Export the SwipeButton component
export default SwipeButton;
