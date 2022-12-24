import _ from 'lodash'
import { useState } from 'react'
import styled from 'styled-components'
import BingoArray from './BingoArray'
import { useBingo } from './hooks/useBingo'
import ChristmasTree from './img/christmas_tree.png'
import CornerDecorations from './img/corner_decoration2.png'
import { useLocalStorageState } from './hooks/useLocalStorageState'



function App() {

  const bingoItems = [
    "Nana talking about her friend pat",
    "Nana asking for half and half water",
    "Nana talking about Shirley/her son",
    "Nana saying I shouldn’t eat this but then does",
    "Nana not hearing but still laughing at what was said",
    "Nana asking Brad about his beard",
    "Lisa makes uber joke about Jordan",
    "Can’t understand uncle Wayne",
    "Brad telling Jamie to take it easy"
    

  ]

  const [bingoArray, setBingoItems] = useBingo(bingoItems)

  const [isBingo, setIsBingo] = useState(false)

  const itemClickHandler = (rowIndex: number, columnIndex: number) => {
    let newBingoItems = _.cloneDeep(bingoArray)
    newBingoItems.rows[rowIndex][columnIndex].obtained = !newBingoItems.rows[rowIndex][columnIndex].obtained
    setBingoItems(newBingoItems)
    setIsBingo(newBingoItems.checkForBingo())
    console.log(newBingoItems.checkForBingo())
  }

  const drawTable = () => {
    return bingoArray.rows.map((row, rowIndex) => {
      return (
        row.map((item, columnIndex) => {
          return <Item obtained={item.obtained} key={rowIndex + columnIndex} className='item' onClick={() => itemClickHandler(rowIndex, columnIndex)}>
            <p>{item.text} </p>
            <div><img src={ChristmasTree} /> </div>
          </Item>
        })
      )
    })
  }
  const resetGame = () => {
    setIsBingo(false)
    setBingoItems(new BingoArray(bingoItems))

  }

  const resetCard = () => {
    if (confirm("Are you sure you want to reset?") == true) setBingoItems(new BingoArray(bingoItems))

  }


  return (
    <>
      <BingoWin isBingo={isBingo} className="bingo_win">
        
        <h1>Bingo</h1>
        <Button className="reset_game" onClick={resetGame}>Restart</Button>
      </BingoWin>
      <AppContainer>
        <BgCornerTop src={CornerDecorations}></BgCornerTop>
        <BgCornerBottom src={CornerDecorations}></BgCornerBottom>
        <h1>Christmas 0 Bingo!</h1>
        <BingoTable>
          {drawTable()}
        </BingoTable>
        <Button className="reset_card" onClick={resetCard}>Reset Card</Button>
      </AppContainer>
    </>
  )
}

const BgCorner = styled.img`
  position: fixed;
  width: 60vw;
  z-index:-1;
`
const BgCornerTop = styled(BgCorner)`
  top: -25px;
  left: -25px;;
  rotate: -180deg;
`
const BgCornerBottom = styled(BgCorner)`
  bottom: -25px;
  right: -25px;
  
`

const AppContainer = styled.div`
  display: flex;
  flex-direction: column ;
  align-items:center ;
  justify-content:space-around ;
  width: 100vw;
  height: 100%;
  gap:3rem ;
  margin-bottom: env(safe-area-inset-bottom);
  
  h1{
    font-family: MerryChristmas;
    font-size: 3em ;
    font-weight:normal ;
    color: white;
    margin:0 ;
    margin-top: 3rem;
  }
 

`

const BingoWin = styled.div<{ isBingo: boolean }>`
  position: fixed;
  inset: 0;
  flex-direction: column;
  display: flex;
  align-items:center ;
  justify-content: center ;
  z-index: 99;
  background-color: rgba(255,255,255,0.25);
  backdrop-filter: blur(5px);
  color:#146B3A;
  opacity: ${({ isBingo }) => isBingo ? '1' : '0'};
      transition: opacity 300ms ease;
      scale: ${({ isBingo }) => isBingo ? '1' : '0'};
  
  h1{
    font-family: MerryChristmas;
    font-weight:normal;
    font-size: 10rem;
    margin: 0;
    scale: ${({ isBingo }) => isBingo ? '1' : '0'};
      transition: scale 300ms ease;
  }
  button{
    scale: ${({ isBingo }) => isBingo ? '1' : '0'};
      transition: scale 300ms ease;
  }

`
const Button = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  padding: 1rem 2rem;
  background-color: white;
  border-radius: 1rem;
  color: #146B3A;
  font-weight: bold;

  box-shadow: 6px 6px 28px 0px rgba(0,0,0,0.47);

`

const BingoTable = styled.div`
  width: 95vw;
  aspect-ratio:1/1;
  display: grid ;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 5px;

`

const Item = styled.div<{ obtained: boolean }>`
    display:flex ;
    align-items:center ;
    justify-content:center ;
    text-align:center ;
    position: relative;
    padding: 0.5em;
    //border: 2px solid #146B3A ;
    border-radius: 1em;
    background-color:white ;
    
    div{
      position: absolute;
      inset: 0.5em;
      scale: ${({ obtained }) => obtained ? '1' : '0'};
      transition: scale 300ms ease;
      img {
        object-fit: contain; 
        width: 100%; 
        height: 100%;
      }
    }
    
`

export default App
