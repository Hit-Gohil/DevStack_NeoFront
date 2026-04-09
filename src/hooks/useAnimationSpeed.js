import { useSelector } from 'react-redux';

export const useAnimationSpeed = () => {
  const speed = useSelector((state) => state.theme.animationSpeed);
  
  const scaleDuration = (baseDuration) => baseDuration * speed;
  
  const scaleDelay = (baseDelay) => baseDelay * speed;
  
  return { speed, scaleDuration, scaleDelay };
};

export default useAnimationSpeed;
