import styled from 'styled-components'
import Number from './components/Number';
import { useState,useEffect } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
function App() {
  const {width,height}=useWindowSize();
  const [nums,setNums]=useState(Array.from({ length: 10 }, () => ({ value: Math.floor(Math.random() * 6) + 1, isFrozen: false })))
  const [hasWon,setHasWon]=useState(false)
  const handleRoll=()=> {
    if(hasWon){
      setHasWon(false)
      setNums(Array.from({ length: 10 }, () => ({ value: Math.floor(Math.random() * 6) + 1, isFrozen: false })))
    }
    setNums((prevNums) =>
      prevNums.map((num) => (num.isFrozen ? num : { ...num, value: Math.floor(Math.random() * 6) + 1 }))
    );
  };
  const checkWin = () => {
    // Check if all numbers are frozen
    if (nums.every((num) => num.isFrozen)) {
      // Check if all numbers are the same
      if (new Set(nums.map((num) => num.value)).size === 1) {
        setHasWon(true); // Set hasWon to true if all numbers are the same and frozen
      }
    }
  };

  useEffect(()=>{
    checkWin()
  },[nums])
  const toggleFreeze = (index) => {
    console.log(index)
    setNums((prevNums) =>
      prevNums.map((num, i) => (i === index ? { ...num, isFrozen: !num.isFrozen } : num))
    );
  };

  return (
    <Wrapper>
      <Container>
        <Header>
        <h1>Tenzies!</h1>
        <span>Roll until all dice face are the same. Click each dice to freeze it at its current value</span>
        </Header>
        <NumbersContainer>
        <NumWrapper>
        {nums.map((item, index) => (
              <Number
                key={index}
                number={item.value}
                isFrozen={item.isFrozen}
                onClick={() => toggleFreeze(index)} // Pass the index of the clicked number
              />
            ))}
        </NumWrapper>
        </NumbersContainer>
        <button onClick={handleRoll}>{hasWon?'Play Again':"Roll"}</button>
      </Container>
      {hasWon?<Confetti width={width}
      height={height} />:""}
    </Wrapper>
  );
}

const Wrapper=styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
`

const Container = styled.div`
  width: 60vw;
  height: 89vh;
  background-color: #f8eded;
  border-radius: 20px;
  display: flex;
  flex-direction: column; /* Stack children vertically */
  flex-wrap: wrap;
  align-items: center;
  position: fixed;
  padding: 0;
  overflow: hidden;
  box-shadow: 12px 12px 12px rgba(0, 0, 0, 0.4);
  button{
    background-color: #FF8225;
    border-radius: 5px;
    font-family: "Arizonia", cursive;
    font-size: 25px;
    font-style: normal;
    font-weight: 800;
    width: 100px;
    border: none;
    box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.2), -8px -8px 15px rgba(255, 255, 255, 0.8);
    padding: 10px;
    transition: all 200ms ease-in-out 0s;
    &:hover{
      background-color: #FF4500;
      transform: scale(1.1);
    }
  }
  @media (max-width:768px){
    width: 85vw;
  }
  
`;

const Header = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1px;
  line-height: 0.2;
  background-color: #b43f3f;
  h1 {
    font-family: "Arizonia", cursive;
    font-size: 50px;
    font-style: normal;
    margin-top: 0;
    padding-top: 30px;
  }
  span {
    font-family: "Open Sans", sans-serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
    font-size: 19px;
    font-variation-settings: "wdth" 100;
    padding-bottom: 5px;
    word-wrap: break-word; /* Ensure long words wrap */
    white-space: normal; /* Allow text to wrap normally */
    line-height: 1.5;
    text-align: center;
  }
  @media (max-width: 768px) {
    height: 35%;
    h1 {
      font-size: 40px; /* Slightly smaller font on medium screens */
    }
    span {
      font-size: 16px; /* Adjust span text size */
      padding: 0 5px;
    }
  }

  /* Extra small screens: scale the text even more */
  @media (max-width: 480px) {
    height: 40%;
    h1 {
      font-size: 30px; /* Smaller font size for smaller screens */
    }
    span {
      font-size: 14px; /* Adjust span text size for readability */
      padding: 0 3px;
    }
  }
`;

const NumbersContainer = styled.div`
  width: 100%;
  height: 250px;
  margin-top: 10px; /* Push NumbersContainer below Header */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const NumWrapper=styled.div`
display: grid;
grid-template-columns: repeat(5,1fr);
gap: 40px;
@media (max-width:768px){
  grid-template-columns: repeat(3,1fr);
  gap: 5px;
  & > :nth-child(10) {
      grid-column: span 3; /* Make the last element span all columns */
      justify-self: center; /* Align it to the center */
    }
}
`

export default App