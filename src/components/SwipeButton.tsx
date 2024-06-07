import React, { useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

interface SwipeButtonProps {
  onSwipeComplete: () => void;
}

const SwipeButton: React.FC<SwipeButtonProps> = ({ onSwipeComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [{ x }, set] = useSpring(() => ({ x: 0 }));

  const bind = useDrag(({ down, movement: [mx], memo = x.get() }) => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const trigger = mx > containerWidth * 0.5; // Only check swipe distance

    if (!down && trigger) {
      onSwipeComplete();
    }

    set({
      x: down ? Math.max(0, Math.min(mx + memo, containerWidth - 60)) : 0, // 60 is the button width
      immediate: down,
    });

    return memo;
  });

  return (
    <div ref={containerRef} style={styles.container}>
      <animated.div
        {...bind()}
        style={{
          ...styles.swipeable,
          transform: x.to(x => `translateX(${x}px)`),
        }}
      />
      <div style={styles.buttonTextContainer}>
        <span style={styles.buttonText}>Swipe to Fetch</span>
      </div>
    </div>
  );
};

const styles : { [key: string]: React.CSSProperties }  = {
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

export default SwipeButton;
