import Confetti from 'react-confetti'
import { useWindowSize } from 'usehooks-ts'
import cheapchipsLogo from "../../assets/logo.png"

const JackpotConfetti = ({visible}:{visible:boolean}) => {
  const { width, height } = useWindowSize()
  const image = new Image()
  image.src = cheapchipsLogo
  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={25}
      run={visible}
      drawShape={ctx => {
        for(let i = 0; i < 22; i++){
          const angle = 0.2 * i
          const x = (0.2 + (1.5 * angle)) * Math.cos(angle)
          const y = (0.2 + (1.5 * angle)) * Math.sin(angle)
          ctx.drawImage(image, x, y, 32, 32)
        }
      }}
    />
  )
}


export default JackpotConfetti