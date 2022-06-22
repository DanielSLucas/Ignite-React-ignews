import { useEffect, useState } from "react";

const AsyncExample: React.FC = () => {
  const [isButton1Visible, setIsButton1Visible] = useState(false);
  const [isButton2Invisible, setIsButton2Invisible] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setIsButton1Visible(true)  
    }, 1000)
  }, [])

  useEffect(() => {
    setTimeout(() => {      
      setIsButton2Invisible(true)
    }, 2000)
  }, [])
  
  return (
    <div>
      <div>Hello world</div>
      {isButton1Visible && <button>Button 1</button>}
      {!isButton2Invisible && <button>Button 2</button>}
    </div>
  );
}

export default AsyncExample;